"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PreloaderParticles, type PreloaderParticlesHandle } from "./PreloaderParticles";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// INTRO-CHOREOGRAFIE (Wolfram 14.07., überarbeitet):
//   ① dunkler Purple/Magenta-Grund
//   ② DUST: aus dem Nichts fadet driftender, funkelnder Sternenstaub ein
//   ③ ZOOM: das Staubfeld wird sanft herangezogen (Kamera schiebt rein)
//   ④ FORM: der Staub verdichtet sich LANGSAM (mit Drehung/Drift, bleibt lebendig)
//      in die B-Silhouette; parallel die Headline „Welcome to / a new Era"
//   ⑤ WARP: die B-Partikel schießen als Streak-Tunnel auf die Kamera zu — Blende
//      auf den Home-Hero
//   ⑥ Finale via Event „banijay:introdone".
// Scroll ist während der ~5,5 s gesperrt. Reduced Motion überspringt alles.

export function IntroOverlay() {
  const root = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const bgImg = useRef<HTMLImageElement>(null);
  const particles = useRef<PreloaderParticlesHandle>(null);
  const headline = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const finish = () => {
        (window as { __introDone?: boolean }).__introDone = true;
        window.dispatchEvent(new Event("banijay:introdone"));
      };
      const cleanup = () => {
        // Hero-Aufbau ERST JETZT freigeben (Wolfram 15.07.): finish() (→ „banijay:introdone")
        // wandert vom Mid-Timeline-Punkt hierher, sodass die 3-Frame-Aufbau-Animation des
        // Heros erst startet, wenn das Overlay komplett weg ist — keine Veränderung der
        // Hero-Section, solange der Preloader läuft.
        finish();
        delete document.documentElement.dataset.intro;
        document.documentElement.style.overflow = "";
        (window as { __lenis?: { start: () => void } }).__lenis?.start();
        setDone(true);
        // Nach dem Entsperren neu vermessen — der gepinnte Hero (radialer Aufbau)
        // wurde ggf. während der Scroll-Sperre erstellt (Wolfram 14.07.).
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      // PRELOADER LÄUFT BEI JEDEM AUFRUF DER HOME (Wolfram 16.07.) — auch, wenn man per
      // Client-Navigation (z. B. von Career) zurücklinkt. Das dreht die Regel vom
      // 14.07. um, die ihn per sessionStorage („banijay:intro-shown") auf EINMAL PRO
      // BROWSER-SESSION begrenzte: Danach kam er selbst bei einem harten Reload nicht
      // mehr (sessionStorage überlebt Reloads), sondern erst in einem neuen Tab.
      // Der Key wird nicht mehr gelesen und nicht mehr gesetzt.
      // Einzige Ausnahme bleibt prefers-reduced-motion.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Kein Intro → sofort aufräumen (cleanup ruft finish/„introdone" selbst).
        cleanup();
        return;
      }

      document.documentElement.dataset.intro = "1";
      document.documentElement.style.overflow = "hidden";
      (window as { __lenis?: { stop: () => void } }).__lenis?.stop();
      window.scrollTo(0, 0);

      // Background-Visual (Eclipse) zoomt über die ganze Sequenz → wirkt lebendig
      gsap.fromTo(bgImg.current, { scale: 1.02 }, { scale: 1.2, duration: 7.5, ease: "none" });

      const lines = headline.current!.querySelectorAll("[data-intro-line]");
      gsap.set(lines, { yPercent: 120, autoAlpha: 0 });
      const dp = { v: 0 }; // Dust
      const zp = { v: 1 }; // Zoom
      const fp = { v: 0 }; // Form (B)
      const wp = { v: 0 }; // Warp

      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: cleanup });
      // ② DUST: Sternenstaub fadet aus dem Nichts ein (driftet, funkelt)
      tl.to(dp, { v: 1, duration: 2.0, ease: "power2.out", onUpdate: () => particles.current?.setDust(dp.v) }, 0.15)
        // ③ ZOOM: Kamera schiebt sanft ins Staubfeld
        .to(zp, { v: 1.28, duration: 2.6, ease: "power1.inOut", onUpdate: () => particles.current?.setZoom(zp.v) }, 1.7)
        // ④ FORM: Staub verdichtet sich LANGSAM ins B (bleibt lebendig)
        .to(fp, { v: 1, duration: 3.0, ease: "power2.inOut", onUpdate: () => particles.current?.setForm(fp.v) }, 2.2)
        // Headline blendet parallel als Zweizeiler ein
        .to(lines, { yPercent: 0, autoAlpha: 1, duration: 1.0, stagger: 0.16, ease: "power3.out" }, 3.1)
        // Lese-Beat, während das B fertig steht
        .to({}, { duration: 0.5 })
        // ⑤ WARP: die B-Partikel schießen als Streaks auf die Kamera zu
        .to(wp, { v: 1, duration: 1.35, ease: "power2.in", onUpdate: () => particles.current?.setWarp(wp.v) }, 5.7)
        // Zoom zieht im Warp noch etwas nach (nahtloser Sog)
        .to(zp, { v: 1.5, duration: 1.2, ease: "power2.in", onUpdate: () => particles.current?.setZoom(zp.v) }, 5.7)
        // Headline zieht leicht mit in die Tiefe und blendet aus
        .to(lines, { autoAlpha: 0, scale: 1.5, duration: 0.6, ease: "power2.in", transformOrigin: "50% 50%" }, 5.8)
        // Deckgrund blendet aus → Hero-Reveal. Der Hero-Aufbau (finish/„introdone")
        // wird NICHT mehr hier ausgelöst, sondern erst in cleanup (onComplete), wenn das
        // Overlay komplett weg ist (Wolfram 15.07.).
        .to(bg.current, { autoAlpha: 0, duration: 0.7, ease: "power1.inOut" }, 6.15);
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[300] overflow-hidden" aria-hidden>
      {/* ① Background: Eclipse-Visual (leicht zoomend) + moody Magenta-Tint */}
      <div ref={bg} className="absolute inset-0 overflow-hidden" style={{ background: "#14040e" }}>
        <img
          ref={bgImg}
          src="/preloader/eclipse-bg.jpg"
          alt=""
          aria-hidden
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.92, willChange: "transform" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 120% at 50% 58%, rgba(58,14,40,0.42) 0%, rgba(34,8,26,0.55) 45%, rgba(20,4,14,0.82) 100%)" }}
        />
      </div>

      {/* ②/④ Partikelsystem (B-Form → Warp-Tunnel) */}
      <PreloaderParticles ref={particles} />

      {/* ③ Headline „Welcome to / a new Era" */}
      <div ref={headline} className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {["Welcome to", "a new Era"].map((line, i) => (
          <span key={line} className="block overflow-hidden" style={{ paddingBottom: "0.08em" }}>
            <span
              data-intro-line
              className="block uppercase"
              style={{
                fontFamily: "var(--font-sharp), sans-serif",
                fontSize: "clamp(2.6rem, 8vw, 8rem)",
                lineHeight: 1.02,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "#f8f7f3",
              }}
            >
              {i === 1 ? (
                <>
                  a new <span style={{ fontStyle: "italic", color: "#ff4370" }}>Era</span>
                </>
              ) : (
                line
              )}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
