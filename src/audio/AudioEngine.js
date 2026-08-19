import { CIVILIZATIONS } from "../data/civilizations.js";
import { state, persist } from "../state.js";

const SOUND_PROFILES = {
  "first-hearth": {
    voices: [["sine", 1, 0.09], ["triangle", 1.5, 0.045], ["sine", 2, 0.025]],
    pattern: [0, 3, 5, 7, 3],
    ambient: ["wind", "fire", "chirp", "water"],
  },
  sothara: {
    voices: [["triangle", 1, 0.07], ["sine", 1.25, 0.035], ["triangle", 2, 0.04]],
    pattern: [0, 2, 5, 7, 9, 5],
    ambient: ["water", "reed", "market", "bird"],
  },
  "jade-mandate": {
    voices: [["sine", 1, 0.06], ["triangle", 1.5, 0.035], ["sine", 2.5, 0.025]],
    pattern: [0, 2, 3, 7, 9, 7],
    ambient: ["wind", "bell", "water", "bird"],
  },
  "helion-league": {
    voices: [["triangle", 1, 0.06], ["sine", 1.5, 0.03], ["sawtooth", 2, 0.018]],
    pattern: [0, 2, 4, 7, 9, 11, 7],
    ambient: ["ocean", "lyre", "gull", "market"],
  },
  "blackwood-crown": {
    voices: [["triangle", 1, 0.08], ["sine", 1.5, 0.025], ["triangle", 2, 0.035]],
    pattern: [0, 2, 3, 7, 8, 3],
    ambient: ["rain", "bell", "horse", "fire"],
  },
  "vesper-atelier": {
    voices: [["square", 1, 0.018], ["triangle", 1.5, 0.04], ["sine", 2, 0.035]],
    pattern: [0, 2, 4, 5, 7, 9, 11],
    ambient: ["market", "lyre", "water", "bird"],
  },
  ironwake: {
    voices: [["sawtooth", 1, 0.035], ["square", 2, 0.025], ["triangle", 0.5, 0.055]],
    pattern: [0, 2, 3, 5, 7, 8, 10],
    ambient: ["machine", "steam", "rain", "water"],
  },
  "meridian-city": {
    voices: [["sine", 1, 0.045], ["square", 1.5, 0.018], ["triangle", 2, 0.03]],
    pattern: [0, 2, 4, 7, 9, 11],
    ambient: ["city", "grid", "traffic", "ocean"],
  },
  aetheris: {
    voices: [["sine", 1, 0.055], ["triangle", 1.5, 0.03], ["sine", 2.5, 0.02]],
    pattern: [0, 2, 5, 7, 9, 10],
    ambient: ["drone", "bird", "water", "wind"],
  },
  "vega-ark": {
    voices: [["sine", 1, 0.05], ["triangle", 1.5, 0.025], ["sine", 3, 0.02]],
    pattern: [0, 2, 4, 7, 9],
    ambient: ["space", "beacon", "machine", "drone"],
  },
};

const DEFAULT_SOUND_PROFILE = {
  voices: [["sine", 1, 0.07], ["triangle", 1.5, 0.035], ["sine", 2, 0.025]],
  pattern: [0, 2, 5, 7, 9],
  ambient: ["wind"],
};

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
    const { tempo, base, scale, filter } = civ.music;
    const profile = SOUND_PROFILES[civ.id] || DEFAULT_SOUND_PROFILE;
    const beat = 60 / tempo;
    const masterFilter = ctx.createBiquadFilter();
    masterFilter.type = "lowpass";
    masterFilter.frequency.value = filter;
    masterFilter.connect(dest);

    const voices = profile.voices.map(([wave, ratio, gain]) => {
      const oscillator = ctx.createOscillator();
      oscillator.type = wave;
      oscillator.frequency.value = base * ratio;
      const voiceGain = ctx.createGain();
      voiceGain.gain.value = gain;
      oscillator.connect(voiceGain);
      voiceGain.connect(masterFilter);
      oscillator.start();
      this.nodes.push(oscillator, voiceGain);
      return { oscillator, voiceGain, ratio };
    });

    let step = 0;
    const timer = setInterval(() => {
      if (!this.ctx || this.themeId !== civ.id) {
        clearInterval(timer);
        return;
      }
      const note = profile.pattern[step % profile.pattern.length] ?? scale[step % scale.length];
      voices.forEach(({ oscillator, voiceGain, ratio }, index) => {
        const voiceNote = note + (index === 0 ? 0 : index * 2);
        const freq = base * ratio * Math.pow(2, voiceNote / 12);
        oscillator.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.08);
        voiceGain.gain.cancelScheduledValues(this.ctx.currentTime);
        voiceGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
        voiceGain.gain.linearRampToValueAtTime(profile.voices[index][2], this.ctx.currentTime + 0.05);
        voiceGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + beat * (index === 0 ? 1.4 : 1.1));
      });
      step++;
    }, beat * 1000);
    this.nodes.push({ stop: () => clearInterval(timer), disconnect() {} });

    for (const kind of profile.ambient) this.addAmbient(kind, dest);
  }

  addAmbient(kind, dest) {
    const map = {
      wind: [400, 0.03],
      water: [600, 0.035],
      market: [1200, 0.02],
      ocean: [300, 0.045],
      rain: [1100, 0.05],
      city: [700, 0.03],
      machine: [220, 0.04],
      space: [180, 0.035],
    };
    if (["fire", "chirp", "reed", "bird", "bell", "lyre", "gull", "horse", "steam", "grid", "traffic", "drone", "beacon"].includes(kind)) {
      this.pulseAmbient(kind, dest);
      return;
    }
    const cfg = map[kind];
    if (!cfg) return;
    this.noiseSource(cfg[0], cfg[1], dest);
  }

  pulseAmbient(kind, dest) {
    const ctx = this.ctx;
    const definitions = {
      fire: [130, 320, 0.16, "triangle"],
      chirp: [900, 2400, 0.18, "sine"],
      reed: [220, 1700, 0.45, "triangle"],
      bird: [1300, 2800, 0.16, "sine"],
      bell: [440, 2600, 1.1, "triangle"],
      lyre: [330, 1900, 0.5, "sine"],
      gull: [700, 3200, 0.35, "sine"],
      horse: [110, 1800, 0.18, "triangle"],
      steam: [80, 700, 0.24, "sawtooth"],
      grid: [60, 1200, 0.35, "sine"],
      traffic: [90, 1500, 0.12, "square"],
      drone: [180, 2100, 0.8, "sine"],
      beacon: [220, 1600, 0.35, "triangle"],
    };
    const [frequency, period, duration, wave] = definitions[kind];
    const active = new Set();
    const emit = () => {
      if (!this.ctx) return;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      oscillator.type = wave;
      oscillator.frequency.setValueAtTime(frequency, now);
      if (["chirp", "bird", "gull"].includes(kind)) {
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.8, now + duration * 0.5);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.7, now + duration);
      }
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(kind === "drone" ? 0.012 : 0.035, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(gain);
      gain.connect(dest);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.02);
      const sound = { oscillator, gain };
      active.add(sound);
      oscillator.addEventListener("ended", () => active.delete(sound));
    };
    emit();
    const timer = setInterval(emit, period);
    this.nodes.push({
      stop: () => {
        clearInterval(timer);
        active.forEach(({ oscillator, gain }) => {
          try {
            oscillator.stop();
          } catch {
            /* already stopped */
          }
          oscillator.disconnect();
          gain.disconnect();
        });
        active.clear();
      },
      disconnect: () => active.clear(),
    });
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
