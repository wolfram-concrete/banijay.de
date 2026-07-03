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

      // Das „b" wächst (mask-size, Proportionen bleiben durch `auto`) UND verschiebt
      // sich dabei nach oben (mask-position-Y 50% → 118%): der dünne horizontale
      // Binnenspalt zwischen den beiden b-Balken wandert so aus dem Viewport, der
      // untere Balken deckt die Fläche voll — KEIN Kreis-Füller mehr nötig, und die
      // Logo-Proportionen bleiben unverändert (nur Position/Größe animieren).
      growB.current?.style.setProperty("--bp", "50%");
      const st = { s: bStart, p: 50 };
      tl.set(growB.current, { opacity: 1 }, 0.18);
      tl.to(
        st,
        {
          s: bEnd,
          p: 118,
          ease: "power2.in",
          duration: 1,
          onUpdate: () => {
            growB.current?.style.setProperty("--bs", `${st.s}px`);
            growB.current?.style.setProperty("--bp", `${st.p}%`);
          },
        },
        0.2,
      );
    },
    { scope: root },
  );

  return (
    // marginTop -100vh + z-2: die Video-Fläche schiebt sich beim Scrollen von unten
    // über die (gepinnt still stehende) Team-Section. Der Overlap entspricht der
    // vollen Deck-Distanz (100vh) → das Video deckt KOMPLETT, WÄHREND das Team noch
    // gepinnt ist; erst wenn voll gedeckt, löst der Team-Pin (Team unsichtbar
    // dahinter, wandert also nie sichtbar mit). BG Ink.
    <section ref={root} className="relative overflow-clip max-[767px]:!mt-0 max-[767px]:!h-screen" style={{ height: "260vh", marginTop: "-100vh", zIndex: 2, background: "#0e0d0b" }}>
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
              ["--bp" as string]: "50%",
              WebkitMaskImage: SIGN,
              maskImage: SIGN,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "50% var(--bp)",
              maskPosition: "50% var(--bp)",
              WebkitMaskSize: "var(--bs) auto",
              maskSize: "var(--bs) auto",
            }}
          />
        </div>
      </div>
    </section>
  );
}
