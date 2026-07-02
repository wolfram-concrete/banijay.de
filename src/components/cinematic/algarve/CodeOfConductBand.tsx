import { Play } from "lucide-react";
import { Reveal } from "@/components/cinematic/Reveal";
import { CAREER } from "@/data/career";

// Code-of-Conduct-Statement nach text-section-1: ein großer, linksbündiger
// Statement-Text (mit einem Magenta-Akzentwort) + eine Magenta-Pill-CTA
// (dunkler Icon-Kreis + Label), die das CoC-PDF öffnet. Slide-in beim Scrollen.

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const MAGENTA = "#ff4370";
const ACCENT_WORD = "kreative";

export function AlgarveCodeOfConductBand() {
  const text = CAREER.codeOfConduct.text;
  const [before, after] = text.includes(ACCENT_WORD) ? text.split(ACCENT_WORD) : [text, ""];

  return (
    <section style={{ background: "#f8f7f3", paddingTop: "9vw", paddingBottom: "9vw" }}>
      <div className="mx-auto max-[767px]:!px-[4vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1200px" }}>
        <Reveal>
          <div className="flex flex-col items-start" style={{ gap: "2.8vw", maxWidth: "62vw" }}>
            <p
              className="m-0 max-[767px]:!text-[7vw] max-[991px]:!max-w-full"
              style={{ fontFamily: SHARP, fontSize: "3.6vw", lineHeight: "120%", fontWeight: 500, letterSpacing: "-0.08vw", color: INK, maxWidth: "56vw" }}
            >
              {before}
              {after !== "" && <span style={{ color: MAGENTA }}>{ACCENT_WORD}</span>}
              {after}
            </p>

            <a
              href={CAREER.codeOfConduct.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center no-underline max-[767px]:!text-[4vw]"
              style={{
                gap: "0.8vw",
                background: MAGENTA,
                color: INK,
                borderRadius: "999px",
                padding: "0.6vw 1.8vw 0.6vw 0.6vw",
                fontFamily: SHARP,
                fontSize: "1.15vw",
                fontWeight: 500,
              }}
            >
              <span
                className="flex items-center justify-center max-[767px]:!h-[9vw] max-[767px]:!w-[9vw]"
                style={{ width: "2.8vw", height: "2.8vw", borderRadius: "999px", background: INK, color: MAGENTA }}
              >
                <Play className="h-[1.1vw] w-[1.1vw] max-[767px]:!h-[3.6vw] max-[767px]:!w-[3.6vw]" fill="currentColor" />
              </span>
              {CAREER.codeOfConduct.cta.text}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
