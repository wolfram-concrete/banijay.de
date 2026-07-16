"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ZITAT-SECTION (section_testimonials) — dunkles Panel mit gefächerten Bildkarten +
// absolut geschichtetem Textbereich. Hover: Karte richtet sich gerade auf (scale 1.1 /
// rotate 0), Overlay verschwindet, die Nachbarn weichen aus, das passende Zitat
// blendet ein. Werte = Webflow-Timelines t-1651a2be (Entrance) / t-7bb5f444 (Hover).
//
// Wolfram 16.07.: Die Section lag ungenutzt im Code (auf der Home in d63929e1 raus)
// und lebt jetzt auf der About-Seite über dem Team.
//
// ZWEI FEHLER, die dabei aufgefallen sind und mitbehoben wurden:
//  1) Die Karten zogen ihre Bilder aus LEADERSHIP.slice(0,5) — also Marcus Wolter,
//     Knut Kremling, Michael Laegel, Simone Lenzen, Michael Gaul. Die Zitate stammen
//     aber von Nanni Erben, Arno Schneppenheim, Fabian Tobias und Florian Bösenkopf.
//     Zu jedem Zitat stand also das FALSCHE Gesicht. Person, Foto und Zitat sind
//     deshalb jetzt EIN Datensatz und können nicht mehr auseinanderlaufen.
//  2) Marcus Wolter war als 5. Karte drin — auf banijay.de steht er in dieser Section
//     nicht (dort sind es genau diese vier Geschäftsführer:innen). Er ist raus; sein
//     Zitat trägt weiterhin die Editorial-Section.
//
// Zitate + Fotos 1:1 von banijay.de (Zitat-Slider im unteren Seitenbereich, Bilder aus
// assets/template/Medien/Bilder/zitat/Personen/). Die Quell-PNGs sind freigestellt und
// uneinheitlich (mal Person vor b-Form, mal quadratisches Foto, alle mit transparentem
// Rand) — sie sind für den weißen banijay.de-Grund gebaut. Für die randlosen Fotokarten
// hier wurden die transparenten Ränder getrimmt und die Bilder auf die Panel-Farbe
// gelegt; die einkomponierte b-Form bleibt und liest sich auf dem b-Glow-Panel als
// Marke. Der Fokuspunkt je Motiv sitzt in FOCUS (unten), damit im Hochkant-Crop kein
// Gesicht abgeschnitten wird.
const PEOPLE = [
  {
    quote:
      "Mein Ziel ist es, durch relevante Serien und Filme oder die Förderung junger Filmemacher aufzufallen und natürlich durch die Frauenquote, bei der ich mich als Produzentin weiter engagieren möchte.",
    name: "Nanni Erben",
    role: "Geschäftsführerin MadeFor",
    img: "/people/quotes/nanni-erben.jpg",
    focus: "50% 22%",
  },
  {
    quote: "Mit Spaß und Leidenschaft kannst du Berge versetzen oder zumindest einen vernünftigen Tunnel bauen.",
    name: "Arno Schneppenheim",
    role: "Geschäftsführer & Co-Founder Banijay Productions Germany",
    img: "/people/quotes/arno-schneppenheim.jpg",
    focus: "50% 30%",
  },
  {
    quote:
      "Diversität, Chancengerechtigkeit und Toleranz sind in der Banijay Gruppe gelebte Werte, die als fester Bestandteil in einer jeden Unternehmenskultur angestrebt werden sollten.",
    name: "Fabian Tobias",
    role: "Geschäftsführer EndemolShine Germany",
    img: "/people/quotes/fabian-tobias.jpg",
    focus: "50% 26%",
  },
  {
    quote:
      "Was uns von anderen unterscheidet ist, dass wir Creator nicht als reine Reichweite sehen, sondern als digitale Storyteller. Mit unserer Plattform gestalten wir die Content Creator Economy der Zukunft.",
    name: "Florian Bösenkopf",
    role: "Geschäftsführer & Co-Founder influence.vision",
    img: "/people/quotes/florian-boesenkopf.jpg",
    focus: "50% 18%",
  },
];

// Finale Ruhelage je Karte (x/y in vw, rotation in deg) und Start-x der Entrance.
// Auf VIER Karten gerechnet (vorher fünf): symmetrisch um die Mitte gefächert, die
// beiden inneren flacher gedreht als die äußeren.
const REST = [
  { x: 4, y: 2.2, rot: -7 },
  { x: 1.5, y: 0, rot: 2 },
  { x: -1.5, y: 0, rot: -2 },
  { x: -4, y: 2.2, rot: 6 },
];
const ENTER_X = [26, 12, -12, -26];

// GLEICHES MASS WIE DAS TEAM-GRID darunter (Wolfram 16.07.): Das Team ist auf
// min(1680px, 105vh) gedeckelt — die Breite ist an die Höhe gekoppelt, damit die
// Portraits auf breiten Screens nicht flach laufen. Der Zitat-Fächer stand auf
// 78 % / 1520px; an der Kante zwischen beiden Sections war der Sprung sichtbar
// (gemessen 831 vs. 771px). Beide teilen sich jetzt EIN Maß → der Übergang fluchtet.
// Ändert sich der Team-Deckel, muss dieser Wert mitgehen (Founders.tsx).
const TEAM_MEASURE = "min(1680px, 105vh)";

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

      // Grid-Entrance: alle Karten fliegen aus gespreizten x-Positionen + rotation 0 in
      // die Ruhelage. Die frühere Sonderbehandlung der MITTELKARTE (i === 2 kam per
      // scale statt per x, weil sie bei fünf Karten exakt mittig lag und sich nicht
      // bewegt hätte) ist entfallen — bei vier Karten gibt es keine Mitte, alle vier
      // haben einen echten x-Weg.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: grid.current, start: "top center", toggleActions: "play none none none" },
      });
      cards.forEach((card, i) => {
        tl.from(card, { x: `${ENTER_X[i]}vw`, rotate: 0, duration: 0.75, ease: "power3.out" }, 0);
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
      const items = gsap.utils.toArray<HTMLElement>("[data-tmob]");
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
          {/* Gefächerte Karten (Desktop) — Fokuspunkt je Motiv, damit im Crop kein
              Gesicht abgeschnitten wird. */}
          <div
            ref={grid}
            onMouseLeave={clearHover}
            className="mx-auto flex items-center gap-[1vw] max-[991px]:hidden"
            style={{ width: "100%", maxWidth: TEAM_MEASURE, marginBottom: "5.56vw" }}
          >
            {PEOPLE.map((c, i) => (
              <div
                key={c.name}
                data-tcard
                onMouseEnter={() => applyHover(i)}
                className="relative flex-1 cursor-pointer overflow-hidden"
                style={{ height: "40vh", willChange: "transform" }}
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="h-full w-full object-cover"
                  style={{ filter: "grayscale(1)", objectPosition: c.focus }}
                />
                <div data-ov className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.64)" }} />
              </div>
            ))}
          </div>

          {/* Separater, absolut geschichteter Textbereich (erstes Zitat sichtbar) */}
          <div className="relative mx-auto max-[991px]:hidden" style={{ minHeight: "12vw", maxWidth: "55vw" }}>
            {PEOPLE.map((s, i) => (
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
            {PEOPLE.map((s, i) => (
              <figure key={i} data-tmob className="m-0 grid items-start gap-[4vw]" style={{ gridTemplateColumns: "4fr 8fr" }}>
                <div className="overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
                  <img
                    src={s.img}
                    alt={s.name}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: s.focus, filter: "grayscale(1)" }}
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

        {/* Das Zähler-Grid (1.300+/40+/4 Mrd./3.000 hrs. als CountUp-Kacheln) ist raus
            (Wolfram 16.07.): Auf der About-Seite trägt die Fakten-Section weiter oben
            exakt dieselben Zahlen — hier wären sie eine Dopplung. */}
      </div>
    </section>
  );
}
