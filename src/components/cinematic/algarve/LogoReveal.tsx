"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Bild-zu-Logo-Section: Full-Size-Bild in einem radialen (abgerundeten) Kasten.
// Beim Scrollen wächst aus der Bildmitte ein kleines magenta „b" immer weiter,
// bis es als komplette Magenta-Fläche alles einfärbt → Übergang in die News.
// Das „b" wächst per transform:scale (GPU-günstig, kein Neu-Rastern der Maske).

const ACCENT = "#ff4370";
const SIGN = "url(/brand/banijay-sign.svg)";

export function AlgarveLogoReveal() {
  const root = useRef<HTMLElement>(null);
  const growB = useRef<HTMLDivElement>(null);
  const solid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      // Das „b" wächst beschleunigend aus der Mitte …
      tl.fromTo(growB.current, { scale: 0.35 }, { scale: 62, ease: "power2.in", duration: 1 }, 0)
        // … und eine Magenta-Kreis-Blende skaliert ab der Mitte auf und SCHLIESST
        //    die b-Binnenlücke (die sonst durchgehend das Bild zeigt) → am Ende
        //    ist alles Magenta, der Zwischenstreifen verschwindet.
        .fromTo(
          solid.current,
          { "--r": "0%" },
          { "--r": "100%", ease: "power1.inOut", duration: 0.72 },
          0.28,
        );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative" style={{ height: "260vh", background: ACCENT }}>
      <div className="sticky top-0 h-screen w-screen overflow-clip">
        <div className="h-full w-full" style={{ padding: "2vw" }}>
          {/* Radialer (abgerundeter) Kasten mit dem Full-Size-Bild */}
          <div className="relative h-full w-full overflow-clip" style={{ borderRadius: "1.67vw" }}>
            <img src="/brand/stage-portrait.png" alt="" className="absolute inset-0 h-full w-full object-cover" />

            {/* magenta „b" — wächst per scale aus der Bildmitte */}
            <div
              ref={growB}
              className="absolute"
              style={{
                inset: 0,
                margin: "auto",
                width: "160px",
                height: "164px",
                background: ACCENT,
                transformOrigin: "50% 50%",
                willChange: "transform",
                WebkitMaskImage: SIGN,
                maskImage: SIGN,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />

            {/* Magenta-Kreis-Blende (schließt ab der Mitte die b-Binnenlücke) */}
            <div
              ref={solid}
              className="absolute inset-0"
              style={{
                background: ACCENT,
                ["--r" as string]: "0%",
                clipPath: "circle(var(--r) at 50% 50%)",
                WebkitClipPath: "circle(var(--r) at 50% 50%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
