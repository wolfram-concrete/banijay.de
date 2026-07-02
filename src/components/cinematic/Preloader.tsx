"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ParticleB } from "./ParticleB";

// Preloader vor dem Hero: magentafarbener Grund, auf dem schwarze, unterschiedlich
// große Partikel (+ Mini-Satelliten) das Banijay-„b" zusammensetzen (Stil
// „Particles") und darin weiter leicht schwingen. Danach folgt der Übergang wie
// gehabt: der schwarze b-Bereich wird zur Stanzkontur (Cutout) und der Ausschnitt
// zoomt auf → gibt die Home frei. Solange der Preloader läuft, ist Scrollen
// gesperrt und die Seite startet am Home-Hero (ganz oben).

const ACCENT = "#ff4370";
// Cutout-Maske: das echte b mit ZWEI Einzelkörpern (Steg bleibt offen) — man
// guckt durch beide b-Körper in die Hero-Section. NICHT die Solid-Variante.
const SIGN = "url(/brand/banijay-sign.svg)";

let PLAYED = false;

function signalDone() {
  if (typeof window === "undefined") return;
  (window as { __introDone?: boolean }).__introDone = true;
  window.dispatchEvent(new Event("banijay:introdone"));
}

type Lenis = { stop?: () => void; start?: () => void; scrollTo?: (t: number, o?: Record<string, unknown>) => void };
const getLenis = () => (window as unknown as { __lenis?: Lenis }).__lenis;

function lockScroll() {
  try {
    history.scrollRestoration = "manual";
  } catch {}
  const l = getLenis();
  window.scrollTo(0, 0);
  l?.scrollTo?.(0, { immediate: true });
  l?.stop?.();
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}
function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  const l = getLenis();
  window.scrollTo(0, 0);
  l?.scrollTo?.(0, { immediate: true });
  l?.start?.();
  l?.scrollTo?.(0, { immediate: true });
}

// Maske per setProperty setzen (kebab-case) — React setzt mask-composite nicht
// zuverlässig, wodurch das b-Loch nicht ausgestanzt würde (Default „add").
function applyKnockMask(el: HTMLElement) {
  el.style.setProperty("-webkit-mask-image", `${SIGN}, linear-gradient(#000,#000)`);
  el.style.setProperty("mask-image", `${SIGN}, linear-gradient(#000,#000)`);
  el.style.setProperty("-webkit-mask-position", "center, center");
  el.style.setProperty("mask-position", "center, center");
  el.style.setProperty("-webkit-mask-repeat", "no-repeat, no-repeat");
  el.style.setProperty("mask-repeat", "no-repeat, no-repeat");
  el.style.setProperty("-webkit-mask-size", "var(--bsize) auto, 100% 100%");
  el.style.setProperty("mask-size", "var(--bsize) auto, 100% 100%");
  el.style.setProperty("-webkit-mask-composite", "xor");
  el.style.setProperty("mask-composite", "exclude");
}

export function Preloader() {
  const [skip] = useState(
    () => typeof window !== "undefined" && (PLAYED || window.matchMedia("(prefers-reduced-motion: reduce)").matches),
  );
  const [phase, setPhase] = useState<"particles" | "cutout" | "done">("particles");
  const knock = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skip) {
      signalDone();
      return;
    }
    PLAYED = true;
    lockScroll();
    // Sicherheits-Fallback: falls die Animation (z. B. Hintergrund-Tab, gedrosseltes
    // requestAnimationFrame) hängt, wird der Preloader spätestens nach 10 s beendet
    // und der Scroll freigegeben — nie dauerhaft gesperrt.
    const fb = window.setTimeout(() => {
      signalDone();
      unlockScroll();
      setPhase("done");
    }, 10000);
    return () => {
      window.clearTimeout(fb);
      unlockScroll();
    };
  }, [skip]);

  const onParticlesDone = useCallback(() => setPhase("cutout"), []);

  // Cutout-Zoom: das schwarze b wird zum Loch in der Magenta-Fläche und zieht auf
  // → gibt die Home frei. Über ein Proxy-Objekt getweent, damit die px-Einheit der
  // CSS-Variable --bsize erhalten bleibt (sonst animiert die Maske nicht).
  useEffect(() => {
    if (phase !== "cutout" || !knock.current) return;
    const el = knock.current;
    // Breite des b-Lochs am Start = Größe des Canvas-b (nahtloser Übergang).
    const bStart = Math.min(window.innerWidth, window.innerHeight) * 0.224 * 0.977;
    el.style.setProperty("--bsize", `${bStart}px`);
    applyKnockMask(el);
    const state = { s: bStart };
    const tw = gsap.to(state, {
      s: 7200,
      duration: 1.0,
      ease: "power2.in",
      onUpdate: () => el.style.setProperty("--bsize", `${state.s}px`),
      onComplete: () => {
        // Hero-Typo-Animation startet ERST jetzt — nachdem das b-Loch komplett
        // aufgezoomt hat und der Hero voll sichtbar ist (nicht schon während des
        // Zooms hinter dem Overlay).
        signalDone();
        unlockScroll();
        setPhase("done");
      },
    });
    return () => {
      tw.kill();
    };
  }, [phase]);

  if (skip || phase === "done") return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      aria-hidden
      // Während der Cutout-Phase transparent, damit man durch das b-Loch den
      // dahinterliegenden Hero sieht (nicht die schwarze Preloader-Fläche).
      style={{ zIndex: 9999, background: phase === "cutout" ? "transparent" : "#0e0d0b" }}
    >
      {/* Hintergrundvideo während der Partikel-Phase (dunkel, Banijay-Pink). */}
      {phase === "particles" && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 0 }}
          src="/video/preloader-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}
      {/* Partikel-Canvas MUSS über dem Video liegen — sonst überdeckt das absolut
          positionierte Video die (statisch gemalten) Partikel. */}
      {phase === "particles" && (
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          <ParticleB onComplete={onParticlesDone} />
        </div>
      )}
      {/* Cutout-/Blenden-Phase: Magenta-Fläche mit b-Loch (Übergang zum Hero). */}
      {phase === "cutout" && (
        <div ref={knock} className="absolute inset-0" style={{ background: ACCENT }} />
      )}
    </div>
  );
}
