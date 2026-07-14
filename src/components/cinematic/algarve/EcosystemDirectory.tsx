"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ECO_CATEGORIES } from "@/data/ecosystem";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ECOSYSTEM-VERZEICHNIS (Task #67): das komplette Banijay-Ökosystem, gruppiert
// nach den offiziellen Kategorien (Coopetition-Grafik). Reihenfolge REDAKTIONELL
// (Kategorie-Reihenfolge aus der Datenquelle), kein Ranking, keine Bewertung.
// Gleichberechtigte, einheitlich hohe Zeilen (Listen-UI-Prinzipien); moody-Look
// mit hauchdünnen Trennlinien, eckige Container (Heike). Companies mit belegtem
// Link öffnen extern, die übrigen stehen neutral als Name.

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";
const MAGENTA = "#ff4370";

export function AlgarveEcosystemDirectory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.set("[data-eco-group]", { autoAlpha: 0, y: 40 });
      ScrollTrigger.batch("[data-eco-group]", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }),
      });
    },
    { scope: root },
  );

  const total = ECO_CATEGORIES.reduce((n, c) => n + c.companies.length, 0);

  return (
    <section ref={root} className="relative" style={{ background: "transparent", color: PAPER, paddingTop: "6vw", paddingBottom: "8vw" }}>
      <div className="relative mx-auto" style={{ maxWidth: "1400px", paddingLeft: "2vw", paddingRight: "2vw" }}>
        {/* Intro */}
        <div className="mb-[6vw] max-w-[900px]">
          <p style={{ fontFamily: SHARP, fontSize: "clamp(1.4rem, 2.6vw, 2.6rem)", lineHeight: "120%", fontWeight: 500, letterSpacing: "-0.02em" }}>
            Ein System, viele Handschriften: eigenständige Companies, Labels und Plattformen — geclustert nach
            Kompetenzfeldern, verbunden durch dasselbe Netzwerk.
          </p>
          <p className="mt-4" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)", lineHeight: "150%", color: "rgba(248,247,243,0.6)" }}>
            {total} Einträge · Reihenfolge redaktionell nach Kategorien — kein Ranking.
          </p>
        </div>

        {/* Kategorie-Gruppen */}
        <div className="flex flex-col" style={{ gap: "clamp(3rem, 5vw, 5.5rem)" }}>
          {ECO_CATEGORIES.map((cat) => (
            <div key={cat.key} data-eco-group>
              {/* Kategorie-Header als Anker */}
              <div className="flex items-baseline gap-3 border-b pb-3" style={{ borderColor: "rgba(248,247,243,0.16)" }}>
                <h2 className="m-0" style={{ fontFamily: SHARP, fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.01em" }}>
                  {cat.label}
                </h2>
                <span style={{ fontFamily: SHARP, fontSize: "0.95rem", color: MAGENTA }}>{cat.companies.length}</span>
              </div>

              {/* Companies — einheitliche Zeilen, hauchdünne Trennlinien */}
              <ul className="m-0 list-none p-0">
                {cat.companies.map((co) => {
                  const inner = (
                    <>
                      <span
                        className="min-w-0 truncate"
                        style={{ fontFamily: SHARP, fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)", fontWeight: 500 }}
                      >
                        {co.name}
                      </span>
                      {co.url ? (
                        <ArrowUpRight
                          className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          style={{ width: 18, height: 18, color: "rgba(248,247,243,0.5)" }}
                        />
                      ) : (
                        <span className="shrink-0" style={{ width: 18 }} />
                      )}
                    </>
                  );
                  return (
                    <li key={co.name} className="border-b" style={{ borderColor: "rgba(248,247,243,0.08)" }}>
                      {co.url ? (
                        <a
                          href={co.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-4 no-underline transition-colors duration-200 hover:text-[#ff4370]"
                          style={{ color: PAPER, paddingTop: "0.95rem", paddingBottom: "0.95rem", paddingLeft: "0.4rem", paddingRight: "0.4rem" }}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div
                          className="group flex items-center justify-between gap-4"
                          style={{ color: "rgba(248,247,243,0.82)", paddingTop: "0.95rem", paddingBottom: "0.95rem", paddingLeft: "0.4rem", paddingRight: "0.4rem" }}
                        >
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
