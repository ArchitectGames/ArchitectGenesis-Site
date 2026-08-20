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

    let body;
    try {
      body = await request.json();
    } catch {
      return json(request, { error: "Invalid JSON" }, 400);
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
