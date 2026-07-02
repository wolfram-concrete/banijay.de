"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// section_animated-heading (Algarve 1:1, reusable): 100vh-Panel, drei uppercase
// Zeilen (7vw) konvergieren beim Scrollen — obere von oben, untere von unten,
// mittlere skaliert von 1.2 → 1. Exakte IX2-Keys: is-first y -15vh→0,
// is-last y 15vh→0, is-middle scale 1.2→1, scrub .8, start "top bottom"
// end "bottom 90%".

const LINE = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "7vw",
  lineHeight: "110%",
  fontWeight: 500,
  textAlign: "center",
  textTransform: "uppercase",
  margin: 0,
} as const;

export function AlgarveAnimatedHeading({ lines }: { lines: [string, string, string] }) {
  const root = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLHeadingElement>(null);
  const middle = useRef<HTMLHeadingElement>(null);
  const last = useRef<HTMLHeadingElement>(null);

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
    },
    { scope: root },
  );

  return (
    <section ref={root} style={{ background: "#f8f7f3" }}>
      <div
        className="flex items-center justify-center overflow-clip"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div className="flex flex-col max-[767px]:!px-[4vw]">
          <h2 ref={first} className="text-black overflow-hidden max-[767px]:!text-[13vw] max-[767px]:!leading-[108%]" style={LINE}>
            {lines[0]}
          </h2>
          <h2 ref={middle} className="text-black overflow-hidden max-[767px]:!text-[13vw] max-[767px]:!leading-[108%]" style={LINE}>
            {lines[1]}
          </h2>
          <h2 ref={last} className="text-black overflow-hidden max-[767px]:!text-[13vw] max-[767px]:!leading-[108%]" style={LINE}>
            {lines[2]}
          </h2>
        </div>
      </div>
    </section>
  );
}
