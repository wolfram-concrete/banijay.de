"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./DustLayer";

gsap.registerPlugin(useGSAP);

// INTRO-CHOREOGRAFIE (Wolfram 13.07. v2, Home):
//   ① dunkler Purple/Magenta-Grund
//   ② Sternenstaub wächst SUBTIL auf — durch eine B-Maske ergibt er die FORM
//      des Banijay-B (ein B aus Staub, kein hartes Logo)
//   ③ die Headline „Welcome to / a new Era" blendet als Zweizeiler ein und
//      TAUSCHT das B aus (das Staub-B löst sich auf, die Zeilen stehen)
//   ④ dann wachsen die Sterne EXPLOSIONSARTIG und skalieren in die Kamera —
//      eine Blende, die auf den eigentlichen Hero der Home aufreißt
//   ⑤ Finale via Event „banijay:introdone": Header/Menü-B blendet ein
//      (SiteHeader wird über html[data-intro] bis zum Ende verborgen).
// Scroll ist während der ~4s gesperrt (Lenis + overflow). Reduced Motion
// überspringt alles und feuert das Event sofort.

export function IntroOverlay() {
  const root = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const dustB = useRef<HTMLDivElement>(null);
  const dustGrow = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLDivElement>(null);
  const burst = useRef<HTMLDivElement>(null);
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

      // Seite einfrieren, Header verbergen (CSS via data-intro)
      document.documentElement.dataset.intro = "1";
      document.documentElement.style.overflow = "hidden";
      (window as { __lenis?: { stop: () => void } }).__lenis?.stop();
      window.scrollTo(0, 0);

      const lines = headline.current!.querySelectorAll("[data-intro-line]");
      // Startlagen — die B-MASKE steht fix (kein Skalieren des ganzen Elements),
      // NUR das Staubfeld darin wächst aus der Mitte auf und „sammelt" sich im B.
      gsap.set(dustB.current, { xPercent: -50, yPercent: -50, autoAlpha: 1 });
      gsap.set(dustGrow.current, { scale: 0.1, autoAlpha: 0, transformOrigin: "50% 50%" });
      gsap.set(lines, { yPercent: 120, autoAlpha: 0 });
      gsap.set(burst.current, { autoAlpha: 0, scale: 1, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, onComplete: cleanup });
      // ② der Sternenstaub entsteht als winziger Punkt in der Mitte und wächst
      //    größer und größer, bis er die B-Form (Maske) ausfüllt — er sammelt
      //    sich also IM B-Container an (Wolfram 13.07.).
      tl.to(dustGrow.current, { scale: 1.45, autoAlpha: 1, duration: 1.6, ease: "power1.out" }, 0.15)
        // ③ Headline blendet als Zweizeiler ein (Zeilen steigen aus der Maske) …
        .to(lines, { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.14, ease: "power3.out" }, 1.55)
        // … und TAUSCHT das Staub-B aus (löst sich weich auf)
        .to(dustB.current, { autoAlpha: 0, duration: 0.8, ease: "power2.inOut" }, 1.6)
        // ④ EXPLOSION: das Staubfeld reißt auf und skaliert in die Kamera —
        //    Blende auf den Hero. Headline zieht leicht mit in die Tiefe.
        .to(burst.current, { autoAlpha: 1, duration: 0.3, ease: "power1.out" }, 2.75)
        .to(burst.current, { scale: 13, duration: 1.2, ease: "power3.in" }, 2.75)
        .to(lines, { autoAlpha: 0, scale: 1.5, duration: 0.6, ease: "power2.in", transformOrigin: "50% 50%" }, 2.8)
        // Deckgrund blendet aus → der Hero darunter wird sichtbar
        .to(bg.current, { autoAlpha: 0, duration: 0.7, ease: "power1.inOut" }, 3.05)
        // der Burst verglüht auf dem Höhepunkt → sauberer Hero-Reveal
        .to(burst.current, { autoAlpha: 0, duration: 0.45, ease: "power1.out" }, 3.55)
        // ⑤ Finale (Menü-B/Header), Overlay räumt danach auf
        .call(finish, [], 3.5);
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[300] overflow-hidden" aria-hidden>
      {/* ① dunkler Purple/Magenta-Grund (deckt die Seite bis zum Reveal) */}
      <div
        ref={bg}
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 120% at 50% 58%, #3a0e28 0%, #22081a 45%, #14040e 100%)" }}
      />

      {/* ② Staub-B: eine B-Maske über einem dichten Staubfeld → der Staub ERGIBT
          die Form des B (nur innerhalb der B-Silhouette sichtbar). */}
      <div
        ref={dustB}
        className="absolute left-1/2 top-1/2"
        style={{
          width: "46vmin",
          height: "46vmin",
          WebkitMaskImage: "url(/brand/banijay-sign-white.svg)",
          maskImage: "url(/brand/banijay-sign-white.svg)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      >
        {/* wächst aus der Mitte auf (scale 0.1 → 1.45) und sammelt sich im B */}
        <div ref={dustGrow} className="absolute inset-0">
          <DustLayer boost={1.2} center={{ x: 0.5, y: 0.5 }} radius={0.95} />
        </div>
      </div>

      {/* ③ Headline „Welcome to / a new Era" — Zweizeiler, steigt aus Masken auf */}
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

      {/* ④ Explosions-Staubfeld (fullscreen) — skaliert in die Kamera */}
      <div ref={burst} className="absolute inset-0">
        <DustLayer boost={1.05} center={{ x: 0.5, y: 0.5 }} radius={0.72} />
      </div>
    </div>
  );
}
