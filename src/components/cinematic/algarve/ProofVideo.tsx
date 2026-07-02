"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CountUp } from "@/components/cinematic/CountUp";
import type { Stat } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// About – Proof/Zahlen MIT integriertem Statement-Video. Die komplette Fakten-
// Section ist gepinnt („aufs Stop"). Beim Weiterscrollen skaliert das gerundete
// Video-Modul UNTEN im Grid aus seiner Grid-Position heraus auf — nicht als
// separate Section darunter, sondern IN dieser Section — bis der Video-Container
// über die komplette Section drüberlayert und full-screen aufscreent. Die
// Aufskalierung läuft über einen animierten clip-path (inset), damit das Video
// nie verzerrt. Erst wenn das Video full-size steht, kommt das Statement Wort für
// Wort rein. Danach scrollt es weiter zur CEO-Section.
//
// Mobile: KEINE Pin-/Scale-Mechanik (dort passt weder das Grid in eine 100vh-
// Bühne, noch trägt die „aus dem Modul wachsen"-Idee). Stattdessen ruhige,
// gestapelte Variante — Zahlen normal untereinander, danach eine statische
// Video-Statement-Karte.

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";
const INK = "#0e0d0b";
const ACCENT = "#ff4370";

export function AlgarveProofVideo({
  proofText,
  stats,
  statement,
  video = "/video/b-glass.mp4",
  poster,
}: {
  proofText: string;
  stats: Stat[];
  statement: string;
  video?: string;
  poster?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Nur Desktop: die gepinnte clip-path-Aufskalierung.
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      const stageEl = stage.current;
      // Quelle = eine der kleinen GRAUEN Stat-Kacheln (data-pv-source). Aus ihr
      // heraus wächst das Video — kein separater, vorab sichtbarer Video-Container.
      const tileEl = stageEl?.querySelector<HTMLElement>("[data-pv-source]") ?? null;
      const overlayEl = overlay.current;
      const words = gsap.utils.toArray<HTMLElement>("[data-pv-word]");
      if (!stageEl || !tileEl || !overlayEl) return;

      // Start-Clip = exakt der Platz der Quell-Kachel relativ zur Bühne. So wirkt
      // es, als würde sich diese graue Kachel „aufziehen" und das Video daraus
      // heraus einlayern.
      const measure = () => {
        const s = stageEl.getBoundingClientRect();
        const t = tileEl.getBoundingClientRect();
        return {
          top: Math.max(0, t.top - s.top),
          left: Math.max(0, t.left - s.left),
          right: Math.max(0, s.width - (t.left - s.left) - t.width),
          bottom: Math.max(0, s.height - (t.top - s.top) - t.height),
        };
      };
      const clip = (t: number, r: number, b: number, l: number, rd: number) =>
        `inset(${t}px ${r}px ${b}px ${l}px round ${rd}px)`;
      let v = measure();

      // Startlage: Video liegt exakt auf der Quell-Kachel und ist NOCH unsichtbar
      // (die graue Kachel ist voll zu sehen). Erst nach Scroll-In layert es ein.
      gsap.set(overlayEl, { clipPath: clip(v.top, v.right, v.bottom, v.left, 18), autoAlpha: 0 });
      gsap.set(words, { yPercent: 110, opacity: 0 });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(overlayEl, { clipPath: "inset(0px 0px 0px 0px round 0px)", autoAlpha: 1 });
        gsap.set(words, { yPercent: 0, opacity: 1 });
        return;
      }

      // Bei jedem Refresh (Resize/Layout) neu vermessen.
      const onRefresh = () => {
        v = measure();
        gsap.set(overlayEl, { clipPath: clip(v.top, v.right, v.bottom, v.left, 18) });
      };
      ScrollTrigger.addEventListener("refreshInit", onRefresh);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: "[data-pv-stage]",
          invalidateOnRefresh: true,
        },
      });

      // A) Das Video layert langsam in der Quell-Kachel ein (fade-in an Ort/Stelle).
      tl.to(overlayEl, { autoAlpha: 1, ease: "power1.out", duration: 0.12 }, 0);
      // B) Aus der Kachel nach OBEN + UNTEN aufziehen → volle Höhe (radiale Kanten).
      tl.to(overlayEl, { clipPath: clip(0, v.right, 0, v.left, 18), ease: "power2.inOut", duration: 0.34 }, 0.12);
      // C) Symmetrisch nach LINKS + RECHTS aufziehen → volle Breite.
      tl.to(overlayEl, { clipPath: clip(0, 0, 0, 0, 18), ease: "power2.inOut", duration: 0.3 }, 0.48);
      // D) Radien schärfen → full-size.
      tl.to(overlayEl, { clipPath: clip(0, 0, 0, 0, 0), ease: "power2.inOut", duration: 0.12 }, 0.78);
      // E) Erst full-size das Statement Wort für Wort zentral aufs Video.
      tl.to(words, { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.4, stagger: 0.05 }, 0.9);

      return () => ScrollTrigger.removeEventListener("refreshInit", onRefresh);
    },
    { scope: root },
  );

  const parts = statement.split(" ");
  const nonAbout = stats.filter((s) => !s.aboutOnly);

  // Bento-Kennzahlen (erste Kachel Coral, col-span-2) — in Desktop- und Mobile-
  // Variante identisch verwendet.
  const bento = (
    <div className="grid grid-cols-2 gap-[1vw] md:grid-cols-3 max-[767px]:!gap-[3vw]">
      {nonAbout.map((s, i) => {
        const accent = i === 0;
        const bg = accent ? ACCENT : "rgba(14,13,11,0.05)";
        return (
          <div
            key={s.label}
            data-pv-source={!accent && i === nonAbout.length - 1 ? true : undefined}
            className={`flex flex-col justify-between max-[767px]:!min-h-[34vw] max-[767px]:!rounded-[4vw] max-[767px]:!p-[5vw] ${accent ? "col-span-2" : ""}`}
            style={{ background: bg, color: INK, borderRadius: "1.11vw", padding: "1.6vw", minHeight: "9vw" }}
          >
            <span
              className="max-[767px]:!text-[10.5vw]"
              style={{ fontFamily: SHARP, fontSize: accent ? "4.4vw" : "3.2vw", lineHeight: "100%", fontWeight: 500, letterSpacing: "-0.14vw", whiteSpace: "nowrap" }}
            >
              <CountUp value={s.value} />
            </span>
            <p className="mt-[1vw] max-[767px]:!mt-[2vw] max-[767px]:!text-[3.4vw]" style={{ fontFamily: SHARP, fontSize: "0.95vw", fontWeight: 700, letterSpacing: "0.05vw", textTransform: "uppercase", margin: 0 }}>
              {s.label}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* ── Desktop: gepinnte Bühne mit clip-path-Aufskalierung ──────────── */}
      <section ref={root} className="relative max-[767px]:hidden" style={{ height: "300vh", background: PAPER }}>
        <div ref={stage} data-pv-stage className="sticky top-0 h-screen w-screen overflow-clip">
          <div
            className="flex h-full flex-col"
            style={{ maxWidth: "1440px", paddingLeft: "2vw", paddingRight: "2vw", paddingTop: "6vh", paddingBottom: "4vh" }}
          >
            <p
              className="md:max-w-[52vw]"
              style={{ fontFamily: SHARP, fontSize: "1.9vw", lineHeight: "132%", fontWeight: 500, color: INK, letterSpacing: "-0.03vw", margin: 0 }}
            >
              {proofText}
            </p>

            <div className="mt-[2.5vw]">{bento}</div>
            {/* KEIN vorab sichtbarer Video-Container mehr — das Video wächst beim
                Scrollen aus der grauen Quell-Kachel (data-pv-source) heraus. */}
          </div>

          {/* Wachsender Video-Container (clip-path von Quell-Kachel → full). Start
              unsichtbar (opacity 0) → kein Flash vor dem Scroll-In-Fade. */}
          <div ref={overlay} className="absolute inset-0 overflow-clip" style={{ willChange: "clip-path, opacity", opacity: 0 }}>
            <video autoPlay muted loop playsInline poster={poster} className="absolute inset-0 h-full w-full object-cover">
              <source src={video} type="video/mp4" />
            </video>
            <div className="absolute inset-0" style={{ background: "rgba(8,7,10,0.42)" }} />

            {/* Statement zentral über dem Video (erscheint erst full-screen) */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ paddingLeft: "6vw", paddingRight: "6vw" }}>
              <p
                className="m-0 flex flex-wrap justify-center text-center"
                style={{ maxWidth: "64vw", columnGap: "0.7vw", rowGap: 0, fontFamily: SHARP, fontSize: "3.2vw", lineHeight: "118%", fontWeight: 500, letterSpacing: "-0.09vw", color: PAPER }}
              >
                {parts.map((w, i) => (
                  <span key={i} className="overflow-hidden" style={{ display: "inline-block", paddingTop: "0.5vw", paddingBottom: "0.5vw", marginTop: "-0.5vw", marginBottom: "-0.5vw" }}>
                    <span data-pv-word style={{ display: "inline-block" }}>
                      {w}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile: ruhige gestapelte Variante (kein Pin/Scale) ──────────── */}
      <section className="hidden max-[767px]:block" style={{ background: PAPER, paddingTop: "12vw", paddingBottom: "12vw" }}>
        <div style={{ paddingLeft: "4vw", paddingRight: "4vw" }}>
          <p
            className="text-[5vw]"
            style={{ fontFamily: SHARP, lineHeight: "132%", fontWeight: 500, color: INK, letterSpacing: "-0.03vw", margin: 0 }}
          >
            {proofText}
          </p>

          <div className="mt-[7vw]">{bento}</div>

          {/* Statische Video-Statement-Karte */}
          <div className="relative mt-[7vw] overflow-clip" style={{ borderRadius: "5vw", aspectRatio: "3 / 4" }}>
            <video autoPlay muted loop playsInline poster={poster} className="absolute inset-0 h-full w-full object-cover">
              <source src={video} type="video/mp4" />
            </video>
            <div className="absolute inset-0" style={{ background: "rgba(8,7,10,0.5)" }} />
            <div className="absolute inset-0 flex items-center justify-center" style={{ paddingLeft: "7vw", paddingRight: "7vw" }}>
              <p
                className="m-0 text-center text-[7vw]"
                style={{ fontFamily: SHARP, lineHeight: "118%", fontWeight: 500, letterSpacing: "-0.03vw", color: PAPER }}
              >
                {statement}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
