"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { HOME } from "@/data/home";
import { homeStats } from "@/data/site";

// Phase-2-Hero im Algarve-Duktus: große typografische Kinetik.
// „WE ARE" oben (3D-Flip), „BANIJAY" riesig (Clip-Reveal von unten),
// darunter Zahlen links + Markenbotschaft rechts. Hell/editorial.

export function KineticHero() {
  const root = useRef<HTMLElement>(null);
  const stats = homeStats().slice(0, 4);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set("[data-hero-anim]", { opacity: 1, y: 0, rotateX: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-flip]", {
        rotateX: -92,
        y: 30,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        transformOrigin: "50% 100%",
      })
        .from(
          "[data-rise]",
          { yPercent: 110, duration: 1.2, stagger: 0.08 },
          "-=0.7",
        )
        .from(
          "[data-fade]",
          { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 },
          "-=0.7",
        );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-[2vw] pb-[2.5vw] pt-[12vh]"
      style={{ background: "var(--bj-paper)", color: "var(--bj-ink)" }}
    >
      {/* WE ARE — Top-Row, 3D-Flip */}
      <div className="flip-3d flex items-start justify-between leading-none">
        {["We", "are"].map((word) => (
          <h1
            key={word}
            data-hero-anim
            data-flip
            className="m-0 font-medium uppercase tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.6rem, 10vw, 11rem)", lineHeight: 0.82 }}
          >
            {word}
          </h1>
        ))}
      </div>

      {/* BANIJAY — riesig, randvoll auf volle Viewport-Breite (Clip-Reveal).
          -mx-[2vw] bleedet über das Section-Padding hinaus; overflow:hidden der
          Clip-Maske verhindert horizontalen Scrollbalken. */}
      <div className="kinetic-clip -mx-[2vw] -mt-[1vw] self-stretch">
        <h2
          data-hero-anim
          data-rise
          className="m-0 whitespace-nowrap font-medium uppercase leading-[0.78] tracking-[-0.04em] text-[var(--bj-coral)]"
          style={{ fontSize: "22.3vw" }}
        >
          Banijay
        </h2>
      </div>

      {/* Zahlen links + Markenbotschaft rechts */}
      <div className="mt-[3vw] flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <ul className="hidden flex-col gap-0.5 sm:flex" style={{ maxWidth: "40vw" }}>
          {stats.map((s) => (
            <li
              key={s.label}
              data-hero-anim
              data-fade
              className="text-[clamp(0.85rem,1.35vw,1.05rem)] leading-tight"
            >
              <span className="font-medium">{s.value}</span>{" "}
              <span className="text-black/55">{s.label}</span>
            </li>
          ))}
        </ul>
        <p
          data-hero-anim
          data-fade
          className="text-[clamp(0.95rem,1.35vw,1.1rem)] leading-snug text-black/70 sm:max-w-[32vw] sm:text-right"
        >
          {HOME.hero.headline}
        </p>
      </div>
    </section>
  );
}
