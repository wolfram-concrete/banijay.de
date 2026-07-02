"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CAREER } from "@/data/career";

// Code-of-Conduct-Statement (text-section-1): großer, linksbündiger Statement-Text
// mit einem Magenta-Akzentwort, der sich Wort für Wort aus einer Clip-Maske
// enthüllt; darunter der Standard-Banijay-CTA (Outline-Pill + Pfeil, Hover-Invert).

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const MAGENTA = "#ff4370";
const ACCENT_WORD = "kreative";

export function AlgarveCodeOfConductBand() {
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: reduce ? 0 : 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = CAREER.codeOfConduct.text.split(" ");
  const tail = words.length * 60 + 150;

  return (
    <section ref={root} style={{ background: "#f8f7f3", paddingTop: "9vw", paddingBottom: "9vw" }}>
      <div className="mx-auto max-[767px]:!px-[4vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1200px" }}>
        <div className="flex flex-col items-start" style={{ gap: "2.8vw", maxWidth: "62vw" }}>
          {/* Statement — Wort für Wort aus der Clip-Maske, Akzentwort magenta */}
          <p className="m-0 flex flex-wrap max-[991px]:!max-w-full" style={{ columnGap: "0.7vw", rowGap: 0, maxWidth: "56vw" }}>
            {words.map((word, i) => {
              const clean = word.replace(/[.,]/g, "");
              const isAccent = clean === ACCENT_WORD;
              return (
                <span
                  key={i}
                  className="overflow-hidden"
                  style={{ display: "inline-block", paddingTop: "0.5vw", paddingBottom: "0.5vw", marginTop: "-0.5vw", marginBottom: "-0.5vw" }}
                >
                  <span
                    className="max-[767px]:!text-[7vw]"
                    style={{
                      display: "inline-block",
                      fontFamily: SHARP,
                      fontSize: "3.6vw",
                      lineHeight: "120%",
                      fontWeight: 500,
                      letterSpacing: "-0.08vw",
                      color: isAccent ? MAGENTA : INK,
                      transform: visible ? "translateY(0)" : "translateY(105%)",
                      opacity: visible ? 1 : 0,
                      transition: `transform 700ms cubic-bezier(0.22,1,0.36,1) ${i * 60}ms, opacity 700ms ease-out ${i * 60}ms`,
                    }}
                  >
                    {word}
                  </span>
                </span>
              );
            })}
          </p>

          {/* Standard-Banijay-CTA: Outline-Pill + Pfeil, Hover invertiert auf Ink */}
          <a
            href={CAREER.codeOfConduct.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full text-[#0e0d0b] no-underline transition-colors duration-300 hover:bg-[#0e0d0b] hover:text-[#f8f7f3] max-[767px]:!text-[3.6vw]"
            style={{
              border: "1px solid #0e0d0b",
              padding: "0.83vw 1.67vw",
              fontFamily: SHARP,
              fontSize: "1.05vw",
              fontWeight: 500,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 700ms ease-out ${tail}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${tail}ms`,
            }}
          >
            {CAREER.codeOfConduct.cta.text}
            <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.6vw] max-[767px]:!w-[3.6vw]" />
          </a>
        </div>
      </div>
    </section>
  );
}
