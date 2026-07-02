"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CAREER } from "@/data/career";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Career-Rollenwelt als Sticky-Card-Stack (Algarve value-features/ServicesStack
// adaptiert): große dunkle Cards mit Career-Foto, Titel + Index oben, Claim +
// Text unten. Die Cards schrumpfen leicht, während die nächste sie überlagert.

const SHARP = "var(--font-sharp), sans-serif";
const H1 = {
  fontFamily: SHARP,
  fontSize: "5vw",
  lineHeight: "108%",
  fontWeight: 500,
  letterSpacing: "-0.139vw",
  margin: 0,
} as const;

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
            className="m-0 uppercase max-[767px]:!text-[8vw]"
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

        {/* Stack */}
        <div className="flex flex-col" style={{ gap: "2.22vw", color: "#f8f7f3" }}>
          {CAREER.roles.map((card) => (
            <div
              key={card.index}
              data-role-card
              className="sticky flex flex-col justify-between overflow-clip max-[767px]:!h-auto max-[767px]:!p-[8vw]"
              style={{
                top: "1.39vw",
                height: "84vh",
                padding: "4.44vw",
                borderRadius: "1.67vw",
                transformOrigin: "50% 0",
                transform: "perspective(2000px)",
              }}
            >
              {/* Hintergrundbild VOLL (kein flaches Abdunkeln) — nur dezente
                  Rand-Scrims oben/unten, damit die Magenta-Typo lesbar bleibt. */}
              <div className="absolute inset-0" style={{ zIndex: 1 }}>
                <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 52%, rgba(0,0,0,0.52) 100%)",
                  }}
                />
              </div>

              {/* Top: Titel + Index — Magenta */}
              <div className="relative flex items-start justify-between" style={{ zIndex: 3 }}>
                <h3
                  className="uppercase max-[767px]:!text-[8vw]"
                  style={{ ...H1, color: "#ff4370", textShadow: "0 0.1vw 1.6vw rgba(0,0,0,0.45)" }}
                >
                  {card.title}
                </h3>
                <h3
                  className="max-[767px]:!text-[8vw]"
                  style={{ ...H1, color: "rgba(255,67,112,0.55)", textShadow: "0 0.1vw 1.6vw rgba(0,0,0,0.4)" }}
                >
                  {card.index}
                </h3>
              </div>

              {/* Bottom: Claim (Magenta) + Text (hell, lesbar) */}
              <div
                className="relative flex flex-col items-start max-[767px]:!mt-[10vw]"
                style={{ zIndex: 3, maxWidth: "39vw", gap: "1.11vw" }}
              >
                <h4
                  className="m-0 max-[767px]:!text-[5.5vw]"
                  style={{
                    fontFamily: SHARP,
                    fontSize: "2.5vw",
                    lineHeight: "115%",
                    fontWeight: 500,
                    letterSpacing: "-0.104vw",
                    color: "#ff4370",
                    textShadow: "0 0.1vw 1.4vw rgba(0,0,0,0.5)",
                  }}
                >
                  {card.claim}
                </h4>
                <p
                  className="m-0 max-[767px]:!text-[3.8vw]"
                  style={{ fontSize: "1.39vw", lineHeight: "140%", color: "#f8f7f3", maxWidth: "34vw", textShadow: "0 0.1vw 1vw rgba(0,0,0,0.6)" }}
                >
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
