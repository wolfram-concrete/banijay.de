"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./DustLayer";

gsap.registerPlugin(useGSAP);

// INTRO-CHOREOGRAFIE (Wolfram 13.07., Home):
//   ① dunkler Purple/Magenta-Grund
//   ② Sternenstaub ENTSTEHT zentral aus der Mitte (wächst auf)
//   ③ das weiße B baut sich zentral auf
//   ④ dahinter erscheint der Videocontent fullsize (Deckgrund blendet aus)
//   ⑤ das B ZOOMT groß auf — sein Körper „öffnet" sich, übrig bleibt der
//      Brennglas-Rahmen des Heros (die WebGL-Linse liegt bereits darunter)
//   ⑥ Finale via Event „banijay:introdone": die H1 skaliert fett auf
//      (AlgarveHome) und oben rechts erscheint das magenta B als Menü-Element
//      (SiteHeader wird über html[data-intro] bis zum Ende verborgen).
// Scroll ist während der ~3.4s gesperrt (Lenis + overflow). Reduced Motion
// überspringt alles und feuert das Event sofort.

export function IntroOverlay() {
  const root = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const dust = useRef<HTMLDivElement>(null);
  const sign = useRef<HTMLImageElement>(null);
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

      gsap.set(dust.current, { scale: 0.25, autoAlpha: 0, transformOrigin: "50% 50%" });
      // Zentrierung via GSAP (xPercent/yPercent) — KEINE Tailwind-translate-Klassen,
      // sonst überschreibt der Scale-Tween die Zentrierung.
      gsap.set(sign.current, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.55 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: cleanup,
      });
      // ② Staub entsteht zentral und wächst
      tl.to(dust.current, { scale: 1, autoAlpha: 0.9, duration: 1.25, ease: "power2.out" }, 0.15)
        // ③ das weiße B baut sich zentral auf
        .to(sign.current, { autoAlpha: 1, scale: 1, duration: 0.85, ease: "power3.out" }, 0.85)
        // ④ Video-Reveal: der Deckgrund blendet aus, dahinter läuft der Hero
        .to(bg.current, { autoAlpha: 0, duration: 0.9, ease: "power1.inOut" }, 1.9)
        .to(dust.current, { autoAlpha: 0, duration: 0.7 }, 2.05)
        // ⑤ B-Zoom: der Körper öffnet sich über den Screen — die obere Schale
        //    wächst Richtung Brennglas-Rahmen, dann Übergabe an die echte Linse
        .to(sign.current, { scale: 30, duration: 1.15, ease: "power3.in", transformOrigin: "50% 42%" }, 2.15)
        .to(sign.current, { autoAlpha: 0, duration: 0.4, ease: "power1.out" }, 2.85)
        // ⑥ Finale auslösen (H1-Aufskalierung + Menü-B), Overlay räumt danach auf
        .call(finish, [], 3.0);
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[300]" aria-hidden>
      {/* ① dunkler Purple/Magenta-Grund (deckt die Seite bis zum Reveal) */}
      <div
        ref={bg}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 58%, #3a0e28 0%, #22081a 45%, #14040e 100%)",
        }}
      />
      {/* ② Sternenstaub zentral */}
      <div ref={dust} className="absolute inset-0">
        <DustLayer boost={1} center={{ x: 0.5, y: 0.5 }} radius={0.6} />
      </div>
      {/* ③ das weiße B */}
      <img
        ref={sign}
        src="/brand/banijay-sign-white.svg"
        alt=""
        draggable={false}
        className="absolute left-1/2 top-1/2 h-auto w-[15vmin] min-w-[72px] opacity-0"
      />
    </div>
  );
}
