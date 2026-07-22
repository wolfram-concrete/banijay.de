"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERSHIP } from "@/data/leadership";
import { DustLayer } from "./DustLayer";
import { TeamTile } from "./FoundersSnap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHARP = "var(--font-sharp), sans-serif";

// TEAM-VARIANTE „EDITORIAL" (Wolfram 22.07., wiederhergestellt) — der früher freigegebene
// Aufbau: variables Feinraster (7 Spalten), in dem die drei WICHTIGSTEN (Marcus/Knut/Michael
// Laegel) die GRÖSSTEN Bildcontainer haben (2×4 = 4× Fläche), asymmetrisch gesetzt: Knut
// oben-links, Marcus als hoher Held unten-Mitte, Michael Laegel unten-rechts. Alle Kacheln
// hochformatig. Davor die animierte Zwischen-Headline „UNSER TEAM".
//
// Geometrie: 7 Spalten × 6 Reihen. Leader = 2×4, Single = 1×2 → 3·8 + 9·2 = 42 = 7·6.
// Perfekte Partition, keine Überlappung, keine Lücke. ~144vh (sanfter Scroll).

const MARCUS = LEADERSHIP[0];
const KNUT = LEADERSHIP[1];
const LAEGEL = LEADERSHIP[2];
const REST = LEADERSHIP.slice(3); // 9 Personen

type Placed = { p: (typeof LEADERSHIP)[number]; col: string; row: string };

const LEADERS_D: Placed[] = [
  { p: MARCUS, col: "1 / span 2", row: "1 / span 4" }, // oben-links (Wolfram 22.07.: mit Knut getauscht)
  { p: KNUT, col: "3 / span 2", row: "3 / span 4" }, // unten-Mitte (hoher Held)
  { p: LAEGEL, col: "6 / span 2", row: "3 / span 4" }, // unten-rechts
];

const SINGLE_SLOTS: { col: string; row: string }[] = [
  { col: "3", row: "1 / span 2" },
  { col: "4", row: "1 / span 2" },
  { col: "5", row: "1 / span 2" },
  { col: "6", row: "1 / span 2" },
  { col: "7", row: "1 / span 2" },
  { col: "5", row: "3 / span 2" },
  { col: "5", row: "5 / span 2" },
  { col: "1", row: "5 / span 2" },
  { col: "2", row: "5 / span 2" },
];

const SINGLES_D: Placed[] = REST.map((p, i) => ({ p, col: SINGLE_SLOTS[i].col, row: SINGLE_SLOTS[i].row }));

export function AlgarveFoundersEditorial() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const words = gsap.utils.toArray<HTMLElement>("[data-mo-word]");
      if (words.length) {
        gsap.from(words, { yPercent: 120, duration: 1.1, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: "[data-mo-intro]", start: "top 70%", once: true } });
      }

      const tiles = gsap.utils.toArray<HTMLElement>("[data-mo-tile]");
      gsap.set(tiles, { autoAlpha: 0, scale: 1.03 });
      ScrollTrigger.batch(tiles, {
        start: "top 96%",
        once: true,
        onEnter: (b) => gsap.to(b, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power2.out", stagger: 0.05 }),
      });

      // EINRASTEN wie Snap (Wolfram 22.07., 2. Runde): Das Raster ist jetzt auf EINEN Viewport
      // gestaucht (100vh) und wird — sobald seine Oberkante den Viewport-Kopf erreicht — GEPINNT
      // (start „top top"). Ersten ~90vh reiner Halt, dann überlagert die LogoReveal-Blende.
      // Gleiches physisches Verhalten wie Snap; nur der Aufbau (variables Raster) bleibt.
      if (grid.current && window.matchMedia("(min-width: 768px)").matches) {
        ScrollTrigger.create({ trigger: grid.current, start: "top top", end: "+=190%", pin: true, pinSpacing: true, anticipatePin: 1 });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative w-full overflow-clip" style={{ background: "transparent" }}>
      {/* ── INTRO-Sequenz „UNSER TEAM". ─────────────────────────────────────────────────── */}
      <div data-mo-intro className="relative flex w-full items-center justify-center overflow-clip" style={{ height: "78vh", minHeight: "520px" }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage: "linear-gradient(180deg, transparent 0%, black 16%, black 84%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 16%, black 84%, transparent 100%)",
          }}
        >
          <DustLayer boost={0.85} center={{ x: 0.5, y: 0.5 }} radius={0.62} />
        </div>
        <h2 className="relative z-[1] m-0 text-center uppercase text-[#f8f7f3]" style={{ fontFamily: SHARP, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 0.92 }}>
          <span className="block overflow-hidden">
            <span data-mo-word className="block text-[9vw] max-[767px]:!text-[15vw]">Unser</span>
          </span>
          <span className="block overflow-hidden">
            <span data-mo-word className="block text-[9vw] max-[767px]:!text-[15vw]">Team</span>
          </span>
        </h2>
      </div>

      {/* ── Desktop: 7×6-Feinraster, Leader (Marcus/Knut/Laegel) am größten (2×4). ──────── */}
      <div
        ref={grid}
        className="grid w-full max-[767px]:hidden"
        style={{ gridTemplateColumns: "repeat(7, 1fr)", gridTemplateRows: "repeat(6, 1fr)", gap: 0, height: "100vh" }}
      >
        {LEADERS_D.map(({ p, col, row }) => (
          <div key={p.img} style={{ gridColumn: col, gridRow: row }}>
            <TeamTile img={p.img} name={p.name} role={p.role} />
          </div>
        ))}
        {SINGLES_D.map(({ p, col, row }) => (
          <div key={p.img} style={{ gridColumn: col, gridRow: row }}>
            <TeamTile img={p.img} name={p.name} role={p.role} />
          </div>
        ))}
      </div>

      {/* ── Mobile: 2 Spalten. Leader full-width als Höhepunkte, Singles paarweise. ─────── */}
      <div className="hidden w-full max-[767px]:grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: 0 }}>
        <div style={{ gridColumn: "1 / span 2", height: "62vh" }}>
          <TeamTile img={MARCUS.img} name={MARCUS.name} role={MARCUS.role} />
        </div>
        {REST.slice(0, 4).map((p) => (
          <div key={p.img} style={{ height: "44vh" }}>
            <TeamTile img={p.img} name={p.name} role={p.role} />
          </div>
        ))}
        <div style={{ gridColumn: "1 / span 2", height: "62vh" }}>
          <TeamTile img={KNUT.img} name={KNUT.name} role={KNUT.role} />
        </div>
        {REST.slice(4, 8).map((p) => (
          <div key={p.img} style={{ height: "44vh" }}>
            <TeamTile img={p.img} name={p.name} role={p.role} />
          </div>
        ))}
        <div style={{ gridColumn: "1 / span 2", height: "62vh" }}>
          <TeamTile img={LAEGEL.img} name={LAEGEL.name} role={LAEGEL.role} />
        </div>
        {REST.slice(8).map((p) => (
          <div key={p.img} style={{ height: "44vh" }}>
            <TeamTile img={p.img} name={p.name} role={p.role} />
          </div>
        ))}
      </div>

      {/* (Auslauf entfällt — der Grid-Pin oben liefert Halt + Overlap-Distanz für die Blende.) */}
    </section>
  );
}
