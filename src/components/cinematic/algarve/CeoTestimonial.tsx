"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// CEO-/Testimonial-Section im 2-Spalten-Split (adaptiert nach dem Reforma-Template):
// links eine Content-Spalte (großes Zitat mit Wort-für-Wort-Reveal · Name · Rolle
// darunter · CTA), rechts eine hohe, gerundete Media-Spalte mit dem Portrait und
// einer Caption-Karte unten links. Banijay-Design: Paper-Grund, Ink-Typo, Sharp-
// Grotesk. Entrance via IntersectionObserver.

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const PAPER = "#f8f7f3";

export function AlgarveCeoTestimonial({
  role,
  quote,
  name,
  image,
  cta,
}: {
  /** Optional — die alte Heading-Zeile; Seiten übergeben es evtl. noch. */
  heading?: string;
  role: string;
  quote: string;
  name: string;
  image: string;
  cta?: { text: string; href: string };
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

  const words = quote.split(" ");
  // Delay, ab dem Name/Rolle/CTA nach dem Wort-Reveal erscheinen.
  const tail = words.length * 70 + 150;
  const enter = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section ref={root} style={{ background: PAPER, paddingTop: "6.94vw", paddingBottom: "6.94vw" }}>
      <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
        <div className="grid items-stretch gap-[5vw] md:grid-cols-[1fr_45%] max-[991px]:!grid-cols-1 max-[991px]:!gap-[8vw]">
          {/* ── Linke Spalte: Zitat (Wort-Reveal) · Name · Rolle · CTA ──────── */}
          <div className="flex flex-col justify-between max-[991px]:!gap-[6vw]" style={{ gap: "3vw" }}>
            <div className="flex flex-col" style={{ gap: "2vw" }}>
              {/* Großes Zitat — Wort für Wort aus der Clip-Maske */}
              <blockquote className="m-0 flex flex-wrap" style={{ columnGap: "0.6vw", rowGap: 0 }}>
                {(() => {
                  // „…"-Anführungszeichen mit an das erste/letzte Wort hängen.
                  const rendered = words.map((w, i) => `${i === 0 ? "„" : ""}${w}${i === words.length - 1 ? "“" : ""}`);
                  return rendered.map((word, i) => (
                    <span
                      key={i}
                      className="overflow-hidden"
                      style={{ display: "inline-block", paddingTop: "0.5vw", paddingBottom: "0.5vw", marginTop: "-0.5vw", marginBottom: "-0.5vw" }}
                    >
                      <span
                        className="max-[767px]:!text-[7vw]"
                        style={{
                          display: "inline-block",
                          fontFamily: SHARP,
                          fontSize: "2.8vw",
                          lineHeight: "116%",
                          fontWeight: 500,
                          letterSpacing: "-0.06vw",
                          color: INK,
                          transform: visible ? "translateY(0)" : "translateY(105%)",
                          opacity: visible ? 1 : 0,
                          transition: `transform 700ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms, opacity 700ms ease-out ${i * 70}ms`,
                        }}
                      >
                        {word}
                      </span>
                    </span>
                  ));
                })()}
              </blockquote>

              {/* Name + Rolle darunter */}
              <div className="flex flex-col" style={{ ...enter(tail), gap: "0.3vw" }}>
                <span className="max-[767px]:!text-[4.6vw]" style={{ fontFamily: SHARP, fontSize: "1.3vw", fontWeight: 500, color: INK }}>
                  {name}
                </span>
                <span className="max-[767px]:!text-[3.4vw]" style={{ fontFamily: SHARP, fontSize: "1vw", fontWeight: 400, color: "rgba(14,13,11,0.55)" }}>
                  {role}
                </span>
              </div>
            </div>

            {cta && (
              <a
                href={cta.href}
                className="inline-flex w-fit items-center gap-2 rounded-full text-[#0e0d0b] no-underline transition-colors duration-300 hover:bg-[#0e0d0b] hover:text-[#f8f7f3] max-[767px]:!text-[3.4vw]"
                style={{ ...enter(tail + 120), border: "1px solid #0e0d0b", padding: "0.83vw 1.67vw", fontFamily: SHARP, fontSize: "1.05vw" }}
              >
                {cta.text}
                <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
              </a>
            )}
          </div>

          {/* ── Rechte Spalte: hohe, gerundete Media-Spalte mit Caption ─────── */}
          <div
            className="relative overflow-clip max-[991px]:!h-[80vw] max-[767px]:!h-[110vw]"
            style={{ ...enter(150), borderRadius: "1.11vw", height: "42vw", maxHeight: "80vh" }}
          >
            <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "center 22%" }} />
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
