"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// WARP-BLENDE (Wolfram 14.07.): an/nach der Headline „Ein Dach. Viele
// Handschriften." beschleunigt der Sternenstaub in einen Hyperspace-Warp —
// Streaks schießen radial aus der Mitte auf den Betrachter zu, blitzen kurz
// auf und blenden aus. Das IST die Blende, die in die Team-Section überleitet.
// Scroll-gescrubbt, sticky Canvas, clear→transparent (MoodBackdrop scheint durch).

const N = 900;
const easeIn = (t: number) => t * t;

export function TeamWarpBlende() {
  const root = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prog = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf = 0;

    const resize = () => {
      W = canvas.width = Math.round(canvas.clientWidth * dpr);
      H = canvas.height = Math.round(canvas.clientHeight * dpr);
    };
    resize();

    // Radialer Sternenstaub: jeder Punkt hat Richtung (ang) + Tiefe (rad).
    type S = { ang: number; rad: number; size: number; mag: boolean };
    const stars: S[] = [];
    for (let i = 0; i < N; i++) {
      stars.push({
        ang: Math.random() * Math.PI * 2,
        rad: 0.05 + Math.random() * 0.62,
        size: 0.5 + Math.random() * 1.3,
        mag: Math.random() < 0.06, // ein paar Magenta-Funken
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const p = Math.max(0, Math.min(1, prog.current));
      const cx = W / 2, cy = H / 2;
      const R = Math.min(W, H);
      // Phasen: 0–0.22 ruhiger Staub · 0.22–0.78 Warp · 0.78–1 Flash + Ausblenden
      const warp = p < 0.22 ? 0 : Math.min(1, (p - 0.22) / 0.56);
      const ew = easeIn(warp);
      const flash = p < 0.78 ? 0 : (p - 0.78) / 0.22;
      const globalFade = 1 - flash; // Canvas löst sich am Ende auf → Team darunter
      const S_MAX = 26;

      for (const s of stars) {
        const dirx = Math.cos(s.ang), diry = Math.sin(s.ang);
        const base = s.rad * R * 0.5;
        if (warp <= 0) {
          const a = 0.7 * globalFade * (s.mag ? 1 : 0.8);
          if (a <= 0.02) continue;
          ctx.beginPath();
          ctx.arc(cx + dirx * base, cy + diry * base, s.size * dpr, 0, Math.PI * 2);
          ctx.fillStyle = s.mag ? `rgba(255,67,112,${a})` : `rgba(248,247,243,${a})`;
          ctx.fill();
        } else {
          const s1 = 1 + ew * S_MAX;
          const s0 = 1 + Math.max(0, ew - 0.06) * S_MAX;
          const a = Math.max(0, 1 - ew * 0.7) * globalFade;
          if (a <= 0.02) continue;
          ctx.beginPath();
          ctx.moveTo(cx + dirx * base * s0, cy + diry * base * s0);
          ctx.lineTo(cx + dirx * base * s1, cy + diry * base * s1);
          ctx.lineWidth = s.size * dpr * (1 + ew * 3);
          ctx.lineCap = "round";
          ctx.strokeStyle = s.mag ? `rgba(255,67,112,${a})` : `rgba(248,247,243,${a})`;
          ctx.stroke();
        }
      }

      // Aufblitzender Kern am Ende der Blende
      if (flash > 0) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.7);
        g.addColorStop(0, `rgba(255,255,255,${0.5 * flash})`);
        g.addColorStop(0.5, `rgba(255,67,112,${0.16 * flash})`);
        g.addColorStop(1, "rgba(255,67,112,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        prog.current = 0;
        return;
      }
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self) => (prog.current = self.progress),
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="pointer-events-none relative" style={{ height: "135vh" }}>
      <div className="sticky top-0 h-screen overflow-clip">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}
