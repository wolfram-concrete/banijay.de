"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Team-→-Video-→-News-Übergang: KEIN Magenta zwischen Team und Video. Der
// full-bleed Video-Container sitzt unter der Team-Section, schiebt sich beim
// Scrollen nach oben, überlagert die komplette Team-Section und fadet auf, bis er
// fullscreen ist (wie der Videocontainer in den Subpage-Heros). Danach wächst aus
// der Mitte das kleine „b" immer größer, bis es als komplette Magenta-Fläche alles
// einfärbt → Übergang in die News. Das „b" wächst scharf über mask-size (SVG).

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
      // A) Video schiebt sich von unten hoch, fadet auf und überlagert die
      //    Team-Section — bis full-bleed (kein Magenta dazwischen).
      tl.fromTo(
        media.current,
        { yPercent: 100, scale: 0.94, opacity: 0.4 },
        { yPercent: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 0.6 },
        0,
      );
      // B) Danach wächst das „b" aus der Mitte scharf über mask-size auf.
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
        // Magenta-Kreis-Blende schließt die b-Binnenlücke synchron zum Wachsen.
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
    // Transparent (kein Magenta) + negativer Margin + zIndex: das aufsteigende
    // Video legt sich sichtbar über die dahinter durchscheinende Team-Section.
    <section ref={root} className="relative" style={{ height: "300vh", marginTop: "-18vh", zIndex: 2 }}>
      <div className="sticky top-0 h-screen w-screen overflow-clip">
        {/* Full-bleed Video-Container (kein Rahmen, kein Magenta-Padding) */}
        <div ref={media} className="absolute inset-0 overflow-clip" style={{ transformOrigin: "50% 100%", willChange: "transform, opacity" }}>
          <video autoPlay muted loop playsInline poster="/brand/team-poster.jpg" className="absolute inset-0 h-full w-full object-cover">
            <source src="/video/team-fullscreen.mp4" type="video/mp4" />
          </video>

          {/* magenta „b" — wächst SCHARF über mask-size */}
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
    </section>
  );
}
