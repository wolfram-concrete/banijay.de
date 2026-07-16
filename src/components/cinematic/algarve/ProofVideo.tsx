"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CountUp } from "@/components/cinematic/CountUp";
import type { Stat } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// About – Zahlen MIT integriertem Video. Die Fakten-Section ist gepinnt („aufs
// Stop"). Beim Weiterscrollen wächst das Video per animiertem clip-path (inset) aus
// EINER Zahlen-Kachel heraus, bis es full-screen über der Section steht. Der
// clip-path sorgt dafür, dass das Video dabei nie verzerrt.
//
// NEUAUFBAU (Wolfram 16.07.) — Leitidee: ALLES GEHT VON DER MITTE AUS.
// Vorher: Copytext links, Zahlen-Bento rechts danebengehängt (linksbündig,
// asymmetrisch); die erste Kachel war magenta, doppelt breit und trug eine GRÖSSERE
// Ziffer (4.4vw statt 3.2vw) — „1.300+" dominierte dadurch alles. Das Video wuchs aus
// einer Eck-Kachel.
// Jetzt: Der Copytext ist ins Hero-Statement gewandert, die Section ist mittelachsig.
// Daraus folgt die Choreografie:
//   1) Die Zahlen stehen als EINE zentrierte Reihe gleich großer Kacheln.
//   2) Sie bauen sich VON DER MITTE NACH AUSSEN auf (Stagger from:"center"),
//      die Ziffern zählen dabei hoch.
//   3) Das Video blüht aus der MITTLEREN Kachel symmetrisch auf — nicht mehr aus
//      einer Ecke. Die Enthüllung folgt damit derselben Achse wie der Aufbau.
// Die mittlere Kachel ist „4 Mrd. Views & Zuschauer" — inhaltlich der passende
// Ursprung für ein Content-Video: aus der Reichweite wächst das Bildmaterial.
// ALLE Ziffern sind jetzt gleich groß (Wolfram 16.07.); die Mitte wird über die
// Magenta-Fläche betont, nicht über die Schriftgröße.
//
// Mobile: gleiche Idee, aber gestapelt — 2-spaltiges Grid, die Quell-Kachel läuft
// über beide Spalten und bleibt der Ursprung des Videos.

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";
const ACCENT = "#ff4370";

export function AlgarveProofVideo({
  stats,
  video = "/video/b-glass.mp4",
  poster,
}: {
  stats: Stat[];
  video?: string;
  poster?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Desktop UND Mobile: das Video wächst aus einer grauen Stat-Kachel („130+
      // Companies weltweit") auf Full-Screen (Geometrie wird dynamisch aus der Kachel
      // gelesen → passt sich dem mobilen Stat-Grid an), dann hovert die Schrift rein.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const stageEl = stage.current;
      // Quelle = eine der kleinen GRAUEN Stat-Kacheln (data-pv-source). Aus ihr
      // heraus wächst das Video — kein separater, vorab sichtbarer Video-Container.
      const tileEl = stageEl?.querySelector<HTMLElement>("[data-pv-source]") ?? null;
      const overlayEl = overlay.current;
      const tiles = gsap.utils.toArray<HTMLElement>("[data-pv-tile]");
      if (!stageEl || !tileEl || !overlayEl) return;

      // Start-Clip = exakt der Platz der Quell-Kachel relativ zur Bühne. So wirkt es,
      // als würde sich diese Kachel „aufziehen" und das Video daraus heraus einlayern.
      //
      // Gemessen wird über offsetTop/offsetLeft (LAYOUT), NICHT über
      // getBoundingClientRect: Der Aufbau-Stagger setzt die Kacheln auf y:46, und ein
      // Rect liefert die TRANSFORMIERTE Box — der Reveal-Versatz wanderte damit in den
      // Clip-Start (am Live-Modul vermessen: top 586 statt 540, bottom 431 statt 478 —
      // exakt die 46 px), das Video wuchs also 46 px neben seiner Kachel los. offset*
      // ist Layout und von Transforms unberührt. Die Bühne ist position:sticky und
      // damit der offsetParent der Kacheln — die Werte sind direkt relativ zu ihr.
      const measure = () => ({
        top: Math.max(0, tileEl.offsetTop),
        left: Math.max(0, tileEl.offsetLeft),
        right: Math.max(0, stageEl.offsetWidth - tileEl.offsetLeft - tileEl.offsetWidth),
        bottom: Math.max(0, stageEl.offsetHeight - tileEl.offsetTop - tileEl.offsetHeight),
      });
      const clip = (t: number, r: number, b: number, l: number, rd: number) =>
        `inset(${t}px ${r}px ${b}px ${l}px round ${rd}px)`;
      let v = measure();

      // Startlage: Video liegt exakt auf der Quell-Kachel und ist NOCH unsichtbar
      // (die graue Kachel ist voll zu sehen). Erst nach Scroll-In layert es ein.
      gsap.set(overlayEl, { clipPath: clip(v.top, v.right, v.bottom, v.left, 0), autoAlpha: 0 });

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(overlayEl, { clipPath: "inset(0px 0px 0px 0px round 0px)", autoAlpha: 1 });
        return;
      }

      // AUFBAU VON DER MITTE NACH AUSSEN: Die Kacheln erscheinen gestaffelt, beginnend
      // in der Bildmitte — dieselbe Achse, auf der gleich das Video aufblüht. Läuft
      // NICHT scroll-gescrubbt, sondern einmalig beim Eintritt (once), damit der Aufbau
      // eine eigene Bewegung hat und nicht am Scrollrad klebt. Die CountUp-Zähler in den
      // Kacheln triggern unabhängig davon über ihren eigenen ScrollTrigger.
      gsap.set(tiles, { autoAlpha: 0, y: 46 });
      ScrollTrigger.create({
        trigger: stageEl,
        start: "top 70%",
        once: true,
        onEnter: () =>
          gsap.to(tiles, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: { each: 0.09, from: "center" },
          }),
      });

      // Bei jedem Refresh (Resize/Layout) neu vermessen.
      const onRefresh = () => {
        v = measure();
        gsap.set(overlayEl, { clipPath: clip(v.top, v.right, v.bottom, v.left, 0) });
      };
      ScrollTrigger.addEventListener("refreshInit", onRefresh);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: "[data-pv-stage]",
          invalidateOnRefresh: true,
        },
      });

      // A) Das Video layert in der Quell-Kachel ein (fade-in an Ort/Stelle).
      tl.to(overlayEl, { autoAlpha: 1, ease: "power1.out", duration: 0.12 }, 0);
      // B) Aus der Kachel nach OBEN + UNTEN aufziehen → volle Höhe.
      tl.to(overlayEl, { clipPath: clip(0, v.right, 0, v.left, 0), ease: "power2.inOut", duration: 0.34 }, 0.12);
      // C) Nach LINKS + RECHTS aufziehen → volle Breite. Da die Quell-Kachel jetzt
      //    MITTIG sitzt, laufen beide Kanten gleich weit → das Video blüht symmetrisch
      //    aus der Bildmitte auf (vorher: aus einer Eck-Kachel schräg ins Bild).
      tl.to(overlayEl, { clipPath: clip(0, 0, 0, 0, 0), ease: "power2.inOut", duration: 0.34 }, 0.48);
      // D) Endbeat: das Video steht full-size still, bevor die Section abgibt.
      //    (Das Marcus-Wolter-Zitat, das hier Wort für Wort einlief, ist entfallen —
      //    Wolfram 16.07.)
      tl.to({}, { duration: 0.2 }, 0.82);

      return () => ScrollTrigger.removeEventListener("refreshInit", onRefresh);
    },
    { scope: root },
  );

  const nonAbout = stats.filter((s) => !s.aboutOnly);
  // Die MITTLERE Kachel ist der Ursprung des Videos (siehe Kopfkommentar). Aus dem
  // Array-Index gerechnet, nicht hart verdrahtet — kommt eine Kennzahl dazu, wandert
  // der Ursprung automatisch mit in die neue Mitte.
  const centerIndex = Math.floor(nonAbout.length / 2);

  // Zentrierte Kennzahlen-Reihe. Desktop: EINE Reihe gleich breiter Kacheln.
  // Mobile: 2-spaltig, die Quell-Kachel über beide Spalten.
  const bento = (
    <div className="grid grid-cols-2 justify-center gap-[0.8vw] md:flex md:items-stretch max-[767px]:!gap-[3vw]">
      {nonAbout.map((s, i) => {
        const isCenter = i === centerIndex;
        // Die Mitte wird über die FLÄCHE betont (Magenta), nicht mehr über eine größere
        // Ziffer — alle Ziffern sind gleich groß (Wolfram 16.07.).
        const bg = isCenter ? ACCENT : "rgba(255,255,255,0.06)";
        return (
          <div
            key={s.label}
            data-pv-tile
            data-pv-source={isCenter ? true : undefined}
            className={`flex flex-col justify-between max-[767px]:!min-h-[34vw] max-[767px]:!p-[5vw] md:flex-1 md:basis-0 ${
              isCenter ? "col-span-2" : ""
            }`}
            style={{ background: bg, color: PAPER, padding: "1.4vw", minHeight: "13vw", willChange: "transform, opacity" }}
          >
            {/* EINHEITLICHE Zifferngröße für alle Kacheln. clamp statt festem vw:
                „3.000 hrs." ist die längste Zahl und muss in derselben Kachelbreite
                stehen wie „40+" — ohne Deckel würde sie auf breiten Screens umbrechen. */}
            <span
              className="max-[767px]:!text-[10.5vw]"
              style={{
                fontFamily: SHARP,
                fontSize: "clamp(28px, 2.5vw, 52px)",
                lineHeight: "100%",
                fontWeight: 500,
                letterSpacing: "-0.09vw",
                whiteSpace: "nowrap",
              }}
            >
              <CountUp value={s.value} suffixStyle={{ fontSize: "0.56em" }} />
            </span>
            <div className="mt-[1vw] max-[767px]:!mt-[2vw]">
              <p
                className="max-[767px]:!text-[3.4vw]"
                style={{ fontFamily: SHARP, fontSize: "0.82vw", fontWeight: 700, letterSpacing: "0.05vw", textTransform: "uppercase", margin: 0 }}
              >
                {s.label}
              </p>
              {/* Copytext je Kennzahl (Wolfram 14.07.) */}
              {s.note && (
                <p
                  className="mt-[0.5vw] max-[767px]:!mt-[1.5vw] max-[767px]:!text-[3vw]"
                  style={{ fontFamily: SHARP, fontSize: "0.72vw", fontWeight: 400, lineHeight: "128%", margin: 0, opacity: isCenter ? 0.78 : 0.62 }}
                >
                  {s.note}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* ── Gepinnte Bühne mit clip-path-Aufskalierung (Desktop + Mobile) ── */}
      <section ref={root} className="relative" style={{ height: "300vh", background: "transparent" }}>
        <div ref={stage} data-pv-stage className="sticky top-0 h-screen w-screen overflow-clip">
          {/* MITTELACHSIG (Wolfram 16.07.): Der Copytext, der hier links stand, ist ins
              Hero-Statement gewandert — die Zahlen stehen jetzt allein und zentriert
              auf der Bühne. Der Container ist gedeckelt, damit die Reihe auf sehr
              breiten Screens nicht auseinanderläuft. */}
          <div
            className="flex h-full w-full items-center justify-center max-[767px]:!px-[4vw] max-[767px]:!pt-[16vw]"
            style={{ paddingLeft: "2vw", paddingRight: "2vw", paddingTop: "9vh", paddingBottom: "4vh" }}
          >
            <div className="mx-auto w-full" style={{ maxWidth: "1560px" }}>
              {bento}
            </div>
            {/* KEIN vorab sichtbarer Video-Container — das Video wächst beim Scrollen
                aus der mittleren Quell-Kachel (data-pv-source) heraus. */}
          </div>

          {/* Wachsender Video-Container (clip-path von Quell-Kachel → full). Start
              unsichtbar (opacity 0) → kein Flash vor dem Scroll-In-Fade. */}
          <div ref={overlay} className="absolute inset-0 overflow-clip" style={{ willChange: "clip-path, opacity", opacity: 0 }}>
            {/* Video startet erst ab Sek 19 (Wolfram 15.07.) — initial + bei jedem
                Loop zurück auf 19s springen. */}
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={poster}
              className="absolute inset-0 h-full w-full object-cover"
              onLoadedMetadata={(e) => {
                if (e.currentTarget.currentTime < 19) e.currentTarget.currentTime = 19;
              }}
              onTimeUpdate={(e) => {
                // Start ab Sek 19; ~3s vor Ende zurückloopen → Banijay-Logo-Abbinder
                // wird nicht mehr gezeigt (Wolfram 15.07.).
                const v = e.currentTarget;
                if (v.duration && v.currentTime > v.duration - 3) v.currentTime = 19;
                else if (v.currentTime < 19) v.currentTime = 19;
              }}
            >
              <source src={video} type="video/mp4" />
            </video>
            {/* Kein Text über dem Video (Wolfram 16.07.): Das Marcus-Wolter-Zitat, das
                hier full-size Wort für Wort einlief, ist entfernt — das Video trägt
                allein. */}
          </div>
        </div>
      </section>
    </>
  );
}
