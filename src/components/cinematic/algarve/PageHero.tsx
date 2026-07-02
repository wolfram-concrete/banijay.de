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

export function AlgarvePageHero({
  headline,
  label,
  body,
  image,
  video = "/video/showreel.mp4",
}: {
  headline: string;
  label: string;
  body: string;
  image: string;
  video?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

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

      gsap.set("[data-hero-label]", { autoAlpha: 0 });

      // 2) Gepinnte Choreografie: Aus dem kleinen Video-Container skalieren sich
      //    nacheinander (versetzt) Farbcontainer auf FULL-SCREEN (Orchid → Gelb →
      //    Blau → MAGENTA zuletzt) — mit radialen (abgerundeten) Kanten. Danach macht
      //    der Video-Container seinen bekannten Zoom: erst in die HÖHE, dann in die
      //    BREITE, dann Full-Screen (borderRadius am Ende 0).
      const START = { left: "30vw", top: "56vh", width: "40vw", height: "30vh" };
      const FULL = { left: "0vw", top: "0vh", width: "100vw", height: "100vh" };
      gsap.set(["[data-hero-card]", "[data-hero-media]"], START);

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
        tl.to(card, { ...FULL, ease: "power2.in", duration: 0.26 }, starts[i] ?? i * 0.14);
      });

      tl
        // H1 invertiert auf Weiß, sobald die Farbflächen dahinterliegen.
        .to("[data-hero-h1]", { color: PAPER, ease: "none", duration: 0.12 }, 0.58)
        .to("[data-hero-label]", { autoAlpha: 1, ease: "none", duration: 0.1 }, 0.66)
        // Video-Container: erst in die HÖHE …
        .to("[data-hero-media]", { top: "36vh", height: "52vh", ease: "none", duration: 0.16 }, 0.72)
        // … dann in die BREITE (steigt hoch) …
        .to("[data-hero-media]", { top: "8vh", left: "0vw", width: "100vw", height: "84vh", ease: "none", duration: 0.2 }, 0.9)
        .to("[data-hero-scrim]", { opacity: 0.45, ease: "none", duration: 0.2 }, 0.9)
        // … dann Full-Screen (harte Kante).
        .to("[data-hero-media]", { top: "0vh", height: "100vh", borderRadius: "0vw", ease: "none", duration: 0.16 }, 1.12)
        // Weißes Hero-Label blendet aus → Übergabe ans Docked-Label unter MENU.
        .to("[data-hero-label]", { autoAlpha: 0, ease: "none", duration: 0.1 }, 1.24);

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
          {["#c77dff", "#ffd60a", "#4361ee", "#ff4370"].map((c) => (
            <div
              key={c}
              data-hero-card
              aria-hidden
              className="absolute"
              style={{ left: "30vw", top: "56vh", width: "40vw", height: "30vh", background: c, zIndex: 1, borderRadius: "1.67vw" }}
            />
          ))}

          {/* Headline (liegt über dem Video, invertiert beim Aufwachsen) */}
          <div
            data-hero-h1
            className="absolute inset-x-0 flex flex-col items-center text-center"
            style={{ top: "10vh", paddingLeft: "2vw", paddingRight: "2vw", zIndex: 3, color: INK }}
          >
            {lines.map((ln, i) => (
              <span key={i} data-h1-line className="block overflow-hidden">
                <span
                  className="block uppercase"
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
            style={{ zIndex: 2, left: "30vw", top: "56vh", width: "40vw", height: "30vh", borderRadius: "1.67vw" }}
          >
            <video autoPlay muted loop playsInline poster={image} className="absolute inset-0 h-full w-full object-cover">
              <source src={video} type="video/mp4" />
            </video>
            <div data-hero-scrim className="absolute inset-0" style={{ background: "#000", opacity: 0.2 }} />
          </div>

          {/* Label rechtsbündig auf der Bildachse (erscheint erst breit) */}
          <div
            data-hero-label
            className="absolute text-right uppercase max-[767px]:!text-[2.6vw]"
            style={{
              zIndex: 4,
              right: "3vw",
              top: "50%",
              transform: "translateY(-50%)",
              color: PAPER,
              fontFamily: SHARP,
              fontWeight: 700,
              fontSize: "0.9vw",
              letterSpacing: "0.16em",
              textShadow: "0 1px 14px rgba(0,0,0,0.55)",
            }}
          >
            {label}
          </div>
        </div>
      </section>

      {/* ── Body-Statement (schwarze, einscrollende Typo) ──────────────── */}
      <section
        data-hero-body
        style={{ paddingTop: "8.33vw", paddingBottom: "8.33vw", paddingLeft: "2vw", paddingRight: "2vw" }}
      >
        <p
          className="m-0 max-[767px]:!text-[7vw]"
          style={{
            maxWidth: "63.33vw",
            fontFamily: SHARP,
            fontWeight: 500,
            fontSize: "3.33vw",
            lineHeight: "120%",
            letterSpacing: "-0.094vw",
            color: INK,
          }}
        >
          {words.map((w, i) => (
            <span key={i} data-hero-word style={{ display: "inline-block", whiteSpace: "pre" }}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </section>
    </div>
  );
}
