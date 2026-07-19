"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./DustLayer";
import { EditorialStickyScene } from "./EditorialStickyScene";

gsap.registerPlugin(ScrollTrigger, useGSAP);


// EDITORIAL-SECTION (Task #56, Wolfram 13.07.) — Marcus zur Historie und
// Zukunft von Banijay, Anlass: Abschluss der Fusion Banijay Entertainment +
// All3Media (09.07.2026). Aufbau nach der BYQ-„cms-page-2"-Referenz:
//   headline-article → article-halves (Meta links / Bild+Lead+Summary+Liste
//   rechts) → Bild-MARQUEE full-width → Bottom-Text + CTAs.
// Dark/Mood-adaptiert: Container ECKIG (Heike), Summary als glass-panel,
// Marquee-Bilder grayscale mit Color-Hover (wie Referenz).
// ⚠️ WORDING: Entwurf, abgewandelt aus banijay.com-Blog (09.07.2026) und
// DWDL-Meldung zur Fusion — final via Heike (#58). Zitate sind ECHTE Zitate
// (Bassetti/Zucker, übersetzt). Kein erfundenes Marcus-Zitat.

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";
const INK = "#0e0d0b";

// IP-BRANDS SLIDER (Wolfram 15.07., dritte Reihe 16.07.): die ikonischen Banijay-IPs
// laufen als DREI Reihen — links / rechts / links. Jeder Container behält die
// Original-Proportion des Visuals (nichts beschnitten). „Wer wird Millionär" und
// „TV total" führen die obere Reihe an → im ersten Screen garantiert sichtbar.
// Assets: /public/ip-brands (weboptimiert aus assets/Bilder, Höhe 560).
//
// Die 28 vorhandenen Motive sind auf 10/9/9 verteilt (statt 14/14) — für die dritte
// Reihe gab es kein zusätzliches Material, also füllen die oberen Reihen weniger.
// Kommen neue IP-Visuals dazu, einfach hier verteilen.
type Brand = { slug: string; name: string };
const b = (slug: string, name: string): Brand => ({ slug, name });
const BRANDS_TOP: Brand[] = [
  b("wer-wird-millionar", "Wer wird Millionär"),
  b("tv-total", "TV total"),
  b("die-hohle-der-lowen", "Die Höhle der Löwen"),
  b("the-masked-singer", "The Masked Singer"),
  b("kitchen-impossible", "Kitchen Impossible"),
  b("schlag-den-star", "Schlag den Star"),
  b("promi-big-brother", "Promi Big Brother"),
  b("temptation-island", "Temptation Island"),
  b("kampf-der-realitystars", "Kampf der Realitystars"),
  b("stromberg", "Stromberg"),
];
const BRANDS_MID: Brand[] = [
  b("nightwash", "NightWash"),
  b("barbara-salesch", "Barbara Salesch"),
  b("der-lehrer", "Der Lehrer"),
  b("tatort-munster", "Tatort Münster"),
  b("the-50", "The 50"),
  b("die-verrater", "Die Verräter"),
  b("villa-der-versuchung", "Villa der Versuchung"),
  b("richter-alexander-hold", "Richter Alexander Hold"),
  b("kommissar-dupin", "Kommissar Dupin"),
];
const BRANDS_BOTTOM: Brand[] = [
  b("die-landarztpraxis", "Die Landarztpraxis"),
  b("berlin-tag-und-nacht", "Berlin – Tag und Nacht"),
  b("bitte-melde-dich", "Bitte melde dich"),
  b("die-besten-comedians-deutschlands", "Die besten Comedians Deutschlands"),
  b("dunentod", "Dünentod"),
  b("rudi-voller-es-kann-nur-einen-geben", "Rudi Völler – Es kann nur einen geben"),
  b("luminiscence", "Luminiscence"),
  b("mcdonalds-stromberg-mockumentary", "Stromberg × McDonald's"),
  b("tatort-nachtschatten", "Tatort Nachtschatten"),
];


export function AlgarveEditorial() {
  const root = useRef<HTMLElement>(null);

  // ENTRANCE-CHOREOGRAFIE (Wolfram 13.07., „spektakulärer"):
  //  ① Headline-Zeilen schieben sich aus Masken hoch (power4), das magenta
  //     „&" poppt mit Overshoot-Dreher hinterher
  //  ② das Hochkant-Porträt WISCHT von unten auf (clip-path) und settelt
  //     aus einem 1.25er-Zoom
  //  ③ Lead, Story-Panel, Marquee, Bottom staffeln als Blöcke herein
  //  ④ die „Blick nach vorn"-Punkte ticken einzeln von links ein
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // HEADLINE wie das AnimatedHeading-Modul: zwei uppercase-Zeilen konvergieren
      // gescrubbt (obere von oben, untere von unten). Als Helper → mehrfach nutzbar
      // (About Banijay + ICONIC IP über dem IP-Slider, Wolfram 15.07.).
      const vh = window.innerHeight;
      const animHead = (headSel: string, firstSel: string, lastSel: string, dustSel?: string) => {
        const hFirst = root.current?.querySelector<HTMLElement>(firstSel);
        const hLast = root.current?.querySelector<HTMLElement>(lastSel);
        const hDust = dustSel ? root.current?.querySelector<HTMLElement>(dustSel) : null;
        if (!hFirst || !hLast) return;
        const htl = gsap.timeline({
          scrollTrigger: { trigger: headSel, start: "top bottom", end: "bottom 90%", scrub: 0.8 },
        });
        htl
          .from(hFirst, { y: -0.15 * vh, ease: "none", duration: 1 }, 0)
          .from(hLast, { y: 0.15 * vh, ease: "none", duration: 1 }, 0);
        if (hDust) {
          htl.fromTo(
            hDust,
            { autoAlpha: 0, scale: 0.55, transformOrigin: "50% 50%" },
            { autoAlpha: 0.7, scale: 1, ease: "power2.out", duration: 0.8 },
            0.1,
          );
        }
      };
      animHead("[data-ed-head]", "[data-ed-hl-first]", "[data-ed-hl-last]", "[data-ed-head-dust]");
      animHead("[data-ed-head2]", "[data-ed-hl2-first]", "[data-ed-hl2-last]");

      // Das Bild-Modul lebt jetzt in <EditorialStickyScene /> (eigene Sticky-
      // Scroll-Interaktion nach stateofaidesign.com — Wolfram 14.07.).

      gsap.set("[data-ed-reveal]", { autoAlpha: 0, y: 56 });
      ScrollTrigger.batch("[data-ed-reveal]", {
        start: "top 86%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14, ease: "power3.out" }),
      });

      // „DIE STORY" — PARALLAX-AUSZUG (Wolfram 16.07.): die weiße Box ist an den
      // Marcus/Facts-Körper angedockt und steckt anfangs komplett hinter dessen
      // Unterkante (yPercent -100, von der Maske geclippt). Erst wenn die Zahlen-
      // Section steht und man weiterscrollt, zieht sie sich gescrubbt darunter hervor.
      // Die Box läuft dabei langsamer als der Scroll → Parallax.
      // NUR DESKTOP (Wolfram 19.07.): Auf Mobile war der Parallax so getimt, dass die
      // weiße Box erst voll erschien, wenn das (natürlich fließende) Akkordeon schon aus
      // dem Screen war → man sah den Text nie ganz. Mobil daher KEIN yPercent-Auszug: die
      // Story steht als normaler Block direkt im Fluss und ist beim Hinscrollen sofort
      // vollständig sichtbar.
      const storyMask = root.current?.querySelector<HTMLElement>("[data-ed-story-mask]");
      const story = root.current?.querySelector<HTMLElement>("[data-ed-story]");
      if (storyMask && story && window.matchMedia("(min-width: 768px)").matches) {
        gsap.fromTo(
          story,
          { yPercent: -100 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: storyMask,
              start: "top bottom",
              end: "top 42%",
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden" style={{ background: "transparent", color: PAPER, paddingTop: "8vw", paddingBottom: "8vw" }}>
      {/* Sternenstaub rechts oben (Wolfram 13.07.) — Lichtfeld in der Ecke,
          weich maskiert; die Inhalte liegen darüber (z-1). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          zIndex: 0,
          maskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 8%, black 88%, transparent 100%)",
        }}
      >
        <DustLayer boost={0.85} center={{ x: 0.85, y: 0.08 }} radius={0.75} />
      </div>

      <div className="relative z-[1] mx-auto" style={{ maxWidth: "1800px", paddingLeft: "2vw", paddingRight: "2vw" }}>
        {/* headline-article — ZEITLOS (13.07.): kein Eyebrow, kein Datum.
            Optik wie die Headline über der Companies-Liste (AnimatedHeading,
            Wolfram 13.07.): zentriert, uppercase, groß; die zwei Zeilen
            konvergieren gescrubbt (obere von oben, untere von unten) auf
            zentralem Sternstaub. */}
        <div
          data-ed-head
          className="relative flex flex-col items-center justify-center overflow-clip text-center"
          style={{ marginBottom: "2vw", minHeight: "min(46vh, 440px)" }}
        >
          {/* zentraler Sternstaub hinter der Headline (wächst mit dem Scrub) */}
          <div
            data-ed-head-dust
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0"
            style={{
              maskImage: "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%)",
            }}
          >
            <DustLayer boost={0.85} center={{ x: 0.5, y: 0.5 }} radius={0.6} />
          </div>
          <h2
            className="relative m-0"
            style={{
              fontFamily: SHARP,
              fontSize: "7vw",
              lineHeight: "112%",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            {/* kein per-Zeilen-overflow-hidden → die Ä-Punkte bleiben sichtbar;
                der Translate wird vom overflow-clip des Panels gefasst. */}
            <span data-ed-hl-first className="block">About</span>
            <span data-ed-hl-last className="block">Banijay</span>
          </h2>
        </div>

        {/* BILD-MODUL als Sticky-Scroll-Interaktion — die Marcus-Quote liegt jetzt
            unten links AUF dem Bild (Wolfram 15.07.), daher hier kein separater
            Zitat-Block mehr. */}
        <EditorialStickyScene />

        {/* „Die Story" — DOCKT an den Marcus/Facts-Körper (Wolfram 16.07.): identischer
            Container wie die Sticky-Scene (mx-auto, maxWidth 1920, 16px Innenabstand) →
            läuft links wie rechts exakt bündig mit dem Modul darüber. Kein [1fr_3fr]-
            Einzug und kein marginTop mehr — die Box sitzt direkt darunter.
            Die Maske clippt sie; beim Weiterscrollen (nachdem die Zahlen-Section steht)
            schiebt sich die weiße Box als Parallax darunter hervor. */}
        <div
          data-ed-story-mask
          // Andock-marginTop (Andocken an die 100vh-Bühne) NUR Desktop (md:) — auf Mobile
          // ist die Sticky-Scene content-hoch, dort würde die Formel die Box hochziehen und
          // ins Akkordeon schieben. Mobil daher normaler Abstand (mt-10). Am Ende fährt die
          // Box gescrubbt von unten heraus (yPercent -100 → 0, siehe useGSAP).
          className="mx-auto mt-10 w-full overflow-hidden md:!mt-[calc((clamp(680px,82vh,1000px)_-_100vh)_/_2)]"
          style={{
            maxWidth: "1920px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <div
            data-ed-story
            className="flex flex-col"
            style={{ gap: "1.6rem", background: PAPER, color: INK, padding: "clamp(1.8rem, 3vw, 3rem)" }}
          >
            <h3 className="m-0" style={{ fontFamily: SHARP, fontSize: "clamp(1.3rem, 2.2vw, 2.2rem)", fontWeight: 500, color: INK }}>
              Die Banijay Story
            </h3>
            <div className="flex flex-col gap-4" style={{ fontSize: "clamp(1rem, 1.25vw, 1.35rem)", lineHeight: "145%", color: "rgba(14,13,11,0.78)" }}>
              {/* Platzhalter (Wolfram 15.07.: Story-Text auf Lorem ipsum, bis finales Wording). */}
              <p className="m-0">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
              <p className="m-0">
                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ICONIC IP — fette Headline über dem Brand-Slider, animiert (Formatierung
          wie „About Banijay": 7vw uppercase, konvergierende Zeilen) — Wolfram 15.07. */}
      <div
        data-ed-head2
        className="relative z-[1] mx-auto flex flex-col items-center justify-center overflow-clip text-center"
        style={{ maxWidth: "1800px", paddingLeft: "2vw", paddingRight: "2vw", marginTop: "5vw", minHeight: "min(38vh, 360px)" }}
      >
        <h2
          className="relative m-0"
          style={{ fontFamily: SHARP, fontSize: "7vw", lineHeight: "112%", fontWeight: 500, textTransform: "uppercase", letterSpacing: "-0.02em" }}
        >
          <span data-ed-hl2-first className="inline-block">Iconic</span>
          <span data-ed-hl2-last className="inline-block" style={{ marginLeft: "0.28em" }}>IP</span>
        </h2>
      </div>

      {/* IP-BRANDS SLIDER full-width — DREI Reihen (links / rechts / links), kompaktes
          Raster, jeder Container in Original-Proportion (nichts beschnitten). Die dritte
          Reihe läuft wie die erste von rechts nach links (Wolfram 16.07.). */}
      <div data-ed-reveal className="relative z-[1] w-full overflow-clip" style={{ marginTop: "2vw", marginBottom: "6vw" }}>
        <div className="flex flex-col" style={{ gap: "clamp(0.3rem, 0.5vw, 0.7rem)" }}>
          {[
            { rows: BRANDS_TOP, dir: "is-left" },
            { rows: BRANDS_MID, dir: "is-right" },
            { rows: BRANDS_BOTTOM, dir: "is-left" },
          ].map((row, ri) => (
            <div key={ri} className={`ip-brands-track flex ${row.dir}`} style={{ gap: "clamp(0.3rem, 0.5vw, 0.7rem)" }}>
              {/* DREI Kopien (Wolfram 16.07.): seit die Reihen nur noch 9–10 Motive
                  tragen, ist EINE Kopie schmaler als ein breiter Screen — mit nur zwei
                  Kopien risse am Loop-Punkt eine Lücke auf. Passend dazu läuft das
                  Keyframe auf -33,33 % (= exakt eine Kopie) statt -50 %. */}
              {[0, 1, 2].map((dup) => (
                <div key={dup} aria-hidden={dup !== 0} className="flex shrink-0" style={{ gap: "clamp(0.3rem, 0.5vw, 0.7rem)" }}>
                  {row.rows.map((brand) => (
                    <div
                      key={`${dup}-${brand.slug}`}
                      className="relative shrink-0 overflow-hidden"
                      style={{ height: "clamp(108px, 13.5vw, 208px)" }}
                    >
                      <img
                        src={`/ip-brands/${brand.slug}.webp`}
                        alt={dup === 0 ? brand.name : ""}
                        loading="lazy"
                        className="block h-full w-auto"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
