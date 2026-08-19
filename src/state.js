const KEY = "ag.site.v1";

const defaultState = () => ({
  civIndex: 0,
  audio: {
    muted: false,
    master: 1,
    music: 1,
    sfx: 1,
  },
  mailing: [],
  founder: null,
  demo: {},
  store: {
    codes: [],
    gifts: [],
    purchases: [],
    referrals: [],
  },
});

function load() {
  try {
    const raw = sessionStorage.getItem(KEY) || localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

export const state = load();

export function persist(sessionOnly = false) {
  const json = JSON.stringify(state);
  try {
    sessionStorage.setItem(KEY, json);
    if (!sessionOnly) localStorage.setItem(KEY, json);
  } catch {
    /* private mode */
  }
}

export function demoKey(civId) {
  if (!state.demo[civId]) {
    state.demo[civId] = {
      chapter: 0,
      path: [],
      explored: {},
      stats: null,
      completed: false,
      phase: "report",
      lastChoice: null,
      history: [],
    };
  }
  return state.demo[civId];
}

export function resetDemo(civId) {
  delete state.demo[civId];
  persist(true);
  return demoKey(civId);
}

export function makeCode(prefix = "AG") {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const chunk = (n) =>
    Array.from({ length: n }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return `${prefix}-${chunk(4)}-${chunk(4)}`;
}

export function ensureFounder(email, name = "") {
  if (state.founder && state.founder.email === email) return state.founder;
  const id = String(Math.floor(2 + Math.random() * 899999)).padStart(8, "0");
  const ref = makeCode("REF");
  state.founder = {
    id,
    email,
    name: name || email.split("@")[0],
    since: new Date().toISOString(),
    referral: ref,
    referralLink: `#/store?ref=${ref}`,
    conversions: 0,
    rewards: [],
  };
  persist();
  return state.founder;
}
