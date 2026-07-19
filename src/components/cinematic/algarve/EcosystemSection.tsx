"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ECOSYSTEM, ECO_CATEGORIES } from "@/data/ecosystem";
import { DustLayer } from "./DustLayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ÖKOSYSTEM-SECTION (Task #54, V3 nach Wolfram-Feedback 10.07.):
//  • Headline NUR „Das Banijay Ökosystem" (kein Eyebrow, keine Copy), zentriert
//  • Bildmarke sitzt EXAKT im Zentrum der Radien (ohne Glow dahinter)
//  • Orbital-Bühne (Atom-Referenz): unterschiedlich gekippte Ellipsen, volle
//    Konturen (keine Striche/Läufer), Achslinie durchs Zentrum
//  • Kategorie-Cards: WEISSES Milchglas (Gloss + Blur, KEINE Kontur), Ink-Typo;
//    aufgeklappt = VIBRANT MAGENTA (#ff4370)
//  • Companies im Akkordeon sind CTAs → verlinken auf die echten Websites
//    (URLs aus dem Scrape der bisherigen banijay.de; ohne Beleg = unverlinkt)
//  • Cards verhalten sich responsive: Randnähe → Anker kippt nach innen,
//    nichts wird beim Skalieren abgeschnitten

const SHARP = "var(--font-sharp), sans-serif";
const MAGENTA = "#ff4370";
const PAPER = "#f8f7f3";

// Orbital-Bühne nach Atom-Referenz (Wolfram 10.07.): mehrere unterschiedlich
// GEKIPPTE Ellipsen um EIN Zentrum, durchgezogene Konturen (keine Striche,
// keine Läufer). Das B steht in der Mitte von allem.
const STAGE = { cx: 600, cy: 330 };
type Orbit = { rx: number; ry: number; rot: number; alpha: number };
const ORBITS: Orbit[] = [
  { rx: 470, ry: 150, rot: 0, alpha: 0.3 },
  { rx: 440, ry: 160, rot: -16, alpha: 0.28 },
  { rx: 400, ry: 175, rot: 21, alpha: 0.26 },
  { rx: 350, ry: 195, rot: -37, alpha: 0.24 },
  { rx: 300, ry: 215, rot: 50, alpha: 0.22 },
  { rx: 255, ry: 235, rot: 76, alpha: 0.2 },
];
// Satelliten wandern bahntreu auf den gekippten Orbits.
const DOTS = [
  { orbit: 0, r: 2.8, dur: 26, phase: 0.12, fill: PAPER },
  { orbit: 1, r: 3, dur: 34, phase: 0.5, fill: MAGENTA },
  { orbit: 2, r: 2.2, dur: 30, phase: 0.78, fill: PAPER },
  { orbit: 3, r: 2.8, dur: 42, phase: 0.3, fill: MAGENTA },
  { orbit: 4, r: 2, dur: 38, phase: 0.62, fill: PAPER },
  { orbit: 5, r: 2.4, dur: 48, phase: 0.05, fill: MAGENTA },
  { orbit: 1, r: 1.8, dur: 56, phase: 0.16, fill: PAPER },
  { orbit: 3, r: 1.8, dur: 62, phase: 0.85, fill: PAPER },
];
// Kategorie-Anker auf den Orbits (Orbit-Index + Winkel im lokalen System).
const CHIP_POS: Record<string, { orbit: number; deg: number }> = {
  audio: { orbit: 0, deg: 188 },
  entertainment: { orbit: 0, deg: -4 },
  live: { orbit: 1, deg: -158 },
  // Artists weiter nach rechts/unten & Distribution weiter nach links/oben gezogen
  // (Wolfram 15.07.) → die beiden oberen Karten überlappen nicht mehr.
  artists: { orbit: 1, deg: -10 },
  distribution: { orbit: 2, deg: -122 },
  fiction: { orbit: 2, deg: 62 },
  tech: { orbit: 3, deg: 138 },
};

// ── MOBILE-GEOMETRIE (Wolfram 17.07.) ─────────────────────────────────────────
// Die Desktop-Bühne ist QUER (rx>ry, viewBox 1300×640) — auf einem 9:16-Telefon flach
// und die Chips überlagern sich. Für Mobile eine um 90° gekippte, HOCHFORMATIGE Variante:
// Orbits mit ry>rx (die langen Achsen laufen vertikal), höheres viewBox, und die Chips
// vertikal gestaffelt statt rund verteilt → kein Überlappen. Desktop bleibt unberührt;
// die Komponente schaltet per Breakpoint zwischen beiden Geometrien um.
// Mobile = SYMMETRISCHES Atom (Wolfram 17.07., 4. Runde): das um 90° gedrehte Desktop-
// Atom wirkte als schmaler hochkanter Streifen. Stattdessen ein ausgewogenes, aufrechtes
// Cluster — gleich lange Bahnen (elongierte Ellipsen wie Desktop), aber gleichmäßig rundum
// verteilte Tilts (~alle 30°) → kein dominanter Quer-/Hochkant-Achse, quadratisch-symmetrisch
// zentriert. Liniendicke bleibt (STROKE_W=3). Flacher als der Streifen → Akkordeon rückt hoch.
const STAGE_M = { cx: 400, cy: 400 };
const ORBITS_M: Orbit[] = [
  { rx: 368, ry: 150, rot: 4, alpha: 0.34 },
  { rx: 350, ry: 165, rot: 34, alpha: 0.3 },
  { rx: 370, ry: 148, rot: 63, alpha: 0.28 },
  { rx: 352, ry: 160, rot: 92, alpha: 0.26 },
  { rx: 365, ry: 152, rot: 121, alpha: 0.24 },
  { rx: 356, ry: 158, rot: 150, alpha: 0.22 },
];
// Auf Mobile trägt die Grafik KEINE Chips mehr (die Rubriken sind unten die Liste) —
// CHIP_POS_M platziert nur noch die 7 statischen Magenta-Ankerpunkte als „ruhende
// Satelliten" auf den Bahnen. Deko, keine Überlapp-Anforderung.
const CHIP_POS_M: Record<string, { orbit: number; deg: number }> = {
  entertainment: { orbit: 0, deg: -90 },
  live: { orbit: 2, deg: -73 },
  distribution: { orbit: 1, deg: -148 },
  tech: { orbit: 3, deg: 12 },
  artists: { orbit: 5, deg: 77 },
  fiction: { orbit: 1, deg: 47 },
  audio: { orbit: 0, deg: 90 },
};
const VIEWBOX_M = "0 0 800 800";
const ASPECT_M = "800 / 800";

// Bahntreuer Punkt in GLOBALEN viewBox-Koordinaten — parametrisiert auf eine
// beliebige Geometrie (Desktop oder Mobile), damit dieselbe Render-/Anker-Logik
// für beide gilt.
function pointOn(stage: { cx: number; cy: number }, orbits: Orbit[], orbit: number, deg: number) {
  const o = orbits[orbit];
  const a = (deg * Math.PI) / 180;
  const lx = o.rx * Math.cos(a);
  const ly = o.ry * Math.sin(a);
  const rot = (o.rot * Math.PI) / 180;
  return {
    x: stage.cx + lx * Math.cos(rot) - ly * Math.sin(rot),
    y: stage.cy + lx * Math.sin(rot) + ly * Math.cos(rot),
  };
}

// Media-Query-Hook (SSR-sicher: startet false = Desktop, korrigiert nach Mount).
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
}

// Swap-Headline (Phase 3): gleiche Optik wie das AnimatedHeading-Modul
// (7vw uppercase, konvergierende Zeilen) — lebt hier IN der gepinnten Section.
// „Ein Ökosystem" entfernt (Wolfram 15.07.) → zweizeilige Swap-Headline.
// Wolfram 15.07.: „40+" allein oben, „Companies & Labels" als ruhige zweite Zeile.
const SWAP_LINES = ["40+", "Companies & Labels"] as const;
const SWAP_LINE_STYLE = {
  fontFamily: SHARP,
  fontSize: "7vw",
  lineHeight: "132%",
  fontWeight: 500,
  textAlign: "center",
  textTransform: "uppercase",
  margin: 0,
  color: PAPER,
} as const;

// Headline-„+": Wolfram 16.07. — 25 % kleiner als die Ziffern (0.75em) und leicht ÜBER
// der Grundlinie der „4" schwebend (nicht mehr bündig aufsitzend). Referenz: top:0.18em
// würde das + exakt auf die Grundlinie setzen (es sitzt in Sharp Grotesk hoch im
// Glyphenkasten); der kleinere Wert lässt es genau um diese Differenz schweben.
function withHeadlinePlus(text: string) {
  const segs = text.split("+");
  return segs.map((s, i) => (
    <span key={i}>
      {s}
      {i < segs.length - 1 && (
        <span style={{ fontSize: "0.75em", position: "relative", top: "0.08em" }}>+</span>
      )}
    </span>
  ));
}

export function AlgarveEcosystem() {
  const root = useRef<HTMLElement>(null);
  // Keine geöffnete Card beim Eintritt (Wolfram 13.07.): Cards erst auf Klick.
  const [active, setActive] = useState<string | null>(null);
  // Hover-Highlight (Wolfram 15.07.): beim Überfahren färbt sich die Card magenta.
  const [hovered, setHovered] = useState<string | null>(null);

  // Aktive Geometrie: Desktop quer, Mobile hochformatig (Wolfram 17.07.). EIN Satz
  // Ableitungen, den Rendering UND Choreografie gemeinsam nutzen.
  const isMobile = useIsMobile();
  const ST = isMobile ? STAGE_M : STAGE;
  const ORB = isMobile ? ORBITS_M : ORBITS;
  const CP = isMobile ? CHIP_POS_M : CHIP_POS;
  const VIEWBOX = isMobile ? VIEWBOX_M : "-50 0 1300 640";
  const ASPECT = isMobile ? ASPECT_M : "1300 / 640";
  const STROKE_W = isMobile ? 3 : 1; // Ringe dicker auf Mobile (Wolfram 17.07.)
  const VBX = isMobile ? 0 : -50; // viewBox x-Offset
  const VBW = isMobile ? 800 : 1300; // viewBox Breite
  const VBH = isMobile ? 800 : 640; // viewBox Höhe
  const pt = (orbit: number, deg: number) => pointOn(ST, ORB, orbit, deg);

  useGSAP(
    () => {
      // bahntreue Punkte: lokal parametrisch, die Orbit-Rotation liefert die
      // umschließende SVG-Gruppe — der Punkt kann die Kontur nie verlassen.
      gsap.utils.toArray<SVGCircleElement>("[data-eco-dot]").forEach((dot) => {
        const o = ORB[Number(dot.dataset.orbit)]; // aktive Geometrie (Desktop/Mobile)
        const dur = Number(dot.dataset.dur);
        const phase = Number(dot.dataset.phase) * Math.PI * 2;
        const proxy = { t: phase };
        gsap.to(proxy, {
          t: phase + Math.PI * 2,
          duration: dur,
          ease: "none",
          repeat: -1,
          onUpdate: () => {
            gsap.set(dot, { attr: { cx: o.rx * Math.cos(proxy.t), cy: o.ry * Math.sin(proxy.t) } });
          },
        });
      });
      gsap.to("[data-eco-b]", { scale: 1.05, duration: 6.5, ease: "sine.inOut", yoyo: true, repeat: -1 });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-eco-swap]", { autoAlpha: 0 });
        return;
      }

      // MOBILE (Wolfram 17.07., 2. Runde): KEIN Pin, KEIN Swap. Die Satellitengrafik
      // steht für sich (oben), darunter erscheint die Rubriken-Akkordeonliste
      // sukzessive. Einfaches Reveal beim Ins-Bild-Scrollen statt gepinntem Scrub —
      // das umgeht auch die Pin/rAF-Fallen im Mobile-Viewport.
      if (isMobile) {
        gsap.set("[data-eco-swap]", { autoAlpha: 0 });
        gsap.set("[data-eco-reveal]", { autoAlpha: 0, y: 22 });
        gsap.set("[data-eco-orbit]", { autoAlpha: 0, scale: 0.62, transformOrigin: "50% 50%" });
        gsap.set("[data-eco-dot], [data-eco-anchor], [data-eco-b]", { autoAlpha: 0 });
        gsap.set("[data-eco-acc-row]", { autoAlpha: 0, y: 14 });
        // EINMALIG (Wolfram 17.07., 5. Runde): once statt toggleActions. Vorher blendete
        // das Reveal beim Zurück-/Weiterscrollen wieder aus (reverse) → wirkte „geblockt",
        // Grafik verschwand, Sprünge. Jetzt spielt es genau EINMAL beim Reinscrollen und
        // bleibt danach dauerhaft stehen — die Satellitengrafik ist ab dann immer sichtbar.
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        });
        tl.to("[data-eco-reveal]", { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0)
          .to("[data-eco-orbit]", { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.06, ease: "power2.out" }, 0.05)
          .to("[data-eco-b]", { autoAlpha: 1, duration: 0.3 }, 0.36)
          .to("[data-eco-dot], [data-eco-anchor]", { autoAlpha: 1, duration: 0.35 }, 0.42)
          // die Rubriken kommen einzeln nach (sukzessive „zum Vorschein")
          .to("[data-eco-acc-row]", { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.1, ease: "power2.out" }, 0.55);

        // PARALLAX (Wolfram 19.07.): die Section wirkte nach dem Wegfall des Pins sehr
        // still. Die Grafik driftet jetzt gescrubbt gegen den Scroll (eigener Wrapper,
        // damit die Reveal-Transform der Bühne unberührt bleibt) → Tiefe zurück.
        gsap.fromTo(
          "[data-eco-parallax]",
          { y: -42 },
          {
            y: 42,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        return;
      }

      // „Wabern" (Wolfram 13.07.): die Kategorie-Balken schweben minimal — träge
      // x/y-Drift auf dem INNEREN Glas-Container. Wichtig: NICHT der äußere
      // [data-eco-card]-Wrapper (der trägt Anker-Transform + CSS-Transition —
      // zwei Writer auf transform waren die Ruckel-Ursache der V5-Floats).
      // Float DEUTLICH ruhiger (Wolfram 15.07.: „warum tanzen die Karten"): winzige,
      // langsame Drift statt sichtbarem Wabern — die Karten stehen quasi, nur ein Hauch
      // Leben. Kleinere Amplitude verhindert auch, dass benachbarte Karten ineinander
      // driften.
      gsap.utils.toArray<HTMLElement>("[data-eco-float]").forEach((el, i) => {
        gsap.to(el, { y: "+=1.5", duration: 7 + (i % 4) * 1.1, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.35 });
      });

      // EXCHANGE-CHOREOGRAFIE (Wolfram 13.07.): die Section PINNT und tauscht
      // ihre Inhalte über den Scroll-Fortschritt durch — statt Vorbei-Scrollen:
      //   Phase 1 (Aufbau):  Headline → Orbits wachsen → B → Satelliten → Karten
      //   Phase 2 (Ruhe):    das Ökosystem steht (Lese-/Klick-Fenster)
      //   Phase 3 (Swap):    Ökosystem blendet aus, an GLEICHER Stelle
      //                      konvergiert „Ein System mit über 40 Companies."
      // Danach löst der Pin → normaler Scroll zur Companies-Liste.
      // Wichtig: Karten NUR autoAlpha (inline-transform trägt die Anker-
      // Position), B nur autoAlpha (Atmen-Tween oben nutzt scale).
      gsap.set("[data-eco-reveal]", { autoAlpha: 0, y: 30 });
      gsap.set("[data-eco-orbit]", { autoAlpha: 0, scale: 0.55, transformOrigin: "50% 50%" });
      gsap.set("[data-eco-dot], [data-eco-anchor]", { autoAlpha: 0 });
      gsap.set("[data-eco-b]", { autoAlpha: 0 });
      gsap.set("[data-eco-card]", { autoAlpha: 0 });
      gsap.set("[data-eco-swap-first]", { autoAlpha: 0, yPercent: -90 });
      gsap.set("[data-eco-swap-last]", { autoAlpha: 0, yPercent: 90 });
      gsap.set("[data-eco-swap-middle]", { autoAlpha: 0, scale: 1.18 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });
      // Phase 1 — Aufbau (0 → ~1.0)
      tl.to("[data-eco-reveal]", { autoAlpha: 1, y: 0, duration: 0.18, stagger: 0.05, ease: "power2.out" }, 0)
        .to("[data-eco-orbit]", { autoAlpha: 1, scale: 1, duration: 0.42, stagger: 0.055, ease: "power2.out" }, 0.08)
        .to("[data-eco-b]", { autoAlpha: 1, duration: 0.2 }, 0.2)
        .to("[data-eco-dot], [data-eco-anchor]", { autoAlpha: 1, duration: 0.22, stagger: 0.02 }, 0.42)
        .to("[data-eco-card]", { autoAlpha: 1, duration: 0.14, stagger: 0.045, ease: "power2.out" }, 0.55)
        // Phase 2 — Ruhe-Fenster
        .to({}, { duration: 0.45 })
        // Phase 3 — Swap: Ökosystem raus, Headline konvergiert herein
        .to("[data-eco-reveal]", { autoAlpha: 0, duration: 0.3, ease: "power1.inOut" }, 1.35)
        .to("[data-eco-swap-first]", { autoAlpha: 1, yPercent: 0, duration: 0.38, ease: "power2.out" }, 1.55)
        .to("[data-eco-swap-last]", { autoAlpha: 1, yPercent: 0, duration: 0.38, ease: "power2.out" }, 1.55)
        .to("[data-eco-swap-middle]", { autoAlpha: 1, scale: 1, duration: 0.34, ease: "power2.out" }, 1.62)
        // Ruhe-Beat mit stehender Headline, bevor der Pin löst
        .to({}, { duration: 0.3 });
    },
    // Bei Breakpoint-Wechsel neu aufsetzen: Desktop- und Mobile-Zweig bauen völlig
    // andere Choreografien (Desktop pinnt+scrubbt, Mobile nicht). WICHTIG: revertOnUpdate
    // — useGSAP revertet bei Dependency-Wechsel sonst NICHT, dann bliebe der beim ersten
    // (SSR-)Render als Desktop erzeugte PIN auf Mobile aktiv (Section fixed, Pin-Spacer),
    // was das Mobile-Layout zerstört. SSR startet immer isMobile=false → dieser Fall tritt
    // auch auf echten Handys auf. dependencies statt key-Remount, damit React-State bleibt.
    { scope: root, dependencies: [isMobile], revertOnUpdate: true },
  );

  return (
    // KEIN overflow-clip mehr (Wolfram 13.07.): die Karten dürfen unten über
    // die Section ragen — nur horizontal clippen (kein Seiten-Scrollbalken).
    // min-h-screen + zentriert: die Section füllt den Viewport, solange sie
    // für den Scroll-Aufbau gepinnt ist.
    <section
      ref={root}
      className="relative flex min-h-screen flex-col justify-start pt-[7vh] pb-24 lg:pt-[8vh]"
      style={{ background: "transparent", overflowX: "clip" }}
    >
      {/* Der Sternenstaub lebt NICHT mehr hier: er liegt als DustStage (sticky,
          eigene Wachstums-Dramaturgie) hinter der GESAMTEN Exchange-Strecke
          (page.tsx) — Statement, Ökosystem und Headline spielen davor. */}

      {/* Lokaler Glow: der HELLSTE Punkt des Backgrounds sitzt mittig HINTER dem
          Zentrum der Ökosystem-Grafik (unter SVG/Cards, über dem Staub). */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          top: "58%",
          width: "110vmin",
          height: "110vmin",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(closest-side, rgba(255,67,112,0.34) 0%, rgba(199,50,90,0.22) 30%, rgba(143,34,68,0.12) 55%, rgba(86,17,46,0.05) 78%, rgba(30,0,24,0) 100%)",
        }}
      />

      {/* SWAP-Headline (Phase 3): liegt unsichtbar über der ganzen Section und
          konvergiert herein, sobald das Ökosystem ausgeblendet ist. */}
      <div
        data-eco-swap
        aria-hidden
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center max-[767px]:!px-[4vw]"
        style={{ zIndex: 5 }}
      >
        <h2 data-eco-swap-first className="max-[767px]:!text-[13vw] max-[767px]:!leading-[108%]" style={{ ...SWAP_LINE_STYLE, opacity: 0 }}>
          {withHeadlinePlus(SWAP_LINES[0])}
        </h2>
        <h2 data-eco-swap-last className="max-[767px]:!text-[13vw] max-[767px]:!leading-[108%]" style={{ ...SWAP_LINE_STYLE, opacity: 0 }}>
          {SWAP_LINES[1]}
        </h2>
      </div>

      {/* Headline pur, mittelachsig — kein Eyebrow, keine Copy (Wording: Heike #58) */}
      <div data-eco-reveal className="relative mx-auto max-w-[900px] px-6 text-center">
        <h2 className="m-0 text-[3.4rem] leading-[1.02] max-[767px]:text-[2.2rem]" style={{ fontFamily: SHARP, fontWeight: 500, color: PAPER }}>
          {ECOSYSTEM.title}
        </h2>
      </div>

      {/* Der Teller: zentriert, mit vertikalen Gyroskop-Ringen ums Zentrum. Größer
          skaliert (Wolfram 14.07.): engeres viewBox (weniger Leerrand → Grafik füllt
          den Raum), höheres max-width auf großen Screens. */}
      {/* Parallax-Wrapper (Wolfram 19.07.): auf Mobile driftet die Grafik gescrubbt gegen
          den Scroll → Tiefe/Parallax. Eigener Wrapper, damit die Reveal-Transform auf der
          INNEREN Bühne bleibt (kein doppelter transform-Writer). */}
      <div data-eco-parallax>
      <div
        data-eco-reveal
        className="relative mx-auto mt-8 max-[767px]:!mt-4"
        style={{
          aspectRatio: ASPECT,
          // Zusätzlich über die HÖHE begrenzt (Wolfram 15.07.): auf niedrigeren Viewports
          // (Laptop) wurde die Grafik sonst höher als der gepinnte 100vh-Screen → unten
          // abgeschnitten (Orbits + aufgeklappte Entertainment-Karte). Die Breite wird so
          // gedeckelt, dass die Höhe max. ~60vh bleibt → alles passt in den Viewport.
          // Mobile (symmetrisches, quadratisches Atom, steht für sich oben): über die
          // BREITE (~74vw) deckeln, auf niedrigen Screens zusätzlich über die Höhe (40vh).
          width: isMobile ? "min(74vw, 40vh)" : "min(100%, 2000px, calc(60vh * 1300 / 640))",
        }}
      >
        {/* VERDICHTETER STERNENSTAUB im Zentrum (Wolfram 14.07.): eigene, eng um
            die Mitte konzentrierte Staubebene HINTER den Orbits — dichter Kern
            hinter dem B, fällt radial ab. Liegt vor dem Glow, unter SVG/B/Cards. */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
          <DustLayer boost={1.2} center={{ x: 0.5, y: 0.5 }} radius={0.42} />
        </div>
        <svg className="absolute inset-0 h-full w-full" viewBox={VIEWBOX} preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden>
          {/* Gekippte Orbits: jede Gruppe trägt ihre eigene Rotation — Punkte
              darin bewegen sich im lokalen (ungekippten) System bahntreu. */}
          {ORB.map((o, i) => (
            <g key={`orb${i}`} transform={`translate(${ST.cx} ${ST.cy}) rotate(${o.rot})`}>
              <ellipse data-eco-orbit rx={o.rx} ry={o.ry} stroke={`rgba(248,247,243,${o.alpha})`} strokeWidth={STROKE_W} />
              {DOTS.filter((d) => d.orbit === i).map((d, j) => (
                <circle
                  key={j}
                  data-eco-dot
                  data-orbit={d.orbit}
                  data-dur={d.dur}
                  data-phase={d.phase}
                  cx={+(o.rx * Math.cos(d.phase * Math.PI * 2)).toFixed(2)}
                  cy={+(o.ry * Math.sin(d.phase * Math.PI * 2)).toFixed(2)}
                  r={d.r}
                  fill={d.fill}
                  style={{ filter: `drop-shadow(0 0 8px ${d.fill})` }}
                />
              ))}
            </g>
          ))}
          {/* Anker-Satelliten der Kategorie-Karten (globale Koordinaten) */}
          {ECO_CATEGORIES.map((cat) => {
            const pos = CP[cat.key];
            const p = pt(pos.orbit, pos.deg);
            return (
              <circle key={`anchor-${cat.key}`} data-eco-anchor cx={+p.x.toFixed(2)} cy={+p.y.toFixed(2)} r={isMobile ? 4.6 : 3.4} fill={MAGENTA} style={{ filter: `drop-shadow(0 0 7px ${MAGENTA})` }} />
            );
          })}
        </svg>

        {/* Zentrum: weiße Bildmarke, EXAKT mittig in den Radien, ohne Glow */}
        <img
          data-eco-b
          src="/brand/banijay-sign-white.svg"
          alt=""
          draggable={false}
          className="pointer-events-none absolute h-auto w-[5%] min-w-[42px] max-[767px]:!w-[14%]"
          style={{
            // toFixed: Browser normalisieren Style-Attribute auf wenige
            // Nachkommastellen → volle Float-Präzision = Hydration-Mismatch
            left: `${(((ST.cx - VBX) / VBW) * 100).toFixed(3)}%`,
            top: `${((ST.cy / VBH) * 100).toFixed(3)}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* DESKTOP: Kategorien als Chips auf den Orbits (weißes Milchglas → aktiv
            Magenta). Auf Mobile stehen sie stattdessen als Akkordeonliste UNTER der
            Grafik (siehe unten) — hier daher nur Desktop. */}
        {!isMobile && ECO_CATEGORIES.map((cat) => {
          const pos = CP[cat.key];
          const p = pt(pos.orbit, pos.deg);
          const isActive = cat.key === active;
          const isHover = cat.key === hovered && !isActive;
          const lit = isActive || isHover; // magenta bei Klick ODER Hover
          // Responsive Anker: Randnähe → Card klappt nach innen auf (kein Clipping)
          const fx = (p.x - VBX) / VBW;
          const fy = p.y / VBH;
          // Untere Bahn (Wolfram 14.07.): die Card würde nach unten aus der Section
          // laufen → sie klappt stattdessen nach OBEN auf und bleibt immer lesbar.
          // Mobile (Wolfram 17.07.): der Chip-Stack ist rein VERTIKAL — ein Auf-/Ab-
          // Flip mitten im Stapel ließe zwei benachbarte Karten gegeneinander öffnen und
          // sich in den Ecken berühren. Darum klappen auf Mobile ALLE einheitlich nach
          // unten auf → die fy-Staffelung (≥0.12 Abstand) hält sie sauber getrennt.
          const low = !isMobile && fy > 0.62;
          const anchorX = fx > 0.76 ? "-92%" : fx < 0.24 ? "-8%" : "-50%";
          const anchorY = low ? "calc(-100% - 10px)" : "12px";
          const originX = fx > 0.76 ? "92%" : fx < 0.24 ? "8%" : "50%";
          const originY = low ? "100%" : "0%";
          return (
            <div
              key={cat.key}
              data-eco-card
              className="absolute"
              onMouseEnter={() => setHovered(cat.key)}
              onMouseLeave={() => setHovered((h) => (h === cat.key ? null : h))}
              style={{
                left: `${(fx * 100).toFixed(3)}%`,
                top: `${(fy * 100).toFixed(3)}%`,
                // Karte hängt an ihrem Anker-Satelliten (oben oder unten je Bahnlage)
                transform: `translate(${anchorX}, ${anchorY}) scale(${isActive ? 1.04 : 1})`,
                transformOrigin: `${originX} ${originY}`,
                transition: "transform .35s cubic-bezier(.2,.8,.2,1)",
                zIndex: isActive ? 30 : isHover ? 20 : 10,
              }}
            >
              <div
                data-eco-float
                style={{
                  borderRadius: 6,
                  // Magenta bei Klick (voll) ODER Hover (subtiler Tint) — Wolfram 15.07.;
                  // sonst maximal transparent (nur hauchdünne Kante).
                  background: isActive
                    ? "linear-gradient(165deg, rgba(255,67,112,0.72) 0%, rgba(255,67,112,0.5) 100%)"
                    : isHover
                    ? "linear-gradient(165deg, rgba(255,67,112,0.42) 0%, rgba(255,67,112,0.28) 100%)"
                    : "transparent",
                  backdropFilter: lit ? "blur(18px) saturate(1.6)" : "blur(2px)",
                  WebkitBackdropFilter: lit ? "blur(18px) saturate(1.6)" : "blur(2px)",
                  boxShadow: isActive
                    ? "inset 0 1px 0 rgba(255,255,255,0.35), 0 14px 30px -16px rgba(255,67,112,0.4)"
                    : isHover
                    ? "inset 0 1px 0 rgba(255,255,255,0.28), 0 10px 24px -16px rgba(255,67,112,0.34)"
                    : "inset 0 0 0 1px rgba(255,255,255,0.09)",
                  transition: "background .28s ease, box-shadow .28s ease, backdrop-filter .28s ease",
                  // Content-Breite (Wolfram 15.07.): nur so breit wie der längste Inhalt,
                  // gedeckelt bei 380px. Kein erzwungenes minWidth mehr.
                  minWidth: 0,
                  maxWidth: "min(380px, 92vw)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setActive(isActive ? null : cat.key)}
                  aria-expanded={isActive}
                  className="flex w-full items-center gap-2 whitespace-nowrap px-3.5 py-1.5 text-left text-[1.15rem] font-semibold uppercase tracking-[0.12em]"
                  style={{ fontFamily: SHARP, color: "rgba(248,247,243,0.9)", cursor: "pointer" }}
                >
                  {cat.label}
                  <span
                    aria-hidden
                    className="ml-auto text-[0.9em]"
                    style={{ opacity: 0.45, transform: isActive ? "rotate(45deg)" : "none", transition: "transform .3s" }}
                  >
                    +
                  </span>
                </button>
                {/* Akkordeon: Companies als CTAs (echte Website-Links, sonst Text) */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isActive ? "1fr" : "0fr",
                    // Eingeklappt KEINE Breite beisteuern (Wolfram 15.07.): sonst zieht der
                    // längste Company-Name die Chip-Breite auf. So ist der Chip nur so breit
                    // wie sein Label; erst beim Aufklappen wächst er auf Content-Breite.
                    width: isActive ? "auto" : 0,
                    transition: "grid-template-rows .45s cubic-bezier(.2,.8,.2,1)",
                  }}
                >
                  <ul className="m-0 min-h-0 list-none overflow-hidden p-0">
                    {/* Kompakter (Wolfram 15.07.): kleinere Zeilen/Padding → auch die
                        11-zeilige Entertainment-Karte passt in den gepinnten Viewport. */}
                    <div className="flex flex-col px-3.5 pb-2 pt-0.5">
                      {cat.companies.map((c) => (
                        <li key={c.name} className="leading-tight">
                          {c.url ? (
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-1 py-[2px] text-[0.98rem] no-underline"
                              style={{ color: PAPER, fontFamily: SHARP, fontWeight: 500 }}
                            >
                              <span className="relative">
                                {c.name}
                                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ background: PAPER }} />
                              </span>
                              <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                          ) : (
                            <span className="inline-block py-[2px] text-[0.98rem]" style={{ color: PAPER, fontFamily: SHARP, fontWeight: 500, opacity: 0.78 }}>
                              {c.name}
                            </span>
                          )}
                        </li>
                      ))}
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* MOBILE-AKKORDEON (Wolfram 17.07., 2. Runde): unter der Satellitengrafik
          erscheinen die Rubriken als Liste, jede Zeile per Tap aufklappbar. Zeilen
          kommen beim Scrollen sukzessive herein (data-eco-acc-row · Stagger im
          Mobile-Timeline). Heike: keine runden Ecken. Trennlinien zwischen den Zeilen
          bleiben (Wolfram 17.07.: helfen beim Unterscheiden der Rubriken). */}
      {isMobile && (
        <div className="mx-auto mt-7 w-full max-w-[560px] px-[6vw]">
          {ECO_CATEGORIES.map((cat) => {
            const isActive = cat.key === active;
            return (
              <div
                key={cat.key}
                data-eco-acc-row
                className="border-t last:border-b"
                style={{ borderColor: "rgba(248,247,243,0.16)" }}
              >
                <button
                  type="button"
                  onClick={() => setActive(isActive ? null : cat.key)}
                  aria-expanded={isActive}
                  className="flex w-full items-center gap-3 py-3.5 text-left text-[1.15rem] font-semibold uppercase tracking-[0.12em]"
                  style={{ fontFamily: SHARP, color: isActive ? MAGENTA : "rgba(248,247,243,0.92)", cursor: "pointer", background: "transparent" }}
                >
                  {cat.label}
                  <span
                    aria-hidden
                    className="ml-auto text-[1.2em]"
                    style={{ opacity: 0.6, color: isActive ? MAGENTA : PAPER, transform: isActive ? "rotate(45deg)" : "none", transition: "transform .3s, color .3s" }}
                  >
                    +
                  </span>
                </button>
                {/* Companies als CTAs (echte Website-Links, sonst Text) */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isActive ? "1fr" : "0fr",
                    transition: "grid-template-rows .42s cubic-bezier(.2,.8,.2,1)",
                  }}
                >
                  <ul className="m-0 min-h-0 list-none overflow-hidden p-0">
                    <div className="flex flex-col gap-0.5 pb-4 pt-0.5">
                      {cat.companies.map((c) => (
                        <li key={c.name} className="leading-tight">
                          {c.url ? (
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-1 py-[3px] text-[1rem] no-underline"
                              style={{ color: PAPER, fontFamily: SHARP, fontWeight: 500 }}
                            >
                              <span className="relative">
                                {c.name}
                                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" style={{ background: PAPER }} />
                              </span>
                              <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                            </a>
                          ) : (
                            <span className="inline-block py-[3px] text-[1rem]" style={{ color: PAPER, fontFamily: SHARP, fontWeight: 500, opacity: 0.78 }}>
                              {c.name}
                            </span>
                          )}
                        </li>
                      ))}
                    </div>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
