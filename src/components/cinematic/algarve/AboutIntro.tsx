"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HOME } from "@/data/home";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// section_about-intro (Algarve 1:1): 220vh-Scroll-Sektion mit 100vh-Sticky-Panel.
// Zentriertes Statement (h4), das sich Wort für Wort enthüllt. Optional
// (magentaExit): nachdem das Statement steht, layert im selben Sticky-Panel eine
// gerundete Magenta-Fläche von unten über das (stehende) Statement — rechts stark
// gerundet als „b"-Körper-Andeutung — und faltet dann auf Full-Size auf. Danach
// übergibt sie nahtlos an die Companies-Section (gleiches Magenta).

const H4 = {
  fontFamily: "var(--font-sharp), sans-serif",
  fontSize: "2.5vw",
  lineHeight: "125%",
  fontWeight: 500,
  letterSpacing: "-0.104vw",
} as const;

const ACCENT = "#ff4370";

export function AlgarveAboutIntro({ text, magentaExit = false }: { text?: string; magentaExit?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const words = (text ?? HOME.world.text).split(" ");

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

      // magentaExit: gerundete Magenta-Fläche steigt über das stehende Statement
      // und faltet dann auf Full-Size auf. Die Section ist dafür höher (320vh) →
      // das Sticky-Panel bleibt bis ~progress 0.69 gepinnt; Rise+Unfold liegen
      // sauber INNERHALB dieses Pin-Fensters (Timeline-Total = 1 → 1:1-Mapping).
      // Der Magenta-Aufstieg über das (stehende) Statement läuft nur auf MOBILE:
      // dort ist die Desktop-Companies-Fläche (die den Aufstieg via -100vh-Overlap
      // trägt) ausgeblendet, sodass sonst kein Layer-Over stattfände. Auf Desktop
      // bleibt es beim bewährten CompaniesScroller-Aufstieg.
      const ov = overlay.current;
      if (magentaExit && ov && !window.matchMedia("(min-width: 768px)").matches) {
        gsap.set(ov, { yPercent: 100, borderTopLeftRadius: "12vw", borderTopRightRadius: "42vw" });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true },
        });
        // 1) Aufsteigen über das (stehende) Statement.
        tl.to(ov, { yPercent: 0, ease: "power2.out", duration: 0.18 }, 0.45);
        // 2) Radiale Ober-Ecken (b-Körper) falten auf → volle Magenta-Fläche.
        //    „Voll" liegt jetzt nah am Timeline-Ende (~0.85) → direkt danach
        //    übernimmt die Companies-Section (kein langer Leerlauf mehr).
        tl.to(ov, { borderTopLeftRadius: "0vw", borderTopRightRadius: "0vw", ease: "power2.inOut", duration: 0.22 }, 0.63);
        // Kurzer Halte-Beat bis Timeline-Ende.
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
        // Desktop (magentaExit): höher (275vh) → nach dem Word-Reveal (~60vh) bleibt
        // das weiße Statement deutlich länger GEPINNT stehen, bevor die Companies-
        // Section (marginTop -100vh) mit ihrer Magenta-Fläche darüberschiebt. Mobile
        // bleibt via Klassen-Override bei 230vh (dortiges magentaExit-Overlay-Timing).
        height: magentaExit ? "275vh" : "220vh",
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

        {/* Gerundete Magenta-Blende (nur magentaExit) — layert über das Statement */}
        {magentaExit && (
          <div
            ref={overlay}
            aria-hidden
            data-nav-theme="magenta"
            // Nur auf Mobile gerendert (dort läuft der Aufstieg) — so bleibt die
            // Blende auf Desktop komplett aus dem Weg. Kein inline-Transform, sonst
            // parst GSAP das „100%" als px-Baseline und verdoppelt den yPercent-Tween.
            className="pointer-events-none absolute inset-0 hidden max-[767px]:block"
            style={{ zIndex: 5, background: ACCENT, willChange: "transform" }}
          />
        )}
      </div>
    </section>
  );
}
