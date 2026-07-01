"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COMPANIES } from "@/data/companies";
import { getCompanyImage } from "@/data/companyImages";

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
  href: c.externalLink,
}));

const N = cards.length;
const STEP_VH = 40; // Scroll-Weg pro weiterer Card
const TOTAL_VH = 300 + Math.max(0, N - 3) * STEP_VH;

export function AlgarveCompaniesScroller() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const wordL = useRef<HTMLHeadingElement>(null);
  const wordR = useRef<HTMLHeadingElement>(null);
  const [pill, setPill] = useState({ x: 0, y: 0, on: false });

  useGSAP(
    () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const els = gsap.utils.toArray<HTMLElement>("[data-work]");
      if (els.length < 3) return;

      // Startlagen: erste drei mittig gestapelt (scale 0), Rest rechts vorbereitet.
      gsap.set(els.slice(0, 3), { scale: 0, xPercent: 0, rotation: 0 });
      els.slice(3).forEach((el, i) => gsap.set(el, { xPercent: 200 + i * 100, scale: 0.8, rotation: 4, opacity: 1 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Wörter fahren groß rein → klein.
      tl.fromTo(wordL.current, { x: "40vw", scale: 5 }, { x: "0vw", scale: 1, ease: "none", duration: 2.2 }, 1.33)
        .fromTo(wordR.current, { x: "-40vw", scale: 5 }, { x: "0vw", scale: 1, ease: "none", duration: 2.2 }, 1.33);

      // Aufbau: die ersten drei Cards skalieren nacheinander aus der Mitte auf.
      tl.to(els.slice(0, 3), { scale: 1, duration: 1.2, stagger: 1.3, ease: "power3.out" }, 1.52);

      // Fächern: Card 1 links, Card 3 rechts, Card 2 mittig.
      tl.to(els[0], { xPercent: -100, scale: 0.8, rotation: -4, duration: 0.88, ease: "none" }, 5.32)
        .to(els[1], { xPercent: 0, scale: 0.9, rotation: 0, duration: 0.88, ease: "none" }, 5.32)
        .to(els[2], { xPercent: 100, scale: 0.8, rotation: 4, duration: 0.88, ease: "none" }, 5.32);

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
              duration: 0.75,
              ease: "none",
            },
            pos,
          );
        });
      }
    },
    { scope: root },
  );

  return (
    <>
      {/* ── Desktop: pinned Works-Bühne ──────────────────────────────────── */}
      <section
        ref={root}
        className="relative overflow-clip max-[767px]:hidden"
        style={{ background: "#f8f7f3", height: `${TOTAL_VH}vh` }}
      >
        <div
          className="sticky top-0 flex w-screen items-end"
          style={{ height: "100vh" }}
          onMouseMove={(e) => setPill({ x: e.clientX, y: e.clientY, on: true })}
          onMouseLeave={() => setPill((p) => ({ ...p, on: false }))}
        >
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

          {/* master-list: 30% breit, mittig; Cards absolut gestapelt */}
          <div ref={track} className="absolute inset-0 m-auto flex items-center justify-center" style={{ width: "30%", height: "80%" }}>
            {cards.map((card) => {
              const Wrap = card.href ? "a" : "div";
              return (
                <Wrap
                  key={card.name}
                  data-work
                  {...(card.href ? { href: card.href, target: "_blank", rel: "noreferrer" } : {})}
                  className="absolute inset-0 m-auto flex flex-col overflow-clip no-underline"
                  style={{
                    width: "100%",
                    height: "80%",
                    borderRadius: "1.11vw",
                    background: "#fff",
                    boxShadow: "0 1px 3px 0 rgba(248,247,243,0.04), 0 2px 30px 0 rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="relative flex flex-1 flex-col items-center justify-end overflow-clip">
                    <img src={card.img} alt={card.name} className="absolute inset-0 h-full w-full object-cover" style={{ borderRadius: "0.3vw" }} />
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
                      <div className="m-0 lowercase" style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "1.39vw", fontWeight: 500, opacity: 0.7 }}>
                        {card.subtext}
                      </div>
                    </div>
                  </div>
                </Wrap>
              );
            })}
          </div>
        </div>

        {/* Mouse-Follow „view project" Pill */}
        <div
          aria-hidden
          className="pointer-events-none fixed z-[1000]"
          style={{
            left: pill.x,
            top: pill.y,
            transform: "translate(-50%, -50%)",
            opacity: pill.on ? 1 : 0,
            transition: "opacity 0.3s ease",
            padding: "0.56vw 0.83vw",
            borderRadius: "999px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            background: "rgba(0,0,0,0.32)",
            color: "#f8f7f3",
            fontSize: "1.05vw",
            lineHeight: "130%",
            whiteSpace: "nowrap",
          }}
        >
          view project
        </div>
      </section>

      {/* ── Mobile: ruhige vertikale Liste ───────────────────────────────── */}
      <section className="hidden max-[767px]:block" style={{ background: "#f8f7f3", padding: "12.8vw 3vw" }}>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="uppercase text-black" style={{ ...H5, fontSize: "7vw" }}>Unsere</h2>
          <h2 className="uppercase text-black" style={{ ...H5, fontSize: "7vw" }}>Companies</h2>
        </div>
        <div className="flex flex-col gap-8">
          {cards.map((card) => {
            const Wrap = card.href ? "a" : "div";
            return (
              <Wrap
                key={card.name}
                {...(card.href ? { href: card.href, target: "_blank", rel: "noreferrer" } : {})}
                className="relative flex flex-col overflow-clip no-underline"
                style={{ height: "78vw", borderRadius: "4vw", background: "#fff", boxShadow: "0 2vw 6vw -2vw rgba(0,0,0,0.2)" }}
              >
                <img src={card.img} alt={card.name} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute bottom-0 flex w-full flex-col items-center text-center" style={{ paddingTop: "20vw", paddingBottom: "5vw", gap: "1vw", backgroundImage: "linear-gradient(0deg, #000, #0000)", color: "#f8f7f3" }}>
                  <h3 className="m-0 uppercase" style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "5.5vw", fontWeight: 500 }}>{card.name}</h3>
                  <div className="m-0 lowercase" style={{ fontSize: "3.6vw", opacity: 0.75 }}>{card.subtext}</div>
                </div>
              </Wrap>
            );
          })}
        </div>
      </section>
    </>
  );
}
