"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERSHIP } from "@/data/leadership";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Team (Algarve section_spiral-team, adaptiert): großer Schriftzug „TEAM" als
// eigenständige Headline OBEN, darunter die Portraits. Die Cards starten in einem
// verdichteten Initial-State (zur Mitte kollabiert, skaliert, rotiert, leicht
// überlappend) und entfalten sich beim Scrollen per gepinnter, gescrubter
// GSAP-Timeline in ihr sauberes 5-Spalten-Grid. Mobile: einfaches 2-Spalten-Grid.

// Komplettes Team, Reihenfolge = Layout (siehe leadership.ts): 3 Leader oben,
// darunter Fünferreihen. Kein slice mehr — kommt eine Person dazu, rutscht sie von
// selbst in die untere Reihe.
const TEAM = LEADERSHIP;

const NAME = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "clamp(0.8rem, 0.95vw, 1.15rem)",
  fontWeight: 500,
  letterSpacing: "-0.01em",
  lineHeight: "118%",
} as const;
const ROLE = { color: "rgba(248,247,243,0.64)", fontSize: "clamp(0.7rem, 0.8vw, 0.95rem)", lineHeight: "122%" } as const;

// Fokuspunkt je Portrait (object-position), damit die Gesichter im Crop nie
// abgeschnitten werden — Portraits mit Kopf weit oben brauchen einen stärkeren
// Top-Bias. Default: leicht nach oben versetzt.
const FOCUS: Record<string, string> = {
  "/people/lead-1.jpg": "50% 22%",
  "/people/lead-2.jpg": "50% 14%",
  // Aylin Firat (Wolfram 17.07.) — echtes Portrait, ersetzt lead-2.jpg. Bereits auf
  // Kopf/Oberkörper beschnitten (siehe leadership.ts), daher nur leichter Top-Bias.
  "/people/aylin-firat.jpg": "50% 18%",
  // Elena Kats (Wolfram 19.07.) — neues Ganzkörper-Sitzfoto (Kopf ~24–29 % der Bildhöhe),
  // weiter unten als die engen Headshots → Fokus tiefer, damit der Kopf oben sitzt und
  // weniger Weißraum darüber bleibt. Ggf. am Gerät nachziehen.
  "/people/elena-kats.jpg": "50% 27%",
  // Michael Gaul (Wolfram 17.07.) — echtes Portrait, ersetzt lead-5.jpg. Nach derselben
  // Regel wie Aylin beschnitten (siehe leadership.ts), daher derselbe Top-Bias.
  "/people/michael-gaul.jpg": "50% 18%",
  // Alle vier Portraits aus der 2026er-Session sind nach derselben Regel beschnitten
  // (Kopf = 32 % der Ausschnitthöhe, siehe leadership.ts) → identischer Top-Bias.
  "/people/matthaeus-jaworek.jpg": "50% 18%",
  "/people/sebastian-menge.jpg": "50% 18%",
  // Michael Laegel steht in der LEADER-Reihe (Kachel 1.36 statt 1.03) und ist daher
  // anders beschnitten — siehe leadership.ts. Dort zeigt die Kachel nur 55 % der
  // Bildhöhe, deshalb ein knapperer Top-Bias als bei den 32%-Portraits.
  "/people/michael-laegel.jpg": "50% 14%",
  "/people/knut-kremling.jpg": "50% 8%",
  "/people/simone-lenzen.jpg": "50% 12%",
  "/people/lead-3.jpg": "50% 12%",
  "/people/lead-4.jpg": "50% 22%",
  "/people/lead-5.jpg": "50% 20%",
  "/people/lead-6.jpg": "50% 26%",
  "/people/lead-7.jpg": "50% 26%",
  "/people/lead-8.jpg": "50% 22%",
  "/people/lead-9.jpg": "50% 22%",
};
const focus = (img: string) => FOCUS[img] ?? "50% 20%";

// Aufbauende Headline (Wolfram 15.07.): jedes Wort steigt aus einer Maske hoch
// (gestaffelt), wenn die Team-Section ins Bild scrollt — global auf allen Pages.
function TeamHeadWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em", marginRight: i < words.length - 1 ? "0.26em" : 0 }}
        >
          <span data-team-headword className="inline-block" style={{ willChange: "transform" }}>
            {w}
          </span>
        </span>
      ))}
    </>
  );
}

export function AlgarveFounders({
  holdForOverlay = true,
}: {
  /** Halte-Beat am Ende des Team-Pins: das komplette Team steht still, damit die
   *  FOLGE-Section mit ihrem -100vh-Overlap darüberziehen kann (Home: LogoReveal).
   *  Auf About gibt es seit dem Wegfall der Partner-Section keinen solchen Nachfolger
   *  mehr (Wolfram 16.07.) — dort false, sonst stünde das Team ~1 Screen lang
   *  unbedeckt still und es läse sich als Hänger. */
  holdForOverlay?: boolean;
} = {}) {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const mTeam = useRef<HTMLDivElement>(null); // Mobile-Team-Container (für End-Pin)

  useGSAP(
    () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      const tiles = gsap.utils.toArray<HTMLElement>("[data-team-tile]");
      const gridEl = grid.current;
      if (!gridEl || !tiles.length) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Verdichteter Initial-State: jede Card zur Grid-Mitte ziehen (Cluster),
      // verkleinern + rotieren. VOR dem ersten Paint gesetzt (useGSAP =
      // useLayoutEffect) → kein Flash des fertigen Grids.
      const gr = gridEl.getBoundingClientRect();
      const cx = gr.left + gr.width / 2;
      const cy = gr.top + gr.height / 2;
      const mid = (tiles.length - 1) / 2;
      const initial = tiles.map((el, i) => {
        const r = el.getBoundingClientRect();
        return {
          x: (cx - (r.left + r.width / 2)) * 0.86,
          y: (cy - (r.top + r.height / 2)) * 0.86 + 40,
          scale: 0.46,
          rotation: (i - mid) * 4.2,
        };
      });
      tiles.forEach((el, i) => gsap.set(el, { ...initial[i], opacity: reduce ? 1 : 0.82, transformOrigin: "50% 50%" }));

      // Name + Titel starten unsichtbar — sie sollen erst auflayern, wenn die
      // Karten an ihrer finalen Grid-Position eingerastet sind.
      const metas = gsap.utils.toArray<HTMLElement>("[data-team-meta]");
      gsap.set(metas, { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 });

      if (reduce) {
        gsap.set(tiles, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 });
        gsap.set(metas, { opacity: 1, y: 0 });
        return;
      }

      // Entfaltung per gepinnter, gescrubter Timeline in die finalen Grid-Plätze.
      // Danach ein kurzer Halte-Beat: das komplette Team steht, BEVOR der Pin löst
      // (auf der Home steigt danach im LogoReveal das Video darüber). Schlichter
      // Scroll-Eingang aus dem Editorial (kein Warp/Blende mehr — Wolfram 14.07.).
      // Pin-Strecke folgt dem Halte-Beat: MIT Overlay-Hold 210 % (Aufbau + 1 Screen
      // Stillstand, den die Folge-Section überdeckt), OHNE nur 120 % — sonst bliebe
      // die Hold-Strecke als Leerlauf stehen (About seit Wegfall der Partner-Section).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: holdForOverlay ? "+=210%" : "+=120%",
          scrub: true,
          pin: "[data-team-stage]",
          invalidateOnRefresh: true,
        },
      });
      tl.to(tiles, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, ease: "power2.out", stagger: 0.04, duration: 0.45 });
      // Erst NACHDEM die Karten eingerastet sind, faden Name + Titel gestaffelt ein.
      tl.to(metas, { opacity: 1, y: 0, ease: "power2.out", stagger: 0.02, duration: 0.26 }, 0.48);
      // Langer Halte-Beat: komplettes Team steht still, BEVOR im LogoReveal der
      // Videocontainer (-100vh) von unten darüberzieht.
      if (holdForOverlay) tl.to({}, { duration: 0.9 }, 0.9);
    },
    { scope: root },
  );

  // Mobile: das Grid baut sich beim Scrollen Stück für Stück auf — jede Kachel
  // fadet + skaliert gestaffelt herein (kein Pin, ScrollTrigger.batch).
  useGSAP(
    () => {
      if (window.matchMedia("(min-width: 768px)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tiles = gsap.utils.toArray<HTMLElement>("[data-team-mtile]");
      if (!tiles.length) return;
      gsap.set(tiles, { autoAlpha: 0, y: 44, scale: 0.93 });
      ScrollTrigger.batch(tiles, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 }),
      });

      // END-PIN: sobald der letzte Team-Screen erreicht ist (Container-Unterkante an
      // Viewport-Unterkante), rastet das Team ein und HÄLT STILL — über diese Strecke
      // schiebt sich die nächste Section (Home: LogoReveal, marginTop -100vh)
      // von unten voll darüber. Analog zum Desktop-Team-Pin. pinSpacing ergänzt den
      // Scrollweg; die -100vh der Folgesection überlagern die letzten 100vh des Pins.
      if (mTeam.current) {
        ScrollTrigger.create({
          trigger: mTeam.current,
          start: "bottom bottom",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }
    },
    { scope: root },
  );

  // Headline-Aufbau (Desktop + Mobile): Wörter steigen gestaffelt aus ihrer Maske,
  // sobald die jeweilige „Unser Team"-Headline ins Bild scrollt.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.utils.toArray<HTMLElement>("[data-team-head]").forEach((head) => {
        const words = head.querySelectorAll<HTMLElement>("[data-team-headword]");
        if (!words.length) return;
        if (reduce) {
          gsap.set(words, { yPercent: 0 });
          return;
        }
        gsap.set(words, { yPercent: 118 });
        gsap.to(words, {
          yPercent: 0,
          ease: "power3.out",
          duration: 0.9,
          stagger: 0.12,
          // TRIGGER = die SECTION, nicht die Headline selbst (Wolfram 16.07.): Die
          // Desktop-Headline sitzt in der gepinnten Bühne. Ein gepinntes Element wird
          // position:fixed — es wandert ab dem Pin-Start nicht mehr mit dem Scroll, seine
          // eigene „top 88%"-Marke kann es danach nie mehr erreichen. Die Section
          // dagegen behält ihre Layout-Position über die ganze Pin-Strecke.
          scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} style={{ background: "transparent" }}>
      {/* ── Desktop: gepinnte Bühne mit TEAM-Headline + entfaltendem Grid ──── */}
      <div data-team-stage className="relative max-[767px]:hidden" style={{ height: "100vh", overflow: "hidden" }}>
        {/* BREITE AN DIE HÖHE GEKOPPELT (Wolfram 16.07.): Die Bühne ist 100vh hoch, die
            Kachelbreite kam aber allein aus der Screenbreite → auf breiten/flachen Screens
            (z. B. 2560×1080) wurden die Porträts extrem flach (3,7:1). Jetzt deckelt
            zusätzlich ein vh-Term die Breite: je flacher der Screen, desto schmaler das
            Grid → die Kachel bleibt nah an 4:3, ohne Breakpoint-Raten. Weiterhin zentriert.
            WICHTIG: Die vertikalen Abstände + die Headline sind geclampt — als reine
            vw-Werte wuchsen sie mit der BREITE und fraßen bei 2560×1080 fast die halbe
            Bühne (496px), sodass fürs Grid nur 584px blieben. */}
        <div
          className="mx-auto flex h-full w-full flex-col"
          style={{
            maxWidth: "min(1680px, 105vh)",
            padding: "clamp(1.6rem, 4vw, 4rem) 2vw clamp(1rem, 3vw, 2.5rem)",
          }}
        >
          {/* TEAM-HEADLINE — LINKSBÜNDIG in Statement-Formatierung (Wolfram 16.07.).
              Vorher mittelachsig in der großen Display-Größe (7.22vw, gedeckelt auf
              6.6rem = die „Iconic IP"-Klasse). Jetzt dieselbe Größe/Gewichtung wie die
              Statement-Typo (clamp(1.9rem, 3.6vw, 4.2rem) / 500) und linksbündig — die
              Headline konkurriert damit nicht mehr mit den Porträts und gibt der Bühne
              zusätzlich Höhe zurück, die den Bildern zugutekommt. */}
          <h2
            data-team-head
            className="m-0 text-left uppercase text-[#f8f7f3]"
            style={{
              fontFamily: "var(--font-sharp), sans-serif",
              fontSize: "clamp(1.9rem, 3.6vw, 4.2rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: "122%",
              position: "relative",
              zIndex: 3,
              marginBottom: "clamp(0.8rem, 2vw, 1.6rem)",
            }}
          >
            <TeamHeadWords text="Unser Team" />
          </h2>

          {/* Raster: DREI Reihen — oben die drei Leader (Marcus, Knut, Michael Laegel)
              in größeren Kacheln, AB DER ZWEITEN REIHE EIN FÜNFERGRID (Wolfram 17.07.,
              vorher Vierer). Alle Personen bleiben innerhalb einer Bühne (100vh)
              sichtbar; die Leader-Reihe ist etwas höher (1.25fr).
              15 SPALTEN statt 12: 12 ist nicht durch 5 teilbar. 15 geht durch beides
              auf — Leader je span 5 (3 × 5), die übrigen je span 3 (5 × 3).
              Welche Person in welcher Reihe landet, steht in leadership.ts — hier zählt
              nur der Index. Die untere Reihe füllt sich von links auf, wenn Personen
              dazukommen. */}
          <div
            ref={grid}
            className="grid w-full min-h-0 flex-1"
            style={{
              gridTemplateColumns: "repeat(15, minmax(0, 1fr))",
              columnGap: "1.2vw",
              rowGap: "1.4vw",
              gridTemplateRows: "1.25fr 1fr 1fr",
              zIndex: 1,
            }}
          >
            {TEAM.map((p, i) => (
              <div
                // key über das Bild, nicht den Namen: Elena Kats hat vorerst einen leeren
                // Namen (Wolfram 17.07.), und ein leerer React-key ist unzuverlässig.
                key={p.img}
                data-team-tile
                className="flex min-h-0 flex-col"
                style={{ gridColumn: i < 3 ? "span 5" : "span 3", gap: "0.6vw", willChange: "transform" }}
              >
                <div className="min-h-0 flex-1 overflow-clip" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover" style={{ filter: "grayscale(1)", objectPosition: focus(p.img) }} />
                </div>
                <div data-team-meta className="flex flex-col" style={{ gap: "0.1vw", willChange: "transform, opacity" }}>
                  {/* minHeight = eine Namenszeile (Wolfram 17.07.): Elena Kats hat vorerst
                      keinen Namen. Ohne feste Höhe kollabiert die leere Zeile → ihre Meta
                      wird kürzer, und weil die Kachelhöhe fix ist, wächst ihr flex-1-Bild
                      gegenüber den Nachbarn (gemessen 130 statt 115 px). Für die anderen,
                      einzeiligen Namen ist 1.18em die natürliche Höhe → keine Änderung. */}
                  <div className="text-[#f8f7f3]" style={{ ...NAME, minHeight: "1.18em" }}>
                    {p.name}
                  </div>
                  {/* Rolle auf EINE Zeile Höhe fixiert, Überhang sichtbar (Wolfram 16.07.):
                      sonst macht ein zweizeiliger Titel (Matthaeus Jaworek) die Meta höher,
                      das flex-1-Bild schrumpft und sein Name rutscht gegenüber den Nachbarn
                      hoch. So bleiben alle Bilder gleich hoch, alle NAMEN fluchten — und die
                      zweite Titelzeile hängt einfach eine Zeile tiefer. */}
                  <div style={{ ...ROLE, height: "1.22em", overflow: "visible" }}>{p.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Mobile: 2-Spalten-Grid mit variierenden Kachelgrößen (Algarve
          team-grid-2: eine Kachel spannt volle Breite) → lebendiger Rhythmus
          statt starrer Raster. Die Kacheln bauen sich beim Scrollen Stück für
          Stück auf (gestaffelter Scale/Fade-Reveal, mReveal-useGSAP). */}
      <div ref={mTeam} className="hidden max-[767px]:block" style={{ padding: "16vw 3vw" }}>
        {/* Mobil ebenfalls kleiner + linksbündig (Wolfram 16.07.): 11vw → 7.4vw, das ist
            die Größe der mobilen Statement-Typo. */}
        <h2 data-team-head className="m-0 mb-8 text-left uppercase text-[#f8f7f3]" style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "7.4vw", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: "122%" }}>
          <TeamHeadWords text="Unser Team" />
        </h2>
        <div className="grid grid-cols-2" style={{ columnGap: "3vw", rowGap: "6vw" }}>
          {LEADERSHIP.map((p, i) => {
            // slice(0,11) entfernt (Wolfram 17.07.): mit Elena sind es 12 Personen — der
            // harte Cap hätte die Letzte mobil verschluckt. Wie im Desktop-Grid ist die
            // Reihenfolge das Layout, LEADERSHIP wird komplett gerendert.
            // Erste Kachel (CEO) als Feature über volle Breite; jede 5. Kachel als
            // Querformat-Feature → die Bildcontainer werden mal größer, mal kleiner.
            const feature = i === 0 || i === 5;
            return (
              <div
                // key über das Bild (leerer Name bei Elena, siehe Desktop-Grid oben).
                key={p.img}
                data-team-mtile
                className={`flex flex-col gap-3 ${feature ? "col-span-2" : ""}`}
              >
                <div
                  className="overflow-clip"
                  style={{ aspectRatio: feature ? "16 / 10" : "4 / 5", background: "rgba(255,255,255,0.08)" }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    style={{ filter: "grayscale(1)", objectPosition: focus(p.img) }}
                  />
                </div>
                <div>
                  <div className="text-[#f8f7f3]" style={{ fontFamily: "var(--font-sharp), sans-serif", fontWeight: 500, fontSize: feature ? "5vw" : "3.6vw", lineHeight: "120%" }}>
                    {p.name}
                  </div>
                  <div style={{ color: "rgba(248,247,243,0.64)", fontSize: feature ? "3.6vw" : "3vw", lineHeight: "125%" }}>{p.role}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
