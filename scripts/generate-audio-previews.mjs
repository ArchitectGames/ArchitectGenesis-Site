import fs from "node:fs";
import path from "node:path";

const sampleRate = 22050;
const duration = 16;
const sampleCount = sampleRate * duration;
const outputDir = path.resolve("public/audio");

const profiles = [
  { id: "first-hearth", bpm: 52, root: 98, scale: [0, 3, 5, 7, 10], phrase: [0, 3, 0, 5, 7, 3], step: 1, wave: "flute", texture: "fire" },
  { id: "sothara", bpm: 64, root: 130, scale: [0, 2, 5, 7, 9, 10], phrase: [0, 5, 2, 9, 7, 5], step: 1.5, wave: "reed", texture: "reed" },
  { id: "jade-mandate", bpm: 58, root: 118, scale: [0, 2, 3, 7, 9], phrase: [0, 2, 3, 7, 9, 7], step: 1.25, wave: "qin", texture: "bell" },
  { id: "helion-league", bpm: 72, root: 146, scale: [0, 2, 4, 5, 7, 9, 11], phrase: [0, 4, 7, 11, 9, 7], step: 0.75, wave: "lyre", texture: "sea" },
  { id: "blackwood-crown", bpm: 56, root: 110, scale: [0, 2, 3, 7, 8, 10], phrase: [0, 7, 3, 0, 5], step: 2, wave: "chant", texture: "bell" },
  { id: "vesper-atelier", bpm: 76, root: 156, scale: [0, 2, 4, 5, 7, 9, 11], phrase: [0, 4, 7, 5, 9, 11, 7], step: 0.5, wave: "lute", texture: "workshop" },
  { id: "ironwake", bpm: 88, root: 90, scale: [0, 2, 3, 5, 7, 8, 10], phrase: [0, 0, 3, 0, 7, 0], step: 0.5, wave: "engine", texture: "machine" },
  { id: "meridian-city", bpm: 96, root: 140, scale: [0, 2, 4, 7, 9, 11], phrase: [0, 7, 4, 11, 7, 2], step: 0.5, wave: "synth", texture: "grid" },
  { id: "aetheris", bpm: 84, root: 128, scale: [0, 2, 5, 7, 9, 10], phrase: [0, 7, 12, 9, 14], step: 1.75, wave: "glass", texture: "air" },
  { id: "vega-ark", bpm: 48, root: 82, scale: [0, 2, 4, 7, 9], phrase: [0, 12, 7, 19, 14], step: 2.5, wave: "orbital", texture: "signal" },
];

const random = (seed) => {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 0x100000000;
  };
};

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
  const noise = random(9001 + index * 177);
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
    let value = Math.sin(time * profile.root * Math.PI * 2) * (profile.wave === "orbital" ? 0.09 : 0.035);
    value += Math.sin(time * profile.root * 0.5 * Math.PI * 2) * (profile.wave === "engine" ? 0.08 : 0.018);

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
      value += tone * envelope * 0.16 * note.strength;
    }

    const texturePulse = Math.sin(time * Math.PI * 2 / (profile.texture === "machine" ? 0.34 : profile.texture === "grid" ? 0.48 : 1.9));
    if (profile.texture === "fire" || profile.texture === "reed" || profile.texture === "workshop") value += (noise() * 2 - 1) * 0.012 * Math.max(0, texturePulse);
    if (profile.texture === "machine" || profile.texture === "grid") value += texturePulse * 0.025;
    if (profile.texture === "bell" || profile.texture === "signal") value += Math.sin(time * Math.PI * 2 * (profile.texture === "bell" ? 440 : 220)) * Math.max(0, texturePulse) * 0.012;
    if (profile.texture === "sea" || profile.texture === "air") value += (noise() * 2 - 1) * 0.006;

    const fade = Math.min(1, time / 0.5, (duration - time) / 0.7);
    output[indexSample] = value * Math.max(0, fade);
  }
  return output;
}

fs.mkdirSync(outputDir, { recursive: true });
for (const [index, profile] of profiles.entries()) {
  writeWav(path.join(outputDir, `${profile.id}.wav`), makePreview(profile, index));
}
console.log(`Generated ${profiles.length} civilization previews in ${outputDir}`);
