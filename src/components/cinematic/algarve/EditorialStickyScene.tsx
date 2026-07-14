"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// EDITORIAL STICKY-SCROLL (Wolfram 14.07., Vorbild stateofaidesign.com):
// 150vh-Section mit sticky 100vh-Wrapper. Das Bild kommt von unten (translateY
// 600 / scale 1.5) herein und settelt (→ 0 / 1); danach zieht sich der Bild-
// container nach links zusammen und von rechts fährt eine 470px-Fact-Spalte
// (zwei Cards) herein, deren Zahlen von 0 hochzählen. Kein horizontaler Scroll.
// Mobile: keine Sticky-Animation — Bild oben, Cards gestapelt.

const SHARP = "var(--font-sharp), sans-serif";
const ASIDE_W = 470;

type Fact = { value: number; suffix: string; label: string; bg: string; heightPct: number };
const FACTS: Fact[] = [
  { value: 25, suffix: "+", label: "Companies & Labels im deutschen Netzwerk", bg: "#CDABFE", heightPct: 60 },
  { value: 1300, suffix: "", label: "Mitarbeitende hinter den Formaten", bg: "#D1DDD3", heightPct: 40 },
];

const fmt = (n: number) => Math.round(n).toLocaleString("de-DE");

export function EditorialStickyScene() {
  const section = useRef<HTMLDivElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const aside = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const imgEl = img.current!;
      const wrapEl = imgWrap.current!;
      const asideEl = aside.current!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-fact-card]");
      const nums = gsap.utils.toArray<HTMLElement>("[data-fact-num]");

      if (!desktop || reduce) {
        // Mobile / reduced motion: alles statisch sichtbar, Zahlen final.
        gsap.set([imgEl, wrapEl, asideEl, cards], { clearProps: "all" });
        nums.forEach((el, i) => (el.textContent = fmt(FACTS[i].value) + FACTS[i].suffix));
        return;
      }

      // Startlagen — das Bild ist schon fast full-size zu sehen (nur ein kurzer,
      // dezenter Settle), dann passiert das Wesentliche: Zusammenziehen + Fakten.
      gsap.set(imgEl, { y: 90, scale: 1.08, transformOrigin: "50% 50%" });
      gsap.set(wrapEl, { width: "100%" });
      gsap.set(asideEl, { x: ASIDE_W });
      gsap.set(cards, { autoAlpha: 0, y: 40 });
      nums.forEach((el) => (el.textContent = "0"));

      const numProxy = FACTS.map(() => ({ v: 0 }));

      // Scrub-Timeline, Gesamtdauer NORMIERT auf 1.0.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });

      // ① Bild settlet kurz auf full-size (0 → 0.22)
      tl.to(imgEl, { y: 0, scale: 1, ease: "power3.out", duration: 0.22 }, 0);
      // ② Bildcontainer zieht sich links zusammen (0.28 → 0.72)
      tl.to(wrapEl, { width: `calc(100% - ${ASIDE_W}px)`, ease: "power2.inOut", duration: 0.44 }, 0.28);
      // ③ Fact-Spalte fährt von rechts herein (0.28 → 0.72)
      tl.to(asideEl, { x: 0, ease: "power2.inOut", duration: 0.44 }, 0.28);
      // ④ Facts sichtbar + Zahlen zählen hoch (0.5 → 0.78), gestaffelt
      cards.forEach((card, i) => {
        tl.to(card, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.2 }, 0.5 + i * 0.06);
        tl.to(
          numProxy[i],
          { v: FACTS[i].value, duration: 0.2, onUpdate: () => (nums[i].textContent = fmt(numProxy[i].v) + FACTS[i].suffix) },
          0.5 + i * 0.06,
        );
      });
      // kurzer Tail → Timeline-Gesamtdauer exakt 1.0 (wenig Leerscroll)
      tl.to({}, { duration: 0.12 }, 0.88);
    },
    { scope: section },
  );

  return (
    <div ref={section} className="relative max-md:!h-auto" style={{ height: "135vh" }}>
      {/* Sticky-Wrapper */}
      <div className="sticky top-0 flex h-screen items-center overflow-clip max-md:!static max-md:!h-auto max-md:!py-[6vw]">
        {/* Inner Canvas */}
        <div className="mx-auto w-full" style={{ maxWidth: "1920px", paddingLeft: "16px", paddingRight: "16px" }}>
          {/* Animation-Stage */}
          <div className="relative w-full overflow-hidden max-md:!h-auto max-md:!overflow-visible" style={{ height: "clamp(680px, 86vh, 1000px)" }}>
            {/* Bild-Wrapper (Desktop absolut, Mobile normaler Block) */}
            <div
              ref={imgWrap}
              className="absolute left-0 top-0 h-full w-full overflow-hidden max-md:!static max-md:!h-[62vw] max-md:!w-full"
            >
              <img
                ref={img}
                src="/editorial/marcus-hof.jpg"
                alt="Marcus Wolter, CEO Banijay Germany"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center" }}
              />
            </div>

            {/* Fact-Spalte rechts (Desktop absolut 470px, Mobile gestapelt) */}
            <div
              ref={aside}
              className="absolute right-0 top-0 z-[2] flex h-full flex-col max-md:!static max-md:!mt-4 max-md:!h-auto max-md:!w-full"
              style={{ width: `${ASIDE_W}px` }}
            >
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  data-fact-card
                  className="flex flex-col justify-between overflow-clip max-md:!h-auto max-md:!min-h-[9rem]"
                  style={{ height: `${f.heightPct}%`, background: f.bg, padding: "16px", color: "#2b2b2b" }}
                >
                  <span
                    data-fact-num
                    style={{ fontFamily: SHARP, fontSize: "clamp(3.2rem, 5.2vw, 85px)", lineHeight: 1, letterSpacing: "-0.04em", fontWeight: 500 }}
                  >
                    0
                  </span>
                  <span style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.15rem)", lineHeight: "132%", color: "rgba(43,43,43,0.78)", maxWidth: "22ch" }}>
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
