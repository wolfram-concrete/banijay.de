"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Statement-auf-Video-Section: gepinnt. Aus der Tiefe („von hinten nach vorne")
// skaliert ein Video-Container großflächig auf und überlagert die Section darüber
// (die Zahlen). Sobald er full-size steht, enthüllt sich zentral das Statement
// Wort für Wort auf dem Video. Danach scrollt es weiter zur nächsten Section.

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";

export function AlgarveStatementVideo({
  statement,
  video = "/video/b-glass.mp4",
  poster,
}: {
  statement: string;
  video?: string;
  poster?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>("[data-sv-word]");
      // Initial-State vor dem ersten Paint (kein Flash).
      gsap.set(media.current, { scale: 0.42, opacity: 0, borderRadius: "3vw" });
      gsap.set(words, { yPercent: 110, opacity: 0 });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(media.current, { scale: 1, opacity: 1, borderRadius: "0vw" });
        gsap.set(words, { yPercent: 0, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: "[data-sv-stage]",
          invalidateOnRefresh: true,
        },
      });

      // 1) Video-Container skaliert aus der Tiefe auf Full-Screen + faltet die
      //    gerundeten Kanten auf.
      tl.to(media.current, { scale: 1, opacity: 1, borderRadius: "0vw", ease: "power2.out", duration: 0.55 }, 0);
      // 2) Erst danach das Statement Wort für Wort zentral aufs Video.
      tl.to(words, { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.5, stagger: 0.06 }, 0.62);
    },
    { scope: root },
  );

  const parts = statement.split(" ");

  return (
    <section ref={root} className="relative" style={{ height: "260vh", background: PAPER }}>
      <div data-sv-stage className="sticky top-0 h-screen w-screen overflow-clip">
        {/* Video-Container (skaliert aus der Tiefe) */}
        <div ref={media} className="absolute inset-0 overflow-clip" style={{ willChange: "transform, opacity" }}>
          <video autoPlay muted loop playsInline poster={poster} className="absolute inset-0 h-full w-full object-cover">
            <source src={video} type="video/mp4" />
          </video>
          {/* dezenter Scrim für Lesbarkeit */}
          <div className="absolute inset-0" style={{ background: "rgba(8,7,10,0.4)" }} />
        </div>

        {/* Statement zentral über dem Video */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingLeft: "6vw", paddingRight: "6vw" }}>
          <p
            className="m-0 flex flex-wrap justify-center text-center max-[767px]:!text-[7vw]"
            style={{ maxWidth: "64vw", columnGap: "0.7vw", rowGap: 0, fontFamily: SHARP, fontSize: "3.2vw", lineHeight: "118%", fontWeight: 500, letterSpacing: "-0.09vw", color: PAPER }}
          >
            {parts.map((w, i) => (
              <span key={i} className="overflow-hidden" style={{ display: "inline-block", paddingTop: "0.5vw", paddingBottom: "0.5vw", marginTop: "-0.5vw", marginBottom: "-0.5vw" }}>
                <span data-sv-word style={{ display: "inline-block" }}>
                  {w}
                </span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
