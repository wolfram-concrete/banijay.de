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

// Sechs Kompetenzfelder als Sticky-Card-Stack. Claim kommt aus der Datenschicht.
// Jede Videobox spielt einen anderen Ausschnitt desselben Reels (videoStart =
// Bruchteil der Videolänge) → wirkt wie 6 unterschiedliche Clips (Platzhalter).
// Kernkompetenz-Karten alle in Banijay-Magenta, Typo schwarz.
const MAGENTA = "#ff4370";
const CARDS = HOME.competenceFields.fields.slice(0, 6).map((f, i) => ({
  index: `0${i + 1}`,
  title: f.title,
  claim: f.claim,
  text: f.text,
  tint: MAGENTA,
  rotate: i % 2 === 1 ? "rotate(-7deg)" : "rotate(6deg)",
  videoStart: (i + 0.5) / 6,
}));

export function AlgarveServicesStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]");
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
          scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top top", scrub: 0.8 },
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
        <div className="flex flex-col" style={{ gap: "2.22vw", color: "#0e0d0b" }}>
          {CARDS.map((card) => (
            <div
              key={card.index}
              data-service-card
              className="sticky flex flex-col justify-between overflow-clip"
              style={{
                top: "1.39vw",
                height: "90vh",
                padding: "4.44vw",
                borderRadius: "1.67vw",
                backgroundColor: card.tint,
                transformOrigin: "50% 0",
                transform: "perspective(2000px)",
              }}
            >
              {/* Top: Titel + Index (auf voll eingefärbtem Grund, schwarze Typo) */}
              <div className="relative flex items-center justify-between" style={{ zIndex: 3 }}>
                <h3 className="uppercase" style={H1}>
                  {card.title}
                </h3>
                <h3 style={{ ...H1, color: "rgba(0,0,0,0.28)" }}>{card.index}</h3>
              </div>

              {/* Bottom: Claim + Text */}
              <div
                className="relative flex flex-col items-start"
                style={{ zIndex: 3, maxWidth: "39.17vw", gap: "1.11vw" }}
              >
                <h4
                  className="m-0"
                  style={{
                    fontFamily: "var(--font-sharp), sans-serif",
                    fontSize: "2.5vw",
                    lineHeight: "115%",
                    fontWeight: 500,
                    letterSpacing: "-0.104vw",
                  }}
                >
                  {card.claim}
                </h4>
                <p
                  className="m-0"
                  style={{ fontSize: "1.39vw", lineHeight: "135%", opacity: 0.85 }}
                >
                  {card.text}
                </p>
              </div>

              {/* Rotiertes Glass-Video */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  zIndex: 3,
                  width: "27vw",
                  maxWidth: "490px",
                  height: "50vh",
                  maxHeight: "600px",
                  inset: "auto 10% 10% auto",
                  transform: card.rotate,
                  padding: "2.22vw",
                  borderRadius: "1.67vw",
                  backgroundColor: "#00000052",
                  boxShadow: "inset 0 0 24px 0 rgba(248,247,243,0.08), inset 0 6px 12px 0 rgba(248,247,243,0.16)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
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
                  className="absolute inset-0 m-auto"
                  style={{ width: "90%", height: "92%", borderRadius: "1.11vw", objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
