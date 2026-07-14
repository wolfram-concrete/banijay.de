"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// SATELLITEN-RINGE-BAND (Wolfram 14.07.): im unteren Bereich jeder Subpage (NICHT
// Home) wächst einmal eine Schar konzentrischer Satellitenringe radial-symmetrisch
// von der SEITE ins Layout. Fokuspunkt sitzt mittig an der Seitenkante → die Bögen
// laufen symmetrisch nach oben/unten in die Fläche. Beim Reinscrollen skalieren die
// Ringe aus dem Fokus heraus auf (Grow-Reveal), Orbit-Dots kreisen träge mit.
// Liegt auf dem globalen Sternenstaub-Backdrop (transparenter Grund) → „Staub + Bahnen".

type Dot = { r: number; fill: string; glow: string; dur: number; phase: number };
type Ring = { rx: number; alpha: number; dots: Dot[] };

// Radien für ein seitlich verankertes Band (Fokus an der Kante, Mitte). Größere
// Ringe fächern flacher/weiter in die Fläche.
const RINGS: Ring[] = [
  { rx: 300, alpha: 0.28, dots: [{ r: 2.4, fill: "#ff4370", glow: "#ff4370", dur: 60, phase: 0.2 }] },
  { rx: 470, alpha: 0.22, dots: [{ r: 1.8, fill: "#f8f7f3", glow: "rgba(255,255,255,0.8)", dur: 90, phase: 0.62 }] },
  { rx: 680, alpha: 0.17, dots: [{ r: 2.6, fill: "#ff4370", glow: "#ff4370", dur: 130, phase: 0.4 }] },
  { rx: 930, alpha: 0.13, dots: [{ r: 1.6, fill: "#f8f7f3", glow: "rgba(255,255,255,0.7)", dur: 175, phase: 0.75 }] },
  { rx: 1220, alpha: 0.1, dots: [] },
  { rx: 1560, alpha: 0.07, dots: [{ r: 2.2, fill: "#ff4370", glow: "#ff4370", dur: 240, phase: 0.5 }] },
];

// Fokus mittig an der Seitenkante. viewBox 1600×900 → cy=450 (Mitte). squash<1 gibt
// den Bahnen eine leichte Orbit-Neigung, ohne die Symmetrie zu brechen (keine Rotation).
const SQUASH = 0.82;

export function AlgarveSatelliteRings({ side = "left" }: { side?: "left" | "right" } = {}) {
  const root = useRef<HTMLDivElement>(null);
  const cx = side === "left" ? -60 : 1660;
  const cy = 450;

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rings = gsap.utils.toArray<SVGGElement>("[data-sr-ring]");

      if (reduce) {
        gsap.set(rings, { autoAlpha: 1, scale: 1 });
      } else {
        // GROW-REVEAL: aus dem Fokus (svgOrigin) heraus aufskalieren, sobald das Band
        // in Sicht kommt — die Ringe „wachsen von der Seite ins Layout".
        gsap.set(rings, { transformOrigin: "0px 0px" });
        gsap.from(rings, {
          scale: 0.12,
          autoAlpha: 0,
          svgOrigin: `${cx} ${cy}`,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
        });
      }

      // Orbit-Dots laufen parametrisch AUF ihrer Bahn (rx·cos t, ry·sin t) — träge.
      if (!reduce) {
        gsap.utils.toArray<SVGCircleElement>("[data-sr-dot]").forEach((dot) => {
          const rx = Number(dot.dataset.rx);
          const ry = Number(dot.dataset.ry);
          const dur = Number(dot.dataset.dur);
          const proxy = { t: Number(dot.dataset.phase) * Math.PI * 2 };
          gsap.to(proxy, {
            t: proxy.t + Math.PI * 2,
            duration: dur,
            ease: "none",
            repeat: -1,
            onUpdate: () => gsap.set(dot, { attr: { cx: rx * Math.cos(proxy.t), cy: ry * Math.sin(proxy.t) } }),
          });
        });
      }
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      data-nav-theme="dark"
      className="pointer-events-none relative w-full overflow-clip"
      style={{ height: "clamp(360px, 52vh, 640px)", background: "transparent" }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <g transform={`translate(${cx} ${cy})`}>
          {RINGS.map((ring, i) => {
            const ry = ring.rx * SQUASH;
            return (
              <g key={i} data-sr-ring>
                <ellipse
                  rx={ring.rx}
                  ry={ry}
                  stroke={`rgba(248,247,243,${ring.alpha})`}
                  strokeWidth={1.4}
                  vectorEffect="non-scaling-stroke"
                />
                {ring.dots.map((d, j) => (
                  <circle
                    key={j}
                    data-sr-dot
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
    </div>
  );
}
