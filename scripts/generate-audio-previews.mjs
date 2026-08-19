import fs from "node:fs";
import path from "node:path";

const sampleRate = 22050;
const duration = 16;
const sampleCount = sampleRate * duration;
const outputDir = path.resolve("public/audio");

const profiles = [
  { id: "first-hearth", bpm: 38, root: 73, scale: [0, 3, 5, 7, 10], phrase: [0, 3, 0, 5, 7, 3], step: 2.2, style: "flute", wave: "flute", effect: "none" },
  { id: "sothara", bpm: 116, root: 196, scale: [0, 2, 5, 7, 9, 10], phrase: [0, 5, 2, 9, 7, 5], step: 0.5, style: "reed", wave: "reed", effect: "reed" },
  { id: "jade-mandate", bpm: 46, root: 110, scale: [0, 2, 3, 7, 9], phrase: [0, 2, 3, 7, 9, 7], step: 1.8, style: "qin", wave: "qin", effect: "chimes" },
  { id: "helion-league", bpm: 132, root: 220, scale: [0, 2, 4, 5, 7, 9, 11], phrase: [0, 4, 7, 11, 9, 7], step: 0.25, style: "lyre", wave: "lyre", effect: "harbor" },
  { id: "blackwood-crown", bpm: 42, root: 65, scale: [0, 2, 3, 7, 8, 10], phrase: [0, 7, 3, 0, 5], step: 3, style: "chant", wave: "chant", effect: "bells" },
  { id: "vesper-atelier", bpm: 168, root: 330, scale: [0, 2, 4, 5, 7, 9, 11], phrase: [0, 4, 7, 5, 9, 11, 7], step: 0.25, style: "lute", wave: "lute", effect: "workshop" },
  { id: "ironwake", bpm: 104, root: 55, scale: [0, 2, 3, 5, 7, 8, 10], phrase: [0, 0, 3, 0, 7, 0], step: 0.25, style: "engine", wave: "engine", effect: "clanks" },
  { id: "meridian-city", bpm: 128, root: 165, scale: [0, 2, 4, 7, 9, 11], phrase: [0, 7, 4, 11, 7, 2], step: 0.25, style: "synth", wave: "synth", effect: "traffic" },
  { id: "aetheris", bpm: 58, root: 260, scale: [0, 2, 5, 7, 9, 10], phrase: [0, 7, 12, 9, 14], step: 2, style: "glass", wave: "glass", effect: "birds" },
  { id: "vega-ark", bpm: 52, root: 82, scale: [0, 2, 4, 7, 9], phrase: [0, 7, 12, 7, 14, 12], step: 1.25, style: "orbital", wave: "orbital", effect: "beacon" },
];

const noteFrequency = (root, semitone) => root * 2 ** (semitone / 12);

function oscillator(type, phase) {
  if (type === "square") return phase % (Math.PI * 2) < Math.PI ? 1 : -1;
  if (type === "saw") return ((phase / Math.PI) % 2) - 1;
  if (type === "triangle") return 1 - 4 * Math.abs(Math.round(phase / (Math.PI * 2)) - phase / (Math.PI * 2));
  return Math.sin(phase);
}

function writeWav(filePath, samples) {
  const buffer = Buffer.alloc(44 + samples.length * 2);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + samples.length * 2, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(samples.length * 2, 40);
  samples.forEach((sample, index) => buffer.writeInt16LE(Math.max(-1, Math.min(1, sample)) * 32767, 44 + index * 2));
  fs.writeFileSync(filePath, buffer);
}

function makePreview(profile, index) {
  const output = new Float32Array(sampleCount);
  const beat = 60 / profile.bpm;
  const noteLength = beat * profile.step * (profile.wave === "orbital" ? 1.8 : profile.wave === "engine" ? 0.55 : 1.15);
  const notes = [];
  for (let time = 0; time < duration; time += beat * profile.step) {
    const step = Math.floor(time / (beat * profile.step));
    const degree = profile.phrase[step % profile.phrase.length];
    const octave = step % 8 === 0 ? -12 : step % 5 === 0 ? 12 : 0;
    notes.push({ time, frequency: noteFrequency(profile.root, degree + octave), strength: step % 7 === 0 ? 1.15 : 0.8 });
  }

  for (let indexSample = 0; indexSample < sampleCount; indexSample++) {
    const time = indexSample / sampleRate;
    const beatPhase = time / beat;
    let value = profile.style === "flute" ? 0 : Math.sin(time * profile.root * Math.PI * 2) * 0.02;
    if (profile.style === "reed") value += Math.sin(time * profile.root * 0.5 * Math.PI * 2) * 0.08;
    if (profile.style === "chant") {
      value += Math.sin(time * profile.root * Math.PI * 2) * 0.07;
      value += Math.sin(time * profile.root * 1.5 * Math.PI * 2) * 0.055;
      value += Math.sin(time * profile.root * 2 * Math.PI * 2) * 0.035;
    }
    if (profile.style === "engine") value += oscillator("square", beatPhase * Math.PI * 2) * 0.1;
    if (profile.style === "synth") value += oscillator("square", beatPhase * Math.PI * 2) * 0.045;
    if (profile.style === "glass") value += Math.sin(time * profile.root * 3.98 * Math.PI * 2) * 0.045;
    if (profile.style === "orbital") {
      value += Math.sin(time * profile.root * 0.5 * Math.PI * 2) * 0.1;
      value += Math.sin(time * profile.root * 1.5 * Math.PI * 2) * 0.035;
    }

    for (const note of notes) {
      const elapsed = time - note.time;
      if (elapsed < 0 || elapsed > noteLength) continue;
      const phase = elapsed * note.frequency * Math.PI * 2;
      const attack = Math.min(1, elapsed / 0.025);
      const release = Math.max(0, 1 - elapsed / noteLength);
      const envelope = attack * release ** (profile.wave === "glass" || profile.wave === "orbital" ? 0.7 : 1.6);
      let tone = oscillator(profile.wave === "engine" ? "saw" : profile.wave === "synth" ? "square" : "sine", phase);
      if (profile.wave === "qin") tone = oscillator("triangle", phase) * 0.7 + Math.sin(phase * 2.01) * 0.3;
      if (profile.wave === "lyre" || profile.wave === "lute") tone = Math.sin(phase) * 0.75 + Math.sin(phase * 2.01) * 0.2;
      if (profile.wave === "chant") tone = Math.sin(phase) * 0.8 + Math.sin(phase * 0.5) * 0.18;
      if (profile.wave === "glass") tone = Math.sin(phase) * 0.7 + Math.sin(phase * 3.98) * 0.18;
      const level = profile.style === "flute" ? 0.12 : profile.style === "chant" ? 0.08 : profile.style === "engine" ? 0.22 : 0.18;
      value += tone * envelope * level * note.strength;
    }

    const texturePulse = Math.sin(time * Math.PI * 2 / (profile.texture === "machine" ? 0.34 : profile.texture === "grid" ? 0.48 : 1.9));
    if (profile.texture === "fire") value += Math.sin(time * 73 * Math.PI * 2) * Math.max(0, texturePulse) * 0.004;
    if (profile.texture === "reed") value += Math.sin(time * 196 * Math.PI * 2) * Math.max(0, texturePulse) * 0.004;
    if (profile.texture === "workshop") value += Math.sin(time * 311 * Math.PI * 2) * Math.max(0, texturePulse) * 0.003;
    if (profile.texture === "machine" || profile.texture === "grid") value += texturePulse * 0.025;
    if (profile.texture === "bell" || profile.texture === "signal") value += Math.sin(time * Math.PI * 2 * (profile.texture === "bell" ? 440 : 220)) * Math.max(0, texturePulse) * 0.012;
    if (profile.texture === "sea") value += Math.sin(time * 0.31 * Math.PI * 2) * 0.005;
    if (profile.texture === "air") value += Math.sin(time * 0.17 * Math.PI * 2) * 0.004;

    const fade = Math.min(1, time / 0.5, (duration - time) / 0.7);
    output[indexSample] = value * Math.max(0, fade);
  }
  return output;
}

const EFFECTS = {
  fire: [88, 180, 0.16, "triangle", 0.9],
  reed: [640, 920, 0.22, "triangle", 1.3],
  chimes: [880, 1760, 1.4, "sine", 2.4],
  harbor: [520, 760, 0.18, "sine", 0.8],
  bells: [220, 440, 1.8, "triangle", 3.2],
  workshop: [440, 660, 0.08, "square", 0.55],
  clanks: [70, 110, 0.11, "square", 0.38],
  traffic: [120, 240, 0.08, "square", 0.28],
  birds: [900, 1500, 0.16, "sine", 2.8],
  beacon: [180, 360, 0.7, "sine", 4.2],
};

function makeEffects(profile, index) {
  const output = new Float32Array(sampleCount);
  if (profile.effect === "none") return output;
  const [low, high, duration, wave, interval] = EFFECTS[profile.effect];
  const events = [];
  for (let time = (index % 3) * interval * 0.3; time < 16; time += interval) {
    events.push({ time, frequency: low + ((events.length * 37) % 100) / 100 * (high - low) });
  }
  for (let indexSample = 0; indexSample < sampleCount; indexSample++) {
    const time = indexSample / sampleRate;
    let value = 0;
    for (const event of events) {
      const elapsed = time - event.time;
      if (elapsed < 0 || elapsed > duration) continue;
      const phase = elapsed * event.frequency * Math.PI * 2;
      const envelope = Math.min(1, elapsed / 0.008) * Math.max(0, 1 - elapsed / duration) ** 2;
      let tone = oscillator(wave, phase);
      if (profile.effect === "birds" || profile.effect === "reed" || profile.effect === "harbor") {
        tone = Math.sin(phase * (1 + Math.sin(elapsed * 9) * 0.08));
      }
      value += tone * envelope * 0.08;
    }
    output[indexSample] = value * Math.min(1, time / 0.5, (duration - time) / 0.7);
  }
  return output;
}

fs.mkdirSync(outputDir, { recursive: true });
for (const [index, profile] of profiles.entries()) {
  writeWav(path.join(outputDir, `${profile.id}.wav`), makePreview(profile, index));
  writeWav(path.join(outputDir, `${profile.id}-effects.wav`), makeEffects(profile, index));
}
console.log(`Generated ${profiles.length} music and effects stems in ${outputDir}`);
