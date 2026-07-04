"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Subpage-Hero (alle Seiten außer Home). Boldere, zweizeilige H1, die sich beim
// Laden aufbaut. Beim Scrollen wächst der (schmale) Video-Container in dieser
// Reihenfolge: 1) in die HÖHE über die H1 (die dabei auf Weiß invertiert und
// stehen bleibt), 2) in die BREITE, 3) auf Full-Screen — dann still. Danach der
// Body-Text als große, schwarze, einscrollende Typo (wie Home-Section 3).

const PAPER = "#f8f7f3";
const INK = "#0e0d0b";
const SHARP = "var(--font-sharp), sans-serif";

// b-Balken-Startform (Banijay-Logo-Element „Element 1.svg"): rechts eine volle
// Halbkreis-Rundung, links kleine obere + scharfe untere Ecke. Der Video-/Farb-
// Container startet in DIESER Form; beim Aufskalieren flacht der vh-fixe Radius von
// selbst ab (die Curvings wandern in die Kanten), der finale Schritt setzt alle
// Ecken auf 0 → Full-Screen.
// DESKTOP (unverändert): Original-b-/„D"-Form (rechts voller Halbkreis, links kleine
// obere + scharfe untere Ecke). MOBILE: normaler Kasten mit dezent radialen Ecken.
// Auswahl passiert per matchMedia in useGSAP (SSR-Default = Desktop = B_SHAPE_RADIUS).
const B_SHAPE_RADIUS = {
  borderTopLeftRadius: "1.8vh",
  borderBottomLeftRadius: "0vh",
  borderTopRightRadius: "15vh",
  borderBottomRightRadius: "15vh",
} as const;
const ROUND_RADIUS = {
  borderTopLeftRadius: "2.4vh",
  borderBottomLeftRadius: "2.4vh",
  borderTopRightRadius: "2.4vh",
  borderBottomRightRadius: "2.4vh",
} as const;
// SSR-/Reduced-Motion-Default (Desktop-Form).
const B_RADIUS = B_SHAPE_RADIUS;
const FLAT_RADIUS = {
  borderTopLeftRadius: "0vh",
  borderTopRightRadius: "0vh",
  borderBottomRightRadius: "0vh",
  borderBottomLeftRadius: "0vh",
} as const;

export function AlgarvePageHero({
  headline,
  body,
  image,
  video = "/video/showreel.mp4",
  highlights = [],
}: {
  headline: string;
  /** Optional — Seiten übergeben es noch; das seitliche Hero-Label wurde entfernt. */
  label?: string;
  body: string;
  image: string;
  video?: string;
  /** Wörter, die im Body-Statement magenta hervorgehoben werden (Wortkern-Match,
   *  Satzzeichen werden ignoriert). */
  highlights?: string[];
}) {
  const root = useRef<HTMLDivElement>(null);
  // Wortkern (nur Buchstaben + Bindestrich, lowercase) → für Highlight-Abgleich.
  const core = (w: string) => w.replace(/[^\p{L}-]/gu, "").toLowerCase();
  const hlSet = new Set(highlights.map(core));

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // 1) Headline baut sich auf (beim Laden), Zeile für Zeile hoch.
      gsap.from("[data-h1-line] > span", {
        yPercent: 125,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.15,
      });

      if (reduce) {
        gsap.set("[data-hero-card]", { display: "none" });
        return;
      }

      // 2) Gepinnte Choreografie: Aus dem kleinen Video-Container skalieren sich
      //    nacheinander (versetzt) Farbcontainer auf FULL-SCREEN (Orchid → Gelb →
      //    Blau → MAGENTA zuletzt) — mit radialen (abgerundeten) Kanten. Danach macht
      //    der Video-Container seinen bekannten Zoom: erst in die HÖHE, dann in die
      //    BREITE, dann Full-Screen (borderRadius am Ende 0).
      // Desktop bleibt exakt wie zuvor (kleiner b-Container, 40vw×30vh, b-Form).
      // Nur Mobile: größerer, zentrierter Kasten mit runden Ecken.
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const START = isMobile
        ? { left: "20vw", top: "46vh", width: "60vw", height: "45vh" }
        : { left: "30vw", top: "56vh", width: "40vw", height: "30vh" };
      const START_RADIUS = isMobile ? ROUND_RADIUS : B_SHAPE_RADIUS;
      const FULL = { left: "0vw", top: "0vh", width: "100vw", height: "100vh" };
      gsap.set(["[data-hero-card]", "[data-hero-media]"], { ...START, ...START_RADIUS });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-hero-stage]",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Farbkarten der Reihe nach auf Full-Screen (unterschiedliche Startpunkte).
      const cards = gsap.utils.toArray<HTMLElement>("[data-hero-card]");
      const starts = [0, 0.14, 0.28, 0.42];
      cards.forEach((card, i) => {
        tl.to(card, { ...FULL, ...FLAT_RADIUS, ease: "power2.in", duration: 0.26 }, starts[i] ?? i * 0.14);
      });

      tl
        // H1 invertiert auf Weiß, sobald die Farbflächen dahinterliegen.
        .to("[data-hero-h1]", { color: PAPER, ease: "none", duration: 0.12 }, 0.58)
        // Video-Container: erst in die HÖHE …
        .to("[data-hero-media]", { top: "36vh", height: "52vh", ease: "none", duration: 0.16 }, 0.72)
        // … dann in die BREITE (steigt hoch) …
        .to("[data-hero-media]", { top: "8vh", left: "0vw", width: "100vw", height: "84vh", ease: "none", duration: 0.2 }, 0.9)
        .to("[data-hero-scrim]", { opacity: 0.45, ease: "none", duration: 0.2 }, 0.9)
        // … dann Full-Screen: die letzten b-Curvings flachen in die Kanten aus.
        .to("[data-hero-media]", { top: "0vh", height: "100vh", ...FLAT_RADIUS, ease: "none", duration: 0.16 }, 1.12);

      // Mobile: kurzer Scroll-Break, NACHDEM das Video full-size eingerastet ist —
      // damit man nicht sofort weiterscrollt. Ein leerer Hold-Beat verlängert die
      // Timeline; die gescrubbte Pin-Strecke bekommt so am Ende ein Stück, in dem das
      // Video full-size STEHT, bevor der Scroll in die nächste Section übergeht.
      if (isMobile) {
        tl.to({}, { duration: 0.35 }, 1.28);
      }

      // 3) Body-Statement darunter: Wort-für-Wort-Enthüllung wie die Home-AboutIntro
      //    (opacity 0→1 + leichtes Anheben, stagger amount 1 in Leserichtung, scrub).
      gsap.set("[data-hero-word]", { willChange: "transform, opacity", backfaceVisibility: "hidden" });
      gsap.from("[data-hero-word]", {
        opacity: 0,
        yPercent: 30,
        ease: "none",
        stagger: { amount: 1, from: "start" },
        scrollTrigger: { trigger: "[data-hero-body]", start: "top 80%", end: "top 30%", scrub: 1 },
      });
    },
    { scope: root },
  );

  const lines = headline.split("\n");
  const words = body.split(" ");

  return (
    <div ref={root} style={{ background: PAPER }}>
      {/* ── Gepinnte Bühne ─────────────────────────────────────────────── */}
      <section data-hero-stage style={{ position: "relative", height: "300vh" }}>
        <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>
          {/* Farbcontainer: skalieren nacheinander aus dem Video-Container auf
              Full-Screen — mit radialen (abgerundeten) Kanten. Reihenfolge =
              DOM-Reihenfolge, Magenta zuletzt (oben). Startlage per GSAP. */}
          {["#e71d7d", "#2e37c9", "#065dff", "#16c8ff", "#ff4370"].map((c) => (
            <div
              key={c}
              data-hero-card
              aria-hidden
              className="absolute"
              style={{ left: "30vw", top: "56vh", width: "40vw", height: "30vh", background: c, zIndex: 1, ...B_RADIUS }}
            />
          ))}

          {/* Headline (liegt über dem Video, invertiert beim Aufwachsen) */}
          <div
            data-hero-h1
            className="absolute inset-x-0 flex flex-col items-center text-center"
            style={{ top: "10vh", paddingLeft: "2vw", paddingRight: "2vw", zIndex: 3, color: INK }}
          >
            {lines.map((ln, i) => (
              <span
                key={i}
                data-h1-line
                className="block overflow-hidden"
                // Das overflow-hidden (für die Clip-Reveal-Animation) würde die
                // Umlaut-Striche von Großbuchstaben (Ä/Ö/Ü, z. B. „LÄUFT") oben
                // abschneiden. paddingTop gibt der Clip-Box oben Luft, das negative
                // marginTop zieht die Zeile wieder an ihre Position — Umlaut bleibt
                // sichtbar, Zeilenabstand unverändert. Skaliert mit der Font-Größe.
                style={{ paddingTop: "clamp(0.45rem, 1.6vw, 2rem)", marginTop: "calc(-1 * clamp(0.45rem, 1.6vw, 2rem))" }}
              >
                <span
                  className="block uppercase max-[767px]:!text-[14vw]"
                  style={{
                    fontFamily: SHARP,
                    fontWeight: 500,
                    fontSize: "clamp(2.5rem, 8.5vw, 11rem)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {ln}
                </span>
              </span>
            ))}
          </div>

          {/* Video-Container (schmal → Höhe → Breite → Full-Screen) */}
          <div
            data-hero-media
            className="absolute overflow-hidden"
            style={{ zIndex: 2, left: "30vw", top: "56vh", width: "40vw", height: "30vh", ...B_RADIUS }}
          >
            <video autoPlay muted loop playsInline poster={image} className="absolute inset-0 h-full w-full object-cover">
              <source src={video} type="video/mp4" />
            </video>
            <div data-hero-scrim className="absolute inset-0" style={{ background: "#000", opacity: 0.2 }} />
          </div>
        </div>
      </section>

      {/* ── Body-Statement (schwarze, einscrollende Typo) ──────────────── */}
      <section
        data-hero-body
        style={{ paddingTop: "8.33vw", paddingBottom: "8.33vw", paddingLeft: "2vw", paddingRight: "2vw" }}
      >
        <p
          className="m-0 max-w-[63.33vw] max-[767px]:!max-w-full max-[767px]:!text-[7vw]"
          style={{
            fontFamily: SHARP,
            fontWeight: 500,
            fontSize: "3.33vw",
            lineHeight: "120%",
            letterSpacing: "-0.094vw",
            color: INK,
          }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              data-hero-word
              style={{ display: "inline-block", whiteSpace: "pre", color: hlSet.has(core(w)) ? "#ff4370" : undefined }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </section>
    </div>
  );
}
