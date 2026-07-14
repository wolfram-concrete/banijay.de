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
// Ringschar SYNCHRON zur Hero-Wölbung (Wolfram 14.07.): SELBE Krümmung wie zuvor
// (Sags 210/187/169/154 = Hero-Radius), nur die KOMPLETTE Schar um −100 nach oben
// geschoben → näher an die Hero-Kante (oberste Linie tuckt oben leicht weg).
// FÄCHER-OPTIK: jeder Ring hat eine EIGENE Färbung, die von Paper (oben) über Pink
// nach MAGENTA (unten) läuft — kein Background-Verlauf, die Farbe liegt auf den Ringen.
// Ganze Schar +110 nach unten (Wolfram 14.07.): die oberste Linie startete mit
// yTop=-80 → ihre Endpunkte lagen ÜBER dem Container und wurden links/rechts
// abgeschnitten. Jetzt yTop=30 → die Linie erreicht sichtbar beide Ränder. Sag
// (Biegung) bleibt unverändert, also weiterhin synchron zur Hero-Wölbung.
const LINES = [
  { yTop: 30, yBottom: 450, alpha: 0.9, color: "248,247,243", dur: 26, phase: 0.1 },
  { yTop: 228, yBottom: 602, alpha: 0.78, color: "255,163,190", dur: 38, phase: 0.55 },
  { yTop: 421, yBottom: 759, alpha: 0.66, color: "255,108,150", dur: 48, phase: 0.3 },
  { yTop: 611, yBottom: 919, alpha: 0.58, color: "255,67,112", dur: 34, phase: 0.8 },
];

export function AlgarveHome({
  variant = "home",
  statement,
  frame3 = "/hero-v2/frame-3.jpg",
}: {
  /** "home" = Magenta-Übergangszone; "companies" = dunkler moody Staub + Statement */
  variant?: "home" | "companies";
  /** Mittelachsiges Statement, das NACH den Satellitenringen einanimiert (companies) */
  statement?: string;
  /** Frame 3 (Typo-Bild) — je Seite passend, z. B. „/hero-v2/frame-3-career.jpg" */
  frame3?: string;
} = {}) {
  const dark = variant === "companies";
  const root = useRef<HTMLDivElement>(null);
  const heroImg = useRef<HTMLImageElement>(null); // Frame 1 (dunkel)
  const heroImgB = useRef<HTMLImageElement>(null); // Frame 2 (wird lebendig)
  const heroImg3 = useRef<HTMLImageElement>(null); // Frame 3 („We Are Banijay")
  const orbitZone = useRef<HTMLDivElement>(null);
  const heroSection = useRef<HTMLElement>(null);
  // Kurven-Fortschritt 0..1: Hero startet unten GERADE, die Kurve formt sich
  // beim Scrollen (Section-Radius + Zirkel-Kontur).
  const curveP = useRef(0);

  // 3-FRAME-EINBLEND-ANIMATION (Wolfram 14.07.): nach der Intro spielt der Hero
  // eine kurze Sequenz — ① dunkler Screen blendet weich auf (langsam heller),
  // ② Frame 2 blendet transparent → klar ein (wird lebendig, leuchtet mehr),
  // ③ Frame 3 blendet ein und bringt die Font „We Are Banijay" in den Hintergrund.
  useEffect(() => {
    const f1 = heroImg.current, f2 = heroImgB.current, f3 = heroImg3.current;
    if (!f1 || !f2 || !f3) return;
    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([f2, f3], { opacity: 1 });
        return;
      }
      gsap
        .timeline()
        // ① dunkel → langsam heller (weiche Blende, KEIN Flackern mehr — Wolfram
        //    14.07.): Frame 1 blendet ruhig aus Schwarz auf, dann kurz halten.
        .set(f1, { opacity: 0 })
        .to(f1, { opacity: 1, duration: 1.0, ease: "power2.inOut" })
        .to({}, { duration: 0.2 }) // kurz halten
        // ② wird lebendig (Frame 2 transparent → klar)
        .to(f2, { opacity: 1, duration: 1.3, ease: "power2.inOut" })
        // ③ „We Are Banijay"-Font blendet im Hintergrund ein (Frame 3) — weich,
        // aber insgesamt zügiger (Wolfram 14.07.: „etwas beschleunigen").
        .to(f3, { opacity: 1, duration: 2.3, ease: "sine.inOut" }, "-=0.25");
    };
    // Intro bereits durch → sofort. Sonst: auf das Intro-Event warten. Läuft gar
    // KEIN Intro (Subpages ohne Preloader), startet die Sequenz nach kurzem Beat
    // direkt — der Hero soll dort nicht sekundenlang dunkel bleiben.
    if ((window as { __introDone?: boolean }).__introDone) play();
    window.addEventListener("banijay:introdone", play);
    const soft = window.setTimeout(() => {
      if (document.documentElement.dataset.intro !== "1") play();
    }, 260);
    const fallback = window.setTimeout(play, 8000);
    return () => {
      window.removeEventListener("banijay:introdone", play);
      window.clearTimeout(soft);
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
      };
      if (reduce) {
        applyCurve(1);
      } else {
        applyCurve(0);
        // PHASE 1 (Wolfram 14.07.): zuerst formt sich NUR der radiale Kreis (Kurve),
        // sauber abgeschlossen im ersten Drittel des Hero-Scrolls — danach ein ruhiger
        // Scroll-Beat, BEVOR die Ringe kommen.
        ScrollTrigger.create({
          trigger: heroSection.current,
          start: "top top",
          end: "42% top",
          scrub: 0.8,
          onUpdate: (self) => applyCurve(self.progress),
        });
        // Ruhiges „Atmen": beide Visuals zoomen langsam (behält Leben ohne Linse).
        gsap.fromTo(
          [heroImg.current, heroImgB.current, heroImg3.current],
          { scale: 1.06 },
          { scale: 1.14, duration: 26, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );
      }

      // PHASE 2 (Wolfram 14.07.): ERST wenn der Kreis steht und der Screen ein Stück
      // weitergescrollt ist, wachsen die Satellitenringe LANGSAM und klar NACHEINANDER
      // aus der radialen Kante heraus (nicht mehr alles auf einmal / zu wild). Späterer
      // Trigger-Start (Beat nach der Kurve), längerer Scroll-Weg, weiterer Stagger.
      const fan = gsap.timeline({
        scrollTrigger: { trigger: orbitZone.current, start: "top 38%", end: "bottom 30%", scrub: 1.2 },
      });
      const rings = gsap.utils.toArray<SVGGElement>("[data-hero-ring]");
      rings.forEach((ring, i) => {
        // scaleY aus der Oberkante (transformOrigin oben) → die Ringe „wachsen" aus
        // der radialen Kante nach unten, statt von oben hereinzurutschen.
        fan.fromTo(
          ring,
          { autoAlpha: 0, scaleY: 0.55, transformOrigin: "50% 0%" },
          { autoAlpha: 1, scaleY: 1, duration: 0.9, ease: "power2.out" },
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
        fan.fromTo(dot, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, i * 0.9 + 0.45);
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

      // MITTELACHSIGES STATEMENT (companies): die Typo animiert Wort für Wort ein,
      // sobald sie in den Viewport scrollt (opacity + Aufstieg, gescrubbt).
      const st = root.current?.querySelector<HTMLElement>("[data-hero-statement]");
      if (st) {
        const words = Array.from(st.querySelectorAll<HTMLElement>("[data-hero-stmt-word]"));
        gsap.set(st, { autoAlpha: 1 });
        if (reduce) {
          gsap.set(words, { autoAlpha: 1, y: 0 });
        } else {
          gsap.from(words, {
            autoAlpha: 0,
            y: 30,
            ease: "power3.out",
            stagger: { amount: 0.8, from: "start" },
            scrollTrigger: { trigger: st, start: "top 82%", end: "top 45%", scrub: 0.8 },
          });
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0"
        style={{
          top: "26vh",
          bottom: 0,
          // Gradient (Wolfram 14.07.): vom moody Hero-Grund (oben, an der radialen
          // Kante) zum Magenta der 1. Section (unten) durchlayern. Companies: dunkel.
          background: dark
            ? "transparent"
            : "linear-gradient(180deg, #1e0816 0%, #1e0816 34%, #8a1e4e 58%, #ff4370 82%)",
          zIndex: 0,
        }}
      />

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

        {/* 3-FRAME-VISUAL (Wolfram 14.07.): Frame 1 dunkel (Base, blendet weich auf),
            Frame 2 „wird lebendig", Frame 3 mit der Font „We Are Banijay" — blenden
            per Sequenz (useEffect) transparent → klar übereinander. */}
        <img
          ref={heroImg}
          src="/hero-v2/frame-1.jpg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 0, filter: "saturate(1.04)", transform: "scale(1.06)", objectPosition: "50% 50%" }}
        />
        <img
          ref={heroImgB}
          src="/hero-v2/frame-2.jpg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 0, opacity: 0, filter: "saturate(1.04)", transform: "scale(1.06)", objectPosition: "50% 50%" }}
        />
        <img
          ref={heroImg3}
          src={frame3}
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

        {/* (Zirkel-Kontur entfernt, Wolfram 14.07.: die weiße Inset-Linie erzeugte
            eine feine „Blitzerkante" auf der äußeren radialen Hero-Kante.) */}
      </section>

      {/* ── ÜBERGANGSZONE: weiße Satellitenringe. Home = Magenta; Companies =
          transparent auf dem globalen moody Backdrop + eigener Sternenstaub. ── */}
      <div
        ref={orbitZone}
        data-nav-theme={dark ? "dark" : "magenta"}
        aria-hidden
        className="pointer-events-none relative z-[1] overflow-clip"
        style={{
          height: "78vh",
          marginTop: "-3vh",
          background: "transparent",
          // Keine Top-Maske mehr (Wolfram 14.07.): die erste Linie liegt sichtbar bei
          // yTop=30 und soll knackig bis an beide Ränder laufen — eine Maske würde die
          // äußersten Enden wieder wegfaden (= wirkte „abgeschnitten links/rechts").
        }}
      >
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
                stroke={`rgba(${r.color},${r.alpha})`}
                strokeWidth={1.6}
                vectorEffect="non-scaling-stroke"
                // Glow in der jeweiligen Ring-Farbe (Fächer-Optik, Wolfram 14.07.)
                style={{ filter: `drop-shadow(0 0 5px rgba(${r.color},0.85)) drop-shadow(0 0 14px rgba(${r.color},0.45))` }}
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
            {/* Wort-für-Wort-Reveal beim Ins-Bild-Scrollen (Wolfram 14.07.) */}
            {statement.split(" ").map((w, i, arr) => [
              <span key={i} data-hero-stmt-word className="inline-block" style={{ willChange: "transform, opacity" }}>
                {w}
              </span>,
              i < arr.length - 1 ? " " : "",
            ])}
          </p>
        </section>
      )}
    </div>
  );
}
