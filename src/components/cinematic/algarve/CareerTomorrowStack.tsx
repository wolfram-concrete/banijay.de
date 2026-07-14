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

      // Parallax: das Bild ist höher als sein Container und wandert gegenläufig zum
      // Scroll → Tiefeneffekt, ohne Kanten freizulegen.
      gsap.fromTo(
        img.current,
        { yPercent: -10 },
        {
          yPercent: 10,
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
        <div className="grid items-center md:grid-cols-[1.05fr_0.95fr] max-[767px]:!grid-cols-1" style={{ columnGap: "5vw", rowGap: "8vw" }}>
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
            {/* Mobil: Bild oberhalb der Copy (Desktop nutzt das Bild in der rechten Spalte). */}
            <div
              data-tm-item
              className="hidden w-full overflow-clip max-[767px]:!my-[2vw] max-[767px]:!block max-[767px]:!aspect-[4/3]"
            >
              <img src={tomorrow.image} alt={tomorrow.headline} className="h-full w-full object-cover" />
            </div>
            <p
              data-tm-item
              className="m-0 max-w-[38vw] max-[767px]:!max-w-full max-[767px]:!text-[4vw]"
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

          {/* ── Bild rechts (mit Parallax; höher als der Container) — nur Desktop.
              Mobil sitzt das Bild oberhalb der Copy (siehe Textspalte). ─────── */}
          <div className="relative overflow-clip max-[767px]:!hidden" style={{ aspectRatio: "5 / 6" }}>
            <img
              ref={img}
              src={tomorrow.image}
              alt={tomorrow.headline}
              className="absolute inset-x-0 w-full object-cover"
              style={{ top: "-18%", height: "136%", willChange: "transform" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
