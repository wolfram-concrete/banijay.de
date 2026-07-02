"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HOME } from "@/data/home";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// section_about-intro (Algarve 1:1): 220vh-Scroll-Sektion mit 100vh-Sticky-Panel.
// Zentriertes Statement (h4, max 7 Spalten), das sich Wort für Wort enthüllt.
// Echte Timeline t-5d1221df: SplitText nach Wörtern (ohne Maske), pro Wort
// x 1000%→0 (fliegt von rechts rein) + opacity 0→100% + y 20px→0, Stagger
// amount 1 from start, scrub .8. Inhalt: HOME.world.text.

const H4 = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "2.5vw",
  lineHeight: "125%",
  fontWeight: 500,
  letterSpacing: "-0.104vw",
} as const;

export function AlgarveAboutIntro({ text }: { text?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const words = (text ?? HOME.world.text).split(" ");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const wordEls = gsap.utils.toArray<HTMLElement>("[data-word]");
      // Stabilen GPU-Layer erzwingen → kein Subpixel-Flimmern beim Scrub (Lenis).
      gsap.set(wordEls, { willChange: "transform, opacity", backfaceVisibility: "hidden" });
      // Ruhiger, gerichteter Aufbau in Leserichtung: Wörter enthüllen sich in
      // DOM-Reihenfolge (from: "start" = oben-links → unten-rechts), nur Opacity
      // + leichtes Anheben. Kein Partikel-/Puzzle-Effekt.
      gsap.from(wordEls, {
        opacity: 0,
        yPercent: 30,
        ease: "none",
        stagger: { amount: 1, from: "start" },
        scrollTrigger: {
          // Startet erst, wenn das Statement mittig gepinnt ist, und läuft über
          // ~90vh → deutlich langsamer/deliberater.
          trigger: root.current,
          start: "top top",
          end: "+=90%",
          scrub: 1,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      style={{
        background: "#f8f7f3",
        height: "220vh",
        paddingTop: "5.56vw",
        paddingBottom: "5.56vw",
        position: "relative",
        overflow: "clip",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{ width: "100vw", height: "100vh", position: "sticky", top: 0 }}
      >
        <div style={{ padding: "2vw" }}>
          <p
            className="m-0 mx-auto text-center text-black max-[991px]:!max-w-[80vw]"
            style={{ ...H4, maxWidth: "55.28vw" }}
          >
            {words.map((w, i) => (
              <span key={i}>
                <span data-word className="inline-block">
                  {w}
                </span>{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
