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
const ASIDE_W = 470;

// Alle Zahlen/Daten/Fakten von banijay.de (Wolfram 14.07.). fg/labelColor je Card
// lesbar; Copy klappt in der Accordion auf.
type Fact = {
  value: number;
  suffix: string;
  label: string;
  copy: string;
  bg: string;
  fg: string;
  labelColor: string;
  copyColor: string;
  border?: string;
};
const FACTS: Fact[] = [
  {
    value: 40,
    suffix: "+",
    label: "Companies & Labels im deutschen Netzwerk",
    copy: "Produktionshäuser, Labels, Live-Einheiten, Talent-Managements und Plattformen — eigenständig, aber unter einem Dach.",
    bg: "#ff4370",
    fg: "#0e0d0b",
    labelColor: "rgba(14,13,11,0.72)",
    copyColor: "rgba(14,13,11,0.78)",
  },
  {
    value: 1300,
    suffix: "",
    label: "Mitarbeitende hinter den Formaten",
    copy: "Kreative, Produzent:innen, Redaktionen und Spezialist:innen an mehreren Standorten in Deutschland.",
    bg: "#4a1636",
    fg: "#f8f7f3",
    labelColor: "rgba(248,247,243,0.66)",
    copyColor: "rgba(248,247,243,0.8)",
    border: "1px solid rgba(255,255,255,0.12)",
  },
  {
    value: 4,
    suffix: " Mrd.",
    label: "Views & Zuschauer erreicht",
    copy: "Reichweite über lineare, digitale und Social-Ausspielwege hinweg — Monat für Monat.",
    bg: "#3a1230",
    fg: "#f8f7f3",
    labelColor: "rgba(248,247,243,0.66)",
    copyColor: "rgba(248,247,243,0.8)",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  {
    value: 3000,
    suffix: "",
    label: "Stunden Entertainment im Jahr",
    copy: "Bühnenshows, Live-Sendungen, Serien, Online-Plattformen und Podcasts — Jahr für Jahr aus dem Verbund.",
    bg: "#4a1636",
    fg: "#f8f7f3",
    labelColor: "rgba(248,247,243,0.66)",
    copyColor: "rgba(248,247,243,0.8)",
    border: "1px solid rgba(255,255,255,0.12)",
  },
  {
    value: 130,
    suffix: "+",
    label: "Companies weltweit",
    copy: "Lokale Marktnähe mit internationaler Banijay-Perspektive — Formate, die rund um den Globus laufen.",
    bg: "#3a1230",
    fg: "#f8f7f3",
    labelColor: "rgba(248,247,243,0.66)",
    copyColor: "rgba(248,247,243,0.8)",
    border: "1px solid rgba(255,255,255,0.1)",
  },
];

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
        nums.forEach((el, i) => (el.textContent = fmt(FACTS[i].value) + FACTS[i].suffix));
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
          { v: FACTS[i].value, duration: 0.2, onUpdate: () => (nums[i].textContent = fmt(numProxy[i].v) + FACTS[i].suffix) },
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
                src="/editorial/marcus-hof.jpg"
                alt="Marcus Wolter, CEO Banijay Germany"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center" }}
              />
            </div>

            {/* Fakten-Accordion rechts (Desktop absolut 470px, Mobile gestapelt) */}
            <div
              ref={aside}
              className="absolute right-0 top-0 z-[2] flex h-full flex-col gap-1.5 max-md:!static max-md:!mt-4 max-md:!h-auto max-md:!w-full"
              style={{ width: `${ASIDE_W}px` }}
            >
              {FACTS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <button
                    key={f.label}
                    type="button"
                    data-fact-card
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex flex-1 flex-col justify-between overflow-hidden text-left max-md:!flex-none max-md:!min-h-[7.5rem]"
                    style={{ background: f.bg, border: f.border, padding: "14px 16px", color: f.fg, cursor: "pointer" }}
                  >
                    {/* Kopf: Zahl + Chevron */}
                    <div className="flex w-full items-start justify-between gap-3">
                      <span
                        data-fact-num
                        style={{ fontFamily: SHARP, fontSize: "clamp(2.2rem, 3.6vw, 58px)", lineHeight: 1, letterSpacing: "-0.04em", fontWeight: 500 }}
                      >
                        0
                      </span>
                      <ChevronDown
                        className="mt-1 h-5 w-5 shrink-0 transition-transform duration-300"
                        style={{ opacity: 0.6, transform: isOpen ? "rotate(180deg)" : "none" }}
                      />
                    </div>
                    {/* Label */}
                    <span style={{ fontSize: "clamp(0.9rem, 1vw, 1.1rem)", lineHeight: "128%", color: f.labelColor, maxWidth: "24ch", marginTop: "0.5rem", fontWeight: 500 }}>
                      {f.label}
                    </span>
                    {/* Copy — klappt per grid-rows-Trick auf (kein Layout-Sprung) */}
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p style={{ margin: "0.7rem 0 0", fontSize: "clamp(0.82rem, 0.9vw, 0.98rem)", lineHeight: "144%", color: f.copyColor, maxWidth: "34ch" }}>
                          {f.copy}
                        </p>
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
