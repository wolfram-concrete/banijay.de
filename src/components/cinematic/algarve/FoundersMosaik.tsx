"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERSHIP } from "@/data/leadership";
import { focus } from "./Founders";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// TEAM-VARIANTE „MASONRY" (Wolfram 22.07., strenges Briefing) — NUR Geometrie/Anordnung:
// full-bleed, gap 0, zwei Größen (3 Large identisch, 9 Standard identisch), Large VERSETZT
// über die Fläche verteilt (nicht nur oben). KEIN Hintergrund, KEIN Schatten, KEINE Border,
// KEINE Headline, KEIN Padding, KEIN Filter, KEIN äußerer Container.
// Raster: 7 Spalten × 3 Reihen = 21 Zellen = 3·(2×2) + 9·(1×1), lückenlose Partition.

const SHARP = "var(--font-sharp), sans-serif";

const [MARCUS, KNUT, LAEGEL, ...STD] = LEADERSHIP; // STD = 9 Standard-Personen

// Large-Karten diagonal/versetzt: Marcus oben-links, Knut Mitte tiefergesetzt, Laegel oben-
// rechts — die kleineren rahmen sie ein und führen den Blick über die ganze Fläche.
const LARGE = [
  { p: MARCUS, col: "1 / span 2", row: "1 / span 2" },
  { p: KNUT, col: "4 / span 2", row: "2 / span 2" },
  { p: LAEGEL, col: "6 / span 2", row: "1 / span 2" },
];

// Neun Standard-Zellen füllen den Rest exakt auf.
const STD_SLOTS = [
  { col: "3", row: "1" },
  { col: "4", row: "1" },
  { col: "5", row: "1" },
  { col: "3", row: "2" },
  { col: "1", row: "3" },
  { col: "2", row: "3" },
  { col: "3", row: "3" },
  { col: "6", row: "3" },
  { col: "7", row: "3" },
];

function NameCard({ name, role }: { name: string; role: string }) {
  // Weißer Namenscontainer unten links, überlappt das Bild. Kantig (Heike-Regel — in der
  // Referenz leicht rund). KEIN Schatten, KEINE Border.
  return (
    <div
      className="pointer-events-none absolute bottom-[0.9vw] left-[0.9vw] z-[2] flex flex-col max-[767px]:bottom-[3vw] max-[767px]:left-[3vw]"
      style={{ gap: "0.04em", padding: "0.5em 1.05em 0.58em", maxWidth: "calc(100% - 1.8vw)", background: "#ffffff", color: "#14130b" }}
    >
      <span style={{ fontFamily: SHARP, fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.01em" }} className="text-[0.9rem] md:text-[0.95vw] max-[767px]:!text-[3.2vw]">
        {name}
      </span>
      {role ? (
        <span style={{ color: "rgba(20,19,11,0.55)", lineHeight: 1.16 }} className="text-[0.66rem] md:text-[0.72vw] max-[767px]:!text-[2.4vw]">
          {role}
        </span>
      ) : null}
    </div>
  );
}

// Portraitkarte OHNE Filter/Bildbearbeitung (Briefing), object-cover, Fokus je Person.
function Portrait({ img, name, role }: { img: string; name: string; role: string }) {
  return (
    <div data-mo-tile className="relative h-full w-full overflow-hidden">
      <img src={img} alt={name} className="h-full w-full object-cover" style={{ objectPosition: focus(img) }} />
      <NameCard name={name} role={role} />
    </div>
  );
}

export function AlgarveFoundersMosaik() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tiles = gsap.utils.toArray<HTMLElement>("[data-mo-tile]");
      gsap.set(tiles, { autoAlpha: 0 });
      ScrollTrigger.batch(tiles, {
        start: "top 96%",
        once: true,
        onEnter: (b) => gsap.to(b, { autoAlpha: 1, duration: 0.7, ease: "power2.out", stagger: 0.05 }),
      });
      // Einrasten wie die übrigen Varianten (Video-Handoff) — unsichtbar, kein Weißraum.
      if (grid.current && window.matchMedia("(min-width: 768px)").matches) {
        ScrollTrigger.create({ trigger: grid.current, start: "top top", end: "+=190%", pin: true, pinSpacing: true, anticipatePin: 1 });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative w-full overflow-clip" style={{ background: "transparent" }}>
      {/* Desktop/Tablet: full-bleed 7×3-Masonry, gap 0. */}
      <div
        ref={grid}
        className="grid w-full max-[767px]:hidden"
        style={{ gridTemplateColumns: "repeat(7, 1fr)", gridTemplateRows: "repeat(3, 1fr)", gap: 0, height: "96vh" }}
      >
        {LARGE.map(({ p, col, row }) => (
          <div key={p.img} style={{ gridColumn: col, gridRow: row }}>
            <Portrait img={p.img} name={p.name} role={p.role} />
          </div>
        ))}
        {STD.map((p, i) => (
          <div key={p.img} style={{ gridColumn: STD_SLOTS[i].col, gridRow: STD_SLOTS[i].row }}>
            <Portrait img={p.img} name={p.name} role={p.role} />
          </div>
        ))}
      </div>

      {/* Mobile: zwei Spalten, die drei Large über volle Breite (bleiben größer). */}
      <div className="hidden w-full grid-cols-2 max-[767px]:grid" style={{ gap: 0 }}>
        {LEADERSHIP.map((p, i) => (
          <div key={p.img} className={i < 3 ? "col-span-2" : ""} style={{ aspectRatio: i < 3 ? "16 / 10" : "4 / 5" }}>
            <Portrait img={p.img} name={p.name} role={p.role} />
          </div>
        ))}
      </div>
    </section>
  );
}
