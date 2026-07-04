"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CAREER } from "@/data/career";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Career-Rollenwelt als Sticky-Card-Stack — analog zu den Company-Cards: jede Card
// in einer anderen Farbe (Rainbow, beginnend bei Magenta), das Career-Foto sitzt
// in einem schwebenden Bildmodul rechts unten, Titel/Index oben, Claim + Text
// links. Die Cards kippen beim Weiterscrollen echt in 3D nach hinten weg.

const SHARP = "var(--font-sharp), sans-serif";
const H1 = {
  fontFamily: SHARP,
  fontSize: "5vw",
  lineHeight: "108%",
  fontWeight: 500,
  letterSpacing: "-0.139vw",
  margin: 0,
} as const;

// ── Farb-Choreografie: feste Video-Palette (Night + Neon) statt HSL-Rainbow ──
// Card 0 = Magenta, danach Laser-Pink/Coral/Violett/Indigo/Blau/Cyan/Aubergine.
const VIDEO_CARD_COLORS = [
  "#ff4370", // Main Magenta
  "#e71d7d", // Laser Pink
  "#ff5a47", // Hot Coral
  "#31105a", // Midnight Violet
  "#2e37c9", // Electric Indigo
  "#065dff", // Video Blue
  "#16c8ff", // Neon Cyan
  "#170725", // Deep Aubergine
] as const;
function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
}
function relLuminance([r, g, b]: [number, number, number]): number {
  const lin = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}
function cardTheme(i: number): { bg: string; fg: string; soft: string } {
  const bg = VIDEO_CARD_COLORS[i % VIDEO_CARD_COLORS.length];
  const fg = relLuminance(hexToRgb(bg)) > 0.42 ? "#0e0d0b" : "#f8f7f3";
  const soft = fg === "#f8f7f3" ? "rgba(248,247,243,0.72)" : "rgba(14,13,11,0.66)";
  return { bg, fg, soft };
}

// Magenta-Highlight-Wörter der Intro-Copy (Rollen-Domänen). Wortkern-Abgleich
// (nur Buchstaben, lowercase) → Satzzeichen wie „Produktion," werden ignoriert.
const HL_WORDS = new Set((CAREER.roleIntro.highlights ?? []).map((w) => w.toLowerCase()));
const coreWord = (w: string) => w.replace(/[^\p{L}]/gu, "").toLowerCase();

const ROLES = CAREER.roles.map((r, i) => ({
  ...r,
  ...cardTheme(i),
  rotate: i % 2 === 1 ? "rotate(-6deg)" : "rotate(5deg)",
}));

export function AlgarveCareerRoleStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Intro-Typo: Wort-für-Wort-Parallax, SCROLL-GEKOPPELT (scrub) — Headline + Copy
      // steigen gestaffelt aus dem Grund herein, während der Block durch den Viewport
      // scrollt (alle Viewports).
      gsap.from("[data-roleintro-word]", {
        opacity: 0,
        yPercent: 60,
        ease: "none",
        stagger: { amount: 1, from: "start" },
        scrollTrigger: { trigger: "[data-roleintro]", start: "top 85%", end: "top 35%", scrub: 1 },
      });

      // 3D-Wegkippen — EXAKT wie die Home-Kernkompetenzen (ServicesStack): auf ALLEN
      // Viewports (auch Mobile), Sticky-Stack, jede Card kippt um die Oberkante nach
      // hinten weg + faded, sobald die nächste hochscrollt.
      const cards = gsap.utils.toArray<HTMLElement>("[data-role-card]");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.set(card, { transformPerspective: 2000, transformOrigin: "50% 0%" });
        gsap.to(card, {
          rotationX: -60,
          scale: 0.8,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top top", scrub: 0.8 },
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
        {/* Intro — GROSSE Headline (nutzt die Breite) + kleinere Copy darunter, beides
            mit scroll-gekoppeltem Wort-Parallax. */}
        <div data-roleintro className="max-w-[84vw] max-[767px]:!max-w-full" style={{ marginBottom: "4.5vw" }}>
          {/* GROSSE Headline — baut sich zuerst auf (Wörter zuerst im DOM → zuerst im
              scroll-gekoppelten Stagger). Desktop + Mobile (mobil größer). */}
          <h2 className="m-0 flex flex-wrap max-[767px]:!text-[8.5vw]" style={{ fontFamily: SHARP, fontSize: "3.7vw", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.13vw", color: "#0e0d0b", columnGap: "0.5ch" }}>
            {CAREER.roleIntro.headline.split(" ").map((w, i) => (
              <span key={`h${i}`} data-roleintro-word className="inline-block" style={{ willChange: "transform, opacity" }}>
                {w}
              </span>
            ))}
          </h2>
          {/* Kleinere Copy DARUNTER (baut nach der Headline auf). Die Rollen-Domänen
              (Produktion · Redaktion · Entwicklung · Digital · Live) magenta gehighlightet. */}
          <p className="m-0 mt-[1.6vw] flex max-w-[48vw] flex-wrap max-[767px]:!mt-[5vw] max-[767px]:!max-w-full max-[767px]:!text-[4vw]" style={{ fontFamily: SHARP, fontSize: "1.3vw", lineHeight: "142%", fontWeight: 500, color: "rgba(14,13,11,0.58)", columnGap: "0.4ch" }}>
            {CAREER.roleIntro.text.split(" ").map((w, i) => (
              <span
                key={`t${i}`}
                data-roleintro-word
                className="inline-block"
                style={{ willChange: "transform, opacity", color: HL_WORDS.has(coreWord(w)) ? "#ff4370" : undefined }}
              >
                {w}
              </span>
            ))}
          </p>
        </div>

        {/* Stack — bunte Cards mit schwebendem Bildmodul (Company-Cards-Optik) */}
        <div className="flex flex-col" style={{ gap: "2.22vw" }}>
          {ROLES.map((card) => (
            <div
              key={card.index}
              data-role-card
              className="sticky flex flex-col justify-between overflow-clip max-[767px]:!h-[74vh] max-[767px]:!justify-start max-[767px]:!p-[6vw]"
              style={{
                top: "1.39vw",
                height: "90vh",
                padding: "4.44vw",
                borderRadius: "1.67vw",
                backgroundColor: card.bg,
                color: card.fg,
                transformOrigin: "50% 0",
                transform: "perspective(2000px)",
              }}
            >
              {/* Top: Titel + Index (Mobile order-1) */}
              <div className="relative flex items-center justify-between max-[767px]:!order-1" style={{ zIndex: 3, gap: "2vw" }}>
                <h3 className="uppercase max-[767px]:!text-[8vw]" style={{ ...H1, color: card.fg }}>
                  {card.title}
                </h3>
                <h3 className="max-[767px]:!text-[8vw]" style={{ ...H1, color: card.soft }}>
                  {card.index}
                </h3>
              </div>

              {/* Claim + Text (Mobile order-3, unter dem Bild) */}
              <div
                className="relative flex flex-col items-start max-[767px]:!order-3 max-[767px]:!mt-[5vw] max-[767px]:!max-w-full max-[767px]:!gap-[3vw]"
                style={{ zIndex: 3, maxWidth: "39.17vw", gap: "1.11vw" }}
              >
                <h4
                  className="m-0 max-[767px]:!text-[6vw]"
                  style={{ fontFamily: SHARP, fontSize: "2.5vw", lineHeight: "115%", fontWeight: 500, letterSpacing: "-0.104vw", color: card.fg }}
                >
                  {card.claim}
                </h4>
                <p
                  className="m-0 max-[767px]:!text-[4vw]"
                  style={{ fontFamily: SHARP, fontSize: "1.39vw", lineHeight: "140%", color: card.soft }}
                >
                  {card.text}
                </p>
              </div>

              {/* Bildmodul — Desktop: schwebend rechts unten. Mobile: in-flow (order-2),
                  full-width, direkt unter der Headline (Home-ServicesStack-Optik). */}
              <div
                className="absolute overflow-hidden max-[767px]:!static max-[767px]:!order-2 max-[767px]:!mt-[6vw] max-[767px]:!h-[74vw] max-[767px]:!w-full max-[767px]:!max-h-none max-[767px]:!max-w-full max-[767px]:!inset-auto max-[767px]:!transform-none max-[767px]:!rounded-[4vw]"
                style={{
                  zIndex: 3,
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
                <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
