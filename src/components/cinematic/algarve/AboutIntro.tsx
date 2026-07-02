"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HOME } from "@/data/home";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// section_about-intro (Algarve 1:1): 220vh-Scroll-Sektion mit 100vh-Sticky-Panel.
// Zentriertes Statement (h4), das sich Wort für Wort enthüllt. Optional
// (magentaExit): nachdem das Statement steht, layert im selben Sticky-Panel eine
// gerundete Magenta-Fläche von unten über das (stehende) Statement — rechts stark
// gerundet als „b"-Körper-Andeutung — und faltet dann auf Full-Size auf. Danach
// übergibt sie nahtlos an die Companies-Section (gleiches Magenta).

const H4 = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "2.5vw",
  lineHeight: "125%",
  fontWeight: 500,
  letterSpacing: "-0.104vw",
} as const;

const ACCENT = "#ff4370";

export function AlgarveAboutIntro({ text, magentaExit = false }: { text?: string; magentaExit?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const words = (text ?? HOME.world.text).split(" ");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const wordEls = gsap.utils.toArray<HTMLElement>("[data-word]");
      gsap.set(wordEls, { willChange: "transform, opacity", backfaceVisibility: "hidden" });
      // Wort-für-Wort-Reveal in der ERSTEN Hälfte der Sektion.
      gsap.from(wordEls, {
        opacity: 0,
        yPercent: 30,
        ease: "none",
        stagger: { amount: 1, from: "start" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=90%", scrub: 1 },
      });

      // magentaExit: gerundete Magenta-Fläche steigt über das stehende Statement
      // und faltet dann auf Full-Size auf. Die Section ist dafür höher (320vh) →
      // das Sticky-Panel bleibt bis ~progress 0.69 gepinnt; Rise+Unfold liegen
      // sauber INNERHALB dieses Pin-Fensters (Timeline-Total = 1 → 1:1-Mapping).
      const ov = overlay.current;
      if (magentaExit && ov) {
        gsap.set(ov, { yPercent: 100, borderTopLeftRadius: "12vw", borderTopRightRadius: "42vw" });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true },
        });
        // 1) Aufsteigen über das (stehende) Statement.
        tl.to(ov, { yPercent: 0, ease: "power2.out", duration: 0.15 }, 0.4);
        // 2) Radiale Ober-Ecken (b-Körper) falten auf → volle Magenta-Fläche.
        tl.to(ov, { borderTopLeftRadius: "0vw", borderTopRightRadius: "0vw", ease: "power2.inOut", duration: 0.12 }, 0.55);
        // Halte-Beat bis Timeline-Ende (hält 1:1-Scroll-Mapping).
        tl.to(ov, { yPercent: 0, duration: 0.32 }, 0.68);
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      style={{
        background: "#f8f7f3",
        height: magentaExit ? "320vh" : "220vh",
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

        {/* Gerundete Magenta-Blende (nur magentaExit) — layert über das Statement */}
        {magentaExit && (
          <div
            ref={overlay}
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ zIndex: 5, background: ACCENT, willChange: "transform" }}
          />
        )}
      </div>
    </section>
  );
}
