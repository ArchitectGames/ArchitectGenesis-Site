import { FOUNDER, LINKS, PLANS, GIFT_DURATIONS, SITE, asset } from "../config.js";
import { CIVILIZATIONS } from "../data/civilizations.js";
import { state, persist, ensureFounder, makeCode } from "../state.js";

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export function renderPage(route, ctx) {
  const page = PAGES[route] || PAGES["/about"];
  return page(ctx);
}

const PAGES = {
  "/gameplay": () => wrap(
    "Gameplay",
    "Observe. Enter. Direct. Rewind.",
    `
    <p>ArchitectGenesis is played from the Architect's chair. You do not paint terrain. You do not click settlers. You receive a living world, a Situation Report, and a set of directives that will become history.</p>
    <h2>The loop</h2>
    <ol>
      <li>Situation Report — what the civilization faces now.</li>
      <li>Decision — a preset directive, chosen once.</li>
      <li>Consequences — the world answers.</li>
      <li>Updated civilization — maps, people, and measures change.</li>
      <li>Continue History, or Time Travel.</li>
    </ol>
    <h2>Time Travel</h2>
    <p>After the first chapter, you may rewind. Buildings deconstruct, armies reverse, years run backward.</p>
    `
  ),
  "/features": () => wrap(
    "Features",
    "Institutions, not gadgets.",
    `
    <div class="grid-2">
      ${tile("Simulation", "History is created here. Architects direct civilizations. Decisions become events.")}
      ${tile("Chronicle", "History is preserved here. Founders, Architects, civilizations, and worlds receive permanent records.")}
      ${tile("Situation Room", "Reports, maps, artwork, analytics, and directives in one observatory.")}
      ${tile("Time Travel", "Rewind a demonstration branch and walk a different history in the same session.")}
      ${tile("Living World", "Cities, fields, weather, and daily life, viewed from an eagle's path.")}
      ${tile("Registries", "Nothing meaningful is deleted. Provenance is part of the simulation.")}
    </div>
    <p class="notice">The full game adds persistent AI Architects, the ArchitectGenesis News Network, marketplace, and Great Houses. The website is the opening chapter, not the entire book.</p>
    `
  ),
  // Pricing page restore point: this renderer stays; the route currently redirects home in main.js.
  "/pricing": () => wrap(
    "Pricing",
    "Support the simulation. Keep history permanent.",
    plansHtml() + `<p class="notice">Web billing and App Store subscriptions will both be available at launch. This preview shows the catalog without charging a card.</p>`
  ),
  "/about": () => wrap(
    "About ArchitectGenesis",
    "Why is ArchitectGenesis different from every other civilization game?",
    `
    <p>Most civilization games ask you to win. ArchitectGenesis asks a harder question: <em>${SITE.question}</em></p>
    <p>You do not play as a nation-state clicking production queues. You create an Architect — a persistent intelligence with personality, philosophy, and a record that does not reset when the session ends. The Architect directs a civilization. The civilization writes history. History is kept.</p>
    <h2>Emergent historical simulation</h2>
    <p>The design is not a tech tree with a victory screen. It is a living historical ecosystem. Decisions have consequences that remain visible. Alternate histories are discovered through Time Travel, not through loading a save that pretends the first path never happened. The first path remains explored.</p>
    <h2>The Architect</h2>
    <p>The Architect is the guiding intelligence of a civilization. In the full simulation, Architects are unique, persistent AI entities. They may be owned, remembered, ranked, and — later — joined to Great Houses. On this website, you sit in the Architect's chair through handcrafted, rule-based scenarios so the door can be opened without waiting on a model.</p>
    <h2>Permanent history</h2>
    <p>The Chronicle never forgets. Founders, Architects, civilizations, worlds, and significant events receive registry identities. History may grow. It is not rewritten to flatter the present.</p>
    <h2>The Living World</h2>
    <p>Civilizations are meant to be watched: agriculture, trade, weather, armies, and ordinary life, seen from an eagle's path. The homepage is that vantage. The portal is how you stop being a spectator.</p>
    <h2>Educational value</h2>
    <p>Interactive historical leadership is a way of thinking. Visitors practice the weight of a directive — famine, plague, charter, restoration, first landing — without lectures. The demo is authored; the full simulation will generate unique civilizations with AI while still answering to the same institutions.</p>
    <h2>The long span</h2>
    <p>The intended range is humanity's earliest hearths through its distant future: prehistory, ancient river kingdoms, classical argument, medieval oaths, renaissance workshops, industrial smoke, the modern city, the near future, and the spacefaring vessel. Ten demonstration worlds on this site stand in for that arc.</p>
    <div class="founder-note">
      <h2>About the Founder</h2>
      <p><strong>${FOUNDER.name}</strong> · ${FOUNDER.role}. ${FOUNDER.credentials}.</p>
      <p>ArchitectGenesis began at the crossing of history, strategy, technology, and interactive simulation — the same instincts that led him to write <a href="${FOUNDER.novelUrl}" target="_blank" rel="noopener"><em>${FOUNDER.novelTitle}</em></a>, a historical novel of Josephus and the Roman-Judean war. <a class="amazon-link" href="${FOUNDER.novelUrl}" target="_blank" rel="noopener" aria-label="Read Josephus on Amazon" title="Read Josephus on Amazon"><span aria-hidden="true">a</span></a></p>
    </div>
    `
  ),
  "/faq": () => wrap(
    "FAQ",
    "Brief answers. The rest is in the world.",
    `
    <div class="faq">
      <details open><summary>Is the website demo using AI?</summary><p>No. The public demo is completely rule-based. Every chapter and branch is handcrafted.</p></details>
      <details><summary>Do I need an account?</summary><p>Not to watch a civilization or to run the demonstration. Login exists so Founders can later keep subscriptions, gifts, and referral codes.</p></details>
      <details><summary>Will there be an iPhone and iPad app?</summary><p>Yes. The illuminated QR code on every page is reserved for the App Store listing.</p></details>
      <details><summary>Can I buy a subscription now?</summary><p>The Store catalog is live as a preview. Secure web billing connects at public launch. Demonstration codes can be issued so redemption can be practiced.</p></details>
      <details><summary>What is Time Travel?</summary><p>A rewind of the demonstration world. Already explored directives stay visible and locked for the browser session.</p></details>
      <details><summary>Who owns ArchitectGenesis?</summary><p>Copyright © 2026 Bryan Antler. All Rights Reserved.</p></details>
    </div>
    `
  ),
  "/community": () => wrap(
    "Community",
    "Find ArchitectGenesis in the places where the conversation continues.",
    `
    <div class="social-directory">
      <a class="social-card" href="${LINKS.x}" target="_blank" rel="noopener">
        <span class="social-mark">X</span><span><strong>X</strong><small>@ArchitectGen</small></span>
      </a>
      <a class="social-card" href="${LINKS.instagram}" target="_blank" rel="noopener">
        <span class="social-mark">IG</span><span><strong>Instagram</strong><small>@architectgenesis</small></span>
      </a>
      <a class="social-card" href="${LINKS.tiktok}" target="_blank" rel="noopener">
        <span class="social-mark">TT</span><span><strong>TikTok</strong><small>@ArchitectGen</small></span>
      </a>
      <a class="social-card" href="${LINKS.facebook}" target="_blank" rel="noopener">
        <span class="social-mark">f</span><span><strong>Facebook Page</strong><small>ArchitectGenesis</small></span>
      </a>
      <a class="social-card" href="${LINKS.discord}" target="_blank" rel="noopener">
        <span class="social-mark">Dc</span><span><strong>Discord</strong><small>Join ArchitectGenesis</small></span>
      </a>
    </div>
    `
  ),
  "/support": () => wrap(
    "Support",
    "We read every letter that arrives.",
    `
    <p>For account, billing, and demonstration questions, write through this page. Launch support will add live status and a deeper knowledge base.</p>
    <form class="form-grid" id="support-form">
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <select name="topic">
        <option>Demonstration</option>
        <option>Account</option>
        <option>Store</option>
        <option>App</option>
        <option>Press</option>
      </select>
      <textarea name="message" rows="5" placeholder="How can we help?" required></textarea>
      <button class="primary" type="submit">Send</button>
      <p class="notice" id="support-msg"></p>
    </form>
    `
  ),
  "/login": () => loginHtml(),
  "/account": () => accountHtml(),
  "/app": () => wrap(
    "iPhone & iPad",
    "The App Store listing will live behind the QR code.",
    `
    <p>ArchitectGenesis for iPhone and iPad is being prepared. When the listing is live, the plaque on every page will open it directly.</p>
    <p><a class="primary" href="#/">Return to the living world</a></p>
    `
  ),
};

function wrap(title, lead, inner) {
  return `<article class="page-card"><h1>${title}</h1><p class="lead">${lead}</p>${inner}</article>`;
}

function tile(title, body) {
  return `<div class="tile"><h3>${title}</h3><p>${body}</p></div>`;
}

function plansHtml() {
  return `<div class="grid-2">${PLANS.map(
    (p) => `<div class="plan ${p.featured ? "featured" : ""}">
      <h3>${p.tier} · ${p.cadence}</h3>
      <div class="price">${p.price}<small>${p.period}</small></div>
      ${p.save ? `<div class="save">${p.save}</div>` : ""}
      <p>${p.blurb}</p>
      <ul>${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
      <button class="primary" data-buy="${p.id}">Continue</button>
    </div>`
  ).join("")}</div>`;
}

function storeHtml() {
  const founder = state.founder;
  return wrap(
    "Store",
    "Subscriptions, gifts, and a code that can be given like a key.",
    `
    <h2>Digital subscriptions</h2>
    ${plansHtml()}
    <h2>Gift subscriptions</h2>
    <form class="form-grid" id="gift-form">
      <select name="duration">${GIFT_DURATIONS.map((g) => `<option value="${g.id}">${g.label} · ${g.price}</option>`).join("")}</select>
      <input name="to" type="email" placeholder="Recipient email" required />
      <textarea name="message" rows="3" placeholder="A short message"></textarea>
      <label>Deliver
        <select name="when">
          <option value="now">Immediately</option>
          <option value="later">On a chosen date</option>
        </select>
      </label>
      <input name="date" type="date" />
      <button class="primary" type="submit">Create gift (preview)</button>
    </form>
    <div id="gift-result"></div>
    <h2>Redeem a code</h2>
    <form class="form-grid" id="redeem-form">
      <input name="code" placeholder="AG-XXXX-XXXX" required />
      <button class="primary" type="submit">Redeem</button>
      <p class="notice" id="redeem-msg"></p>
    </form>
    <h2>Referral</h2>
    ${
      founder
        ? `<p>Your referral code is <strong>${founder.referral}</strong>. Share <code>${founder.referralLink}</code>. Self-referrals are refused.</p>`
        : `<p>A Founder session is required to receive a personal referral code, link, and QR.</p>`
    }
    <p class="notice">Secure web billing and platform storefronts connect at launch. Preview actions issue local demonstration codes only.</p>
    `
  );
}

function loginHtml() {
  const f = state.founder;
  if (f) {
    return wrap(
      "Founder session",
      `Welcome back, ${escapeHtml(f.name)}.`,
      `<p>Founder ID (local preview): #${f.id}</p>
       <p>Official registry numbers are assigned at launch. Founder ID #00000001 is reserved for the Creator.</p>
       <p><a class="primary" href="#/account">Open account</a> <button class="ghost" id="btn-logout" type="button">End session</button></p>`
    );
  }
  return wrap(
    "Login",
    "Enter as a Founder. History starts with a name and an address.",
    `
    <form class="form-grid" id="login-form">
      <input name="name" placeholder="Name" />
      <input name="email" type="email" placeholder="Email" required />
      <input name="code" placeholder="Redeem code (optional)" />
      <button class="primary" type="submit">Enter</button>
    </form>
    <p class="notice">This preview keeps your Founder session in this browser. Full authentication arrives with the live registries.</p>
    `
  );
}

function accountHtml() {
  const f = state.founder;
  if (!f) return wrap("Account", "A Founder session is required.", `<p>Founder access is currently unavailable.</p>`);
  return `<article class="page-card account-grid">
    <div>
      <h1>${escapeHtml(f.name)}</h1>
      <p class="lead">Founder since ${new Date(f.since).toLocaleDateString()}</p>
      <p>Preview ID #${f.id} · ${escapeHtml(f.email)}</p>
      <h2>Active subscriptions</h2>
      <p>${state.store.purchases.length ? state.store.purchases.map((p) => p.plan).join(", ") : "None yet."}</p>
      <h2>Purchase history</h2>
      <ul>${state.store.purchases.map((p) => `<li>${p.plan} · ${p.code} · ${p.at}</li>`).join("") || "<li>No purchases.</li>"}</ul>
      <h2>Gift history</h2>
      <ul>${state.store.gifts.map((g) => `<li>${g.duration} to ${escapeHtml(g.to)} · ${g.code}</li>`).join("") || "<li>No gifts.</li>"}</ul>
      <h2>Referral dashboard</h2>
      <p>Code ${f.referral} · Conversions ${f.conversions} · Rewards ${f.rewards.length}</p>
      <p class="notice">Duplicate, fraudulent, and self-referrals are rejected.</p>
    </div>
  </article>`;
}

export function bindPage(route, root, ctx) {
  root.querySelector("#support-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    root.querySelector("#support-msg").textContent = "Received. A steward will answer when live support opens.";
  });

  root.querySelector("#login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const founder = ensureFounder(String(data.get("email")), String(data.get("name") || ""));
    const code = String(data.get("code") || "").trim();
    if (code) redeemCode(code, founder);
    location.hash = "/account";
  });

  root.querySelector("#btn-logout")?.addEventListener("click", () => {
    state.founder = null;
    persist();
    location.hash = "/login";
  });

  root.querySelectorAll("[data-buy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!state.founder) {
        location.hash = "/login";
        return;
      }
      const plan = PLANS.find((p) => p.id === btn.dataset.buy);
      const code = makeCode("AG");
      state.store.purchases.push({ plan: `${plan.tier} ${plan.cadence}`, code, at: new Date().toISOString() });
      state.store.codes.push({ code, kind: "subscription", plan: plan.id, owner: state.founder.id });
      persist();
      alert(`Demonstration code issued: ${code}\nRedeem it from the Store. No card was charged.`);
    });
  });

  root.querySelector("#gift-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!state.founder) {
      location.hash = "/login";
      return;
    }
    const data = new FormData(e.target);
    const duration = String(data.get("duration"));
    const to = String(data.get("to"));
    const message = String(data.get("message") || "");
    const code = makeCode("GIFT");
    const gift = { duration, to, message, code, when: data.get("when"), date: data.get("date") };
    state.store.gifts.push(gift);
    state.store.codes.push({ code, kind: "gift", duration, owner: state.founder.id });
    persist();
    const result = root.querySelector("#gift-result");
    result.innerHTML = `
      <div class="certificate" id="print-cert" style="background-image:url('${asset("ui/gift-certificate.jpg")}')">
        <div class="certificate-inner">
          <p>ArchitectGenesis</p>
          <h2>Gift Certificate</h2>
          <p>${escapeHtml(duration)} of history</p>
          <p>For ${escapeHtml(to)}</p>
          <p class="code-xl">${code}</p>
          <p>${escapeHtml(message)}</p>
        </div>
      </div>
      <button class="ghost" type="button" id="btn-print">Print certificate</button>
    `;
    result.querySelector("#btn-print")?.addEventListener("click", () => window.print());
  });

  root.querySelector("#redeem-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = new FormData(e.target).get("code");
    const msg = redeemCode(String(code), state.founder);
    root.querySelector("#redeem-msg").textContent = msg;
  });
}

function redeemCode(code, founder) {
  const entry = state.store.codes.find((c) => c.code.toUpperCase() === String(code).trim().toUpperCase());
  if (!entry) return "That code is not in this browser's demonstration ledger.";
  if (entry.redeemed) return "This code has already been redeemed.";
  if (founder && entry.owner === founder.id && entry.kind !== "subscription") {
    return "This preview refuses a few self-gifts. Give it to another Founder session.";
  }
  entry.redeemed = true;
  persist();
  return `Redeemed: ${entry.kind} (${entry.code}).`;
}
