"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AlgarveFounders } from "./Founders";
import { AlgarveFoundersSnap } from "./FoundersSnap";
import { AlgarveFoundersEditorial } from "./FoundersEditorial";
import { AlgarveFoundersClean } from "./FoundersClean";
import { AlgarveFoundersMosaik } from "./FoundersMosaik";

gsap.registerPlugin(ScrollTrigger);

// TEAM-SWITCHER (Wolfram 22.07.) — hält die Team-Section-Variante und blendet einen kleinen
// Umschalt-Widget ein, SOBALD die Team-Section im Viewport ist (IntersectionObserver → sonst
// schwebt der Pill auf der ganzen Seite). Beim Wechsel wird ScrollTrigger neu vermessen, weil
// sich die Section-Höhe ändert.
//   • Raster   = klassisches Vollraster (gepinnt)
//   • Snap     = ein Viewport, gleich große Kacheln, rastet ein (Pin)
//   • Editorial = variables Feinraster, Marcus/Knut/Michael die größten Container

type Variant = "raster" | "snap" | "editorial" | "clean" | "mosaik";
const VARIANTS: { key: Variant; label: string }[] = [
  { key: "raster", label: "Raster" },
  { key: "snap", label: "Snap" },
  { key: "editorial", label: "Editorial" },
  { key: "clean", label: "Clean" },
  { key: "mosaik", label: "Masonry" },
];

export function AlgarveTeamSwitcher() {
  const [variant, setVariant] = useState<Variant>("raster");
  const [inView, setInView] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  // Widget nur zeigen, wenn die Team-Section sichtbar ist.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.02 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Nach Varianten-Wechsel: Pins/Trigger neu berechnen UND zur Team-Section springen —
  // sonst rutscht die (nun andere) Section-Höhe die Scrollposition weg (z. B. ins Video
  // darunter). Beim ERSTEN Mount NICHT scrollen.
  const firstRun = useRef(true);
  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      if (!firstRun.current && wrap.current) {
        const top = wrap.current.getBoundingClientRect().top + window.scrollY;
        const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
        if (lenis) lenis.scrollTo(top, { immediate: true });
        else window.scrollTo(0, top);
      }
      firstRun.current = false;
    }, 90);
    return () => clearTimeout(t);
  }, [variant]);

  return (
    <div ref={wrap} className="relative">
      {variant === "raster" ? (
        <AlgarveFounders />
      ) : variant === "snap" ? (
        <AlgarveFoundersSnap />
      ) : variant === "editorial" ? (
        <AlgarveFoundersEditorial />
      ) : variant === "clean" ? (
        <AlgarveFoundersClean />
      ) : (
        <AlgarveFoundersMosaik />
      )}

      {/* Umschalt-Widget — fixiert unten mittig, nur sichtbar in der Team-Section. */}
      <div
        className="fixed bottom-[3vh] left-1/2 z-[80] -translate-x-1/2 transition-all duration-300"
        style={{ opacity: inView ? 1 : 0, transform: inView ? "translate(-50%, 0)" : "translate(-50%, 20px)", pointerEvents: inView ? "auto" : "none" }}
      >
        <div
          className="flex items-center gap-1 rounded-full p-1"
          style={{ background: "rgba(14,13,11,0.55)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(248,247,243,0.18)" }}
        >
          <span className="px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[rgba(248,247,243,0.5)] max-[767px]:hidden">Team-Layout</span>
          {VARIANTS.map(({ key, label }) => {
            const active = variant === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setVariant(key)}
                className="rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-sharp), sans-serif",
                  background: active ? "#ff4370" : "transparent",
                  color: active ? "#f8f7f3" : "rgba(248,247,243,0.7)",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
