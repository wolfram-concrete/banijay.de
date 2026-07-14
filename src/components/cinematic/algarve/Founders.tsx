"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERSHIP } from "@/data/leadership";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Team (Algarve section_spiral-team, adaptiert): großer Schriftzug „TEAM" als
// eigenständige Headline OBEN, darunter die Portraits. Die Cards starten in einem
// verdichteten Initial-State (zur Mitte kollabiert, skaliert, rotiert, leicht
// überlappend) und entfalten sich beim Scrollen per gepinnter, gescrubter
// GSAP-Timeline in ihr sauberes 5-Spalten-Grid. Mobile: einfaches 2-Spalten-Grid.

const TEAM = LEADERSHIP.slice(0, 10); // 10 → sauberes 5×2-Grid im Pin-Viewport

const NAME = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "clamp(0.8rem, 0.95vw, 1.15rem)",
  fontWeight: 500,
  letterSpacing: "-0.01em",
  lineHeight: "118%",
} as const;
const ROLE = { color: "rgba(248,247,243,0.64)", fontSize: "clamp(0.7rem, 0.8vw, 0.95rem)", lineHeight: "122%" } as const;

// Fokuspunkt je Portrait (object-position), damit die Gesichter im Crop nie
// abgeschnitten werden — Portraits mit Kopf weit oben brauchen einen stärkeren
// Top-Bias. Default: leicht nach oben versetzt.
const FOCUS: Record<string, string> = {
  "/people/lead-1.jpg": "50% 22%",
  "/people/lead-2.jpg": "50% 14%",
  "/people/knut-kremling.jpg": "50% 8%",
  "/people/simone-lenzen.jpg": "50% 12%",
  "/people/lead-3.jpg": "50% 12%",
  "/people/lead-4.jpg": "50% 22%",
  "/people/lead-5.jpg": "50% 20%",
  "/people/lead-6.jpg": "50% 26%",
  "/people/lead-7.jpg": "50% 26%",
  "/people/lead-8.jpg": "50% 22%",
  "/people/lead-9.jpg": "50% 22%",
};
const focus = (img: string) => FOCUS[img] ?? "50% 20%";

export function AlgarveFounders() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const mTeam = useRef<HTMLDivElement>(null); // Mobile-Team-Container (für End-Pin)

  useGSAP(
    () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      const tiles = gsap.utils.toArray<HTMLElement>("[data-team-tile]");
      const gridEl = grid.current;
      if (!gridEl || !tiles.length) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Verdichteter Initial-State: jede Card zur Grid-Mitte ziehen (Cluster),
      // verkleinern + rotieren. VOR dem ersten Paint gesetzt (useGSAP =
      // useLayoutEffect) → kein Flash des fertigen Grids.
      const gr = gridEl.getBoundingClientRect();
      const cx = gr.left + gr.width / 2;
      const cy = gr.top + gr.height / 2;
      const mid = (tiles.length - 1) / 2;
      const initial = tiles.map((el, i) => {
        const r = el.getBoundingClientRect();
        return {
          x: (cx - (r.left + r.width / 2)) * 0.86,
          y: (cy - (r.top + r.height / 2)) * 0.86 + 40,
          scale: 0.46,
          rotation: (i - mid) * 4.2,
        };
      });
      tiles.forEach((el, i) => gsap.set(el, { ...initial[i], opacity: reduce ? 1 : 0.82, transformOrigin: "50% 50%" }));

      // Name + Titel starten unsichtbar — sie sollen erst auflayern, wenn die
      // Karten an ihrer finalen Grid-Position eingerastet sind.
      const metas = gsap.utils.toArray<HTMLElement>("[data-team-meta]");
      gsap.set(metas, { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 });

      if (reduce) {
        gsap.set(tiles, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 });
        gsap.set(metas, { opacity: 1, y: 0 });
        return;
      }

      // Entfaltung per gepinnter, gescrubter Timeline in die finalen Grid-Plätze.
      // Danach ein kurzer Halte-Beat: das komplette Team steht, BEVOR der Pin löst
      // (auf der Home steigt danach im LogoReveal das Video darüber; auf About folgt
      // die Partner-Section). KEINE Magenta-Zwischenebene mehr.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          // Lang genug, dass der Pin erst LÖST, wenn das Video (LogoReveal, -100vh)
          // die Bühne komplett gedeckt hat → das Team steht die ganze Zeit still
          // (Namen fertig in der ersten Hälfte, danach langer Halte-Beat, über den
          // das Video von unten voll drüberzieht).
          start: "top top",
          end: "+=210%",
          scrub: true,
          pin: "[data-team-stage]",
          invalidateOnRefresh: true,
        },
      });
      tl.to(tiles, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        ease: "power2.out",
        stagger: 0.04,
        duration: 0.45,
      });
      // Erst NACHDEM alle Karten eingerastet sind, faden Name + Titel gestaffelt ein
      // — bewusst KOMPAKT (kleiner Stagger/kurze Dauer), damit ALLE Namen früh
      // vollständig stehen (bis ~55 % des Pins), lange bevor das Video aufsteigt.
      tl.to(metas, { opacity: 1, y: 0, ease: "power2.out", stagger: 0.02, duration: 0.26 }, 0.48);
      // Langer Halte-Beat: komplett aufgebautes Team + alle Namen stehen still, BEVOR
      // im LogoReveal der Videocontainer von unten darüber aufsteigt.
      tl.to({}, { duration: 0.9 }, 0.9);
    },
    { scope: root },
  );

  // Mobile: das Grid baut sich beim Scrollen Stück für Stück auf — jede Kachel
  // fadet + skaliert gestaffelt herein (kein Pin, ScrollTrigger.batch).
  useGSAP(
    () => {
      if (window.matchMedia("(min-width: 768px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tiles = gsap.utils.toArray<HTMLElement>("[data-team-mtile]");
      if (!tiles.length) return;
      gsap.set(tiles, { autoAlpha: 0, y: 44, scale: 0.93 });
      ScrollTrigger.batch(tiles, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 }),
      });

      // END-PIN: sobald der letzte Team-Screen erreicht ist (Container-Unterkante an
      // Viewport-Unterkante), rastet das Team ein und HÄLT STILL — über diese Strecke
      // schiebt sich die nächste Section (PartnerStack/LogoReveal, marginTop -100vh)
      // von unten voll darüber. Analog zum Desktop-Team-Pin. pinSpacing ergänzt den
      // Scrollweg; die -100vh der Folgesection überlagern die letzten 100vh des Pins.
      if (mTeam.current) {
        ScrollTrigger.create({
          trigger: mTeam.current,
          start: "bottom bottom",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} style={{ background: "transparent" }}>
      {/* ── Desktop: gepinnte Bühne mit TEAM-Headline + entfaltendem Grid ──── */}
      <div data-team-stage className="relative max-[767px]:hidden" style={{ height: "100vh", overflow: "hidden" }}>
        <div className="flex h-full w-full flex-col" style={{ padding: "6vw 2vw 3vw" }}>
          {/* TEAM — MITTELACHSIG (13.07.) + mehr Luft zum Portrait-Aufbau */}
          <h2
            className="m-0 text-center uppercase text-[#f8f7f3]"
            style={{
              fontFamily: "var(--font-sharp), sans-serif",
              fontSize: "7.22vw",
              fontWeight: 500,
              letterSpacing: "-0.139vw",
              lineHeight: 0.95,
              position: "relative",
              zIndex: 3,
              marginBottom: "3.5vw",
            }}
          >
            Team
          </h2>

          {/* Grid (final = sauberes 5-Spalten-Grid; Startlage per GSAP). Die zwei
              Reihen füllen die verfügbare Bühnenhöhe (1fr/1fr) und die Bilder
              füllen ihre Zelle — so läuft das Grid nie über die 100vh-Bühne hinaus
              (sonst würde overflow:hidden auf niedrigen/breiten Viewports die 2.
              Reihe abschneiden). */}
          <div
            ref={grid}
            className="grid w-full min-h-0 flex-1 grid-cols-5"
            style={{ columnGap: "1.2vw", rowGap: "1.6vw", gridTemplateRows: "1fr 1fr", zIndex: 1 }}
          >
            {TEAM.map((p) => (
              <div key={p.name} data-team-tile className="flex min-h-0 flex-col" style={{ gap: "0.6vw", willChange: "transform" }}>
                <div className="min-h-0 flex-1 overflow-clip" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover" style={{ filter: "grayscale(1)", objectPosition: focus(p.img) }} />
                </div>
                <div data-team-meta className="flex flex-col" style={{ gap: "0.1vw", willChange: "transform, opacity" }}>
                  <div className="text-[#f8f7f3]" style={NAME}>
                    {p.name}
                  </div>
                  <div style={ROLE}>{p.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile: 2-Spalten-Grid mit variierenden Kachelgrößen (Algarve
          team-grid-2: eine Kachel spannt volle Breite) → lebendiger Rhythmus
          statt starrer Raster. Die Kacheln bauen sich beim Scrollen Stück für
          Stück auf (gestaffelter Scale/Fade-Reveal, mReveal-useGSAP). */}
      <div ref={mTeam} className="hidden max-[767px]:block" style={{ padding: "16vw 3vw" }}>
        <h2 className="m-0 mb-8 uppercase text-[#f8f7f3]" style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "11vw", fontWeight: 500, letterSpacing: "-0.4vw", lineHeight: 1 }}>
          Team
        </h2>
        <div className="grid grid-cols-2" style={{ columnGap: "3vw", rowGap: "6vw" }}>
          {LEADERSHIP.slice(0, 11).map((p, i) => {
            // Erste Kachel (CEO) als Feature über volle Breite; jede 5. Kachel als
            // Querformat-Feature → die Bildcontainer werden mal größer, mal kleiner.
            const feature = i === 0 || i === 5;
            return (
              <div
                key={p.name}
                data-team-mtile
                className={`flex flex-col gap-3 ${feature ? "col-span-2" : ""}`}
              >
                <div
                  className="overflow-clip"
                  style={{ aspectRatio: feature ? "16 / 10" : "4 / 5", background: "rgba(255,255,255,0.08)" }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    style={{ filter: "grayscale(1)", objectPosition: focus(p.img) }}
                  />
                </div>
                <div>
                  <div className="text-[#f8f7f3]" style={{ fontFamily: "var(--font-sharp), sans-serif", fontWeight: 500, fontSize: feature ? "5vw" : "3.6vw", lineHeight: "120%" }}>
                    {p.name}
                  </div>
                  <div style={{ color: "rgba(248,247,243,0.64)", fontSize: feature ? "3.6vw" : "3vw", lineHeight: "125%" }}>{p.role}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
