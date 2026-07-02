"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERSHIP } from "@/data/leadership";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Team (Algarve section_spiral-team, adaptiert): großes, ruhiges Background-Wort
// „TEAM" hinter der ersten Reihe, das beim Scrollen ausblendet. Die Portraits
// stehen NICHT radial, sondern gerade in einem 5er-Raster; Reihe für Reihe faden
// die Tiles beim Scrollen von unten rein → am Ende eine saubere Liste mit
// gleichmäßigen Abständen. Mobile: einfaches 2-Spalten-Grid.

const TEAM = LEADERSHIP.slice(0, 11);

const NAME = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "clamp(0.95rem, 1.05vw, 1.3rem)",
  fontWeight: 500,
  letterSpacing: "-0.01em",
  lineHeight: "120%",
} as const;
const ROLE = { color: "#000000a3", fontSize: "clamp(0.78rem, 0.9vw, 1.05rem)", lineHeight: "125%" } as const;

export function AlgarveFounders() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const tiles = gsap.utils.toArray<HTMLElement>("[data-team-tile]");

      if (reduce) {
        gsap.set(tiles, { opacity: 1, y: 0 });
        return;
      }

      // Reihen faden beim Scrollen von unten rein (Tile für Tile beim Eintreten).
      gsap.set(tiles, { opacity: 0, y: "4vw" });
      ScrollTrigger.batch("[data-team-tile]", {
        start: "top 68%",
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power3.out" }),
      });

      // Background-Wort „TEAM" blendet aus, sobald man in die Section scrollt.
      const word = root.current?.querySelector<HTMLElement>("[data-team-word]");
      if (word) {
        gsap.to(word, {
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: word, start: "top 34%", end: "top -6%", scrub: true },
        });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} style={{ background: "#f8f7f3" }}>
      {/* ── Desktop: 5er-Raster mit Background-Wort hinter Reihe 1 ─────────── */}
      <div className="relative max-[767px]:hidden" style={{ padding: "6.94vw 2vw 8.33vw" }}>
        {/* Background-Wort „TEAM" — liegt hinter der ersten Reihe, blendet aus */}
        <div
          data-team-word
          className="pointer-events-none absolute inset-x-0 flex justify-center"
          style={{ top: "9vw", zIndex: 2 }}
        >
          <h2
            className="m-0 uppercase text-black"
            style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "18vw", fontWeight: 500, letterSpacing: "-0.5vw", lineHeight: 1 }}
          >
            Team
          </h2>
        </div>

        {/* 5er-Raster, gleiche Abstände */}
        <div className="relative grid grid-cols-5" style={{ columnGap: "1.2vw", rowGap: "3vw", zIndex: 1 }}>
          {TEAM.map((p) => (
            <div key={p.name} data-team-tile className="flex flex-col" style={{ gap: "0.9vw" }}>
              <div className="overflow-clip" style={{ borderRadius: "1.11vw", aspectRatio: "4 / 5", background: "#e8e6df" }}>
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

      {/* ── Mobile: sauberes 2-Spalten-Grid ──────────────────────────────── */}
      <div className="hidden max-[767px]:block" style={{ padding: "16vw 3vw" }}>
        <h2 className="m-0 mb-8 uppercase text-black" style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "12vw", fontWeight: 500, letterSpacing: "-0.4vw", lineHeight: 1 }}>
          Team
        </h2>
        <div className="grid grid-cols-2" style={{ columnGap: "3vw", rowGap: "6vw" }}>
          {TEAM.map((p) => (
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
