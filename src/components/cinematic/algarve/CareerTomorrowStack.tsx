"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/cinematic/Reveal";
import { CAREER } from "@/data/career";

// Standorte → BANIJAY TOMORROW als EIN gestapeltes Layer-System: Der magentafarbene
// Standorte-Kasten „sendet" nach unten mehrere bunte, gerundete Schichten aus
// (Magenta → Orange → Gelb → Grün) und endet im letzten, schwarzen Layer — dieser
// schwarze Layer IST der Hintergrund der Tomorrow-Section, in den dann nur noch der
// Content einläuft. Technik: gestapelte Full-Width-Bänder mit gerundeten Unterkanten,
// die per negativem margin + absteigendem z-index jeweils unter dem darüber liegenden
// Band durchlaufen — so zeigt jedes Band unten einen gerundeten Farbstreifen.

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const PAPER = "#f8f7f3";
const MAGENTA = "#ff4370";

// Regenbogen-Zwischenschichten (von Magenta ausgehend Richtung Schwarz).
const LAYERS = ["#ff7a3d", "#ffd23f", "#8fd94e"];
const R = "2.5vw"; // Radius = Overlap, damit ein sauberer Streifen sichtbar bleibt.

export function AlgarveCareerTomorrowStack() {
  const { locations, tomorrow } = CAREER;

  return (
    <section style={{ background: PAPER, paddingTop: "2.5vw", paddingBottom: "2.5vw" }}>
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div className="relative">
          {/* ── Layer 1: Magenta — Standorte ─────────────────────────────── */}
          <div
            className="relative"
            style={{
              zIndex: 6,
              background: MAGENTA,
              color: INK,
              borderRadius: R,
              paddingTop: "5.2vw",
              paddingBottom: "5.2vw",
            }}
          >
            <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "4.44vw", paddingRight: "4.44vw", maxWidth: "1440px" }}>
              <p
                className="max-w-[47vw] max-[767px]:!max-w-full max-[767px]:!text-[5vw]"
                style={{ fontFamily: SHARP, fontSize: "2.1vw", lineHeight: "122%", fontWeight: 500, letterSpacing: "-0.07vw", marginBottom: "2.8vw" }}
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
                      style={{
                        color: INK,
                        paddingTop: "1.4vw",
                        paddingBottom: "1.4vw",
                        borderTop: "0.08vw solid rgba(14,13,11,0.18)",
                        opacity: has ? 1 : 0.55,
                      }}
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
                        style={{
                          fontFamily: SHARP,
                          fontSize: "0.9vw",
                          fontWeight: 700,
                          letterSpacing: "0.052vw",
                          textTransform: "uppercase",
                          color: has ? INK : "rgba(14,13,11,0.6)",
                        }}
                      >
                        {has ? `${loc.count} offene Stellen` : "Initiativbewerbung"}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Regenbogen-Zwischenschichten (jede zieht unter die vorige) ── */}
          {LAYERS.map((color, i) => (
            <div
              key={color}
              className="relative max-[767px]:!h-[7vw]"
              style={{
                zIndex: 5 - i,
                marginTop: `-${R}`,
                height: "5vw",
                background: color,
                borderBottomLeftRadius: R,
                borderBottomRightRadius: R,
              }}
            />
          ))}

          {/* ── Letzter Layer: Schwarz = Tomorrow-Section (nur noch Content) ─ */}
          <div
            className="relative"
            style={{
              zIndex: 1,
              marginTop: `-${R}`,
              background: INK,
              color: PAPER,
              borderBottomLeftRadius: R,
              borderBottomRightRadius: R,
              paddingTop: "8vw",
              paddingBottom: "6vw",
            }}
          >
            <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "4.44vw", paddingRight: "4.44vw", maxWidth: "1440px" }}>
              <Reveal>
                <div className="grid items-stretch md:grid-cols-2 max-[767px]:!grid-cols-1" style={{ gap: "3vw" }}>
                  {/* Content links */}
                  <div className="flex flex-col justify-between max-[767px]:!gap-[6vw]" style={{ gap: "2.5vw" }}>
                    <div className="flex flex-col" style={{ gap: "1.5vw" }}>
                      <span
                        className="w-fit max-[767px]:!text-[3vw]"
                        style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.12vw", textTransform: "uppercase", color: "rgba(248,247,243,0.6)" }}
                      >
                        {tomorrow.eyebrow}
                      </span>
                      <h2
                        className="m-0 max-[767px]:!text-[7vw]"
                        style={{ fontFamily: SHARP, fontSize: "3vw", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.09vw" }}
                      >
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

                  {/* Bild rechts (hoch, gerundet) */}
                  <div className="overflow-clip max-[767px]:!h-[70vw]" style={{ borderRadius: "1.11vw", height: "34vw", maxHeight: "620px" }}>
                    <img src={tomorrow.image} alt={tomorrow.headline} className="h-full w-full object-cover" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
