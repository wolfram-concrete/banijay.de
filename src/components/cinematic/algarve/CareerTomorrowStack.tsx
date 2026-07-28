"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CAREER } from "@/data/career";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// BANIJAY TOMORROW — ruhige 2-Spalten-Feature-Section auf Off-White: Bild rechts,
// Text (Eyebrow · Headline · Copy · CTA) links. Beim Scrollen läuft eine dezente
// Parallax: das Bild bewegt sich gegenläufig zum Scroll (Tiefe), die Text-Spalte
// leicht entgegengesetzt; die Text-Elemente faden beim Eintritt gestaffelt ein.
// (Die frühere bunte Standorte-/Fächer-Stapel-Lösung wurde verworfen.)

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";
const MAGENTA = "#ff4370";

export function AlgarveCareerTomorrowStack() {
  const { tomorrow } = CAREER;
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Parallax: GEDÄMPFT auf ±4 % (vorher ±10 % bei einem 136 % hohen Bild).
      // Grund (Wolfram 16.07.): Das Keyvisual hat Typo („All lights on you") und die
      // B-Marke einkomponiert — ein Bild, das größer als sein Container ist, würde sie
      // anschneiden. Der Container hat jetzt die native Ratio des Visuals, das Bild
      // liegt mit scale 1.12 darin → 6 % Spielraum je Kante. ±4 % bleiben sicher
      // darunter, es entsteht Tiefe ohne Beschnitt.
      // scale gehört in den Tween, nicht ins style-Attribut: GSAP verwaltet die
      // transform-Kette selbst und würde ein Inline-transform überschreiben.
      gsap.fromTo(
        img.current,
        { yPercent: -4, scale: 1.12 },
        {
          yPercent: 4,
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      // Text-Spalte leicht entgegengesetzt — subtiler zweiter Parallax-Layer.
      gsap.fromTo(
        "[data-tm-text]",
        { yPercent: 5 },
        {
          yPercent: -5,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      // Entrance: Text-Elemente faden gestaffelt herein.
      gsap.from("[data-tm-item]", {
        autoAlpha: 0,
        y: 42,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-clip" style={{ background: "transparent", paddingTop: "8vw", paddingBottom: "8vw" }}>
      <div className="mx-auto max-[767px]:!px-[5vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
        <div className="grid md:items-start md:grid-cols-[1.18fr_0.82fr] max-[767px]:!grid-cols-1" style={{ columnGap: "5vw", rowGap: "8vw" }}>
          {/* ── Text-Spalte ────────────────────────────────────────────────── */}
          <div data-tm-text className="flex flex-col items-start" style={{ gap: "2vw" }}>
            <span
              data-tm-item
              className="max-[767px]:!text-[3vw]"
              style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.12vw", textTransform: "uppercase", color: MAGENTA }}
            >
              {tomorrow.eyebrow}
            </span>
            <h2
              data-tm-item
              className="m-0 max-[767px]:!text-[8vw]"
              style={{ fontFamily: SHARP, fontSize: "3.2vw", lineHeight: "106%", fontWeight: 500, letterSpacing: "-0.1vw", color: PAPER }}
            >
              {tomorrow.headline}
            </h2>
            {/* Mobil: Bild oberhalb der Copy (Desktop nutzt das Bild in der rechten
                Spalte). Ratio = native Visual-Ratio statt der früheren 4:3 — sonst
                würde das Keyvisual seitlich beschnitten. */}
            <div
              data-tm-item
              className="hidden w-full overflow-clip max-[767px]:!my-[2vw] max-[767px]:!block"
              style={{ aspectRatio: String(tomorrow.imageAspect) }}
            >
              <img src={tomorrow.image} alt={tomorrow.headline} className="h-full w-full object-cover" />
            </div>
            <p
              data-tm-item
              className="m-0 max-w-[46vw] max-[767px]:!max-w-full max-[767px]:!text-[4vw]"
              style={{ fontSize: "1.25vw", lineHeight: "150%", color: "rgba(248,247,243,0.66)" }}
            >
              {tomorrow.text}
            </p>
            <a
              data-tm-item
              href={tomorrow.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-[6px] bg-transparent text-[#f8f7f3] no-underline transition-colors duration-300 hover:bg-[#ff4370] hover:text-[#f8f7f3] max-[767px]:!mt-[2vw] max-[767px]:!px-[6vw] max-[767px]:!py-[3vw] max-[767px]:!text-[3.6vw]"
              style={{ border: "1px solid #f8f7f3", padding: "0.95vw 1.9vw", fontFamily: SHARP, fontSize: "1.05vw", fontWeight: 500, marginTop: "0.8vw" }}
            >
              {tomorrow.cta.text}
              <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.6vw] max-[767px]:!w-[3.6vw]" />
            </a>
          </div>

          {/* ── Bild rechts (mit gedämpftem Parallax) — nur Desktop. Mobil sitzt das
              Bild oberhalb der Copy (siehe Textspalte).
              FULL-BLEED RECHTS (Wolfram 21.07.): Der Container bricht aus dem zentrierten
              max-w-1440-/2vw-Raster nach rechts bis an die Viewport-Kante aus (negative
              marginRight = Distanz Content-Rechtskante → Screenrand: min(720px,50vw) −
              50vw − 2vw). Vertikal `self-stretch` → das Bild füllt die volle Höhe der
              Textspalte (oben bei der Headline, unten bündig mit der Copy/CTA) statt der
              früheren fixen 1,951:1-Box. object-cover übernimmt den nun höheren Ausschnitt. */}
          <div
            className="relative self-start overflow-clip max-[767px]:!hidden"
            // marginTop (Wolfram 24.07.): der Bildcontainer sitzt nicht mehr oben auf
            // Höhe der Headline, sondern deutlich tiefer — startet erst unterhalb der
            // Headline (etwa auf Höhe des Copytexts).
            style={{ aspectRatio: String(tomorrow.imageAspect), marginRight: "calc(min(720px, 50vw) - 50vw - 2vw)", marginTop: "7vw" }}
          >
            <img
              ref={img}
              src={tomorrow.image}
              alt={tomorrow.headline}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ transform: "scale(1.12)", willChange: "transform" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
