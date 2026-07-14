"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { PreloaderParticles, type PreloaderParticlesHandle } from "./PreloaderParticles";

gsap.registerPlugin(useGSAP);

// INTRO-CHOREOGRAFIE (Wolfram 14.07., Home):
//   ① dunkler Purple/Magenta-Grund
//   ② scharfe Sternenstaub-Partikel wandern aus der Mitte in die B-FORM und
//      werden dichter (echtes Partikelsystem, nicht mehr skalierte Bitmap)
//   ③ die Headline „Welcome to / a new Era" blendet als Zweizeiler ein
//   ④ die B-Partikel schießen als WARP-Tunnel (Streaks) auf die Kamera zu —
//      eine Blende, die auf den Home-Hero aufreißt
//   ⑤ Finale via Event „banijay:introdone".
// Scroll ist während der ~4s gesperrt. Reduced Motion überspringt alles.

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
        delete document.documentElement.dataset.intro;
        document.documentElement.style.overflow = "";
        (window as { __lenis?: { start: () => void } }).__lenis?.start();
        setDone(true);
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finish();
        cleanup();
        return;
      }

      document.documentElement.dataset.intro = "1";
      document.documentElement.style.overflow = "hidden";
      (window as { __lenis?: { stop: () => void } }).__lenis?.stop();
      window.scrollTo(0, 0);

      // Background-Visual (Eclipse) zoomt ganz leicht → wirkt lebendig
      gsap.fromTo(bgImg.current, { scale: 1.03 }, { scale: 1.14, duration: 6, ease: "none" });

      const lines = headline.current!.querySelectorAll("[data-intro-line]");
      gsap.set(lines, { yPercent: 120, autoAlpha: 0 });
      const fp = { v: 0 };
      const wp = { v: 0 };

      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: cleanup });
      // ② FORM: Partikel wandern aus der Mitte in die B-Form (werden dichter/klarer)
      tl.to(fp, { v: 1, duration: 1.6, ease: "power2.out", onUpdate: () => particles.current?.setForm(fp.v) }, 0.1)
        // ③ Headline blendet als Zweizeiler ein
        .to(lines, { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.14, ease: "power3.out" }, 1.6)
        // Lese-Beat
        .to({}, { duration: 0.5 })
        // ④ WARP: die B-Partikel schießen als Streaks auf die Kamera zu
        .to(wp, { v: 1, duration: 1.35, ease: "power2.in", onUpdate: () => particles.current?.setWarp(wp.v) }, 2.75)
        // Headline zieht leicht mit in die Tiefe und blendet aus
        .to(lines, { autoAlpha: 0, scale: 1.5, duration: 0.6, ease: "power2.in", transformOrigin: "50% 50%" }, 2.85)
        // Deckgrund blendet aus → Hero-Reveal
        .to(bg.current, { autoAlpha: 0, duration: 0.7, ease: "power1.inOut" }, 3.15)
        // Finale (Menü-B/Header), Overlay räumt danach auf
        .call(finish, [], 3.55);
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
