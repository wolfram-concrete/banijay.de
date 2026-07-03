"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { homeStats } from "@/data/site";
import { HOME } from "@/data/home";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Faithful-Nachbau des Algarve/BYQ-Templates (Struktur, Maße, Effekte 1:1),
// mit Banijay-Inhalten. Zwei gestapelte Sub-Sektionen:
//  1. Hero-Text: „WE / ARE" (3D-Flip) + riesiges „BANIJAY" über 4 gestaffelte
//     Clip-Zeilen (2vw/4vw/6vw/voll) + Stats links / Beschreibung rechts.
//  2. Sticky-Grid (400vh): 5×3-Kacheln skalieren aus ihren Origins ein,
//     zentrales Video mit „play showreel" + Frosted Play/Pause-Pill.

const PAPER = "#f8f7f3";

// fontSize/lineHeight kommen aus CSS-Vars, die per JS so gesetzt werden, dass
// „BANIJAY" exakt die volle Grid-Breite füllt (randlos, wie „RESONATE" in der
// Algarve-Referenz). Fallback = die Template-Werte.
const BIG = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "var(--big-fs, 19.8vw)",
  lineHeight: "var(--big-lh, 15vw)",
  fontWeight: 500,
  letterSpacing: "-0.125rem",
  textAlign: "left",
} as const;

const TOP = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "8.8vw",
  lineHeight: "7.6vw",
  fontWeight: 500,
  letterSpacing: "-0.125rem",
} as const;

// BANIJAY füllt die Content-Breite exakt (Tinte bündig mit „ARE" rechts).
const FIT_SCALE = 1.0;

const BODY = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "1.39vw",
  lineHeight: "135%",
  fontWeight: 400,
  color: "#000",
} as const;

// 5×3-Grid (= Entertainment Portfolio): 12 Format-Kacheln + 3 leere Zellen
// (Mitte Reihe 2) fürs Showreel-Video. Beim Hover erscheint Titel · Company ·
// Genre — der „Aha-Moment": bekannte Formate, dahinter die Banijay-Companies.
type Fmt = { title: string; company: string; genre: string };
type Cell = { src: string; origin: string; fmt: Fmt; video?: string } | null;
const CELLS: Cell[] = [
  { src: "/grid/g01.jpg", origin: "0% 0%", fmt: { title: "The Masked Singer", company: "EndemolShine Germany", genre: "Show & Entertainment" } },
  { src: "/grid/g02.jpg", origin: "50% 0%", video: "/video/grid-loop1.mp4", fmt: { title: "Wer wird Millionär?", company: "EndemolShine Germany", genre: "Quiz" } },
  { src: "/grid/g03.png", origin: "50% 0%", fmt: { title: "TV total", company: "Brainpool", genre: "Comedy & Live" } },
  { src: "/grid/g04.jpeg", origin: "50% 0%", fmt: { title: "Temptation Island", company: "Banijay Productions Germany", genre: "Reality & Factual" } },
  { src: "/reels/wolter-talks.jpg", origin: "100% 0%", fmt: { title: "Marcus Wolter", company: "Banijay Germany", genre: "Podcast & Social" } },
  { src: "/grid/g06.jpg", origin: "0% 50%", fmt: { title: "Kitchen Impossible", company: "EndemolShine Germany", genre: "Factual Entertainment" } },
  null,
  null,
  null,
  { src: "/grid/g07.png", origin: "100% 50%", video: "/video/grid-loop2.mp4", fmt: { title: "Promi Big Brother", company: "EndemolShine Germany", genre: "Reality & Factual" } },
  { src: "/grid/g08.jpg", origin: "0% 100%", fmt: { title: "Das große Promibüßen", company: "Banijay Productions Germany", genre: "Reality & Factual" } },
  { src: "/grid/g09.jpg", origin: "50% 100%", fmt: { title: "LEGO Masters", company: "EndemolShine Germany", genre: "Show & Entertainment" } },
  { src: "/grid/g10.jpeg", origin: "50% 100%", video: "/video/grid-loop3.mp4", fmt: { title: "Tatort Dresden", company: "MadeFor", genre: "Fiction & Scripted" } },
  { src: "/grid/g11.png", origin: "50% 100%", fmt: { title: "NightWash", company: "Banijay Germany Live", genre: "Comedy & Live" } },
  { src: "/grid/g12.jpg", origin: "100% 100%", fmt: { title: "Cologne Comedy Festival", company: "Cologne Comedy Festival", genre: "Comedy & Live" } },
];

// Mobile-Portfolio: reduziert auf 4 Format-Kacheln (2 oben, 2 unten) + großes
// Showreel-Video mittig. Beim Scrollen kippen die 4 Kacheln weg und das Video
// wächst auf Vollbild — dasselbe Konzept wie das Desktop-Grid, nur schlanker.
const MOBILE_TILES = [
  { cell: CELLS[0]!, row: 1, col: 1, origin: "0% 0%" },
  { cell: CELLS[3]!, row: 1, col: 2, origin: "100% 0%" },
  { cell: CELLS[11]!, row: 3, col: 1, origin: "0% 100%" },
  { cell: CELLS[14]!, row: 3, col: 2, origin: "100% 100%" },
];

// 4-Zeilen-Factsheet (Algarve-Referenz: Stats links im Hero-Fuß).
const STAT_LINES = homeStats()
  .slice(0, 4)
  .map((s) => `${s.value} ${s.label}`);

export function AlgarveHome() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const gridSection = useRef<HTMLElement>(null);
  const heroVideo = useRef<HTMLVideoElement>(null);

  // Hero-Video: normal schnell, KEIN Loop — gegen Ende verlangsamt es und friert
  // auf dem letzten Frame als Standbild ein.
  useEffect(() => {
    const v = heroVideo.current;
    if (!v) return;
    v.muted = true;
    v.playbackRate = 1;
    const SLOW = 2.5; // letzte 2.5s ausklingen lassen
    const onTime = () => {
      const dur = v.duration || 0;
      if (!Number.isFinite(dur) || dur === 0) return;
      const rem = dur - v.currentTime;
      if (rem <= SLOW) v.playbackRate = Math.max(0.08, rem / SLOW);
      if (rem <= 0.08) {
        v.pause();
        try {
          v.currentTime = Math.max(0, dur - 0.05);
        } catch {}
      }
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  // Grid-Videos (Tile-Loops + Showreel) zuverlässig abspielen: Browser pausieren
  // autoplay-Videos, die beim Laden außerhalb des Viewports liegen, und nehmen sie
  // nicht zuverlässig wieder auf → man sähe nur ein eingefrorenes Bild. Daher per
  // IntersectionObserver starten, sobald sichtbar (offscreen pausieren spart Decode).
  useEffect(() => {
    const sec = gridSection.current;
    if (!sec) return;
    const vids = Array.from(sec.querySelectorAll("video"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.15 },
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  // „BANIJAY" auf volle Grid-Breite skalieren: gemessene Wortbreite → font-size,
  // die die verfügbare Breite (+1vw für den margin-left-Versatz) exakt füllt.
  // Nur bei Breitenänderung neu rechnen (Höhenänderung würde sonst loopen).
  useEffect(() => {
    const rootEl = root.current;
    const box = content.current;
    if (!rootEl || !box) return;
    const strips = rootEl.querySelectorAll<HTMLElement>("[data-strip]");
    const full = strips[strips.length - 1];
    let lastW = -1;
    const fit = (force = false) => {
      if (!full) return;
      const w = box.clientWidth;
      if (!force && w === lastW) return;
      lastW = w;
      const vw = window.innerWidth;
      // Ziel = gepolsterte Content-Breite (WE links → ARE rechts), ohne Overshoot:
      // das Wort füllt die Breite exakt, damit das „Y" nicht von overflow-clip
      // abgeschnitten wird.
      const cs = getComputedStyle(box);
      const avail = w - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
      if (avail <= 0 || !vw) return;
      // Gemessen wird die tatsächliche TINTEN-Breite (Range, nicht scrollWidth) —
      // das negative Letter-Spacing lässt die Glyphen über die Box ragen, sonst
      // bliebe rechts eine Lücke. Ziel: Tinte füllt die Content-Breite exakt, das
      // „Y" schließt bündig mit dem rechten Grid-Ende (ARE) ab. In vw → skaliert
      // automatisch mit. Mehrere Durchläufe wegen Letter-Spacing-Nichtlinearität.
      const range = document.createRange();
      for (let k = 0; k < 3; k++) {
        const curFsPx = parseFloat(getComputedStyle(full).fontSize);
        range.selectNodeContents(full);
        const inkW = range.getBoundingClientRect().width;
        if (!inkW || !curFsPx) return;
        const targetVw = ((curFsPx * (avail / inkW)) / vw) * 100 * FIT_SCALE;
        rootEl.style.setProperty("--big-fs", `${targetVw}vw`);
        rootEl.style.setProperty("--big-lh", `${targetVw * (15 / 19.8)}vw`);
      }
    };
    fit(true);
    const ro = new ResizeObserver(() => fit());
    ro.observe(box);
    // Nach dem Font-Load ändert sich durch den Neu-Fit von „BANIJAY" die Hero-Höhe
    // → die (scroll-getriggerten) Grid-Positionen müssen neu vermessen werden, sonst
    // verrutscht die Scroll-Choreografie (fühlt sich wie ein „Zurückspringen" an).
    document.fonts?.ready.then(() => {
      fit(true);
      ScrollTrigger.refresh();
    });
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      // Hero-Einfahrt — EXAKT nach Original-Timeline t-0eeba58c (Load, Delay 1.2s).
      // Obere Wörter (We/are): echter 3D-Roll-Flip, bei dem Front- und Back-Ebene
      // GETRENNT animiert werden — die sichtbare Front rollt hoch und weg
      // (yPercent -100 / rotateX 90°), die deckungsgleiche Back-Ebene rollt aus
      // ihrer Ruhelage (translateY 100% / rotateX -90°) in die finale Lage
      // (0/0). NICHT der gemeinsame Wrapper. Untere „BANIJAY"-Slices: kleines
      // Settle von oben (is-second -3vw, is-third -8vw, is-last -15vw → 0),
      // gleichzeitig ab Position .68; die oberste Slice (is-first) bleibt ruhig.
      // Startlagen über GSAP normalisieren (überschreibt die inline CSS-Ruhelage
      // translateY(100%)/rotateX(-90) sauber) — sonst parst GSAP die 100% aus dem
      // computed Style als px-Baseline und vermischt sie mit dem yPercent-Tween,
      // wodurch die Back-Ebene vertikal auf 100% hängen bliebe.
      gsap.set('[data-flip-front="one"], [data-flip-front="second"]', { yPercent: 0, rotateX: 0 });
      gsap.set('[data-flip-back="one"], [data-flip-back="second"]', { yPercent: 100, rotateX: -90 });

      // Beim Neu-Laden: das Hintergrund-Video fängt RUHIG an (blendet langsam ein und
      // läuft), während die Typo zunächst KOMPLETT ausgeblendet ist. Erst danach (nach
      // einer kurzen Vorlaufzeit, siehe startHero-Delay) kommt die Typo herein.
      gsap.set("[data-hero-typo]", { autoAlpha: 0 });
      if (heroVideo.current) gsap.fromTo(heroVideo.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6, ease: "power2.out" });

      // Timeline PAUSIERT bauen — sie startet erst nach dem Preloader-Cut (Event
      // „banijay:introdone"), damit die Hero-Animation nicht unsichtbar hinter dem
      // Overlay abläuft. Die gsap.set-Startlagen oben greifen sofort → der Hero
      // steht während des Preloaders bereits korrekt (Front sichtbar, Back verdeckt).
      const isMobile = !window.matchMedia("(min-width: 768px)").matches;
      const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      // Die Typo blendet zuerst ruhig herein (aus dem versteckten Startzustand),
      // dann läuft die WE/ARE/BANIJAY-Choreografie.
      tl.to("[data-hero-typo]", { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, 0);
      tl.to('[data-flip-front="one"]', { yPercent: -100, rotateX: 90, duration: 0.45 }, 0.06)
        .to('[data-flip-back="one"]', { yPercent: 0, rotateX: 0, duration: 0.45 }, 0.06)
        .to('[data-flip-front="second"]', { yPercent: -100, rotateX: 90, duration: 0.53 }, 0.3)
        .to('[data-flip-back="second"]', { yPercent: 0, rotateX: 0, duration: 0.53 }, 0.3);
      if (isMobile) {
        // Mobile: nur das VOLLE Wort ist sichtbar (Slats ausgeblendet). Es fährt per
        // Clip-Wipe von oben nach unten herein — „fächert herab" — begleitet von
        // einem kurzen Settle nach unten. Kein Venetian-Blind-Geistern.
        tl.fromTo(
          '[data-strip-mob]',
          { clipPath: "inset(0% 0% 100% 0%)", y: "-6vw" },
          { clipPath: "inset(0% 0% 0% 0%)", y: "0vw", duration: 0.9, ease: "power4.out" },
          0.5,
        );
      } else {
        tl.fromTo('[data-slice="second"]', { y: "-3vw" }, { y: "0vw", duration: 0.8 }, 0.68)
          .fromTo('[data-slice="third"]', { y: "-8vw" }, { y: "0vw", duration: 0.8 }, 0.68)
          .fromTo('[data-slice="last"]', { y: "-15vw" }, { y: "0vw", duration: 0.8 }, 0.68);
      }

      // Die unteren Zeilen (Factsheet + Subline) bleiben zunächst verborgen — sie
      // erscheinen erst beim Scrollen (siehe Scroll-Reveal-Effekt unten), damit der
      // Hero anfangs ruhig nur aus der Headline besteht.
      gsap.set("[data-heroline]", { autoAlpha: 0, y: 26 });

      // Die H1-Animation startet ERST, wenn der Preloader-Übergang vollständig
      // abgeschlossen ist — das Event „banijay:introdone" feuert im onComplete NACH
      // dem Cutout-Aufziehen. Fallback nach 5s, falls kein Preloader läuft.
      // Kein Preloader mehr → die H1-Animation startet kurz nach dem Mount. (Das
      // introdone-Event bleibt als Kompatibilität erhalten, falls doch ein Intro läuft.)
      // Vorlaufzeit, damit das Video erst „anläuft", bevor die Typo hereinkommt.
      const startHero = () => tl.play();
      if ((window as { __introDone?: boolean }).__introDone) gsap.delayedCall(0.9, startHero);
      else {
        window.addEventListener("banijay:introdone", () => gsap.delayedCall(0.9, startHero), { once: true });
        gsap.delayedCall(1.4, startHero);
      }

      // Untere Zeilen (Factsheet + Subline) erscheinen erst beim Scrollen — ganz
      // entspannt, nachdem der Hero-Fuß ein Stück gewachsen ist.
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top-=70",
        once: true,
        onEnter: () =>
          gsap.to("[data-heroline]", { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.16, ease: "power2.out" }),
      });

      // Sticky-Grid — EXAKT nach der Algarve-Referenz (custom GSAP, Timeline
      // t-df357d83, Trigger auf section_grid-home, scrub 1). Positionen/Dauern
      // 1:1 aus dem Original übernommen:
      //   • Karten (data-tile): rotationY 0 → -180° + opacity → 0, gestaffelt
      //     (each .1) → sie FLIPPEN um die eigene Y-Achse weg.  (pos .3, dur 2.82)
      //   • Video (data-showreel): erst width → 100% (pos 1.11, dur 1.32), dann
      //     height → 100% (pos 2.0, dur .93) → das KONTURIERTE Panel zieht auf
      //     Vollbild auf (Breite zuerst, dann Höhe). Kein Scale → Rahmen bleibt.
      // Das gepinnte 5×3-Scaling-Grid nur auf Desktop — auf Mobile wäre es unbrauchbar
      // (5 Spalten → winzige, sehr hohe Kacheln). Mobile bekommt ein eigenes 2-Spalten-
      // Grid (statisches Markup, keine Animation).
      if (window.matchMedia("(min-width: 768px)").matches) {
        const gridTl = gsap.timeline({
          scrollTrigger: {
            trigger: gridSection.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        gridTl
          .to(
            "[data-tile]",
            { rotationY: -180, opacity: 0, ease: "power1.inOut", duration: 2.82, stagger: { each: 0.1 } },
            0.3,
          )
          .to("[data-showreel]", { width: "100%", ease: "none", duration: 1.32 }, 1.11)
          .to("[data-showreel]", { height: "100%", ease: "none", duration: 0.93 }, 2.0);
      } else {
        // Mobile: dasselbe Konzept — die 4 Kacheln kippen weg, das mittige Video
        // (schon volle Breite) wächst auf die volle Höhe. Kürzeres Scroll-Fenster.
        const gridTlM = gsap.timeline({
          scrollTrigger: {
            trigger: gridSection.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
        gridTlM
          .to(
            "[data-tile-m]",
            { rotationY: -180, opacity: 0, ease: "power1.inOut", duration: 2.4, stagger: { each: 0.14 } },
            0.4,
          )
          .to("[data-showreel-m]", { height: "100%", ease: "none", duration: 1.4 }, 1.6);
      }
    },
    { scope: root },
  );

  return (
    <div ref={root} style={{ background: PAPER }}>
      {/* ── Hero-Text-Sektion ─────────────────────────────────────────── */}
      {/* Video full-bleed (auch hinter der fixen Nav). Weiße Typo direkt darüber,
          kein Wash. paddingTop hält WE/ARE frei unter der überlagernden Nav. */}
      <section
        className="relative flex min-h-[112vh] flex-col overflow-clip"
        style={{ background: "#0a0a0a", paddingTop: "6.5rem", paddingBottom: "3.5vw" }}
      >
        {/* Hintergrund: cinematisches Kamera-Video, langsam abgespielt (0.5×) */}
        <video
          ref={heroVideo}
          autoPlay
          muted
          playsInline
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Weicher Bild-Fuß nur für die Lesbarkeit von Factsheet/Subline (dunkel,
            kein weißer Layer). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{ height: "38%", background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)" }}
        />
        <div ref={content} className="relative flex flex-1 flex-col" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
          <div className="flex flex-1 flex-col justify-between text-center" style={{ gap: "0.83vw" }}>
            {/* Kopfgruppe (WE/ARE + BANIJAY) oben */}
            <div data-hero-typo className="flex flex-col" style={{ gap: "0.83vw" }}>
              {/* Top-Row: WE | ARE — zweiseitiger 3D-Box-Flip (Algarve-Referenz:
                  wrap-heading-3d_front/back). Der Kasten klappt um die eigene
                  Achse auf. */}
              <div className="flex flex-row items-center justify-between">
                {(
                  [
                    { word: "We", id: "one" },
                    { word: "are", id: "second" },
                  ] as const
                ).map(({ word, id }) => (
                  <div key={id} style={{ perspective: "1000px" }}>
                    <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                      {/* Front-Ebene — sichtbar in Ruhe, rollt beim Load hoch & weg */}
                      <h1
                        data-flip-front={id}
                        className="m-0 p-0 uppercase text-white max-[767px]:!text-[14vw] max-[767px]:!leading-[12vw]"
                        style={{ ...TOP, backfaceVisibility: "hidden", transformOrigin: "50% 100%" }}
                      >
                        {word}
                      </h1>
                      {/* Back-Ebene — deckungsgleich, rollt aus 100%/-90° in die finale
                          Lage. KEIN inline transform → sonst cached GSAP daraus eine
                          px-Baseline, die den yPercent-Tween blockiert. Startlage
                          setzt ausschließlich gsap.set (bzw. bei Reduced-Motion bleibt
                          die Ebene deckungsgleich über der Front → optisch identisch). */}
                      <h1
                        data-flip-back={id}
                        aria-hidden
                        className="m-0 p-0 uppercase text-white absolute inset-0 max-[767px]:!text-[14vw] max-[767px]:!leading-[12vw]"
                        style={{ ...TOP, backfaceVisibility: "hidden", transformOrigin: "50% 0" }}
                      >
                        {word}
                      </h1>
                    </div>
                  </div>
                ))}
              </div>

              {/* Riesiges BANIJAY über 4 gestaffelte Clip-Zeilen (füllt WE→ARE).
                  Desktop: die 3 partiellen Slats bilden beim Load eine Venetian-Blind-
                  Kaskade, die von oben herabfächert. Mobile: die partiellen Slats
                  ausblenden (dünne Letter-Top-Streifen lesen auf kleinem Screen als
                  Geistern) — stattdessen fährt das VOLLE Wort per Clip-Wipe von oben
                  nach unten herein (data-strip-mob, siehe Hero-Timeline). */}
              <div className="flex flex-col" style={{ gap: "1vw" }}>
                {(
                  [
                    { h: "2vw", key: "first" },
                    { h: "4vw", key: "second" },
                    { h: "6vw", key: "third" },
                    { h: "auto", key: "last" },
                  ] as const
                ).map(({ h, key }, i) => (
                  // Letzte Zeile (volles Wort) NICHT clippen → „Y"-Tinte, die durch
                  // das negative Letter-Spacing über die Box ragt, bleibt sichtbar.
                  <div key={key} data-slice={key} className={i < 3 ? "max-[767px]:!hidden" : ""} style={{ overflow: i === 3 ? "visible" : "clip", height: h }}>
                    <h1 data-strip data-strip-mob={i === 3 ? "" : undefined} className="m-0 p-0 uppercase text-white" style={BIG}>
                      Banijay
                    </h1>
                  </div>
                ))}
              </div>
            </div>

            {/* Fuß: 4-Zeilen-Factsheet links / kurze Subline rechts (Algarve-Ref) */}
            <div
              className="flex flex-row items-end justify-between text-left max-[479px]:flex-col max-[479px]:gap-6"
              style={{ gap: "1.39vw" }}
            >
              <div className="flex flex-col items-start max-[479px]:hidden" style={{ maxWidth: "39.17vw" }}>
                {STAT_LINES.map((line) => (
                  <div key={line} data-heroline className="m-0" style={{ ...BODY, color: "#fff" }}>
                    {line}
                  </div>
                ))}
              </div>
              <p
                data-heroline
                className="m-0 text-right max-[479px]:mx-auto max-[479px]:text-center"
                style={{ ...BODY, color: "#fff", maxWidth: "31.11vw" }}
              >
                {HOME.hero.subline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky-Grid-Sektion (400vh) ───────────────────────────────── */}
      {/* WICHTIG: overflow NICHT auf die Section (das bräche das Sticky-Pinning) —
          das Clipping des Zooms läuft über den Sticky-Container. */}
      <section ref={gridSection} className="relative" style={{ background: PAPER, height: "400vh" }}>
        <div className="sticky top-0 w-screen overflow-clip max-[767px]:hidden" style={{ height: "100vh" }}>
          <div className="h-full w-full" style={{ padding: "2vw" }}>
            <div
              className="relative h-full w-full"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                gridTemplateRows: "minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)",
                columnGap: "1vw",
                rowGap: "1vw",
                perspective: "2000px",
              }}
            >
              {CELLS.map((cell, i) =>
                cell ? (
                  <div
                    key={i}
                    data-tile
                    className="group relative w-full overflow-hidden"
                    style={{ borderRadius: "1.11vw", backfaceVisibility: "hidden", transformOrigin: cell.origin }}
                  >
                    {cell.video ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={cell.src}
                        className="block h-full w-full object-cover"
                      >
                        <source src={cell.video} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={cell.src} alt={cell.fmt.title} className="block h-full w-full object-cover" />
                    )}
                    {/* Hover: Format · Company · Genre */}
                    <div
                      className="absolute inset-0 flex flex-col justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.82), rgba(0,0,0,0) 72%)", padding: "0.9vw" }}
                    >
                      <span
                        className="uppercase"
                        style={{ fontFamily: "var(--font-sharp), sans-serif", color: "#fff", fontWeight: 600, fontSize: "1vw", lineHeight: 1.1 }}
                      >
                        {cell.fmt.title}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.72vw", marginTop: "0.25vw" }}>
                        {cell.fmt.company} · {cell.fmt.genre}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div key={i} />
                ),
              )}

              {/* Zentrales Video */}
              <div
                data-showreel
                className="absolute overflow-hidden"
                style={{
                  zIndex: 5,
                  borderRadius: "1.11vw",
                  width: "calc(60% - 0.4vw)",
                  height: "calc(33.3333% - 0.6667vw)",
                  inset: "0%",
                  margin: "auto",
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src="/video/hero.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile: reduziertes Sticky-Grid — 2 Format-Kacheln oben, großes
            Showreel-Video mittig (volle Breite), 2 Kacheln unten. Beim Scrollen
            kippen die 4 Kacheln weg und das Video wächst auf Vollbild (gridTlM).
            Gleiches Konzept wie Desktop, nur schlanker für schmale Screens. */}
        <div className="sticky top-0 hidden h-screen w-screen overflow-clip max-[767px]:block">
          <div className="h-full w-full" style={{ padding: "3vw" }}>
            <div
              className="relative h-full w-full"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr 1fr",
                columnGap: "3vw",
                rowGap: "3vw",
                perspective: "1200px",
              }}
            >
              {MOBILE_TILES.map(({ cell, row, col, origin }, i) => (
                <div
                  key={i}
                  data-tile-m
                  className="relative w-full overflow-hidden"
                  style={{ borderRadius: "4vw", backfaceVisibility: "hidden", transformOrigin: origin, gridRow: row, gridColumn: col }}
                >
                  <img src={cell.src} alt={cell.fmt.title} className="block h-full w-full object-cover" />
                  <div
                    className="absolute inset-0 flex flex-col justify-end"
                    style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.82), rgba(0,0,0,0) 72%)", padding: "3.5vw" }}
                  >
                    <span className="uppercase" style={{ fontFamily: "var(--font-sharp), sans-serif", color: "#fff", fontWeight: 600, fontSize: "3.4vw", lineHeight: "112%" }}>
                      {cell.fmt.title}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.72)", fontSize: "2.6vw", marginTop: "0.8vw", lineHeight: "118%" }}>
                      {cell.fmt.company}
                    </span>
                  </div>
                </div>
              ))}

              {/* Zentrales Showreel-Video (mittlere Reihe, volle Breite) */}
              <div
                data-showreel-m
                className="absolute overflow-hidden"
                style={{ zIndex: 5, borderRadius: "4vw", width: "100%", height: "calc(33.333% - 2vw)", inset: "0%", margin: "auto" }}
              >
                <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
                  <source src="/video/hero.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
