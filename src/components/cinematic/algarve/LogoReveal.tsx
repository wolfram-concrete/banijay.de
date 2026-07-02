"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Team-→-Video-→-News-Übergang — gleiche Choreografie-Logik wie die Magenta-Fläche
// über dem Home-Statement: Die Section (marginTop -100vh, z-2) steigt als volle
// Video-Fläche über die (gepinnte, fertig aufgebaute) Team-Section auf — von unten
// nach oben, getragen vom Scroll der Section selbst — und rastet oben ein. ERST DANN
// wächst aus der MITTE ein kleines „b" immer größer, bis es als komplette Magenta-
// Fläche alles einfärbt → Übergang in die News. Das „b" wächst scharf über mask-size.

const ACCENT = "#ff4370";
const SIGN = "url(/brand/banijay-sign.svg)";

export function AlgarveLogoReveal() {
  const root = useRef<HTMLElement>(null);
  const growB = useRef<HTMLDivElement>(null);
  const solid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Nur Desktop: die gepinnte Video-Rise + b-Blende. Mobile zeigt eine ruhige
      // Video-Section (100vh, kein Overlap) und leitet direkt in die Magenta-News.
      if (!window.matchMedia("(min-width: 768px)").matches) return;
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

      // Das „b" ist zunächst unsichtbar — es erscheint erst, wenn das Video oben
      // eingerastet ist (Section-Top = Viewport-Top → Timeline-Start), und wächst
      // dann aus der Mitte scharf über mask-size auf volle Größe.
      const bStart = Math.min(window.innerWidth, window.innerHeight) * 0.12;
      const bEnd = Math.max(window.innerWidth, window.innerHeight) * 6;
      growB.current?.style.setProperty("--bs", `${bStart}px`);
      gsap.set(growB.current, { opacity: 0 });

      const st = { s: bStart };
      // Kurzer Halte-Beat (Video eingerastet), dann das „b" einblenden + aufwachsen.
      tl.set(growB.current, { opacity: 1 }, 0.18);
      tl.to(
        st,
        {
          s: bEnd,
          ease: "power2.in",
          duration: 1,
          onUpdate: () => growB.current?.style.setProperty("--bs", `${st.s}px`),
        },
        0.2,
      )
        // Magenta-Kreis-Blende schließt die b-Binnenlücke synchron zum Wachsen.
        .fromTo(
          solid.current,
          { "--r": "0%" },
          { "--r": "160%", ease: "power2.in", duration: 0.9 },
          0.6,
        );
    },
    { scope: root },
  );

  return (
    // marginTop -100vh + z-2: die Video-Fläche schiebt sich beim Scrollen von unten
    // über die Team-Section (die dahinter gepinnt fertig aufgebaut ist) — analog zur
    // Magenta-Fläche über dem Statement. Hintergrund Ink, falls kurz sichtbar.
    <section ref={root} className="relative overflow-clip max-[767px]:!mt-0 max-[767px]:!h-screen" style={{ height: "260vh", marginTop: "-70vh", zIndex: 2, background: "#0e0d0b" }}>
      <div className="sticky top-0 h-screen w-screen overflow-clip">
        {/* Full-bleed Video-Container (rastet oben ein) */}
        <div className="absolute inset-0 overflow-clip">
          <video autoPlay muted loop playsInline poster="/brand/team-poster.jpg" className="absolute inset-0 h-full w-full object-cover">
            <source src="/video/team-fullscreen.mp4" type="video/mp4" />
          </video>

          {/* magenta „b" — wächst SCHARF aus der Mitte über mask-size */}
          <div
            ref={growB}
            className="absolute inset-0"
            style={{
              background: ACCENT,
              opacity: 0, // Start unsichtbar (Desktop-GSAP blendet ein; Mobile bleibt aus)
              willChange: "mask-size, opacity",
              ["--bs" as string]: "120px",
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
