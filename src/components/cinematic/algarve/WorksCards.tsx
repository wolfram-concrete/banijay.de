"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getFeaturedHomeCompanies } from "@/data/companies";
import { getCompanyImage } from "@/data/companyImages";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// section_works-home (Algarve 1:1): 300vh-Sticky. Zwei große h5-Wörter
// („featured" / „companies") mit gegenläufigen Origins, dazwischen ein Stapel
// aus 3 weißen Cards (30%×80%), die beim Scrollen durchgetauscht/skaliert
// werden. Inhalt: die drei Featured-Companies.

const H5 = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "7vw",
  lineHeight: "110%",
  fontWeight: 500,
  letterSpacing: "-0.139vw",
  margin: 0,
} as const;

const cards = getFeaturedHomeCompanies()
  .slice(0, 3)
  .map((c) => ({
    name: c.name,
    subtext: c.knownFor?.[0] ?? c.profile,
    img: getCompanyImage(c)?.url ?? "/grid/g01.jpg",
  }));

export function AlgarveWorksCards() {
  const root = useRef<HTMLElement>(null);
  const wordL = useRef<HTMLHeadingElement>(null);
  const wordR = useRef<HTMLHeadingElement>(null);

  // Echte Timeline t-2c4f15b0 (Trigger works-home_master-list, scrub .8),
  // Positionen/Dauern 1:1 aus dem Original:
  //   • Headings (featured/companies): x ±40vw → 0, scale 5 → 1 (pos 1.33, dur 2.2)
  //   • Cards: scale 0 → 1, gestaffelt each 1.3 → das Deck baut sich auf (pos 1.52)
  //   • Cards fächern auf (pos 5.32): is-first x −100%/scale .8/rot −4°,
  //     is-second scale .9, is-third x 100%/scale .8/rot 4°.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const els = gsap.utils.toArray<HTMLElement>("[data-work-card]");
      if (els.length < 3) return;
      gsap.set(els, { scale: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      tl.from(wordL.current, { x: "40vw", scale: 5, ease: "none", duration: 2.2 }, 1.33)
        .from(wordR.current, { x: "-40vw", scale: 5, ease: "none", duration: 2.2 }, 1.33)
        .to(els, { scale: 1, ease: "power2.out", duration: 1.2, stagger: { each: 1.3 } }, 1.52)
        .to(els[0], { xPercent: -100, scale: 0.8, rotation: -4, ease: "none", duration: 0.88 }, 5.32)
        .to(els[1], { scale: 0.9, ease: "none", duration: 0.88 }, 5.32)
        .to(els[2], { xPercent: 100, scale: 0.8, rotation: 4, ease: "none", duration: 0.88 }, 5.32);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-clip"
      style={{ background: "transparent", height: "300vh" }}
    >
      <div
        className="sticky top-0 flex items-end"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div
          className="flex h-full w-full flex-col justify-center"
          style={{ padding: "2vw" }}
        >
          {/* Große Wörter */}
          <div className="flex items-center justify-between max-[767px]:hidden">
            <h2 ref={wordL} className="uppercase text-[#f8f7f3]" style={{ ...H5, transformOrigin: "100%" }}>
              featured
            </h2>
            <h2 ref={wordR} className="uppercase text-[#f8f7f3]" style={{ ...H5, transformOrigin: "0%" }}>
              companies
            </h2>
          </div>

          {/* Card-Stapel */}
          <div
            className="absolute inset-0 m-auto flex items-center justify-center"
            style={{ width: "30%", height: "80%" }}
          >
            {cards.map((card) => (
              <div
                key={card.name}
                data-work-card
                className="absolute inset-0 m-auto flex flex-col overflow-clip"
                style={{
                  width: "100%",
                  height: "80%",
                  background: "rgba(255,255,255,0.06)",
                  boxShadow: "0 1px 3px 0 rgba(0,0,0,0.04), 0 2px 30px 0 rgba(0,0,0,0.08)",
                }}
              >
                <div className="relative flex flex-1 flex-col items-center justify-end overflow-clip">
                  <img
                    src={card.img}
                    alt={card.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute flex w-full flex-col items-center justify-end"
                    style={{
                      paddingTop: "8.33vw",
                      paddingBottom: "1.67vw",
                      gap: "0.28vw",
                      backgroundImage: "linear-gradient(0deg, #000, #0000)",
                      color: "#f8f7f3",
                      bottom: 0,
                    }}
                  >
                    <h3
                      className="m-0 uppercase"
                      style={{ ...H5, fontSize: "2vw", letterSpacing: "-0.034vw" }}
                    >
                      {card.name}
                    </h3>
                    <div
                      className="m-0 lowercase"
                      style={{
                        fontFamily: "var(--font-sharp), sans-serif",
                        fontSize: "1.39vw",
                        fontWeight: 500,
                        opacity: 0.7,
                      }}
                    >
                      {card.subtext}
                    </div>
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
