"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Preloader vor dem Hero — soll „Größe" suggerieren, nicht laden:
//   1. Magentafarbener Vollflächen-Background, zentriert ein schwarzes „b".
//   2. Das b lädt sich einmal von unten nach oben voll.
//   3. Danach wird das b zum Cutout in der Magenta-Fläche und zieht als
//      B-förmige Blende auf → gibt die Home darunter frei (harter Cut).
// Danach startet die Hero-Animation (Event „banijay:introdone").

// Modul-Scope: spielt bei jedem echten Full-Load, nicht bei Client-Navigation.
let PLAYED = false;

const ACCENT = "#ff4370";
const SIGN = "url(/brand/banijay-sign.svg)";
const T = 1; // Zeit-Faktor der Preloader-Sequenz (1 = finales Tempo)

function signalDone() {
  if (typeof window === "undefined") return;
  (window as { __introDone?: boolean }).__introDone = true;
  window.dispatchEvent(new Event("banijay:introdone"));
}

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const fillWrap = useRef<HTMLDivElement>(null);
  const fillBar = useRef<HTMLDivElement>(null);
  const knock = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const container = root.current;
      const bar = fillBar.current;
      const kn = knock.current;
      const fw = fillWrap.current;
      if (!container || !bar || !kn || !fw) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (PLAYED || reduce) {
        signalDone();
        setDone(true);
        return;
      }
      PLAYED = true;

      const finish = () => {
        signalDone();
        setDone(true);
      };

      const tl = gsap.timeline({ onComplete: finish });

      // 1. „b" füllt sich von unten nach oben (schwarzer Balken innerhalb der
      //    b-Maske steigt auf).
      tl.fromTo(bar, { height: "0%" }, { height: "100%", duration: 1.15 * T, ease: "power2.inOut" });
      tl.to({}, { duration: 0.18 * T }); // kurz halten

      // 2. Übergang: das volle schwarze b wird zum Cutout-Fenster (gleiche Größe),
      //    dann zieht die B-Blende auf und gibt die Home frei.
      tl.set(fw, { autoAlpha: 0 });
      tl.set(kn, { "--bsize": "150px" });
      tl.to(kn, { "--bsize": "6000px", duration: 0.8 * T, ease: "power3.in" });
    },
    { scope: root },
  );

  if (done) return null;

  const maskProps: React.CSSProperties = {
    WebkitMaskImage: `${SIGN}, linear-gradient(#000, #000)`,
    maskImage: `${SIGN}, linear-gradient(#000, #000)`,
    WebkitMaskPosition: "center, center",
    maskPosition: "center, center",
    WebkitMaskRepeat: "no-repeat, no-repeat",
    maskRepeat: "no-repeat, no-repeat",
    WebkitMaskSize: "var(--bsize) auto, 100% 100%",
    maskSize: "var(--bsize) auto, 100% 100%",
    // full-Fläche MINUS b → Magenta überall außer im b (= transparentes Fenster)
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  };

  return (
    <div ref={root} className="fixed inset-0 overflow-hidden" style={{ zIndex: 9999 }} aria-hidden>
      {/* Knockout-Fläche: Magenta mit b-Loch (Lochgröße = --bsize, start 0 = solid) */}
      <div
        ref={knock}
        className="absolute inset-0"
        style={{ background: ACCENT, ["--bsize" as string]: "0px", ...maskProps }}
      />
      {/* Phase 1: sich füllendes schwarzes b (b-Maske + aufsteigender Balken) */}
      <div
        ref={fillWrap}
        className="absolute left-1/2 top-1/2"
        style={{
          width: "150px",
          height: "150px",
          transform: "translate(-50%, -50%)",
          WebkitMaskImage: SIGN,
          maskImage: SIGN,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      >
        <div ref={fillBar} className="absolute inset-x-0 bottom-0" style={{ height: "0%", background: "#0b0b0b" }} />
      </div>
    </div>
  );
}
