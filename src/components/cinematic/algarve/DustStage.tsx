"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./DustLayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// STERNENSTAUB-BÜHNE der Exchange-Strecke (Wolfram 13.07.):
// EIN Staubfeld, das sticky am Viewport klebt und ALLE Phasen trägt —
// Statement → Ökosystem-Aufbau → Headline-Swap. Dramaturgie:
//   ① das Statement erscheint zuerst (Staub unsichtbar)
//   ② DANN wächst der Staub hinter dem Statement auf (scale + fade,
//      gescrubbt) und BLEIBT an Ort und Stelle stehen
//   ③ Ökosystem und Headline spielen davor; der Staub steht ruhig
//   ④ mit dem Ende der Strecke scrollt er (weich maskiert) hinaus,
//      darunter kommt die Companies-Liste
// Muss DIREKTES Kind des Strecken-Wrappers sein (trigger = parentElement).

export function DustStage() {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(inner.current, { autoAlpha: 0.8 });
        gsap.set(veil.current, { autoAlpha: 0 });
        return;
      }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current!.parentElement,
          start: "top top",
          // ≈ Scroll-Strecke der Statement-Section (275vh − 100vh Viewport):
          // das Wachstum lebt komplett in der Statement-Phase.
          end: "+=175%",
          scrub: 0.6,
        },
      });
      // ⓪ MAGENTA-VEIL (13.07., Farbfächer-Ausklang): das Statement startet
      //    auf gefüllter Magenta-Fläche (Fortsetzung des letzten Fächer-Layers
      //    aus dem Hero) — und löst sich per Scroll auf …
      tl.to(veil.current, { autoAlpha: 0, duration: 0.34, ease: "power1.inOut" }, 0.14)
        // ① … dahinter kommt der Moody-Background zum Vorschein und
        // ② der zentrale Sternstaub wächst auf
        .fromTo(
          inner.current,
          { scale: 0.5, autoAlpha: 0 },
          { scale: 1, autoAlpha: 0.8, duration: 0.5, ease: "power2.out" },
          0.22,
        )
        .to({}, { duration: 0.3 }); // ③ und bleibt stehen
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="sticky top-0 h-screen overflow-clip">
        {/* Magenta-Fläche (Statement-Start) — RADIALER Gradient, symmetrisch zum
            Radius der Satelliten-Ringe (Wolfram 13.07.): der Übergang moody →
            magenta folgt derselben nach unten geöffneten Kurve wie die Ringe
            (Zentrum weit oben mittig), damit die Kante weich und bogenförmig ist
            statt hart-horizontal. */}
        <div
          ref={veil}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(140% 150% at 50% -60%, rgba(255,67,112,0) 52%, rgba(255,67,112,0.55) 66%, #ff4370 80%)",
          }}
        />
        {/* Heller Staub (moody-Phase, nach dem Ausblenden des Veils) */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <div ref={inner} className="h-full w-full" style={{ opacity: 0, willChange: "transform, opacity" }}>
            <DustLayer boost={0.9} center={{ x: 0.5, y: 0.55 }} radius={0.7} />
          </div>
        </div>
      </div>
    </div>
  );
}
