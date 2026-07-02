"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import { ABOUT } from "@/data/about";

// Partner-Section im „section_blog-home"-Template (Algarve): 5fr/7fr-Grid, links
// eine sticky Heading-Spalte (Eyebrow + H2 + Copy + CTA), rechts eine ruhige Liste
// von Tiles (Bild + Label + Titel + Beschreibung), getrennt durch feine Linien —
// identisch zum News-Modul, nur mit den vier Partner-Feldern befüllt.

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const MAGENTA = "#ff4370";

const H2 = {
  fontFamily: SHARP,
  fontSize: "3.6vw",
  lineHeight: "110%",
  fontWeight: 500,
  letterSpacing: "-0.11vw",
  margin: 0,
} as const;

// Ein passendes Standbild je Partner-Feld (aus dem vorhandenen Grid-/Reel-Pool).
const IMAGES = ["/grid/g01.jpg", "/grid/g05.jpg", "/reels/r2.jpg", "/grid/g11.png"];

export function AlgarvePartnerGrid() {
  const items = ABOUT.partnership.cards;

  return (
    <section style={{ background: "#f8f7f3", paddingTop: "6.94vw", paddingBottom: "6.94vw" }}>
      <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
        <div className="relative grid grid-cols-1 md:grid-cols-[5fr_7fr]" style={{ gap: "2.22vw" }}>
          {/* Linke Sticky-Spalte */}
          <div className="flex flex-col items-start self-start md:sticky" style={{ gap: "1.4vw", top: "10vw" }}>
            <span
              className="max-[767px]:!text-[3vw]"
              style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.12vw", textTransform: "uppercase", color: MAGENTA }}
            >
              Partner
            </span>
            <h2 className="max-[767px]:!text-[7vw]" style={{ ...H2, color: INK }}>
              {ABOUT.partnership.headline}
            </h2>
            <p className="m-0 max-[767px]:!text-[4vw]" style={{ color: "rgba(14,13,11,0.64)", fontSize: "1.3vw", lineHeight: "150%" }}>
              {ABOUT.partnership.text}
            </p>
            <a
              href="mailto:hello@banijay.de"
              className="inline-flex items-center gap-2 rounded-full text-[#0e0d0b] no-underline transition-colors duration-300 hover:bg-[#0e0d0b] hover:text-[#f8f7f3] max-[767px]:!text-[3.4vw]"
              style={{ border: "1px solid #0e0d0b", padding: "0.83vw 1.67vw", fontFamily: SHARP, fontSize: "1.05vw", marginTop: "0.6vw" }}
            >
              Partner werden
              <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
            </a>
          </div>

          {/* Rechte Spalte: Tile-Liste mit feinen Trennlinien */}
          <div className="flex flex-col">
            {items.map((card, i) => (
              <div
                key={card.title}
                className="group flex flex-col"
                style={{
                  paddingTop: "2.22vw",
                  paddingBottom: "2.22vw",
                  borderTop: i === 0 ? "none" : "0.08vw solid rgba(0,0,0,0.2)",
                  color: INK,
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr]" style={{ gap: "1.4vw" }}>
                  <div
                    className="overflow-clip max-[767px]:!h-[46vw]"
                    style={{ borderRadius: "1.11vw", height: "13vw", boxShadow: "0 0.8vw 2.4vw -0.4vw rgba(0,0,0,0.22)" }}
                  >
                    <img
                      src={IMAGES[i % IMAGES.length]}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-col" style={{ gap: "0.7vw" }}>
                    <span
                      className="max-[767px]:!text-[2.8vw]"
                      style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.052vw", textTransform: "uppercase", color: MAGENTA }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="max-[767px]:!text-[5vw]" style={{ fontFamily: SHARP, fontSize: "1.6vw", lineHeight: "120%", fontWeight: 500 }}>
                      {card.title}
                    </span>
                    <span className="max-[767px]:!text-[3.6vw]" style={{ fontSize: "1vw", lineHeight: "150%", color: "rgba(14,13,11,0.6)" }}>
                      {card.text}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
