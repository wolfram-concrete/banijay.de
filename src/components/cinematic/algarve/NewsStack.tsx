"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NEWS } from "@/data/news";

// section_blog-home: „Latest news" als 5fr/7fr-Grid. Links sticky (Heading +
// Read-all). Rechts eine ruhige Liste von News-Beiträgen OHNE eigenen Kachel-
// Background (nur feine Trennlinien) — jeweils mit „Mehr erfahren"-CTA auf die
// Detailseite. Inhalt: die echten Banijay-News.

const ITEMS = NEWS.slice(0, 5);

const H2 = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "4.44vw",
  lineHeight: "110%",
  fontWeight: 500,
  letterSpacing: "-0.139vw",
  margin: 0,
} as const;

export function AlgarveNewsStack() {
  return (
    <section
      data-nav-theme="magenta"
      style={{ background: "#ff4370", paddingTop: "5.56vw", paddingBottom: "8.33vw" }}
    >
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div
          className="relative grid grid-cols-1 md:grid-cols-[5fr_7fr]"
          style={{ gap: "2.22vw" }}
        >
          {/* Linke Sticky-Spalte */}
          <div
            className="flex flex-col items-start self-start md:sticky"
            style={{ gap: "1.67vw", top: "10vw" }}
          >
            <h2 className="uppercase text-black" style={H2}>
              Latest news
            </h2>
            <p className="m-0" style={{ color: "#000000a3", fontSize: "1.39vw", lineHeight: "135%" }}>
              Premieren, Podcasts, Interviews und Erfolge aus der Banijay-Welt.
            </p>
            <Link
              href="/news"
              className="inline-flex items-center text-black"
              style={{
                padding: "0.83vw 1.39vw",
                borderRadius: "2.22vw",
                border: "0.12vw solid #000",
                fontSize: "1.1vw",
              }}
            >
              Alle News
            </Link>
          </div>

          {/* Rechte Spalte: ruhige Liste ohne Kachel-Background */}
          <div className="flex flex-col">
            {ITEMS.map((item, i) => (
              <Link
                key={item.title}
                href={`/news/${item.slug}`}
                className="group flex flex-col no-underline"
                style={{
                  paddingTop: "2.22vw",
                  paddingBottom: "2.22vw",
                  borderTop: i === 0 ? "none" : "0.08vw solid rgba(0,0,0,0.2)",
                  color: "#0e0d0b",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr]" style={{ gap: "1vw" }}>
                  <div
                    className="overflow-clip"
                    style={{
                      borderRadius: "1.11vw",
                      height: "15vw",
                      boxShadow: "0 0.8vw 2.4vw -0.4vw rgba(0,0,0,0.28)",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-col justify-between" style={{ maxWidth: "31.11vw", gap: "1.11vw" }}>
                    <div className="flex flex-col items-start" style={{ gap: "0.83vw" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-sharp), sans-serif",
                          fontSize: "0.9vw",
                          fontWeight: 700,
                          letterSpacing: "0.052vw",
                          textTransform: "uppercase",
                          color: "#000000a3",
                        }}
                      >
                        {item.date}
                      </span>
                      <span style={{ fontSize: "1.6vw", lineHeight: "125%", fontWeight: 500 }}>
                        {item.title}
                      </span>
                    </div>
                    <span
                      className="inline-flex items-center gap-[0.4vw] transition-transform duration-300 group-hover:translate-x-1"
                      style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "1.05vw", fontWeight: 500 }}
                    >
                      Mehr erfahren <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
