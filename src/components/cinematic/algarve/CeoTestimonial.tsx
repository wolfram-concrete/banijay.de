"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// CEO-/Führungs-Section nach dem Nimbus „combo-4 / features-11"-Template: ein
// kontaindiertes, großzügig gesetztes 2-Spalten-Grid — links das Portrait mit
// einem Overlay, das beim In-View-Kommen nach oben wegskaliert (Reveal), rechts
// der Content (kleiner Magenta-Accent · große Headline = Zitat · Copy = Name).
// Bewusst luftig (große Gaps, begrenzte Breite), damit der Content vernünftig
// sitzt — statt im engen dunklen Panel auszulaufen. CTA bleibt erhalten.

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";
const MAGENTA = "#ff4370";

export function AlgarveCeoTestimonial({
  role,
  quote,
  name,
  image,
  cta,
}: {
  heading?: string;
  role: string;
  quote: string;
  name: string;
  image: string;
  cta?: { text: string; href: string };
  /** Wird in dieser Variante nicht mehr gerendert (Zahlen stehen bereits in der
   *  Hard-Facts-Section darüber) — Prop bleibt für Aufrufkompatibilität. */
  stats?: { value: string; label: string }[];
}) {
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: reduce ? 0 : 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={root} style={{ background: "transparent", paddingTop: "6.94vw", paddingBottom: "6.94vw" }}>
      <div className="mx-auto max-[767px]:!px-[5vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1560px" }}>
        {/* Nimbus features-11: 0.95fr/1.05fr, großzügiger Gap, KEIN items-center →
            das Portrait füllt die Spaltenhöhe (großes Bild); der Content spreizt per
            space-between (Accent+Zitat oben, Name+CTA unten) über die Bildhöhe. */}
        <div
          className="grid items-stretch md:grid-cols-[0.95fr_1.05fr] max-[767px]:!grid-cols-1"
          style={{ columnGap: "5vw", rowGap: "8vw" }}
        >
          {/* ── Portrait links, groß, mit Overlay-Reveal (skaliert nach oben weg) ── */}
          <div className="relative overflow-hidden max-[767px]:!aspect-[4/5]" style={{ aspectRatio: "5 / 6" }}>
            <img
              src={image}
              alt={name}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 22%" }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                // Reveal-Blende: statt Paper nun Mood-Ink — auf dem dunklen Backdrop
                // wirkt die Abdeckung wie Schatten statt als heller Block.
                background: "#0a0208",
                transformOrigin: "50% 100%",
                transform: visible ? "scaleY(0)" : "scaleY(1)",
                transition: "transform 900ms cubic-bezier(0.65,0,0.35,1)",
              }}
            />
          </div>

          {/* ── Content rechts: Accent+Zitat oben, Name+CTA unten (space-between) ── */}
          <div
            className="flex h-full max-w-[640px] flex-col items-start justify-between max-[767px]:!max-w-full max-[767px]:!gap-[7vw]"
            style={{
              gap: "4vw",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 800ms cubic-bezier(0.22,1,0.36,1) 120ms, transform 800ms cubic-bezier(0.22,1,0.36,1) 120ms",
            }}
          >
            <div className="flex flex-col items-start max-[767px]:!gap-[3vw]" style={{ gap: "1.6vw" }}>
              <span
                className="max-[767px]:!text-[3vw]"
                style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.12vw", textTransform: "uppercase", color: MAGENTA }}
              >
                {role}
              </span>
              <blockquote
                className="m-0 max-[767px]:!text-[6.4vw]"
                style={{ fontFamily: SHARP, fontSize: "2.08vw", lineHeight: "128%", fontWeight: 500, letterSpacing: "-0.04vw", color: PAPER }}
              >
                „{quote}“
              </blockquote>
            </div>

            <div className="flex flex-col items-start max-[767px]:!gap-[5vw]" style={{ gap: "1.6vw" }}>
              <span className="max-[767px]:!text-[4vw]" style={{ fontFamily: SHARP, fontSize: "1.25vw", fontWeight: 500, color: PAPER }}>
                {name}
              </span>

              {cta && (
                <a
                  href={cta.href}
                  className="inline-flex w-fit items-center gap-2 rounded-[6px] text-[#f8f7f3] no-underline transition-colors duration-300 hover:bg-[#f8f7f3] hover:text-[#0a0208] max-[767px]:!px-[6vw] max-[767px]:!py-[3vw] max-[767px]:!text-[3.4vw]"
                  style={{ border: "0.12vw solid #f8f7f3", padding: "0.9vw 1.8vw", fontFamily: SHARP, fontSize: "1.05vw" }}
                >
                  {cta.text}
                  <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
