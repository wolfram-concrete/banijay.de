"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COMPANIES_DIRECTORY } from "@/data/companiesDirectory";
import { ECO_CATEGORIES } from "@/data/ecosystem";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// „Unsere Companies" (Home) — Stand 13.07. (Task #61, Wolfram-Diktat):
//  • Datenbasis: companiesDirectory.ts — ALLE Logo-Companies aus
//    assets/Logo/Logos companies + Platzhalter aus der Coopetition-Grafik,
//    OHNE Brainpool (Kundenwunsch). Rubrik-Filter über ecoKeys.
//  • BENTO-GRID (Wolfram 13.07.: wieder Bento statt 2-Spalten-Liste) —
//    4 Spalten dense mit wiederkehrendem Feature-Rhythmus (spanFor), echtes
//    Weiß-Logo o. r., Name + Keywords unten links, exemplarisches
//    Bewegtbild (Trailer-Loops).
//  • Klick → LIGHTBOX als SCROLL-FLIP-STACK (Optik + Mechanik der früheren
//    Kompetenzfelder-Flip-Cards): eigener Scroll-Kontext im Overlay, die
//    aktuelle Karte kippt beim Scrollen um ihre Oberkante nach hinten weg
//    (rotationX/scale/fade, gescrubbt), die nächste Company-Karte schiebt
//    sich darüber. Video läuft FULL-SIZE im Karten-Background (Farb-Tint
//    aus der Video-Palette + Scrim für Lesbarkeit). X/Esc schließt
//    jederzeit, Pfeiltasten blättern (Smooth-Scroll zur nächsten Karte).

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";

// BENTO-RHYTHMUS (Wolfram 14.07.): 4-spaltig, aber MIT variierenden Kachelgrößen
// (Bento-Logik beibehalten) — große Feature-Cards über col-start gemischt links/
// rechts, kleinere Cards clustern via dense. Kompaktere Zeilen (11.5vw) halten den
// Aufbau trotzdem niedrig. Wiederholt sich alle 12 Kacheln.
const SPAN: Record<number, string> = {
  0: "md:col-span-2 md:row-span-2", //  groß, LINKS (Anker oben)
  4: "md:col-span-2 md:col-start-2 md:row-span-2", // groß, RECHTS
  7: "md:row-span-2 md:col-start-3", // hoch, RECHTS
  9: "md:col-span-2 md:col-start-2", // breit, RECHTS
};
const spanFor = (i: number) => SPAN[i % 12] ?? "";

// Exemplarisches Bewegtbild: stabile Zuordnung Company → Trailer-Loop
const REEL: Record<string, string> = Object.fromEntries(
  COMPANIES_DIRECTORY.map((c, i) => [c.id, `/company-media/reel-${(i % 6) + 1}.mp4`]),
);
// Echte Trailer je Company (Wolfram 14.07.) — überschreiben das generische Reel.
REEL["good-humor"] = "/company-media/madefor-good-humor.mp4";


export function AlgarveCompaniesBento() {
  const root = useRef<HTMLElement>(null);
  const [rubrik, setRubrik] = useState<string>("alle");

  const cards = useMemo(
    () => (rubrik === "alle" ? COMPANIES_DIRECTORY : COMPANIES_DIRECTORY.filter((d) => d.ecoKeys.includes(rubrik))),
    [rubrik],
  );

  // Kachel-Aufbau: gestaffelt herein; bei Rubrikwechsel remountet die Liste.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const els = gsap.utils.toArray<HTMLElement>("[data-bento-card]");
      gsap.set(els, { autoAlpha: 0, y: 40, scale: 0.96 });
      ScrollTrigger.batch(els, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.06 }),
      });
    },
    { scope: root, dependencies: [rubrik], revertOnUpdate: true },
  );

  // Kachel-Videos: nur sichtbare spielen (40 parallele Decodes vermeiden).
  useEffect(() => {
    const vids = Array.from(root.current?.querySelectorAll<HTMLVideoElement>("[data-bento-video]") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) void v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.15 },
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [rubrik]);

  return (
    <section ref={root} data-nav-theme="dark" className="relative w-full" style={{ background: "transparent", color: PAPER }}>
      {/* FULL SIZE (Wolfram 13.07.): kein maxWidth-Container mehr — die Liste
          läuft full-bleed mit dem 2vw-Randmaß der übrigen Module. Oben knapp:
          die AnimatedHeading davor bringt ihren eigenen Raum mit. */}
      <div className="w-full pb-24 pt-4 lg:pb-32 lg:pt-6" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        {/* Kein eigener Header mehr (Wolfram 13.07.): die Headline kommt als
            großes AnimatedHeading-Panel direkt VOR dieser Section (page.tsx). */}

        {/* Rubrik-Filter (Ökosystem-Kategorien) — Chip-Optik wie News-Filter,
            mittelachsig überm Grid */}
        <div className="mb-8 flex flex-wrap justify-center gap-2.5 md:gap-3">
          {[{ key: "alle", label: "Alle" }, ...ECO_CATEGORIES.map((c) => ({ key: c.key, label: c.label }))].map((r) => {
            const isActive = r.key === rubrik;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setRubrik(r.key)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-[6px] border px-5 py-2.5 text-sm font-medium transition-colors duration-200 max-[767px]:!px-4 max-[767px]:!py-2 max-[767px]:!text-[3.6vw] ${
                  isActive
                    ? "border-[#ff4370] bg-[#ff4370] text-[#f8f7f3]"
                    : "border-[rgba(248,247,243,0.18)] bg-transparent text-[#f8f7f3] hover:border-[#f8f7f3]"
                }`}
                style={{ fontFamily: SHARP }}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Bento-Grid — kompakt & uniform, 4-spaltig, niedrige Zeilen (Wolfram
            14.07.): mehr Companies auf weniger Scrollhöhe. Die GANZE Karte ist der
            Klick → externe Company-Website (nur wenn eine URL vorliegt), sonst eine
            neutrale, nicht klickbare Kachel. Keine Flip-/Detailkarten mehr. */}
        <div key={rubrik} className="grid grid-cols-2 gap-1.5 md:grid-cols-4 md:gap-2 md:[grid-auto-flow:dense] md:[grid-auto-rows:11.5vw]">
          {cards.map((card, i) => {
            const inner = (
              <>
                {/* Exemplarisches Bewegtbild (Loop aus dem Banijay-Trailer) */}
                <video
                  data-bento-video
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={card.image}
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src={REEL[card.id]} type="video/mp4" />
                </video>
                {/* Scrim für Lesbarkeit */}
                <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0) 38%, rgba(10,10,10,0.35) 62%, rgba(10,10,10,0.88) 100%)" }} />

                {/* Echtes weißes Company-Logo oben rechts (Platzhalter: keins) */}
                {card.logo && (
                  <img
                    src={card.logo}
                    alt=""
                    aria-hidden
                    className="absolute right-[4%] top-[6%] h-[1.4rem] w-auto max-w-[34%] object-contain opacity-95 md:h-[1.6rem]"
                  />
                )}

                {/* Name + (falls URL) Website-Affordanz — der Klick liegt auf der
                    ganzen Karte, daher hier nur ein Span (kein verschachteltes <a>). */}
                <div className="relative z-10 flex flex-col gap-1 p-3 md:p-3.5">
                  <h3 className="m-0 text-white" style={{ fontFamily: SHARP, fontSize: "clamp(0.95rem, 1.35vw, 1.5rem)", lineHeight: "106%", fontWeight: 500, letterSpacing: "-0.01em" }}>
                    {card.name}
                  </h3>
                  {card.url && (
                    <span className="inline-flex w-fit items-center gap-1.5 text-white/85 transition-colors group-hover:text-white" style={{ fontFamily: SHARP, fontSize: "clamp(0.72rem, 0.9vw, 0.9rem)", fontWeight: 500 }}>
                      <span className="underline underline-offset-[5px]">Zur Website</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </>
            );
            const cls = `group relative flex min-h-[32vw] flex-col justify-end overflow-hidden text-left md:min-h-0 ${spanFor(i)}`;
            return card.url ? (
              <a
                key={card.id}
                data-bento-card
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cls} no-underline`}
                style={{ background: "#14100f" }}
              >
                {inner}
              </a>
            ) : (
              <div key={card.id} data-bento-card className={cls} style={{ background: "#14100f" }}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
