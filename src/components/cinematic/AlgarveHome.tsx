"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./algarve/DustLayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// V2-Hero (Umbau 14.07., Wolfram-Diktat):
//  • FULLSCREEN-Visual: das helle „We Are Banijay"-Motiv füllt den Viewport;
//    darunter das dunkle Basis-Visual, das langsam ins helle überblendet
//    (Aufhell-Crossfade). KEINE WebGL-Brennglas-Linse mehr (14.07. entfernt).
//  • Beim Scrollen formt sich die untere Kante bauchig (radiale Kurve); aus ihr
//    fächern WEISSE Satellitenringe heraus; ein weicher Übergang leitet in die
//    Magenta-Statement-Section.

const SECTION_BG = "transparent";

// Satelliten-Schar (Wolfram 14.07.): EIN Zentrum wie die bauchige Hero-Kante —
// yTop = Kantenpunkt (x=0/1600), yBottom = Bezier-Kontrollpunkt bei x=800
// (Scheitel = (yTop+yBottom)/2). Oberste Linie am stärksten gebogen, nach unten
// flacher. Die Werte dienen SVG-Pfaden UND der Planeten-Bahn-Berechnung.
const VB_H = 780;
const LINES = [
  { yTop: 20, yBottom: 440, alpha: 0.7, dur: 26, phase: 0.1 },
  { yTop: 218, yBottom: 592, alpha: 0.54, dur: 38, phase: 0.55 },
  { yTop: 411, yBottom: 749, alpha: 0.4, dur: 48, phase: 0.3 },
  { yTop: 601, yBottom: 909, alpha: 0.28, dur: 34, phase: 0.8 },
];

export function AlgarveHome({
  variant = "home",
  statement,
}: {
  /** "home" = Magenta-Übergangszone; "companies" = dunkler moody Staub + Statement */
  variant?: "home" | "companies";
  /** Mittelachsiges Statement, das NACH den Satellitenringen einanimiert (companies) */
  statement?: string;
} = {}) {
  const dark = variant === "companies";
  const root = useRef<HTMLDivElement>(null);
  const heroImg = useRef<HTMLImageElement>(null);
  const heroImgB = useRef<HTMLImageElement>(null);
  const orbitZone = useRef<HTMLDivElement>(null);
  const heroSection = useRef<HTMLElement>(null);
  const contour = useRef<HTMLDivElement>(null);
  // Kurven-Fortschritt 0..1: Hero startet unten GERADE, die Kurve formt sich
  // beim Scrollen (Section-Radius + Zirkel-Kontur).
  const curveP = useRef(0);

  // AUFHELL-CROSSFADE (Wolfram 14.07.): das dunkle Basis-Visual liegt unten, das
  // helle „We Are Banijay"-Motiv blendet nach der Intro langsam darüber ein —
  // wirkt, als würde die Helligkeit hochgezogen. (Ersetzt die frühere WebGL-Logik.)
  useEffect(() => {
    const imgB = heroImgB.current;
    if (!imgB) return;
    let done = false;
    const brighten = () => {
      if (done) return;
      done = true;
      imgB.style.transition = "opacity 4500ms ease";
      imgB.style.opacity = "1";
    };
    if ((window as { __introDone?: boolean }).__introDone) brighten();
    window.addEventListener("banijay:introdone", brighten);
    const fallback = window.setTimeout(brighten, 6000);
    return () => {
      window.removeEventListener("banijay:introdone", brighten);
      window.clearTimeout(fallback);
    };
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const applyCurve = (v: number) => {
        curveP.current = v;
        const r = (v * 50).toFixed(2);
        if (heroSection.current) heroSection.current.style.borderRadius = `0 0 ${r}vw ${r}vw`;
        if (contour.current) {
          contour.current.style.opacity = String(v);
          contour.current.style.borderRadius = `0 0 ${r}vw ${r}vw`;
        }
      };
      if (reduce) {
        applyCurve(1);
      } else {
        applyCurve(0);
        ScrollTrigger.create({
          trigger: heroSection.current,
          start: "top top",
          end: "70% top",
          scrub: 0.6,
          onUpdate: (self) => applyCurve(self.progress),
        });
        // Ruhiges „Atmen": beide Visuals zoomen langsam (behält Leben ohne Linse).
        gsap.fromTo(
          [heroImg.current, heroImgB.current],
          { scale: 1.06 },
          { scale: 1.14, duration: 26, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );
      }

      // VERZÖGERT AUFFÄCHERN (Wolfram 14.07.): die Ringe erscheinen ERST, wenn
      // die Hero-Form fertig gebildet und weit hochgescrollt ist (später Trigger-
      // Start), und wachsen dann von oben nach unten NACHEINANDER aus der Kante
      // heraus — klar getrennte Onsets, sichtbares „Rauswachsen nach unten".
      const fan = gsap.timeline({
        scrollTrigger: { trigger: orbitZone.current, start: "top 50%", end: "bottom 55%", scrub: 0.7 },
      });
      const rings = gsap.utils.toArray<SVGGElement>("[data-hero-ring]");
      rings.forEach((ring, i) => {
        fan.fromTo(
          ring,
          { autoAlpha: 0, y: -44 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
          i * 0.9,
        );
      });

      // WEISSE PLANETEN als perfekt RUNDE HTML-Dots (Wolfram 14.07.): im SVG
      // (preserveAspectRatio="none") würden Kreise horizontal verzerrt — deshalb
      // liegen die Dots als px-runde Divs über der Zone und folgen ihrer Linie in
      // Prozent-Koordinaten (x=t·100 %, y aus dem Quadratic-Bezier). Sie laufen
      // ihre Bahn KOMPLETT ab (t leicht über 0/1 hinaus) und wandern aus dem Bild.
      const dots = gsap.utils.toArray<HTMLElement>("[data-hero-dot]");
      dots.forEach((dot, i) => {
        const ln = LINES[i];
        fan.fromTo(dot, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, i * 0.9 + 0.25);
        if (reduce) {
          dot.style.left = "50%";
          dot.style.top = ((((ln.yTop + ln.yBottom) / 2) / VB_H) * 100).toFixed(3) + "%";
          return;
        }
        const proxy = { t: ln.phase };
        gsap.to(proxy, {
          t: ln.phase + 1,
          duration: ln.dur,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            const te = -0.08 + (proxy.t % 1) * 1.16; // etwas über die Ränder → aus dem Bild
            const y = ln.yTop * (1 - te) * (1 - te) + 2 * te * (1 - te) * ln.yBottom + ln.yTop * te * te;
            dot.style.left = (te * 100).toFixed(3) + "%";
            dot.style.top = ((y / VB_H) * 100).toFixed(3) + "%";
          },
        });
      });

      // MITTELACHSIGES STATEMENT (companies): animiert ein, sobald es NACH den
      // Ringen in den Viewport scrollt (fade + scale + leichter Aufstieg).
      const st = root.current?.querySelector<HTMLElement>("[data-hero-statement]");
      if (st) {
        if (reduce) {
          gsap.set(st, { autoAlpha: 1 });
        } else {
          gsap.fromTo(
            st,
            { autoAlpha: 0, scale: 0.92, y: 34 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: { trigger: st, start: "top 80%", end: "top 45%", scrub: 0.6 },
            },
          );
        }
      }
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative" style={{ background: SECTION_BG }}>
      {/* MAGENTA-GRUND hinter dem Hero (Wolfram 14.07.): sobald sich die bauchige
          Hero-Form beim Scrollen bildet, werden die Ecken außerhalb der Form
          freigeschnitten — dahinter liegt SOFORT reines Magenta (kein dunkler
          Background mehr). Deckt den Hero-Unterbau + die Übergangszone ab. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0" style={{ top: "26vh", bottom: 0, background: dark ? "transparent" : "#ff4370", zIndex: 0 }} />

      {/* ── FULLSCREEN-HERO (ohne Brennglas) ──────────────────────────────── */}
      <section
        ref={heroSection}
        className="relative z-[2] flex min-h-screen flex-col overflow-hidden max-[479px]:!min-h-screen"
        style={{ background: "transparent", borderRadius: "0" }}
      >
        {/* Sternenstaub-Grund — sichtbar unterhalb der Kurve, sobald sie sich formt */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
          <DustLayer boost={0.8} center={{ x: 0.5, y: 0.62 }} radius={0.85} />
        </div>

        {/* ZWEI-LAYER-VISUAL (Wolfram 14.07.): unten das DUNKLE Basis-Visual, darüber
            das HELLE „We Are Banijay"-Motiv, das langsam einblendet (Crossfade).
            Crisp/full-size (kein Blur, keine Linse mehr). */}
        <img
          ref={heroImg}
          src="/hero-v2/b-dark.jpg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 0, filter: "saturate(1.04)", transform: "scale(1.06)", objectPosition: "50% 50%" }}
        />
        <img
          ref={heroImgB}
          src="/hero-v2/b-bright.jpg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 0, opacity: 0, filter: "saturate(1.04)", transform: "scale(1.06)", objectPosition: "50% 50%" }}
        />

        {/* Fokus: das Bild softet nach unten dunkel ab (Übergang in die Kurve) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: 1, background: "linear-gradient(180deg, rgba(10,2,8,0) 46%, rgba(10,2,8,0.5) 74%, rgba(10,2,8,0.9) 100%)" }}
        />

        {/* Zirkel-Kontur auf der radialen Unterkante */}
        <div
          ref={contour}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{ zIndex: 2, height: "50vw", opacity: 0, borderRadius: "0", boxShadow: "inset 0 -1px 0 rgba(248,247,243,0.25)" }}
        />
      </section>

      {/* ── ÜBERGANGSZONE: weiße Satellitenringe. Home = Magenta; Companies =
          transparent auf dem globalen moody Backdrop + eigener Sternenstaub. ── */}
      <div ref={orbitZone} data-nav-theme={dark ? "dark" : "magenta"} aria-hidden className="pointer-events-none relative z-[1] overflow-clip" style={{ height: "78vh", marginTop: "-3vh", background: dark ? "transparent" : "#ff4370" }}>
        {dark && (
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
            <DustLayer boost={0.85} center={{ x: 0.5, y: 0.42 }} radius={0.95} />
          </div>
        )}
        {/* Konzentrische Schar (LINES): oberste Linie am stärksten gebogen (hugt
            die Hero-Wölbung), nach unten flacher auffächernd. preserveAspectRatio=
            "none" + edge-to-edge-Pfade → full-size bis an beide Ränder. */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 780" preserveAspectRatio="none" fill="none">
          {LINES.map((r, i) => (
            <g key={`ring${i}`} data-hero-ring>
              <path
                d={`M 0 ${r.yTop} Q 800 ${r.yBottom} 1600 ${r.yTop}`}
                stroke={`rgba(248,247,243,${r.alpha})`}
                strokeWidth={1.6}
                vectorEffect="non-scaling-stroke"
                // weicher weißer Glow auf den Linien (Wolfram 14.07.)
                style={{ filter: "drop-shadow(0 0 5px rgba(248,247,243,0.85)) drop-shadow(0 0 14px rgba(248,247,243,0.45))" }}
              />
            </g>
          ))}
        </svg>

        {/* WEISSE PLANETEN — perfekt runde px-Dots (kein SVG-Stretch), folgen ihrer
            Linie und laufen komplett aus dem Bild (GSAP setzt left/top in %). */}
        {LINES.slice(0, 3).map((_, i) => {
          const size = 14 - i * 2;
          return (
            <div
              key={`dot${i}`}
              data-hero-dot
              className="absolute"
              style={{
                left: "-12%",
                top: "0%",
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
                borderRadius: "50%",
                background: "#f8f7f3",
                opacity: 0,
                boxShadow: "0 0 9px rgba(248,247,243,0.9), 0 0 18px rgba(248,247,243,0.5)",
              }}
            />
          );
        })}
      </div>

      {/* MITTELACHSIGES STATEMENT (companies, Wolfram 14.07.): animiert ein, sobald
          es nach den Satellitenringen in den Viewport kommt — auf dem globalen
          moody Sternenstaub-Backdrop. */}
      {statement && (
        <section
          data-nav-theme="dark"
          className="relative z-[1] flex items-center justify-center overflow-clip max-[767px]:!px-[6vw]"
          style={{ minHeight: "82vh", paddingLeft: "6vw", paddingRight: "6vw" }}
        >
          <p
            data-hero-statement
            className="max-[767px]:!text-[7.4vw]"
            style={{
              fontFamily: "var(--font-sharp), sans-serif",
              fontSize: "clamp(1.9rem, 3.6vw, 4.2rem)",
              lineHeight: "122%",
              fontWeight: 500,
              textAlign: "center",
              color: "#f8f7f3",
              maxWidth: "20ch",
              opacity: 0,
            }}
          >
            {statement}
          </p>
        </section>
      )}
    </div>
  );
}
