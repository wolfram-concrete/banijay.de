"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CAREER } from "@/data/career";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Career-Rollenwelt als SWIPE-BÜHNE (Wolfram 16.07.) — ersetzt den bisherigen
// Sticky-Card-Stack (CareerRoleStack). Übernimmt die Choreografie der früheren
// Home-Companies-Section (CompaniesScroller, seit dem Home-Umbau ungenutzt):
//   1) Die Wörter „Deine Rollen" stehen als EIN Satz mittig und faden ein,
//   2) sie ziehen an die Ränder → öffnen die Mitte,
//   3) drei Karten wachsen aus dem Loch auf und fächern auf (links/mitte/rechts),
//   4) danach swipet der Rest in 3 Slots durch.
// Der Grund verfärbt sich dabei weich in die Farbe der zentral fokussierten Karte.
//
// ZWEI ABWEICHUNGEN vom Original — beide bewusst:
//   • KEIN -100vh-Overlap. Auf der Home schob sich die Fläche über ein GEPINNTES
//     Statement (AboutIntro, 275vh sticky). Der Career-Hero-Statement ist eine
//     normale 82vh-Section ohne Pin — ein Overlap würde ihn verschlucken.
//   • KEINE Bildfarb-Analyse. Das Original zog die Hintergrundfarbe per Canvas aus
//     dem dominanten Ton des Card-Bildes. Hier gibt es keine Bilder mehr (Wolfram:
//     „Das Bildelement entfernen wir an der Stelle komplett"), also kommt die Farbe
//     direkt aus der Rollen-Palette — dieselbe, die der alte Card-Stack hatte.

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";
const INK = "#0e0d0b";

// NEUTRALES MAGENTA (Wolfram 21.07.): Die frühere Rollen-Palette (Magenta → Laser Pink
// → Coral → Violett) ist entfallen — die Fläche bleibt jetzt durchgehend bei dieser einen
// Grundfarbe. Nie transparent, sonst scheint der Sternenstaub-Backdrop durch.
const BASE_BG: [number, number, number] = [255, 67, 112];

const cards = CAREER.roles.map((r) => ({
  title: r.title,
  claim: r.claim,
  text: r.text,
  // Kein Farbwechsel je Karte mehr (Wolfram 21.07.): alle Karten tragen dieselbe
  // Grundfarbe → der Hintergrund-Ticker (Desktop + Mobile) interpoliert nur noch auf
  // BASE_BG, die Fläche bleibt konstant magenta.
  color: BASE_BG,
}));

const N = cards.length;

// ── TIMING ────────────────────────────────────────────────────────────────
// Die Original-Positionen (Wörter ab 2.0, Karten ab 3.9, Fächern 5.32, Swipe ab 6.4,
// End-Hold 3.0) waren auf ~40 Companies getunt: dort lief der Swipe über 36 Steps,
// die Intro war also nur ~16 % der Bühne. Bei 4 Rollen gibt es EINEN Swipe-Step —
// dieselben Werte machten die Intro zu 57 % und ließen am Ende ~100vh Leerlauf
// stehen (am Live-Modul vermessen). Die Beats sind deshalb auf vier Karten neu
// gerechnet; die Section-Höhe leitet sich aus denselben Zahlen ab, damit Timeline
// und Scrollweg nicht auseinanderlaufen.
// ALLE KARTEN AUF EINMAL (Wolfram 21.07.): Der frühere Fan+Swipe (nur 3 Karten sichtbar,
// die restlichen swipen durch die Mitte) ist entfallen. Die Wörter öffnen die Mitte, dann
// steigen ALLE vier Karten gestaffelt auf und ordnen sich als EINE Reihe an — danach hält
// die Anordnung. Deutlich kürzere Section, da kein Swipe-Weg mehr.
const T = {
  wordsIn: 0, // Wörter faden als ein Satz ein
  wordsInDur: 0.6,
  wordsApart: 0.7, // sie ziehen an die Ränder
  wordsApartDur: 1.2,
  cardsUp: 2.0, // Karten wachsen aus der Mitte in ihre Reihen-Slots
  cardsUpDur: 0.9,
  cardsUpStagger: 0.22,
  hold: 1.4, // finale Reihe steht still
} as const;

const UNITS = T.cardsUp + Math.max(0, N - 1) * T.cardsUpStagger + T.cardsUpDur + T.hold;
const VH_PER_UNIT = 43; // Scrollweg je Timeline-Einheit → ~210vh bei 4 Rollen
const TOTAL_VH = Math.round(UNITS * VH_PER_UNIT);

export function AlgarveCareerRoleScroller() {
  const root = useRef<HTMLElement>(null);
  const wordL = useRef<HTMLHeadingElement>(null);
  const wordR = useRef<HTMLHeadingElement>(null);
  const mRoot = useRef<HTMLElement>(null); // Mobile-Slider-Section
  const mTrack = useRef<HTMLDivElement>(null);
  const mWordT = useRef<HTMLHeadingElement>(null);
  const mWordB = useRef<HTMLHeadingElement>(null);

  // ── Desktop: Hintergrund folgt der fokussierten Karte ────────────────────
  useGSAP(
    () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      const rootEl = root.current;
      if (!rootEl) return;

      // Fläche SOFORT primen: der Ticker schreibt backgroundColor nur bei Änderung —
      // ohne Priming bliebe sie nach einem StrictMode/HMR-Cleanup transparent.
      rootEl.style.backgroundColor = `rgb(${BASE_BG.join(",")})`;
      const cur: [number, number, number] = [...BASE_BG];
      const target: [number, number, number] = [...BASE_BG];
      const setT = (c: readonly [number, number, number]) => {
        target[0] = c[0];
        target[1] = c[1];
        target[2] = c[2];
      };

      // Fokus = die Karte, deren Mitte der Bildschirmmitte am nächsten liegt; die
      // zweitnächste wird anteilig eingemischt → die Farbe wabert ineinander, statt
      // hart umzuschalten.
      const focus = () => {
        const els = gsap.utils.toArray<HTMLElement>("[data-role-card]");
        if (!els.length) return;
        const cX = window.innerWidth / 2;
        let b = -1;
        let bd = 1e9;
        let s = -1;
        let sd = 1e9;
        els.forEach((el, i) => {
          if (parseFloat(getComputedStyle(el).opacity) < 0.05) return;
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.left + rect.width / 2 - cX);
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
        const c1 = cards[b].color;
        const c2 = s >= 0 ? cards[s].color : c1;
        const t = bd / (bd + sd + 1); // näher = mehr Gewicht
        setT([c1[0] * (1 - t) + c2[0] * t, c1[1] * (1 - t) + c2[1] * t, c1[2] * (1 - t) + c2[2] * t]);
      };

      const st = ScrollTrigger.create({
        trigger: rootEl,
        start: "top top",
        end: "bottom bottom",
        // Erst ab 16 % färben — solange die Wörter noch stehen, bleibt es magenta.
        onUpdate: (self) => (self.progress > 0.16 ? focus() : setT(BASE_BG)),
        // KEIN onLeave-Reset (anders als im Original): die Bühne endet auf
        // „bottom bottom", steht am Ende also noch KOMPLETT im Bild. Ein Reset auf
        // Magenta würde die Fläche umschlagen lassen, während die Coral-Karten noch
        // sichtbar sind (am Live-Modul beobachtet). Die letzte Farbe bleibt stehen.
        onLeaveBack: () => setT(BASE_BG), // nach oben raus → zurück in die Intro-Ruhelage
      });

      const tick = () => {
        let moved = false;
        for (let k = 0; k < 3; k++) {
          const diff = target[k] - cur[k];
          if (Math.abs(diff) > 0.4) moved = true;
          cur[k] += diff * 0.06; // weiches Ineinander-Waben
        }
        if (moved) rootEl.style.backgroundColor = `rgb(${cur.map(Math.round).join(",")})`;
      };
      gsap.ticker.add(tick);
      return () => {
        st.kill();
        gsap.ticker.remove(tick);
        // NICHT auf "" zurück — das entfernte die Grundfläche.
        rootEl.style.backgroundColor = `rgb(${BASE_BG.join(",")})`;
      };
    },
    { scope: root },
  );

  // ── Desktop: Intro-Choreografie + 3-Slot-Swipe ───────────────────────────
  useGSAP(
    () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const els = gsap.utils.toArray<HTMLElement>("[data-role-card]");
      if (!els.length) return;

      // Reihen-Slots: alle Karten sitzen final NEBENEINANDER (eine Reihe). xPercent ist
      // relativ zur eigenen Kachelbreite (21.25vw) → 100 = eine Kachelbreite Versatz.
      const SLOT_SCALE = 0.82;
      const slot = (i: number) => ({
        xPercent: (i - (N - 1) / 2) * 100, // Zentren im Abstand einer Kachelbreite
        rotation: (i - (N - 1) / 2) * 2.4, // dezenter Fächer
        scale: SLOT_SCALE,
      });

      // Startlage: alle Karten mittig gestapelt, unsichtbar klein.
      gsap.set(els, { scale: 0, xPercent: 0, rotation: 0, opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, // hoch → weiches, „magnetisches" Nachlaufen
          invalidateOnRefresh: true,
        },
      });

      // 1) „DEINE ROLLEN" steht zuerst als EIN Satz mittig (kein Gap) und fadet ein.
      //    Der Versatz wird aus den REALEN Wortbreiten gemessen (Ruhelage ist
      //    justify-between an den Rändern) → exakt bündig, egal wie breit die Wörter
      //    rendern.
      if (wordL.current && wordR.current) {
        const rL0 = wordL.current.getBoundingClientRect();
        const rR0 = wordR.current.getBoundingClientRect();
        const spacePx = rL0.height * 0.32; // eine „Leertaste" zwischen den Wörtern
        const shiftPx = Math.max(0, (rR0.left - rL0.right - spacePx) / 2);
        gsap.set(wordL.current, { x: shiftPx, opacity: 0 });
        gsap.set(wordR.current, { x: -shiftPx, opacity: 0 });
      }
      tl.to([wordL.current, wordR.current], { opacity: 1, ease: "power1.out", duration: T.wordsInDur }, T.wordsIn);

      // 2) Dann ziehen sie an die Ränder → öffnen die Mitte („das Loch").
      tl.to(wordL.current, { x: 0, ease: "power2.inOut", duration: T.wordsApartDur }, T.wordsApart).to(
        wordR.current,
        { x: 0, ease: "power2.inOut", duration: T.wordsApartDur },
        T.wordsApart,
      );

      // 3) ERST danach steigen ALLE Karten gestaffelt aus dem Loch auf und fahren dabei
      //    direkt in ihren Reihen-Slot — kein Fan+Swipe mehr, alle vier bleiben sichtbar.
      els.forEach((el, i) => {
        const s = slot(i);
        tl.to(
          el,
          { scale: s.scale, xPercent: s.xPercent, rotation: s.rotation, duration: T.cardsUpDur, ease: "power2.out" },
          T.cardsUp + i * T.cardsUpStagger,
        );
      });

      // End-Hold: die fertige Reihe steht noch ein Stück still, statt sofort weiterzufliegen.
      tl.to({}, { duration: T.hold }, UNITS - T.hold);
    },
    { scope: root },
  );

  // ── Mobile: gepinnter Coverflow-Slider ───────────────────────────────────
  // Der vertikale Scroll wird zum horizontalen Slide; die zentrierte Fokus-Karte ist
  // groß/gerade, die Nachbarn leicht skaliert + gedreht (Fächer-Idee wie Desktop).
  useGSAP(
    () => {
      if (window.matchMedia("(min-width: 768px)").matches) return;
      const rootEl = mRoot.current;
      const trackEl = mTrack.current;
      const els = gsap.utils.toArray<HTMLElement>("[data-mrole-card]");
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

      // Slide-Weg AUS DEM LAYOUT rechnen (offsetWidth), NICHT über scrollWidth.
      // Grund (am Live-Modul vermessen): Die Karten stehen beim Erzeugen des
      // ScrollTriggers auf scale 0 — und transformierte Elemente zählen mit ihren
      // TRANSFORMIERTEN Maßen in die Scroll-Overflow-Fläche. scrollWidth kollabiert
      // dadurch auf die Containerbreite, distance() fiel auf den Minimalwert 1 und
      // die Pin-Strecke schrumpfte von ~2770px auf ~1000px → der Slider hetzte die
      // vier Karten in einem einzigen Screen durch. offsetWidth ist Layout und von
      // Transforms unberührt.
      const distance = () => {
        const cs = getComputedStyle(trackEl);
        const gap = parseFloat(cs.columnGap) || 0;
        const pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
        const content = els.reduce((sum, el) => sum + el.offsetWidth, 0) + gap * (els.length - 1) + pad;
        return Math.max(1, content - trackEl.clientWidth);
      };

      const coverflow = (withColor: boolean) => {
        const cX = window.innerWidth / 2;
        let bi = -1;
        let bd = 1e9;
        els.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const d = r.left + r.width / 2 - cX;
          const ad = Math.min(Math.abs(d) / window.innerWidth, 1);
          // rotationZ hart auf ±8° begrenzt — sonst verdrehen weit außen liegende
          // Karten stark.
          const rot = Math.max(-8, Math.min(8, (d / window.innerWidth) * 8));
          gsap.set(el, { scale: 1 - ad * 0.2, rotationZ: rot, transformOrigin: "50% 60%" });
          el.style.zIndex = String(100 - Math.round(ad * 100));
          if (Math.abs(d) < bd) {
            bd = Math.abs(d);
            bi = i;
          }
        });
        if (withColor && bi >= 0) {
          const col = cards[bi].color;
          target[0] = col[0];
          target[1] = col[1];
          target[2] = col[2];
        }
      };

      // Reihenfolge wie Desktop: Wörter erscheinen → fahren auseinander → erste Karte
      // wächst aus der leeren Mitte → DANN slidet der Track. Die Karten werden
      // ausschließlich in onUpdate gesteuert (kein Timeline-Tween darauf) → kein
      // Konflikt zwischen Intro-Scale-in und Coverflow.
      const WORDS = 0.22;
      const CARD = 0.22;
      const INTRO = WORDS + CARD;
      const SLIDE_DUR = 5; // bewusst groß → die Intro ist nur ein kleiner Anteil der Pin-Strecke
      const TOTAL = INTRO + SLIDE_DUR;
      const slideFrac = INTRO / TOTAL;
      const cardStartFrac = WORDS / TOTAL;
      const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

      gsap.set(mWordT.current, { autoAlpha: 0, y: "20vh", scale: 1.12, transformOrigin: "50% 50%" });
      gsap.set(mWordB.current, { autoAlpha: 0, y: "-18vh", scale: 1.12, transformOrigin: "50% 50%" });
      gsap.set(els, { scale: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootEl,
          start: "top top",
          end: () => "+=" + (distance() * 2.1 + window.innerHeight * 1.2),
          scrub: 0.7,
          pin: true,
          invalidateOnRefresh: true,
          // Snap auf jede Karten-Mitte — nur während des Slides, nicht in der Intro.
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
              coverflow(true);
            } else {
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
      tl.to([mWordT.current, mWordB.current], { autoAlpha: 1, duration: 0.05 }, 0);
      tl.to(mWordT.current, { y: "0vh", scale: 1, ease: "power2.out", duration: WORDS }, 0.03);
      tl.to(mWordB.current, { y: "0vh", scale: 1, ease: "power2.out", duration: WORDS }, 0.03);
      tl.to(trackEl, { x: () => -distance(), ease: "none", duration: SLIDE_DUR }, INTRO);

      const tick = () => {
        let moved = false;
        for (let k = 0; k < 3; k++) {
          const diff = target[k] - cur[k];
          if (Math.abs(diff) > 0.4) moved = true;
          cur[k] += diff * 0.08;
        }
        if (moved) rootEl.style.backgroundColor = `rgb(${cur.map(Math.round).join(",")})`;
      };
      rootEl.style.backgroundColor = `rgb(${BASE_BG.join(",")})`;
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        rootEl.style.backgroundColor = `rgb(${BASE_BG.join(",")})`;
      };
    },
    { scope: mRoot },
  );

  return (
    <>
      {/* ── Desktop: gepinnte Swipe-Bühne ──────────────────────────────────── */}
      <section
        ref={root}
        data-nav-theme="magenta"
        className="relative overflow-clip max-[767px]:hidden"
        style={{ background: `rgb(${BASE_BG.join(",")})`, height: `${TOTAL_VH}vh`, zIndex: 2 }}
      >
        <div className="sticky top-0 flex w-screen items-end" style={{ height: "100vh" }}>
          {/* Wörter — Ruhelage an den Rändern (justify-between); die Intro schiebt sie
              gemessen zusammen. */}
          <div className="flex h-full w-full flex-col justify-center" style={{ padding: "2vw" }}>
            <div className="flex items-center justify-between">
              <h2
                ref={wordL}
                className="m-0 uppercase"
                style={{ fontFamily: SHARP, fontSize: "5vw", lineHeight: "110%", fontWeight: 500, letterSpacing: "-0.1vw", color: PAPER, transformOrigin: "100%" }}
              >
                Unser
              </h2>
              <h2
                ref={wordR}
                className="m-0 uppercase"
                style={{ fontFamily: SHARP, fontSize: "5vw", lineHeight: "110%", fontWeight: 500, letterSpacing: "-0.1vw", color: PAPER, transformOrigin: "0%" }}
              >
                Angebot
              </h2>
            </div>
          </div>

          {/* Karten-Deck: Hochkant 9:16, mittig, absolut übereinander gestapelt.
              Ohne Bild (Wolfram 16.07.) — reine Typo-Karten in Paper auf der
              mitfärbenden Fläche. */}
          <div className="absolute inset-0 m-auto flex items-center justify-center" style={{ width: "21.25vw", height: "37.74vw" }}>
            {cards.map((card) => (
              <div
                key={card.title}
                data-role-card
                className="absolute inset-0 m-auto flex flex-col justify-between overflow-clip"
                style={{
                  width: "100%",
                  height: "100%",
                  background: PAPER,
                  color: INK,
                  padding: "1.9vw",
                  boxShadow: "0 1px 3px 0 rgba(248,247,243,0.04), 0 2px 30px 0 rgba(0,0,0,0.08)",
                }}
              >
                <h3
                  className="m-0 uppercase"
                  style={{ fontFamily: SHARP, fontSize: "2vw", lineHeight: "104%", fontWeight: 500, letterSpacing: "-0.05vw" }}
                >
                  {card.title}
                </h3>
                <div className="flex flex-col" style={{ gap: "0.8vw" }}>
                  <h4
                    className="m-0"
                    style={{ fontFamily: SHARP, fontSize: "1.15vw", lineHeight: "118%", fontWeight: 500, letterSpacing: "-0.03vw" }}
                  >
                    {card.claim}
                  </h4>
                  <p className="m-0" style={{ fontFamily: SHARP, fontSize: "0.85vw", lineHeight: "142%", color: "rgba(14,13,11,0.66)" }}>
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mobile: gepinnter Coverflow-Slider ─────────────────────────────── */}
      <section
        ref={mRoot}
        className="hidden h-screen w-screen flex-col justify-center overflow-clip max-[767px]:flex"
        style={{ background: `rgb(${BASE_BG.join(",")})`, color: PAPER }}
      >
        <h2
          ref={mWordT}
          className="relative m-0 w-full text-center uppercase"
          style={{ fontFamily: SHARP, fontSize: "13vw", fontWeight: 500, letterSpacing: "-0.5vw", lineHeight: 0.95, color: PAPER, zIndex: 30 }}
        >
          Unser
        </h2>
        <div
          ref={mTrack}
          className="flex items-center gap-[5vw]"
          style={{ paddingLeft: "13vw", paddingRight: "13vw", marginTop: "5vw", marginBottom: "5vw" }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              data-mrole-card
              className="relative flex shrink-0 flex-col justify-between overflow-clip"
              style={{
                width: "74vw",
                height: "104vw",
                background: PAPER,
                color: INK,
                padding: "7vw",
                boxShadow: "0 3vw 8vw -2vw rgba(0,0,0,0.35)",
                willChange: "transform",
              }}
            >
              <h3 className="m-0 uppercase" style={{ fontFamily: SHARP, fontSize: "7vw", fontWeight: 500, lineHeight: "104%", letterSpacing: "-0.2vw" }}>
                {card.title}
              </h3>
              <div className="flex flex-col" style={{ gap: "3vw" }}>
                <h4 className="m-0" style={{ fontFamily: SHARP, fontSize: "4.4vw", fontWeight: 500, lineHeight: "118%" }}>
                  {card.claim}
                </h4>
                <p className="m-0" style={{ fontFamily: SHARP, fontSize: "3.4vw", lineHeight: "142%", color: "rgba(14,13,11,0.66)" }}>
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <h2
          ref={mWordB}
          className="relative m-0 w-full text-center uppercase"
          style={{ fontFamily: SHARP, fontSize: "13vw", fontWeight: 500, letterSpacing: "-0.5vw", lineHeight: 0.95, color: PAPER, zIndex: 30 }}
        >
          Angebot
        </h2>
      </section>
    </>
  );
}
