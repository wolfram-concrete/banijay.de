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

// ── Farb-Choreografie (wie Company-Cards): Card 0 = Magenta, danach Hue-Sweep ──
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
const N = CAREER.roles.length;
const START_HUE = 340;
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
      const cards = gsap.utils.toArray<HTMLElement>("[data-role-card]");
      // Echtes 3D-Wegkippen (wie auf der Companies-Seite).
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
        {/* Intro */}
        <div className="max-w-[63vw] max-[767px]:!max-w-full" style={{ marginBottom: "3.33vw" }}>
          <h2
            className="m-0 max-[767px]:!text-[8vw]"
            style={{ fontFamily: SHARP, fontSize: "4.44vw", lineHeight: "110%", fontWeight: 500, letterSpacing: "-0.139vw", color: "#0e0d0b" }}
          >
            {CAREER.roleIntro.headline}
          </h2>
          <p
            className="max-[767px]:!text-[4vw]"
            style={{ marginTop: "1.11vw", fontSize: "1.39vw", lineHeight: "140%", color: "rgba(0,0,0,0.64)", maxWidth: "44vw" }}
          >
            {CAREER.roleIntro.text}
          </p>
        </div>

        {/* Stack — bunte Cards mit schwebendem Bildmodul (Company-Cards-Optik) */}
        <div className="flex flex-col" style={{ gap: "2.22vw" }}>
          {ROLES.map((card) => (
            <div
              key={card.index}
              data-role-card
              className="sticky flex flex-col justify-between overflow-clip max-[767px]:!h-auto max-[767px]:!p-[8vw]"
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
              {/* Top: Titel + Index */}
              <div className="relative flex items-start justify-between" style={{ zIndex: 3, gap: "2vw" }}>
                <h3 className="uppercase max-[767px]:!text-[8vw]" style={H1}>
                  {card.title}
                </h3>
                <h3 className="max-[767px]:!text-[8vw]" style={{ ...H1, color: card.soft }}>
                  {card.index}
                </h3>
              </div>

              {/* Bottom: Claim + Text */}
              <div
                className="relative flex flex-col items-start max-[767px]:!mt-[10vw]"
                style={{ zIndex: 3, maxWidth: "42vw", gap: "1.11vw" }}
              >
                <h4
                  className="m-0 max-[767px]:!text-[5.5vw]"
                  style={{ fontFamily: SHARP, fontSize: "2.5vw", lineHeight: "115%", fontWeight: 500, letterSpacing: "-0.104vw" }}
                >
                  {card.claim}
                </h4>
                <p
                  className="m-0 max-[767px]:!text-[3.8vw]"
                  style={{ fontFamily: SHARP, fontSize: "1.39vw", lineHeight: "140%", color: card.soft, maxWidth: "34vw" }}
                >
                  {card.text}
                </p>
              </div>

              {/* Schwebendes Bildmodul (Career-Foto) rechts unten */}
              <div
                className="absolute overflow-clip max-[767px]:!hidden"
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
                <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
