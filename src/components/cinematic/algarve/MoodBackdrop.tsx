"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./DustLayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// MOOD-BACKDROP (Task #69, überarbeitet 10.07. nach Wolfram-Feedback):
// Jede Seite trägt DENSELBEN Modi-Background (dark / moody magenta / brombeere),
// aber mit SPÜRBARER Varianz — drei bewegte Größen statt fixer Schichten:
//   ① Basis-Farbton: wandert mit dem Scroll durch ein sattes Spektrum
//      (Schwarz → Brombeere → Magenta-dunkel → Indigo → …)
//   ② HAUPT-GLOW (Magenta): die Lichtquelle KLEBT NICHT mehr oben rechts —
//      sie wandert mit dem Scroll die rechte Seite hinab ins Bild und wieder
//      hinaus, ändert Größe + Intensität (transform, GPU-billig)
//   ③ GEGEN-GLOW (Brombeere, unten links): zieht in GEGENPHASE auf — wenn der
//      Haupt-Glow schwach ist, antwortet die andere Ecke → räumliches Pendeln
// Dazu eine abgeschwächte Diagonal-Blende (0.55 statt 0.8) und ein träges
// „Atmen" beider Glows über die Zeit (auch ohne Scroll lebt die Fläche).

// Endet bewusst NICHT auf Schwarz: das Seitenende (News/Social/Footer) bleibt
// im mutigen Brombeer-Bereich statt abzusaufen (Wolfram, 10.07.).
const SPECTRUM = ["#0a0208", "#38102b", "#2e0b20", "#1a0f55", "#3a0e28", "#33102a"];
const SHADE = "linear-gradient(263deg, rgba(30,0,24,0) 44%, rgba(0,0,0,0.55) 100%)";
const GLOW_MAIN =
  "radial-gradient(closest-side, rgba(255,67,112,0.55) 0%, rgba(199,50,90,0.4) 30%, rgba(143,34,68,0.24) 55%, rgba(86,17,46,0.1) 78%, rgba(30,0,24,0) 100%)";
const GLOW_COUNTER =
  "radial-gradient(closest-side, rgba(120,22,64,0.5) 0%, rgba(86,17,46,0.32) 45%, rgba(46,11,32,0.14) 72%, rgba(30,0,24,0) 100%)";

export function MoodBackdrop() {
  const root = useRef<HTMLDivElement>(null);
  const hue = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const hueEl = hue.current;
      const glowEl = glow.current;
      const counterEl = counter.current;
      if (!hueEl || !glowEl || !counterEl) return;

      const lerp = gsap.utils.interpolate(SPECTRUM);
      const apply = (p: number) => {
        const t = Math.min(1, Math.max(0, p));
        hueEl.style.backgroundColor = lerp(t);
        // ② Haupt-Glow wandert: von oben rechts (t=0) die rechte Seite hinab bis
        // ~40% Bildhöhe (t=0.5) und zurück; dabei pulst Größe + Intensität.
        // Sockel 0.3: der Glow zieht sich am Seitenende nie ganz zurück —
        // unten bleibt spürbar Licht im Bild.
        const wave = 0.3 + 0.7 * Math.sin(t * Math.PI);
        const x = 32 - wave * 26; // vw: +32 (halb draußen) → +6 (im Bild)
        const y = -30 + wave * 52; // vh: -30 (Ecke) → +22 (rechte Flanke)
        const s = 1 + wave * 0.45;
        glowEl.style.transform = `translate(${x}vw, ${y}vh) scale(${s})`;
        glowEl.style.opacity = String(0.75 + wave * 0.25);
        // ③ Gegen-Glow in Gegenphase unten links
        const cwave = Math.sin(t * Math.PI * 2 + Math.PI * 0.5) * 0.5 + 0.5;
        counterEl.style.transform = `translate(${-26 + cwave * 14}vw, ${26 - cwave * 18}vh) scale(${0.8 + cwave * 0.5})`;
        counterEl.style.opacity = String(0.25 + cwave * 0.55);
      };
      apply(0);
      ScrollTrigger.create({
        start: 0,
        end: () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight),
        scrub: 0.6,
        onUpdate: (self) => apply(self.progress),
      });

      // Träges Atmen: lebt als CSS-Animation auf den INNEREN Flächen (.mood-breathe
      // in globals.css) — NICHT mehr als GSAP-Tween auf denselben Elementen, deren
      // transform der Scroll-Handler schreibt. Zwei Schreiber auf einer Eigenschaft
      // ließen den Glow oben rechts beim Scrollen flackern (Wolfram 13.07.).
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -10 }}>
      {/* ① variabler Basis-Farbton */}
      <div ref={hue} className="absolute inset-0" style={{ backgroundColor: SPECTRUM[0] }} />
      {/* ② wandernder Magenta-Haupt-Glow (Kreis, 120vmax, GPU-Transform).
          Außen: Scroll-Position (exklusiver transform-Writer). Innen: Atmen (CSS). */}
      <div
        ref={glow}
        className="absolute"
        style={{
          width: "120vmax",
          height: "120vmax",
          right: "-60vmax",
          top: "-60vmax",
          willChange: "transform, opacity",
        }}
      >
        <div className="mood-breathe h-full w-full" style={{ background: GLOW_MAIN }} />
      </div>
      {/* ③ Gegen-Glow Brombeere (unten links, Gegenphase; Atmen phasenversetzt) */}
      <div
        ref={counter}
        className="absolute"
        style={{
          width: "95vmax",
          height: "95vmax",
          left: "-48vmax",
          bottom: "-48vmax",
          willChange: "transform, opacity",
        }}
      >
        <div className="mood-breathe h-full w-full" style={{ background: GLOW_COUNTER, animationDelay: "-4.5s" }} />
      </div>
      {/* Globaler Sternenstaub (Wolfram 14.07.): ambient über ALLEN Seiten — so
          hat jede Seite überall den moody Staub-Background, nicht nur im Hero.
          Ganzflächig, dezent, mit weichem Rand nach oben/unten. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.6,
          maskImage: "linear-gradient(180deg, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        <DustLayer boost={0.7} center={{ x: 0.68, y: 0.3 }} radius={1.3} />
      </div>
      {/* konstante, abgeschwächte Diagonal-Blende */}
      <div className="absolute inset-0" style={{ background: SHADE }} />
    </div>
  );
}
