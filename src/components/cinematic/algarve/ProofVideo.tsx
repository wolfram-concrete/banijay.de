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
  const tile = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stageEl = stage.current;
      const tileEl = tile.current;
      const overlayEl = overlay.current;
      const words = gsap.utils.toArray<HTMLElement>("[data-pv-word]");
      if (!stageEl || !tileEl || !overlayEl) return;

      // Start-Clip = exakt der Grid-Platz des Video-Moduls (relativ zur Bühne).
      // So wirkt es, als würde das kleine Modul selbst wachsen.
      const measure = () => {
        const s = stageEl.getBoundingClientRect();
        const t = tileEl.getBoundingClientRect();
        const top = Math.max(0, t.top - s.top);
        const left = Math.max(0, t.left - s.left);
        const right = Math.max(0, s.width - (t.left - s.left) - t.width);
        const bottom = Math.max(0, s.height - (t.top - s.top) - t.height);
        return `inset(${top}px ${right}px ${bottom}px ${left}px round 18px)`;
      };

      gsap.set(overlayEl, { clipPath: measure(), autoAlpha: 1 });
      gsap.set(words, { yPercent: 110, opacity: 0 });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(overlayEl, { clipPath: "inset(0px 0px 0px 0px round 0px)" });
        gsap.set(words, { yPercent: 0, opacity: 1 });
        return;
      }

      // Bei jedem Refresh (Resize/Layout) den Start-Clip neu vermessen.
      const onRefresh = () => gsap.set(overlayEl, { clipPath: measure() });
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

      // 1) Video-Modul wächst aus seiner Grid-Position auf Full-Screen (clip-path).
      tl.to(
        overlayEl,
        { clipPath: "inset(0px 0px 0px 0px round 0px)", ease: "power2.inOut", duration: 0.6 },
        0,
      );
      // 2) Erst danach das Statement Wort für Wort zentral aufs Video.
      tl.to(
        words,
        { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.5, stagger: 0.06 },
        0.66,
      );

      return () => ScrollTrigger.removeEventListener("refreshInit", onRefresh);
    },
    { scope: root },
  );

  const parts = statement.split(" ");
  const nonAbout = stats.filter((s) => !s.aboutOnly);

  return (
    <section ref={root} className="relative" style={{ height: "300vh", background: PAPER }}>
      <div ref={stage} data-pv-stage className="sticky top-0 h-screen w-screen overflow-clip">
        {/* ── Fakten-Bühne (Proof-Text + Bento-Zahlen + Video-Modul) ───────── */}
        <div
          className="mx-auto flex h-full flex-col max-[767px]:!px-[3vw]"
          style={{ maxWidth: "1440px", paddingLeft: "2vw", paddingRight: "2vw", paddingTop: "6vh", paddingBottom: "4vh" }}
        >
          <p
            className="max-[767px]:!text-[5vw] md:max-w-[52vw]"
            style={{ fontFamily: SHARP, fontSize: "1.9vw", lineHeight: "132%", fontWeight: 500, color: INK, letterSpacing: "-0.03vw", margin: 0 }}
          >
            {proofText}
          </p>

          {/* Bento-Kennzahlen (erste Kachel Coral, col-span-2) */}
          <div className="mt-[2.5vw] grid grid-cols-2 gap-[1vw] md:grid-cols-3">
            {nonAbout.map((s, i) => {
              const accent = i === 0;
              const bg = accent ? ACCENT : "rgba(14,13,11,0.05)";
              return (
                <div
                  key={s.label}
                  className={`flex flex-col justify-between max-[767px]:!min-h-[34vw] ${accent ? "col-span-2" : ""}`}
                  style={{ background: bg, color: INK, borderRadius: "1.11vw", padding: "1.6vw", minHeight: "9vw" }}
                >
                  <span
                    className="max-[767px]:!text-[12vw]"
                    style={{ fontFamily: SHARP, fontSize: accent ? "4.4vw" : "3.2vw", lineHeight: "100%", fontWeight: 500, letterSpacing: "-0.14vw" }}
                  >
                    <CountUp value={s.value} />
                  </span>
                  <p className="mt-[1vw] max-[767px]:!text-[3.4vw]" style={{ fontFamily: SHARP, fontSize: "0.95vw", fontWeight: 700, letterSpacing: "0.05vw", textTransform: "uppercase", margin: 0 }}>
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Video-Modul — gerundetes Modul, das gleich full-screen aufskaliert.
              In-flow reserviert es hier seinen Platz; das eigentliche (wachsende)
              Video liegt als Overlay exakt darüber. */}
          <div
            ref={tile}
            className="mt-[1.5vw] w-full flex-1 max-[767px]:!min-h-[42vw]"
            style={{ minHeight: "10vh", borderRadius: "1.11vw", background: "#0b0a0d" }}
          />
        </div>

        {/* ── Wachsender Video-Container (clip-path von Grid-Platz → full) ──── */}
        <div ref={overlay} className="absolute inset-0 overflow-clip" style={{ willChange: "clip-path" }} aria-hidden={false}>
          <video autoPlay muted loop playsInline poster={poster} className="absolute inset-0 h-full w-full object-cover">
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "rgba(8,7,10,0.42)" }} />

          {/* Statement zentral über dem Video (erscheint erst full-screen) */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ paddingLeft: "6vw", paddingRight: "6vw" }}>
            <p
              className="m-0 flex flex-wrap justify-center text-center max-[767px]:!text-[7vw]"
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
  );
}
