"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// WARP-BLENDE mit Scroll-Stop (Wolfram 14.07.): EINE gepinnte Bühne trägt die
// ganze Choreografie —
//   ① die Headline „Ein Dach. Viele Handschriften." konvergiert auf Sternenstaub
//   ② PIN/HALT: die Headline steht (echter Scroll-Stop)
//   ③ weiterscrollen löst den Hyperspace-WARP: der Staub schießt als radiale
//      Streaks auf den Betrachter, blitzt auf und blendet aus (die Blende)
//   ④ der Pin löst → die Team-Section darunter baut sich beim Weiterscrollen auf
// Kein freies Durchscrollen mehr — jede Phase ist an den Scroll gekoppelt.

const N = 900;
const easeIn = (t: number) => t * t;
const SHARP = "var(--font-sharp), sans-serif";
const HEAD = ["Ein Dach.", "Viele", "Handschriften."];

export function TeamWarpBlende() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLHeadingElement>(null);
  const middle = useRef<HTMLHeadingElement>(null);
  const last = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prog = useRef(0);

  // WARP-CANVAS: radialer Sternenstaub → Hyperspace-Streaks, getrieben von prog.
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

    type S = { ang: number; rad: number; size: number; mag: boolean };
    const stars: S[] = [];
    for (let i = 0; i < N; i++) {
      stars.push({
        ang: Math.random() * Math.PI * 2,
        rad: 0.05 + Math.random() * 0.62,
        size: 0.5 + Math.random() * 1.3,
        mag: Math.random() < 0.06,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const p = Math.max(0, Math.min(1, prog.current));
      const cx = W / 2, cy = H / 2;
      const R = Math.min(W, H);
      const warp = p < 0.12 ? 0 : Math.min(1, (p - 0.12) / 0.66);
      const ew = easeIn(warp);
      const flash = p < 0.78 ? 0 : (p - 0.78) / 0.22;
      const globalFade = 1 - flash;
      const S_MAX = 26;

      for (const s of stars) {
        const dirx = Math.cos(s.ang), diry = Math.sin(s.ang);
        const base = s.rad * R * 0.5;
        if (warp <= 0) {
          const a = 0.68 * globalFade * (s.mag ? 1 : 0.8);
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
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        prog.current = 0;
        return;
      }
      const vh = window.innerHeight;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: "+=210%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // ① Headline konvergiert (0 → 0.2): obere von oben, untere von unten,
      //    mittlere skaliert herunter.
      tl.from(first.current, { y: -0.15 * vh, duration: 0.2 }, 0)
        .from(last.current, { y: 0.15 * vh, duration: 0.2 }, 0)
        .from(middle.current, { scale: 1.2, duration: 0.16 }, 0.04);

      // ② HALT (0.2 → 0.34): die Headline steht — der Scroll-Stop-Moment.
      tl.to({}, { duration: 0.14 }, 0.2);

      // ③ WARP (0.34 → 0.9): Staub beschleunigt in den Hyperspace, Headline
      //    blendet aus, der Kern blitzt auf (Flash im Canvas via prog).
      const warpProxy = { v: 0 };
      tl.to(warpProxy, { v: 1, duration: 0.56, onUpdate: () => (prog.current = warpProxy.v) }, 0.34);
      tl.to(headline.current, { autoAlpha: 0, ease: "power1.in", duration: 0.22 }, 0.42);

      // ④ kurzer Tail-Halt → Pin löst, die Team-Section erscheint darunter.
      tl.to({}, { duration: 0.1 }, 0.9);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <div ref={stage} className="relative flex h-screen items-center justify-center overflow-clip">
        {/* Warp-Canvas (Sternenstaub → Streaks) — hinter der Headline */}
        <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 0 }} />

        {/* Headline „Ein Dach. Viele Handschriften." */}
        <div ref={headline} className="relative flex flex-col max-[767px]:!px-[4vw]" style={{ zIndex: 2 }}>
          <h2 ref={first} className="text-[#f8f7f3] max-[767px]:!text-[13vw] max-[767px]:!leading-[108%]" style={LINE}>
            {HEAD[0]}
          </h2>
          <h2 ref={middle} className="text-[#f8f7f3] max-[767px]:!text-[13vw] max-[767px]:!leading-[108%]" style={LINE}>
            {HEAD[1]}
          </h2>
          <h2 ref={last} className="text-[#f8f7f3] max-[767px]:!text-[13vw] max-[767px]:!leading-[108%]" style={LINE}>
            {HEAD[2]}
          </h2>
        </div>
      </div>
    </div>
  );
}

const LINE = {
  fontFamily: SHARP,
  fontSize: "7vw",
  lineHeight: "132%",
  fontWeight: 500,
  textAlign: "center",
  textTransform: "uppercase",
  margin: 0,
  hyphens: "auto",
  WebkitHyphens: "auto",
  overflowWrap: "break-word",
} as const;
