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
          end: "+=175%",
          scrub: 0.6,
          // First-Load-Cut (Wolfram 23.07.): Positionen bei jedem Refresh neu messen —
          // sonst sitzt der Veil beim ersten Laden vor Layout-Settle falsch und man sieht
          // kurz den Sternenstaub durch.
          invalidateOnRefresh: true,
        },
      });
      // ⓪ MAGENTA-VEIL (radialer Glow direkt im Veil, hinter der Schrift — kein
      //    separates Element, verankert im Sticky). Hält, dann Übergang zum Ökosystem.
      // Wolfram 23.07.: Magenta MUSS LÄNGER hinter der Statement-Section bleiben — der
      //    Veil hielt bisher nur bis 0.5 und blendete dann aus (Staub schien zu früh
      //    durch). Halt bis 0.72, weicherer/längerer Crossfade, Staub erst danach.
      tl.to({}, { duration: 0.72 })
        .to(veil.current, { autoAlpha: 0, duration: 0.42, ease: "power1.inOut" }, 0.72)
        .fromTo(
          inner.current,
          { scale: 0.5, autoAlpha: 0 },
          { scale: 1, autoAlpha: 0.8, duration: 0.52, ease: "power2.out" },
          0.8,
        );
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="sticky top-0 h-screen overflow-clip">
        {/* Magenta-Fläche (Statement) — VOLL magenta (Wolfram 13.07.): das
            Statement liegt komplett auf Magenta, kein dunkler oberer Rest. Der
            weiche moody→magenta-Übergang passiert VORHER (radialer Arc am unteren
            Rand der Übergangszone im Hero) und scrollt in diese Fläche hinein. */}
        {/* VOLL Magenta mit einem SUBTILEN radialen Glow direkt IM Veil — der
            hellere Kern sitzt HINTER der Schrift (nicht „von unten"), verankert
            im Sticky (Wolfram 14.07.). Kein separates Element. */}
        <div
          ref={veil}
          className="absolute inset-0"
          style={{ background: "radial-gradient(62% 55% at 50% 44%, #ff5c86 0%, #ff4a76 34%, #ff4370 66%)" }}
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
