"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CAREER } from "@/data/career";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Code-of-Conduct-Statement — 1:1 das Home-Statement-Template (section_about-intro):
// 100vh-Sticky-Panel, zentriertes Statement (H4-Proportion), das sich beim Scrollen
// Wort für Wort enthüllt (opacity 0→1 + Anheben, scrub). Akzentwort magenta. Darunter
// der Banijay-CTA (Outline-Pill), der nach dem Statement einfadet.

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";
const MAGENTA = "#ff4370";
const ACCENT_WORD = "kreative";

const H4 = {
  fontFamily: SHARP,
  fontSize: "2.5vw",
  lineHeight: "125%",
  fontWeight: 500,
  letterSpacing: "-0.104vw",
} as const;

export function AlgarveCodeOfConductBand({ background }: { background?: React.ReactNode } = {}) {
  const root = useRef<HTMLDivElement>(null);
  const words = CAREER.codeOfConduct.text.split(" ");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const wordEls = gsap.utils.toArray<HTMLElement>("[data-coc-word]");
      gsap.set(wordEls, { willChange: "transform, opacity", backfaceVisibility: "hidden" });
      // Wort-für-Wort-Reveal in der ERSTEN Hälfte der Sektion (wie Home-AboutIntro).
      gsap.from(wordEls, {
        opacity: 0,
        yPercent: 30,
        ease: "none",
        stagger: { amount: 1, from: "start" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=60%", scrub: 1 },
      });
      // CTA fadet ein, nachdem das Statement steht.
      gsap.fromTo(
        "[data-coc-cta]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top top-=52%", end: "top top-=66%", scrub: 1 },
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="max-[767px]:!h-[150vh]"
      style={{ background: "transparent", height: "220vh", position: "relative", overflow: "clip" }}
    >
      <div className="flex items-center justify-center overflow-clip" style={{ width: "100vw", height: "100vh", position: "sticky", top: 0 }}>
        {/* Optionaler Hintergrund-Layer (Career: driftende Bewegtbild-Collage) */}
        {background}
        <div className="relative z-10 flex flex-col items-center" style={{ padding: "2vw" }}>
          <p
            className="m-0 mx-auto flex flex-wrap justify-center text-center text-[#f8f7f3] max-[991px]:!max-w-[80vw] max-[767px]:!max-w-[92vw] max-[767px]:!text-[6.4vw] max-[767px]:!leading-[126%]"
            style={{ ...H4, maxWidth: "55.28vw", columnGap: "0.6vw", rowGap: 0 }}
          >
            {words.map((word, i) => {
              const clean = word.replace(/[.,]/g, "");
              const isAccent = clean === ACCENT_WORD;
              return (
                <span key={i} data-coc-word className="inline-block" style={{ color: isAccent ? MAGENTA : PAPER }}>
                  {word}
                </span>
              );
            })}
          </p>

          <a
            data-coc-cta
            href={CAREER.codeOfConduct.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-[6px] text-[#f8f7f3] no-underline transition-colors duration-300 hover:bg-[#f8f7f3] hover:text-[#0a0208] max-[767px]:!mt-[6vw] max-[767px]:!px-[6vw] max-[767px]:!py-[3vw] max-[767px]:!text-[3.6vw]"
            style={{ marginTop: "2.4vw", border: "1px solid #f8f7f3", padding: "0.83vw 1.67vw", fontFamily: SHARP, fontSize: "1.05vw", fontWeight: 500 }}
          >
            {CAREER.codeOfConduct.cta.text}
            <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.6vw] max-[767px]:!w-[3.6vw]" />
          </a>
        </div>
      </div>
    </section>
  );
}
