"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// CEO-/Testimonial-Section nach dem testimonials-5-Template: eine 2-Spalten-Card —
// links ein dunkles Content-Panel (Label · Divider · großes Zitat · Autor · Divider
// · zwei Kennzahlen · Divider · CTA), rechts ein hohes, gerundetes Portrait.
// Banijay-Adaption: Ink-Panel, Paper-Typo, Sharp-Grotesk. Entrance via
// IntersectionObserver (fade + slide-up).

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const PAPER = "#f8f7f3";

function Divider() {
  return <div style={{ height: "1px", width: "100%", background: "rgba(248,247,243,0.16)" }} />;
}

export function AlgarveCeoTestimonial({
  role,
  quote,
  name,
  image,
  cta,
  stats,
}: {
  heading?: string;
  role: string;
  quote: string;
  name: string;
  image: string;
  cta?: { text: string; href: string };
  stats?: { value: string; label: string }[];
}) {
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const enter: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: "opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 800ms cubic-bezier(0.22,1,0.36,1)",
  };

  return (
    <section ref={root} style={{ background: PAPER, paddingTop: "6.94vw", paddingBottom: "6.94vw" }}>
      <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
        <div className="grid items-stretch md:grid-cols-2 max-[767px]:!grid-cols-1" style={{ ...enter, gap: "1.2vw" }}>
          {/* ── Content-Panel (dunkel) ─────────────────────────────────────── */}
          <div
            className="flex flex-col justify-between max-[767px]:!p-[8vw]"
            style={{ background: INK, color: PAPER, borderRadius: "1.11vw", padding: "3.33vw", gap: "2.5vw" }}
          >
            <div className="flex flex-col" style={{ gap: "2vw" }}>
              <span
                className="max-[767px]:!text-[3vw]"
                style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.12vw", textTransform: "uppercase", color: "rgba(248,247,243,0.55)" }}
              >
                {role}
              </span>
              <Divider />
              <blockquote
                className="m-0 max-[767px]:!text-[6vw]"
                style={{ fontFamily: SHARP, fontSize: "2.4vw", lineHeight: "122%", fontWeight: 500, letterSpacing: "-0.06vw" }}
              >
                „{quote}“
              </blockquote>
              <div className="flex flex-col" style={{ gap: "0.2vw" }}>
                <span className="max-[767px]:!text-[4.4vw]" style={{ fontFamily: SHARP, fontSize: "1.2vw", fontWeight: 500 }}>
                  {name}
                </span>
                <span className="max-[767px]:!text-[3.2vw]" style={{ fontFamily: SHARP, fontSize: "0.95vw", fontWeight: 400, color: "rgba(248,247,243,0.6)" }}>
                  {name === "Marcus Wolter" ? "CEO & Co-Founder Banijay Germany" : role}
                </span>
              </div>

              {stats && stats.length > 0 && (
                <>
                  <Divider />
                  <div className="grid grid-cols-2" style={{ gap: "2vw" }}>
                    {stats.slice(0, 2).map((s) => (
                      <div key={s.label} className="flex flex-col" style={{ gap: "0.6vw" }}>
                        <span className="max-[767px]:!text-[9vw]" style={{ fontFamily: SHARP, fontSize: "2.8vw", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.1vw" }}>
                          {s.value}
                        </span>
                        <span className="max-[767px]:!text-[3.2vw]" style={{ fontSize: "0.95vw", lineHeight: "135%", color: "rgba(248,247,243,0.6)" }}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {cta && (
              <a
                href={cta.href}
                className="inline-flex w-fit items-center gap-2 rounded-full border text-[#f8f7f3] no-underline transition-colors duration-300 hover:bg-[#f8f7f3] hover:text-[#0e0d0b] max-[767px]:!text-[3.4vw]"
                style={{ borderColor: "rgba(248,247,243,0.6)", padding: "0.83vw 1.67vw", fontFamily: SHARP, fontSize: "1.05vw" }}
              >
                {cta.text}
                <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
              </a>
            )}
          </div>

          {/* ── Portrait rechts ────────────────────────────────────────────── */}
          <div className="overflow-clip max-[767px]:!h-[110vw]" style={{ borderRadius: "1.11vw" }}>
            <img src={image} alt={name} className="h-full w-full object-cover" style={{ objectPosition: "center 22%" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
