"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ABOUT } from "@/data/about";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// About – Partner-Section als vertikale Stacking-Cards (BYQ-„stacking cards"-
// Prinzip, in Banijay übersetzt): magentafarbener Break, zentrierter Intro-Block,
// darunter 4 große bildbasierte Sticky-Cards in einer langen Scroll-Stage. Sobald
// die nächste Card übernimmt, tritt die vorherige sichtbar nach hinten (dunkler +
// kleiner). Textkachel je Card unten links (leicht transparentes Ink, kein Glass-
// Look). Kein horizontaler Slider, kein Pin-Hack.

const SHARP = "var(--font-sharp), sans-serif";
const MAGENTA = "#ff4370";
const INK = "#0e0d0b";
const PAPER = "#f8f7f3";

// Karten rasten TIEFER ein (Wolfram 15.07.): unter der sticky Headline/Copy/CTA →
// beim Scroll-Stop sind Headline + Karte gemeinsam im selben Screen zu sehen.
const CARD_TOPS = ["36vh", "39vh", "42vh", "45vh"];
const CARD_SCALES = [0.7, 0.78, 0.86, 0.94];

// Mobile: die Karten rasten TIEFER ein (unter der Sticky-Nav + Abstand zum MENU),
// statt bei 8–17vw hinter der Navigationsebene zu kleben.
const MOBILE_CARD_TOPS = [
  "max-[767px]:!top-[22vw]",
  "max-[767px]:!top-[24.5vw]",
  "max-[767px]:!top-[27vw]",
  "max-[767px]:!top-[29.5vw]",
];

// Farbkodierung der schwarzen Text-Kacheln → je Fächer eine andere Farbe aus der
// Banijay-Videopalette (magenta · indigo · laser-pink · midnight-violet), leicht
// transparent + Blur (frosted). Helle Schrift bleibt lesbar.
const TILE_COLORS = [
  "rgba(255,67,112,0.86)", // Magenta
  "rgba(46,55,201,0.86)", // Electric Indigo
  "rgba(231,29,125,0.86)", // Laser Pink
  "rgba(49,16,90,0.9)", // Midnight Violet
];

export function AlgarvePartnerStack() {
  const { partnership } = ABOUT;
  const cards = partnership.cards;
  const root = useRef<HTMLElement>(null);
  const stack = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const sec = root.current;

      if (sec) {
        // Aufstieg über die (gepinnte) Team-Section — Desktop UND Mobile identisch:
        // die volle Magenta-Fläche schiebt sich mit -100vh-Overlap über das (gepinnte,
        // still stehende) Team; die gerundete Oberkante (rechts stärker → b-Körper)
        // faltet beim Aufsteigen auf.
        gsap.set(sec, { borderTopLeftRadius: "0vw", borderTopRightRadius: "0vw" });
        gsap.to(sec, {
          borderTopLeftRadius: "0vw",
          borderTopRightRadius: "0vw",
          ease: "none",
          scrollTrigger: { trigger: sec, start: "top bottom", end: "top top", scrub: 1, invalidateOnRefresh: true },
        });

        // Content-Parallax: ERST wenn die Magenta-Fläche voll gedeckt hat (top top),
        // ziehen Headline · Copy · CTA gestaffelt von unten herein — kurz & früh fertig.
        gsap.set("[data-partner-reveal]", { opacity: 0, y: 48 });
        gsap.to("[data-partner-reveal]", {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: { trigger: sec, start: "top top", end: "+=18%", scrub: 1, invalidateOnRefresh: true },
        });

        // Bildkarten (Desktop UND Mobile) zunächst UNSICHTBAR — sie erscheinen ERST,
        // NACHDEM die Schrift (Headline/Copy/CTA) vollständig eingezogen ist. „Erst die
        // Schrift, dann das Bild, dann läuft der Scroll weiter."
        gsap.set("[data-partner-card]", { autoAlpha: 0 });

        if (window.matchMedia("(min-width: 768px)").matches) {
          // Desktop (Wolfram 15.07.): die Schrift muss ZUERST klar stehen. Text-Reveal
          // endet ~18 %; die Karten erst deutlich danach (~40 %) einblenden → „erst
          // Magenta, dann Schrift, dann Cards", nichts überlagert die Headline.
          gsap.to("[data-partner-card]", {
            autoAlpha: 1,
            ease: "power2.out",
            duration: 0.7,
            stagger: 0.1,
            scrollTrigger: { trigger: sec, start: "top top-=40%", once: true },
          });
        } else {
          // Mobile zusätzlich: Intro-Schrift kurz PINNEN (nicht hinter die Sticky-Nav
          // wegscrollen); Karten einblenden, wenn nach dem Text-Pin der Stack hochkommt.
          const headline = sec.querySelector<HTMLElement>("[data-partner-headline]");
          if (headline) {
            ScrollTrigger.create({
              trigger: sec,
              start: "top top",
              end: () => "+=" + Math.round(window.innerHeight * 0.62),
              pin: headline,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            });
          }
          gsap.to("[data-partner-card]", {
            autoAlpha: 1,
            ease: "power1.out",
            duration: 0.4,
            stagger: 0.08,
            scrollTrigger: { trigger: stack.current, start: "top 88%", once: true },
          });
        }
      }

      const cardEls = gsap.utils.toArray<HTMLElement>("[data-partner-card]");
      if (cardEls.length < 2) return;
      gsap.set(cardEls, { filter: "brightness(1)", scale: 1, transformOrigin: "50% 0%" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: stack.current, start: "top top", end: "bottom bottom", scrub: 0.95, invalidateOnRefresh: true },
      });
      // Jede übernommene Card tritt nach hinten: dunkler + kleiner. Letzte bleibt.
      tl.to(cardEls[0], { filter: "brightness(0.52)", scale: CARD_SCALES[0], ease: "none" }, 0.22);
      tl.to(cardEls[1], { filter: "brightness(0.52)", scale: CARD_SCALES[1], ease: "none" }, 0.46);
      tl.to(cardEls[2], { filter: "brightness(0.52)", scale: CARD_SCALES[2], ease: "none" }, 0.7);
      tl.to(cardEls[3], { scale: CARD_SCALES[3], ease: "none" }, 0.88);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-nav-theme="magenta"
      // -100vh-Overlap + z-2 → die Magenta-Fläche schiebt sich über die (gepinnte)
      // Team-Section. Desktop UND Mobile identisch (die Team-Section pinnt jetzt auch
      // mobil am Ende).
      className="relative max-[767px]:!pt-[26vw]"
      style={{ background: MAGENTA, color: INK, paddingTop: "13vw", paddingBottom: "16vw", marginTop: "-100vh", zIndex: 2 }}
    >
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        {/* ── Intro-Block (schwarz auf Magenta) ────────────────────────────── */}
        <div
          data-partner-headline
          // Desktop: Headline/Copy/CTA STICKY oben (Wolfram 15.07.) → bleiben sichtbar,
          // während die (kleineren) Karten darunter im selben Screen stapeln. Mobile:
          // eigener GSAP-Pin (unverändert).
          className="relative z-[30] mx-auto flex max-w-[68vw] flex-col items-center text-center md:sticky md:top-[3vh] max-[767px]:!max-w-full"
          style={{ gap: "1vw", marginBottom: "2vw" }}
        >
          <h2 data-partner-reveal className="m-0 max-[767px]:!text-[9vw]" style={{ fontFamily: SHARP, fontSize: "3.6vw", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.11vw", color: INK }}>
            {partnership.headline}
          </h2>
          <p data-partner-reveal className="m-0 max-w-[56vw] max-[767px]:!max-w-full max-[767px]:!text-[4.2vw]" style={{ fontSize: "1.35vw", lineHeight: "142%", color: "rgba(14,13,11,0.72)" }}>
            {partnership.text}
          </p>
          <a
            data-partner-reveal
            href={partnership.cta.href}
            className="inline-flex w-fit items-center gap-2 rounded-[6px] text-[#0e0d0b] no-underline transition-colors duration-300 hover:bg-[#0e0d0b] hover:text-[#ff4370] max-[767px]:!mt-[2vw] max-[767px]:!px-[6vw] max-[767px]:!py-[3vw] max-[767px]:!text-[3.6vw]"
            style={{ border: "0.12vw solid #0e0d0b", padding: "0.9vw 1.8vw", fontFamily: SHARP, fontSize: "1.1vw", fontWeight: 500, marginTop: "1vw" }}
          >
            {partnership.cta.text}
            <ArrowUpRight className="h-[1.1vw] w-[1.1vw] max-[767px]:!h-[3.6vw] max-[767px]:!w-[3.6vw]" />
          </a>
        </div>

        {/* ── Stacking-Stage: 4 große Sticky-Cards ─────────────────────────── */}
        <div
          ref={stack}
          data-partner-stack
          className="mx-auto max-[767px]:!max-w-full max-[767px]:!h-[255vh]"
          style={{ height: "300vh", maxWidth: "80vw", position: "relative" }}
        >
          {cards.map((card, i) => (
            <article
              key={card.title}
              data-partner-card
              className={`overflow-hidden max-[767px]:!h-[52vh] ${MOBILE_CARD_TOPS[i] ?? "max-[767px]:!top-[24vw]"}`}
              style={{
                position: "sticky",
                top: CARD_TOPS[i],
                height: "50vh",
                marginBottom: i === 0 ? "2vw" : `${-2.8 * i}vw`,
                transformOrigin: "50% 0%",
                willChange: "transform, filter",
              }}
            >
              <img
                src={card.image}
                alt={card.imageAlt ?? card.title}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: card.objectPosition ?? "50% 50%" }}
              />

              {/* Textkachel unten links — leicht transparentes Ink, kein Glass-Look */}
              <div
                className="absolute max-w-[38vw] max-[767px]:!left-[4vw] max-[767px]:!right-[4vw] max-[767px]:!bottom-[4vw] max-[767px]:!max-w-none max-[767px]:!p-[5vw]"
                style={{ left: "2vw", bottom: "2vw", padding: "1.4vw", background: TILE_COLORS[i] ?? "rgba(14,13,11,0.72)", color: PAPER, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
              >
                <span
                  className="block max-[767px]:!text-[2.9vw]"
                  style={{ fontFamily: SHARP, fontSize: "0.8vw", fontWeight: 700, letterSpacing: "0.1vw", textTransform: "uppercase", color: "rgba(248,247,243,0.62)" }}
                >
                  {card.label}
                </span>
                <h3 className="m-0 max-[767px]:!text-[6vw]" style={{ marginTop: "0.6vw", fontFamily: SHARP, fontSize: "clamp(28px, 2.4vw, 52px)", lineHeight: "105%", fontWeight: 500, letterSpacing: "-0.04vw" }}>
                  {card.title}
                </h3>
                <p className="m-0 max-[767px]:!text-[3.6vw]" style={{ marginTop: "0.7vw", fontSize: "clamp(15px, 1.05vw, 20px)", lineHeight: "140%", color: "rgba(248,247,243,0.82)" }}>
                  {card.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
