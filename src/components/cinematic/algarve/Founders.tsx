"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERSHIP } from "@/data/leadership";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Team (Algarve section_spiral-team, nach Briefing):
//  Desktop  = hohe Sticky-Stage (400vh), fünf kuratierte Portraits starten
//             mittig/übereinander und fahren beim Scrollen in ihre finale Spiral-
//             Komposition; dahinter das große, ruhige Background-Wort „TEAM".
//             Danach — AUSSERHALB der Stage — sechs weitere Personen in zwei
//             Reihen à 3 per ruhigem Scroll-Reveal (kein zweiter Spiral-Effekt).
//  Mobile   = keine Spiral-Stage, ein sauberes Grid aller Teammitglieder.

const FEATURED = LEADERSHIP.slice(0, 5);
const EXTENDED = LEADERSHIP.slice(5, 11); // 6 weitere

// Finale Spiral-Positionen (xPercent/yPercent des 40vw-Path-Containers).
const SPIRAL = [
  { xp: -60, yp: -55 },
  { xp: 60, yp: -55 },
  { xp: -80, yp: 10 },
  { xp: 80, yp: 10 },
  { xp: 0, yp: 65 },
];

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
  const master = useRef<HTMLDivElement>(null);
  const extGrid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const desktop = window.matchMedia("(min-width: 768px)").matches;

      // ── Desktop-Spiral-Stage ──────────────────────────────────────────────
      if (desktop) {
        const cards = gsap.utils.toArray<HTMLElement>("[data-spiral]");
        const names = gsap.utils.toArray<HTMLElement>("[data-spiral-name]");
        if (reduce) {
          cards.forEach((c, i) => gsap.set(c, { xPercent: SPIRAL[i].xp, yPercent: SPIRAL[i].yp, scale: 1, opacity: 1 }));
          gsap.set(names, { opacity: 1 });
        } else {
          gsap.set(cards, { xPercent: 0, yPercent: 0, scale: 0.9, opacity: 0 });
          gsap.set(names, { opacity: 0 });
          const tl = gsap.timeline({
            scrollTrigger: { trigger: master.current, start: "top top", end: "bottom bottom", scrub: 0.9 },
          });
          cards.forEach((c, i) => {
            tl.to(c, { xPercent: SPIRAL[i].xp, yPercent: SPIRAL[i].yp, scale: 1, ease: "power1.inOut" }, 0)
              .to(c, { opacity: 1, ease: "none", duration: 0.35 }, 0);
          });
          // Namen/Rollen dezent SPÄT einfaden.
          tl.to(names, { opacity: 1, ease: "none", duration: 0.2 }, 0.72);
        }
      }

      // ── Extension-Reveal (6 weitere Personen) ─────────────────────────────
      if (!reduce) {
        const tiles = gsap.utils.toArray<HTMLElement>("[data-ext-tile]");
        const imgs = gsap.utils.toArray<HTMLElement>("[data-ext-img]");
        gsap.set(tiles, { opacity: 0, y: "4vw" });
        gsap.set(imgs, { scale: 1.12 });
        ScrollTrigger.create({
          trigger: extGrid.current,
          start: "top 78%",
          once: true,
          onEnter: () => {
            gsap.to(tiles, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" });
            gsap.to(imgs, { scale: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" });
          },
        });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} style={{ background: "#f8f7f3" }}>
      {/* ── Desktop: Spiral-Stage ────────────────────────────────────────── */}
      <div ref={master} className="relative overflow-clip max-[767px]:hidden" style={{ height: "400vh" }}>
        <div className="sticky top-0 overflow-clip" style={{ height: "100vh" }}>
          {/* Background-Wort */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <h2
              className="m-0 uppercase text-black"
              style={{
                fontFamily: "var(--font-sharp), sans-serif",
                fontSize: "18vw",
                fontWeight: 500,
                letterSpacing: "-0.5vw",
                lineHeight: 1,
                zIndex: 0,
              }}
            >
              Team
            </h2>
          </div>

          {/* 5 frei schwebende Portraits (40vw-Path, Bild unten-rechts) */}
          {FEATURED.map((p) => (
            <div
              key={p.name}
              data-spiral
              className="absolute inset-0 m-auto flex items-end justify-end"
              style={{ width: "40vw", height: "40vw", zIndex: 2, willChange: "transform" }}
            >
              <div className="flex flex-col items-center" style={{ width: "15vw", gap: "0.7vw" }}>
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full object-cover"
                  style={{ height: "16.8vw", borderRadius: "1.11vw", filter: "grayscale(1)" }}
                />
                <div data-spiral-name className="text-center" style={{ opacity: 0 }}>
                  <div className="text-black" style={NAME}>
                    {p.name}
                  </div>
                  <div style={ROLE}>{p.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop: Extension (6 weitere, 3×2) ──────────────────────────── */}
      <div className="max-[767px]:hidden" style={{ padding: "0 2vw 8.33vw" }}>
        <div ref={extGrid} className="grid grid-cols-3" style={{ columnGap: "1vw", rowGap: "3vw" }}>
          {EXTENDED.map((p) => (
            <div key={p.name} data-ext-tile className="flex flex-col" style={{ gap: "1vw" }}>
              <div className="relative overflow-clip" style={{ borderRadius: "1.11vw", paddingTop: "100%", background: "#e8e6df" }}>
                <img
                  data-ext-img
                  src={p.img}
                  alt={p.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: "grayscale(1)", willChange: "transform" }}
                />
              </div>
              <div className="flex flex-col" style={{ gap: "0.1vw" }}>
                <h3 className="m-0 text-black" style={NAME}>
                  {p.name}
                </h3>
                <p className="m-0" style={ROLE}>
                  {p.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: sauberes Grid ALLER Teammitglieder ───────────────────── */}
      <div className="hidden max-[767px]:block" style={{ padding: "16vw 3vw" }}>
        <h2 className="m-0 mb-8 uppercase text-black" style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "12vw", fontWeight: 500, letterSpacing: "-0.4vw", lineHeight: 1 }}>
          Team
        </h2>
        <div className="grid grid-cols-2" style={{ columnGap: "3vw", rowGap: "6vw" }}>
          {LEADERSHIP.map((p) => (
            <div key={p.name} className="flex flex-col gap-3">
              <div className="relative overflow-clip" style={{ borderRadius: "4vw", paddingTop: "100%", background: "#e8e6df" }}>
                <img src={p.img} alt={p.name} className="absolute inset-0 h-full w-full object-cover" style={{ filter: "grayscale(1)" }} />
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
