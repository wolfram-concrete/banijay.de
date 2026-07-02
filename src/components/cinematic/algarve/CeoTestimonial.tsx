"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// CEO-/Testimonial-Section im 2-Spalten-Split (adaptiert nach dem gelieferten
// Reforma-Template): links eine Content-Spalte (Label · großes Zitat · Attribution
// · CTA), rechts eine hohe, gerundete Media-Spalte mit dem Portrait und einer
// Caption-Karte unten links. Auf Banijay-Design gezogen: Paper-Grund, Ink-Typo,
// Magenta-Akzent, Sharp-Grotesk. Entrance: fade + slide-up gestaffelt via
// IntersectionObserver (keine GSAP-Abhängigkeit).

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const PAPER = "#f8f7f3";
const MAGENTA = "#ff4370";

export function AlgarveCeoTestimonial({
  role,
  quote,
  name,
  image,
  cta,
  stats,
}: {
  /** Optional — die alte Heading-Zeile; Seiten übergeben es evtl. noch. */
  heading?: string;
  role: string;
  quote: string;
  name: string;
  image: string;
  cta?: { text: string; href: string };
  /** Optionale Kennzahlen-Zeile (2 Kacheln) unter dem Zitat. */
  stats?: { value: string; label: string }[];
}) {
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Gestaffelte Enter-Transition je Element (fade + 40px slide-up).
  const enter = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section ref={root} style={{ background: PAPER, paddingTop: "6.94vw", paddingBottom: "6.94vw" }}>
      <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
        <div className="grid items-stretch gap-[5vw] md:grid-cols-[1fr_45%] max-[991px]:!grid-cols-1 max-[991px]:!gap-[8vw]">
          {/* ── Linke Spalte: Label · Zitat · Attribution · CTA ────────────── */}
          <div className="flex flex-col justify-between max-[991px]:!gap-[6vw]" style={{ gap: "3vw" }}>
            <div className="flex flex-col" style={{ gap: "1.67vw" }}>
              {/* Label: magenta Quadrat + Rolle */}
              <div className="flex items-center gap-3" style={enter(0)}>
                <span style={{ width: "0.7rem", height: "0.7rem", borderRadius: "0.16rem", background: MAGENTA, flexShrink: 0 }} />
                <span
                  className="max-[767px]:!text-[3vw]"
                  style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.12vw", textTransform: "uppercase", color: INK }}
                >
                  {role}
                </span>
              </div>

              {/* Großes Zitat */}
              <blockquote
                className="m-0 max-[767px]:!text-[7vw]"
                style={{ ...enter(100), fontFamily: SHARP, fontSize: "2.8vw", lineHeight: "116%", fontWeight: 500, letterSpacing: "-0.06vw", color: INK }}
              >
                „{quote}“
              </blockquote>

              {/* Attribution */}
              <div
                className="max-[767px]:!text-[4vw]"
                style={{ ...enter(200), fontFamily: SHARP, fontSize: "1.2vw", fontWeight: 400, color: "rgba(14,13,11,0.62)" }}
              >
                {name}
              </div>

              {/* Optionale Kennzahlen (2 Kacheln mit linkem Rahmen) */}
              {stats && stats.length > 0 && (
                <div className="grid grid-cols-2" style={{ ...enter(300), gap: "1.5vw", marginTop: "1vw" }}>
                  {stats.slice(0, 2).map((s) => (
                    <div key={s.label} style={{ borderLeft: "1px solid rgba(14,13,11,0.28)", paddingLeft: "1.2vw" }} className="flex flex-col gap-3">
                      <span className="max-[767px]:!text-[9vw]" style={{ fontFamily: SHARP, fontSize: "3vw", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.1vw", color: INK }}>
                        {s.value}
                      </span>
                      <span className="max-[767px]:!text-[3.4vw]" style={{ fontSize: "1vw", lineHeight: "140%", color: "rgba(14,13,11,0.62)" }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cta && (
              <a
                href={cta.href}
                className="inline-flex w-fit items-center gap-2 rounded-full text-[#0e0d0b] no-underline transition-colors duration-300 hover:bg-[#0e0d0b] hover:text-[#f8f7f3] max-[767px]:!text-[3.4vw]"
                style={{ ...enter(400), border: "1px solid #0e0d0b", padding: "0.83vw 1.67vw", fontFamily: SHARP, fontSize: "1.05vw" }}
              >
                {cta.text}
                <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
              </a>
            )}
          </div>

          {/* ── Rechte Spalte: hohe, gerundete Media-Spalte mit Caption ─────── */}
          <div
            className="relative overflow-clip max-[991px]:!h-[110vw] max-[767px]:!h-[130vw]"
            style={{ ...enter(500), borderRadius: "1.11vw", height: "42vw", maxHeight: "80vh" }}
          >
            <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover" />
            {/* Caption-Karte unten links (frosted) */}
            <div className="absolute bottom-0 left-0 flex w-full items-end justify-start" style={{ padding: "1.5vw" }}>
              <div
                className="flex flex-col max-[767px]:!p-[3vw]"
                style={{ background: "rgba(14,13,11,0.34)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderRadius: "0.9vw", padding: "1vw 1.3vw", gap: "0.2vw", color: PAPER }}
              >
                <span className="max-[767px]:!text-[4vw]" style={{ fontFamily: SHARP, fontSize: "1.2vw", fontWeight: 500, lineHeight: 1.1 }}>
                  {name}
                </span>
                <span className="max-[767px]:!text-[2.8vw]" style={{ fontSize: "0.85vw", color: "rgba(248,247,243,0.72)" }}>
                  {role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
