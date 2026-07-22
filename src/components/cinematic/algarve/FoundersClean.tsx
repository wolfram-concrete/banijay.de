"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERSHIP } from "@/data/leadership";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// TEAM-VARIANTE „CLEAN" (Wolfram 22.07., Briefing-Vorlage) — helles, ruhiges Corporate-Raster:
// heller Grau-Hintergrund, S/W-Porträts, oben die drei Leader (Marcus/Knut/Michael Laegel) in
// größeren Kacheln, darunter ein aufgeräumtes 3-Spalten-Raster. Name + Titel sitzen auf einer
// WEISSEN Karte unten links (kantig — Heike-Regel, in der Vorlage rund). Schmale Stege.

const SHARP = "var(--font-sharp), sans-serif";
const PEOPLE = LEADERSHIP;

const BG = "#e7e5e0"; // heller, warmer Grau-Grund (Stege) — die Karten (weiß) heben sich ab
const TILE_BG = "#dcdad5"; // minimal dunkler als der Grund, füllt Rest hinter dem Porträt

export function CleanCard({ name, role }: { name: string; role: string }) {
  return (
    <div
      className="pointer-events-none absolute bottom-[1vw] left-[1vw] z-[2] flex flex-col max-[767px]:bottom-[3vw] max-[767px]:left-[3vw]"
      style={{
        gap: "0.04em",
        padding: "0.5em 1.05em 0.58em",
        maxWidth: "calc(100% - 2vw)",
        background: "#ffffff",
        boxShadow: "0 8px 26px rgba(0,0,0,0.12)",
        color: "#14130b",
      }}
    >
      <span style={{ fontFamily: SHARP, fontWeight: 600, lineHeight: 1.08, letterSpacing: "-0.01em" }} className="text-[0.95rem] md:text-[0.98vw] max-[767px]:!text-[3.4vw]">
        {name}
      </span>
      {role ? (
        <span style={{ color: "rgba(20,19,11,0.55)", lineHeight: 1.16 }} className="text-[0.68rem] md:text-[0.74vw] max-[767px]:!text-[2.5vw]">
          {role}
        </span>
      ) : null}
    </div>
  );
}

// Corporate-Rahmung: Kopf/Schulter mittig, oben etwas Luft (Landscape-Kachel → object-cover
// beschneidet oben/unten; einheitliche object-position gibt allen denselben Bildausschnitt).
function CleanTile({ img, name, role }: { img: string; name: string; role: string }) {
  return (
    <div data-mo-tile className="relative h-full w-full overflow-hidden" style={{ background: TILE_BG }}>
      <img src={img} alt={name} className="h-full w-full object-cover" style={{ filter: "grayscale(1)", objectPosition: "50% 20%" }} />
      <CleanCard name={name} role={role} />
    </div>
  );
}

export function AlgarveFoundersClean() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Headline „Unser Team" (dunkel auf hell) — Word-Reveal wie die übrigen Headlines.
      const words = gsap.utils.toArray<HTMLElement>("[data-mo-word]");
      if (words.length) {
        gsap.from(words, { yPercent: 120, duration: 1.0, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: "[data-clean-head]", start: "top 82%", once: true } });
      }

      const tiles = gsap.utils.toArray<HTMLElement>("[data-mo-tile]");
      gsap.set(tiles, { autoAlpha: 0, y: 18 });
      ScrollTrigger.batch(tiles, {
        start: "top 94%",
        once: true,
        onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.05 }),
      });

      // EINRASTEN + SPACE (wie Editorial/Snap): sobald das Raster durchgescrollt ist, pinnen —
      // ~90vh reiner Halt, dann überlagert die LogoReveal-Blende.
      if (grid.current && window.matchMedia("(min-width: 768px)").matches) {
        ScrollTrigger.create({ trigger: grid.current, start: "bottom bottom", end: "+=190%", pin: true, pinSpacing: true, anticipatePin: 1 });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative w-full overflow-clip" style={{ background: BG }}>
      <div className="mx-auto w-full" style={{ maxWidth: "1720px", padding: "clamp(3rem, 7vw, 7rem) 2vw clamp(2rem, 4vw, 4rem)" }}>
        {/* Clean-Headline (dunkel, linksbündig) */}
        <h2 data-clean-head className="m-0 mb-[clamp(1.4rem,3vw,2.6rem)] uppercase" style={{ fontFamily: SHARP, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 0.96, color: "#14130b" }}>
          <span className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.12em" }}>
            <span data-mo-word className="inline-block text-[7vw] md:text-[3.6vw] max-[767px]:!text-[11vw]">Unser&nbsp;Team</span>
          </span>
        </h2>

        {/* Desktop: 3 Spalten — Kopfreihe (Leader) höher, darunter drei ruhige Reihen. */}
        <div
          ref={grid}
          className="grid w-full max-[767px]:hidden"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "1.28fr 1fr 1fr 1fr", gap: "0.5vw", height: "118vh" }}
        >
          {PEOPLE.map((p) => (
            <CleanTile key={p.img} img={p.img} name={p.name} role={p.role} />
          ))}
        </div>

        {/* Mobile: 2 Spalten, Leader zuerst; gleiche helle Karten. */}
        <div className="hidden w-full max-[767px]:grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "2vw" }}>
          {PEOPLE.map((p) => (
            <div key={p.img} style={{ aspectRatio: "4 / 5" }}>
              <CleanTile img={p.img} name={p.name} role={p.role} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
