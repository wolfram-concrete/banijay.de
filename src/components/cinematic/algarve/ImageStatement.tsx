/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/cinematic/Reveal";

// Algarve „image block"-Modul: vollflächiges Bild mit Dark-Overlay und einer
// zentrierten Frosted-Glass-Card (Eyebrow + Headline + Text + optionaler CTA).
// Für starke Statement-Momente auf Unterseiten (z. B. About „International",
// Career „BANIJAY TOMORROW").

export function AlgarveImageStatement({
  eyebrow,
  headline,
  text,
  image,
  cta,
}: {
  eyebrow?: string;
  headline: string;
  text: string;
  image: string;
  /** Optionaler externer CTA (öffnet in neuem Tab). */
  cta?: { text: string; href: string };
}) {
  return (
    <section style={{ background: "transparent" }} className="py-12 lg:py-20">
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <Reveal>
          <div
            className="relative overflow-hidden max-[767px]:!py-[26vw]"
            style={{ paddingTop: "11vw", paddingBottom: "11vw" }}
          >
            <div className="absolute inset-0">
              <img src={image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.62)" }} />
            </div>

            <div
              className="relative z-10 mx-auto flex flex-col items-center text-center md:max-w-[44vw] max-[767px]:!w-[86%]"
              style={{
                width: "62%",
                gap: "1.2vw",
                background: "rgba(0,0,0,0.32)",
                padding: "clamp(1.5rem, 2.6vw, 3rem)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "inset 0 0 24px 0 rgba(248,247,243,0.08), inset 0 6px 12px 0 rgba(248,247,243,0.16)",
                color: "#f8f7f3",
              }}
            >
              {eyebrow && (
                <span className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-white/55">
                  {eyebrow}
                </span>
              )}
              <h2
                className="m-0"
                style={{
                  fontFamily: "var(--font-sharp), sans-serif",
                  fontSize: "clamp(1.7rem, 3.4vw, 3rem)",
                  fontWeight: 500,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                }}
              >
                {headline}
              </h2>
              <p className="m-0 max-w-xl" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)", lineHeight: 1.55 }}>
                {text}
              </p>
              {cta && (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-[6px] bg-[#f8f7f3] px-6 py-3 text-sm font-medium text-[#0e0d0b] transition-colors hover:bg-white"
                >
                  {cta.text} <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
