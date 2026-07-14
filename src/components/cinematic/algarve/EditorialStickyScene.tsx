"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// EDITORIAL PINNED-SCROLL (Wolfram 14.07.): das Marcus-Bild steht FULL SIZE, dann
// PINNT die Bühne (echter Scroll-Stop). Beim Weiterscrollen zieht sich das Bild
// nach links zusammen und die 470px-Fakten-Spalte fährt von RECHTS herein (Zahlen
// zählen von 0 hoch). Erst wenn die Fakten stehen, löst der Pin → die Section
// scrollt weiter (kein großer Leerraum zur Lead-Headline mehr).
// Mobile / reduced motion: kein Pin — Bild oben, Cards gestapelt.

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
  const stage = useRef<HTMLDivElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);
  const aside = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrapEl = imgWrap.current!;
      const asideEl = aside.current!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-fact-card]");
      const nums = gsap.utils.toArray<HTMLElement>("[data-fact-num]");

      if (!desktop || reduce) {
        gsap.set([wrapEl, asideEl, cards], { clearProps: "all" });
        nums.forEach((el, i) => (el.textContent = fmt(FACTS[i].value) + FACTS[i].suffix));
        return;
      }

      // Startlage: Bild FULL SIZE, Fakten-Spalte komplett rechts draußen.
      gsap.set(wrapEl, { width: "100%" });
      gsap.set(asideEl, { xPercent: 100, autoAlpha: 0 });
      gsap.set(cards, { autoAlpha: 0, y: 30 });
      nums.forEach((el) => (el.textContent = "0"));
      const numProxy = FACTS.map(() => ({ v: 0 }));

      // PIN: Bühne bleibt stehen, der Scroll treibt die Fakten-Choreografie.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: "+=135%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // ① kurzer Halt — Bild full-size (der „Scroll-Stop"-Moment)
      tl.to({}, { duration: 0.16 }, 0);
      // ② Bild zieht nach links zusammen + Fakten-Spalte fährt von RECHTS herein
      tl.to(wrapEl, { width: `calc(100% - ${ASIDE_W}px)`, ease: "power2.inOut", duration: 0.4 }, 0.16);
      tl.to(asideEl, { xPercent: 0, autoAlpha: 1, ease: "power2.inOut", duration: 0.4 }, 0.16);
      // ③ Cards sichtbar + Zahlen zählen hoch (gestaffelt)
      cards.forEach((card, i) => {
        tl.to(card, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.18 }, 0.34 + i * 0.08);
        tl.to(
          numProxy[i],
          { v: FACTS[i].value, duration: 0.22, onUpdate: () => (nums[i].textContent = fmt(numProxy[i].v) + FACTS[i].suffix) },
          0.34 + i * 0.08,
        );
      });
      // ④ Halt mit stehenden Fakten, BEVOR der Pin löst
      tl.to({}, { duration: 0.2 }, 0.82);
    },
    { scope: section },
  );

  return (
    <div ref={section} className="relative max-md:!h-auto">
      {/* Gepinnte Bühne (Desktop) — auf Mobile normaler Fluss */}
      <div
        ref={stage}
        className="flex h-screen items-center overflow-clip max-md:!static max-md:!h-auto max-md:!py-[6vw]"
      >
        <div className="mx-auto w-full" style={{ maxWidth: "1920px", paddingLeft: "16px", paddingRight: "16px" }}>
          <div className="relative w-full overflow-hidden max-md:!h-auto max-md:!overflow-visible" style={{ height: "clamp(680px, 82vh, 1000px)" }}>
            {/* Bild-Wrapper (Desktop absolut, Mobile normaler Block) */}
            <div
              ref={imgWrap}
              className="absolute left-0 top-0 h-full w-full overflow-hidden max-md:!static max-md:!h-[62vw] max-md:!w-full"
            >
              <img
                src="/editorial/marcus-hof.jpg"
                alt="Marcus Wolter, CEO Banijay Germany"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center" }}
              />
            </div>

            {/* Fakten-Spalte rechts (Desktop absolut 470px, Mobile gestapelt) */}
            <div
              ref={aside}
              className="absolute right-0 top-0 z-[2] flex h-full flex-col max-md:!static max-md:!mt-4 max-md:!h-auto max-md:!w-full"
              style={{ width: `${ASIDE_W}px` }}
            >
              {FACTS.map((f) => (
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
