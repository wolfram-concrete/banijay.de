"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Testimonial-/CEO-Section nach Birkform „testimonials-2": großes Heading, das
// geclippt hochfährt; darunter ein 2-Spalten-Grid (Bild links 0.8fr, rechts 1.2fr
// mit Rolle, großem Zitat, Name + Outline-CTA). Banijay-Adaption: magentafarbenes
// Panel, das sich VORAB als Parallax aufbaut (steigt beim Reinscrollen), danach
// enthüllt sich der Content (Heading slide-up + Grid fade-in).

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const MAGENTA = "#ff4370";

export function AlgarveCeoTestimonial({
  heading,
  role,
  quote,
  name,
  image,
  cta,
}: {
  heading: string;
  role: string;
  quote: string;
  name: string;
  image: string;
  cta?: { text: string; href: string };
}) {
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLHeadingElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // 1) Magenta-Panel baut sich als Parallax auf (bewegt sich langsamer als der
      //    Scroll → steigt beim Reinscrollen „von unten" ins Bild).
      gsap.fromTo(
        bg.current,
        { yPercent: 18 },
        {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      // 2) Danach Content rein: Heading fährt geclippt hoch, Grid fadet an.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 60%", toggleActions: "play none none none" },
      });
      tl.from(head.current, { yPercent: 145, duration: 0.9, ease: "power3.out" }).from(
        grid.current,
        { opacity: 0, y: "3vw", duration: 0.9, ease: "power2.out" },
        0.18,
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-clip" style={{ background: "#f8f7f3", paddingTop: "5.56vw", paddingBottom: "5.56vw" }}>
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div
          ref={bg}
          className="relative overflow-clip max-[767px]:!p-[8vw]"
          style={{ background: MAGENTA, borderRadius: "1.67vw", padding: "5vw", color: INK, willChange: "transform" }}
        >
          {/* Heading — geclippt, fährt hoch. Etwas mehr Zeilenhöhe + Padding, damit
              Umlaut-/Oberkanten (z. B. „Ü") nicht vom Clip abgeschnitten werden. */}
          <div className="overflow-clip" style={{ marginBottom: "2.4vw", paddingTop: "0.12em" }}>
            <h2
              ref={head}
              className="m-0 uppercase max-[767px]:!text-[13vw]"
              style={{ fontFamily: SHARP, fontSize: "7vw", lineHeight: "118%", fontWeight: 500, letterSpacing: "-0.2vw" }}
            >
              {heading}
            </h2>
          </div>

          {/* Grid: Bild links / Zitat rechts (Birkform 0.8fr / 1.2fr) */}
          <div ref={grid} className="grid items-stretch gap-[4vw] md:grid-cols-[0.8fr_1.2fr] max-[767px]:!gap-[8vw]">
            <div className="overflow-clip" style={{ borderRadius: "1.11vw" }}>
              <img src={image} alt={name} className="h-full w-full object-cover" style={{ aspectRatio: "4 / 5" }} />
            </div>
            <div className="flex flex-col justify-between max-[767px]:!gap-[6vw]" style={{ gap: "2.5vw" }}>
              <div className="flex flex-col" style={{ gap: "1.67vw" }}>
                <span className="max-[767px]:!text-[3vw]" style={{ fontFamily: SHARP, fontSize: "1vw", fontWeight: 700, letterSpacing: "0.06vw", textTransform: "uppercase" }}>
                  {role}
                </span>
                <blockquote
                  className="m-0 max-[767px]:!text-[6vw]"
                  style={{ fontFamily: SHARP, fontSize: "2.6vw", lineHeight: "120%", fontWeight: 500, letterSpacing: "-0.06vw" }}
                >
                  „{quote}“
                </blockquote>
                <span className="max-[767px]:!text-[4vw]" style={{ fontFamily: SHARP, fontSize: "1.2vw", fontWeight: 600 }}>
                  {name}
                </span>
              </div>
              {cta && (
                <a
                  href={cta.href}
                  className="inline-flex w-fit items-center justify-center rounded-full border border-[#0e0d0b] text-[#0e0d0b] no-underline transition-colors duration-300 hover:bg-[#0e0d0b] hover:text-[#f8f7f3] max-[767px]:!text-[3.4vw]"
                  style={{ padding: "0.83vw 1.67vw", fontFamily: SHARP, fontSize: "1.05vw" }}
                >
                  {cta.text}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
