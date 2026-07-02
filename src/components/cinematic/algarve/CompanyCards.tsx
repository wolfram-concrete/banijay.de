"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COMPANY_CARDS, CARD_KIND_LABEL } from "@/data/companyCards";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// section_companies (Algarve value-features/services 1:1 adaptiert): großer,
// dunkler Sticky-Card-Stack — hier als FARBIGE Company-Teaser-Cards. Jede Card
// eine Company, Farbe beginnend bei Magenta und dann durch den Farbkreis. Top:
// Name + Cluster/Index, Bottom: Claim, Body, Tags, Known-for, externer CTA. Auf
// Desktop kippt jede Card beim Weiterscrollen echt in 3D nach hinten weg.

const H1 = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "6.11vw",
  lineHeight: "104%",
  fontWeight: 500,
  letterSpacing: "-0.139vw",
  margin: 0,
} as const;

// ── Farb-Choreografie ──────────────────────────────────────────────────────
// Card 0 = Banijay-Magenta (#ff4370), danach gleichmäßiger Hue-Sweep über den
// Farbkreis bei konstanter Sättigung/Helligkeit → jede Card eine andere Farbe,
// aber als eine Familie. Textfarbe wird per Luminanz auf Kontrast gewählt.
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function relLuminance([r, g, b]: [number, number, number]): number {
  const lin = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

const N = COMPANY_CARDS.length;
const START_HUE = 340; // Nähe Banijay-Magenta

function cardTheme(i: number): { bg: string; fg: string; soft: string } {
  const hue = (START_HUE + (360 / N) * i) % 360;
  const s = 74;
  const l = 55;
  const rgb = i === 0 ? ([255, 67, 112] as [number, number, number]) : hslToRgb(hue, s, l);
  const bg = i === 0 ? "#ff4370" : `hsl(${hue}, ${s}%, ${l}%)`;
  const fg = relLuminance(rgb) > 0.42 ? "#0e0d0b" : "#f8f7f3";
  const soft = fg === "#f8f7f3" ? "rgba(248,247,243,0.72)" : "rgba(14,13,11,0.66)";
  return { bg, fg, soft };
}

const CARDS = COMPANY_CARDS.map((c, i) => ({
  ...c,
  ...cardTheme(i),
  badge: CARD_KIND_LABEL[c.kind],
  rotate: i % 2 === 1 ? "rotate(-6deg)" : "rotate(5deg)",
}));

export function AlgarveCompanyCards() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 3D-Wegkippen nur auf echtem Desktop (≥992px), wo die Cards sticky
      // gestapelt sind. Ab ≤991px stehen sie im Normalfluss (Querformat-Bild) —
      // dort würde das Kippen/Faden nur stören.
      if (!window.matchMedia("(min-width: 992px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-company-card]");
      // Echtes 3D-Wegkippen: sobald die NÄCHSTE Card hochscrollt und diese
      // überlagert, kippt die aktuelle um ihre Oberkante nach hinten weg
      // (rotationX) + schrumpft + faded. Nicht nur Fade/Scale (Briefing).
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.set(card, { transformPerspective: 2000, transformOrigin: "50% 0%" });
        gsap.to(card, {
          rotationX: -60,
          scale: 0.8,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: 0.8,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="overflow-clip"
      style={{ background: "#f8f7f3", paddingTop: "5.56vw", paddingBottom: "8.33vw" }}
    >
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div className="flex flex-col" style={{ gap: "2.22vw" }}>
          {CARDS.map((card) => (
            <article
              key={card.id}
              data-company-card
              className="relative flex flex-col justify-between overflow-clip max-[991px]:!static max-[991px]:!h-auto max-[991px]:!p-[6vw] max-[767px]:!p-[8vw]"
              style={{
                position: "sticky",
                top: "1.39vw",
                height: "96vh",
                padding: "4.44vw",
                borderRadius: "1.67vw",
                backgroundColor: card.bg,
                color: card.fg,
                transformStyle: "preserve-3d",
                transform: "perspective(2000px)",
              }}
            >
              {/* Top: Cluster-Kicker + Name links, Index rechts */}
              <div className="relative flex items-start justify-between" style={{ gap: "2vw" }}>
                <div className="flex flex-col" style={{ gap: "1.11vw" }}>
                  <div className="flex items-center" style={{ gap: "0.83vw" }}>
                    <span
                      className="max-[767px]:!text-[2.8vw]"
                      style={{
                        fontFamily: "var(--font-sharp), sans-serif",
                        fontSize: "0.9vw",
                        fontWeight: 700,
                        letterSpacing: "0.09vw",
                        textTransform: "uppercase",
                        color: card.soft,
                      }}
                    >
                      {card.cluster}
                    </span>
                    {card.badge && (
                      <span
                        className="max-[767px]:!text-[2.4vw]"
                        style={{
                          fontFamily: "var(--font-sharp), sans-serif",
                          fontSize: "0.72vw",
                          fontWeight: 700,
                          letterSpacing: "0.08vw",
                          textTransform: "uppercase",
                          padding: "0.2vw 0.66vw",
                          borderRadius: "999px",
                          border: `0.09vw solid ${card.fg}`,
                          color: card.fg,
                        }}
                      >
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="uppercase max-[767px]:!text-[9vw]" style={H1}>
                    {card.name}
                  </h3>
                </div>
                <h3 className="max-[767px]:!hidden" style={{ ...H1, color: card.soft }}>
                  {card.index}
                </h3>
              </div>

              {/* Bottom: Claim + Body + Tags + Known-for + CTA */}
              <div
                className="relative flex flex-col items-start max-[991px]:!mt-[3vw] max-[991px]:!max-w-full max-[991px]:!gap-[2vw] max-[767px]:!mt-[6vw]"
                style={{ maxWidth: "42vw", gap: "1.39vw" }}
              >
                <h4
                  className="m-0 max-[767px]:!text-[5vw]"
                  style={{
                    fontFamily: "var(--font-sharp), sans-serif",
                    fontSize: "2.22vw",
                    lineHeight: "116%",
                    fontWeight: 500,
                    letterSpacing: "-0.083vw",
                  }}
                >
                  {card.profile}
                </h4>
                <p
                  className="m-0 max-[767px]:!text-[3.6vw]"
                  style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "1.25vw", lineHeight: "138%", color: card.soft }}
                >
                  {card.body}
                </p>

                {/* Tags (max 3) — Kategorie-Marker: kleines Quadrat + gesperrte
                    Versalie. Klar als Meta-Element erkennbar, aber kein Button und
                    kein Hashtag. */}
                <div className="flex flex-wrap items-center max-[767px]:!text-[2.8vw]" style={{ gap: "1.25vw", marginTop: "0.4vw" }}>
                  {card.tags.slice(0, 3).map((t) => (
                    <span key={t} className="flex items-center" style={{ gap: "0.5vw" }}>
                      <span
                        aria-hidden
                        style={{ width: "0.42vw", height: "0.42vw", minWidth: "5px", minHeight: "5px", background: card.fg, display: "inline-block", borderRadius: "1px" }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-sharp), sans-serif",
                          fontSize: "0.82vw",
                          fontWeight: 700,
                          letterSpacing: "0.1vw",
                          textTransform: "uppercase",
                          color: card.fg,
                        }}
                      >
                        {t}
                      </span>
                    </span>
                  ))}
                </div>

                {/* Known-for (max 3) — beim Cologne Comedy Festival entfällt die
                    Zeile: das Festival IST das Highlight (keine Doppelung). */}
                {card.id !== "cologne-comedy-festival" && (
                  <div
                    className="flex flex-wrap items-center max-[767px]:!text-[3vw]"
                    style={{ fontFamily: "var(--font-sharp), sans-serif", gap: "0.56vw", fontSize: "1.05vw", color: card.soft }}
                  >
                    <span
                      className="max-[767px]:!text-[2.6vw]"
                      style={{ fontFamily: "var(--font-sharp), sans-serif", fontWeight: 700, textTransform: "uppercase", fontSize: "0.8vw", letterSpacing: "0.06vw", color: card.fg }}
                    >
                      Bekannt für
                    </span>
                    {card.knownFor.slice(0, 3).map((k, ki) => (
                      <span key={k}>
                        {ki > 0 && <span style={{ opacity: 0.5, marginRight: "0.56vw" }}>·</span>}
                        {k}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA → externe Website (neuer Tab). Hover = radialer Farb-Invert
                    (siehe .cta-invert in globals.css), kein ruckelnder Pfeil. */}
                <a
                  href={card.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Website von ${card.name} in neuem Tab öffnen`}
                  className="cta-invert inline-flex items-center no-underline max-[767px]:!text-[3.4vw]"
                  style={
                    {
                      "--cta-fg": card.fg,
                      "--cta-bg": card.bg,
                      marginTop: "0.83vw",
                      padding: "0.83vw 1.53vw",
                      borderRadius: "999px",
                      fontFamily: "var(--font-sharp), sans-serif",
                      fontSize: "1.05vw",
                      fontWeight: 600,
                      letterSpacing: "0.01vw",
                    } as CSSProperties
                  }
                >
                  <span className="cta-fill" aria-hidden />
                  <span className="cta-label inline-flex items-center" style={{ gap: "0.56vw" }}>
                    Zur Website
                    <span aria-hidden>↗</span>
                  </span>
                </a>
              </div>

              {/* Schwebendes Media-Panel (Company-Bild) rechts unten — nur Desktop.
                  Ab ≤991px (Tablet/Mobile) würde das schmale Hochformat die Card
                  unnötig hoch machen; dort greift stattdessen das Querformat-Bild
                  weiter unten in-flow. */}
              <div
                className="absolute overflow-clip max-[991px]:!hidden"
                style={{
                  zIndex: 2,
                  width: "26vw",
                  maxWidth: "460px",
                  height: "46vh",
                  maxHeight: "560px",
                  inset: "auto 4.44vw 4.44vw auto",
                  transform: card.rotate,
                  borderRadius: "1.11vw",
                  boxShadow: "0 1.2vw 3vw -0.6vw rgba(0,0,0,0.35)",
                }}
              >
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Querformat-Bild in-flow — nur Tablet/Mobile (≤991px). Volle
                  Card-Breite, festes Landscape-Verhältnis, sitzt unter dem Text
                  statt als schmales Hochformat rechts. So bleibt die Card kompakt. */}
              <div
                className="hidden w-full overflow-clip max-[991px]:!block"
                style={{
                  marginTop: "5vw",
                  borderRadius: "3vw",
                  boxShadow: "0 4vw 8vw -2vw rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="block w-full object-cover max-[991px]:!h-[34vw] max-[767px]:!h-[52vw]"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
