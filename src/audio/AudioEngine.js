import { CIVILIZATIONS } from "../data/civilizations.js";
import { asset } from "../config.js";
import { state, persist } from "../state.js";

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.music = null;
    this.sfx = null;
    this.source = null;
    this.effectSource = null;
    this.themeId = null;
    this.themeLoadId = 0;
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
  }

  applyPrefs() {
    if (!this.master) return;
    this.master.gain.value = state.audio.muted ? 0 : state.audio.master;
    this.music.gain.value = state.audio.music;
    this.sfx.gain.value = state.audio.sfx;
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

  stopTheme() {
    this.themeLoadId += 1;
    if (this.source) {
      try {
        this.source.stop();
      } catch {
        /* already stopped */
      }
      this.source.disconnect();
      this.source = null;
    }
    if (this.effectSource) {
      try {
        this.effectSource.stop();
      } catch {
        /* already stopped */
      }
      this.effectSource.disconnect();
      this.effectSource = null;
    }
    if (this.music) this.music.gain.value = 0;
    this.themeId = null;
  }

  playTheme(civ) {
    if (!this.ready || !civ || this.themeId === civ.id) return;
    this.loadTheme(civ);
  }

  async loadTheme(civ) {
    this.stopTheme();
    const requestId = this.themeLoadId;
    try {
      const response = await fetch(asset(`audio/${civ.id}.wav`));
      const effectsResponse = await fetch(asset(`audio/${civ.id}-effects.wav`));
      if (!response.ok || !effectsResponse.ok) throw new Error(`Unable to load ${civ.id} audio`);
      const [buffer, effectsBuffer] = await Promise.all([
        this.ctx.decodeAudioData(await response.arrayBuffer()),
        this.ctx.decodeAudioData(await effectsResponse.arrayBuffer()),
      ]);
      if (requestId !== this.themeLoadId || !this.ctx) return;
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(this.music);
      source.start();
      const effectSource = this.ctx.createBufferSource();
      effectSource.buffer = effectsBuffer;
      effectSource.loop = true;
      effectSource.connect(this.sfx);
      effectSource.start();
      this.source = source;
      this.effectSource = effectSource;
      this.music.gain.value = state.audio.music;
      this.themeId = civ.id;
    } catch {
      if (requestId === this.themeLoadId) this.themeId = null;
    }
  }
}

export function themeForIndex(i) {
  return CIVILIZATIONS[i];
}
