"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CountUp } from "@/components/cinematic/CountUp";
import { HOME } from "@/data/home";
import { ABOUT } from "@/data/about";
import { homeStats } from "@/data/site";
import { LEADERSHIP } from "@/data/leadership";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// section_testimonials (Algarve 1:1, nach Briefing): dunkles Rounded-Panel mit
// fünf GEFÄCHERTEN Bildkarten (Grid-Entrance aus gespreizten x-Positionen in ihre
// finalen Rotationen) + separatem, absolut geschichtetem Textbereich. Hover:
// Karte richtet sich gerade auf (scale 1.1 / rotate 0), Overlay verschwindet, die
// Nachbarn weichen aus, das passende Zitat blendet ein. Werte = Webflow-Timelines
// t-1651a2be (Entrance) und t-7bb5f444 (Hover).

const CARDS = LEADERSHIP.slice(0, 5).map((p) => ({ url: p.img, name: p.name }));

// Finale Ruhelage je Karte (is-left … is-right): x/y in vw, rotation in deg.
const REST = [
  { x: 5, y: 4, rot: -18 },
  { x: 2, y: 2, rot: 3 },
  { x: 0, y: 0, rot: -3 },
  { x: -5, y: 2, rot: 4 },
  { x: -6, y: 4, rot: -8 },
];
// Start-x der Entrance (Karte fliegt von weit außen herein). Mitte via scale.
const ENTER_X = [30, 17, 0, -13, -34];

// Fünf echte/belegte Aussagen (1:1 zu den fünf Karten).
const STATEMENTS = [
  { quote: HOME.ceo.quote, name: "Marcus Wolter", role: "CEO & Co-Founder, Banijay Germany" },
  { quote: HOME.ceo.altQuote, name: "Marcus Wolter", role: "CEO & Co-Founder, Banijay Germany" },
  { quote: HOME.world.extra, name: "Banijay Germany", role: "Entertainment-Netzwerk" },
  { quote: ABOUT.principle.text, name: "Banijay Germany", role: "Kreative Freiheit, starkes Dach" },
  { quote: HOME.world.headline, name: "Banijay Germany", role: "Ein Netzwerk kreativer Zentren" },
];

const STATS = homeStats().slice(0, 4);

export function AlgarveTestimonials() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const getCards = () =>
    grid.current ? Array.from(grid.current.querySelectorAll<HTMLElement>("[data-tcard]")) : [];
  const ovOf = (c: HTMLElement) => c.querySelector<HTMLElement>("[data-ov]");

  useGSAP(
    () => {
      // Desktop-only (Fächer-Interaktion unter Tablet deaktiviert).
      if (!window.matchMedia("(min-width: 992px)").matches) return;
      const cards = getCards();
      // Finale Ruhelage (gefächert) als Basis.
      cards.forEach((card, i) => {
        gsap.set(card, { x: `${REST[i].x}vw`, y: `${REST[i].y}vw`, rotate: REST[i].rot, transformOrigin: "50% 60%" });
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Grid-Entrance: aus gespreizten x-Positionen + rotation 0 in die Ruhelage.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: grid.current, start: "top center", toggleActions: "play none none none" },
      });
      cards.forEach((card, i) => {
        if (i === 2) tl.from(card, { scale: 0.7, rotate: 0, duration: 0.75, ease: "power3.out" }, 0);
        else tl.from(card, { x: `${ENTER_X[i]}vw`, rotate: 0, duration: 0.75, ease: "power3.out" }, 0);
      });
    },
    { scope: root },
  );

  // Hover: „set all" (robust gegen Sibling-Konflikte). Gehoverte Karte gerade +
  // groß + Overlay weg; direkte Nachbarn weichen aus; passender Text blendet ein.
  const applyHover = (idx: number) => {
    if (!window.matchMedia("(min-width: 992px)").matches) return;
    setActive(idx);
    getCards().forEach((c, k) => {
      const ov = ovOf(c);
      if (k === idx) {
        gsap.to(c, { scale: 1.1, rotate: 0, xPercent: 0, zIndex: 30, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        if (ov) gsap.to(ov, { opacity: 0, duration: 0.3, overwrite: "auto" });
      } else {
        const xp = k === idx - 1 ? -10 : k === idx + 1 ? 10 : 0;
        gsap.to(c, { scale: 1, rotate: REST[k].rot, xPercent: xp, zIndex: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
        if (ov) gsap.to(ov, { opacity: 1, duration: 0.3, overwrite: "auto" });
      }
    });
  };
  const clearHover = () => {
    setActive(0);
    getCards().forEach((c, k) => {
      const ov = ovOf(c);
      gsap.to(c, { scale: 1, rotate: REST[k].rot, xPercent: 0, zIndex: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      if (ov) gsap.to(ov, { opacity: 1, duration: 0.3, overwrite: "auto" });
    });
  };

  return (
    <section ref={root} style={{ background: "#f8f7f3", paddingBottom: "5.56vw" }}>
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        {/* Dunkles Panel */}
        <div
          className="relative"
          style={{
            paddingTop: "11.11vw",
            paddingBottom: "8.33vw",
            borderRadius: "1.67vw",
            backgroundColor: "#0a0a0a",
            color: "#f8f7f3",
          }}
        >
          {/* Gefächerter 5-Karten-Fächer (Desktop) */}
          <div
            ref={grid}
            onMouseLeave={clearHover}
            className="mx-auto flex items-center gap-[1vw] max-[991px]:hidden"
            style={{ width: "90%", maxWidth: "1830px", marginBottom: "5.56vw" }}
          >
            {CARDS.map((c, i) => (
              <div
                key={c.name}
                data-tcard
                onMouseEnter={() => applyHover(i)}
                className="relative flex-1 cursor-pointer overflow-hidden"
                style={{ height: "40vh", borderRadius: "12px", willChange: "transform" }}
              >
                <img src={c.url} alt={c.name} className="h-full w-full object-cover" style={{ filter: "grayscale(1)" }} />
                <div data-ov className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.64)" }} />
              </div>
            ))}
          </div>

          {/* Separater, absolut geschichteter Textbereich (is-first sichtbar) */}
          <div className="relative mx-auto max-[991px]:hidden" style={{ minHeight: "12vw", maxWidth: "55vw" }}>
            {STATEMENTS.map((s, i) => (
              <figure
                key={i}
                className="absolute inset-0 m-0 flex flex-col items-center gap-[1.4vw] text-center transition-opacity duration-500"
                style={{ opacity: i === active ? 1 : 0 }}
                aria-hidden={i !== active}
              >
                <blockquote
                  className="m-0"
                  style={{
                    fontFamily: "var(--font-sharp), sans-serif",
                    fontSize: "1.9vw",
                    lineHeight: "140%",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                  }}
                >
                  „{s.quote}“
                </blockquote>
                <figcaption className="flex items-center gap-[0.83vw]" style={{ opacity: 0.6, fontSize: "1.1vw" }}>
                  <span>{s.name}</span>
                  <span style={{ width: 3, height: 3, background: "#f8f7f3", display: "inline-block" }} />
                  <span>{s.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Mobile: einfache Liste (keine Desktop-Fächer-Interaktion) */}
          <div className="hidden flex-col gap-8 max-[991px]:flex" style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
            {STATEMENTS.slice(0, 3).map((s, i) => (
              <figure key={i} className="m-0 flex flex-col gap-3">
                <div className="overflow-hidden" style={{ height: "34vw", borderRadius: "12px" }}>
                  <img src={CARDS[i].url} alt={CARDS[i].name} className="h-full w-full object-cover" style={{ filter: "grayscale(1)" }} />
                </div>
                <blockquote className="m-0" style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "4.2vw", lineHeight: "135%", fontWeight: 500 }}>
                  „{s.quote}“
                </blockquote>
                <figcaption className="flex flex-wrap items-center gap-2" style={{ opacity: 0.6, fontSize: "3.2vw" }}>
                  <span>{s.name}</span>
                  <span>·</span>
                  <span>{s.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Zähler-Grid (echte Zahlen) */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ marginTop: "1vw", gap: "1vw" }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center text-center"
              style={{ padding: "3.33vw 1.39vw", gap: "1.67vw", borderRadius: "1.11vw", backgroundColor: "#00000014" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sharp), sans-serif",
                  fontSize: "4.44vw",
                  lineHeight: "110%",
                  fontWeight: 500,
                  letterSpacing: "-0.139vw",
                }}
              >
                <CountUp value={s.value} />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sharp), sans-serif",
                  fontSize: "0.9vw",
                  fontWeight: 700,
                  letterSpacing: "0.052vw",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
