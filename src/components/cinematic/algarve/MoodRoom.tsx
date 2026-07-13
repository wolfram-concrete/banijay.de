"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// MOOD-DEMO (Testroute /mood-test): invertierte Farblogik + „Raum".
// Drei Schichten erzeugen die Tiefe (Rezept nach nudot.com.tw-Analyse, eigener Code):
//   ① Basis: Brombeere/Black-Verlauf + zwei träge driftende, geblurte Farb-Orbs (GSAP)
//   ② Inhalt: Ökosystem-Orbits (SVG, aus dem Figma rekonstruiert) + Milchglas-Cards
//   ③ Finish: Filmkorn-Overlay (vorgebackene Noise-Frames, mix-blend screen)
// Palette: --ink #0a0208 · Brombeere #1c0714/#2e0b20 · Magenta vibrant #ff4370

const MAGENTA = "#ff4370";
const PAPER = "#f8f7f3";
const SHARP = "var(--font-sharp), sans-serif";

/** ③ Filmkorn — 2D-Canvas, 10 vorgebackene Frames @ ~24fps, mobil/reduced-motion aus. */
function FilmGrain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.innerWidth <= 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FRAMES = 10;
    let frames: ImageData[] = [];
    let idx = 0;
    let timer = 0;
    let raf = 0;
    let running = true;

    const bake = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      frames = [];
      for (let i = 0; i < FRAMES; i++) {
        const d = ctx.createImageData(canvas.width, canvas.height);
        const buf = new Uint32Array(d.data.buffer);
        for (let p = 0; p < buf.length; p++) if (Math.random() < 0.6) buf[p] = 0xffffffff;
        frames.push(d);
      }
    };

    const tick = () => {
      if (!running) return;
      if (document.visibilityState !== "hidden") {
        idx = (idx + 1) % FRAMES;
        ctx.putImageData(frames[idx], 0, 0);
      }
      timer = window.setTimeout(() => {
        raf = requestAnimationFrame(tick);
      }, 1000 / 24);
    };

    bake();
    raf = requestAnimationFrame(tick);
    let resizeT = 0;
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(bake, 200);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      running = false;
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 60, mixBlendMode: "screen", opacity: 0.055, contain: "strict" }}
    />
  );
}

/** Wiederverwendbare Staub-Ebene (die freigegebene „Staub statt Sterne"-Technik)
    als Layer — füllt den Eltern-Container, bringt Kameraschwenk + Maus-Parallaxe mit.
    `color`/`accent` als "r,g,b"-Tripel → Farbvarianten (weiß, magenta, schwarz …). */
function DustCanvas({
  color = "248,247,243",
  accent = "255,67,112",
  boost = 1, // Alpha-Multiplikator — dunklere Staubfarben (Magenta) brauchen mehr
}: { color?: string; accent?: string; boost?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = wrap.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // MAKRO (Agent\c-Referenz) + KAMERASCHWENK: der Staub liegt in DREI Tiefen-
    // Ebenen (fern/mittel/nah), jeweils einmalig offscreen gerendert mit Überstand
    // (Overscan). Pro Frame verschieben sich die Ebenen unterschiedlich stark —
    // eine träge Lissajous-Eigendrift (Schwenk) plus sanfte Maus-Parallaxe
    // (Sensorik). Fern bewegt sich kaum, nah am meisten → Tiefeneindruck.
    type Twinkler = { x: number; y: number; r: number; base: number; amp: number; freq: number; phase: number; spark: boolean; magenta: boolean };
    type Layer = { cv: HTMLCanvasElement; depth: number };
    let twinklers: Twinkler[] = [];
    let layers: Layer[] = [];
    let W = 0, H = 0, raf = 0, visible = true;
    const OVER = 1.22; // Overscan, damit beim Schwenken keine Kanten sichtbar werden
    const mouse = { x: 0, y: 0 }; // -0.5..0.5 relativ zur Viewportmitte
    const eased = { x: 0, y: 0 }; // träge nachgeführt

    // Lichtfeld: Quelle oben rechts, weicher diagonaler Abfall + dünner Grundstaub.
    const intensity = (x: number, y: number, w: number, h: number) => {
      const dx = x / w - 0.82, dy = y / h - 0.06;
      const d = Math.sqrt(dx * dx + dy * dy * 1.35);
      return Math.pow(Math.max(0, 1 - d / 1.15), 2.6);
    };

    const build = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      W = canvas.width = Math.round(rect.width * dpr);
      H = canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      const LW = Math.round(W * OVER), LH = Math.round(H * OVER);

      // ① drei Staub-Ebenen — fern: viele feinste Punkte, nah: wenige gröbere
      const spec = [
        { depth: 0.3, share: 0.58, size: 0.45, alpha: 0.85 },
        { depth: 0.62, share: 0.3, size: 0.7, alpha: 1 },
        { depth: 1.0, share: 0.12, size: 1.15, alpha: 1 },
      ];
      const ATTEMPTS = Math.min(160000, Math.round((LW * LH) / 20));
      layers = spec.map((sp) => {
        const cv = document.createElement("canvas");
        cv.width = LW;
        cv.height = LH;
        const c2 = cv.getContext("2d")!;
        const n = Math.round(ATTEMPTS * sp.share);
        for (let i = 0; i < n; i++) {
          const x = Math.random() * LW;
          const y = Math.random() * LH;
          const f = intensity(x, y, LW, LH);
          if (Math.random() > f * 0.94 + 0.05) continue;
          const a = Math.min(1, (0.1 + f * 0.55 + Math.random() * 0.18) * sp.alpha * boost);
          c2.fillStyle = `rgba(${color},${a})`;
          c2.fillRect(x, y, sp.size * dpr, sp.size * dpr);
        }
        return { cv, depth: sp.depth };
      });

      // ② dünne Twinkle-Schicht (~500 Punkte, in der Mittel-Ebene verankert)
      twinklers = [];
      const N = 500;
      let guard = 0;
      while (twinklers.length < N && guard++ < N * 40) {
        const x = Math.random() * LW;
        const y = Math.random() * LH;
        const f = intensity(x, y, LW, LH);
        if (Math.random() > f * 0.9 + 0.1) continue;
        twinklers.push({
          x, y,
          r: 0.5 + Math.random() * 0.8,
          base: 0.2 + f * 0.4,
          amp: 0.15 + Math.random() * 0.35,
          freq: 0.3 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
          spark: Math.random() < 0.05,
          magenta: Math.random() < 0.02,
        });
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const dpr = Math.min(devicePixelRatio || 1, 2);
      // Kameraschwenk: Lissajous-Drift (zwei inkommensurable Perioden ≈ 47s/71s)
      // + Maus-Parallaxe, beides mit der Tiefe skaliert.
      const margin = (W * (OVER - 1)) / 2;
      const panX = reduced ? 0 : Math.sin(t * 0.000134) * margin * 0.5;
      const panY = reduced ? 0 : Math.cos(t * 0.000088) * margin * 0.32;
      eased.x += (mouse.x - eased.x) * 0.03; // träge Sensorik
      eased.y += (mouse.y - eased.y) * 0.03;
      const sensX = reduced ? 0 : eased.x * margin * 0.55;
      const sensY = reduced ? 0 : eased.y * margin * 0.35;
      const off = (depth: number) => ({
        x: -margin + (panX + sensX) * depth,
        y: -(H * (OVER - 1)) / 2 + (panY + sensY) * depth,
      });

      for (const l of layers) {
        const o = off(l.depth);
        ctx.drawImage(l.cv, o.x, o.y);
      }
      const om = off(0.62); // Twinkler leben in der Mittel-Ebene
      for (const s of twinklers) {
        let a: number;
        if (reduced) a = s.base;
        else if (s.spark) {
          const w = Math.sin(t * 0.001 * s.freq + s.phase);
          a = s.base * 0.5 + Math.pow(Math.max(0, w), 12);
        } else {
          a = s.base + s.amp * Math.sin(t * 0.001 * s.freq + s.phase);
        }
        if (a <= 0.02) continue;
        ctx.beginPath();
        ctx.arc(s.x + om.x, s.y + om.y, s.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = s.magenta ? `rgba(${accent},${Math.min(1, a)})` : `rgba(${color},${Math.min(1, a)})`;
        ctx.fill();
      }
    };

    const tick = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(tick);
    };

    build();
    if (reduced) draw(0);
    else raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.05 });
    io.observe(host);
    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(build, 200);
    };
    window.addEventListener("resize", onResize, { passive: true });
    // Sensorik: Mausposition relativ zur Viewportmitte (-0.5..0.5), im draw() träge nachgeführt
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [color, accent, boost]);

  return (
    <div ref={wrap} className="absolute inset-0">
      <canvas ref={ref} className="absolute inset-0" aria-hidden />
    </div>
  );
}

/** Sektion „Staub statt Sterne" (FREIGEGEBEN) — die Staub-Ebene solo. */
function GalaxyField() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-clip" style={{ zIndex: 1, background: "#050208" }}>
      <DustCanvas />
      <div className="relative max-w-[560px] px-12 pb-24 max-[767px]:px-6 max-[767px]:pb-16">
        <p className="m-0 mb-3 text-[0.7rem] font-bold uppercase tracking-[0.16em]" style={{ color: MAGENTA, fontFamily: SHARP }}>
          Sternenstaub
        </p>
        <h2 className="m-0 text-[2.6rem] leading-[1.08] max-[767px]:text-[1.9rem]" style={{ fontFamily: SHARP, fontWeight: 500, color: PAPER }}>
          Staub statt Sterne.
        </h2>
        <p className="m-0 mt-4 text-[1rem] leading-relaxed" style={{ color: "rgba(248,247,243,0.6)" }}>
          Makro-Lichtmasse aus ~50.000 Mikropunkten (Agent\c-Referenz): der Staub ist statisch vorgerendert,
          nur eine dünne Schicht funkelt — große Form, feines Korn, keine Verspieltheit.
        </p>
      </div>
    </section>
  );
}

/** Farbvariante A: MAGENTA-Staub auf dunklem Brombeer-Grund (Akzente in Weiß). */
function GalaxyFieldMagenta() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-clip" style={{ zIndex: 1, background: "#0a0208" }}>
      <DustCanvas color="255,67,112" accent="248,247,243" boost={1.6} />
      <div className="relative max-w-[560px] px-12 pb-24 max-[767px]:px-6 max-[767px]:pb-16">
        <p className="m-0 mb-3 text-[0.7rem] font-bold uppercase tracking-[0.16em]" style={{ color: MAGENTA, fontFamily: SHARP }}>
          Variante A
        </p>
        <h2 className="m-0 text-[2.6rem] leading-[1.08] max-[767px]:text-[1.9rem]" style={{ fontFamily: SHARP, fontWeight: 500, color: PAPER }}>
          Magenta-Staub.
        </h2>
        <p className="m-0 mt-4 text-[1rem] leading-relaxed" style={{ color: "rgba(248,247,243,0.6)" }}>
          Dieselbe Lichtmasse, aber der Staub selbst ist Magenta — die Akzent-Funkler weiß.
          Wärmer, markiger, sehr Banijay.
        </p>
      </div>
    </section>
  );
}

/** Farbvariante B: SCHWARZER Staub auf vibranter Magenta-Fläche (invertiert). */
function GalaxyFieldInverted() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-clip" style={{ zIndex: 1, background: MAGENTA }}>
      <DustCanvas color="10,2,8" accent="248,247,243" />
      <div className="relative max-w-[560px] px-12 pb-24 max-[767px]:px-6 max-[767px]:pb-16">
        <p className="m-0 mb-3 text-[0.7rem] font-bold uppercase tracking-[0.16em]" style={{ color: "#0a0208", fontFamily: SHARP }}>
          Variante B
        </p>
        <h2 className="m-0 text-[2.6rem] leading-[1.08] max-[767px]:text-[1.9rem]" style={{ fontFamily: SHARP, fontWeight: 500, color: "#0a0208" }}>
          Schwarz auf Magenta.
        </h2>
        <p className="m-0 mt-4 text-[1rem] leading-relaxed" style={{ color: "rgba(10,2,8,0.66)" }}>
          Invertiert: schwarzer Staub auf der vibranten Highlight-Fläche — für laute Momente
          (Kampagnen-Panels, CTAs), wenn die dunkle Welt kurz aufreißt.
        </p>
      </div>
    </section>
  );
}

// Kombi-Fokus: die Orbit-Bahnen kreisen um DIESELBE (unsichtbare) Quelle wie die
// Staub-Lichtmasse (oben rechts, offscreen) — Staub und Bahnen gehören zusammen.
const COMBO_FOCUS = { cx: 1760, cy: -140, rot: -18, squash: 0.6 };

/** Kombi-Testsektion: Sternenstaub + radiale Planeten-Bahnen um einen Fokus. */
function DustOrbitCombo() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-clip" style={{ zIndex: 1, background: "#050208" }}>
      <DustCanvas />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
        <g transform={`translate(${COMBO_FOCUS.cx} ${COMBO_FOCUS.cy}) rotate(${COMBO_FOCUS.rot})`}>
          {RINGS.map((ring, i) => {
            const ry = ring.rx * COMBO_FOCUS.squash;
            return (
              <g key={i}>
                <ellipse rx={ring.rx} ry={ry} stroke={`rgba(248,247,243,${ring.alpha})`} />
                {ring.dots.map((d, j) => (
                  <circle
                    key={j}
                    data-orbit-dot
                    data-rx={ring.rx}
                    data-ry={ry}
                    data-dur={d.dur}
                    data-phase={d.phase}
                    cx={ring.rx * Math.cos(d.phase * Math.PI * 2)}
                    cy={ry * Math.sin(d.phase * Math.PI * 2)}
                    r={d.r}
                    fill={d.fill}
                    style={{ filter: `drop-shadow(0 0 10px ${d.glow})` }}
                  />
                ))}
              </g>
            );
          })}
        </g>
      </svg>
      <div className="relative max-w-[560px] px-12 pb-24 max-[767px]:px-6 max-[767px]:pb-16">
        <p className="m-0 mb-3 text-[0.7rem] font-bold uppercase tracking-[0.16em]" style={{ color: MAGENTA, fontFamily: SHARP }}>
          Kombination
        </p>
        <h2 className="m-0 text-[2.6rem] leading-[1.08] max-[767px]:text-[1.9rem]" style={{ fontFamily: SHARP, fontWeight: 500, color: PAPER }}>
          Staub + Bahnen.
        </h2>
        <p className="m-0 mt-4 text-[1rem] leading-relaxed" style={{ color: "rgba(248,247,243,0.6)" }}>
          Die Staub-Lichtmasse und die Planeten-Bahnen teilen sich EINEN unsichtbaren Fokus oben rechts —
          der Staub gibt die Tiefe, die Bahnen die Ordnung, die Punkte die Bewegung.
        </p>
      </div>
    </section>
  );
}

/** Punkt-Gewebe (Referenz: dunkle Halbton-Struktur): ein REGULÄRES Punktraster
    liegt auf einer weichen Wellen-Topografie. Ein Höhenfeld aus überlagerten,
    domänen-verzerrten Sinuswellen verschiebt die Punkte leicht und beleuchtet
    sie über die Feld-Normale (Lambert): Punkte an Wellenkämmen Richtung Licht
    werden hell und minimal größer, Täler versinken im Schwarz. Die Wellen
    laufen SEHR träge (Makro), die Maus lenkt die Lichtrichtung sanft aus. */
function DotWeave() {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = wrap.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Referenz-Technik (Wallpaper 09.07.): ein FEINES, RUHIGES Punktraster, über
    // das große, weiche LICHTFLÄCHEN wandern. Umsetzung in zwei Ebenen:
    //   ① das Raster wird EINMAL offscreen gerendert (uniforme Mikropunkte)
    //   ② pro Frame wird es durch eine niedrig aufgelöste Licht-Maske gestanzt
    //      (destination-in): Ambient-Grundhelligkeit + 3 träge driftende Patches
    //      + ein Maus-Patch (Sensorik). 3 drawImage-Calls/Frame — beliebig dicht.
    let W = 0, H = 0, raf = 0, visible = true;
    let grid: HTMLCanvasElement | null = null;
    let mask: HTMLCanvasElement | null = null;
    const MS = 8; // Maskownsampling-Faktor (Maske ist W/8 × H/8, weich skaliert)
    const mouse = { x: 0.25, y: -0.2 };
    const eased = { x: 0.25, y: -0.2 };
    // „Arbeits"-Schicht: sparsame Auswahl von Rasterpunkten, die sanft pulsieren.
    // Sie wird VOR dem Masken-Stanzen gezeichnet → pulsiert nur dort, wo Licht ist.
    type Pulse = { x: number; y: number; r: number; freq: number; phase: number };
    let pulses: Pulse[] = [];

    const build = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const rect = host.getBoundingClientRect();
      W = canvas.width = Math.round(rect.width * dpr);
      H = canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      // ① Raster: uniforme feine Punkte (Pitch 9 CSS-px), leichte Alpha-Streuung
      grid = document.createElement("canvas");
      grid.width = W;
      grid.height = H;
      const g = grid.getContext("2d")!;
      const gap = 9 * dpr;
      const r = 0.8 * dpr;
      for (let y = gap / 2; y < H; y += gap) {
        for (let x = gap / 2; x < W; x += gap) {
          g.beginPath();
          g.arc(x, y, r, 0, Math.PI * 2);
          g.fillStyle = `rgba(240,237,231,${0.5 + Math.random() * 0.3})`;
          g.fill();
        }
      }

      // ② Licht-Maske (low-res)
      mask = document.createElement("canvas");
      mask.width = Math.max(2, Math.round(W / MS));
      mask.height = Math.max(2, Math.round(H / MS));

      // ③ Puls-Punkte: ~2 % der Rasterplätze atmen sanft (auf Rasterpositionen!)
      pulses = [];
      const N = Math.round((W / gap) * (H / gap) * 0.02);
      for (let i = 0; i < N; i++) {
        const x = gap / 2 + Math.floor(Math.random() * (W / gap)) * gap;
        const y = gap / 2 + Math.floor(Math.random() * (H / gap)) * gap;
        pulses.push({
          x, y,
          r: 0.8 * dpr,
          freq: 0.15 + Math.random() * 0.35, // sehr ruhige Frequenzen
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (tms: number) => {
      if (!grid || !mask) return;
      const t = tms * 0.001;
      eased.x += (mouse.x - eased.x) * 0.05;
      eased.y += (mouse.y - eased.y) * 0.05;
      const m = mask.getContext("2d")!;
      const mw = mask.width, mh = mask.height;
      m.clearRect(0, 0, mw, mh);
      // Ambient: das Raster bleibt überall schwach sichtbar
      m.fillStyle = "rgba(0,0,0,0.13)";
      m.fillRect(0, 0, mw, mh);
      // drei große Lichtflächen — wahrnehmbar-ruhige Drift (Perioden ~50–180 s
      // statt vorher ~5 min: „arbeitet" sichtbar im Hintergrund, ohne zu hetzen)
      const patches: [number, number, number, number][] = reduced
        ? [[0.7, 0.25, 0.55, 0.5], [0.25, 0.7, 0.5, 0.35]]
        : [
            [0.5 + Math.sin(t * 0.12) * 0.38, 0.4 + Math.cos(t * 0.075) * 0.32, 0.55, 0.5],
            [0.5 + Math.cos(t * 0.05) * 0.42, 0.5 + Math.sin(t * 0.09) * 0.38, 0.7, 0.35],
            [0.5 + Math.sin(t * 0.035 + 2.1) * 0.45, 0.5 + Math.cos(t * 0.06 + 0.7) * 0.4, 0.45, 0.3],
            // Maus-Patch (Sensorik): folgt dem Cursor spürbar, aber gedämpft
            [0.5 + eased.x, 0.5 + eased.y, 0.45, 0.45],
          ];
      m.globalCompositeOperation = "lighter";
      for (const [px, py, pr, pa] of patches) {
        const rad = pr * mw;
        const grd = m.createRadialGradient(px * mw, py * mh, 0, px * mw, py * mh, rad);
        grd.addColorStop(0, `rgba(0,0,0,${pa})`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        m.fillStyle = grd;
        m.fillRect(0, 0, mw, mh);
      }
      m.globalCompositeOperation = "source-over";

      // Raster + Puls-Schicht zeichnen, dann durch die Licht-Maske stanzen
      // (die Pulse liegen VOR dem Stanzen → sie atmen nur in beleuchteten Zonen)
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(grid, 0, 0);
      if (!reduced) {
        for (const p of pulses) {
          const a = 0.35 + 0.5 * Math.sin(t * p.freq * Math.PI * 2 + p.phase);
          if (a <= 0.02) continue;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (1 + a * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240,237,231,${Math.min(1, a)})`;
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "destination-in";
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(mask, 0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
    };

    const tick = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(tick);
    };

    build();
    if (reduced) draw(0);
    else raf = requestAnimationFrame(tick);

    const io = new IntersectionObserver(([e2]) => (visible = e2.isIntersecting), { threshold: 0.05 });
    io.observe(host);
    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(build, 200);
    };
    window.addEventListener("resize", onResize, { passive: true });
    const onMouse = (e2: MouseEvent) => {
      mouse.x = e2.clientX / window.innerWidth - 0.5;
      mouse.y = e2.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section ref={wrap} className="relative flex min-h-[100svh] items-end overflow-clip" style={{ zIndex: 1, background: "#050205" }}>
      <canvas ref={ref} className="absolute inset-0" aria-hidden />
      <div className="relative max-w-[560px] px-12 pb-24 max-[767px]:px-6 max-[767px]:pb-16">
        <p className="m-0 mb-3 text-[0.7rem] font-bold uppercase tracking-[0.16em]" style={{ color: MAGENTA, fontFamily: SHARP }}>
          Struktur
        </p>
        <h2 className="m-0 text-[2.6rem] leading-[1.08] max-[767px]:text-[1.9rem]" style={{ fontFamily: SHARP, fontWeight: 500, color: PAPER }}>
          Gewebe aus Punkten.
        </h2>
        <p className="m-0 mt-4 text-[1rem] leading-relaxed" style={{ color: "rgba(248,247,243,0.6)" }}>
          Feines, ruhiges Raster — große weiche Lichtflächen wandern träge darüber, die Maus bringt
          ihr eigenes Licht mit. Das Raster selbst bewegt sich nie.
        </p>
      </div>
    </section>
  );
}

/** Scroll-Scrub-Video — Abspielposition folgt dem Scroll (motionsites-Prinzip,
    aber RAM-schonend: statt ~120 vorgehaltener Bitmap-Frames ein ALL-INTRA-
    encodiertes Video (jeder Frame ein Keyframe) + currentTime-Seek via
    ScrollTrigger. Sticky-Container über 300vh = die Scrub-Strecke. */
function ScrollScrubVideo() {
  const wrap = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const v = vid.current;
      if (!v) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let target = 0;
      let seeking = false;
      const seek = () => {
        if (!v.duration || seeking) return;
        if (Math.abs(v.currentTime - target) < 0.01) return;
        seeking = true;
        v.currentTime = target;
      };
      v.addEventListener("seeked", () => {
        seeking = false;
        seek(); // falls sich das Ziel während des Seeks bewegt hat
      });
      ScrollTrigger.create({
        trigger: wrap.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (!v.duration) return;
          target = self.progress * (v.duration - 0.05);
          seek();
        },
      });
    },
    { scope: wrap },
  );

  return (
    <section ref={wrap} className="relative" style={{ height: "300vh", zIndex: 1 }}>
      <div className="sticky top-0 h-screen w-full overflow-clip">
        <video
          ref={vid}
          src="/mood/eclipse-scrub.mp4"
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        />
        {/* Brombeer-Grade über dem Video, damit es im Mood bleibt */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,2,8,0.85) 0%, rgba(10,2,8,0.15) 35%, rgba(10,2,8,0.2) 70%, #0a0208 100%)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <h2 className="m-0 text-[3rem] leading-[1.05] max-[767px]:text-[2rem]" style={{ fontFamily: SHARP, fontWeight: 500, color: PAPER }}>
            Der Scroll steuert das Licht.
          </h2>
        </div>
      </div>
    </section>
  );
}

/** Milchglas-Card — eckig (Heike: keine runden Ecken), blur + hauchdünne Kante. */
function GlassCard({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div
      className="flex flex-col gap-3 p-7"
      style={{
        // Figma-Referenz 48:1543: Magenta-Alpha auf dunklem Grund = Pflaumen-Fläche.
        // Kanten-Optik: KEINE Konturlinie — die Kante leuchtet weich (Innen-Schein +
        // enger Außen-Bloom), als würde das Milchglas Licht fangen.
        background: "linear-gradient(150deg, rgba(255,67,112,0.13) 0%, rgba(255,67,112,0.07) 55%, rgba(255,67,112,0.1) 100%)",
        backdropFilter: "blur(18px) saturate(1.25)",
        WebkitBackdropFilter: "blur(18px) saturate(1.25)",
        boxShadow: [
          "0 0 2px rgba(255,255,255,0.14)", // enge Licht-Aura direkt an der Kante (statt Linie)
          "0 0 22px rgba(255,255,255,0.09)", // weicher Außen-Bloom
          "inset 0 0 28px rgba(255,255,255,0.055)", // Innen-Schein zur Kante hin
          "0 30px 70px -35px rgba(0,0,0,0.7)", // Tiefenschatten
        ].join(", "),
        color: PAPER,
        width: 320,
      }}
    >
      <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: MAGENTA, fontFamily: SHARP }}>
        {kicker}
      </p>
      <h3 className="m-0 text-[1.35rem] leading-snug" style={{ fontFamily: SHARP, fontWeight: 500 }}>
        {title}
      </h3>
      <p className="m-0 text-[0.9rem] leading-relaxed" style={{ color: "rgba(248,247,243,0.66)" }}>
        {body}
      </p>
    </div>
  );
}

// Orbit-Architektur (Wolfram, 09.07.): ALLE Bahnen liegen um EIN gemeinsames
// Zentrum — und das liegt AUSSERHALB des Screens (oben rechts, unsichtbar).
// Alle Ringe teilen dieselbe elliptische Perspektive (ein Squash-Faktor, eine
// Rotation = ein Fluchtpunkt-Eindruck); nur die Radien wachsen. Sichtbar sind
// dadurch ausschließlich konzentrische Bogen-Ausschnitte, die aus derselben
// Quelle zu kommen scheinen. MAKRO: feine Punkte, träge Umläufe.
type OrbitDot = { r: number; fill: string; glow: string; dur: number; phase: number };

const FOCUS = { cx: 1920, cy: -340, rot: -22, squash: 0.66 }; // Zentrum offscreen oben rechts
const RINGS: { rx: number; alpha: number; dots: OrbitDot[] }[] = [
  { rx: 620, alpha: 0.17, dots: [
    { r: 2.4, fill: "#ff4370", glow: "#ff4370", dur: 95, phase: 0.58 },
  ]},
  { rx: 900, alpha: 0.14, dots: [
    { r: 1.8, fill: "#f8f7f3", glow: "rgba(255,255,255,0.75)", dur: 140, phase: 0.45 },
  ]},
  { rx: 1220, alpha: 0.11, dots: [
    { r: 2.6, fill: "#ff4370", glow: "#ff4370", dur: 175, phase: 0.52 },
    { r: 1.5, fill: "#f8f7f3", glow: "rgba(255,255,255,0.6)", dur: 230, phase: 0.7 },
  ]},
  { rx: 1580, alpha: 0.085, dots: [
    { r: 1.8, fill: "#f8f7f3", glow: "rgba(255,255,255,0.6)", dur: 260, phase: 0.48 },
  ]},
  { rx: 1980, alpha: 0.06, dots: []},
  { rx: 2430, alpha: 0.045, dots: [
    { r: 2.2, fill: "#ff4370", glow: "#ff4370", dur: 320, phase: 0.55 },
  ]},
];

export function MoodRoom() {
  const root = useRef<HTMLDivElement>(null);
  const orbA = useRef<HTMLDivElement>(null);
  const orbB = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // ① Orbs: träges, organisches Driften (yoyo, verschiedene Perioden → nie gleich)
      gsap.to(orbA.current, { xPercent: 22, yPercent: 14, scale: 1.18, duration: 26, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(orbB.current, { xPercent: -18, yPercent: -10, scale: 0.92, duration: 34, ease: "sine.inOut", yoyo: true, repeat: -1 });
      // ② Punkte laufen parametrisch AUF den Ellipsen-Bahnen: der Punkt sitzt in der
      // (verschobenen + rotierten) Orbit-Gruppe, seine lokale Position ist immer
      // (rx·cos t, ry·sin t) — er kann die Linie also nie verlassen.
      gsap.utils.toArray<SVGCircleElement>("[data-orbit-dot]").forEach((dot) => {
        const rx = Number(dot.dataset.rx);
        const ry = Number(dot.dataset.ry);
        const dur = Number(dot.dataset.dur);
        const phase = Number(dot.dataset.phase) * Math.PI * 2;
        const proxy = { t: phase };
        gsap.to(proxy, {
          t: phase + Math.PI * 2,
          duration: dur,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            gsap.set(dot, { attr: { cx: rx * Math.cos(proxy.t), cy: ry * Math.sin(proxy.t) } });
          },
        });
      });
      // B atmet minimal
      gsap.to("[data-b-glow]", { scale: 1.04, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative" style={{ background: "#0a0208", color: PAPER, minHeight: "100vh" }}>
      {/* ① Basis-Schicht: Brombeer-Verlauf + driftende Orbs (fixed, hinter allem) */}
      <div className="pointer-events-none fixed inset-0" style={{ zIndex: 0 }}>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #0a0208 0%, #1c0714 42%, #2e0b20 78%, #0a0208 100%)" }}
        />
        <div
          ref={orbA}
          className="absolute"
          style={{
            width: "55vw",
            height: "55vw",
            left: "-12vw",
            top: "-8vw",
            background: `radial-gradient(circle, rgba(255,67,112,0.32) 0%, rgba(122,22,58,0.18) 45%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
        <div
          ref={orbB}
          className="absolute"
          style={{
            width: "48vw",
            height: "48vw",
            right: "-10vw",
            bottom: "-14vw",
            background: `radial-gradient(circle, rgba(96,10,64,0.5) 0%, rgba(46,11,32,0.3) 50%, transparent 72%)`,
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* ② Section 1: Ökosystem-Orbits + Brennglas-B */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-clip" style={{ zIndex: 1 }}>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
          {/* EIN gemeinsames (unsichtbares) Zentrum offscreen oben rechts: eine
              Gruppe trägt translate + rotate für ALLE Ringe — dieselbe elliptische
              Perspektive, nur die Radien wachsen. Punkte laufen auf ihren Ringen. */}
          <g transform={`translate(${FOCUS.cx} ${FOCUS.cy}) rotate(${FOCUS.rot})`}>
            {RINGS.map((ring, i) => {
              const ry = ring.rx * FOCUS.squash;
              return (
                <g key={i}>
                  <ellipse rx={ring.rx} ry={ry} stroke={`rgba(248,247,243,${ring.alpha})`} />
                  {ring.dots.map((d, j) => (
                    <circle
                      key={j}
                      data-orbit-dot
                      data-rx={ring.rx}
                      data-ry={ry}
                      data-dur={d.dur}
                      data-phase={d.phase}
                      cx={ring.rx * Math.cos(d.phase * Math.PI * 2)}
                      cy={ry * Math.sin(d.phase * Math.PI * 2)}
                      r={d.r}
                      fill={d.fill}
                      style={{ filter: `drop-shadow(0 0 10px ${d.glow})` }}
                    />
                  ))}
                </g>
              );
            })}
          </g>
        </svg>

        <div className="relative flex flex-col items-center gap-8 px-6 text-center">
          <img data-b-glow src="/mood/b-glow.png" alt="" className="h-auto w-[240px] max-[767px]:w-[180px]" draggable={false} />
          <h1 className="m-0 text-[3.4rem] leading-[1.05] max-[767px]:text-[2.2rem]" style={{ fontFamily: SHARP, fontWeight: 500 }}>
            Ein Ökosystem.
            <br />
            Viele Companies.
          </h1>
          <p className="m-0 max-w-[560px] text-[1.05rem] leading-relaxed" style={{ color: "rgba(248,247,243,0.6)" }}>
            Mood-Demo: invertierte Farblogik (Brombeere / Black / Magenta vibrant), Orbit-Bildsprache aus dem Figma,
            Raum-Tiefe über driftende Farbfelder + Filmkorn.
          </p>
        </div>
      </section>

      {/* ② Section 2: Milchglas-Cards über den Orbs */}
      <section className="relative flex flex-wrap items-center justify-center gap-8 px-8 py-32" style={{ zIndex: 1 }}>
        <GlassCard
          kicker="Entertainment"
          title="Milchglas über Tiefe"
          body="backdrop-blur 18px auf Magenta-Alpha (Figma 48:1543) — der Hintergrund scheint weich durch, die Fläche wird zur Pflaume."
        />
        <GlassCard
          kicker="Live"
          title="Kante ohne Kontur"
          body="Keine Linie: die Kante fängt Licht — enger Glanz direkt am Rand, weicher Bloom nach außen, zarter Schein nach innen."
        />
        <GlassCard
          kicker="Fiction"
          title="Vibrant nur als Akzent"
          body="Magenta #ff4370 sitzt in Kickern, Punkten und einzelnen Flächen — nie großflächig, dadurch bleibt es besonders."
        />
      </section>

      {/* ② Section 3: Glitter-/Sternenstaub-Feld (FREIGEGEBEN) */}
      <GalaxyField />

      {/* ② Section 3b/3c: Farbvarianten des Staubs */}
      <GalaxyFieldMagenta />
      <GalaxyFieldInverted />

      {/* ② Section 3d: KOMBI — Staub + radiale Planeten-Bahnen um einen Fokus */}
      <DustOrbitCombo />

      {/* ② Section 5: Punkt-Gewebe (Halbton-Topografie) */}
      <DotWeave />

      {/* ② Section 6: Scroll-Scrub — Eclipse-Video folgt dem Scroll */}
      <ScrollScrubVideo />

      {/* ② Section 4: Vibrant-Highlight-Fläche als Kontrastprobe */}
      <section className="relative mx-8 mb-24 flex flex-col items-start gap-4 p-12" style={{ zIndex: 1, background: MAGENTA, color: "#0a0208" }}>
        <p className="m-0 text-[0.7rem] font-bold uppercase tracking-[0.16em]" style={{ fontFamily: SHARP }}>
          Highlight-Fläche
        </p>
        <h2 className="m-0 text-[2.6rem] leading-[1.05] max-[767px]:text-[1.8rem]" style={{ fontFamily: SHARP, fontWeight: 500 }}>
          Vereinzelte Flächen in Magenta vibrant —
          <br />
          der Rest bleibt moody.
        </h2>
      </section>

      {/* ③ Filmkorn obendrauf */}
      <FilmGrain />
    </div>
  );
}
