"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LEADERSHIP } from "@/data/leadership";
import { DustLayer } from "./DustLayer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHARP = "var(--font-sharp), sans-serif";

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
//
// TEAM-FOTO-TAUSCH gegen Editorial-Porträts (Wolfram 22.07., finale Runde): Alle Portraits
// AUSSER Marcus + Michael Laegel (die bleiben) sind gegen Wolframs neue Einzelaufnahmen aus
// assets/People/ getauscht (Simone.jpg, Heike Lutzer.JPG, Janine.jpg, Michael Gaul.jpg,
// Elena.jpg, Sebastian lege.jpg, Matthaeus.jpg, Aylin.jpg, Natali.jpeg, Knut.JPG). Das sind
// KEINE vor-normierten Master (die liegen im Backup-Ordner assets/People/vereinheitlicht/),
// sondern Editorial-Shots mit unterschiedlicher Rahmung — jeder EINZELN auf die Reihen-Norm
// beschnitten: Kopf ~27 %, Scheitel ~8 %, Gesicht mittig → 900×1353. Dadurch sitzen sie auf
// object-position „50% 0%" (oben + seitlich bündig) alle gleich groß/hoch. Knut ist Leader-
// Reihe (900×1200 @ 14 %, s. u.). Die veralteten Einzelkommentare unten (900×1200, „Kopf
// 32 %", Top-Bias 18 %) beziehen sich auf VORIGE Crops und sind hinfällig.
export const FOCUS: Record<string, string> = {
  "/people/lead-1.jpg": "50% 22%",
  // Marcus Wolter (Wolfram 21.07.) — echtes Portrait in der LEADER-Reihe, wie Michael
  // Laegel beschnitten (Kopf sitzt oben im 900×1200-Ausschnitt) → derselbe Fokuswert 14 %.
  "/people/marcus-wolter.jpg": "50% 14%",
  "/people/lead-2.jpg": "50% 14%",
  // Aylin Firat (Wolfram 17.07.) — echtes Portrait, ersetzt lead-2.jpg. Bereits auf
  // Kopf/Oberkörper beschnitten (siehe leadership.ts), daher nur leichter Top-Bias.
  "/people/aylin-firat.jpg": "50% 0%",
  // Elena Kats (Wolfram 19.07.) — Ganzkörper-Sitzfoto jetzt ENG auf Kopf/Oberkörper
  // beschnitten (Kopf ~28 % der Bildhöhe, wie die übrigen Portraits) → gleicher Top-Bias.
  "/people/elena-kats.jpg": "50% 0%",
  // Michael Gaul (Wolfram 17.07.) — echtes Portrait, ersetzt lead-5.jpg. Nach derselben
  // Regel wie Aylin beschnitten (siehe leadership.ts), daher derselbe Top-Bias.
  "/people/michael-gaul.jpg": "50% 0%",
  // Alle vier Portraits aus der 2026er-Session sind nach derselben Regel beschnitten
  // (Kopf = 32 % der Ausschnitthöhe, siehe leadership.ts) → identischer Top-Bias.
  "/people/matthaeus-jaworek.jpg": "50% 0%",
  "/people/sebastian-menge.jpg": "50% 0%",
  // Michael Laegel steht in der LEADER-Reihe (Kachel 1.36 statt 1.03) und ist daher
  // anders beschnitten — siehe leadership.ts. Dort zeigt die Kachel nur 55 % der
  // Bildhöhe, deshalb ein knapperer Top-Bias als bei den 32%-Portraits.
  "/people/michael-laegel.jpg": "50% 14%",
  // Knut Kremling — NEUES hochauflösendes Portrait (Wolfram 22.07., Knut.JPG 3800×5712).
  // Jetzt wie Marcus/Michael Laegel auf 900×1200 beschnitten (Scheitel ~12 %, Kinn ~48 %,
  // mittig, gleiche Kopfgröße) → derselbe Leader-Fokuswert 14 %. Löst die alte niedrig
  // aufgelöste Quelle (1362×2048) ab, die kein Herauszoomen zuließ. extract(673,1220,1922,2563).
  "/people/knut-kremling.jpg": "50% 14%",
  // Kopfgrößen-Normalisierung (Wolfram 20.07.): jetzt 900×1200 (3:4) mit Kopf ~38 % /
  // Kopf-Oberkante 12 % wie die Standard-Reihe → gleicher Fokuswert 18 %.
  "/people/simone-lenzen.jpg": "50% 0%",
  "/people/lead-3.jpg": "50% 12%",
  "/people/lead-4.jpg": "50% 22%",
  "/people/lead-5.jpg": "50% 20%",
  // Natali Naso (Wolfram 20.07.): echtes Portrait natali-naso.jpg, 900×1200 (3:4) wie die
  // übrigen Standard-Reihen (Kopf ~32 %, 12 % Luft oben) → gleicher Fokuswert wie die
  // Nachbarn (18 %). Löst den Platzhalter lead-6.jpg ab.
  "/people/natali-naso.jpg": "50% 0%",
  // Janine Berns (Wolfram 21.07.) — echtes Portrait, löst lead-1.jpg ab. Nach derselben
  // Reihen-Norm beschnitten (Kopf ~33 %, höher) → gleicher Top-Bias wie die Nachbarn.
  "/people/janine-berns.jpg": "50% 0%",
  "/people/lead-7.jpg": "50% 26%",
  // Heike Lutzer (Wolfram 20.07.) — echtes Portrait, löst lead-8.jpg ab. Ganzkörper-Quelle
  // eng auf Kopf/Oberkörper beschnitten (Kopf ~29 %) → gleicher Top-Bias wie die anderen.
  "/people/heike-lutzer.jpg": "50% 0%",
  "/people/lead-9.jpg": "50% 22%",
};
export const focus = (img: string) => FOCUS[img] ?? "50% 20%";

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
  const wrap = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const mTeam = useRef<HTMLDivElement>(null); // Mobile-Team-Container (für End-Pin)

  // INTRO „UNSER TEAM" (Wolfram 22.07.) — dieselbe Zwischen-Sequenz wie bei Snap/Editorial:
  // eigener Screen auf dem Sternenstaub VOR der gepinnten Team-Bühne, Wörter steigen aus der
  // Maske. Steht als Geschwister VOR <section ref=root>, damit der Team-Pin (Trigger = root,
  // start „top top") unberührt bleibt.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const words = gsap.utils.toArray<HTMLElement>("[data-mo-word]");
      if (words.length) {
        gsap.from(words, { yPercent: 120, duration: 1.1, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: "[data-mo-intro]", start: "top 70%", once: true } });
      }
    },
    { scope: wrap },
  );

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
          end: holdForOverlay ? "+=280%" : "+=120%",
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

      // END-PIN ENTFERNT (Wolfram 21.07.): Das mobile Team-Grid ist HÖHER als 100vh
      // (12 Personen im 2-Spalter). Der frühere End-Pin + der -100vh-Overlap des
      // LogoReveal-Videos legten das Video über die untersten Reihen (Sebastian/Matthäus/
      // Aylin) — es wurde „zu früh hochgezogen", ruckelte und schnitt Teammitglieder ab.
      // Auf Mobile scrollt das Team jetzt vollständig durch; das LogoReveal-Video folgt
      // OHNE Overlap, mit etwas Abstand danach (dort marginTop mobil = +32vh, Wolfram
      // 22.07.: „ein bisschen mehr Pause", bevor sich das Video über Aylins letzte Kachel
      // legt), sodass alle Personen sichtbar bleiben. (Desktop behält Pin + Overlap.)
    },
    { scope: root },
  );

  return (
    <div ref={wrap} className="relative">
      {/* ── INTRO-Sequenz „UNSER TEAM" auf dem Sternenstaub, EIGENER Screen VOR der
          gepinnten Team-Bühne (wie Snap/Editorial). ──────────────────────────────────── */}
      <div data-mo-intro className="relative flex w-full items-center justify-center overflow-clip" style={{ height: "78vh", minHeight: "520px" }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage: "linear-gradient(180deg, transparent 0%, black 16%, black 84%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 16%, black 84%, transparent 100%)",
          }}
        >
          <DustLayer boost={0.85} center={{ x: 0.5, y: 0.5 }} radius={0.62} />
        </div>
        <h2 className="relative z-[1] m-0 text-center uppercase text-[#f8f7f3]" style={{ fontFamily: SHARP, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 0.92 }}>
          <span className="block overflow-hidden">
            <span data-mo-word className="block text-[9vw] max-[767px]:!text-[15vw]">Unser</span>
          </span>
          <span className="block overflow-hidden">
            <span data-mo-word className="block text-[9vw] max-[767px]:!text-[15vw]">Team</span>
          </span>
        </h2>
      </div>

      <section ref={root} style={{ background: "transparent" }}>
      {/* ── Desktop: gepinnte Bühne mit entfaltendem Grid (Headline jetzt als Intro davor) ──── */}
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
            // UNTEN RESERVE FÜR DEN ROLLEN-ÜBERHANG (Wolfram 20.07.): Die Rolle ist auf
            // 1 Zeile Höhe fixiert (damit alle Namen fluchten), Mehrzeiler hängen per
            // overflow:visible nach unten. Matthaeus Jaworeks 3-zeiliger Titel („Director
            // Financial Planning, Reporting & Controlling") ragte dadurch unten aus der
            // Bühne. Statt seinen Titel zu kürzen, reservieren wir unten 2 ROLE-Zeilen
            // (den Worst Case) — das schrumpft das flex-1-Grid minimal und rückt den
            // GANZEN Aufbau nach oben, wo der Überhang Platz hat. calc behält die
            // responsive Basis und addiert nur den festen Reserve-Betrag.
            padding:
              "clamp(1.6rem, 4vw, 4rem) 2vw calc(clamp(1rem, 3vw, 2.5rem) + 2.4rem)",
          }}
        >
          {/* Headline „Unser Team" jetzt als Intro-Sequenz VOR der Bühne (Wolfram 22.07.),
              nicht mehr in der Bühne — daher hier entfernt. */}

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
        {/* Headline „Unser Team" jetzt als Intro-Sequenz VOR dem Team (Wolfram 22.07.). */}
        <div className="grid grid-cols-2" style={{ columnGap: "3vw", rowGap: "6vw" }}>
          {LEADERSHIP.map((p, i) => {
            // slice(0,11) entfernt (Wolfram 17.07.): mit Elena sind es 12 Personen — der
            // harte Cap hätte die Letzte mobil verschluckt. Wie im Desktop-Grid ist die
            // Reihenfolge das Layout, LEADERSHIP wird komplett gerendert.
            // Die DREI Leader (Marcus, Knut, Michael Laegel = i 0–2) jeweils über die
            // volle Breite gestapelt (Wolfram 19.07.), danach durchgehend zweispaltig.
            // Kein 5.-Kachel-Feature mehr → alle Kacheln darunter gleich groß (4/5).
            const feature = i < 3;
            return (
              <div
                // key über das Bild (leerer Name bei Elena, siehe Desktop-Grid oben).
                key={p.img}
                data-team-mtile
                className={`flex flex-col gap-3 ${feature ? "col-span-2" : ""}`}
              >
                {/* FIX (Wolfram 19.07.): das Bild ABSOLUT positioniert — sonst trieb es als
                    Flex-Kind (min-height:auto) die Containerhöhe auf seine natürliche
                    Bildproportion und die aspect-ratio wurde ignoriert (Natalis 3:4-Bild
                    ergab so ein niedrigeres Feld als die 0.665-Portraits). Jetzt bestimmt die
                    aspect-ratio die Höhe → ALLE Kacheln exakt 4/5, Leader nur voller Breite. */}
                <div
                  className="relative overflow-clip"
                  style={{ aspectRatio: "4 / 5", background: "rgba(255,255,255,0.08)" }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="absolute inset-0 h-full w-full object-cover"
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
    </div>
  );
}
