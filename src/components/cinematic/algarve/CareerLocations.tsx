"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CAREER } from "@/data/career";
import { useLocale } from "@/i18n/config";
import { copyFor } from "@/i18n/copy";

// Career – Standorte als eigenständige Magenta-Modulbox (gerundete Karte auf Off-
// White). Köln als Hauptstandort + weitere Companies-Städte, jeweils mit Jobzahl
// bzw. Initiativbewerbung-Hinweis. Dezenter Reveal beim Eintritt. Bewusst RUHIG:
// keine bunten Fächer, kein Pin/Scale — nur die Box (die frühere Fächer-/Stapel-
// Choreografie wurde verworfen, die Box selbst bleibt erhalten).

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const MAGENTA = "#ff4370";

export function AlgarveCareerLocations() {
  const locale = useLocale();
  const copy = copyFor(locale);
  const { locations } = CAREER;
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
      { threshold: reduce ? 0 : 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={root} style={{ paddingTop: "6vw", paddingBottom: "6vw", paddingLeft: "2vw", paddingRight: "2vw" }}>
      {/* data-nav-theme="magenta": greift nur, wenn die Box horizontal (nahezu) die
          volle Breite unter der Nav einnimmt (SiteHeader prüft den Span). Desktop:
          Box zentriert (Off-White-Ränder) → Nav bleibt default. Mobile: Box fast
          full-width → Nav invertiert korrekt auf Schwarz (Magenta-„b" wäre sonst
          unsichtbar). */}
      <div
        data-nav-theme="magenta"
        className="mx-auto max-[767px]:!px-[7vw] max-[767px]:!py-[10vw]"
        style={{
          maxWidth: "1440px",
          background: MAGENTA,
          color: INK,
          borderRadius: "0",
          paddingTop: "4.44vw",
          paddingBottom: "4.44vw",
          paddingLeft: "4.44vw",
          paddingRight: "4.44vw",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 800ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <p
          className="max-w-[47vw] max-[767px]:!max-w-full max-[767px]:!text-[5.5vw]"
          style={{ fontFamily: SHARP, fontSize: "1.9vw", lineHeight: "120%", fontWeight: 500, letterSpacing: "-0.07vw", marginBottom: "2.2vw" }}
        >
          {copy.career.locationText}
        </p>
        <div className="flex flex-col">
          {locations.items.map((loc) => {
            return (
              <a
                key={loc.name}
                href={loc.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.career.locationAria(loc.name)}
                className="group flex items-center justify-between no-underline max-[767px]:!py-[3vw]"
                style={{ color: INK, paddingTop: "0.9vw", paddingBottom: "0.9vw", borderTop: "0.08vw solid rgba(14,13,11,0.18)" }}
              >
                <span
                  className="flex items-center uppercase max-[767px]:!text-[9vw]"
                  style={{ fontFamily: SHARP, fontSize: "2.5vw", lineHeight: "100%", fontWeight: 500, letterSpacing: "-0.1vw", gap: "1.5vw" }}
                >
                  {loc.name}
                  <ArrowUpRight
                    className="shrink-0 opacity-0 transition-all duration-500 group-hover:translate-x-2 group-hover:opacity-100 max-[767px]:!hidden"
                    style={{ width: "2vw", height: "2vw" }}
                  />
                </span>
                <span
                  className="shrink-0 text-right max-[767px]:!text-[3vw]"
                  style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.052vw", textTransform: "uppercase", color: INK }}
                >
                  {copy.career.locationJobs}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
