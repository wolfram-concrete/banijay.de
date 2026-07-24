"use client";

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
// Ringschar SYNCHRON zur Hero-Wölbung (Wolfram 14.07.): SELBE Krümmung wie zuvor
// (Sags 210/187/169/154 = Hero-Radius), nur die KOMPLETTE Schar um −100 nach oben
// geschoben → näher an die Hero-Kante (oberste Linie tuckt oben leicht weg).
// FÄCHER-OPTIK: jeder Ring hat eine EIGENE Färbung, die von Paper (oben) über Pink
// nach MAGENTA (unten) läuft — kein Background-Verlauf, die Farbe liegt auf den Ringen.
// Ganze Schar +110 nach unten (Wolfram 14.07.): die oberste Linie startete mit
// yTop=-80 → ihre Endpunkte lagen ÜBER dem Container und wurden links/rechts
// abgeschnitten. Jetzt yTop=30 → die Linie erreicht sichtbar beide Ränder. Sag
// (Biegung) bleibt unverändert, also weiterhin synchron zur Hero-Wölbung.
// NUR 3 RINGE in ENGEREM Abstand (Wolfram 14.07.): weniger Fächer → man kommt
// schneller durch die Übergangszone zum Magenta/Statement. yTop-Abstände ~135
// statt ~195. Farbe weiterhin Paper → Pink → Magenta.
const LINES = [
  { alpha: 0.9, color: "248,247,243", dur: 26, phase: 0.1 },
  { alpha: 0.72, color: "255,120,158", dur: 40, phase: 0.55 },
  { alpha: 0.56, color: "255,67,112", dur: 34, phase: 0.3 },
];

// Auf MAGENTA (Home) sind die pink/magenta Ringfarben unsichtbar → dort LICHTE
// weiße Linien mit fallender Deckkraft, damit alle DREI Ringe sichtbar sind
// (Wolfram 15.07.). Auf den dunklen Subpages bleiben die moody Farben (LINES).
const RING_MAGENTA = [
  { alpha: 1, color: "255,255,255" },
  { alpha: 0.74, color: "255,255,255" },
  { alpha: 0.52, color: "255,255,255" },
];

// RING-GEOMETRIE (Wolfram 15.07.): KONZENTRISCH mit der Hero-Kurve — gleiches
// Kreiszentrum, Radius wächst je Ring. Die Ringe liegen HINTER dem Hero und laufen
// bis an BEIDE Screen-Ränder (Div breiter als 100vw → Seitenkanten off-screen, nie
// L/R abgeschnitten), in Synchronkurve mit dem Hero (border-radius 0 0 50vw 50vw).
const HERO_R = 50; // vw — Hero-Kurvenradius
// Abstände wachsen nach AUSSEN (Wolfram 15.07.): Gap Hero→Ring1 = G, Ring1→Ring2 = 2G,
// Ring2→Ring3 = 3G  →  kumulierter Radius-Zuwachs = G, 3G, 6G (mit G = 3vw).
const RING_GAP = 3; // vw — Basis-Abstand
const RING_EXTRA = [RING_GAP, RING_GAP * 3, RING_GAP * 6]; // = [3, 9, 18] vw

// Mobile-Hero-Motive (Wolfram 17.07.). 767px = dieselbe Grenze, an der im ganzen Projekt
// auf Mobile umgeschaltet wird (max-[767px]) — hier als Media-Attribut statt als
// Tailwind-Klasse, weil <source> eine echte Media-Query braucht.
const MOBILE_MQ = "(max-width: 767px)";
/** „/hero-v2/frame-3-career.webp" → „/hero-v2/frame-3-career-mobile.webp".
 *  Konvention statt Konfiguration: Zu JEDEM Hero-Motiv liegt die Hochformat-Fassung
 *  unter demselben Namen mit Suffix „-mobile". Gilt auch für den Default frame-3.webp.
 *  (Wolfram 23.07.: Hero-Motive gegen komprimierte WebP getauscht, gleiche Ausschnitte.) */
const mobileVariante = (pfad: string) => pfad.replace(/\.webp$/, "-mobile.webp");

export function AlgarveHome({
  variant = "home",
  statement,
  frame3 = "/hero-v2/frame-3.webp",
  parallaxExit = false,
}: {
  /** "home" = Magenta-Übergangszone; "companies" = dunkler moody Staub + Statement */
  variant?: "home" | "companies";
  /** Mittelachsiges Statement, das NACH den Satellitenringen einanimiert (companies) */
  statement?: string;
  /** Frame 3 (Typo-Bild) — je Seite passend, z. B. „/hero-v2/frame-3-career.webp" */
  frame3?: string;
  /** News-Page: das Statement driftet beim Verlassen als Parallax nach unten (lag)
   *  → weicher, tiefengestaffelter Übergang in den darunterliegenden News-Feed. */
  parallaxExit?: boolean;
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
        // ① dunkel → heller (weiche Blende, kein Flackern). Insgesamt ZÜGIGER, aber
        //    weiterhin smooth (Wolfram 15.07.: schneller ins letzte Frame kommen).
        .set(f1, { opacity: 0 })
        .to(f1, { opacity: 1, duration: 0.7, ease: "power2.inOut" })
        .to({}, { duration: 0.1 }) // kurz halten
        // ② wird lebendig (Frame 2 transparent → klar)
        .to(f2, { opacity: 1, duration: 0.85, ease: "power2.inOut" })
        // ③ „We Are Banijay"-Font blendet im Hintergrund ein (Frame 3) — weich & zügig
        .to(f3, { opacity: 1, duration: 1.5, ease: "sine.inOut" }, "-=0.3");
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

      const rings = gsap.utils.toArray<HTMLElement>("[data-hero-ring]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-hero-dot]");

      const applyCurve = (v: number) => {
        curveP.current = v;
        const r = (v * 50).toFixed(2);
        if (heroSection.current) heroSection.current.style.borderRadius = `0 0 ${r}vw ${r}vw`;
      };
      if (reduce) {
        applyCurve(1);
        gsap.set([...rings, ...dots], { autoAlpha: 1 });
      } else {
        applyCurve(0);
        gsap.set([...rings, ...dots], { autoAlpha: 0 });
        // PHASE 1: der Hero ist GEPINNT — der erste Scroll baut NUR die radiale Kurve auf.
        ScrollTrigger.create({
          trigger: heroSection.current,
          start: "top top",
          end: "+=60%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          onUpdate: (self) => applyCurve(self.progress),
        });
        // Ruhiges „Atmen": beide Visuals zoomen langsam (behält Leben ohne Linse).
        gsap.fromTo(
          [heroImg.current, heroImgB.current, heroImg3.current],
          { scale: 1.06 },
          { scale: 1.14, duration: 26, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );

        // PHASE 2 — SEQUENTIELLER RING-AUFBAU BEIM SCROLL (Wolfram 15.07.): sobald die
        // Übergangszone unter der fertigen Hero-Kurve ins Bild kommt, bauen sich die drei
        // Ringe NACHEINANDER (innen → außen) auf — gescrubbt über den Scroll, klar
        // gestaffelt; die Dots folgen ihrem Ring. Früher Start → kein Versatz.
        const fan = gsap.timeline({
          scrollTrigger: { trigger: orbitZone.current, start: "top 110%", end: "top 42%", scrub: 1, invalidateOnRefresh: true },
        });
        rings.forEach((ring, i) => {
          fan.fromTo(ring, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out" }, i * 0.62);
        });
        dots.forEach((dot, i) => {
          fan.fromTo(dot, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, i * 0.62 + 0.28);
        });
      }

      // PLANETEN-DOTS: laufen auf der KONZENTRISCHEN Ring-Kreisbahn (Zentrum HERO_R über
      // der Orbit-Oberkante = Hero-Zentrum, Radius = HERO_R + RING_EXTRA[i]). y aus der
      // Kreisgleichung (in vw) → der Dot sitzt garantiert auf derselben Kurve wie der Ring.
      dots.forEach((dot, i) => {
        const cy = -HERO_R; // Zentrum-y in vw (Orbit-Top-Koordinaten)
        const radius = HERO_R + (RING_EXTRA[i] ?? 2.5);
        const place = (fx: number) => {
          const dx = (fx - 0.5) * 100; // horizontaler Abstand zur Mitte in vw
          const inside = radius * radius - dx * dx;
          const yvw = inside > 0 ? cy + Math.sqrt(inside) : -999;
          dot.style.left = (fx * 100).toFixed(2) + "%";
          dot.style.top = `${yvw.toFixed(2)}vw`;
        };
        if (reduce) {
          place(0.5);
          return;
        }
        const proxy = { t: LINES[i].phase };
        gsap.to(proxy, {
          t: LINES[i].phase + 1,
          duration: LINES[i].dur,
          ease: "none",
          repeat: -1,
          onUpdate: () => place(-0.06 + (proxy.t % 1) * 1.12),
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
            scrollTrigger: { trigger: st, start: "top 90%", end: "top 50%", scrub: 0.8 },
          });
          // NEWS-PARALLAX (Wolfram 15.07.): das fertige Statement driftet beim
          // Hochscrollen langsamer als die Seite (yPercent-Lag) und blendet weich ab
          // → tiefengestaffelter Übergang in den darunterliegenden News-Feed.
          if (parallaxExit) {
            const stSection = st.closest("section");
            gsap.fromTo(
              st,
              { yPercent: 0 },
              {
                yPercent: 34,
                autoAlpha: 0.15,
                ease: "none",
                scrollTrigger: { trigger: stSection, start: "top top", end: "bottom top", scrub: 0.6 },
              },
            );
          }
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
          // NAHT-ÜBERLAPP (Wolfram 20.07.): −6px statt 0. An der Unterkante (dem Übergang
          // zur Statement-/DustStage-Fläche) treffen zwei getrennt gerasterte Magenta-
          // Gradienten aufeinander — der lineare Balken hier und der radiale DustStage-
          // Veil darunter, beide ≈ #ff4370. Geometrisch liegen sie pixelgenau (Lücke 0),
          // aber auf Retina/bei Browser-Zoom kann der Browser an der geteilten Kante eine
          // 1px-Antialiasing-Naht zeichnen, durch die der dunkle Seitengrund (#0a0208)
          // durchscheint (die dünne Linie, Wolframs Screenshot). Der Balken reicht jetzt
          // 6px unter seinen Container (hinter den Veil, unsichtbar) → die Naht liegt auf
          // Magenta statt auf Dunkel, egal bei welchem DPR/Zoom.
          bottom: "-6px",
          // Gradient (Wolfram 14.07.): vom moody Hero-Grund (oben, an der radialen
          // Kante) zum Magenta der 1. Section (unten) durchlayern. Companies: dunkel.
          // OBERKANTE WEICH (Wolfram 20.07.): Der Gradient begann hart bei #1e0816 —
          // weil SECTION_BG transparent ist, schien darüber der MoodBackdrop durch und
          // die Oberkante bei 26vh stand als sichtbarer BALKEN quer im Hero (Desktop wie
          // Mobile, bis der Hero-Aufbau sie überdeckte). Jetzt blendet der Gradient über
          // die ersten 10 % aus Transparenz ein; ab 10 % ist er unverändert deckend, die
          // Abdeckung hinter der radialen Hero-Kante bleibt also erhalten.
          background: dark
            ? "transparent"
            : "linear-gradient(180deg, rgba(30,8,22,0) 0%, #1e0816 10%, #1e0816 34%, #8a1e4e 58%, #ff4370 82%)",
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
            per Sequenz (useEffect) transparent → klar übereinander.

            MOBILE-MOTIVE (Wolfram 17.07.): Auf schmalen Viewports laufen eigene, im
            HOCHFORMAT gesetzte Fassungen (0.75 statt 1.35) — das sind neu gesetzte
            Ausschnitte, keine verkleinerten Kopien; im Querformat-Bild wäre auf dem
            Telefon von der Komposition kaum etwas übrig.
            Umgesetzt per <picture>: Der Browser wählt die Datei selbst, das <img> bleibt
            dasselbe Element — die GSAP-Refs (heroImg/heroImgB/heroImg3) und die gesamte
            Blend-Sequenz sind damit unberührt. `contents` am <picture>, damit der Wrapper
            keine eigene Box erzeugt und die absolute Positionierung der <img> exakt so
            aufgeht wie vorher. */}
        <picture className="contents">
          <source media={MOBILE_MQ} srcSet="/hero-v2/frame-1-mobile.webp" />
          <img
            ref={heroImg}
            src="/hero-v2/frame-1.webp"
            alt=""
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            // Startet UNSICHTBAR (Wolfram 15.07.): der Hero baut sich erst auf, wenn der
            // Preloader komplett weg ist — vorher keine sichtbare Veränderung, kein Flackern.
            style={{ zIndex: 0, opacity: 0, filter: "saturate(1.04)", transform: "scale(1.06)", objectPosition: "50% 50%" }}
          />
        </picture>
        <picture className="contents">
          <source media={MOBILE_MQ} srcSet="/hero-v2/frame-2-mobile.webp" />
          <img
            ref={heroImgB}
            src="/hero-v2/frame-2.webp"
            alt=""
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ zIndex: 0, opacity: 0, filter: "saturate(1.04)", transform: "scale(1.06)", objectPosition: "50% 50%" }}
          />
        </picture>
        <picture className="contents">
          <source media={MOBILE_MQ} srcSet={mobileVariante(frame3)} />
          <img
            ref={heroImg3}
            src={frame3}
            alt=""
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ zIndex: 0, opacity: 0, filter: "saturate(1.04)", transform: "scale(1.06)", objectPosition: "50% 50%" }}
          />
        </picture>

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
        className="pointer-events-none relative z-[1]"
        // Home (Wolfram 24.07.): Orbit-Zone als WEICHER Verlauf oben transparent → unten
        // Magenta. Oben transparent blendet in den (mobil dunklen, per Foto+Scrim
        // abgedunkelten) Hero-Boden → KEINE harte Kante; unten #ff4370 schließt lückenlos
        // an den DustStage-Veil-Magenta an. So ist der untere Bereich durchgehend magenta,
        // ohne sichtbaren Übergang. (Solid Magenta erzeugte mobil eine harte Kante zum
        // dunklen Hero-Boden.) Companies/News/Career (dark) bleiben transparent.
        style={{ height: "52vh", background: dark ? "transparent" : "linear-gradient(180deg, rgba(255,67,112,0) 0%, #ff4370 42%)", overflow: "visible" }}
      >
        {dark && (
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
            <DustLayer boost={0.85} center={{ x: 0.5, y: 0.42 }} radius={0.95} />
          </div>
        )}
        {/* KONZENTRISCHE SATELLITENRINGE (Wolfram 15.07.): gleiches Kreiszentrum wie die
            Hero-Kurve (HERO_R über der Orbit-Oberkante = Hero-Zentrum), Radius wächst je
            Ring. Der Div ist breiter als 100vw → die geraden Seitenkanten liegen
            off-screen, die Bögen laufen bis an BEIDE Screen-Ränder (nie L/R abgeschnitten).
            Die Ringe liegen HINTER dem Hero (Orbit-Zone z-1 < Hero z-2): die oberen/inneren
            Teile deckt der Hero ab, nur die Bögen unter der Hero-Kurve zeigen sich. */}
        {LINES.map((line, i) => {
          const r = dark ? line : RING_MAGENTA[i] ?? line;
          const e = RING_EXTRA[i] ?? 2.5;
          return (
            <div
              key={`ring${i}`}
              data-hero-ring
              aria-hidden
              className="absolute"
              style={{
                top: `-${HERO_R}vw`,
                left: `-${e}vw`,
                width: `${100 + 2 * e}vw`,
                height: `${HERO_R + e}vw`,
                borderRadius: `0 0 ${HERO_R + e}vw ${HERO_R + e}vw`,
                border: `1.6px solid rgba(${r.color},${r.alpha})`,
                boxShadow: `0 0 6px rgba(${r.color},0.5), 0 0 16px rgba(${r.color},0.28)`,
                opacity: 0,
                willChange: "opacity",
              }}
            />
          );
        })}

        {/* WEISSE PLANETEN — perfekt runde px-Dots (kein SVG-Stretch), folgen ihrer
            Linie und laufen komplett aus dem Bild (GSAP setzt left/top in %). */}
        {LINES.slice(0, 3).map((_, i) => {
          const size = 9 - i * 2; // kleiner (Wolfram 15.07.): 9 · 7 · 5 px
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
          {/* GRÖSSE = HOME-STATEMENT (Wolfram 20.07.): Dieses Statement (About/Career/
              News/Contact) war mit clamp(1.9rem, 3.6vw, 4.2rem)/lh 122%/20ch deutlich
              GRÖSSER als das Home-Statement (AlgarveAboutIntro, „Das weltweit führende
              Zuhause …"). Jetzt exakt dessen Werte übernommen: 2.5vw, lh 138%,
              letterSpacing -0.104vw, maxWidth 55.28vw; mobil 6.4vw statt 7.4vw. */}
          <p
            data-hero-statement
            className="max-[767px]:!text-[6.4vw] max-[767px]:!leading-[140%] max-[767px]:!max-w-[92vw]"
            style={{
              fontFamily: "var(--font-sharp), sans-serif",
              fontSize: "2.5vw",
              lineHeight: "138%",
              fontWeight: 500,
              letterSpacing: "-0.104vw",
              textAlign: "center",
              color: "#f8f7f3",
              maxWidth: "55.28vw",
              opacity: 0,
            }}
          >
            {/* Wort-für-Wort-Reveal beim Ins-Bild-Scrollen (Wolfram 14.07.).
                Ein „\n" im Statement erzwingt einen Umbruch (Wolfram 20.07., Career-
                Text: Zuruf auf eigener Zeile, darunter der Fließtext). Der Umbruch
                zählt NICHT als Wort, die Reveal-Reihenfolge bleibt also lückenlos. */}
            {statement.split(/(\n|\|\|)/).map((chunk, ci) =>
              chunk === "\n" ? (
                <br key={`br-${ci}`} />
              ) : chunk === "||" ? (
                <br key={`mbr-${ci}`} className="hidden max-[767px]:inline" />
              ) : (
                chunk.split(" ").map((w, i, arr) => [
                  <span
                    key={`${ci}-${i}`}
                    data-hero-stmt-word
                    className="inline-block"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {w}
                  </span>,
                  i < arr.length - 1 ? " " : "",
                ])
              ),
            )}
          </p>
        </section>
      )}
    </div>
  );
}
