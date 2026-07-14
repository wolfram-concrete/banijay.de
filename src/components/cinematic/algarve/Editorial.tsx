"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./DustLayer";
import { EditorialStickyScene } from "./EditorialStickyScene";

gsap.registerPlugin(ScrollTrigger, useGSAP);


// EDITORIAL-SECTION (Task #56, Wolfram 13.07.) — Marcus zur Historie und
// Zukunft von Banijay, Anlass: Abschluss der Fusion Banijay Entertainment +
// All3Media (09.07.2026). Aufbau nach der BYQ-„cms-page-2"-Referenz:
//   headline-article → article-halves (Meta links / Bild+Lead+Summary+Liste
//   rechts) → Bild-MARQUEE full-width → Bottom-Text + CTAs.
// Dark/Mood-adaptiert: Container ECKIG (Heike), Summary als glass-panel,
// Marquee-Bilder grayscale mit Color-Hover (wie Referenz).
// ⚠️ WORDING: Entwurf, abgewandelt aus banijay.com-Blog (09.07.2026) und
// DWDL-Meldung zur Fusion — final via Heike (#58). Zitate sind ECHTE Zitate
// (Bassetti/Zucker, übersetzt). Kein erfundenes Marcus-Zitat.

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";
const SOFT = "rgba(248,247,243,0.62)";

// Marquee (Umbau 13.07.): Marcus-Bilder raus — stattdessen Produktions-/
// Festival-Material. ⚠️ Für die All3Media-Produktionen (filmpool, South &
// Browse) liegt noch KEIN Bildmaterial im Projekt (nur Logos) — sobald
// Stills geliefert sind, hier ergänzen.
const MARQUEE_IMAGES = [
  { src: "/about-partners/live-experience-cologne-comedy-festival.jpg", alt: "Cologne Comedy Festival", big: true },
  { src: "/grid/g12.jpg", alt: "Cologne Comedy Festival", big: false },
  { src: "/editorial/studio.jpg", alt: "Produktion im Banijay-Netzwerk", big: false },
];


export function AlgarveEditorial() {
  const root = useRef<HTMLElement>(null);

  // ENTRANCE-CHOREOGRAFIE (Wolfram 13.07., „spektakulärer"):
  //  ① Headline-Zeilen schieben sich aus Masken hoch (power4), das magenta
  //     „&" poppt mit Overshoot-Dreher hinterher
  //  ② das Hochkant-Porträt WISCHT von unten auf (clip-path) und settelt
  //     aus einem 1.25er-Zoom
  //  ③ Lead, Story-Panel, Marquee, Bottom staffeln als Blöcke herein
  //  ④ die „Blick nach vorn"-Punkte ticken einzeln von links ein
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // HEADLINE wie das AnimatedHeading-Modul über der Companies-Liste
      // (Wolfram 13.07.): zwei uppercase-Zeilen konvergieren gescrubbt — obere
      // von oben, untere von unten — mit zentral aufwachsendem Sternstaub.
      const vh = window.innerHeight;
      const hFirst = root.current?.querySelector<HTMLElement>("[data-ed-hl-first]");
      const hLast = root.current?.querySelector<HTMLElement>("[data-ed-hl-last]");
      const hDust = root.current?.querySelector<HTMLElement>("[data-ed-head-dust]");
      if (hFirst && hLast) {
        const htl = gsap.timeline({
          scrollTrigger: { trigger: "[data-ed-head]", start: "top bottom", end: "bottom 90%", scrub: 0.8 },
        });
        htl
          .from(hFirst, { y: -0.15 * vh, ease: "none", duration: 1 }, 0)
          .from(hLast, { y: 0.15 * vh, ease: "none", duration: 1 }, 0);
        if (hDust) {
          htl.fromTo(
            hDust,
            { autoAlpha: 0, scale: 0.55, transformOrigin: "50% 50%" },
            { autoAlpha: 0.7, scale: 1, ease: "power2.out", duration: 0.8 },
            0.1,
          );
        }
      }

      // Das Bild-Modul lebt jetzt in <EditorialStickyScene /> (eigene Sticky-
      // Scroll-Interaktion nach stateofaidesign.com — Wolfram 14.07.).

      gsap.set("[data-ed-reveal]", { autoAlpha: 0, y: 56 });
      ScrollTrigger.batch("[data-ed-reveal]", {
        start: "top 86%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14, ease: "power3.out" }),
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden" style={{ background: "transparent", color: PAPER, paddingTop: "8vw", paddingBottom: "8vw" }}>
      {/* Sternenstaub rechts oben (Wolfram 13.07.) — Lichtfeld in der Ecke,
          weich maskiert; die Inhalte liegen darüber (z-1). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          zIndex: 0,
          maskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 88%, transparent 100%)",
        }}
      >
        <DustLayer boost={0.85} center={{ x: 0.85, y: 0.08 }} radius={0.75} />
      </div>

      <div className="relative z-[1] mx-auto" style={{ maxWidth: "1800px", paddingLeft: "2vw", paddingRight: "2vw" }}>
        {/* headline-article — ZEITLOS (13.07.): kein Eyebrow, kein Datum.
            Optik wie die Headline über der Companies-Liste (AnimatedHeading,
            Wolfram 13.07.): zentriert, uppercase, groß; die zwei Zeilen
            konvergieren gescrubbt (obere von oben, untere von unten) auf
            zentralem Sternstaub. */}
        <div
          data-ed-head
          className="relative flex flex-col items-center justify-center overflow-clip text-center"
          style={{ marginBottom: "2vw", minHeight: "min(46vh, 440px)" }}
        >
          {/* zentraler Sternstaub hinter der Headline (wächst mit dem Scrub) */}
          <div
            data-ed-head-dust
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0"
            style={{
              maskImage: "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
            }}
          >
            <DustLayer boost={0.85} center={{ x: 0.5, y: 0.5 }} radius={0.6} />
          </div>
          <h2
            className="relative m-0"
            style={{
              fontFamily: SHARP,
              fontSize: "7vw",
              lineHeight: "112%",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            {/* kein per-Zeilen-overflow-hidden → die Ä-Punkte bleiben sichtbar;
                der Translate wird vom overflow-clip des Panels gefasst. */}
            <span data-ed-hl-first className="block">About</span>
            <span data-ed-hl-last className="block">Banijay.</span>
          </h2>
        </div>

        {/* BILD-MODUL als Sticky-Scroll-Interaktion (stateofaidesign-Vorbild) */}
        <EditorialStickyScene />

        {/* ARTIKELTEXT — folgt unter dem Bild-Modul */}
        <div className="flex flex-col md:mx-auto md:max-w-[84%]" style={{ gap: "clamp(2.5rem, 5vw, 6rem)" }}>
            {/* Marcus-Zitat (Original banijay.de, Wolfram 14.07.) */}
            <blockquote data-ed-reveal className="m-0" style={{ fontFamily: SHARP, fontSize: "clamp(1.4rem, 2.6vw, 2.8rem)", lineHeight: "118%", fontWeight: 500, letterSpacing: "-0.02em" }}>
              „Wir bei Banijay sind ein Verbund der besten unabhängigen Entertainment-Produzenten und Unternehmer. Wir bieten Unterhaltung, über die ganz Deutschland spricht."
              <span className="mt-4 block" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.2rem)", fontWeight: 500, color: SOFT }}>
                — Marcus Wolter, CEO Banijay Germany
              </span>
            </blockquote>
        </div>

        {/* „Die Story" — bündig mit dem „deutsche Netzwerk"-Text unter dem Slider
            (Wolfram 14.07.): dasselbe [1fr_3fr]-Raster wie der Bottom-Text, damit die
            linke Kante exakt übereinstimmt. Dünne weiße Linie oberhalb bleibt. */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_3fr]" style={{ marginTop: "clamp(2.5rem, 5vw, 6rem)" }}>
          <div className="max-md:hidden" />
          <div
            data-ed-reveal
            className="flex flex-col"
            style={{ gap: "1.6rem", paddingTop: "2.4rem", borderTop: "1px solid rgba(248,247,243,0.28)" }}
          >
            <h3 className="m-0" style={{ fontFamily: SHARP, fontSize: "clamp(1.3rem, 2.2vw, 2.2rem)", fontWeight: 500, color: PAPER }}>
              Die Story
            </h3>
            <div className="flex flex-col gap-4" style={{ fontSize: "clamp(1rem, 1.25vw, 1.35rem)", lineHeight: "145%", color: "rgba(248,247,243,0.82)" }}>
              <p className="m-0">
                Banijay ist seit 2008 konsequent als Verbund unternehmerisch geführter Produktionshäuser gewachsen — zuletzt 2020 mit dem Zusammenschluss mit Endemol Shine. In Deutschland entstand daraus ein Ökosystem eigenständiger Companies: Produktionshäuser, Labels und Plattformen, die Entertainment auf Bildschirme, Bühnen und in Feeds bringen — vom Prime-Time-Format bis zum Podcast.
              </p>
              <p className="m-0">
                Jetzt folgt der größte Schritt dieser Geschichte: Banijay Entertainment und All3Media bilden ein gemeinsames Haus — als 50/50-Joint-Venture der Banijay Group und RedBird IMI. Dahinter stehen 170 Companies in 25 Ländern, mehr als 265.000 Programmstunden und Formate wie MasterChef, The Traitors, Big Brother oder Peaky Blinders. „Gemeinsam beginnen wir ein neues Kapitel als globales Medien- und Entertainment-Powerhouse", sagt CEO Marco Bassetti.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bild-Marquee full-width (Referenz: marquee cms-marquee) */}
      <div data-ed-reveal className="relative z-[1] w-full overflow-clip" style={{ marginTop: "6vw", marginBottom: "6vw" }}>
        <div className="editorial-marquee-track flex" style={{ gap: "1.2vw" }}>
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex shrink-0" style={{ gap: "1.2vw" }}>
              {MARQUEE_IMAGES.map((img) => (
                <div
                  key={`${dup}-${img.src}`}
                  className="editorial-marquee-item shrink-0 overflow-hidden"
                  style={{ width: img.big ? "min(42vw, 720px)" : "min(26vw, 460px)", height: "min(28vw, 480px)" }}
                >
                  <img src={img.src} alt={dup === 0 ? img.alt : ""} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: "50% 25%" }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom-Text + CTAs (Referenz: article-halves + bottom-button-wrap) */}
      <div className="relative z-[1] mx-auto" style={{ maxWidth: "1800px", paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_3fr]">
          <div className="max-md:hidden" />
          <div data-ed-reveal className="flex flex-col" style={{ gap: "3rem" }}>
            <div className="flex flex-col gap-4" style={{ fontSize: "clamp(1rem, 1.25vw, 1.35rem)", lineHeight: "145%", color: "rgba(248,247,243,0.85)" }}>
              <p className="m-0">
                Für das deutsche Netzwerk ist die Fusion vor allem eins: Zuwachs an Handschriften. Mit filmpool kommt jahrzehntelange Fiction- und Factual-Kompetenz dazu, mit South &amp; Browse eine weitere eigenständige Produzentenstimme — Companies, die das Ökosystem breiter machen, ohne seine Logik zu ändern: eigenständige Häuser, ein gemeinsames System.
              </p>
              <p className="m-0">
                Die Zukunft bleibt dezentral: Banijay Entertainment setzt auf ländergeführte Strukturen — Entscheidungen fallen dort, wo die Inhalte entstehen. Für Deutschland heißt das: Das Ökosystem um CEO Marcus Wolter wächst aus eigener Kraft weiter — jetzt mit über 40 Companies unter einem Dach.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
