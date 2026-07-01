"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

// Algarve „studio-hero" für alle Unterseiten (nicht Home). Entrance-Animation
// 1:1 aus der Template-Referenz übernommen: IntersectionObserver (threshold 0.1)
// schaltet CSS-Transitions frei — Headline opacity+translateY(2rem), Bildblock
// opacity+translateY(2.5rem) mit delay-300, Glass-Card opacity+scale(.95) mit
// delay-500; alle transition-all duration-700 ease-out.

const PAPER = "#f8f7f3";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

export function AlgarvePageHero({
  headline,
  label,
  body,
  image,
}: {
  headline: string;
  label: string;
  body: string;
  image: string;
}) {
  const [headingRef, headingVisible] = useReveal<HTMLDivElement>();
  const [imageRef, imageVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      className="w-full"
      style={{ background: PAPER, paddingTop: "clamp(7rem, 8.33vw, 11vw)", paddingBottom: "5.56vw" }}
    >
      <div className="max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div className="mx-auto w-full max-w-[100vw]">
          {/* Headline */}
          <div
            ref={headingRef}
            className={`mx-auto flex w-full flex-col items-center text-center max-[767px]:!max-w-[75vw] transition-all duration-700 ease-out ${
              headingVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ maxWidth: "71.39vw" }}
          >
            <h1
              className="uppercase text-black"
              style={{
                fontFamily: "var(--font-sharp), sans-serif",
                fontSize: "clamp(2.6rem, 11.11vw, 12rem)",
                lineHeight: "115%",
                fontWeight: 500,
                letterSpacing: "-0.312vw",
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {headline}
            </h1>
          </div>

          {/* Bildblock */}
          <div
            ref={imageRef}
            className={`relative overflow-hidden transition-all delay-300 duration-700 ease-out max-[767px]:!py-[27vw] ${
              imageVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{
              marginTop: "clamp(2.5rem, 6vw, 7vw)",
              paddingTop: "11.11vw",
              paddingBottom: "11.11vw",
              borderRadius: "1.67vw",
            }}
          >
            <div className="absolute inset-0">
              <img src={image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.64)" }} />
            </div>

            {/* Glass-Card */}
            <div
              className={`relative z-10 mx-auto flex flex-col items-center text-center transition-all delay-500 duration-700 ease-out max-[991px]:!max-w-[60vw] max-[767px]:!w-[82%] max-[767px]:!max-w-[90vw] ${
                imageVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              style={{
                width: "50%",
                maxWidth: "31.11vw",
                gap: "1.39vw",
                borderRadius: "1.67vw",
                background: "rgba(0,0,0,0.32)",
                padding: "clamp(1.25rem, 2.22vw, 2.5rem)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "inset 0 0 24px 0 rgba(248,247,243,0.08), inset 0 6px 12px 0 rgba(248,247,243,0.16)",
                color: "#f8f7f3",
              }}
            >
              <div
                className="font-bold uppercase"
                style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.9rem)", letterSpacing: "0.052vw", lineHeight: "100%" }}
              >
                {label}
              </div>
              <p className="m-0" style={{ fontSize: "clamp(0.9rem, 1.1vw, 1.15rem)", lineHeight: "135%" }}>
                {body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
