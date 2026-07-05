"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HOME } from "@/data/home";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// section_services-home (Algarve 1:1): drei hohe (90vh) dunkle Sticky-Cards, die
// sich beim Scrollen übereinanderstapeln (perspective, origin oben). Je Card:
// h1-Titel + gedämpfter Index, h4-Claim + Text, rotiertes Glass-Video, volles
// Hintergrundbild mit Dark-Overlay. Inhalt: die ersten drei Kompetenzfelder.

const H1 = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "7.22vw",
  lineHeight: "110%",
  fontWeight: 500,
  letterSpacing: "-0.139vw",
  margin: 0,
} as const;

// Sechs Kompetenzfelder als Flip-Card-Stack — FLACH, wie die Karten auf den anderen
// Seiten (CompanyCards/CareerRoleStack): je Karte eine SOLIDE Farbe aus der festen
// Video-Palette (kein Gradient, kein Glow, kein Dark-Overlay). Textfarbe adaptiv per
// Luminanz. Jede Videobox spielt einen anderen Ausschnitt desselben Reels.
const VIDEO_CARD_COLORS = [
  "#ff4370", // Main Magenta
  "#e71d7d", // Laser Pink
  "#ff5a47", // Hot Coral
  "#31105a", // Midnight Violet
  "#2e37c9", // Electric Indigo
  "#065dff", // Video Blue
  "#16c8ff", // Neon Cyan
  "#170725", // Deep Aubergine
] as const;
function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
}
function relLuminance([r, g, b]: [number, number, number]): number {
  const lin = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}
function cardTheme(i: number): { bg: string; fg: string; soft: string } {
  const bg = VIDEO_CARD_COLORS[i % VIDEO_CARD_COLORS.length];
  const fg = relLuminance(hexToRgb(bg)) > 0.42 ? "#0e0d0b" : "#f8f7f3";
  const soft = fg === "#f8f7f3" ? "rgba(248,247,243,0.72)" : "rgba(14,13,11,0.66)";
  return { bg, fg, soft };
}
const CARDS = HOME.competenceFields.fields.slice(0, 6).map((f, i) => {
  const t = cardTheme(i);
  return {
    index: `0${i + 1}`,
    title: f.title,
    claim: f.claim,
    text: f.text,
    bg: t.bg,
    fg: t.fg,
    soft: t.soft,
    rotate: i % 2 === 1 ? "rotate(-7deg)" : "rotate(6deg)",
    videoStart: (i + 0.5) / 6,
  };
});

export function AlgarveServicesStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // 3D-Wegkippen mit Sticky-Stack — auf Desktop UND Mobile: sobald die nächste
      // Card hochscrollt, kippt die aktuelle um ihre Oberkante nach hinten weg
      // (bunte Karten flippen weg, die nächste kommt). Mobile nutzt dasselbe
      // Prinzip, nur mit mobil angepasstem Innenlayout (Video unter der Headline).
      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");

      // Karten starten UNSICHTBAR und blenden beim Eintritt sauber von 0→100 % ein
      // (autoAlpha), VOR der Flip-Logik — sonst lugt die nächste Card schon opak (durch
      // die Perspektive leicht „gekippt" wirkend) am unteren Rand herein.
      gsap.set(cards, { autoAlpha: 0 });
      cards.forEach((card) => {
        gsap.to(card, {
          autoAlpha: 1,
          ease: "power2.out",
          duration: 0.6,
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
      });

      // Echtes 3D-Wegkippen (wie auf der Companies-Seite): sobald die nächste Card
      // hochscrollt, kippt die aktuelle um ihre Oberkante nach hinten weg + faded.
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.set(card, { transformPerspective: 2000, transformOrigin: "50% 0%" });
        gsap.to(card, {
          rotationX: -60,
          scale: 0.8,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top top", scrub: 0.4 },
        });
      });
    },
    { scope: root },
  );

  // Videoboxen: pro Box ein anderer Ausschnitt (currentTime = Länge × videoStart)
  // in einem 6s-Fenster geloopt; via IntersectionObserver spielt nur die sichtbare
  // Box (sonst würden 6 gleichzeitige Decodes desselben großen Reels die Seite
  // ausbremsen).
  useEffect(() => {
    const vids = Array.from(root.current?.querySelectorAll<HTMLVideoElement>("[data-svc-video]") ?? []);
    const SEG = 6;
    const startOf = (v: HTMLVideoElement) => (v.duration || 0) * parseFloat(v.dataset.start || "0");
    const seek = (v: HTMLVideoElement) => {
      const s = startOf(v);
      if (Number.isFinite(s)) {
        try {
          v.currentTime = s;
        } catch {}
      }
    };
    const onTime = (e: Event) => {
      const v = e.currentTarget as HTMLVideoElement;
      const s = startOf(v);
      if (v.currentTime >= s + SEG || v.currentTime < s - 0.5) seek(v);
    };
    vids.forEach((v) => {
      v.muted = true;
      if (v.readyState >= 1) seek(v);
      else v.addEventListener("loadedmetadata", () => seek(v), { once: true });
      v.addEventListener("timeupdate", onTime);
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) void v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.2 },
    );
    vids.forEach((v) => io.observe(v));
    return () => {
      io.disconnect();
      vids.forEach((v) => v.removeEventListener("timeupdate", onTime));
    };
  }, []);

  return (
    <section
      ref={root}
      className="overflow-clip"
      style={{ background: "#f8f7f3", paddingTop: "8.33vw", paddingBottom: "8.33vw" }}
    >
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div className="flex flex-col" style={{ gap: "2.22vw" }}>
          {CARDS.map((card) => (
            <div
              key={card.index}
              data-service-card
              className="sticky flex flex-col justify-between overflow-clip max-[767px]:!h-[74vh] max-[767px]:!justify-start max-[767px]:!p-[7vw]"
              style={{
                top: "1.39vw",
                height: "90vh",
                padding: "4.44vw",
                borderRadius: "1.67vw",
                // SOLIDE Farbe (kein Gradient/Glow) — flach wie die anderen Card-Stacks.
                backgroundColor: card.bg,
                color: card.fg,
                transformOrigin: "50% 0",
                transform: "perspective(2000px)",
              }}
            >
              {/* Top: Titel + Index (auf voll eingefärbtem Grund, adaptive Typo) */}
              <div className="relative flex items-center justify-between max-[767px]:!order-1" style={{ zIndex: 3 }}>
                <h3 className="uppercase max-[767px]:!text-[8.5vw]" style={{ ...H1, color: card.fg }}>
                  {card.title}
                </h3>
                <h3
                  className="max-[767px]:!text-[8.5vw]"
                  style={{ ...H1, color: card.fg === "#f8f7f3" ? "rgba(248,247,243,0.34)" : "rgba(14,13,11,0.26)" }}
                >
                  {card.index}
                </h3>
              </div>

              {/* Bottom: Claim + Text — auf Mobile UNTER dem Video (order-3), voll breit */}
              <div
                className="relative flex flex-col items-start max-[767px]:!order-3 max-[767px]:!mt-[5vw] max-[767px]:!max-w-full max-[767px]:!gap-[3vw]"
                style={{ zIndex: 3, maxWidth: "39.17vw", gap: "1.11vw" }}
              >
                <h4
                  className="m-0 max-[767px]:!text-[6vw]"
                  style={{
                    fontFamily: "var(--font-sharp), sans-serif",
                    fontSize: "2.5vw",
                    lineHeight: "115%",
                    fontWeight: 500,
                    letterSpacing: "-0.104vw",
                    color: card.fg,
                  }}
                >
                  {card.claim}
                </h4>
                <p
                  className="m-0 max-[767px]:!text-[4vw]"
                  style={{ fontSize: "1.39vw", lineHeight: "135%", color: card.soft }}
                >
                  {card.text}
                </p>
              </div>

              {/* Glass-Video — Desktop: rotiert absolut rechts unten. Mobile: in-flow
                  DIREKT UNTER der Headline (order-2), volle Breite, Querformat, gerade. */}
              <div
                className="absolute overflow-hidden max-[767px]:!static max-[767px]:!order-2 max-[767px]:!mt-[6vw] max-[767px]:!h-[74vw] max-[767px]:!w-full max-[767px]:!max-h-none max-[767px]:!max-w-full max-[767px]:!inset-auto max-[767px]:!transform-none max-[767px]:!rounded-[4vw]"
                style={{
                  zIndex: 3,
                  width: "27vw",
                  maxWidth: "490px",
                  height: "50vh",
                  maxHeight: "600px",
                  inset: "auto 10% 10% auto",
                  transform: card.rotate,
                  borderRadius: "1.67vw",
                  boxShadow: "0 1.2vw 3vw -0.6vw rgba(0,0,0,0.35)",
                }}
              >
                <video
                  data-svc-video
                  data-start={card.videoStart}
                  src="/video/kompetenz-reel.mp4"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full max-[767px]:!static"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
