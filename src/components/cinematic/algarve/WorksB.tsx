"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { COMPANIES } from "@/data/companies";
import { getCompanyImage } from "@/data/companyImages";

// section_works-b (Algarve 1:1): ruhige, vertikale Übersicht. Große zentrierte
// Headline, darunter je Company ein Link mit einem STICKY Label-Band (Titel links,
// Genre rechts, top:50%) und einem breiten Wide-Image (60% Breite, 40vw hoch,
// leicht unter dem Band via margin-top:-0.7vw). Kein Grid, kein Slider.
// Interaktion: die ganze Section fadet beim Scroll-In von opacity 0→1.

const LABEL = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "0.9vw",
  lineHeight: "100%",
  letterSpacing: "0.052vw",
  fontWeight: 700,
  textTransform: "uppercase",
} as const;

export function AlgarveWorksB() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          timer = setTimeout(() => setShown(true), 150); // Delay 150ms
          io.disconnect();
        }
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={root}
      style={{
        background: "#f8f7f3",
        paddingTop: "5.56vw",
        paddingBottom: "5.56vw",
        opacity: shown ? 1 : 0,
        transition: "opacity 1s cubic-bezier(0.165,0.84,0.44,1)",
      }}
    >
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        {/* Headline */}
        <div className="flex items-center justify-center text-center" style={{ marginBottom: "4.44vw" }}>
          <h2
            className="m-0 uppercase text-black"
            style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "7.22vw", fontWeight: 500, letterSpacing: "-0.139vw", lineHeight: "110%" }}
          >
            Companies
          </h2>
        </div>

        {/* Liste */}
        <div className="flex flex-col" style={{ rowGap: "5.56vw" }}>
          {COMPANIES.map((c) => {
            const img = getCompanyImage(c);
            const Wrap = c.externalLink ? "a" : "div";
            return (
              <Wrap
                key={c.slug}
                {...(c.externalLink ? { href: c.externalLink, target: "_blank", rel: "noreferrer" } : {})}
                className="group relative flex flex-col no-underline"
                style={{ color: "#0e0d0b" }}
              >
                {/* Sticky Label-Band (top 50%) — auf Mobile statisch, gestapelt */}
                <div
                  className="flex w-full items-center justify-between max-[767px]:!static max-[767px]:!flex-col max-[767px]:!items-start max-[767px]:!gap-2"
                  style={{ position: "sticky", top: "50%" }}
                >
                  <span style={LABEL} className="max-[767px]:!text-[2.6vw]">
                    {c.name}
                  </span>
                  <span style={{ ...LABEL, opacity: 0.55 }} className="max-[767px]:!text-[2.6vw]">
                    {c.competencies[0]}
                  </span>
                </div>

                {/* Wide-Image */}
                <div
                  className="overflow-clip max-[767px]:!mt-4 max-[767px]:!h-[95vw] max-[767px]:!w-full"
                  style={{ width: "60%", height: "40vw", marginTop: "-0.7vw", marginLeft: "auto", marginRight: "auto", borderRadius: "1.67vw" }}
                >
                  <img
                    src={img?.url ?? "/grid/g01.jpg"}
                    alt={c.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </Wrap>
            );
          })}
        </div>
      </div>
    </section>
  );
}
