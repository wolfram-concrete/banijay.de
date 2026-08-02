"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERSHIP } from "@/data/leadership";
import { focus } from "./teamFocus";
import { TeamIntro } from "./TeamIntro";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHARP = "var(--font-sharp), sans-serif";

// TEAM-VARIANTE „SNAP" (Wolfram 22.07., finale Fassung) — kein Ein-Viewport-Snap mehr:
// Reihen 3 / 5 / 4 (oben Marcus, Knut, Michael Laegel; Mitte inkl. Michael Gaul), man scrollt durch die drei Reihen,
// und ERST UNTERHALB der dritten Reihe rastet die Section ein (Pin „bottom bottom") und gibt
// dann die LogoReveal-Videoblende frei. Karten kantig, ohne Kontur, wachsen mit.

const ROW1 = LEADERSHIP.slice(0, 3); // Marcus, Knut, Michael Laegel
const ROW2 = LEADERSHIP.slice(3, 8); // fünf (Simone, Heike, Natali, Janine, Michael Gaul)
const ROW3 = LEADERSHIP.slice(8, 12); // vier (Elena, Sebastian, Matthaeus, Aylin)

// Milchglas-Namenskarte — OHNE weiße Kontur, wächst mit (kein whitespace-nowrap auf Rolle).
export function GlassCard({ name, role }: { name: string; role: string }) {
  return (
    <div
      className="pointer-events-none absolute bottom-[0.7vw] left-[0.7vw] z-[2] flex flex-col max-[767px]:bottom-[2.5vw] max-[767px]:left-[2.5vw]"
      style={{
        gap: "0.1em",
        padding: "0.5em 1.05em 0.6em",
        maxWidth: "calc(100% - 1.4vw)",
        background: "rgba(14,13,11,0.4)",
        backdropFilter: "blur(16px) saturate(1.1)",
        WebkitBackdropFilter: "blur(16px) saturate(1.1)",
        color: "#f8f7f3",
      }}
    >
      <span style={{ fontFamily: SHARP, fontWeight: 500, lineHeight: 1.08, letterSpacing: "-0.01em" }} className="text-[0.95rem] md:text-[1vw] max-[767px]:!text-[3.4vw]">
        {name}
      </span>
      {role ? (
        <span style={{ color: "rgba(248,247,243,0.72)", lineHeight: 1.16 }} className="text-[0.68rem] md:text-[0.72vw] max-[767px]:!text-[2.5vw]">
          {role}
        </span>
      ) : null}
    </div>
  );
}

// Wiederverwendbare Team-Kachel (auch von der Editorial-Variante genutzt).
export function TeamTile({ img, name, role }: { img: string; name: string; role: string }) {
  return (
    <div data-mo-tile className="relative h-full w-full overflow-hidden">
      <img src={img} alt={name} className="h-full w-full object-cover" style={{ filter: "grayscale(1)", objectPosition: focus(img) }} />
      <GlassCard name={name} role={role} />
    </div>
  );
}

export function AlgarveFoundersSnap() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const mgrid = useRef<HTMLDivElement>(null); // mobiles Raster (eigenes Pin-Target)

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // MOBILE ADRESSLEISTE (Wolfram 24.07.): Auf echten Handys blendet die Adressleiste beim
      // Scrollen aus → der Viewport wächst, ScrollTrigger refresht mitten im Scroll und verschiebt
      // den Pin → das Team-Raster schneidet Aylins Bild an (im Preview ohne Adressleiste korrekt).
      // ignoreMobileResize hält die Pin-Messung stabil → der Stop bleibt unter Aylins Container.
      // Global (idempotent) → gilt auch für die übrigen mobilen Pins (Slider, LogoReveal).
      ScrollTrigger.config({ ignoreMobileResize: true });

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const activeGrid = isMobile ? mgrid.current : grid.current;
      const tiles = activeGrid ? gsap.utils.toArray<HTMLElement>(activeGrid.querySelectorAll("[data-mo-tile]")) : [];

      // Mobile: Die Portraits bleiben ohne eigenen Reveal dauerhaft sichtbar. Bei schnellem
      // Touch-/Lenis-Scroll konnte ScrollTrigger.batch mehrere noch unsichtbare Kacheln
      // überspringen; statt der unteren Team-Reihen erschien dann nur der dunkle Hintergrund.
      // Die eigentliche Mobile-Choreografie übernimmt der Pin unter Aylin + die Video-Blende.
      // Desktop behält den gestaffelten Kachel-Reveal unverändert.
      if (isMobile) {
        gsap.set(tiles, { autoAlpha: 1, scale: 1 });
      } else {
        gsap.set(tiles, { autoAlpha: 0, scale: 1.03 });
        ScrollTrigger.batch(tiles, {
          start: "top 98%",
          once: true,
          onEnter: (b) => gsap.to(b, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power2.out", stagger: 0.04 }),
        });
      }

      // EINRASTEN ERST UNTERHALB DER LETZTEN REIHE (Wolfram 22.07.): Das Raster ist höher als ein
      // Viewport — man scrollt durch die Reihen, und sobald die Unterkante (Aylins Bild-Unterkante)
      // den Viewport-Boden erreicht, wird gepinnt (start „bottom bottom"). Reiner Halt, dann steigt
      // die LogoReveal-Blende von unten auf und das Magenta-„b" wächst.
      // Mobile (Wolfram 24.07., WIEDER EINGEBAUT): dieselbe Choreografie jetzt AUCH mobil — gepinnt
      // wird das mobile Raster (mgrid). anticipatePin: 1 (wie Desktop) — verhindert den Rücksprung
      // am Pin-Start: bei Lenis-Touch-Momentum gleitet der Scroll sonst über den Trigger („bottom
      // bottom" = Aylins Bild-Unterkante am Viewport-Boden) hinaus und wird dann zurückgesnappt
      // („springt zum unteren Bildschirmrand", Wolfram 24.07.). anticipatePin pinnt einen Tick
      // früher → sauberer Stopp genau an der Unterkante, ohne Sprung.
      if (activeGrid) {
        ScrollTrigger.create({
          trigger: activeGrid,
          start: "bottom bottom",
          end: isMobile ? "+=160%" : "+=190%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative w-full overflow-clip" style={{ background: "transparent" }}>
      {/* ── INTRO „UNSER TEAM" — exakt wie „ABOUT BANIJAY" formatiert/animiert. ─────────── */}
      <TeamIntro />

      {/* ── Desktop: Reihen 3 / 5 / 4, keine Stege. Oben die Leader (höher/größer). Untere
             Reihe gleich hoch wie die mittlere (48vh, Wolfram 22.07.), damit unten nichts
             angeschnitten wirkt. ──────────────────────────────────────────────────────── */}
      <div ref={grid} className="flex w-full flex-col max-[767px]:hidden" style={{ gap: 0 }}>
        <div className="flex w-full" style={{ gap: 0, height: "64vh" }}>
          {ROW1.map((p) => (
            <div key={p.img} style={{ flex: "1 1 0", minWidth: 0 }}>
              <TeamTile img={p.img} name={p.name} role={p.role} />
            </div>
          ))}
        </div>
        <div className="flex w-full" style={{ gap: 0, height: "48vh" }}>
          {ROW2.map((p) => (
            <div key={p.img} style={{ flex: "1 1 0", minWidth: 0 }}>
              <TeamTile img={p.img} name={p.name} role={p.role} />
            </div>
          ))}
        </div>
        <div className="flex w-full" style={{ gap: 0, height: "48vh" }}>
          {ROW3.map((p) => (
            <div key={p.img} style={{ flex: "1 1 0", minWidth: 0 }}>
              <TeamTile img={p.img} name={p.name} role={p.role} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: Die drei Geschäftsführer stehen jeweils vollbreit. Danach läuft das
             Team zweispaltig weiter. Aylin bleibt in der letzten Reihe bewusst einspaltig;
             die zweite Zelle ist blickdicht, damit die Video-Section nicht vor dem Pin durch
             das ungerade Raster scheint. Ihr Container folgt dem 2:3-Quellformat, sodass das
             Portrait vollständig endet, bevor der Video-Übergang beginnt. ─── */}
      <div ref={mgrid} className="hidden w-full max-[767px]:grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: 0 }}>
        {LEADERSHIP.map((p, i) => (
          <div
            key={p.img}
            style={
              i < 3
                ? { gridColumn: "1 / -1", aspectRatio: "8 / 7" } // GF: volle Breite, Höhe +40% (Wolfram 24.07., war 16/10)
                : i === LEADERSHIP.length - 1
                  ? { aspectRatio: "902 / 1353" } // Aylin: eine Spalte, unbeschnitten im exakten Bildformat
                : { aspectRatio: "4 / 5" } // restliches Team: zweispaltig, hochformat
            }
          >
            <TeamTile img={p.img} name={p.name} role={p.role} />
          </div>
        ))}
        <div aria-hidden="true" style={{ background: "#f0f0ee" }} />
      </div>
    </section>
  );
}
