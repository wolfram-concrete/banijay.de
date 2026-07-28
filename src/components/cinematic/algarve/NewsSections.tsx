"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { FeedItem, FeedRubrik } from "@/data/feed";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// News-Seite als RUBRIK-BLÖCKE (Wolfram 16.07.) — löst die gemischte Gesamtliste mit
// Chip-Filter (NewsFilter + NewsGrid) ab. Statt einer nach Datum durchmischten Liste,
// aus der man sich eine Rubrik herausfiltern musste, steht jede Rubrik als eigener
// Block: linksbündige Headline, Trennlinie, darunter die Posts als Slider.
// Der Chip-Filter entfällt damit — er hätte nur noch dupliziert, was die Blöcke zeigen.
//
// WARUM NATIVER SCROLL-SLIDER, kein gepinnter GSAP-Slider (wie CareerSocialSlider):
// Fünf Blöcke = fünf Slider. Gepinnt würde jeder einzelne den Seitenscroll kapern; man
// müsste sich durch alle fünf durchscrubben, um ans Seitenende zu kommen — bei ~47
// Posts ein sehr langer Zwangsweg. Nativer Overflow-Scroll lässt beides zu: durch eine
// Rubrik blättern ODER daran vorbeiscrollen. Zusätzlich funktioniert er ohne JS, mit
// Touch, Trackpad, Shift+Wheel und Tastatur.

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";

type Block = {
  rubrik: FeedRubrik;
  /** Sichtbare Überschrift — kann von der Datenrubrik abweichen. */
  label: string;
  /** Kurze Einordnung rechts neben der Headline. */
  note: string;
  /** Social-Posts laufen im Hochformat, redaktionelle Beiträge im Querformat. */
  ratio: string;
};

// Reihenfolge (Wolfram 24.07.): Presse → Podcast → Marcus Wolter → Social.
// Der Primetime-Hitrate-Abschnitt ist auf Wolframs Wunsch (24.07.) komplett raus
// (die Beiträge liegen weiter in den Daten unter category „Primetime", werden hier
// aber nicht mehr als eigener Block ausgespielt).
const BLOECKE: Block[] = [
  { rubrik: "Presse", label: "Presse", note: "Meldungen aus der Banijay-Welt.", ratio: "4 / 3" },
  { rubrik: "Podcast", label: "Podcast", note: "WOLTER TALKS — der Banijay-Podcast.", ratio: "4 / 3" },
  { rubrik: "Marcus Wolter", label: "Marcus Wolter", note: "Interviews und Auftritte in externen Medien.", ratio: "4 / 3" },
  { rubrik: "Social", label: "Social", note: "Direkt aus unseren Kanälen.", ratio: "4 / 5" },
];

function Card({ item, ratio }: { item: FeedItem; ratio: string }) {
  const inner = (
    <>
      <div className="relative overflow-hidden" style={{ aspectRatio: ratio, background: "rgba(255,255,255,0.08)" }}>
        <img
          src={item.img}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        {item.source && (
          <span
            className="absolute left-3 top-3 rounded-[4px] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em]"
            style={{
              background: "rgba(14,13,11,0.55)",
              color: PAPER,
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              fontFamily: SHARP,
            }}
          >
            {item.source}
          </span>
        )}
      </div>
      <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-accent">{item.date}</p>
      <h3
        className="mt-1.5 overflow-hidden leading-snug text-[#f8f7f3] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]"
        style={{ fontFamily: SHARP, fontSize: "1.05rem", lineHeight: "126%", fontWeight: 500 }}
      >
        {item.title}
      </h3>
      <span className="mt-2.5 inline-flex items-center gap-1 text-[0.82rem] font-medium text-accent" style={{ fontFamily: SHARP }}>
        <span className="relative">
          {item.external ? "Ansehen" : "Zum Beitrag"}
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </>
  );

  // shrink-0 + feste Breite: im Flex-Track dürfen die Karten NICHT schrumpfen, sonst
  // quetscht der Browser alle nebeneinander statt zu scrollen.
  const cls = "group block shrink-0 snap-start no-underline w-[19.5vw] max-[1199px]:!w-[30vw] max-[767px]:!w-[64vw]";

  return item.external ? (
    <a data-news-card href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link data-news-card href={item.href} className={cls}>
      {inner}
    </Link>
  );
}

function RubrikBlock({ block, items }: { block: Block; items: FeedItem[] }) {
  const track = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);

  // Pfeile scrollen um EINE Kartenbreite (inkl. Gap) — aus dem echten Layout gelesen,
  // nicht geschätzt, damit die Schrittweite bei jedem Breakpoint stimmt.
  const nudge = (dir: 1 | -1) => {
    const tr = track.current;
    if (!tr) return;
    const karte = tr.querySelector<HTMLElement>("[data-news-card]");
    const gap = parseFloat(getComputedStyle(tr).columnGap) || 0;
    const schritt = karte ? karte.offsetWidth + gap : tr.clientWidth * 0.8;
    tr.scrollBy({ left: dir * schritt, behavior: "smooth" });
  };

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const karten = gsap.utils.toArray<HTMLElement>("[data-news-card]", root.current);
      if (!karten.length) return;
      gsap.set(karten, { opacity: 0, y: 40 });
      ScrollTrigger.batch(karten, {
        start: "top 94%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.07 }),
      });
    },
    { scope: root },
  );

  if (!items.length) return null;

  return (
    <section ref={root} aria-labelledby={`rubrik-${block.rubrik.replace(/\s+/g, "-")}`}>
      {/* Kopfzeile: linksbündige Headline + Einordnung; rechts die Pfeile. */}
      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2
            id={`rubrik-${block.rubrik.replace(/\s+/g, "-")}`}
            className="m-0 max-[767px]:!text-[7vw]"
            style={{ fontFamily: SHARP, fontSize: "2.4vw", lineHeight: "110%", fontWeight: 500, letterSpacing: "-0.06vw", color: PAPER }}
          >
            {block.label}
          </h2>
          {/* Ohne Beitragszahl (Wolfram 16.07.) — der Slider zeigt selbst, wie viel da ist. */}
          <span className="max-[767px]:!text-[3.4vw]" style={{ fontFamily: SHARP, fontSize: "0.9vw", color: "rgba(248,247,243,0.5)" }}>
            {block.note}
          </span>
        </div>

        {/* Pfeile nur ab Tablet: auf dem Touch-Gerät wischt man ohnehin. */}
        <div className="flex shrink-0 gap-2 max-[767px]:!hidden">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => nudge(dir)}
              aria-label={dir === -1 ? `${block.label}: zurück` : `${block.label}: weiter`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[6px] border border-[rgba(248,247,243,0.22)] text-[#f8f7f3] transition-colors duration-200 hover:border-[#ff4370] hover:bg-[#ff4370]"
            >
              {dir === -1 ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Trennlinie unter der Headline */}
      <div className="mt-4 mb-8 h-px w-full" style={{ background: "rgba(248,247,243,0.22)" }} />

      {/* Slider-Track. Startet linksbündig zur Headline (Grid-Container), BLUTET aber
          nach rechts bis an den Viewport-Rand (Wolfram 16.07.) — die letzte sichtbare
          Karte läuft in den Anschnitt, dadurch liest man sofort „da geht's weiter".
          `calc(50% - 50vw)` hebt exakt den rechten Rand des zentrierten Containers auf
          (50 % = halbe Containerbreite) — dasselbe Muster wie die Logo-Bahn in
          WorldNetwork. Die Scrollbar ist ausgeblendet; Pfeile + Wischen tragen die
          Bedienung. */}
      <div
        ref={track}
        className="news-track flex overflow-x-auto overflow-y-hidden pb-2"
        style={{
          gap: "1.4vw",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          marginRight: "calc(50% - 50vw)",
          paddingRight: "2vw",
        }}
      >
        {items.map((item) => (
          <Card key={item.id} item={item} ratio={block.ratio} />
        ))}
      </div>
    </section>
  );
}

export function NewsSections({ items }: { items: FeedItem[] }) {
  return (
    <>
      <style>{`.news-track::-webkit-scrollbar{display:none}`}</style>
      <div className="flex flex-col" style={{ gap: "6vw" }}>
        {BLOECKE.map((block) => (
          <RubrikBlock key={block.rubrik} block={block} items={items.filter((it) => it.rubrik === block.rubrik)} />
        ))}
      </div>
    </>
  );
}
