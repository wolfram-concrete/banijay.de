"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COMPANIES } from "@/data/companies";
import { getCompanyImage } from "@/data/companyImages";
import { COMPANY_CARDS } from "@/data/companyCards";

// Externe Company-URLs (aus den kuratierten companyCards) je Company-Slug.
// Kleiner Remap für abweichende Slugs (ogp-only-good-people → only-good-people).
const URL_BY_ID: Record<string, string> = Object.fromEntries(
  COMPANY_CARDS.map((c) => [c.id, c.externalUrl]),
);
const urlForSlug = (slug: string): string | undefined =>
  URL_BY_ID[slug] ?? URL_BY_ID[slug.replace(/^ogp-/, "")];

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
  href: c.externalLink ?? urlForSlug(c.slug),
}));

const N = cards.length;
const STEP_VH = 40; // Scroll-Weg pro weiterer Card
const TOTAL_VH = 300 + Math.max(0, N - 3) * STEP_VH;

const OFF_WHITE: [number, number, number] = [248, 247, 243];
// Basisfarbe der Companies-Section: erste Ansicht = Banijay-Magenta; von hier aus
// verfärbt sich der Grund beim Scrollen in die dominanten Card-Farben.
const BASE_BG: [number, number, number] = [255, 67, 112];

// „Gebrannte" Variante der dominanten Bildfarbe: Sättigung deutlich anheben und
// leicht abdunkeln → satte, warme Töne statt milchig-heller Durchschnitt.
function burnt([r, g, b]: [number, number, number]): [number, number, number] {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const SAT = 1.5; // Sättigung anheben
  const DARK = 0.8; // abdunkeln → „gebrannt"
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return [
    clamp((lum + (r - lum) * SAT) * DARK),
    clamp((lum + (g - lum) * SAT) * DARK),
    clamp((lum + (b - lum) * SAT) * DARK),
  ];
}

export function AlgarveCompaniesScroller() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const wordL = useRef<HTMLHeadingElement>(null);
  const wordR = useRef<HTMLHeadingElement>(null);
  // Dominante Bildfarbe je Card (für den lebendigen Hintergrund).
  const colorsRef = useRef<([number, number, number] | null)[]>([]);

  // Repräsentative (vorherrschende, satte) Farbe je Company-Bild vorberechnen.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    let alive = true;
    cards.forEach((card, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (!alive) return;
        try {
          const s = 24;
          const cv = document.createElement("canvas");
          cv.width = s;
          cv.height = s;
          const cx = cv.getContext("2d");
          if (!cx) return;
          cx.drawImage(img, 0, 0, s, s);
          const d = cx.getImageData(0, 0, s, s).data;
          let r = 0;
          let g = 0;
          let b = 0;
          let n = 0;
          for (let p = 0; p < d.length; p += 4) {
            const R = d[p];
            const G = d[p + 1];
            const B = d[p + 2];
            const mx = Math.max(R, G, B);
            const mn = Math.min(R, G, B);
            const sat = mx === 0 ? 0 : (mx - mn) / mx;
            const l = (mx + mn) / 510;
            if (sat > 0.28 && l > 0.16 && l < 0.86) {
              r += R;
              g += G;
              b += B;
              n++;
            }
          }
          if (n < 4) {
            r = 0;
            g = 0;
            b = 0;
            n = 0;
            for (let p = 0; p < d.length; p += 4) {
              r += d[p];
              g += d[p + 1];
              b += d[p + 2];
              n++;
            }
          }
          colorsRef.current[i] = burnt([r / n, g / n, b / n]);
        } catch {}
      };
      img.src = card.img;
    });
    return () => {
      alive = false;
    };
  }, []);

  // Lebendiger Hintergrund: färbt sich weich in die vorherrschende Farbe der
  // zentral fokussierten Card; außerhalb der Slide-Strecke wieder off-white.
  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const rootEl = root.current;
    if (!rootEl) return;
    const cur: [number, number, number] = [...BASE_BG];
    const target: [number, number, number] = [...BASE_BG];
    const setT = (c: [number, number, number]) => {
      target[0] = c[0];
      target[1] = c[1];
      target[2] = c[2];
    };
    const focus = () => {
      const els = gsap.utils.toArray<HTMLElement>("[data-work]");
      if (!els.length) return;
      const cX = window.innerWidth / 2;
      let b = -1;
      let bd = 1e9;
      let s = -1;
      let sd = 1e9;
      els.forEach((el, i) => {
        if (parseFloat(getComputedStyle(el).opacity) < 0.05) return;
        const rect = el.getBoundingClientRect();
        const c = rect.left + rect.width / 2;
        const dist = Math.abs(c - cX);
        if (dist < bd) {
          sd = bd;
          s = b;
          bd = dist;
          b = i;
        } else if (dist < sd) {
          sd = dist;
          s = i;
        }
      });
      if (b < 0) return;
      const c1 = colorsRef.current[b] ?? OFF_WHITE;
      const c2 = colorsRef.current[s] ?? c1;
      const tb = bd / (bd + sd + 1); // näher = mehr Gewicht
      setT([c1[0] * (1 - tb) + c2[0] * tb, c1[1] * (1 - tb) + c2[1] * tb, c1[2] * (1 - tb) + c2[2] * tb]);
    };
    const st = ScrollTrigger.create({
      trigger: rootEl,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => (self.progress > 0.16 ? focus() : setT(BASE_BG)),
      onLeave: () => setT(BASE_BG),
      onLeaveBack: () => setT(BASE_BG),
    });
    const tick = () => {
      let moved = false;
      for (let k = 0; k < 3; k++) {
        const diff = target[k] - cur[k];
        if (Math.abs(diff) > 0.4) moved = true;
        cur[k] += diff * 0.06; // weiches Ineinander-Waben
      }
      if (moved) rootEl.style.backgroundColor = `rgb(${Math.round(cur[0])},${Math.round(cur[1])},${Math.round(cur[2])})`;
    };
    gsap.ticker.add(tick);
    return () => {
      st.kill();
      gsap.ticker.remove(tick);
      rootEl.style.backgroundColor = "";
    };
  }, []);

  useGSAP(
    () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const els = gsap.utils.toArray<HTMLElement>("[data-work]");
      if (els.length < 3) return;

      // Startlagen: erste drei mittig gestapelt (scale 0), Rest rechts vorbereitet
      // und TRANSPARENT — die weiteren Karten erscheinen erst, wenn die ersten drei
      // sich verteilt haben (sonst lugt Karte 4 auf Fullsize rechts ins Bild).
      gsap.set(els.slice(0, 3), { scale: 0, xPercent: 0, rotation: 0 });
      els.slice(3).forEach((el, i) => gsap.set(el, { xPercent: 200 + i * 100, scale: 0.8, rotation: 4, opacity: 0 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          // Höherer scrub → weicheres, „magnetisches" Nachlaufen der Bewegung.
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Intro-Choreografie in drei Beats:
      // 1) Die Wörter stehen zunächst als normale Zeilen NEBENEINANDER in der Mitte
      //    (via Translate zusammengerückt) und faden ruhig ein.
      gsap.set(wordL.current, { x: "24vw", scale: 1, opacity: 0 });
      gsap.set(wordR.current, { x: "-24vw", scale: 1, opacity: 0 });
      tl.to([wordL.current, wordR.current], { opacity: 1, ease: "power1.out", duration: 1.0 }, 0.5);

      // 2) Dann ziehen sie auseinander → öffnen die Mitte (das „Loch").
      tl.to(wordL.current, { x: "0vw", ease: "power2.inOut", duration: 1.8 }, 2.0)
        .to(wordR.current, { x: "0vw", ease: "power2.inOut", duration: 1.8 }, 2.0);

      // 3) ERST danach steigen die ersten drei Cards aus dem mittleren Loch auf.
      tl.to(els.slice(0, 3), { scale: 1, duration: 0.7, stagger: 0.3, ease: "power2.out" }, 3.9);

      // Fächern: Card 1 links, Card 3 rechts, Card 2 mittig — weiches Ease.
      tl.to(els[0], { xPercent: -100, scale: 0.8, rotation: -4, duration: 1.1, ease: "power2.inOut" }, 5.32)
        .to(els[1], { xPercent: 0, scale: 0.9, rotation: 0, duration: 1.1, ease: "power2.inOut" }, 5.32)
        .to(els[2], { xPercent: 100, scale: 0.8, rotation: 4, duration: 1.1, ease: "power2.inOut" }, 5.32);

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
              duration: 0.95,
              ease: "power2.inOut",
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
      {/* Negativer Margin + gerundete Oberkante + z-index: die Magenta-Fläche
          schiebt sich beim Scrollen von unten über die Section darüber. */}
      <section
        ref={root}
        data-nav-theme="magenta"
        className="relative overflow-clip max-[767px]:hidden"
        style={{
          background: "#ff4370",
          height: `${TOTAL_VH}vh`,
          marginTop: "-16vh",
          zIndex: 2,
          borderTopLeftRadius: "2.5vw",
          borderTopRightRadius: "2.5vw",
        }}
      >
        {/* Große radiale Kurve rechts — markiert die rechte „Bild-Endkante". */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 -translate-y-1/2"
          style={{
            right: "-24vw",
            width: "58vw",
            height: "130vh",
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(0,0,0,0.12), rgba(0,0,0,0) 70%)",
            zIndex: 0,
          }}
        />

        <div className="sticky top-0 flex w-screen items-end" style={{ height: "100vh" }}>
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

          {/* master-list: portrait 9:16, mittig; Cards absolut gestapelt */}
          <div ref={track} className="absolute inset-0 m-auto flex items-center justify-center" style={{ width: "21.25vw", height: "37.74vw" }}>
            {cards.map((card) => {
              const Wrap = card.href ? "a" : "div";
              return (
                <Wrap
                  key={card.name}
                  data-work
                  {...(card.href ? { href: card.href, target: "_blank", rel: "noreferrer" } : {})}
                  className={`absolute inset-0 m-auto flex flex-col overflow-clip no-underline ${card.href ? "cursor-pointer" : ""}`}
                  style={{
                    width: "100%",
                    height: "100%",
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
                    </div>
                  </div>
                </Wrap>
              );
            })}
          </div>
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
                </div>
              </Wrap>
            );
          })}
        </div>
      </section>
    </>
  );
}
