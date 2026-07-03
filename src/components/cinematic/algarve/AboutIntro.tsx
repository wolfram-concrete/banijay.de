"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HOME } from "@/data/home";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// section_about-intro (Algarve 1:1): Scroll-Sektion mit 100vh-Sticky-Panel.
// Zentriertes Statement (h4), das sich Wort für Wort enthüllt.
//   • magentaExit → NUR Mobile: nachdem das Statement steht, steigt im Sticky-Panel
//     eine gerundete Magenta-Blende über das stehende Statement (auf Desktop trägt
//     den Aufstieg die CompaniesScroller-Fläche via -100vh-Overlap).
//   • tall → macht die Sektion auf Desktop höher (275vh), sodass das Statement lange
//     GEPINNT stehen bleibt, während die NÄCHSTE Section (z. B. WorldNetwork) sich
//     via -100vh-Overlap mit eigener gerundeter Oberkante darüberschiebt. KEINE
//     eigene Blende hier → kein doppelter Layer / kein Break.

const H4 = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "2.5vw",
  lineHeight: "125%",
  fontWeight: 500,
  letterSpacing: "-0.104vw",
} as const;

const ACCENT = "#ff4370";

export function AlgarveAboutIntro({
  text,
  magentaExit = false,
  tall = false,
}: {
  text?: string;
  magentaExit?: boolean;
  /** Desktop höher (275vh) → Standraum, damit die nächste Section darüber aufsteigen kann. */
  tall?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const words = (text ?? HOME.world.text).split(" ");
  const tallSection = magentaExit || tall;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const wordEls = gsap.utils.toArray<HTMLElement>("[data-word]");
      gsap.set(wordEls, { willChange: "transform, opacity", backfaceVisibility: "hidden" });
      // Wort-für-Wort-Reveal in der ERSTEN Hälfte der Sektion.
      gsap.from(wordEls, {
        opacity: 0,
        yPercent: 30,
        ease: "none",
        stagger: { amount: 1, from: "start" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=60%", scrub: 1 },
      });

      // magentaExit (nur Mobile): gerundete Magenta-Fläche steigt über das stehende
      // Statement und faltet auf. Startlage per gsap.set (vor dem Paint; Section liegt
      // unter dem Fold). KEIN inline-Transform, sonst verdoppelt GSAP das „100%".
      const ov = overlay.current;
      if (magentaExit && ov && !window.matchMedia("(min-width: 768px)").matches) {
        gsap.set(ov, { yPercent: 100, borderTopLeftRadius: "12vw", borderTopRightRadius: "42vw" });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true },
        });
        tl.to(ov, { yPercent: 0, ease: "power2.out", duration: 0.18 }, 0.45);
        tl.to(ov, { borderTopLeftRadius: "0vw", borderTopRightRadius: "0vw", ease: "power2.inOut", duration: 0.22 }, 0.63);
        tl.to(ov, { yPercent: 0, duration: 0.15 }, 0.85);
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className={magentaExit ? "max-[767px]:!h-[230vh]" : "max-[767px]:!h-[150vh]"}
      style={{
        // Desktop mit Standraum (magentaExit/tall): 275vh → das Statement bleibt nach
        // dem Word-Reveal deutlich länger GEPINNT stehen, bevor die nächste Fläche
        // (marginTop -100vh) darüberschiebt. Mobile bleibt via Klassen-Override flach.
        height: tallSection ? "275vh" : "220vh",
        paddingTop: "5.56vw",
        paddingBottom: "5.56vw",
        position: "relative",
        overflow: "clip",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{ width: "100vw", height: "100vh", position: "sticky", top: 0 }}
      >
        <div style={{ padding: "2vw" }}>
          <p
            className="m-0 mx-auto text-center text-black max-[991px]:!max-w-[80vw] max-[767px]:!max-w-[92vw] max-[767px]:!text-[6.4vw] max-[767px]:!leading-[126%]"
            style={{ ...H4, maxWidth: "55.28vw" }}
          >
            {words.map((w, i) => (
              <span key={i}>
                <span data-word className="inline-block">
                  {w}
                </span>{" "}
              </span>
            ))}
          </p>
        </div>

        {/* Gerundete Magenta-Blende (nur magentaExit / nur Mobile) */}
        {magentaExit && (
          <div
            ref={overlay}
            aria-hidden
            data-nav-theme="magenta"
            className="pointer-events-none absolute inset-0 hidden max-[767px]:block"
            style={{ zIndex: 5, background: ACCENT, willChange: "transform" }}
          />
        )}
      </div>
    </section>
  );
}
