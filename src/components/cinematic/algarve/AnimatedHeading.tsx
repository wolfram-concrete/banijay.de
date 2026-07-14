"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./DustLayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// section_animated-heading (Algarve 1:1, reusable): 100vh-Panel, drei uppercase
// Zeilen (7vw) konvergieren beim Scrollen — obere von oben, untere von unten,
// mittlere skaliert von 1.2 → 1. Exakte IX2-Keys: is-first y -15vh→0,
// is-last y 15vh→0, is-middle scale 1.2→1, scrub .8, start "top bottom"
// end "bottom 90%".

const LINE = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "7vw",
  lineHeight: "132%",
  fontWeight: 500,
  textAlign: "center",
  textTransform: "uppercase",
  margin: 0,
  // Auf schmalen Screens lange Wörter (z. B. HANDSCHRIFTEN) mit Bindestrich
  // umbrechen statt über den Rand laufen zu lassen (deutsche Trennung via lang="de").
  hyphens: "auto",
  WebkitHyphens: "auto",
  overflowWrap: "break-word",
} as const;

export function AlgarveAnimatedHeading({
  lines,
  dark = false,
}: {
  lines: [string, string, string];
  /** V2-Mood (Task #69): transparent auf dem MoodBackdrop, Typo in Paper. */
  dark?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLHeadingElement>(null);
  const middle = useRef<HTMLHeadingElement>(null);
  const last = useRef<HTMLHeadingElement>(null);
  const dust = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const vh = window.innerHeight;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom 90%",
          scrub: 0.8,
        },
      });
      tl.from(first.current, { y: -0.15 * vh, ease: "none", duration: 1 }, 0)
        .from(last.current, { y: 0.15 * vh, ease: "none", duration: 1 }, 0)
        .from(middle.current, { scale: 1.2, ease: "none", duration: 0.51 }, 0.49);
      // Zentraler Sternstaub wächst WÄHREND der Schrift-Konvergenz auf (13.07.)
      if (dust.current) {
        tl.fromTo(
          dust.current,
          { autoAlpha: 0, scale: 0.55, transformOrigin: "50% 50%" },
          { autoAlpha: 0.75, scale: 1, ease: "power2.out", duration: 0.8 },
          0.1,
        );
      }
    },
    { scope: root },
  );

  const lineColor = dark ? "text-[#f8f7f3]" : "text-black";

  return (
    <section ref={root} className="relative" style={{ background: dark ? "transparent" : "#f8f7f3" }}>
      {/* Zentraler Sternstaub hinter der Schrift (nur dark; wächst mit dem Scrub) */}
      {dark && (
        <div
          ref={dust}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            maskImage: "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
          }}
        >
          <DustLayer boost={0.85} center={{ x: 0.5, y: 0.5 }} radius={0.65} />
        </div>
      )}
      <div
        className="relative flex items-center justify-center overflow-clip"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div className="flex flex-col max-[767px]:!px-[4vw]">
          <h2 ref={first} className={`${lineColor} overflow-hidden max-[767px]:!text-[13vw] max-[767px]:!leading-[108%]`} style={LINE}>
            {lines[0]}
          </h2>
          <h2 ref={middle} className={`${lineColor} overflow-hidden max-[767px]:!text-[13vw] max-[767px]:!leading-[108%]`} style={LINE}>
            {lines[1]}
          </h2>
          <h2 ref={last} className={`${lineColor} overflow-hidden max-[767px]:!text-[13vw] max-[767px]:!leading-[108%]`} style={LINE}>
            {lines[2]}
          </h2>
        </div>
      </div>
    </section>
  );
}
