"use client";

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
  const media = useRef<HTMLDivElement>(null);
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
      // A) Das Fullscreen-Video schiebt sich von unten hoch und skaliert auf, legt
      //    sich dabei über die (nach oben wegscrollende) Team-Section.
      tl.fromTo(
        media.current,
        { yPercent: 62, scale: 0.9, borderRadius: "3vw" },
        { yPercent: 0, scale: 1, borderRadius: "1.67vw", ease: "power2.out", duration: 0.6 },
        0,
      );
      // B) ERST wenn das Video-Hochschieben komplett abgeschlossen ist (+ ein
      //    Halte-Beat, in dem das Fullscreen-Video ruhig steht), wächst das „b" aus
      //    der Mitte — SCHARF über mask-size (SVG re-rastert, kein Verpixeln).
      const bStart = Math.min(window.innerWidth, window.innerHeight) * 0.2;
      const bEnd = Math.max(window.innerWidth, window.innerHeight) * 6;
      growB.current?.style.setProperty("--bs", `${bStart}px`);
      const st = { s: bStart };
      tl.to(
        st,
        {
          s: bEnd,
          ease: "power2.in",
          duration: 1,
          onUpdate: () => growB.current?.style.setProperty("--bs", `${st.s}px`),
        },
        0.95,
      )
        // … die Magenta-Kreis-Blende schließt die b-Binnenlücke (den Steg) synchron
        //    zum Wachsen — kein stehender Video-Streifen zwischen den Körpern.
        .fromTo(
          solid.current,
          { "--r": "0%" },
          { "--r": "160%", ease: "power2.in", duration: 0.9 },
          1.3,
        );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative" style={{ height: "300vh", background: ACCENT, marginTop: "-18vh", zIndex: 2 }}>
      <div className="sticky top-0 h-screen w-screen overflow-clip">
        <div className="h-full w-full" style={{ padding: "2vw" }}>
          {/* Radialer (abgerundeter) Kasten mit dem Fullscreen-Video */}
          <div ref={media} className="relative h-full w-full overflow-clip" style={{ borderRadius: "1.67vw", transformOrigin: "50% 100%", willChange: "transform" }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/brand/team-poster.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/video/team-fullscreen.mp4" type="video/mp4" />
            </video>

            {/* magenta „b" — wächst SCHARF über mask-size (2 Körper bleiben knackig) */}
            <div
              ref={growB}
              className="absolute inset-0"
              style={{
                background: ACCENT,
                willChange: "mask-size",
                ["--bs" as string]: "180px",
                WebkitMaskImage: SIGN,
                maskImage: SIGN,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "var(--bs) auto",
                maskSize: "var(--bs) auto",
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
