import * as THREE from "three";
import { asset } from "../config.js";
import { CIVILIZATIONS } from "../data/civilizations.js";

export class LivingWorld {
  constructor(canvas, fallbackEl) {
    this.canvas = canvas;
    this.fallbackEl = fallbackEl;
    this.mode = "home";
    this.index = 0;
    this.clock = 0;
    this.mix = 1;
    this.reverse = 1;
    this.webgl = true;
    this.textures = [];
    this.planeB = null;
    this._resize = this.resize.bind(this);
  }

  async init() {
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setClearColor(0x070b14, 1);
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
      this.camera.position.set(0, 7.2, 11);

      const loader = new THREE.TextureLoader();
      this.textures = await Promise.all(
        CIVILIZATIONS.map(
          (civ) =>
            new Promise((resolve) => {
              loader.load(
                asset(civ.image),
                (t) => {
                  t.colorSpace = THREE.SRGBColorSpace;
                  t.anisotropy = 8;
                  resolve(t);
                },
                undefined,
                () => resolve(null)
              );
            })
        )
      );

      this.uniforms = {
        tA: { value: this.textures[0] },
        tB: { value: this.textures[0] },
        mixAmt: { value: 1 },
        time: { value: 0 },
        weather: { value: 0 },
      };

      const geo = new THREE.PlaneGeometry(24, 13.5, 48, 32);
      const mat = new THREE.MeshBasicMaterial({ map: this.textures[0], toneMapped: false });
      this.plane = new THREE.Mesh(geo, mat);
      this.plane.rotation.x = -0.72;
      this.scene.add(this.plane);
      const matB = new THREE.MeshBasicMaterial({
        map: this.textures[0],
        toneMapped: false,
        transparent: true,
        opacity: 0,
      });
      this.planeB = new THREE.Mesh(geo.clone(), matB);
      this.planeB.rotation.x = -0.72;
      this.planeB.position.y = 0.02;
      this.scene.add(this.planeB);

      this.particles = this.makeParticles();
      this.scene.add(this.particles);

      const light = new THREE.DirectionalLight(0xffe6c0, 1.1);
      light.position.set(4, 10, 6);
      this.scene.add(light);
      this.scene.add(new THREE.AmbientLight(0x334155, 0.6));
      this.scene.fog = new THREE.Fog(0x070b14, 12, 28);

      window.addEventListener("resize", this._resize);
      this.resize();
      this.canvas.hidden = false;
      if (this.fallbackEl) this.fallbackEl.hidden = true;
      this.loop();
    } catch {
      this.webgl = false;
      this.useFallback();
    }
  }

  makeParticles() {
    const count = 900;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = Math.random() * 8 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = 0.004 + Math.random() * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.particleVel = vel;
    const mat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xf0d9a0,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    return new THREE.Points(geo, mat);
  }

  useFallback() {
    this.webgl = false;
    this.canvas.hidden = true;
    if (this.fallbackEl) {
      this.fallbackEl.hidden = false;
      const civ = CIVILIZATIONS[this.index];
      this.fallbackEl.style.backgroundImage = `url("${asset(civ.image)}")`;
    }
  }

  setCivilization(index, { immediate = false } = {}) {
    const next = (index + CIVILIZATIONS.length) % CIVILIZATIONS.length;
    const civ = CIVILIZATIONS[next];
    if (this.webgl && this.plane && this.textures[next]) {
      if (immediate) {
        this.plane.material.map = this.textures[next];
        this.plane.material.needsUpdate = true;
        if (this.planeB) this.planeB.material.opacity = 0;
        this.mix = 1;
      } else {
        this.planeB.material.map = this.textures[next];
        this.planeB.material.needsUpdate = true;
        this.planeB.material.opacity = 0;
        this.mix = 0;
      }
      if (this.particles) {
        this.particles.material.color.set(civ.palette.light);
      }
      if (this.scene?.fog) this.scene.fog.color.set(civ.palette.fog);
    } else if (this.fallbackEl) {
      this.fallbackEl.style.backgroundImage = `url("${asset(civ.image)}")`;
    }
    this.index = next;
  }

  setMode(mode) {
    this.mode = mode;
  }

  setReverse(on) {
    this.reverse = on ? -1.8 : 1;
  }

  dive(amount) {
    this.diveAmt = amount;
  }

  resize() {
    if (!this.renderer) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / Math.max(h, 1);
    this.camera.updateProjectionMatrix();
  }

  loop() {
    const tick = () => {
      this.clock += 0.016 * this.reverse;
      if (this.webgl && this.renderer) {
        const t = this.clock;
        if (this.mix < 1 && this.planeB) {
          this.mix = Math.min(1, this.mix + 0.02);
          this.planeB.material.opacity = this.mix;
          if (this.mix >= 1) {
            this.plane.material.map = this.planeB.material.map;
            this.plane.material.needsUpdate = true;
            this.planeB.material.opacity = 0;
          }
        }
        const soar = this.mode === "portal" ? 0.08 : 0.035;
        const radius = this.mode === "simulate" ? 9.2 : 11.4;
        const height = this.mode === "simulate" ? 5.6 : 7.1;
        const dive = this.diveAmt || 0;
        this.camera.position.set(
          Math.sin(t * soar) * radius,
          height + Math.sin(t * soar * 0.7) * 0.7 - dive * 3.5,
          Math.cos(t * soar * 0.92) * radius * 0.9
        );
        this.camera.lookAt(0, 1.2 - dive * 2, 0);
        const pos = this.particles.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          pos.array[i * 3] += this.particleVel[i * 3] * this.reverse;
          pos.array[i * 3 + 1] += this.particleVel[i * 3 + 1] * this.reverse;
          pos.array[i * 3 + 2] += this.particleVel[i * 3 + 2] * this.reverse;
          if (pos.array[i * 3 + 1] > 8) pos.array[i * 3 + 1] = -1;
          if (pos.array[i * 3 + 1] < -1.4) pos.array[i * 3 + 1] = 7.5;
        }
        pos.needsUpdate = true;
        this.renderer.render(this.scene, this.camera);
      }
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }
}
