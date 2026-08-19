import { asset } from "../config.js";
import { demoKey, persist, resetDemo } from "../state.js";

const STAT_LABELS = [
  ["people", "People"],
  ["stability", "Stability"],
  ["prosperity", "Prosperity"],
  ["knowledge", "Knowledge"],
  ["arms", "Arms"],
  ["culture", "Culture"],
];

function clamp(n) {
  return Math.max(0, Math.min(100, n));
}

function scaleStat(base, delta, isPeople) {
  if (isPeople) {
    const factor = 1 + delta / 100;
    return Math.max(1, Math.round(base * factor));
  }
  return clamp(base + delta);
}

export class SituationRoom {
  constructor(root, { audio, world, onExit, onRestartWorld }) {
    this.root = root;
    this.audio = audio;
    this.world = world;
    this.onExit = onExit;
    this.onRestartWorld = onRestartWorld;
  }

  start(civ, { skipTo } = {}) {
    this.civ = civ;
    this.d = demoKey(civ.id);
    if (!this.d.stats) this.d.stats = { ...civ.stats };
    if (skipTo != null) this.d.chapter = skipTo;
    this.render();
  }

  chapter() {
    return this.civ.chapters[this.d.chapter];
  }

  exploredSet() {
    const key = this.chapter()?.id;
    if (!this.d.explored[key]) this.d.explored[key] = [];
    return this.d.explored[key];
  }

  render() {
    const civ = this.civ;
    const ch = this.chapter();
    const d = this.d;
    if (!ch) {
      this.renderEnd();
      return;
    }
    const explored = this.exploredSet();
    const canTravel = d.history.length > 0;

    this.root.hidden = false;
    this.root.innerHTML = `
      <section class="situation">
        <article class="panel">
          <p class="civ-era">${civ.era} · Chapter ${d.chapter + 1} of ${civ.chapters.length}</p>
          <h1 class="sr-title">${ch.title}</h1>
          <p class="civ-year">${ch.year}</p>
          <p class="report">${ch.report}</p>
          ${
            d.phase === "report"
              ? `<div class="choices">${ch.choices
                  .map((c) => {
                    const used = explored.includes(c.id);
                    return `<button class="choice" data-choice="${c.id}" ${used ? "disabled" : ""}>
                      <strong>${c.label}</strong>
                      ${used ? `<span class="explored">Already Explored</span>` : ""}
                      <small>${c.summary}</small>
                    </button>`;
                  })
                  .join("")}</div>`
              : `<div class="consequence">${d.lastChoice.consequence}</div>
                 <div class="sr-actions">
                   <button class="primary" id="btn-continue">Continue History</button>
                   ${canTravel ? `<button class="ghost" id="btn-timetravel">Time Travel</button>` : ""}
                 </div>
                 ${d.history.length === 0 ? `<p class="notice">Time Travel unlocks after the first chapter.</p>` : ""}`
          }
        </article>
        <article class="panel">
          <h2>Living map</h2>
          <div class="map-well">
            <img src="${asset(civ.image)}" alt="${civ.name} from the Architect's vantage" />
            <div class="year-ticker" id="year-ticker">${ch.year}</div>
          </div>
          <p class="notice" style="margin-top:12px">${civ.overview}</p>
        </article>
        <article class="panel">
          <h2>Situation overview</h2>
          <p><strong>${civ.name}</strong> · ${civ.slogan}</p>
          <div class="meters">
            ${STAT_LABELS.map(([k, label]) => {
              const val = d.stats[k];
              const pct = k === "people" ? Math.min(100, Math.log10(val + 1) * 12) : val;
              const display = k === "people" ? val.toLocaleString() : `${val}`;
              return `<div class="meter"><label><span>${label}</span><span>${display}</span></label>
                <div class="bar"><span style="width:${pct}%"></span></div></div>`;
            }).join("")}
          </div>
          <div class="sr-actions">
            <button class="ghost" id="btn-restart">Restart civilization</button>
            <button class="ghost" id="btn-leave">Return to sky</button>
          </div>
        </article>
      </section>
    `;

    this.root.querySelectorAll("[data-choice]").forEach((btn) => {
      btn.addEventListener("click", () => this.choose(btn.dataset.choice));
    });
    this.root.querySelector("#btn-continue")?.addEventListener("click", () => this.continueHistory());
    this.root.querySelector("#btn-timetravel")?.addEventListener("click", () => this.timeTravel());
    this.root.querySelector("#btn-restart")?.addEventListener("click", () => this.restart());
    this.root.querySelector("#btn-leave")?.addEventListener("click", () => this.onExit?.());
  }

  choose(id) {
    const ch = this.chapter();
    const choice = ch.choices.find((c) => c.id === id);
    if (!choice) return;
    if (this.exploredSet().includes(id)) return;
    const stats = { ...this.d.stats };
    for (const [k, v] of Object.entries(choice.effects || {})) {
      if (!(k in stats)) continue;
      stats[k] = scaleStat(stats[k], v, k === "people");
    }
    this.d.history.push({
      chapterIndex: this.d.chapter,
      path: this.d.path.slice(),
      stats: { ...this.d.stats },
    });
    this.d.stats = stats;
    this.d.lastChoice = choice;
    this.d.phase = "consequence";
    this.d.path.push({ chapter: ch.id, choice: id });
    this.exploredSet().push(id);
    persist(true);
    this.render();
  }

  continueHistory() {
    this.d.chapter += 1;
    this.d.phase = "report";
    this.d.lastChoice = null;
    persist(true);
    this.render();
  }

  async timeTravel() {
    if (!this.d.history.length) return;
    document.body.classList.add("rewinding");
    this.world?.setReverse(true);
    const ticker = this.root.querySelector("#year-ticker");
    const from = this.chapter()?.year || "";
    const prev = this.d.history[this.d.history.length - 1];
    const target = this.civ.chapters[prev.chapterIndex];
    const start = performance.now();
    await new Promise((resolve) => {
      const tick = (now) => {
        const t = Math.min(1, (now - start) / 3600);
        if (ticker) ticker.textContent = t < 0.5 ? from : target.year;
        if (t < 1) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });
    const snap = this.d.history.pop();
    this.d.chapter = snap.chapterIndex;
    this.d.stats = snap.stats;
    this.d.phase = "report";
    this.d.lastChoice = null;
    this.d.path = snap.path.slice();
    persist(true);
    document.body.classList.remove("rewinding");
    this.world?.setReverse(false);
    this.render();
  }

  restart() {
    resetDemo(this.civ.id);
    this.d = demoKey(this.civ.id);
    this.d.stats = { ...this.civ.stats };
    persist(true);
    this.render();
  }

  renderEnd() {
    this.root.innerHTML = `
      <section class="situation">
        <article class="panel" style="grid-column: 1 / -1">
          <p class="civ-era">${this.civ.era}</p>
          <h1 class="sr-title">History recorded</h1>
          <p class="lead">${this.civ.name} now possesses a demonstration chronicle.</p>
          <p class="report">You may Time Travel is no longer needed here — restart this civilization to unlock every branch, or return to the sky and enter another world. Nothing in this website demo is sent to an AI. Every chapter you walked was handcrafted.</p>
          <div class="sr-actions">
            <button class="primary" id="btn-restart">Restart civilization</button>
            <button class="ghost" id="btn-leave">Return to sky</button>
          </div>
        </article>
      </section>
    `;
    this.root.querySelector("#btn-restart").addEventListener("click", () => this.restart());
    this.root.querySelector("#btn-leave").addEventListener("click", () => this.onExit?.());
  }

  hide() {
    this.root.hidden = true;
    this.root.innerHTML = "";
  }
}
