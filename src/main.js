import "./styles.css";
import QRCode from "qrcode";
import { CIVILIZATIONS } from "./data/civilizations.js";
import { LINKS, CAROUSEL, asset } from "./config.js";
import { state, persist } from "./state.js";
import { LivingWorld } from "./world/LivingWorld.js";
import { AudioEngine } from "./audio/AudioEngine.js";
import { renderPage, bindPage } from "./pages/pages.js";

const $ = (id) => document.getElementById(id);

const world = new LivingWorld($("world-canvas"), $("world-fallback"));
const audio = new AudioEngine();

let carouselTimer = null;
let resumeTimer = null;
let paused = false;
let suppressHash = false;
let currentIndex = state.civIndex || 0;

function civ() {
  return CIVILIZATIONS[currentIndex];
}

function setCiv(index, { fromUser = false, immediate = false } = {}) {
  currentIndex = (index + CIVILIZATIONS.length) % CIVILIZATIONS.length;
  state.civIndex = currentIndex;
  persist(true);
  const c = civ();
  $("civ-era").textContent = c.era;
  $("civ-name").textContent = c.name;
  $("civ-year").textContent = c.year;
  $("civ-slogan").textContent = c.slogan;
  world.setCivilization(currentIndex, { immediate });
  audio.playTheme(c);
  document.querySelectorAll(".carousel-dots button").forEach((b, i) => {
    b.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
  });
  if (fromUser) pauseCarousel();
}

function buildDots() {
  const host = $("carousel-dots");
  host.innerHTML = CIVILIZATIONS.map(
    (c, i) =>
      `<button type="button" role="tab" aria-label="${c.name}" aria-selected="${i === currentIndex}"></button>`
  ).join("");
  host.querySelectorAll("button").forEach((btn, i) => {
    btn.addEventListener("click", () => setCiv(i, { fromUser: true }));
  });
}

function startCarousel() {
  stopCarousel();
  carouselTimer = setInterval(() => {
    if (document.body.dataset.view !== "home" || paused) return;
    setCiv(currentIndex + 1);
  }, CAROUSEL.intervalMs);
}

function stopCarousel() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = null;
}

function pauseCarousel() {
  paused = true;
  if (resumeTimer) clearTimeout(resumeTimer);
  resumeTimer = setTimeout(() => {
    paused = false;
  }, CAROUSEL.resumeMs);
}

async function paintQr() {
  const canvas = $("qr-canvas");
  const url = LINKS.appStore.includes("#")
    ? `${location.origin}${location.pathname}#/app`
    : LINKS.appStore;
  try {
    await QRCode.toCanvas(canvas, url, {
      width: 128,
      margin: 1,
      color: { dark: "#f0d9a0", light: "#070b14" },
    });
  } catch {
    /* ignore */
  }
}

function routeFromHash() {
  const raw = location.hash.replace(/^#/, "") || "/";
  const [path, query] = raw.split("?");
  const params = new URLSearchParams(query || "");
  return { path: path.startsWith("/") ? path : `/${path}`, params };
}

function setView(name) {
  document.body.dataset.view = name;
  $("home-chrome").hidden = name !== "home";
  $("page-root").hidden = name !== "page";
  world.setMode(name === "home" ? "home" : "page");
}

function markNav(path) {
  document.querySelectorAll(".nav a").forEach((a) => {
    const href = a.getAttribute("href");
    a.setAttribute("aria-current", href === `#${path}` ? "page" : "false");
  });
}

function renderRoute() {
  if (suppressHash) return;
  const { path, params } = routeFromHash();
  if (params.get("civ")) {
    const idx = CIVILIZATIONS.findIndex((c) => c.id === params.get("civ"));
    if (idx >= 0) {
      setCiv(idx, { immediate: true });
      if (path === "/") {
        history.replaceState(null, "", `${location.pathname}${location.search}#/`);
      }
    }
  }

  markNav(path);

  if (path === "/" || path === "") {
    setView("home");
    startCarousel();
    return;
  }

  if (path === "/simulate" || path === "/demo" || path === "/store" || path === "/login") {
    location.hash = "/";
    return;
  }

  stopCarousel();
  setView("page");
  const root = $("page-root");
  root.innerHTML = renderPage(path);
  bindPage(path, root);
}

function bindChrome() {
  $("civ-prev").addEventListener("click", () => setCiv(currentIndex - 1, { fromUser: true }));
  $("civ-next").addEventListener("click", () => setCiv(currentIndex + 1, { fromUser: true }));

  $("nav-toggle").addEventListener("click", () => {
    const open = $("nav").classList.toggle("open");
    $("nav-toggle").setAttribute("aria-expanded", open ? "true" : "false");
  });
  $("nav").addEventListener("click", () => $("nav").classList.remove("open"));

  $("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("signup-email").value.trim();
    if (!email) return;
    if (!state.mailing.includes(email)) state.mailing.push(email);
    persist();
    $("signup-msg").hidden = false;
    $("signup-msg").textContent = "You are on the list for launch news.";
    $("signup-email").value = "";
  });

  $("qr-plaque").addEventListener("click", () => {
    location.hash = "/app";
  });
  $("qr-plaque").style.cursor = "pointer";

  const muteBtn = $("btn-mute");
  const audioSliders = $("audio-sliders");
  let sliderHideTimer = null;
  const showAudioSliders = () => {
    audioSliders.classList.add("open");
    muteBtn.setAttribute("aria-expanded", "true");
    clearTimeout(sliderHideTimer);
    sliderHideTimer = setTimeout(() => {
      audioSliders.classList.remove("open");
      muteBtn.setAttribute("aria-expanded", "false");
    }, 3000);
  };
  const syncMute = () => {
    muteBtn.setAttribute("aria-label", state.audio.muted ? "Unmute" : "Mute");
    muteBtn.setAttribute("aria-pressed", state.audio.muted ? "false" : "true");
    muteBtn.classList.toggle("is-on", !state.audio.muted);
    muteBtn.style.opacity = state.audio.muted ? "0.55" : "1";
  };
  muteBtn.addEventListener("click", async () => {
    await audio.unlock();
    audio.setMuted(!state.audio.muted);
    if (!state.audio.muted) audio.playTheme(civ());
    showAudioSliders();
    syncMute();
  });
  muteBtn.setAttribute("aria-expanded", "false");
  syncMute();

  $("vol-master").value = state.audio.master;
  $("vol-master").addEventListener("input", (e) => {
    audio.setVolume("master", e.target.value);
    showAudioSliders();
  });
  audioSliders.addEventListener("pointermove", showAudioSliders);
  audioSliders.addEventListener("focusin", showAudioSliders);

  window.addEventListener("keydown", (e) => {
    if (document.body.dataset.view !== "home") return;
    if (e.key === "ArrowLeft") setCiv(currentIndex - 1, { fromUser: true });
    if (e.key === "ArrowRight") setCiv(currentIndex + 1, { fromUser: true });
    if (e.key === "m" || e.key === "M") muteBtn.click();
  });
}

async function boot() {
  state.audio.muted = true;
  state.audio.master = 1;
  state.audio.music = 1;
  state.audio.sfx = 1;
  persist();
  buildDots();
  bindChrome();
  await world.init();
  setCiv(currentIndex, { immediate: true });
  await paintQr();
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}

boot();
