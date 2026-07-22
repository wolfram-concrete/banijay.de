"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./DustLayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHARP = "var(--font-sharp), sans-serif";

// Team-Intro „UNSER TEAM" (Wolfram 22.07.) — EXAKT formatiert und animiert wie die
// „ABOUT BANIJAY"-Headline (Editorial `animHead`): 7vw, uppercase, line-height 112 %,
// letter-spacing -0.02em; die beiden Zeilen konvergieren GESCRUBBT (obere von oben,
// untere von unten), dahinter blendet der zentrale Sternenstaub gescrubbt auf und
// skaliert aus 0.55. Von Raster/Snap/Editorial genutzt (data-mo-intro bleibt als Marke).
export function TeamIntro() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const vh = window.innerHeight;
      const hFirst = root.current?.querySelector<HTMLElement>("[data-ti-first]");
      const hLast = root.current?.querySelector<HTMLElement>("[data-ti-last]");
      const hDust = root.current?.querySelector<HTMLElement>("[data-ti-dust]");
      if (!hFirst || !hLast) return;
      const htl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom 90%", scrub: 0.8 },
      });
      htl
        .from(hFirst, { y: -0.15 * vh, ease: "none", duration: 1 }, 0)
        .from(hLast, { y: 0.15 * vh, ease: "none", duration: 1 }, 0);
      if (hDust) {
        htl.fromTo(
          hDust,
          { autoAlpha: 0, scale: 0.55, transformOrigin: "50% 50%" },
          { autoAlpha: 0.7, scale: 1, ease: "power2.out", duration: 0.8 },
          0.1,
        );
      }
    },
    { scope: root },
  );

  return (
    <div ref={root} data-mo-intro className="relative flex w-full items-center justify-center overflow-clip max-[767px]:!h-[min(46vh,440px)] max-[767px]:!min-h-0" style={{ height: "78vh", minHeight: "520px" }}>
      {/* zentraler Sternenstaub hinter der Headline (wächst mit dem Scrub) — wie About */}
      <div
        data-ti-dust
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          maskImage: "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
        }}
      >
        <DustLayer boost={0.85} center={{ x: 0.5, y: 0.5 }} radius={0.6} />
      </div>
      <h2
        className="relative z-[1] m-0 text-center text-[#f8f7f3] max-[767px]:!text-[13vw]"
        style={{ fontFamily: SHARP, fontSize: "7vw", lineHeight: "112%", fontWeight: 500, textTransform: "uppercase", letterSpacing: "-0.02em" }}
      >
        {/* kein per-Zeilen-overflow-hidden — der Translate wird vom overflow-clip gefasst (wie About) */}
        <span data-ti-first className="block">Unser</span>
        <span data-ti-last className="block">Team</span>
      </h2>
    </div>
  );
}
