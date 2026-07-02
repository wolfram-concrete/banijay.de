"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CAREER } from "@/data/career";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Standorte → BANIJAY TOMORROW als gepinnte „Fächer"-Sequenz.
//
// Desktop: Die Section wird gepinnt („Stop"). Oben liegt die magentafarbene
// Standorte-Karte. Beim Weiterscrollen layern sich darunter — leicht verzögert
// nacheinander — die bunten Fächer-Streifen nach UNTEN auf (Orange → Gelb → Grün,
// je per Downward-Wipe/clip-path). Als LETZTER Fächer kommt die schwarze Karte nach
// unten heraus und ergibt die content-große Tomorrow-Karte; ERST DANN fadet der
// Content darin ein.
//
// Mobile: identisches gestapeltes Layout, statisch (keine Animation).

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const PAPER = "#f8f7f3";
const MAGENTA = "#ff4370";
const LAYERS = ["#ff7a3d", "#ffd23f", "#8fd94e"]; // Orange, Gelb, Grün
const R = "2.5vw";
// Die Reveal-Maske trägt runde UNTERE Ecken (0 0 R R) → beim Herausfahren gucken
// die Fächer INKLUSIVE ihrer radialen Unterkanten heraus (statt hart rechteckig
// abgeschnitten). Die oberen Ecken bleiben eckig; sie liegen ohnehin unter der
// jeweils darüberliegenden Karte.
const HIDDEN = `inset(0% 0% 100% 0% round 0px 0px ${R} ${R})`; // von oben zu (unsichtbar)
const SHOWN = `inset(0% 0% 0% 0% round 0px 0px ${R} ${R})`;

export function AlgarveCareerTomorrowStack() {
  const { locations, tomorrow } = CAREER;
  const root = useRef<HTMLElement>(null);
  const black = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      const fans = gsap.utils.toArray<HTMLElement>("[data-fan]"); // DOM-Reihenfolge = oben→unten (Orange, Gelb, Grün)
      const blackEl = black.current;
      const contentEl = content.current;
      const stackEl = stackRef.current;
      if (!fans.length || !blackEl || !contentEl || !stackEl) return;

      // Scale-to-Fit: der vollständig aufgefächerte Stapel (Magenta + Fächer +
      // schwarze Karte) ist in vw bemessen und kann höher als die 100vh-Bühne
      // werden → sonst schneidet overflow-clip oben & unten ab. Wir messen die
      // natürliche (Layout-)Höhe und skalieren den Stapel proportional so, dass er
      // mit etwas Luft in die Viewport-Höhe passt. offsetHeight ignoriert Transform,
      // ist also stabil messbar.
      const fit = () => {
        const natural = stackEl.offsetHeight;
        if (!natural) return;
        const scale = Math.min(1, (window.innerHeight * 0.9) / natural);
        stackEl.style.transformOrigin = "center center";
        stackEl.style.transform = `scale(${scale})`;
      };
      fit();
      document.fonts?.ready.then(() => {
        fit();
        ScrollTrigger.refresh();
      });
      const onResize = () => {
        fit();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return () => window.removeEventListener("resize", onResize); // statischer Endzustand

      gsap.set([...fans, blackEl], { clipPath: HIDDEN });
      gsap.set(contentEl, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: "[data-tm-stage]",
          invalidateOnRefresh: true,
        },
      });

      // Bunte Fächer-Streifen leicht verzögert nacheinander nach unten auflayern.
      fans.forEach((el, i) => {
        tl.to(el, { clipPath: SHOWN, ease: "none", duration: 0.5 }, i * 0.6);
      });
      // Als letzter Fächer: die schwarze Karte kommt nach unten heraus.
      tl.to(blackEl, { clipPath: SHOWN, ease: "none", duration: 0.8 }, fans.length * 0.6);
      // Erst danach fadet der Content in der schwarzen Karte ein.
      tl.to(contentEl, { opacity: 1, y: 0, ease: "power2.out", duration: 0.6 }, fans.length * 0.6 + 0.55);

      return () => window.removeEventListener("resize", onResize);
    },
    { scope: root },
  );

  // Standorte-Inhalt (Magenta-Karte / Mobile-Panel).
  const locationsContent = (
    <div className="mx-auto w-full max-[767px]:!px-[3vw]" style={{ paddingLeft: "4.44vw", paddingRight: "4.44vw", maxWidth: "1440px" }}>
      <p
        className="max-w-[47vw] max-[767px]:!max-w-full max-[767px]:!text-[5vw]"
        style={{ fontFamily: SHARP, fontSize: "1.9vw", lineHeight: "120%", fontWeight: 500, letterSpacing: "-0.07vw", marginBottom: "1.8vw" }}
      >
        {locations.text}
      </p>
      <div className="flex flex-col">
        {locations.items.map((loc) => {
          const has = loc.count > 0;
          return (
            <a
              key={loc.name}
              href={loc.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Jobs in ${loc.name} ansehen — in neuem Tab öffnen`}
              className="group flex items-center justify-between no-underline"
              style={{ color: INK, paddingTop: "0.7vw", paddingBottom: "0.7vw", borderTop: "0.08vw solid rgba(14,13,11,0.18)", opacity: has ? 1 : 0.55 }}
            >
              <span
                className="flex items-center uppercase max-[767px]:!text-[10vw]"
                style={{ fontFamily: SHARP, fontSize: "2.5vw", lineHeight: "100%", fontWeight: 500, letterSpacing: "-0.1vw", gap: "1.5vw" }}
              >
                {loc.name}
                <ArrowUpRight
                  className="shrink-0 opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100 max-[767px]:!hidden"
                  style={{ width: "2vw", height: "2vw" }}
                />
              </span>
              <span
                className="shrink-0 max-[767px]:!text-[2.8vw]"
                style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.052vw", textTransform: "uppercase", color: has ? INK : "rgba(14,13,11,0.6)" }}
              >
                {has ? `${loc.count} offene Stellen` : "Initiativbewerbung"}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );

  // Tomorrow-Inhalt (schwarze Karte / Mobile-Panel).
  const tomorrowContent = (
    <div className="mx-auto w-full max-[767px]:!px-[3vw]" style={{ paddingLeft: "4.44vw", paddingRight: "4.44vw", maxWidth: "1440px" }}>
      <div className="grid items-center md:grid-cols-2 max-[767px]:!grid-cols-1" style={{ gap: "3vw" }}>
        <div className="flex flex-col max-[767px]:!gap-[6vw]" style={{ gap: "1.8vw" }}>
          <div className="flex flex-col" style={{ gap: "1.1vw" }}>
            <span
              className="w-fit max-[767px]:!text-[3vw]"
              style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.12vw", textTransform: "uppercase", color: "rgba(248,247,243,0.6)" }}
            >
              {tomorrow.eyebrow}
            </span>
            <h2 className="m-0 max-[767px]:!text-[7vw]" style={{ fontFamily: SHARP, fontSize: "2.7vw", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.09vw" }}>
              {tomorrow.headline}
            </h2>
          </div>
          <div className="flex flex-col items-start max-[767px]:!gap-[5vw]" style={{ gap: "1.6vw" }}>
            <p className="m-0 max-[767px]:!max-w-full max-[767px]:!text-[3.8vw]" style={{ fontSize: "1.1vw", lineHeight: "150%", color: "rgba(248,247,243,0.72)", maxWidth: "34vw" }}>
              {tomorrow.text}
            </p>
            <a
              href={tomorrow.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f8f7f3] text-[#0e0d0b] no-underline transition-colors duration-300 hover:bg-[#ff4370] hover:text-[#f8f7f3] max-[767px]:!text-[3.4vw]"
              style={{ padding: "0.83vw 1.67vw", fontFamily: SHARP, fontSize: "1.05vw", fontWeight: 500 }}
            >
              {tomorrow.cta.text}
              <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
            </a>
          </div>
        </div>
        <div className="overflow-clip max-[767px]:!h-[70vw]" style={{ borderRadius: "1.11vw", height: "17vw", maxHeight: "300px" }}>
          <img src={tomorrow.image} alt={tomorrow.headline} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );

  // Fächer-Streifen + schwarze Karte teilen sich die gestapelte Geometrie
  // (negativer margin → jeder Layer zeigt unten einen gerundeten Farbstreifen).
  const stack = (isMobile: boolean) => (
    <div className="relative" ref={isMobile ? undefined : stackRef}>
      <div
        className="relative"
        style={{ zIndex: 6, background: MAGENTA, color: INK, borderRadius: R, paddingTop: isMobile ? "9vw" : "3vw", paddingBottom: isMobile ? "9vw" : "3vw" }}
      >
        {locationsContent}
      </div>
      {LAYERS.map((color, i) => (
        <div
          key={color}
          data-fan={isMobile ? undefined : true}
          className="relative !h-[4vw] max-[767px]:!h-[7vw]"
          style={{ zIndex: 5 - i, marginTop: `-${R}`, background: color, borderBottomLeftRadius: R, borderBottomRightRadius: R, willChange: "clip-path" }}
        />
      ))}
      <div
        ref={isMobile ? undefined : black}
        className="relative"
        style={{ zIndex: 1, marginTop: `-${R}`, background: INK, color: PAPER, borderBottomLeftRadius: R, borderBottomRightRadius: R, paddingTop: isMobile ? "14vw" : "4vw", paddingBottom: isMobile ? "12vw" : "3.5vw", willChange: "clip-path" }}
      >
        <div ref={isMobile ? undefined : content}>{tomorrowContent}</div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop: gepinnte Fächer-Sequenz ─────────────────────────────── */}
      <section ref={root} className="relative max-[767px]:hidden" style={{ height: "280vh", background: PAPER }}>
        <div data-tm-stage className="sticky top-0 flex h-screen w-screen items-center overflow-clip">
          <div className="w-full" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
            {stack(false)}
          </div>
        </div>
      </section>

      {/* ── Mobile: statische gestapelte Variante ────────────────────────── */}
      <section className="hidden max-[767px]:block" style={{ background: PAPER, paddingTop: "2.5vw", paddingBottom: "2.5vw" }}>
        <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>{stack(true)}</div>
      </section>
    </>
  );
}
