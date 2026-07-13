"use client";

import { useEffect, useRef } from "react";

// FREIGEGEBENER Mood-Baustein „Staub statt Sterne" (Wolfram, 09.07.) als
// eigenständige, wiederverwendbare Ebene — extrahiert aus der Mood-Demo
// (MoodRoom.tsx behält seine lokale Kopie für /mood-test).

/** Wiederverwendbare Staub-Ebene (die freigegebene „Staub statt Sterne"-Technik)
    als Layer — füllt den Eltern-Container, bringt Kameraschwenk + Maus-Parallaxe mit.
    `color`/`accent` als "r,g,b"-Tripel → Farbvarianten (weiß, magenta, schwarz …). */
export function DustLayer({
  color = "248,247,243",
  accent = "255,67,112",
  boost = 1, // Alpha-Multiplikator — dunklere Staubfarben (Magenta) brauchen mehr
  center = { x: 0.82, y: 0.06 }, // Lichtquelle (Fraktionen) — Default: Ecke oben rechts
  radius = 1.15, // Falloff-Radius des Lichtfelds (Fraktionen der Fläche)
}: {
  color?: string;
  accent?: string;
  boost?: number;
  /** Zentrum des Lichtfelds — der Staub verdichtet sich RADIAL um diesen Punkt. */
  center?: { x: number; y: number };
  radius?: number;
}) {
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

    // Lichtfeld: Dichte fällt radial vom konfigurierten Zentrum ab + Grundstaub.
    const intensity = (x: number, y: number, w: number, h: number) => {
      const dx = x / w - center.x, dy = y / h - center.y;
      const d = Math.sqrt(dx * dx + dy * dy * 1.35);
      return Math.pow(Math.max(0, 1 - d / radius), 2.6);
    };

    const build = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      // LAYOUT-Maße (offsetWidth/Height) statt getBoundingClientRect: Bühnen wie
      // DustStage/IntroOverlay skalieren den Container fürs Aufwachsen (scale<1,
      // GSAP-Layout-Effekt läuft VOR diesem Effect) — die visuellen Maße wären
      // dann halbiert und der Canvas säße oben links (Wolfram-Bug 13.07.).
      const hw = host.offsetWidth;
      const hh = host.offsetHeight;
      W = canvas.width = Math.round(hw * dpr);
      H = canvas.height = Math.round(hh * dpr);
      canvas.style.width = hw + "px";
      canvas.style.height = hh + "px";
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
  }, [color, accent, boost, center.x, center.y, radius]);

  return (
    <div ref={wrap} className="absolute inset-0">
      <canvas ref={ref} className="absolute inset-0" aria-hidden />
    </div>
  );
}

