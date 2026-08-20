const ALLOWED_ORIGINS = new Set([
  "https://www.architectgenesis.com",
  "https://architectgenesis.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
]);

const HOURLY_LIMIT = 8;
const HOUR_SEC = 3600;

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const headers = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
  if (ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: corsHeaders(request),
  });
}

function clientIp(request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    (request.headers.get("X-Forwarded-For") || "").split(",")[0].trim()
  );
}

async function overHourlyLimit(ip) {
  if (!ip) return false;
  const cache = caches.default;
  const key = new Request(`https://signup-limit.architectgenesis.internal/${ip}`);
  const hit = await cache.match(key);
  const count = hit ? Number(await hit.text()) || 0 : 0;
  if (count >= HOURLY_LIMIT) return true;
  await cache.put(
    key,
    new Response(String(count + 1), {
      headers: { "Cache-Control": `max-age=${HOUR_SEC}` },
    })
  );
  return false;
}

function alreadyOnList(status, details) {
  if (status === 409) return true;
  return /already exists|already a contact|already been added/i.test(details);
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (request.method !== "POST") {
      return json(request, { error: "Method not allowed" }, 405);
    }

    const ip = clientIp(request);
    if (env.SIGNUP_LIMIT) {
      const { success } = await env.SIGNUP_LIMIT.limit({ key: ip || "unknown" });
      if (!success) {
        return json(request, { error: "Too many attempts" }, 429);
      }
    }

    if (await overHourlyLimit(ip)) {
      return json(request, { error: "Too many attempts" }, 429);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json(request, { error: "Invalid JSON" }, 400);
    }

    if (String(body.company || "").trim()) {
      return json(request, { ok: true });
    }

    const email = String(body.email || "").trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json(request, { error: "A valid email is required" }, 400);
    }

    if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
      return json(request, { error: "Unable to subscribe email" }, 500);
    }

    const headers = {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    };

    const resendResponse = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        unsubscribed: false,
        segments: [{ id: env.RESEND_AUDIENCE_ID }],
      }),
    });

    if (resendResponse.ok) {
      return json(request, { ok: true });
    }

    const details = await resendResponse.text();
    if (alreadyOnList(resendResponse.status, details)) {
      await fetch(
        `https://api.resend.com/contacts/${encodeURIComponent(email)}/segments/${env.RESEND_AUDIENCE_ID}`,
        { method: "POST", headers }
      );
      return json(request, { ok: true });
    }

    console.error("Resend contact create failed", resendResponse.status, details);
    return json(request, { error: "Unable to subscribe email" }, 502);
  },
};
