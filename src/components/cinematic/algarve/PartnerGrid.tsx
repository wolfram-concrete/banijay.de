"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import { ABOUT } from "@/data/about";

// Partner-Section im „section_blog-home"-Template (Algarve): 5fr/7fr-Grid, links
// eine sticky Heading-Spalte (Eyebrow + H2 + Copy + CTA), rechts eine ruhige Liste
// von Tiles (Bild + Label + Titel + Beschreibung), getrennt durch feine Linien —
// identisch zum News-Modul, nur mit den vier Partner-Feldern befüllt.

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";

const H2 = {
  fontFamily: SHARP,
  fontSize: "4.44vw",
  lineHeight: "110%",
  fontWeight: 500,
  letterSpacing: "-0.139vw",
  margin: 0,
} as const;

export function AlgarvePartnerGrid() {
  const items = ABOUT.partnership.cards;

  // Optik 1:1 wie das Home-News-Modul (section_blog-home): full-width (kein
  // zentrierter maxWidth-Container), KEINE Eyebrow, Headline zuerst, kleine Copy,
  // CTA; rechts eine ruhige Tile-Liste (Bild links, Titel + Copy rechts) mit feinen
  // Trennlinien — ohne Nummern/kleine Zusatz-Labels.
  return (
    <section style={{ background: "transparent", paddingTop: "5.56vw", paddingBottom: "8.33vw" }}>
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div className="relative grid grid-cols-1 md:grid-cols-[5fr_7fr]" style={{ gap: "2.22vw" }}>
          {/* Linke Sticky-Spalte — Headline + Copy + CTA (keine Eyebrow) */}
          <div className="flex flex-col items-start self-start md:sticky" style={{ gap: "1.67vw", top: "10vw" }}>
            <h2 className="uppercase max-[767px]:!text-[9.6vw]" style={{ ...H2, color: PAPER }}>
              {ABOUT.partnership.headline}
            </h2>
            <p className="m-0 max-[767px]:!text-[3.8vw]" style={{ color: "rgba(248,247,243,0.64)", fontSize: "1.39vw", lineHeight: "135%" }}>
              {ABOUT.partnership.text}
            </p>
            <a
              href="mailto:hello@banijay.de"
              className="inline-flex items-center gap-2 text-[#f8f7f3] no-underline transition-colors duration-300 hover:bg-[#f8f7f3] hover:text-[#0a0208] max-[767px]:!px-[6vw] max-[767px]:!py-[3vw] max-[767px]:!text-[3.4vw]"
              style={{ border: "0.12vw solid #f8f7f3", borderRadius: "6px", padding: "0.83vw 1.39vw", fontFamily: SHARP, fontSize: "1.1vw" }}
            >
              Partner werden
              <ArrowUpRight className="h-[1.1vw] w-[1.1vw] max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
            </a>
          </div>

          {/* Rechte Spalte: die Tiles schieben sich beim Scrollen übereinander
              (Algarve blog-home, wie das News-Modul): position:sticky bottom +
              z-Index-Staffelung, opake Fläche (= Section-Paper) deckt die untere
              Ebene ab — getrennt nur durch eine feine dünne Linie, KEINE Schatten. */}
          <div className="relative flex flex-col">
            {items.map((card, i) => (
              <div
                key={card.title}
                className="group glass-panel sticky bottom-[10vw] flex flex-col max-[767px]:!bottom-[9vw] max-[767px]:!py-[6vw]"
                style={{
                  paddingTop: "2.22vw",
                  paddingBottom: "2.22vw",
                  borderTop: "0.08vw solid rgba(248,247,243,0.2)",
                  color: PAPER,
                  zIndex: items.length - i,
                  // Stapel-Mechanik: die Tiles schieben sich sticky übereinander —
                  // dafür muss die Fläche DECKEND sein (sonst schimmert die untere
                  // Karte durchs Glas). Nahezu opaker Mood-Verlauf statt Glas-Alpha.
                  background: "linear-gradient(150deg, rgba(52,14,38,0.97) 0%, rgba(30,7,22,0.97) 100%)",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] max-[767px]:!gap-[4vw]" style={{ gap: "1vw" }}>
                  <div
                    className="overflow-clip max-[767px]:!h-[56vw]"
                    style={{ height: "15vw" }}
                  >
                    <img
                      src={card.image}
                      alt={card.imageAlt ?? card.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ objectPosition: card.objectPosition ?? "50% 50%" }}
                    />
                  </div>
                  <div className="flex flex-col max-[767px]:!max-w-full max-[767px]:!gap-[3vw]" style={{ maxWidth: "31.11vw", gap: "1.11vw" }}>
                    <span className="max-[767px]:!text-[5vw]" style={{ fontFamily: SHARP, fontSize: "1.6vw", lineHeight: "125%", fontWeight: 500 }}>
                      {card.title}
                    </span>
                    <span className="max-[767px]:!text-[3.6vw]" style={{ fontSize: "1.05vw", lineHeight: "150%", color: "rgba(248,247,243,0.6)" }}>
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
