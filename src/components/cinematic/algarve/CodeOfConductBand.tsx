import { ArrowUpRight } from "lucide-react";
import { CAREER } from "@/data/career";

// Schlanker Code-of-Conduct-Abschluss vor dem Footer: Headline + kurzer Satz,
// rechts ein externer PDF-Link (neuer Tab). Bewusst ruhig, keine große Section.

const SHARP = "var(--font-sharp), sans-serif";

export function AlgarveCodeOfConductBand() {
  return (
    <section style={{ background: "#f8f7f3", paddingTop: "5.56vw", paddingBottom: "5.56vw" }}>
      <div className="max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div
          className="flex items-end justify-between gap-8 max-[767px]:!flex-col max-[767px]:!items-start max-[767px]:!gap-6"
          style={{ borderTop: "0.08vw solid rgba(0,0,0,0.14)", paddingTop: "3.33vw" }}
        >
          <div className="max-w-[47vw] max-[767px]:!max-w-full">
            <h2
              className="m-0 uppercase max-[767px]:!text-[8vw]"
              style={{ fontFamily: SHARP, fontSize: "3.33vw", lineHeight: "112%", fontWeight: 500, letterSpacing: "-0.094vw", color: "#0e0d0b" }}
            >
              {CAREER.codeOfConduct.headline}
            </h2>
            <p
              className="max-[767px]:!text-[4vw]"
              style={{ marginTop: "1.11vw", fontSize: "1.25vw", lineHeight: "145%", color: "rgba(0,0,0,0.64)" }}
            >
              {CAREER.codeOfConduct.text}
            </p>
          </div>
          <a
            href={CAREER.codeOfConduct.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#0e0d0b] px-6 py-3 text-sm font-medium text-[#0e0d0b] transition-colors hover:bg-[#0e0d0b] hover:text-white"
          >
            {CAREER.codeOfConduct.cta.text} <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
