"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ABOUT } from "@/data/about";
import { AlgarveLogoTicker } from "./LogoTicker";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// About – Banijay World / Territory-Holdings-Netzwerk. Magentafarbener Farb-„Break",
// der via -100vh-Overlap über das stehende Statement steigt (b-Körper-Oberkante
// faltet auf). Auf DESKTOP ein Scroll-Stop mit klarer Nacheinander-Choreografie:
//   1) Der (leere) Magenta-Hintergrund schiebt sich VERSETZT über das Statement und
//      rastet full-size ein.
//   2) ERST DANACH baut sich der Content per Parallax gestaffelt auf (Eyebrow →
//      Headline → Copy → CTA → Video → Logo-Bahn) + eine ruhige Setz-Phase (Hold).
//   3) Dann slidet die Logo-Bahn horizontal durch — bis das letzte bündig steht;
//      der Pin löst, der Scroll geht in Team. Die Logo-Bahn ist zusätzlich MANUELL
//      zieh-/swipebar (native scrollLeft + Drag-Handler).
// Mobile: statisch, nativer Horizontal-Scroll.

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const MAGENTA = "#ff4370";

export function AlgarveWorldNetwork() {
  const { world } = ABOUT;
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Die Drag-/Pan-Mechanik der Logo-Kachelbahn (Pointer-Handler, „lastManual"-Sperre
  // gegen den scroll-getriebenen Slide) ist mit der Bahn entfallen (Wolfram 16.07.) —
  // der Ticker läuft von allein und ist nicht bedienbar.

  useGSAP(
    () => {
      const sec = root.current;
      if (!sec || !panel.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return; // Content sichtbar, Logo-Bahn nativ scroll-/ziehbar.
      const desktop = window.matchMedia("(min-width: 768px)").matches;

      // 1) Aufstieg: radial gekurvte Oberkante (rechts stärker → b-Körper) faltet
      //    beim Hochsteigen auf. Der Content ist dabei noch verborgen (leerer
      //    Magenta-Grund schiebt sich versetzt über das Statement).
      gsap.set(sec, { borderTopLeftRadius: "0vw", borderTopRightRadius: "0vw" });
      gsap.to(sec, {
        borderTopLeftRadius: "0vw",
        borderTopRightRadius: "0vw",
        ease: "none",
        scrollTrigger: { trigger: sec, start: "top bottom", end: "top top", scrub: 1, invalidateOnRefresh: true },
      });

      // 2) Content-Parallax: der leere Magenta-Grund steht ZUERST (Aufstieg über das
      //    Statement). Erst beim WEITERSCROLLEN (nach dem Andocken) zieht der Content
      //    gestaffelt von unten herein — scroll-/scrub-gekoppelt (Parallax), über die
      //    erste Hälfte der Setz-Phase. So kommt es klar NACHEINANDER: Layer → Text.
      gsap.set("[data-wn-reveal]", { opacity: 0, y: 72 });
      gsap.to("[data-wn-reveal]", {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          // Feste Aufbau-Strecke (unabhängig vom Logo-Überhang) — der Content zieht über
          // ~0.7 Screens vollständig ein, BEVOR die Setz-Phase hält bzw. die Logos sliden.
          end: () => "+=" + Math.round(window.innerHeight * 0.7),
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 3) Scroll-Stop: Panel gepinnt, Setz-Phase (Content zieht ein), dann löst der Pin.
      //    Der frühere Logo-Slide (Pin-Strecke = Setz-Phase + Slide-Überhang der
      //    Kachelbahn, gesteuert über wrap.scrollLeft) ist mit der Bahn entfallen
      //    (Wolfram 16.07.) — die Pin-Strecke ist jetzt reine Setz-Phase.
      if (desktop) {
        ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * 1.5),
          pin: panel.current,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          // Snap-Scroll: die Section rastet full-size ein (0) bzw. gibt am Ende frei (1).
          snap: { snapTo: [0, 1], duration: { min: 0.2, max: 0.5 }, ease: "power1.inOut", delay: 0.1 },
        });
      } else {
        // Mobile: kurzer Pin ab „top top", damit der Panel-Content (Headline/Copy/CTA)
        // beim Einziehen NICHT sofort hinter die Sticky-Nav wegscrollt. Pin-Länge =
        // Reveal-Strecke + kleiner Hold; danach löst der Pin.
        const revealLen = Math.round(window.innerHeight * 0.7);
        ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end: () => "+=" + (revealLen + Math.round(window.innerHeight * 0.4)),
          pin: panel.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-nav-theme="magenta"
      // Desktop UND Mobile: -100vh-Overlap (steigt über das Statement), Curving-Oberkante
      // faltet beim Aufsteigen auf (GSAP). Kein statischer Mobile-Rounded mehr.
      className="relative"
      style={{ background: MAGENTA, color: INK, marginTop: "-100vh", zIndex: 2 }}
    >
      {/* Full-size Panel — Desktop gepinnt (Scroll-Stop). Mobile: min. voller Screen,
          damit die Magenta-Fläche beim Aufsteigen das Statement voll deckt. */}
      <div
        ref={panel}
        className="flex h-screen w-full flex-col justify-center max-[767px]:!min-h-screen max-[767px]:!h-auto max-[767px]:!justify-start max-[767px]:!pt-[24vw] max-[767px]:!pb-[14vw]"
        style={{ paddingTop: "3vh", paddingBottom: "3vh", rowGap: "clamp(20px, 3vh, 44px)" }}
      >
        {/* ── Kopf: Textblock links, Brand-Video rechts (mittig im Grid) ─────── */}
        <div className="mx-auto w-full max-[767px]:!px-[5vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1560px" }}>
          {/* Bildcontainer oben an der Headline-Oberlänge ausgerichtet (Wolfram
              15.07.): items-start statt -center → Video-Oberkante bündig zur Headline. */}
          <div className="grid items-start md:grid-cols-[1fr_1fr] max-[767px]:!grid-cols-1" style={{ columnGap: "4vw", rowGap: "8vw" }}>
            <div className="flex flex-col items-start" style={{ gap: "1.6vw" }}>
              <h2
                data-wn-reveal
                className="m-0 max-[767px]:!text-[8.5vw]"
                style={{ fontFamily: SHARP, fontSize: "3.1vw", lineHeight: "112%", fontWeight: 500, letterSpacing: "-0.09vw", color: INK }}
              >
                {world.headline}
              </h2>
              <p
                data-wn-reveal
                className="m-0 max-w-[43vw] max-[767px]:!max-w-full max-[767px]:!text-[4vw]"
                style={{ fontSize: "1.2vw", lineHeight: "146%", color: "rgba(14,13,11,0.72)" }}
              >
                {world.text}
              </p>
              <a
                data-wn-reveal
                href={world.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-[6px] text-[#0e0d0b] no-underline transition-colors duration-300 hover:bg-[#0e0d0b] hover:text-[#ff4370] max-[767px]:!mt-[2vw] max-[767px]:!px-[6vw] max-[767px]:!py-[3vw] max-[767px]:!text-[3.4vw]"
                style={{ border: "0.12vw solid #0e0d0b", padding: "0.9vw 1.8vw", fontFamily: SHARP, fontSize: "1.05vw", fontWeight: 500, marginTop: "0.4vw" }}
              >
                {world.cta.text}
                <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
              </a>
            </div>

            {/* Cinematisches Banijay-Brand-Video — Bildcontainer streckt sich auf die
                volle Höhe der Textspalte (Oberkante Headline → Unterkante CTA), unten
                rechts bündig mit dem CTA (Wolfram 15.07.). Mobile: festes Seitenverhältnis. */}
            <div
              data-wn-reveal
              className="overflow-clip md:h-full md:self-stretch max-[767px]:!aspect-[16/10] max-[767px]:!h-auto"
              style={{ minHeight: "clamp(300px, 42vh, 480px)" }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={world.image}
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% center" }}
              >
                <source src="/video/banijay-brand.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* ── Logo-Banderole statt der internationalen Logo-Kacheln (Wolfram 16.07.):
            Die zieh-/slidebare Kachel-Bahn (Banijay Asia/Benelux/Italy …) ist raus, an
            ihrer Stelle läuft der durchgehende Logo-Ticker. Er bleedet von sich aus
            über die volle Viewport-Breite, braucht also keinen Container. ── */}
        <div data-wn-reveal>
          <AlgarveLogoTicker />
        </div>

        <div className="mx-auto w-full max-[767px]:!px-[5vw]" style={{ maxWidth: "1560px", paddingLeft: "2vw", paddingRight: "2vw" }}>
          {/* Worldwide-Textlinks (Wolfram 15.07.): keine Buttons mehr — schlichte
              unterstrichene Hyperlinks mit Pfeil daneben, linksbündig. */}
          <div
            className="flex w-full flex-wrap items-center max-[767px]:!gap-x-[6vw] max-[767px]:!gap-y-[3vw]"
            style={{ columnGap: "2.4vw", rowGap: "1vw", marginTop: "2.4vw" }}
          >
            {world.worldwide.map((w) => (
              <a
                key={w.label}
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-[0.4vw] whitespace-nowrap text-[#0e0d0b] underline decoration-[rgba(14,13,11,0.4)] underline-offset-[0.35vw] transition-colors duration-300 hover:decoration-[#0e0d0b] max-[767px]:!text-[3.6vw] max-[767px]:!underline-offset-4"
                style={{ fontFamily: SHARP, fontSize: "1.05vw", fontWeight: 500 }}
              >
                {w.label}
                <ArrowUpRight className="h-[0.95vw] w-[0.95vw] no-underline transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
