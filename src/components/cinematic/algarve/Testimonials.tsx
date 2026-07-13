"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CountUp } from "@/components/cinematic/CountUp";
import { HOME } from "@/data/home";
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
  { x: 5, y: 2.5, rot: -8 },
  { x: 2, y: 1.2, rot: 2 },
  { x: 0, y: 0, rot: -2 },
  { x: -5, y: 1.2, rot: 3 },
  { x: -6, y: 2.5, rot: -6 },
];
// Start-x der Entrance (Karte fliegt von weit außen herein). Mitte via scale.
const ENTER_X = [30, 17, 0, -13, -34];

// Fünf echte Statements — 1:1 aus dem Testimonial-Slider auf banijay.de
// (Nanni Erben, Arno Schneppenheim, Fabian Tobias, Florian Bösenkopf) plus das
// CEO-Statement von Marcus Wolter.
const STATEMENTS = [
  {
    quote: HOME.ceo.quote,
    name: "Marcus Wolter",
    role: "CEO & Co-Founder, Banijay Germany",
  },
  {
    quote:
      "Mein Ziel ist es, durch relevante Serien und Filme oder die Förderung junger Filmemacher aufzufallen und natürlich durch die Frauenquote, bei der ich mich als Produzentin weiter engagieren möchte.",
    name: "Nanni Erben",
    role: "Geschäftsführerin MadeFor",
  },
  {
    quote: "Mit Spaß und Leidenschaft kannst du Berge versetzen oder zumindest einen vernünftigen Tunnel bauen.",
    name: "Arno Schneppenheim",
    role: "Geschäftsführer & Co-Founder Banijay Productions Germany",
  },
  {
    quote:
      "Diversität, Chancengerechtigkeit und Toleranz sind in der Banijay Gruppe gelebte Werte, die als fester Bestandteil in einer jeden Unternehmenskultur angestrebt werden sollten.",
    name: "Fabian Tobias",
    role: "Geschäftsführer EndemolShine Germany",
  },
  {
    quote:
      "Was uns von anderen unterscheidet ist, dass wir Creator nicht als reine Reichweite sehen, sondern als digitale Storyteller. Mit unserer Plattform gestalten wir die Content Creator Economy der Zukunft.",
    name: "Florian Bösenkopf",
    role: "Geschäftsführer & Co-Founder influence.vision",
  },
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

  // Mobile: die Zitate + Facts sind sonst statisch — sie faden beim Scrollen
  // gestaffelt von unten ein (attraktiver Aufbau der ansonsten ruhigen Section).
  useGSAP(
    () => {
      if (window.matchMedia("(min-width: 992px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-tmob], [data-tstat]");
      if (!items.length) return;
      gsap.set(items, { autoAlpha: 0, y: 44 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }),
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
    <section ref={root} style={{ background: "transparent", paddingBottom: "5.56vw" }}>
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        {/* Dunkles Panel — Hintergrund: leuchtendes Magenta-„b" (b-Glow), per dunklem
            Verlaufs-Scrim gedämpft, damit die Grayscale-Karten + der weiße Text lesbar
            bleiben und der Glow nur atmosphärisch durchscheint. */}
        <div
          className="relative"
          style={{
            paddingTop: "11.11vw",
            paddingBottom: "8.33vw",
            backgroundColor: "#0a0a0a",
            backgroundImage:
              "linear-gradient(180deg, rgba(10,10,10,0.42) 0%, rgba(10,10,10,0.58) 46%, rgba(10,10,10,0.86) 100%), url(/brand/testimonials-b-glow.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
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
                style={{ height: "40vh", willChange: "transform" }}
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

          {/* Mobile: Liste im Original-Layout (Bild links / Text rechts, 4fr/8fr).
              Bild als Portrait mit Fokuspunkt auf das Gesicht (nicht abgeschnitten). */}
          <div className="hidden flex-col gap-[8vw] max-[991px]:flex" style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
            {STATEMENTS.map((s, i) => (
              <figure key={i} data-tmob className="m-0 grid items-start gap-[4vw]" style={{ gridTemplateColumns: "4fr 8fr" }}>
                <div className="overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
                  <img
                    src={CARDS[i].url}
                    alt={CARDS[i].name}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "center 14%", filter: "grayscale(1)" }}
                  />
                </div>
                <div className="flex flex-col gap-[3vw]">
                  <blockquote className="m-0" style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "3.6vw", lineHeight: "134%", fontWeight: 500 }}>
                    „{s.quote}“
                  </blockquote>
                  <figcaption className="flex flex-col gap-[0.5vw]" style={{ fontSize: "3vw", lineHeight: "128%" }}>
                    <span style={{ fontWeight: 600 }}>{s.name}</span>
                    <span style={{ opacity: 0.6 }}>{s.role}</span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        {/* Zähler-Grid (echte Zahlen) — Mobile einspaltig, deutlich größere Facts. */}
        <div className="grid grid-cols-1 md:grid-cols-4 max-[767px]:!gap-[3vw] max-[767px]:!mt-[6vw]" style={{ marginTop: "1vw", gap: "1vw" }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              data-tstat
              className="glass-panel flex flex-col items-center justify-center text-center max-[767px]:!flex-row max-[767px]:!justify-between max-[767px]:!gap-[4vw] max-[767px]:!p-[6vw]"
              style={{ padding: "3.33vw 1.39vw", gap: "1.67vw", color: "#f8f7f3" }}
            >
              <span
                className="max-[767px]:!text-[13vw]"
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
                className="max-[767px]:!text-[3.2vw] max-[767px]:!text-right"
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
