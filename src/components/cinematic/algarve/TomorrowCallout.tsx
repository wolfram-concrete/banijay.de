"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/cinematic/Reveal";

// BANIJAY-TOMORROW-Callout nach dem value-features-4-Template: ein dunkler,
// gerundeter Callout-Block (2-Spalten-Grid) — links Label · große Headline · Copy
// · CTA, rechts ein hohes, gerundetes Bild. Der Block liegt auf einem Magenta-
// Section-Grund, dessen untere Ecken radial abgerundet sind und der danach auf die
// off-white Kontakt-Section („Kein passender Job dabei?") abschließt.

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const PAPER = "#f8f7f3";

export function AlgarveTomorrowCallout({
  eyebrow,
  headline,
  text,
  image,
  cta,
}: {
  eyebrow: string;
  headline: string;
  text: string;
  image: string;
  cta: { text: string; href: string };
}) {
  return (
    <section
      style={{
        background: "#ff4370",
        paddingTop: "5.56vw",
        paddingBottom: "6.94vw",
        borderBottomLeftRadius: "2.5vw",
        borderBottomRightRadius: "2.5vw",
      }}
    >
      <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
        <Reveal>
          {/* Dunkler Callout-Block, volle Breite, 2-Spalten */}
          <div
            className="grid items-stretch overflow-clip md:grid-cols-2 max-[767px]:!grid-cols-1"
            style={{ background: INK, color: PAPER, borderRadius: "1.67vw", gap: "3vw", padding: "3vw" }}
          >
            {/* Content links */}
            <div className="flex flex-col justify-between max-[767px]:!gap-[6vw]" style={{ gap: "2.5vw" }}>
              <div className="flex flex-col" style={{ gap: "1.5vw" }}>
                <span
                  className="w-fit max-[767px]:!text-[3vw]"
                  style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.12vw", textTransform: "uppercase", color: "rgba(248,247,243,0.6)" }}
                >
                  {eyebrow}
                </span>
                <h2
                  className="m-0 max-[767px]:!text-[7vw]"
                  style={{ fontFamily: SHARP, fontSize: "3vw", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.09vw" }}
                >
                  {headline}
                </h2>
              </div>
              <div className="flex flex-col items-start max-[767px]:!gap-[5vw]" style={{ gap: "2vw" }}>
                <p className="m-0 max-[767px]:!text-[3.8vw]" style={{ fontSize: "1.15vw", lineHeight: "155%", color: "rgba(248,247,243,0.72)", maxWidth: "34vw" }}>
                  {text}
                </p>
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f8f7f3] text-[#0e0d0b] no-underline transition-colors duration-300 hover:bg-white max-[767px]:!text-[3.4vw]"
                  style={{ padding: "0.83vw 1.67vw", fontFamily: SHARP, fontSize: "1.05vw", fontWeight: 500 }}
                >
                  {cta.text}
                  <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
                </a>
              </div>
            </div>

            {/* Bild rechts (hoch, gerundet) */}
            <div className="overflow-clip max-[767px]:!h-[70vw]" style={{ borderRadius: "1.11vw", height: "34vw", maxHeight: "620px" }}>
              <img src={image} alt={headline} className="h-full w-full object-cover" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
