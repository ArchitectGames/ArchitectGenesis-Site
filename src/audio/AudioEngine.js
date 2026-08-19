import { CIVILIZATIONS } from "../data/civilizations.js";
import { state, persist } from "../state.js";

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.nodes = [];
    this.themeId = null;
    this.ready = false;
  }

  async unlock() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") await this.ctx.resume();
      return;
    }
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.music = ctx.createGain();
    this.sfx = ctx.createGain();
    this.master.connect(ctx.destination);
    this.music.connect(this.master);
    this.sfx.connect(this.master);
    this.applyPrefs();
    this.ready = true;
    this.noise = this.makeNoise();
  }

  applyPrefs() {
    if (!this.master) return;
    const a = state.audio;
    this.master.gain.value = a.muted ? 0 : a.master;
    this.music.gain.value = a.music;
    this.sfx.gain.value = a.sfx;
  }

  setMuted(muted) {
    state.audio.muted = muted;
    persist(true);
    this.applyPrefs();
  }

  setVolume(kind, value) {
    state.audio[kind] = Number(value);
    persist(true);
    this.applyPrefs();
  }

  makeNoise() {
    const ctx = this.ctx;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  noiseSource(filterFreq, gainValue, dest) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = filterFreq;
    const g = this.ctx.createGain();
    g.gain.value = gainValue;
    src.connect(filter);
    filter.connect(g);
    g.connect(dest);
    src.start();
    this.nodes.push(src, filter, g);
    return { src, filter, g };
  }

  stopTheme() {
    for (const n of this.nodes) {
      try {
        n.stop?.();
      } catch {
        /* already stopped */
      }
      try {
        n.disconnect();
      } catch {
        /* */
      }
    }
    this.nodes = [];
    try {
      this.music?.disconnect();
    } catch {
      /* already disconnected */
    }
    this.themeId = null;
  }

  playTheme(civ) {
    if (!this.ready || !civ) return;
    if (this.themeId === civ.id) return;
    this.crossfadeTo(civ);
  }

  crossfadeTo(civ) {
    const ctx = this.ctx;
    if (!ctx) return;
    this.stopTheme();
    const next = ctx.createGain();
    next.gain.value = state.audio.music;
    next.connect(this.master);
    this.music = next;
    this.themeId = civ.id;
    this.buildTheme(civ, next);
  }

  buildTheme(civ, dest) {
    const ctx = this.ctx;
    const { tempo, base, scale, wave, filter } = civ.music;
    const beat = 60 / tempo;
    const masterFilter = ctx.createBiquadFilter();
    masterFilter.type = "lowpass";
    masterFilter.frequency.value = filter;
    masterFilter.connect(dest);

    const pad = ctx.createOscillator();
    pad.type = wave === "sawtooth" ? "sawtooth" : "sine";
    pad.frequency.value = base;
    const padGain = ctx.createGain();
    padGain.gain.value = 0.08;
    pad.connect(padGain);
    padGain.connect(masterFilter);
    pad.start();
    this.nodes.push(pad, padGain);

    const fifth = ctx.createOscillator();
    fifth.type = "triangle";
    fifth.frequency.value = base * 1.5;
    const g5 = ctx.createGain();
    g5.gain.value = 0.05;
    fifth.connect(g5);
    g5.connect(masterFilter);
    fifth.start();
    this.nodes.push(fifth, g5);

    const melody = ctx.createOscillator();
    melody.type = wave;
    melody.frequency.value = base * 2;
    const mg = ctx.createGain();
    mg.gain.value = 0.04;
    melody.connect(mg);
    mg.connect(masterFilter);
    melody.start();
    this.nodes.push(melody, mg);

    let step = 0;
    const timer = setInterval(() => {
      if (!this.ctx || this.themeId !== civ.id) {
        clearInterval(timer);
        return;
      }
      const note = scale[step % scale.length];
      const freq = base * Math.pow(2, note / 12) * (step % 7 === 0 ? 2 : 1);
      melody.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.08);
      mg.gain.cancelScheduledValues(this.ctx.currentTime);
      mg.gain.setValueAtTime(0.0, this.ctx.currentTime);
      mg.gain.linearRampToValueAtTime(0.045, this.ctx.currentTime + 0.05);
      mg.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + beat * 1.4);
      step++;
    }, beat * 1000);
    this.nodes.push({ stop: () => clearInterval(timer), disconnect() {} });

    for (const kind of civ.ambient) this.addAmbient(kind, dest);
  }

  addAmbient(kind, dest) {
    const map = {
      wind: [400, 0.03],
      fire: [900, 0.02],
      birds: [2400, 0.015],
      river: [600, 0.04],
      market: [1200, 0.02],
      bells: [1800, 0.01],
      horses: [500, 0.012],
      rain: [1100, 0.05],
      ocean: [300, 0.045],
      machines: [220, 0.04],
      city: [700, 0.03],
      space: [180, 0.035],
    };
    const cfg = map[kind];
    if (!cfg) return;
    this.noiseSource(cfg[0], cfg[1], dest);
  }

  playPortal() {
    if (!this.ready) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 2.4);
    osc.frequency.exponentialRampToValueAtTime(220, now + 5.2);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(0.18, now + 0.4);
    g.gain.exponentialRampToValueAtTime(0.08, now + 3.2);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 6.5);
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(2400, now + 2.8);
    osc.connect(filter);
    filter.connect(g);
    g.connect(this.sfx);
    osc.start(now);
    osc.stop(now + 6.6);

    const rumble = ctx.createOscillator();
    rumble.type = "sawtooth";
    rumble.frequency.value = 42;
    const rg = ctx.createGain();
    rg.gain.value = 0.04;
    rumble.connect(rg);
    rg.connect(this.sfx);
    rumble.start(now);
    rumble.stop(now + 5.8);

    const chime = ctx.createOscillator();
    chime.type = "triangle";
    chime.frequency.value = 523.25;
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.0001, now + 5.4);
    cg.gain.exponentialRampToValueAtTime(0.12, now + 5.55);
    cg.gain.exponentialRampToValueAtTime(0.0001, now + 8);
    chime.connect(cg);
    cg.connect(this.sfx);
    chime.start(now + 5.4);
    chime.stop(now + 8);
  }

  playUI() {
    if (!this.ready) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    osc.frequency.value = 660;
    const g = ctx.createGain();
    g.gain.value = 0.04;
    osc.connect(g);
    g.connect(this.sfx);
    osc.start();
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.stop(ctx.currentTime + 0.2);
  }
}

export function themeForIndex(i) {
  return CIVILIZATIONS[i];
}
