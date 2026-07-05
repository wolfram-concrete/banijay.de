"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COMPANIES } from "@/data/companies";
import { getCompanyImage, getCompanyImagePosition } from "@/data/companyImages";
import { COMPANY_CARDS } from "@/data/companyCards";

// Externe Company-URLs (aus den kuratierten companyCards) je Company-Slug.
// Kleiner Remap für abweichende Slugs (ogp-only-good-people → only-good-people).
const URL_BY_ID: Record<string, string> = Object.fromEntries(
  COMPANY_CARDS.map((c) => [c.id, c.externalUrl]),
);
const urlForSlug = (slug: string): string | undefined =>
  URL_BY_ID[slug] ?? URL_BY_ID[slug.replace(/^ogp-/, "")];

gsap.registerPlugin(ScrollTrigger, useGSAP);

// section_works-home (Algarve 1:1, nach Briefing) — als 3-Slot-Slider erweitert:
//  • Pinned Sticky-Bühne. Die ersten drei Cards liegen mittig ÜBEREINANDER und
//    skalieren nacheinander von 0→1 (Original-Aufbau t-2c4f15b0), danach fächern
//    Card 1/3 nach xPercent -100/+100 (rot -4/+4), Card 2 bleibt mittig (scale .9).
//  • Die Wörter „Unsere/Companies" fahren x ±40vw / scale 5→1 in Position.
//  • Danach 3-Slot-Slider: jede weitere Card liegt rechts bei xPercent 200 bereit
//    und alles rückt pro Step einen Slot (100) nach links.

const H5 = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "2vw",
  lineHeight: "110%",
  fontWeight: 500,
  letterSpacing: "-0.034vw",
  margin: 0,
} as const;

const cards = COMPANIES.map((c) => ({
  name: c.name,
  subtext: c.knownFor?.[0] ?? c.profile,
  img: getCompanyImage(c)?.url ?? "/grid/g01.jpg",
  // Motivspezifischer Fokuspunkt, damit im Hochkant-Crop keine Gesichter/Körper
  // abgeschnitten werden (siehe getCompanyImagePosition).
  objectPosition: getCompanyImagePosition(c.slug),
  href: c.externalLink ?? urlForSlug(c.slug),
}));

const N = cards.length;
const STEP_VH = 40; // Scroll-Weg pro weiterer Card
// Zusätzlicher Scroll-Weg am ENDE: nach der letzten Card ruht die finale 3er-Anordnung
// noch ein Stück, bevor die nächste Section übernimmt (Desktop) — damit man die letzten
// Cards noch erfassen kann, statt sofort weiterzufliegen.
const END_HOLD_VH = 120;
const TOTAL_VH = 300 + Math.max(0, N - 3) * STEP_VH + END_HOLD_VH;

// Basisfarbe der Companies-Section: erste Ansicht = Banijay-Magenta; von hier aus
// verfärbt sich der Grund beim Scrollen in die dominanten Card-Farben. Auch der
// Fallback (Bildfarbe noch nicht analysiert) ist Magenta — NIE Off-White, sonst
// „verschwindet" der magentafarbene Layer, solange die Farbanalyse noch läuft.
const BASE_BG: [number, number, number] = [255, 67, 112];

// „Gebrannte" Variante der dominanten Bildfarbe: Sättigung deutlich anheben und
// leicht abdunkeln → satte, warme Töne statt milchig-heller Durchschnitt.
function burnt([r, g, b]: [number, number, number]): [number, number, number] {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const SAT = 1.5; // Sättigung anheben
  const DARK = 0.8; // abdunkeln → „gebrannt"
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return [
    clamp((lum + (r - lum) * SAT) * DARK),
    clamp((lum + (g - lum) * SAT) * DARK),
    clamp((lum + (b - lum) * SAT) * DARK),
  ];
}

export function AlgarveCompaniesScroller() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const wordL = useRef<HTMLHeadingElement>(null);
  const wordR = useRef<HTMLHeadingElement>(null);
  const mRoot = useRef<HTMLElement>(null); // Mobile-Slider-Section
  const mTrack = useRef<HTMLDivElement>(null); // Mobile-Card-Track
  const mWordT = useRef<HTMLHeadingElement>(null); // Mobile „Unsere" (oben)
  const mWordB = useRef<HTMLHeadingElement>(null); // Mobile „Companies" (unten)
  // Dominante Bildfarbe je Card (für den lebendigen Hintergrund).
  const colorsRef = useRef<([number, number, number] | null)[]>([]);

  // Repräsentative (vorherrschende, satte) Farbe je Company-Bild vorberechnen.
  // Läuft auf allen Viewports — Desktop UND Mobile-Slider nutzen colorsRef.
  useEffect(() => {
    let alive = true;
    cards.forEach((card, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (!alive) return;
        try {
          const s = 24;
          const cv = document.createElement("canvas");
          cv.width = s;
          cv.height = s;
          const cx = cv.getContext("2d");
          if (!cx) return;
          cx.drawImage(img, 0, 0, s, s);
          const d = cx.getImageData(0, 0, s, s).data;
          let r = 0;
          let g = 0;
          let b = 0;
          let n = 0;
          for (let p = 0; p < d.length; p += 4) {
            const R = d[p];
            const G = d[p + 1];
            const B = d[p + 2];
            const mx = Math.max(R, G, B);
            const mn = Math.min(R, G, B);
            const sat = mx === 0 ? 0 : (mx - mn) / mx;
            const l = (mx + mn) / 510;
            if (sat > 0.28 && l > 0.16 && l < 0.86) {
              r += R;
              g += G;
              b += B;
              n++;
            }
          }
          if (n < 4) {
            r = 0;
            g = 0;
            b = 0;
            n = 0;
            for (let p = 0; p < d.length; p += 4) {
              r += d[p];
              g += d[p + 1];
              b += d[p + 2];
              n++;
            }
          }
          colorsRef.current[i] = burnt([r / n, g / n, b / n]);
        } catch {}
      };
      img.src = card.img;
    });
    return () => {
      alive = false;
    };
  }, []);

  // Lebendiger Hintergrund: färbt sich weich in die vorherrschende Farbe der
  // zentral fokussierten Card; außerhalb der Slide-Strecke wieder off-white.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const rootEl = root.current;
    if (!rootEl) return;
    // Grundfläche SOFORT auf Magenta primen. Der Ticker unten schreibt background-
    // Color nur bei Farbänderung (`moved`) — ohne dieses Priming bliebe die Fläche
    // nach einem StrictMode/HMR-Cleanup (der background-color auf "" setzt und damit
    // auch die Inline-`background`-Kurzform löscht) transparent → off-white scheint
    // durch. Priming garantiert: NIE transparent.
    rootEl.style.backgroundColor = `rgb(${BASE_BG[0]},${BASE_BG[1]},${BASE_BG[2]})`;
    const cur: [number, number, number] = [...BASE_BG];
    const target: [number, number, number] = [...BASE_BG];
    const setT = (c: [number, number, number]) => {
      target[0] = c[0];
      target[1] = c[1];
      target[2] = c[2];
    };
    const focus = () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-work]");
      if (!els.length) return;
      const cX = window.innerWidth / 2;
      let b = -1;
      let bd = 1e9;
      let s = -1;
      let sd = 1e9;
      els.forEach((el, i) => {
        if (parseFloat(getComputedStyle(el).opacity) < 0.05) return;
        const rect = el.getBoundingClientRect();
        const c = rect.left + rect.width / 2;
        const dist = Math.abs(c - cX);
        if (dist < bd) {
          sd = bd;
          s = b;
          bd = dist;
          b = i;
        } else if (dist < sd) {
          sd = dist;
          s = i;
        }
      });
      if (b < 0) return;
      const c1 = colorsRef.current[b] ?? BASE_BG;
      const c2 = colorsRef.current[s] ?? c1;
      const tb = bd / (bd + sd + 1); // näher = mehr Gewicht
      setT([c1[0] * (1 - tb) + c2[0] * tb, c1[1] * (1 - tb) + c2[1] * tb, c1[2] * (1 - tb) + c2[2] * tb]);
    };
    const st = ScrollTrigger.create({
      trigger: rootEl,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => (self.progress > 0.16 ? focus() : setT(BASE_BG)),
      onLeave: () => setT(BASE_BG),
      onLeaveBack: () => setT(BASE_BG),
    });
    const tick = () => {
      let moved = false;
      for (let k = 0; k < 3; k++) {
        const diff = target[k] - cur[k];
        if (Math.abs(diff) > 0.4) moved = true;
        cur[k] += diff * 0.06; // weiches Ineinander-Waben
      }
      if (moved) rootEl.style.backgroundColor = `rgb(${Math.round(cur[0])},${Math.round(cur[1])},${Math.round(cur[2])})`;
    };
    gsap.ticker.add(tick);
    return () => {
      st.kill();
      gsap.ticker.remove(tick);
      // NICHT auf "" (das entfernte die Magenta-Grundfläche → off-white scheint
      // durch). Auf die Basis-Magenta zurück.
      rootEl.style.backgroundColor = `rgb(${BASE_BG[0]},${BASE_BG[1]},${BASE_BG[2]})`;
    };
  }, []);

  // ── Mobile: gepinnter Coverflow-Slider ──────────────────────────────────
  // Die Section rastet ein (pin), der vertikale Scroll wird zum horizontalen Slide;
  // erst wenn alle Karten durch sind, geht es weiter. Die zentrierte Fokus-Card ist
  // groß/gerade, die Nachbarn leicht skaliert + gedreht (radiale Fächer-Idee wie
  // Desktop). Der Section-Hintergrund blendet in die dominante Farbe der Fokus-Card.
  useGSAP(
    () => {
      if (window.matchMedia("(min-width: 768px)").matches) return;
      const rootEl = mRoot.current;
      const trackEl = mTrack.current;
      const els = gsap.utils.toArray<HTMLElement>("[data-mcard]");
      if (!rootEl || !trackEl || !els.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Fallback: natives horizontales Scroll-Snap ohne Pin.
        rootEl.classList.remove("h-screen", "justify-center");
        rootEl.classList.add("py-[16vw]");
        trackEl.classList.add("snap-x", "snap-mandatory", "overflow-x-auto");
        return;
      }

      const cur: [number, number, number] = [...BASE_BG];
      const target: [number, number, number] = [...BASE_BG];
      const distance = () => Math.max(1, trackEl.scrollWidth - window.innerWidth);

      // Coverflow-Transform je Card nach Abstand zur Bildschirmmitte + Fokus-Farbe.
      const coverflow = (withColor: boolean) => {
        const cX = window.innerWidth / 2;
        let bi = -1;
        let bd = 1e9;
        els.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const d = r.left + r.width / 2 - cX;
          const ad = Math.min(Math.abs(d) / window.innerWidth, 1);
          // rotationZ hart auf ±8° begrenzt — sonst „verdrehen" weit außen liegende
          // Karten (d weit > 1 Screen) stark.
          const rot = Math.max(-8, Math.min(8, (d / window.innerWidth) * 8));
          gsap.set(el, { scale: 1 - ad * 0.2, rotationZ: rot, transformOrigin: "50% 60%" });
          el.style.zIndex = String(100 - Math.round(ad * 100));
          if (Math.abs(d) < bd) {
            bd = Math.abs(d);
            bi = i;
          }
        });
        // Farbe erst ab dem Slide übernehmen (Intro bleibt Magenta).
        if (withColor && bi >= 0) {
          const col = colorsRef.current[bi] ?? BASE_BG;
          target[0] = col[0];
          target[1] = col[1];
          target[2] = col[2];
        }
      };

      // Choreografie NACHEINANDER (Wunsch):
      //   1) die Wörter „Unsere/Companies" ERSCHEINEN (nah beieinander, mittig),
      //   2) sie fahren AUSEINANDER (Unsere hoch, Companies runter) → Leerraum in der Mitte,
      //   3) die erste Card WÄCHST aus der leeren Mitte auf (scale 0→1) auf Full-Size,
      //   4) ERST DANN slidet der Track durch (Coverflow übernimmt alle Cards).
      // Die CARDS werden ausschließlich in onUpdate gesteuert (kein Timeline-Tween auf
      // den Karten) → kein Konflikt zwischen dem Intro-Scale-in und dem Coverflow.
      const WORDS = 0.22; // Wörter fahren auseinander
      const CARD = 0.22; // erste Card wächst
      const INTRO = WORDS + CARD; // Intro-Ende = Slide-Start
      // Slide-Dauer im Timeline BEWUSST groß (5 statt 1): dadurch ist die Intro nur noch
      // ein kleiner Anteil der gesamten Pin-Strecke → die Wörter/erste Card bauen sich
      // in ~1 Scroll auf (statt über 3–4 Screens), der lange Slide bekommt den Rest.
      const SLIDE_DUR = 5;
      const TOTAL = INTRO + SLIDE_DUR;
      const slideFrac = INTRO / TOTAL; // Progress-Schwelle Slide
      const cardStartFrac = WORDS / TOTAL; // Progress, ab dem die Card wächst
      const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

      // Startlagen: Wörter unsichtbar + nah beieinander (über der leeren Mitte),
      // alle Cards auf scale 0 (verborgen).
      gsap.set(mWordT.current, { autoAlpha: 0, y: "20vh", scale: 1.12, transformOrigin: "50% 50%" });
      gsap.set(mWordB.current, { autoAlpha: 0, y: "-18vh", scale: 1.12, transformOrigin: "50% 50%" });
      gsap.set(els, { scale: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootEl,
          start: "top top",
          // Mehr Scrollweg pro Card (1.7 → 2.1) + fixer Intro-Anteil (1.2 Screens) → der
          // Slide läuft deutlich träger/gezielter, die Intro bleibt kurz.
          end: () => "+=" + (distance() * 2.1 + window.innerHeight * 1.2),
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true,
          // Snap auf jede Card-Mitte — nur während des Slides (Progress ≥ slideFrac),
          // damit man einzelne Cards gezielt ansteuern kann. In der Intro nicht snappen.
          snap: {
            snapTo: (value: number) => {
              if (value < slideFrac) return value;
              const n = els.length;
              if (n < 2) return value;
              const slideP = (value - slideFrac) / (1 - slideFrac);
              const k = Math.round(Math.min(1, Math.max(0, slideP)) * (n - 1));
              return slideFrac + (1 - slideFrac) * (k / (n - 1));
            },
            duration: { min: 0.15, max: 0.4 },
            ease: "power1.inOut",
            delay: 0.06,
          },
          onUpdate: (self) => {
            const p = self.progress;
            if (p >= slideFrac) {
              // Slide: Coverflow steuert alle Cards + die Farbe.
              coverflow(true);
            } else {
              // Intro: nur die erste Card wächst aus der Mitte (0→1), Rest verborgen;
              // Grund bleibt Magenta.
              const cardP = Math.min(1, Math.max(0, (p - cardStartFrac) / (slideFrac - cardStartFrac)));
              gsap.set(els[0], { scale: easeOut(cardP), rotationZ: 0, transformOrigin: "50% 60%" });
              for (let i = 1; i < els.length; i++) gsap.set(els[i], { scale: 0 });
              target[0] = BASE_BG[0];
              target[1] = BASE_BG[1];
              target[2] = BASE_BG[2];
            }
          },
        },
      });
      // 1) Wörter erscheinen (Fade), 2) fahren auseinander → Leerraum.
      tl.to([mWordT.current, mWordB.current], { autoAlpha: 1, duration: 0.05 }, 0);
      tl.to(mWordT.current, { y: "0vh", scale: 1, ease: "power2.out", duration: WORDS }, 0.03);
      tl.to(mWordB.current, { y: "0vh", scale: 1, ease: "power2.out", duration: WORDS }, 0.03);
      // 4) Slide: der Track fährt horizontal durch (lange Timeline-Dauer → kleiner Intro-Anteil).
      tl.to(trackEl, { x: () => -distance(), ease: "none", duration: SLIDE_DUR }, INTRO);

      const tick = () => {
        let moved = false;
        for (let k = 0; k < 3; k++) {
          const diff = target[k] - cur[k];
          if (Math.abs(diff) > 0.4) moved = true;
          cur[k] += diff * 0.08;
        }
        if (moved) rootEl.style.backgroundColor = `rgb(${Math.round(cur[0])},${Math.round(cur[1])},${Math.round(cur[2])})`;
      };
      rootEl.style.backgroundColor = `rgb(${BASE_BG[0]},${BASE_BG[1]},${BASE_BG[2]})`;
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        // Basis-Magenta statt "" — sonst transparente Fläche nach Cleanup.
        rootEl.style.backgroundColor = `rgb(${BASE_BG[0]},${BASE_BG[1]},${BASE_BG[2]})`;
      };
    },
    { scope: mRoot },
  );

  useGSAP(
    () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // EINE Magenta-Ebene: Diese Section ist die einzige magentafarbene Fläche, die
      // über das Statement (AboutIntro davor) aufsteigt — mit radial gekurvter
      // Oberkante (rechts stärker als links → b-Körper-Andeutung), die sich beim
      // Aufsteigen auffaltet. Keine zweite Blende mehr, die sich überlagert.
      const sec = root.current;
      if (sec) {
        gsap.set(sec, { borderTopLeftRadius: "12vw", borderTopRightRadius: "42vw" });
        gsap.to(sec, {
          borderTopLeftRadius: "0vw",
          borderTopRightRadius: "0vw",
          ease: "none",
          scrollTrigger: { trigger: sec, start: "top bottom", end: "top top", scrub: 1, invalidateOnRefresh: true },
        });
      }

      const els = gsap.utils.toArray<HTMLElement>("[data-work]");
      if (els.length < 3) return;

      // Startlagen: erste drei mittig gestapelt (scale 0), Rest rechts vorbereitet
      // und TRANSPARENT — die weiteren Karten erscheinen erst, wenn die ersten drei
      // sich verteilt haben (sonst lugt Karte 4 auf Fullsize rechts ins Bild).
      gsap.set(els.slice(0, 3), { scale: 0, xPercent: 0, rotation: 0 });
      els.slice(3).forEach((el, i) => gsap.set(el, { xPercent: 200 + i * 100, scale: 0.8, rotation: 4, opacity: 0 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          // Höherer scrub → weicheres, „magnetisches" Nachlaufen der Bewegung.
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Intro-Choreografie in drei Beats:
      // 1) „UNSERE COMPANIES" steht zuerst als EIN Satz mittig zusammen (kein Gap) und
      //    fadet ruhig ein. Der Versatz wird aus den realen Wortbreiten GEMESSEN (die
      //    Ruhelage ist justify-between an den Rändern) → exakt bündig, egal wie breit.
      if (wordL.current && wordR.current) {
        const rL0 = wordL.current.getBoundingClientRect();
        const rR0 = wordR.current.getBoundingClientRect();
        const spacePx = rL0.height * 0.32; // eine „Leertaste" zwischen den Wörtern
        const shiftPx = Math.max(0, (rR0.left - rL0.right - spacePx) / 2);
        gsap.set(wordL.current, { x: shiftPx, scale: 1, opacity: 0 });
        gsap.set(wordR.current, { x: -shiftPx, scale: 1, opacity: 0 });
      }
      tl.to([wordL.current, wordR.current], { opacity: 1, ease: "power1.out", duration: 0.7 }, 0.15);

      // 2) Dann ziehen sie auseinander an die Ränder → öffnen die Mitte (das „Loch").
      tl.to(wordL.current, { x: 0, ease: "power2.inOut", duration: 1.8 }, 2.0)
        .to(wordR.current, { x: 0, ease: "power2.inOut", duration: 1.8 }, 2.0);

      // 3) ERST danach steigen die ersten drei Cards aus dem mittleren Loch auf.
      tl.to(els.slice(0, 3), { scale: 1, duration: 0.7, stagger: 0.3, ease: "power2.out" }, 3.9);

      // Fächern: Card 1 links, Card 3 rechts, Card 2 mittig — weiches Ease.
      tl.to(els[0], { xPercent: -100, scale: 0.8, rotation: -4, duration: 1.1, ease: "power2.inOut" }, 5.32)
        .to(els[1], { xPercent: 0, scale: 0.9, rotation: 0, duration: 1.1, ease: "power2.inOut" }, 5.32)
        .to(els[2], { xPercent: 100, scale: 0.8, rotation: 4, duration: 1.1, ease: "power2.inOut" }, 5.32);

      // 3-Slot-Slider: pro Step rückt alles einen Slot (100) nach links.
      for (let step = 1; step <= N - 3; step++) {
        const pos = 6.4 + step * 0.9;
        els.forEach((el, index) => {
          const x = (index - step - 1) * 100;
          const isCenter = x === 0;
          const isSide = x === -100 || x === 100;
          const isFar = Math.abs(x) >= 200;
          tl.to(
            el,
            {
              xPercent: x,
              scale: isCenter ? 0.9 : isSide ? 0.8 : 0.72,
              rotation: x < 0 ? -4 : x > 0 ? 4 : 0,
              opacity: isFar ? 0 : 1,
              duration: 0.95,
              ease: "power2.inOut",
            },
            pos,
          );
        });
      }

      // End-Hold: ein leerer Beat NACH der letzten Card → die finale 3er-Anordnung
      // steht noch ein Stück Scroll still (END_HOLD_VH), bevor die nächste Section
      // übernimmt. So kann man die letzten Cards erfassen, statt durchzufliegen.
      const lastEnd = N > 3 ? 6.4 + (N - 3) * 0.9 + 0.95 : 6.42;
      tl.to({}, { duration: 3 }, lastEnd);
    },
    { scope: root },
  );

  return (
    <>
      {/* ── Desktop: pinned Works-Bühne ──────────────────────────────────── */}
      {/* Negativer Margin + z-index: die Magenta-Fläche schiebt sich beim Scrollen
          von unten über die Typo-Section darüber. Die Oberkante ist anfangs
          radial gekurvt — rechts deutlich stärker als links (Suggestion: der
          Körper des „b"-Logos) — und faltet sich beim Aufsteigen komplett auf
          (Radien → 0), bevor der farbige Section-Ablauf beginnt. */}
      <section
        ref={root}
        data-nav-theme="magenta"
        className="relative overflow-clip max-[767px]:hidden"
        style={{
          background: "#ff4370",
          height: `${TOTAL_VH}vh`,
          // Starker Overlap: die Section (Magenta + Content) kommt genau dann hoch,
          // wenn die AboutIntro-Blende voll magenta ist → kein Leer-Magenta dazwischen.
          marginTop: "-100vh",
          zIndex: 2,
        }}
      >
        <div className="sticky top-0 flex w-screen items-end" style={{ height: "100vh" }}>
          <div className="flex h-full w-full flex-col justify-center" style={{ padding: "2vw" }}>
            {/* Wörter */}
            <div className="flex items-center justify-between">
              <h2 ref={wordL} className="uppercase text-black" style={{ ...H5, transformOrigin: "100%" }}>
                Unsere
              </h2>
              <h2 ref={wordR} className="uppercase text-black" style={{ ...H5, transformOrigin: "0%" }}>
                Companies
              </h2>
            </div>
          </div>

          {/* master-list: portrait 9:16, mittig; Cards absolut gestapelt */}
          <div ref={track} className="absolute inset-0 m-auto flex items-center justify-center" style={{ width: "21.25vw", height: "37.74vw" }}>
            {cards.map((card) => {
              const Wrap = card.href ? "a" : "div";
              return (
                <Wrap
                  key={card.name}
                  data-work
                  {...(card.href ? { href: card.href, target: "_blank", rel: "noreferrer" } : {})}
                  className={`absolute inset-0 m-auto flex flex-col overflow-clip no-underline ${card.href ? "cursor-pointer" : ""}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "1.11vw",
                    background: "#fff",
                    boxShadow: "0 1px 3px 0 rgba(248,247,243,0.04), 0 2px 30px 0 rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="relative flex flex-1 flex-col items-center justify-end overflow-clip">
                    <img src={card.img} alt={card.name} className="absolute inset-0 h-full w-full object-cover" style={{ borderRadius: "0.3vw", objectPosition: card.objectPosition }} />
                    <div
                      className="absolute flex w-full flex-col items-center justify-end text-center"
                      style={{
                        paddingTop: "8.33vw",
                        paddingBottom: "1.67vw",
                        paddingLeft: "1vw",
                        paddingRight: "1vw",
                        gap: "0.28vw",
                        backgroundImage: "linear-gradient(0deg, #000, #0000)",
                        color: "#f8f7f3",
                        bottom: 0,
                      }}
                    >
                      <h3 className="m-0 uppercase" style={{ ...H5, letterSpacing: "-0.034vw" }}>
                        {card.name}
                      </h3>
                    </div>
                  </div>
                </Wrap>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mobile: gepinnter Intro-Slider (Wörter auseinander → erste Card → Slide) ── */}
      <section
        ref={mRoot}
        className="hidden h-screen w-screen flex-col justify-center overflow-clip max-[767px]:flex"
        style={{ background: `rgb(${BASE_BG[0]},${BASE_BG[1]},${BASE_BG[2]})`, color: "#0e0d0b" }}
      >
        {/* „Unsere" — zentriert oben; skaliert in der Intro nach oben auseinander */}
        <h2 ref={mWordT} className="relative m-0 w-full text-center uppercase" style={{ ...H5, fontSize: "13vw", letterSpacing: "-0.5vw", lineHeight: 0.95, zIndex: 30 }}>Unsere</h2>
        {/* Card-Track (erste Card mittig) — zwischen den Wörtern */}
        <div ref={mTrack} className="flex items-center gap-[5vw]" style={{ paddingLeft: "13vw", paddingRight: "13vw", marginTop: "5vw", marginBottom: "5vw" }}>
          {cards.map((card) => {
            const Wrap = card.href ? "a" : "div";
            return (
              <Wrap
                key={card.name}
                data-mcard
                {...(card.href ? { href: card.href, target: "_blank", rel: "noreferrer" } : {})}
                className="relative flex shrink-0 flex-col overflow-clip no-underline"
                style={{ width: "74vw", height: "104vw", borderRadius: "5vw", background: "#fff", boxShadow: "0 3vw 8vw -2vw rgba(0,0,0,0.35)", willChange: "transform" }}
              >
                <img src={card.img} alt={card.name} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: card.objectPosition }} />
                {/* Caption mit seitlichem Padding, damit lange Namen (z. B. „Endemol
                    Shine Polska") nicht an der Kante kleben, sondern sauber umbrechen. */}
                <div className="absolute bottom-0 flex w-full flex-col items-center text-center" style={{ paddingLeft: "7vw", paddingRight: "7vw", paddingTop: "26vw", paddingBottom: "7vw", gap: "1vw", backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0.82), #0000)", color: "#f8f7f3" }}>
                  <h3 className="m-0 uppercase" style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "5.4vw", fontWeight: 500, lineHeight: "114%" }}>{card.name}</h3>
                </div>
              </Wrap>
            );
          })}
        </div>
        {/* „Companies" — zentriert unten; skaliert in der Intro nach unten auseinander */}
        <h2 ref={mWordB} className="relative m-0 w-full text-center uppercase" style={{ ...H5, fontSize: "13vw", letterSpacing: "-0.5vw", lineHeight: 0.95, zIndex: 30 }}>Companies</h2>
      </section>
    </>
  );
}
