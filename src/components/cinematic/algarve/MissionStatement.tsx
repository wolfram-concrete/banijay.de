"use client";

import { useEffect, useRef, useState } from "react";

// Mission-/Statement-Section (adaptiert nach dem gelieferten IntroText-Template):
// asymmetrisches 3-Spalten-Grid — Label in Spalte 1, riesige Headline über die
// Spalten 2–3. Die Headline enthüllt sich Wort für Wort aus einer Clip-Maske
// (translateY 100% → 0 + fade, gestaffelt). Optionale Copy darunter. Auf Banijay-
// Design gezogen: Paper-Grund, Ink-Typo, Magenta-Label, Sharp-Grotesk (statt Serif).

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const MAGENTA = "#ff4370";

export function AlgarveMissionStatement({
  label,
  headline,
  body,
}: {
  label: string;
  headline: string;
  body?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = headline.split(" ");

  return (
    <section ref={root} style={{ background: "#f8f7f3", paddingTop: "9vw", paddingBottom: "9vw" }}>
      <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
        <div className="grid gap-[1.4vw] md:grid-cols-3 max-[991px]:!grid-cols-1 max-[991px]:!gap-[6vw]">
          {/* Label-Spalte */}
          <div
            className="max-[767px]:!text-[3vw]"
            style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.12vw", textTransform: "uppercase", color: MAGENTA }}
          >
            {label}
          </div>

          {/* Headline (Wort-für-Wort-Reveal) + Copy, über 2 Spalten */}
          <div className="md:col-span-2">
            <h2 className="m-0 flex flex-wrap" style={{ columnGap: "1vw", rowGap: 0 }}>
              {words.map((word, i) => (
                <span
                  key={i}
                  className="overflow-hidden"
                  style={{ display: "inline-block", paddingTop: "0.6vw", paddingBottom: "0.6vw", marginTop: "-0.6vw", marginBottom: "-0.6vw" }}
                >
                  <span
                    className="max-[767px]:!text-[9vw] max-[991px]:!text-[6vw]"
                    style={{
                      display: "inline-block",
                      fontFamily: SHARP,
                      fontSize: "4.6vw",
                      lineHeight: "100%",
                      fontWeight: 500,
                      letterSpacing: "-0.14vw",
                      color: INK,
                      transform: visible ? "translateY(0)" : "translateY(101%)",
                      opacity: visible ? 1 : 0,
                      transition: `transform 700ms cubic-bezier(0.22,1,0.36,1) ${i * 80}ms, opacity 700ms ease-out ${i * 80}ms`,
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            {body && (
              <p
                className="max-[767px]:!text-[4vw]"
                style={{
                  marginTop: "2.5vw",
                  maxWidth: "40vw",
                  fontSize: "1.3vw",
                  lineHeight: "150%",
                  color: "rgba(14,13,11,0.62)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 700ms ease-out ${words.length * 80 + 120}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${words.length * 80 + 120}ms`,
                }}
              >
                {body}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
