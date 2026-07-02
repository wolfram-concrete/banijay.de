"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Team-→-Video-Übergang: Unter der Team-Section (Founders) sitzt ein Fullscreen-
// Video-Container. Beim Scrollen schiebt er sich langsam von unten HOCH über die
// Team-Section und skaliert dabei auf Full-Size auf. Kein Magenta, keine „b"-
// Maske — nur das Video, das die Team-Section überlagert.

export function AlgarveLogoReveal() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Der Video-Container startet unterhalb des Viewports (yPercent 100) und
      // fährt langsam nach oben, während er von leicht verkleinert auf 1 skaliert
      // und seine gerundeten Kanten auf 0 „auffaltet" → am Ende Full-Screen.
      gsap.fromTo(
        media.current,
        { yPercent: 100, scale: 0.92, borderRadius: "2.5vw" },
        {
          yPercent: 0,
          scale: 1,
          borderRadius: "0vw",
          ease: "power2.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    // Transparent + negativer Margin + zIndex: das aufsteigende Video legt sich
    // sichtbar über die (dahinter durchscheinende) Team-Section.
    <section ref={root} className="relative" style={{ height: "220vh", marginTop: "-18vh", zIndex: 2 }}>
      <div className="sticky top-0 h-screen w-screen overflow-clip">
        <div
          ref={media}
          className="absolute inset-0 overflow-clip"
          style={{ transformOrigin: "50% 100%", willChange: "transform" }}
        >
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
        </div>
      </div>
    </section>
  );
}
