"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DustLayer } from "./DustLayer";
import { homeStats } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Impact-Zahlen (aus dem entfernten Testimonials-Modul) — getönte Glas-Panels
// im stateofaidesign-Aufbau. Tints moody statt Pastell.
const STAT_TINTS = ["rgba(255,67,112,0.14)", "rgba(46,55,201,0.16)", "rgba(6,93,255,0.14)", "rgba(22,200,255,0.12)"];
const STATS = homeStats()
  .slice(0, 4)
  .map((s, i) => ({ value: s.value, label: s.label, tint: STAT_TINTS[i] }));

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
const SOFT = "rgba(248,247,243,0.62)";

// Marquee (Umbau 13.07.): Marcus-Bilder raus — stattdessen Produktions-/
// Festival-Material. ⚠️ Für die All3Media-Produktionen (filmpool, South &
// Browse) liegt noch KEIN Bildmaterial im Projekt (nur Logos) — sobald
// Stills geliefert sind, hier ergänzen.
const MARQUEE_IMAGES = [
  { src: "/about-partners/live-experience-cologne-comedy-festival.jpg", alt: "Cologne Comedy Festival", big: true },
  { src: "/grid/g12.jpg", alt: "Cologne Comedy Festival", big: false },
  { src: "/editorial/studio.jpg", alt: "Produktion im Banijay-Netzwerk", big: false },
];

const DEUTSCHLAND_PUNKTE = [
  "filmpool fiction, filmpool entertainment und South & Browse verstärken das deutsche Ökosystem.",
  "Marcus Wolter, CEO von Banijay Germany, übernimmt die Leitung der deutschen All3Media-Marken.",
  "Die Integration folgt dem dezentralen Banijay-Modell: Länder-CEOs steuern ihre Märkte selbst.",
  "Im ersten Jahr werden Synergien von rund 50 Millionen Euro erwartet.",
];

function Cta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-[8px] border no-underline transition-colors duration-300 hover:bg-[#f8f7f3] hover:text-[#0a0208]"
      style={{ borderColor: PAPER, color: PAPER, padding: "0.7rem 1.4rem", fontFamily: SHARP, fontSize: "0.95rem", fontWeight: 500 }}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

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

      // HEADLINE wie das AnimatedHeading-Modul über der Companies-Liste
      // (Wolfram 13.07.): zwei uppercase-Zeilen konvergieren gescrubbt — obere
      // von oben, untere von unten — mit zentral aufwachsendem Sternstaub.
      const vh = window.innerHeight;
      const hFirst = root.current?.querySelector<HTMLElement>("[data-ed-hl-first]");
      const hLast = root.current?.querySelector<HTMLElement>("[data-ed-hl-last]");
      const hDust = root.current?.querySelector<HTMLElement>("[data-ed-head-dust]");
      if (hFirst && hLast) {
        const htl = gsap.timeline({
          scrollTrigger: { trigger: "[data-ed-head]", start: "top bottom", end: "bottom 90%", scrub: 0.8 },
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
      }

      // BILD-MODUL-CHOREOGRAFIE (Referenz, Wolfram 13.07.): erst faded das große
      // Marcus-Bild auf und schiebt sich leicht nach links — dann swipen von
      // rechts die Fact-Boxen (Stat-Panels) in den frei werdenden Raum, danach
      // folgt der Artikeltext.
      const imgWrap = root.current?.querySelector<HTMLElement>("[data-ed-img]");
      const imgEl = imgWrap?.querySelector("img");
      const stats = gsap.utils.toArray<HTMLElement>("[data-ed-stat]");
      if (imgWrap && imgEl) {
        gsap.set(imgWrap, { autoAlpha: 0, xPercent: 12, scale: 1.06, transformOrigin: "left center" });
        gsap.set(imgEl, { scale: 1.22 });
        gsap.set(stats, { autoAlpha: 0, xPercent: 60 });
        const enter = gsap.timeline({
          scrollTrigger: { trigger: imgWrap, start: "top 80%", once: true },
        });
        enter
          // ① aufblenden
          .to(imgWrap, { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power3.out" }, 0)
          .to(imgEl, { scale: 1, duration: 2, ease: "power2.out" }, 0)
          // ② nach links schieben (macht rechts Platz)
          .to(imgWrap, { xPercent: 0, duration: 1.0, ease: "power3.inOut" }, 0.55)
          // ③ Fact-Boxen swipen von rechts rein
          .to(stats, { autoAlpha: 1, xPercent: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }, 0.9);
      }

      gsap.set("[data-ed-reveal]", { autoAlpha: 0, y: 56 });
      ScrollTrigger.batch("[data-ed-reveal]", {
        start: "top 86%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14, ease: "power3.out" }),
      });

      gsap.set("[data-ed-li]", { autoAlpha: 0, x: -32 });
      ScrollTrigger.batch("[data-ed-li]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }),
      });
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
          style={{ marginBottom: "5vw", minHeight: "min(84vh, 760px)" }}
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
            <span data-ed-hl-first className="block">Eine neue Ära:</span>
            <span data-ed-hl-last className="block">
              Banijay <span data-ed-amp style={{ fontStyle: "italic", color: "#ff4370" }}>&</span> All3Media.
            </span>
          </h2>
        </div>

        {/* Umbau 13.07.: Bildcontainer LINKS in HOCHKANT (Nick-Harwart-Porträt),
            Text rechts daneben. Bild klebt auf Desktop sticky, während der Text
            vorbeiläuft. */}
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[2fr_3fr] md:gap-10">
          {/* Hochkant-Bild links (Wipe-Reveal von unten + Zoom-Settle) */}
          <div data-ed-img className="w-full self-start overflow-hidden md:sticky md:top-[6rem]" style={{ aspectRatio: "2 / 3" }}>
            <img src="/editorial/marcus-hof.jpg" alt="Marcus Wolter, CEO Banijay Germany" className="h-full w-full object-cover" style={{ objectPosition: "50% 30%" }} />
          </div>

          <div className="flex flex-col" style={{ gap: "clamp(2.5rem, 5vw, 6rem)" }}>
            {/* STAT-BLÖCKE (Wolfram 13.07., stateofaidesign-Aufbau) — neben dem
                Einstiegsbild: große Zahl + Label auf getönten Glas-Panels
                (moody statt Pastell). */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  data-ed-stat
                  className="flex flex-col justify-between"
                  style={{
                    minHeight: "clamp(11rem, 16vw, 15rem)",
                    padding: "clamp(1.4rem, 2vw, 2.2rem)",
                    background: s.tint,
                    backdropFilter: "blur(14px) saturate(1.3)",
                    WebkitBackdropFilter: "blur(14px) saturate(1.3)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
                  }}
                >
                  <span style={{ fontFamily: SHARP, fontSize: "clamp(2.6rem, 4.4vw, 4.4rem)", fontWeight: 500, lineHeight: 0.95, letterSpacing: "-0.03em" }}>
                    {s.value}
                  </span>
                  <span style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: "128%", color: "rgba(248,247,243,0.8)" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Lead — zeitlos: Historie → Zukunft */}
            <p data-ed-reveal className="m-0" style={{ fontFamily: SHARP, fontSize: "clamp(1.4rem, 2.6vw, 2.8rem)", lineHeight: "118%", fontWeight: 500, letterSpacing: "-0.02em" }}>
              Vom einzelnen Produktionshaus zum Ökosystem mit über 40 Companies — und jetzt Teil eines globalen Powerhouses: Die Fusion von Banijay Entertainment und All3Media eröffnet dem deutschen Netzwerk das nächste Kapitel.
            </p>

            {/* Summary-Block: HELLES Milchglas mit dunkler Typo (Referenz-Optik
                13.07.) — warm-weiße Fläche, starker Blur, hauchdünner Gloss oben,
                eckig. Der dunkle Text sitzt satt lesbar auf der hellen Fläche. */}
            <div
              data-ed-reveal
              className="flex flex-col"
              style={{
                gap: "1.8rem",
                padding: "clamp(1.8rem, 3.6vw, 4.2rem)",
                background: "linear-gradient(165deg, rgba(248,247,243,0.92) 0%, rgba(248,247,243,0.76) 100%)",
                backdropFilter: "blur(24px) saturate(1.2)",
                WebkitBackdropFilter: "blur(24px) saturate(1.2)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), 0 28px 70px -35px rgba(0,0,0,0.6)",
                color: "#0a0208",
              }}
            >
              <h3 className="m-0" style={{ fontFamily: SHARP, fontSize: "clamp(1.3rem, 2.2vw, 2.2rem)", fontWeight: 500 }}>
                Die Story
              </h3>
              <div className="flex flex-col gap-4" style={{ fontSize: "clamp(1rem, 1.25vw, 1.35rem)", lineHeight: "145%", color: "rgba(10,2,8,0.82)" }}>
                <p className="m-0">
                  Banijay ist seit 2008 konsequent als Verbund unternehmerisch geführter Produktionshäuser gewachsen — zuletzt 2020 mit dem Zusammenschluss mit Endemol Shine. In Deutschland entstand daraus ein Ökosystem eigenständiger Companies: Produktionshäuser, Labels und Plattformen, die Entertainment auf Bildschirme, Bühnen und in Feeds bringen — vom Prime-Time-Format bis zum Podcast.
                </p>
                <p className="m-0">
                  Jetzt folgt der größte Schritt dieser Geschichte: Banijay Entertainment und All3Media bilden ein gemeinsames Haus — als 50/50-Joint-Venture der Banijay Group und RedBird IMI. Dahinter stehen 170 Companies in 25 Ländern, mehr als 265.000 Programmstunden und Formate wie MasterChef, The Traitors, Big Brother oder Peaky Blinders. „Gemeinsam beginnen wir ein neues Kapitel als globales Medien- und Entertainment-Powerhouse", sagt CEO Marco Bassetti.
                </p>
              </div>
            </div>

            {/* expect-halves */}
            <div data-ed-reveal className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_3fr]">
              <div style={{ fontFamily: SHARP, color: SOFT, fontStyle: "italic" }}>Der Blick nach vorn:</div>
              <ul className="m-0 flex list-none flex-col gap-3 p-0" style={{ fontSize: "clamp(1rem, 1.2vw, 1.3rem)", lineHeight: "140%" }}>
                {DEUTSCHLAND_PUNKTE.map((p) => (
                  <li key={p} data-ed-li className="flex items-start gap-3">
                    <span aria-hidden className="mt-[0.55em] h-[6px] w-[6px] shrink-0" style={{ background: "#ff4370" }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bild-Marquee full-width (Referenz: marquee cms-marquee) */}
      <div data-ed-reveal className="relative z-[1] w-full overflow-clip" style={{ marginTop: "6vw", marginBottom: "6vw" }}>
        <div className="editorial-marquee-track flex" style={{ gap: "1.2vw" }}>
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex shrink-0" style={{ gap: "1.2vw" }}>
              {MARQUEE_IMAGES.map((img) => (
                <div
                  key={`${dup}-${img.src}`}
                  className="editorial-marquee-item shrink-0 overflow-hidden"
                  style={{ width: img.big ? "min(42vw, 720px)" : "min(26vw, 460px)", height: "min(28vw, 480px)" }}
                >
                  <img src={img.src} alt={dup === 0 ? img.alt : ""} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: "50% 25%" }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom-Text + CTAs (Referenz: article-halves + bottom-button-wrap) */}
      <div className="relative z-[1] mx-auto" style={{ maxWidth: "1800px", paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_3fr]">
          <div className="max-md:hidden" />
          <div data-ed-reveal className="flex flex-col" style={{ gap: "3rem" }}>
            <div className="flex flex-col gap-4" style={{ fontSize: "clamp(1rem, 1.25vw, 1.35rem)", lineHeight: "145%", color: "rgba(248,247,243,0.85)" }}>
              <p className="m-0">
                Für das deutsche Netzwerk ist die Fusion vor allem eins: Zuwachs an Handschriften. Mit filmpool kommt jahrzehntelange Fiction- und Factual-Kompetenz dazu, mit South &amp; Browse eine weitere eigenständige Produzentenstimme — Companies, die das Ökosystem breiter machen, ohne seine Logik zu ändern: eigenständige Häuser, ein gemeinsames System.
              </p>
              <p className="m-0">
                Die Zukunft bleibt dezentral: Banijay Entertainment setzt auf ländergeführte Strukturen — Entscheidungen fallen dort, wo die Inhalte entstehen. Für Deutschland heißt das: Das Ökosystem um CEO Marcus Wolter wächst aus eigener Kraft weiter — jetzt mit über 40 Companies unter einem Dach.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Cta href="/news">Alle News</Cta>
              <Cta href="/companies">Zu den Companies</Cta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
