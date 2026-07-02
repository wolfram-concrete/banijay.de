"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CAREER } from "@/data/career";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Standorte → BANIJAY TOMORROW als animiertes Layer-System.
//
// Der magentafarbene Standorte-Layer liegt oben. Beim Scrollen „fächert" sich der
// Hintergrund von oben nach UNTEN auf: erst wischen nacheinander die bunten Layer
// (Orange → Gelb → Grün) nach unten ein, ZULETZT baut sich die schwarze Tomorrow-
// Card auf (content-groß, nicht full-screen) — und ERST DANN fadet der Content
// darin ein. Technik: Downward-Wipe per clip-path (inset von unten aufziehen).
//
// Mobile: identisches Layout, statisch (keine Animation).

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const PAPER = "#f8f7f3";
const MAGENTA = "#ff4370";
const LAYERS = ["#ff7a3d", "#ffd23f", "#8fd94e"]; // Orange, Gelb, Grün
const R = "2.5vw";
const HIDDEN = "inset(0% 0% 100% 0%)"; // von oben – unten 100 % abgeschnitten (unsichtbar)
const SHOWN = "inset(0% 0% 0% 0%)";

export function AlgarveCareerTomorrowStack() {
  const { locations, tomorrow } = CAREER;
  const root = useRef<HTMLElement>(null);
  const black = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      const fans = gsap.utils.toArray<HTMLElement>("[data-fan]"); // DOM-Reihenfolge = oben→unten (Orange, Gelb, Grün)
      const blackEl = black.current;
      const contentEl = content.current;
      if (!fans.length || !blackEl || !contentEl) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return; // statischer Endzustand

      gsap.set([...fans, blackEl], { clipPath: HIDDEN });
      gsap.set(contentEl, { opacity: 0, y: 34 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 62%",
          end: "bottom 88%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1) Bunte Layer wischen nacheinander von oben nach unten ein (Fächer).
      fans.forEach((el, i) => {
        tl.to(el, { clipPath: SHOWN, ease: "none", duration: 0.5 }, i * 0.4);
      });
      // 2) ZULETZT baut sich die schwarze Card auf (ebenfalls nach unten aufziehend).
      tl.to(blackEl, { clipPath: SHOWN, ease: "none", duration: 0.8 }, fans.length * 0.4);
      // 3) ERST DANN fadet der Content darin ein.
      tl.to(contentEl, { opacity: 1, y: 0, ease: "power2.out", duration: 0.7 }, fans.length * 0.4 + 0.55);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative" style={{ background: PAPER, paddingTop: "2.5vw", paddingBottom: "2.5vw" }}>
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div className="relative">
          {/* ── Magenta Standorte-Layer (oben, immer sichtbar) ────────────── */}
          <div
            className="relative"
            style={{ zIndex: 6, background: MAGENTA, color: INK, borderRadius: R, paddingTop: "5vw", paddingBottom: "5vw" }}
          >
            <div className="mx-auto w-full max-[767px]:!px-[3vw]" style={{ paddingLeft: "4.44vw", paddingRight: "4.44vw", maxWidth: "1440px" }}>
              <p
                className="max-w-[47vw] max-[767px]:!max-w-full max-[767px]:!text-[5vw]"
                style={{ fontFamily: SHARP, fontSize: "2.1vw", lineHeight: "122%", fontWeight: 500, letterSpacing: "-0.07vw", marginBottom: "2.4vw" }}
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
                      style={{ color: INK, paddingTop: "1.2vw", paddingBottom: "1.2vw", borderTop: "0.08vw solid rgba(14,13,11,0.18)", opacity: has ? 1 : 0.55 }}
                    >
                      <span
                        className="flex items-center uppercase max-[767px]:!text-[10vw]"
                        style={{ fontFamily: SHARP, fontSize: "3.2vw", lineHeight: "100%", fontWeight: 500, letterSpacing: "-0.11vw", gap: "1.5vw" }}
                      >
                        {loc.name}
                        <ArrowUpRight
                          className="shrink-0 opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100 max-[767px]:!hidden"
                          style={{ width: "2.2vw", height: "2.2vw" }}
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
          </div>

          {/* ── Bunte Fächer-Layer (wischen nacheinander nach unten ein) ───── */}
          {LAYERS.map((color, i) => (
            <div
              key={color}
              data-fan
              className="relative !h-[5vw] max-[767px]:!h-[7vw]"
              style={{ zIndex: 5 - i, marginTop: `-${R}`, background: color, borderBottomLeftRadius: R, borderBottomRightRadius: R, willChange: "clip-path" }}
            />
          ))}

          {/* ── Schwarze Tomorrow-Card (zuletzt, content-groß) ────────────── */}
          <div
            ref={black}
            className="relative"
            style={{ zIndex: 1, marginTop: `-${R}`, background: INK, color: PAPER, borderBottomLeftRadius: R, borderBottomRightRadius: R, paddingTop: "7vw", paddingBottom: "6vw", willChange: "clip-path" }}
          >
            <div ref={content} className="mx-auto w-full max-[767px]:!px-[3vw]" style={{ paddingLeft: "4.44vw", paddingRight: "4.44vw", maxWidth: "1440px" }}>
              <div className="grid items-stretch md:grid-cols-2 max-[767px]:!grid-cols-1" style={{ gap: "3vw" }}>
                <div className="flex flex-col justify-between max-[767px]:!gap-[6vw]" style={{ gap: "2.5vw" }}>
                  <div className="flex flex-col" style={{ gap: "1.5vw" }}>
                    <span
                      className="w-fit max-[767px]:!text-[3vw]"
                      style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.12vw", textTransform: "uppercase", color: "rgba(248,247,243,0.6)" }}
                    >
                      {tomorrow.eyebrow}
                    </span>
                    <h2 className="m-0 max-[767px]:!text-[7vw]" style={{ fontFamily: SHARP, fontSize: "3vw", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.09vw" }}>
                      {tomorrow.headline}
                    </h2>
                  </div>
                  <div className="flex flex-col items-start max-[767px]:!gap-[5vw]" style={{ gap: "2vw" }}>
                    <p className="m-0 max-[767px]:!max-w-full max-[767px]:!text-[3.8vw]" style={{ fontSize: "1.15vw", lineHeight: "155%", color: "rgba(248,247,243,0.72)", maxWidth: "34vw" }}>
                      {tomorrow.text}
                    </p>
                    <a
                      href={tomorrow.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f8f7f3] text-[#0e0d0b] no-underline transition-colors duration-300 hover:bg-white max-[767px]:!text-[3.4vw]"
                      style={{ padding: "0.83vw 1.67vw", fontFamily: SHARP, fontSize: "1.05vw", fontWeight: 500 }}
                    >
                      {tomorrow.cta.text}
                      <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
                    </a>
                  </div>
                </div>
                <div className="overflow-clip max-[767px]:!h-[70vw]" style={{ borderRadius: "1.11vw", height: "30vw", maxHeight: "520px" }}>
                  <img src={tomorrow.image} alt={tomorrow.headline} className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
