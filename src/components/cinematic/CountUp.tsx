"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Zählt eine Zahl beim Scroll-in hoch. Versteht Werte wie "1.300", "25+",
// "4 Milliarden", "250 Mio. €" — Zahlteil wird animiert, Rest bleibt Suffix.
//
// Trigger über GSAP ScrollTrigger (NICHT IntersectionObserver): der Rest der Seite
// läuft über ScrollTrigger + Lenis-Smoothscroll; ein separater IntersectionObserver
// (framer-motion useInView) feuerte durch die gepinnten Sektionen/den Smooth-Scroll
// zu früh. Jetzt startet der Zähler exakt, wenn die Zahl in den Viewport scrollt.

function parse(value: string): { target: number; suffix: string } {
  const m = value.match(/^([\d.]+)(.*)$/);
  if (!m) return { target: 0, suffix: value };
  return { target: parseInt(m[1].replace(/\./g, ""), 10), suffix: m[2] };
}

export function CountUp({
  value,
  className,
  suffixStyle,
}: {
  value: string;
  className?: string;
  /** Optionales Styling für den Einheiten-Suffix (z. B. kleinere Schrift). */
  suffixStyle?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { target, suffix } = parse(value);
  const [n, setN] = useState(0);
  // Das „+" sitzt in Sharp Grotesk hoch im Glyphenkasten (fast superscript). Wolfram
  // 15.07.: das Plus soll wie die Einheiten (Mrd./hrs.) auf der GRUNDLINIE der Zahl
  // stehen, gleich groß wie die Einheit und gleich weit von der Zahl abgerückt.
  const isPlus = suffix.trim() === "+";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const run = () => {
      if (reduce) {
        setN(target);
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // once: nur beim ersten Eintritt in den Viewport; start = Zahl kommt von unten
    // ~18 % über den unteren Viewport-Rand herein → „ist im Sichtbereich".
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      once: true,
      onEnter: run,
    });

    return () => {
      st.kill();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {n.toLocaleString("de-DE")}
      {suffix &&
        (isPlus ? (
          <span
            style={{
              ...(suffixStyle ?? {}),
              // Wie eine Einheit als NORMALES inline rendern (Kasten deckungsgleich zur
              // Ziffern-Grundlinie — die Aufrufer setzen eine font-size am Wrapper); das
              // minimal höher sitzende +-Glyph per position:relative um seinen reinen
              // Glyph-Offset (0.14em) absenken → Unterkante bündig, wie Mrd./hrs./%.
              position: "relative",
              top: "0.14em",
              whiteSpace: "pre",
            }}
          >
            {" +"}
          </span>
        ) : suffixStyle ? (
          <span style={suffixStyle}>{suffix}</span>
        ) : (
          suffix
        ))}
    </span>
  );
}
