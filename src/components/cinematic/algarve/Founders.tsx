"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERSHIP } from "@/data/leadership";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Team (Algarve section_spiral-team, adaptiert): großer Schriftzug „TEAM" als
// eigenständige Headline OBEN, darunter die Portraits. Die Cards starten in einem
// verdichteten Initial-State (zur Mitte kollabiert, skaliert, rotiert, leicht
// überlappend) und entfalten sich beim Scrollen per gepinnter, gescrubter
// GSAP-Timeline in ihr sauberes 5-Spalten-Grid. Mobile: einfaches 2-Spalten-Grid.

const TEAM = LEADERSHIP.slice(0, 10); // 10 → sauberes 5×2-Grid im Pin-Viewport

const NAME = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "clamp(0.8rem, 0.95vw, 1.15rem)",
  fontWeight: 500,
  letterSpacing: "-0.01em",
  lineHeight: "118%",
} as const;
const ROLE = { color: "#000000a3", fontSize: "clamp(0.7rem, 0.8vw, 0.95rem)", lineHeight: "122%" } as const;

export function AlgarveFounders() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      const tiles = gsap.utils.toArray<HTMLElement>("[data-team-tile]");
      const gridEl = grid.current;
      if (!gridEl || !tiles.length) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Verdichteter Initial-State: jede Card zur Grid-Mitte ziehen (Cluster),
      // verkleinern + rotieren. VOR dem ersten Paint gesetzt (useGSAP =
      // useLayoutEffect) → kein Flash des fertigen Grids.
      const gr = gridEl.getBoundingClientRect();
      const cx = gr.left + gr.width / 2;
      const cy = gr.top + gr.height / 2;
      const mid = (tiles.length - 1) / 2;
      const initial = tiles.map((el, i) => {
        const r = el.getBoundingClientRect();
        return {
          x: (cx - (r.left + r.width / 2)) * 0.86,
          y: (cy - (r.top + r.height / 2)) * 0.86 + 40,
          scale: 0.46,
          rotation: (i - mid) * 4.2,
        };
      });
      tiles.forEach((el, i) => gsap.set(el, { ...initial[i], opacity: reduce ? 1 : 0.82, transformOrigin: "50% 50%" }));

      if (reduce) {
        gsap.set(tiles, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 });
        return;
      }

      // Entfaltung per gepinnter, gescrubter Timeline in die finalen Grid-Plätze.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=140%",
          scrub: true,
          pin: "[data-team-stage]",
          invalidateOnRefresh: true,
        },
      });
      tl.to(tiles, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        ease: "power2.out",
        stagger: 0.06,
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} style={{ background: "#f8f7f3" }}>
      {/* ── Desktop: gepinnte Bühne mit TEAM-Headline + entfaltendem Grid ──── */}
      <div data-team-stage className="relative max-[767px]:hidden" style={{ height: "100vh", overflow: "hidden" }}>
        <div className="flex h-full w-full flex-col" style={{ padding: "6vw 2vw 3vw" }}>
          {/* TEAM — eigenständige Headline über der Portrait-Animation (z-3) */}
          <h2
            className="m-0 uppercase text-black"
            style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "9vw", fontWeight: 500, letterSpacing: "-0.4vw", lineHeight: 0.9, position: "relative", zIndex: 3 }}
          >
            Team
          </h2>

          {/* Grid (final = sauberes 5-Spalten-Grid; Startlage per GSAP) */}
          <div
            ref={grid}
            className="grid w-full flex-1 grid-cols-5 content-center"
            style={{ columnGap: "1.2vw", rowGap: "1.6vw", zIndex: 1 }}
          >
            {TEAM.map((p) => (
              <div key={p.name} data-team-tile className="flex flex-col" style={{ gap: "0.6vw", willChange: "transform" }}>
                <div className="overflow-clip" style={{ borderRadius: "0.9vw", aspectRatio: "4 / 5", background: "#e8e6df" }}>
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover" style={{ filter: "grayscale(1)" }} />
                </div>
                <div className="flex flex-col" style={{ gap: "0.1vw" }}>
                  <div className="text-black" style={NAME}>
                    {p.name}
                  </div>
                  <div style={ROLE}>{p.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: sauberes 2-Spalten-Grid ──────────────────────────────── */}
      <div className="hidden max-[767px]:block" style={{ padding: "16vw 3vw" }}>
        <h2 className="m-0 mb-8 uppercase text-black" style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "12vw", fontWeight: 500, letterSpacing: "-0.4vw", lineHeight: 1 }}>
          Team
        </h2>
        <div className="grid grid-cols-2" style={{ columnGap: "3vw", rowGap: "6vw" }}>
          {LEADERSHIP.slice(0, 11).map((p) => (
            <div key={p.name} className="flex flex-col gap-3">
              <div className="overflow-clip" style={{ borderRadius: "4vw", aspectRatio: "4 / 5", background: "#e8e6df" }}>
                <img src={p.img} alt={p.name} className="h-full w-full object-cover" style={{ filter: "grayscale(1)" }} />
              </div>
              <div>
                <div className="text-black" style={{ fontFamily: "var(--font-sharp), sans-serif", fontWeight: 500, fontSize: "3.6vw", lineHeight: "120%" }}>
                  {p.name}
                </div>
                <div style={{ color: "#000000a3", fontSize: "3vw", lineHeight: "125%" }}>{p.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
