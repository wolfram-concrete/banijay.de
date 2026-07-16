"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// EDITORIAL PINNED-SCROLL (Wolfram 14.07.): das Marcus-Bild steht FULL SIZE, dann
// PINNT die Bühne (echter Scroll-Stop). Beim Weiterscrollen zieht sich das Bild
// nach links zusammen und die Fakten-Spalte fährt von RECHTS herein (Zahlen zählen
// von 0 hoch). Die Fakten sind eine ACCORDION-Liste: jede Kennzahl lässt sich
// aufklappen und zeigt ihren Copytext. Alle Zahlen/Fakten von banijay.de übertragen.
// Mobile / reduced motion: kein Pin — Bild oben, Accordion darunter.

const SHARP = "var(--font-sharp), sans-serif";
const ASIDE_W = 540; // etwas breiter (Wolfram 14.07.)

// Alle Zahlen/Daten/Fakten von banijay.de. Farbe kommt NICHT mehr je Fakt, sondern
// abwechselnd Magenta/Schwarz (Wolfram 14.07.) → siehe TONE unten.
type Fact = { value: number; suffix: string; label: string; copy: string };
// Wording exakt wie auf der Originalseite (Wolfram 15.07.); Unit-Suffixe je Fakt.
const FACTS: Fact[] = [
  {
    value: 40,
    suffix: "+",
    label: "Companies und Labels",
    copy: "Produktionshäuser, Labels, Live-Einheiten, Talent-Managements und Plattformen — eigenständig, aber unter einem Dach.",
  },
  {
    value: 90,
    suffix: " %",
    label: "Primetime-Hitrate",
    copy: "Anteil unserer Formate, die auf ihrem Sendeplatz die Primetime für sich entscheiden — Monat für Monat unter den Marktführern.",
  },
  {
    value: 1300,
    suffix: "+",
    label: "Mitarbeiterinnen und Mitarbeiter",
    copy: "Kreative, Produzent:innen, Redaktionen und Spezialist:innen an mehreren Standorten in Deutschland.",
  },
  {
    value: 4,
    suffix: " Mrd.",
    label: "Views & Zuschauer jährlich",
    copy: "Reichweite über lineare, digitale und Social-Ausspielwege hinweg — Monat für Monat.",
  },
  {
    value: 3000,
    suffix: " hrs.",
    label: "Stunden Entertainment",
    copy: "Bühnenshows, Live-Sendungen, Serien, Online-Plattformen und Podcasts — Jahr für Jahr aus dem Verbund.",
  },
  {
    value: 130,
    suffix: "+",
    label: "Companies weltweit",
    copy: "Lokale Marktnähe mit internationaler Banijay-Perspektive — Formate, die rund um den Globus laufen.",
  },
];

// Abwechselnd Magenta / Schwarz — Typo IMMER WEISS (Wolfram 15.07.: keine schwarze
// Typo auf Magenta mehr).
// Wolfram 16.07.: die SCHWARZEN Kacheln funktionierten nicht — stattdessen die
// TRANSPARENTEN Zahlencontainer aus der About-Facts-Section (ProofVideo.tsx:
// rgba(255,255,255,0.06) auf dem Moody-Hintergrund). Magenta bleibt als Akzent.
const TONE = (i: number) =>
  i % 2 === 0
    ? { bg: "#ff4370", fg: "#f8f7f3", label: "rgba(248,247,243,0.82)", copy: "rgba(248,247,243,0.86)" }
    : { bg: "rgba(255,255,255,0.06)", fg: "#f8f7f3", label: "rgba(248,247,243,0.6)", copy: "rgba(248,247,243,0.74)" };

const fmt = (n: number) => Math.round(n).toLocaleString("de-DE");

export function EditorialStickyScene() {
  const section = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);
  const aside = useRef<HTMLDivElement>(null);
  // Accordion: erste Kennzahl offen; Klick toggelt (Single-Open).
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrapEl = imgWrap.current!;
      const asideEl = aside.current!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-fact-card]");
      const nums = gsap.utils.toArray<HTMLElement>("[data-fact-num]");

      if (!desktop || reduce) {
        gsap.set([wrapEl, asideEl, cards], { clearProps: "all" });
        nums.forEach((el, i) => (el.textContent = fmt(FACTS[i].value)));
        return;
      }

      // Startlage: Bild FULL SIZE, Fakten-Spalte komplett rechts draußen.
      gsap.set(wrapEl, { width: "100%" });
      gsap.set(asideEl, { xPercent: 100, autoAlpha: 0 });
      gsap.set(cards, { autoAlpha: 0, y: 24 });
      nums.forEach((el) => (el.textContent = "0"));
      const numProxy = FACTS.map(() => ({ v: 0 }));

      // PIN: Bühne bleibt stehen, der Scroll treibt die Fakten-Choreografie.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: "+=135%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // ① kurzer Halt — Bild full-size (der „Scroll-Stop"-Moment)
      tl.to({}, { duration: 0.16 }, 0);
      // ② Bild zieht nach links zusammen + Fakten-Spalte fährt von RECHTS herein
      tl.to(wrapEl, { width: `calc(100% - ${ASIDE_W}px)`, ease: "power2.inOut", duration: 0.4 }, 0.16);
      tl.to(asideEl, { xPercent: 0, autoAlpha: 1, ease: "power2.inOut", duration: 0.4 }, 0.16);
      // ③ Cards sichtbar + Zahlen zählen hoch (gestaffelt)
      cards.forEach((card, i) => {
        tl.to(card, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.14 }, 0.32 + i * 0.05);
        tl.to(
          numProxy[i],
          { v: FACTS[i].value, duration: 0.2, onUpdate: () => (nums[i].textContent = fmt(numProxy[i].v)) },
          0.32 + i * 0.05,
        );
      });
      // ④ Halt mit stehenden Fakten, BEVOR der Pin löst
      tl.to({}, { duration: 0.2 }, 0.85);
    },
    { scope: section },
  );

  return (
    <div ref={section} className="relative max-md:!h-auto">
      {/* Gepinnte Bühne (Desktop) — auf Mobile normaler Fluss */}
      <div
        ref={stage}
        className="flex h-screen items-center overflow-clip max-md:!static max-md:!h-auto max-md:!py-[6vw]"
      >
        <div className="mx-auto w-full" style={{ maxWidth: "1920px", paddingLeft: "16px", paddingRight: "16px" }}>
          <div className="relative w-full overflow-visible max-md:!h-auto" style={{ height: "clamp(680px, 82vh, 1000px)" }}>
            {/* Bild-Wrapper (Desktop absolut, Mobile normaler Block) */}
            <div
              ref={imgWrap}
              className="absolute left-0 top-0 h-full w-full overflow-hidden max-md:!static max-md:!h-[62vw] max-md:!w-full"
            >
              <img
                src="/editorial/marcus-wolter.jpg"
                alt="Marcus Wolter, Founder & CEO Banijay Germany"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 32%" }}
              />
              {/* Scrim unten für die Quote-Lesbarkeit */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(10,2,8,0) 42%, rgba(10,2,8,0.5) 78%, rgba(10,2,8,0.82) 100%)" }}
              />
              {/* Marcus-Quote unten links auf dem Bild (weiß) — Wolfram 15.07. */}
              <blockquote
                className="absolute bottom-0 left-0 m-0 max-[767px]:!p-[5vw]"
                style={{ padding: "clamp(1.5rem, 2.4vw, 2.8rem)", maxWidth: "min(46rem, 64%)", color: "#f8f7f3" }}
              >
                <p className="m-0 max-[767px]:!text-[4vw]" style={{ fontFamily: SHARP, fontSize: "clamp(1.05rem, 1.5vw, 1.6rem)", lineHeight: "132%", fontWeight: 500 }}>
                  „Wir bei Banijay sind ein Verbund der besten unabhängigen Entertainment-Produzenten und Unternehmer. Wir bieten Unterhaltung, über die ganz Deutschland spricht.&ldquo;
                </p>
                <span className="mt-3 block max-[767px]:!text-[3.2vw]" style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)", fontWeight: 500, color: "rgba(248,247,243,0.74)" }}>
                  Marcus Wolter, Founder &amp; CEO Banijay Germany
                </span>
              </blockquote>
            </div>

            {/* Fakten-Accordion rechts — EINE geschlossene Fläche: keine Trenner/Gaps,
                Kacheln stoßen aneinander, abwechselnd Magenta/Schwarz. Die geöffnete
                Kachel bekommt mehr Höhe (flex-grow), damit die Copy nicht an der Kante
                klemmt (Wolfram 14.07.). */}
            <div
              ref={aside}
              className="absolute right-0 top-0 z-[2] flex h-full flex-col max-md:!static max-md:!mt-4 max-md:!h-auto max-md:!w-full"
              style={{ width: `${ASIDE_W}px` }}
            >
              {FACTS.map((f, i) => {
                const isOpen = open === i;
                const tone = TONE(i);
                // „+" sitzt in Sharp Grotesk hoch im Glyphenkasten → auf die Grundlinie
                // der Zahl versetzen + wie die Einheiten (Mrd./hrs.) abrücken (Wolfram 15.07.).
                // „+" und „%" sind SYMBOLE und gehören eng an die Ziffer (Wolfram 16.07.:
                // „mehr nach einer Einheit aussehen") → knapper Abstand statt des vollen
                // Leerzeichens. Wort-Einheiten (Mrd., hrs.) behalten ihr Leerzeichen,
                // die brauchen die Luft.
                const sym = f.suffix.trim();
                const isPlus = sym === "+";
                const isSymbol = isPlus || sym === "%";
                return (
                  <button
                    key={f.label}
                    type="button"
                    data-fact-card
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex flex-col justify-between overflow-hidden text-left transition-[flex-grow] duration-500 ease-out max-md:!flex-none max-md:!min-h-[8.5rem]"
                    style={{
                      flexGrow: isOpen ? 2.1 : 1,
                      flexShrink: 1,
                      flexBasis: "0%",
                      background: tone.bg,
                      color: tone.fg,
                      padding: "1.35rem 1.9rem",
                      cursor: "pointer",
                    }}
                  >
                    {/* Kopf: Zahl + Chevron. Große Ziffer; Einheiten-Suffix (+ / Mrd. /
                        hrs.) einheitlich & etwas größer (Wolfram 15.07.). */}
                    <div className="flex w-full items-start justify-between gap-3">
                      {/* WICHTIG: eigene font-size am Wrapper (= Zifferngröße) → der kleine
                          Suffix richtet sich an EINER konsistenten Grundlinie aus (ohne die
                          font-size wanderte die Baseline je Viewport, das + saß mal zu hoch,
                          mal zu tief). Dann sitzen +, %, Mrd., hrs. alle gleich (Wolfram 15.07.). */}
                      <span style={{ fontFamily: SHARP, fontSize: "clamp(3.3rem, 5.4vw, 87px)", lineHeight: 1, letterSpacing: "-0.04em", fontWeight: 500, whiteSpace: "nowrap" }}>
                        <span data-fact-num style={{ fontSize: "clamp(3.3rem, 5.4vw, 87px)" }}>
                          0
                        </span>
                        {isSymbol ? (
                          // Symbol-Einheit: eng an die Ziffer (marginLeft statt Leerzeichen).
                          // Das „+" sitzt in Sharp Grotesk minimal höher als %/Buchstaben →
                          // per position:relative um den Glyph-Offset (0.14em) absenken, damit
                          // seine Unterkante wie beim % auf der Ziffern-Grundlinie steht.
                          <span
                            style={{
                              fontSize: "clamp(1.8rem, 3vw, 46px)",
                              // noch enger an die Ziffer (Wolfram 16.07.): 0.1em → 0.04em
                              marginLeft: "0.04em",
                              ...(isPlus ? { position: "relative" as const, top: "0.14em" } : null),
                            }}
                          >
                            {sym}
                          </span>
                        ) : (
                          <span style={{ fontSize: "clamp(1.8rem, 3vw, 46px)", whiteSpace: "pre" }}>{f.suffix}</span>
                        )}
                      </span>
                      <ChevronDown
                        className="mt-1 h-5 w-5 shrink-0 transition-transform duration-300"
                        style={{ opacity: 0.55, transform: isOpen ? "rotate(180deg)" : "none" }}
                      />
                    </div>
                    {/* Label + aufklappende Copy */}
                    <div>
                      <span className="block" style={{ fontSize: "clamp(0.9rem, 1vw, 1.1rem)", lineHeight: "128%", color: tone.label, maxWidth: "28ch", fontWeight: 500 }}>
                        {f.label}
                      </span>
                      <div
                        className="grid transition-[grid-template-rows] duration-500 ease-out"
                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p style={{ margin: "0.8rem 0 0", fontSize: "clamp(0.82rem, 0.9vw, 0.98rem)", lineHeight: "146%", color: tone.copy, maxWidth: "40ch" }}>
                            {f.copy}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
