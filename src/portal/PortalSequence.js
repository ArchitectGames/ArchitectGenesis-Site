export class PortalSequence {
  constructor(overlay, canvas, titleEl, yearEl) {
    this.overlay = overlay;
    this.canvas = canvas;
    this.titleEl = titleEl;
    this.yearEl = yearEl;
    this.ctx = canvas.getContext("2d");
  }

  async run(civ, { onDive } = {}) {
    this.overlay.hidden = false;
    this.titleEl.textContent = civ.name;
    this.yearEl.textContent = civ.year;
    const c = this.ctx;
    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    resize();
    const start = performance.now();
    const duration = 6400;
    const rings = Array.from({ length: 18 }, (_, i) => ({
      r: 40 + i * 28,
      speed: 0.4 + i * 0.03,
      offset: i * 0.35,
    }));
    const motes = Array.from({ length: 220 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: Math.random(),
      z: Math.random(),
      s: 0.4 + Math.random(),
    }));

    await new Promise((resolve) => {
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const w = this.canvas.width;
        const h = this.canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        c.fillStyle = `rgba(0,0,0,${0.18 + t * 0.2})`;
        c.fillRect(0, 0, w, h);

        const accel = t * t * 18 + 1;
        c.save();
        c.translate(cx, cy);
        c.strokeStyle = `rgba(240, 217, 160, ${0.15 + t * 0.45})`;
        c.lineWidth = 1.2;
        for (const ring of rings) {
          c.beginPath();
          const radius = (ring.r + t * 90 * ring.speed) % (Math.max(w, h) * 0.7);
          c.ellipse(0, 0, radius * 0.72, radius * 0.28 + 8, t * 1.4 + ring.offset, 0, Math.PI * 2);
          c.stroke();
        }

        for (const m of motes) {
          const z = ((m.z + t * accel * 0.35) % 1);
          const depth = 0.08 + z * 1.6;
          const x = Math.cos(m.a) * m.r * 40 * depth * 12;
          const y = Math.sin(m.a) * m.r * 22 * depth * 12;
          const alpha = Math.min(1, z * 1.4) * 0.85;
          c.fillStyle = `rgba(232, 214, 170, ${alpha})`;
          c.fillRect(x, y, m.s * (1 + z * 3), m.s * (1 + z * 8));
        }

        c.restore();

        const years = ["12000 BC", "2686 BC", "210 BC", "431 BC", "1215", "1519", "1871", "2026", "2091", "3402", civ.year];
        const yi = Math.min(years.length - 1, Math.floor(t * years.length));
        this.yearEl.textContent = years[yi];

        if (t > 0.35 && onDive) onDive((t - 0.35) / 0.65);
        if (t < 1) requestAnimationFrame(tick);
        else resolve();
      };
      requestAnimationFrame(tick);
    });

    this.overlay.hidden = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
