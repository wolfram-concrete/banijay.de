"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
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

// „Ein Dach. Viele Handschriften." — Intro-Headline im Warp-Overlay (Wolfram 14.07.)
const ED_LINE = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "7vw",
  lineHeight: "132%",
  fontWeight: 500,
  textAlign: "center",
  textTransform: "uppercase",
  margin: 0,
  color: "#f8f7f3",
} as const;
const WARP_N = 560; // subtiler Sternenstaub
const easeInQ = (t: number) => t * t;

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
  // Warp-Intro-Overlay (Wolfram 14.07.): „Ein Dach"-Headline + Hyperspace-Warp,
  // der als Blende ausblendet und das Team-Grid AN GLEICHER STELLE freigibt.
  const warpOverlay = useRef<HTMLDivElement>(null);
  const warpCanvas = useRef<HTMLCanvasElement>(null);
  const edHead = useRef<HTMLDivElement>(null);
  const edFirst = useRef<HTMLHeadingElement>(null);
  const edMiddle = useRef<HTMLHeadingElement>(null);
  const edLast = useRef<HTMLHeadingElement>(null);
  const warpProg = useRef(0);

  // WARP-CANVAS: subtiler radialer Sternenstaub → Hyperspace-Streaks → kurzer
  // Flash-Puls (voll ausblendend, KEIN Glow-Rest). Getrieben von warpProg.
  useEffect(() => {
    const canvas = warpCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let W = 0, H = 0, raf = 0;
    const resize = () => {
      W = canvas.width = Math.round(canvas.clientWidth * dpr);
      H = canvas.height = Math.round(canvas.clientHeight * dpr);
    };
    resize();
    type S = { ang: number; rad: number; size: number; mag: boolean };
    const stars: S[] = [];
    for (let i = 0; i < WARP_N; i++) {
      stars.push({ ang: Math.random() * Math.PI * 2, rad: 0.05 + Math.random() * 0.6, size: 0.4 + Math.random() * 1.0, mag: Math.random() < 0.05 });
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const p = Math.max(0, Math.min(1, warpProg.current));
      const cx = W / 2, cy = H / 2;
      const R = Math.min(W, H);
      // Warp startet SPÄT (erst ab p>0.35) und ist die Blende.
      const warp = p < 0.35 ? 0 : Math.min(1, (p - 0.35) / 0.5);
      const ew = easeInQ(warp);
      // Flash als kurzer Puls (Dreieck) — voll aus, kein bleibender Glow.
      const flashRaw = p < 0.6 ? 0 : (p - 0.6) / 0.4; // 0..1
      const flash = Math.max(0, 1 - Math.abs(flashRaw - 0.5) * 2) * (flashRaw > 0 ? 1 : 0);
      const S_MAX = 24;
      for (const s of stars) {
        const dirx = Math.cos(s.ang), diry = Math.sin(s.ang);
        const base = s.rad * R * 0.5;
        if (warp <= 0) {
          // SUBTILER Ruhe-Staub
          const a = 0.34 * (s.mag ? 1.2 : 1);
          if (a <= 0.02) continue;
          ctx.beginPath();
          ctx.arc(cx + dirx * base, cy + diry * base, s.size * dpr, 0, Math.PI * 2);
          ctx.fillStyle = s.mag ? `rgba(255,67,112,${a})` : `rgba(248,247,243,${a})`;
          ctx.fill();
        } else {
          const s1 = 1 + ew * S_MAX;
          const s0 = 1 + Math.max(0, ew - 0.06) * S_MAX;
          const a = Math.max(0, 1 - ew * 0.72);
          if (a <= 0.02) continue;
          ctx.beginPath();
          ctx.moveTo(cx + dirx * base * s0, cy + diry * base * s0);
          ctx.lineTo(cx + dirx * base * s1, cy + diry * base * s1);
          ctx.lineWidth = s.size * dpr * (1 + ew * 3);
          ctx.lineCap = "round";
          ctx.strokeStyle = s.mag ? `rgba(255,67,112,${a})` : `rgba(248,247,243,${a})`;
          ctx.stroke();
        }
      }
      if (flash > 0.01) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.7);
        g.addColorStop(0, `rgba(255,255,255,${0.42 * flash})`);
        g.addColorStop(0.5, `rgba(255,67,112,${0.14 * flash})`);
        g.addColorStop(1, "rgba(255,67,112,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

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
        gsap.set(warpOverlay.current, { autoAlpha: 0 }); // Team direkt sichtbar
        return;
      }

      // Entfaltung per gepinnter, gescrubter Timeline in die finalen Grid-Plätze.
      // Danach ein kurzer Halte-Beat: das komplette Team steht, BEVOR der Pin löst
      // (auf der Home steigt danach im LogoReveal das Video darüber; auf About folgt
      // die Partner-Section). KEINE Magenta-Zwischenebene mehr.
      const vh = window.innerHeight;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          // Eine gepinnte Bühne trägt ALLES: Ein-Dach-Intro → Warp-Blende →
          // Team-Grid-Aufbau → langer Halte-Beat (über den das LogoReveal-Video,
          // -100vh, von unten drüberzieht). Länger, weil das Intro Platz braucht.
          start: "top top",
          end: "+=340%",
          scrub: true,
          pin: "[data-team-stage]",
          invalidateOnRefresh: true,
        },
      });

      // ① INTRO: „Ein Dach. Viele Handschriften." konvergiert auf SUBTILEM Staub,
      //    dann kurzer HALT. Der Warp (Blende) kommt bewusst SPÄTER.
      tl.from(edFirst.current, { y: -0.14 * vh, ease: "none", duration: 0.3 }, 0)
        .from(edLast.current, { y: 0.14 * vh, ease: "none", duration: 0.3 }, 0)
        .from(edMiddle.current, { scale: 1.16, ease: "none", duration: 0.24 }, 0.05);
      tl.to({}, { duration: 0.16 }, 0.3);
      // ② WARP (später): treibt das Canvas; „Ein Dach" blendet aus.
      const wp = { v: 0 };
      tl.to(wp, { v: 1, ease: "none", duration: 0.4, onUpdate: () => (warpProg.current = wp.v) }, 0.46);
      tl.to(edHead.current, { autoAlpha: 0, ease: "power1.in", duration: 0.2 }, 0.56);
      // ③ BLENDE: Warp-Overlay blendet aus → das Team-Grid erscheint AN GLEICHER
      //    STELLE (kein Scroll-Übergang, kein Glow-Rest).
      tl.to(warpOverlay.current, { autoAlpha: 0, ease: "power1.inOut", duration: 0.18 }, 0.82);

      // ④ TEAM-GRID entfaltet sich NACH der Blende in die finalen Grid-Plätze …
      tl.to(tiles, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, ease: "power2.out", stagger: 0.04, duration: 0.5 }, 1.0);
      // … dann faden Name + Titel gestaffelt ein.
      tl.to(metas, { opacity: 1, y: 0, ease: "power2.out", stagger: 0.02, duration: 0.26 }, 1.5);
      // ⑤ Langer Halte-Beat: komplettes Team steht still, BEVOR im LogoReveal der
      //    Videocontainer (-100vh) von unten darüberzieht.
      tl.to({}, { duration: 0.9 }, 1.9);
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
            Unser Team
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

        {/* WARP-INTRO-OVERLAY (Wolfram 14.07.): „Ein Dach. Viele Handschriften."
            auf subtilem Staub → Warp-Blende → blendet aus und gibt das Grid AN
            GLEICHER STELLE frei. Der opake moody Grund verdeckt das Grid im Intro. */}
        <div
          ref={warpOverlay}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 10, background: "radial-gradient(62% 55% at 50% 44%, #4a1234 0%, #290a1c 55%, #160410 100%)" }}
        >
          <canvas ref={warpCanvas} className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }} />
          <div ref={edHead} className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 2 }}>
            <h2 ref={edFirst} style={ED_LINE}>Ein Dach.</h2>
            <h2 ref={edMiddle} style={ED_LINE}>Viele</h2>
            <h2 ref={edLast} style={ED_LINE}>Handschriften.</h2>
          </div>
        </div>
      </div>

      {/* ── Mobile: 2-Spalten-Grid mit variierenden Kachelgrößen (Algarve
          team-grid-2: eine Kachel spannt volle Breite) → lebendiger Rhythmus
          statt starrer Raster. Die Kacheln bauen sich beim Scrollen Stück für
          Stück auf (gestaffelter Scale/Fade-Reveal, mReveal-useGSAP). */}
      <div ref={mTeam} className="hidden max-[767px]:block" style={{ padding: "16vw 3vw" }}>
        <h2 className="m-0 mb-8 uppercase text-[#f8f7f3]" style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "11vw", fontWeight: 500, letterSpacing: "-0.4vw", lineHeight: 1 }}>
          Unser Team
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
