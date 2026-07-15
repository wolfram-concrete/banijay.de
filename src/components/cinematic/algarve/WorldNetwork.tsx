"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ABOUT } from "@/data/about";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// About – Banijay World / Territory-Holdings-Netzwerk. Magentafarbener Farb-„Break",
// der via -100vh-Overlap über das stehende Statement steigt (b-Körper-Oberkante
// faltet auf). Auf DESKTOP ein Scroll-Stop mit klarer Nacheinander-Choreografie:
//   1) Der (leere) Magenta-Hintergrund schiebt sich VERSETZT über das Statement und
//      rastet full-size ein.
//   2) ERST DANACH baut sich der Content per Parallax gestaffelt auf (Eyebrow →
//      Headline → Copy → CTA → Video → Logo-Bahn) + eine ruhige Setz-Phase (Hold).
//   3) Dann slidet die Logo-Bahn horizontal durch — bis das letzte bündig steht;
//      der Pin löst, der Scroll geht in Team. Die Logo-Bahn ist zusätzlich MANUELL
//      zieh-/swipebar (native scrollLeft + Drag-Handler).
// Mobile: statisch, nativer Horizontal-Scroll.

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const MAGENTA = "#ff4370";
const TILE = "#f8f7f3";

export function AlgarveWorldNetwork() {
  const { world } = ABOUT;
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const trackWrap = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  // Zeitstempel der letzten manuellen Bedienung (Drag/Wheel/Touch). Solange die
  // kürzlich war, pausiert der scroll-getriebene Slide (unten), damit die manuelle
  // Position hält und nicht vom Lenis-getriebenen onUpdate zurückgeschnappt wird.
  const lastManual = useRef(0);

  // Logo-Bahn zusätzlich manuell bedienbar: Klick-Ziehen pant die Leiste (Trackpad-
  // Swipe funktioniert über overflow-x-auto ohnehin nativ). Ein Move-Schwellwert
  // verhindert, dass ein Drag versehentlich den Logo-Link öffnet.
  useEffect(() => {
    const wrap = trackWrap.current;
    if (!wrap) return;
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    const mark = () => (lastManual.current = performance.now());
    const onDown = (e: PointerEvent) => {
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = wrap.scrollLeft;
      wrap.style.cursor = "grabbing";
      mark();
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) {
        moved = true;
        dragging.current = true;
      }
      if (moved) {
        wrap.scrollLeft = startLeft - dx;
        mark();
      }
    };
    const onUp = () => {
      down = false;
      wrap.style.cursor = "grab";
      mark();
      requestAnimationFrame(() => (dragging.current = false));
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    wrap.style.cursor = "grab";
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    wrap.addEventListener("click", onClick, true);
    // Trackpad-Horizontal-Wheel & Touch zählen ebenfalls als manuelle Bedienung.
    wrap.addEventListener("wheel", mark, { passive: true });
    wrap.addEventListener("touchstart", mark, { passive: true });
    wrap.addEventListener("touchmove", mark, { passive: true });
    return () => {
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("click", onClick, true);
      wrap.removeEventListener("wheel", mark);
      wrap.removeEventListener("touchstart", mark);
      wrap.removeEventListener("touchmove", mark);
    };
  }, []);

  useGSAP(
    () => {
      const sec = root.current;
      const wrap = trackWrap.current;
      if (!sec || !wrap || !panel.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return; // Content sichtbar, Logo-Bahn nativ scroll-/ziehbar.
      const desktop = window.matchMedia("(min-width: 768px)").matches;

      // 1) Aufstieg: radial gekurvte Oberkante (rechts stärker → b-Körper) faltet
      //    beim Hochsteigen auf. Der Content ist dabei noch verborgen (leerer
      //    Magenta-Grund schiebt sich versetzt über das Statement).
      gsap.set(sec, { borderTopLeftRadius: "0vw", borderTopRightRadius: "0vw" });
      gsap.to(sec, {
        borderTopLeftRadius: "0vw",
        borderTopRightRadius: "0vw",
        ease: "none",
        scrollTrigger: { trigger: sec, start: "top bottom", end: "top top", scrub: 1, invalidateOnRefresh: true },
      });

      // maxScroll = horizontale Slide-Distanz der Logo-Bahn.
      const maxScroll = () => Math.max(0, wrap.scrollWidth - wrap.clientWidth);

      // 2) Content-Parallax: der leere Magenta-Grund steht ZUERST (Aufstieg über das
      //    Statement). Erst beim WEITERSCROLLEN (nach dem Andocken) zieht der Content
      //    gestaffelt von unten herein — scroll-/scrub-gekoppelt (Parallax), über die
      //    erste Hälfte der Setz-Phase. So kommt es klar NACHEINANDER: Layer → Text.
      gsap.set("[data-wn-reveal]", { opacity: 0, y: 72 });
      gsap.to("[data-wn-reveal]", {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          // Feste Aufbau-Strecke (unabhängig vom Logo-Überhang) — der Content zieht über
          // ~0.7 Screens vollständig ein, BEVOR die Setz-Phase hält bzw. die Logos sliden.
          end: () => "+=" + Math.round(window.innerHeight * 0.7),
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 3) Scroll-Stop: Panel gepinnt; Setz-Phase (Content zieht ein) → dann slidet die
      //    Logo-Bahn über die native scrollLeft-Position (0 → max) — zugleich MANUELL
      //    zieh-/swipebar. Pin-Länge = Setz-Phase + Slide-Distanz → danach löst der Pin.
      // Pinned Scroll-Stop-Slider NUR Desktop. Mobile: Rise + Unfold + Content-Reveal
      // (oben) laufen, die Logo-Bahn bleibt nativer Swipe (kein Pin).
      if (desktop) {
        // FESTE Setz-/Aufbau-Distanz (~1.5 Screens) + optionaler Logo-Slide-Überhang.
        // Wichtig: auf breiten Screens passen alle Logos in eine Reihe → maxScroll = 0.
        // Ohne die feste Distanz wäre die Pin-Strecke 0 und man würde über die Section
        // hinwegscrollen. So rastet sie IMMER full-size ein, der Content baut sich auf
        // und hält; erst danach sliden die Logos (falls Überhang). Snap → „einrasten".
        const settlePx = () => Math.round(window.innerHeight * 1.5);
        const pinDist = () => settlePx() + maxScroll();
        ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end: () => "+=" + pinDist(),
          pin: panel.current,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          // Snap-Scroll: die Section rastet full-size ein (0) bzw. gibt am Ende frei (1).
          snap: { snapTo: [0, 1], duration: { min: 0.2, max: 0.5 }, ease: "power1.inOut", delay: 0.1 },
          onUpdate: (self) => {
            if (dragging.current || performance.now() - lastManual.current < 900) return;
            const ms = maxScroll();
            if (ms <= 0) return;
            const settleFrac = settlePx() / pinDist();
            const slideP = Math.min(1, Math.max(0, (self.progress - settleFrac) / (1 - settleFrac)));
            wrap.scrollLeft = slideP * ms;
          },
        });
      } else {
        // Mobile: KEIN gepinnter Logo-Slider (nativer Swipe). ABER kurzer Pin ab
        // „top top", damit der Panel-Content (Headline/Copy/CTA) beim Einziehen NICHT
        // sofort hinter die Sticky-Nav wegscrollt. Pin-Länge = Reveal-Strecke + kleiner
        // Hold; danach löst der Pin, Logo-Bahn + Pills scrollen normal nach.
        const revealLen = Math.round(window.innerHeight * 0.7);
        ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end: () => "+=" + (revealLen + Math.round(window.innerHeight * 0.4)),
          pin: panel.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-nav-theme="magenta"
      // Desktop UND Mobile: -100vh-Overlap (steigt über das Statement), Curving-Oberkante
      // faltet beim Aufsteigen auf (GSAP). Kein statischer Mobile-Rounded mehr.
      className="relative"
      style={{ background: MAGENTA, color: INK, marginTop: "-100vh", zIndex: 2 }}
    >
      {/* Full-size Panel — Desktop gepinnt (Scroll-Stop). Mobile: min. voller Screen,
          damit die Magenta-Fläche beim Aufsteigen das Statement voll deckt. */}
      <div
        ref={panel}
        className="flex h-screen w-full flex-col justify-center max-[767px]:!min-h-screen max-[767px]:!h-auto max-[767px]:!justify-start max-[767px]:!pt-[24vw] max-[767px]:!pb-[14vw]"
        style={{ paddingTop: "3vh", paddingBottom: "3vh", rowGap: "clamp(20px, 3vh, 44px)" }}
      >
        {/* ── Kopf: Textblock links, Brand-Video rechts (mittig im Grid) ─────── */}
        <div className="mx-auto w-full max-[767px]:!px-[5vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1560px" }}>
          {/* Bildcontainer oben an der Headline-Oberlänge ausgerichtet (Wolfram
              15.07.): items-start statt -center → Video-Oberkante bündig zur Headline. */}
          <div className="grid items-start md:grid-cols-[1fr_1fr] max-[767px]:!grid-cols-1" style={{ columnGap: "4vw", rowGap: "8vw" }}>
            <div className="flex flex-col items-start" style={{ gap: "1.6vw" }}>
              <h2
                data-wn-reveal
                className="m-0 max-[767px]:!text-[8.5vw]"
                style={{ fontFamily: SHARP, fontSize: "3.1vw", lineHeight: "112%", fontWeight: 500, letterSpacing: "-0.09vw", color: INK }}
              >
                {world.headline}
              </h2>
              <p
                data-wn-reveal
                className="m-0 max-w-[43vw] max-[767px]:!max-w-full max-[767px]:!text-[4vw]"
                style={{ fontSize: "1.2vw", lineHeight: "146%", color: "rgba(14,13,11,0.72)" }}
              >
                {world.text}
              </p>
              <a
                data-wn-reveal
                href={world.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-[6px] text-[#0e0d0b] no-underline transition-colors duration-300 hover:bg-[#0e0d0b] hover:text-[#ff4370] max-[767px]:!mt-[2vw] max-[767px]:!px-[6vw] max-[767px]:!py-[3vw] max-[767px]:!text-[3.4vw]"
                style={{ border: "0.12vw solid #0e0d0b", padding: "0.9vw 1.8vw", fontFamily: SHARP, fontSize: "1.05vw", fontWeight: 500, marginTop: "0.4vw" }}
              >
                {world.cta.text}
                <ArrowUpRight className="h-[1.05vw] w-[1.05vw] max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
              </a>
            </div>

            {/* Cinematisches Banijay-Brand-Video (dasselbe wie auf der Home) */}
            <div
              data-wn-reveal
              className="overflow-clip max-[767px]:!aspect-[16/10] max-[767px]:!h-auto"
              style={{ height: "clamp(300px, 42vh, 480px)" }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={world.image}
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% center" }}
              >
                <source src="/video/banijay-brand.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* ── Logo-Bahn — startet LINKSBÜNDIG zur Schrift (gleicher max-w-Container),
            blutet nach rechts über den Viewport-Rand (macht klar: geht weiter). ── */}
        <div data-wn-reveal className="mx-auto w-full max-[767px]:!px-[5vw]" style={{ maxWidth: "1560px", paddingLeft: "2vw", paddingRight: "2vw" }}>
          <div
            ref={trackWrap}
            className="touch-pan-x select-none overflow-x-auto snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ marginRight: "calc(50% - 50vw)" }}
          >
            <div className="flex" style={{ gap: "1.4vw", paddingRight: "6vw" }}>
              {world.holdings.map((h) => (
                <a
                  key={h.name}
                  href={h.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  aria-label={`${h.name} öffnen`}
                  className="group shrink-0 snap-start overflow-clip max-[767px]:!h-[27vw] max-[767px]:!w-[27vw]"
                  style={{ height: "clamp(118px, 16vh, 178px)", aspectRatio: "1 / 1", background: TILE }}
                >
                  <img
                    src={h.image}
                    alt={h.name}
                    draggable={false}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] max-[767px]:!p-[4%]"
                    style={{ padding: "17%" }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Worldwide-Textlinks (Wolfram 15.07.): keine Buttons mehr — schlichte
              unterstrichene Hyperlinks mit Pfeil daneben, linksbündig. */}
          <div
            className="flex w-full flex-wrap items-center max-[767px]:!gap-x-[6vw] max-[767px]:!gap-y-[3vw]"
            style={{ columnGap: "2.4vw", rowGap: "1vw", marginTop: "2.4vw" }}
          >
            {world.worldwide.map((w) => (
              <a
                key={w.label}
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-[0.4vw] whitespace-nowrap text-[#0e0d0b] underline decoration-[rgba(14,13,11,0.4)] underline-offset-[0.35vw] transition-colors duration-300 hover:decoration-[#0e0d0b] max-[767px]:!text-[3.6vw] max-[767px]:!underline-offset-4"
                style={{ fontFamily: SHARP, fontSize: "1.05vw", fontWeight: 500 }}
              >
                {w.label}
                <ArrowUpRight className="h-[0.95vw] w-[0.95vw] no-underline transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 max-[767px]:!h-[3.4vw] max-[767px]:!w-[3.4vw]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
