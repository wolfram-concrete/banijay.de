"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// EDITORIAL PINNED-SCROLL (Wolfram 14.07.): das Marcus-Bild steht FULL SIZE, dann
// PINNT die Bühne (echter Scroll-Stop). Beim Weiterscrollen zieht sich das Bild
// nach links zusammen und die Fakten-Spalte fährt von RECHTS herein (Zahlen zählen
// von 0 hoch). Die Fakten sind eine ACCORDION-Liste: jede Kennzahl lässt sich
// aufklappen und zeigt ihren Copytext. Alle Zahlen/Fakten von banijay.de übertragen.
// Mobile / reduced motion: kein Pin — Bild oben, Accordion darunter.

const SHARP = "var(--font-sharp), sans-serif";
const ASIDE_W = 540; // etwas breiter (Wolfram 14.07.)

// ZIFFERNGRÖSSE FOLGT DER SPALTENHÖHE, NICHT DER BREITE (Wolfram 17.07.).
// Die Spalte muss bündig mit dem Foto abschließen UND die Kacheln sollen nicht mehr
// Platz haben als nötig. Beides zugleich geht nur, wenn der INHALT die Spalte füllt —
// sonst bleibt Rest, der als Polster sichtbar wird. Eine vw-Größe kann das nicht: die
// Spaltenhöhe hängt an vh, also entkoppeln sich beide (1920×900 wäre halb so hoch wie
// 1920×1080, die Ziffer aber gleich groß).
// Herleitung — Spalte H = clamp(680px, 82vh, 1000px), 7 Kacheln, je Ziffer + 28.8px
// Polster, dazu einmalig die aufgeklappte Copy (+ 8.8px Abstand zum Kopf):
//   H = 7 · (D + 28.8) + Copy + 8.8   →   D = H/7 − 28.8 − (Copy + 8.8)/7
// H/7 als clamp geschrieben: 680/7 = 97.14px, 82vh/7 = 11.714vh, 1000/7 = 142.86px.
// Die Konstante bündelt Polster + Copy-Anteil. Massgeblich ist die LÄNGSTE Copy (die
// „1.400+"-Karte, 527 Zeichen) — sie bestimmt den Worst Case, egal welche Karte offen ist.
// NACHGEMESSEN statt geschätzt (Wolfram 17.07., Heikes Texte): längste Copy 172px bei
// 1280×700/1440×900, 229px bei 1920×1080 (dort ist die Copy-Schrift größer). Nötige
// Konstante daraus: 54.6 / 54.6 / 62.8 → wir nehmen 64, knapp über dem Maximum, damit
// der Block NIE unter die Fotokante schießt. Den Rest verteilt flex-grow als Polster —
// die Formel muss also nur ungefähr stimmen, das Layout korrigiert sich selbst.
// (Vorher stand hier 44 für die alten ~66px-Kurztexte. Mit Heikes Copy hing die letzte
// Kachel 94–131px unter dem Foto.)
// min(87px, 5.4vw, …): 87px war die ursprüngliche Maximalgröße; 5.4vw deckelt schmale,
// hohe Fenster. max(2.1rem, …) ist der Boden für Mobile, wo 5.4vw winzig würde.
const DIGIT = "max(2.1rem, min(87px, 5.4vw, calc(clamp(97.14px, 11.714vh, 142.86px) - 64px)))";
// Einheit relativ zur Ziffer (0.54em ≈ das bisherige Verhältnis 30/56) — so skaliert
// sie automatisch mit und die Grundlinie bleibt stabil.
const UNIT = "0.54em";

// Alle Zahlen/Daten/Fakten von banijay.de. Farbe kommt NICHT mehr je Fakt, sondern
// abwechselnd Magenta/Schwarz (Wolfram 14.07.) → siehe TONE unten.
// label ist ein FESTES ZWEIZEILEN-PAAR (Wolfram 17.07.: „die Titel immer als
// Zweizeiler"). Der Umbruch steht bewusst in den Daten statt im Textfluss: so ist
// die Trennstelle bestimmt und wandert nicht mit Viewport/Schriftbreite.
type Fact = { value: number; suffix: string; label: readonly [string, string]; copy: string };
// COPY VON HEIKE (Wolfram 17.07.) — wörtlich übernommen, nur die Anführungszeichen auf
// die deutsche Form „…" vereinheitlicht (in der Vorlage gemischt: "TV total",
// “Schlag den Star“). Wo noch kein Text vorliegt, steht „Text folgt." als Platzhalter.
// Die LABEL bleiben Wolframs freigegebene Zweizeiler — Heikes Überschriften („Companies
// & Label", „4500+ hrs") sind Fakt-Bezeichner in ihrer Liste, keine Kachel-Titel.
//
// ▸ REGEL FÜR KÜNFTIGE TEXTLIEFERUNGEN (Wolfram 17.07.):
//   DIE ZIFFER IST MASSGEBLICH. Die Copytexte sind ein älterer Stand — wenn darin
//   dieselbe Zahl vorkommt wie in `value`, wird DER TEXT angeglichen, nicht die Ziffer.
//   Bereits so angewandt: „rund 3000 Stunden" → „rund 4500". Beim nächsten Mal alle
//   Copytexte gegen die Ziffern prüfen (Zahlen im Text vs. `value` je Karte).
//   Zahlen im Text, die KEINE Kachel-Ziffer sind (z. B. „451 Prime-Time
//   Erstausstrahlungen"), bleiben unberührt.
const FACTS: Fact[] = [
  {
    value: 40,
    suffix: "+",
    label: ["Companies und", "Labels"],
    copy: "In Deutschland vereint die Banijay-Gruppe über 40+ Companies und Label. Unter ihnen befinden sich viele der bekanntesten deutschen Produktionshäuser, darunter EndemolShine, Banijay Productions, MadeFor und Brainpool samt Tochterfirmen wie Cape Cross und Brainpool Live. Die Künstlermanagements SR, MTS und OGP sowie die Influencer- und Brandexperten influence.vision und die Vermarktungsagentur Banijay Media ergänzen das Portfolio.",
  },
  {
    value: 90,
    suffix: " %",
    label: ["Primetime-", "Hitrate"],
    copy: "Text folgt.",
  },
  {
    // 1.300+ → 1.400+ (Heike 17.07.): Ihre Überschrift UND ihr Fließtext nennen beide
    // 1400 — die alte 1.300 hätte der eigenen Copy widersprochen. site.ts mitgezogen.
    value: 1400,
    suffix: "+",
    label: ["Mitarbeiterinnen und", "Mitarbeiter"],
    copy: "Die rund 1400 Mitarbeiterinnen und Mitarbeiter der Banijay Germany produzieren jährlich über 451 Prime-Time Erstausstrahlungen. Banijay Germany erreicht täglich digital und im linearen TV ein Millionenpublikum und mehr Zuschauerinnen und Zuschauer als jedes andere deutsche Unterhaltungsunternehmen. Zu den bekanntesten deutschen Marken gehören Sendungen wie „The Masked Singer“, „TV total“, „Schlag den Star“, „Die Höhle der Löwen“, „Promi Big Brother“ oder „Tatort Dresden“ sowie zahllose namhafte Künstlerinnen und Künstler.",
  },
  {
    value: 4,
    suffix: " Mrd.",
    label: ["Views & Zuschauer", "jährlich"],
    copy: "Banijay Germany ist die größte, unabhängige deutsche Produktionsfirma, deren Unterhaltungsprogramme im Fernsehen, im Internet und auf der Bühne jedes Jahr vier Milliarden Zuschauerinnen und Zuschauer erreichen. Als Teil der internationalen Banijay Group, dem weltweit führenden Content-Haus, ist Banijay Germany hervorragend aufgestellt, um den Wandel der Unterhaltungsindustrie durch Digitalisierung und neue Streaming-Anbieter erfolgreich zu gestalten.",
  },
  {
    // 3.000 → 4.500 (Wolfram 17.07.). Heikes Überschrift sagte „4500+ hrs", ihr Fließtext
    // „rund 3000 Stunden" — Wolframs Regel: DIE ZIFFER IST MASSGEBLICH, die Copy ist der
    // ältere Stand und wird angeglichen. Daher hier BEIDES auf 4.500.
    value: 4500,
    suffix: " hrs.",
    label: ["Stunden", "Entertainment"],
    copy: "Banijay Germany profitiert von der unternehmerischen Diversität und Qualität innerhalb des Verbundes und vereint eine große Breite von Entertainment-Expertise unter einem Dach. Künstler und Kreative entwickeln und produzieren jedes Jahr gemeinsam rund 4500 Stunden Programm, darunter Bühnenshows, Live-Sendungen und Serien. Auch Online-Plattformen und Podcasts gehören zum Banijay-Kosmos.",
  },
  // Neu (Wolfram 17.07.) — steht bei „Stunden Entertainment", weil beide die
  // Ausbringung im Jahr beschreiben. In Heikes Textlieferung nicht enthalten.
  {
    value: 1500,
    suffix: "+",
    label: ["Live-Veranstaltungen", "jährlich"],
    copy: "Text folgt.",
  },
  {
    // 130+ → 170+ korrigiert (Wolfram 17.07.). Dieselbe Zahl steht in site.ts (STATS)
    // für die About-Fakten — dort mitgezogen, sonst widersprächen sich die Seiten.
    value: 170,
    suffix: "+",
    label: ["Companies", "weltweit"],
    copy: "Text folgt.",
  },
];

// Abwechselnd Magenta / Schwarz — Typo IMMER WEISS (Wolfram 15.07.: keine schwarze
// Typo auf Magenta mehr).
// Wolfram 16.07.: die SCHWARZEN Kacheln funktionierten nicht — stattdessen die
// TRANSPARENTEN Zahlencontainer aus der About-Facts-Section (ProofVideo.tsx:
// rgba(255,255,255,0.06) auf dem Moody-Hintergrund). Magenta bleibt als Akzent.
const TONE = (i: number) =>
  i % 2 === 0
    ? { bg: "#ff4370", fg: "#f8f7f3", label: "rgba(248,247,243,0.82)", copy: "rgba(248,247,243,0.86)" }
    : { bg: "rgba(255,255,255,0.06)", fg: "#f8f7f3", label: "rgba(248,247,243,0.6)", copy: "rgba(248,247,243,0.74)" };

const fmt = (n: number) => Math.round(n).toLocaleString("de-DE");

export function EditorialStickyScene() {
  const section = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);
  const aside = useRef<HTMLDivElement>(null);
  // Accordion: erste Kennzahl offen; Klick toggelt (Single-Open).
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrapEl = imgWrap.current!;
      const asideEl = aside.current!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-fact-card]");
      const nums = gsap.utils.toArray<HTMLElement>("[data-fact-num]");

      if (!desktop || reduce) {
        // NUR die GSAP-gesetzten Layout-/Sichtbarkeits-Props zurücksetzen — NICHT "all",
        // das wischte den von React gesetzten Karten-`background` (Magenta/transparent) weg
        // und die Farbkodierung fehlte auf Mobile komplett (Wolfram 19.07.: „Farbkodierung
        // wie Desktop berücksichtigen").
        gsap.set([wrapEl, asideEl, cards], { clearProps: "opacity,visibility,transform,width,x,xPercent,y" });
        nums.forEach((el, i) => (el.textContent = fmt(FACTS[i].value)));
        // MOBILE (Wolfram 19.07.): das sticky Bild „zoomt zusammen" — seine Höhe schrumpft
        // gescrubbt beim Scrollen (104vw → 62vw), sobald es unter der Nav klebt. Dadurch
        // rücken die Akkordeons darunter ins Bild. Kein Pin (auf Mobile heikel), nur Sticky+Scrub.
        if (!reduce && !desktop && section.current) {
          gsap.fromTo(
            wrapEl,
            { height: "104vw" },
            {
              height: "62vw",
              ease: "none",
              scrollTrigger: {
                trigger: section.current,
                start: "top 72px",
                end: "+=32%",
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            },
          );
        }
        return;
      }

      // Startlage: Bild FULL SIZE, Fakten-Spalte komplett rechts draußen.
      gsap.set(wrapEl, { width: "100%" });
      gsap.set(asideEl, { xPercent: 100, autoAlpha: 0 });
      gsap.set(cards, { autoAlpha: 0, y: 24 });
      nums.forEach((el) => (el.textContent = "0"));
      const numProxy = FACTS.map(() => ({ v: 0 }));

      // PIN: Bühne bleibt stehen, der Scroll treibt die Fakten-Choreografie.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage.current,
          start: "top top",
          end: "+=135%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // ① kurzer Halt — Bild full-size (der „Scroll-Stop"-Moment)
      tl.to({}, { duration: 0.16 }, 0);
      // ② Bild zieht nach links zusammen + Fakten-Spalte fährt von RECHTS herein
      tl.to(wrapEl, { width: `calc(100% - ${ASIDE_W}px)`, ease: "power2.inOut", duration: 0.4 }, 0.16);
      tl.to(asideEl, { xPercent: 0, autoAlpha: 1, ease: "power2.inOut", duration: 0.4 }, 0.16);
      // ③ Cards sichtbar + Zahlen zählen hoch (gestaffelt)
      cards.forEach((card, i) => {
        tl.to(card, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.14 }, 0.32 + i * 0.05);
        tl.to(
          numProxy[i],
          { v: FACTS[i].value, duration: 0.2, onUpdate: () => (nums[i].textContent = fmt(numProxy[i].v)) },
          0.32 + i * 0.05,
        );
      });
      // ④ Halt mit stehenden Fakten, BEVOR der Pin löst
      tl.to({}, { duration: 0.2 }, 0.85);
    },
    { scope: section },
  );

  return (
    <div ref={section} className="relative max-md:!h-auto">
      {/* Gepinnte Bühne (Desktop) — auf Mobile normaler Fluss */}
      <div
        ref={stage}
        className="flex h-screen items-center overflow-clip max-md:!static max-md:!h-auto max-md:!py-[6vw]"
      >
        <div className="mx-auto w-full" style={{ maxWidth: "1920px", paddingLeft: "16px", paddingRight: "16px" }}>
          <div className="relative w-full overflow-visible max-md:!h-auto" style={{ height: "clamp(680px, 82vh, 1000px)" }}>
            {/* Bild-Wrapper. Desktop: absolut (schrumpft nach links). Mobile (Wolfram 19.07.):
                STICKY unter der Nav (top 72px = knapp unterm B-Logo), höher (104vw, damit die
                Quote unten drauf passt); beim Scrollen „zoomt" es zusammen (Höhe schrumpft
                gescrubbt, siehe useGSAP) und gibt die Akkordeons darunter frei. */}
            <div
              ref={imgWrap}
              // Höhe OHNE !important (h-[104vw] mobil, md:h-full Desktop), damit der
              // Mobile-Zoom-Scrub sie per Inline-Style animieren kann (!important ließe sich
              // von GSAP nicht überschreiben). Position/Top/z bleiben mobil per !override.
              className="absolute left-0 top-0 h-[104vw] w-full overflow-hidden md:h-full max-md:!sticky max-md:!top-[72px] max-md:!z-[3] max-md:!w-full"
            >
              <img
                src="/editorial/marcus-wolter.jpg"
                alt="Marcus Wolter, Founder & CEO Banijay Germany"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 32%" }}
              />
              {/* Scrim unten für die Quote-Lesbarkeit */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(10,2,8,0) 42%, rgba(10,2,8,0.5) 78%, rgba(10,2,8,0.82) 100%)" }}
              />
              {/* Marcus-Quote unten links auf dem Bild (weiß) — Wolfram 15.07. */}
              <blockquote
                // Mobile (Wolfram 19.07.): breitere Laufweite (90 % statt 64 %) → der
                // Quote-Text bricht auf weniger Zeilen um und ragt nicht mehr so hoch ins Bild.
                className="absolute bottom-0 left-0 m-0 max-[767px]:!p-[5vw] max-[767px]:!max-w-[90%]"
                style={{ padding: "clamp(1.5rem, 2.4vw, 2.8rem)", maxWidth: "min(46rem, 64%)", color: "#f8f7f3" }}
              >
                <p className="m-0 max-[767px]:!text-[4vw]" style={{ fontFamily: SHARP, fontSize: "clamp(1.05rem, 1.5vw, 1.6rem)", lineHeight: "132%", fontWeight: 500 }}>
                  „Wir bei Banijay sind ein Verbund der besten unabhängigen Entertainment-Produzenten und Unternehmer. Wir bieten Unterhaltung, über die ganz Deutschland spricht.&ldquo;
                </p>
                <span className="mt-3 block max-[767px]:!text-[3.2vw]" style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)", fontWeight: 500, color: "rgba(248,247,243,0.74)" }}>
                  Marcus Wolter, Founder &amp; CEO Banijay Germany
                </span>
              </blockquote>
            </div>

            {/* Fakten-Accordion rechts — EINE geschlossene Fläche: keine Trenner/Gaps,
                Kacheln stoßen aneinander, abwechselnd Magenta/Schwarz.
                Die Spalte schließt UNTEN BÜNDIG MIT DEM FOTO ab (Wolfram 17.07.) — daher
                h-full und Kacheln mit flex-grow. Wie der Restplatz verteilt wird, ohne
                dass er als Loch unter der Zahl landet: siehe Kachel-Kommentar. */}
            {/* Fakten-Akkordeon. Desktop: rechte Spalte. Mobile (Wolfram 19.07.): unter dem
                sticky Bild ein SCROLLBARES Panel fester Höhe (~52vh, overflow-y) → die
                Rubriken lassen sich durchscrollen, die Section wird nicht endlos lang.
                Farbkodierung (abwechselnd Magenta/transparent, TONE) bleibt wie Desktop. */}
            <div
              ref={aside}
              className="absolute right-0 top-0 z-[2] flex h-full flex-col max-md:!static max-md:!mt-0 max-md:!h-[52vh] max-md:!w-full max-md:!overflow-y-auto max-md:!overscroll-contain"
              style={{ width: `${ASIDE_W}px` }}
            >
              {FACTS.map((f, i) => {
                const isOpen = open === i;
                const tone = TONE(i);
                // „+" sitzt in Sharp Grotesk hoch im Glyphenkasten → auf die Grundlinie
                // der Zahl versetzen + wie die Einheiten (Mrd./hrs.) abrücken (Wolfram 15.07.).
                // „+" und „%" sind SYMBOLE und gehören eng an die Ziffer (Wolfram 16.07.:
                // „mehr nach einer Einheit aussehen") → knapper Abstand statt des vollen
                // Leerzeichens. Wort-Einheiten (Mrd., hrs.) behalten ihr Leerzeichen,
                // die brauchen die Luft.
                const sym = f.suffix.trim();
                const isPlus = sym === "+";
                const isSymbol = isPlus || sym === "%";
                return (
                  <button
                    key={f.label.join(" ")}
                    type="button"
                    data-fact-card
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    // KEIN overflow-hidden auf der Kachel (Wolfram 17.07.): das machte sie zum
                    // Scroll-Container, wodurch die Flex-Schutzregel min-height:auto (= nie
                    // kleiner als der Inhalt) auf 0 fiel — zusammen mit flexBasis:0% war das
                    // die Schere, die den Text kappte. Ohne beides kann eine Kachel den Inhalt
                    // strukturell nicht mehr abschneiden. Die Copy hat ihren eigenen
                    // overflow-hidden-Wrapper für die Aufklapp-Animation.
                    // justify-center: der Restplatz aus flex-grow verteilt sich über UND unter
                    // den Inhalt, wirkt also als Polster statt als Loch unter der Zahl.
                    // Mobile (Wolfram 19.07.): Karten kompakt — kein flex-grow (füllte im
                    // Scroll-Panel die Höhe auf) und kein min-height → geschlossen nur so hoch
                    // wie Ziffer + Label. Desktop behält flex-grow (bündig mit dem Foto).
                    className="flex flex-col justify-center text-left max-md:!min-h-0 max-md:!flex-none"
                    style={{
                      // flexBasis:auto = Inhaltshöhe als Sockel, flexGrow:1 = Restplatz der
                      // Spalte gleichmäßig obendrauf → Block endet exakt an der Fotokante.
                      flexGrow: 1,
                      flexShrink: 0,
                      flexBasis: "auto",
                      background: tone.bg,
                      color: tone.fg,
                      padding: "0.9rem 1.5rem",
                      cursor: "pointer",
                    }}
                  >
                    {/* KOPFZEILE: Zahl · Label · Chevron NEBENEINANDER (Wolfram 17.07.).
                        Vorher stand das Label UNTER der Zahl — dabei wurde es auf jeder Karte
                        unten abgeschnitten (1440×900, 6 Karten: Karte 111 px, Inhalt 139 px →
                        28 px Überlauf auf JEDER Karte). Nebeneinander zählt nur noch
                        max(Ziffer, Label) statt ihrer Summe.

                        GRUNDLINIE (Wolfram 17.07.): `last baseline` statt `center` — die
                        Grundlinie der LETZTEN Label-Zeile fluchtet mit der Grundlinie von
                        Ziffer und Einheit. Mit `baseline` (= first) läge stattdessen die ERSTE
                        Zeile auf der Ziffer und die zweite hinge darunter heraus. Der Chevron
                        hat keine Textgrundlinie und würde am Kastenrand ausgerichtet — er
                        bleibt deshalb per self-center mittig. */}
                    <div className="flex w-full justify-between gap-4" style={{ alignItems: "last baseline" }}>
                      {/* WICHTIG: eigene font-size am Wrapper (= Zifferngröße) → der kleine
                          Suffix richtet sich an EINER konsistenten Grundlinie aus (ohne die
                          font-size wanderte die Baseline je Viewport, das + saß mal zu hoch,
                          mal zu tief). Dann sitzen +, %, Mrd., hrs. alle gleich (Wolfram 15.07.). */}
                      <span className="shrink-0" style={{ fontFamily: SHARP, fontSize: DIGIT, lineHeight: 1, letterSpacing: "-0.04em", fontWeight: 500, whiteSpace: "nowrap" }}>
                        <span data-fact-num style={{ fontSize: "1em" }}>
                          0
                        </span>
                        {isSymbol ? (
                          // Symbol-Einheit: eng an die Ziffer (marginLeft statt Leerzeichen).
                          // Das „+" sitzt in Sharp Grotesk minimal höher als %/Buchstaben →
                          // per position:relative um den Glyph-Offset (0.14em) absenken, damit
                          // seine Unterkante wie beim % auf der Ziffern-Grundlinie steht.
                          <span
                            style={{
                              fontSize: UNIT,
                              // noch enger an die Ziffer (Wolfram 16.07.): 0.1em → 0.04em
                              marginLeft: "0.04em",
                              ...(isPlus ? { position: "relative" as const, top: "0.14em" } : null),
                            }}
                          >
                            {sym}
                          </span>
                        ) : (
                          <span style={{ fontSize: UNIT, whiteSpace: "pre" }}>{f.suffix}</span>
                        )}
                      </span>
                      {/* Label rechts neben der Einheit — IMMER zwei Zeilen, Umbruch fest aus
                          den Daten (kein Umbruch nach Breite). whiteSpace:nowrap je Zeile, damit
                          keine dritte Zeile entstehen kann. */}
                      <span
                        className="min-w-0 flex-1"
                        style={{ fontSize: "clamp(0.85rem, 0.95vw, 1.05rem)", lineHeight: "124%", color: tone.label, fontWeight: 500 }}
                      >
                        <span className="block" style={{ whiteSpace: "nowrap" }}>
                          {f.label[0]}
                        </span>
                        <span className="block" style={{ whiteSpace: "nowrap" }}>
                          {f.label[1]}
                        </span>
                      </span>
                      <ChevronDown
                        className="h-5 w-5 shrink-0 self-center transition-transform duration-300"
                        style={{ opacity: 0.55, transform: isOpen ? "rotate(180deg)" : "none" }}
                      />
                    </div>
                    {/* Aufklappende Copy. Die Kachelhöhe wird allein von dieser
                        0fr→1fr-Animation getrieben (vorher zusätzlich von flex-grow).
                        Abstand zur Kopfzeile 0.8 → 0.55rem (Wolfram 17.07.). */}
                    <div>
                      <div
                        className="grid transition-[grid-template-rows] duration-500 ease-out"
                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          {/* maxWidth 40ch ENTFERNT (Wolfram 17.07.): Die Copy nutzte damit
                              nur 262 von 492 px Kartenbreite. Bei den alten Kurztexten egal,
                              bei Heikes ~500-Zeichen-Texten verdoppelte es die Texthöhe grundlos
                              — und Höhe ist in dieser Spalte die knappe Ressource (sie treibt
                              über DIGIT die Zifferngröße). Volle Kartenbreite bleibt mit ~70
                              Zeichen je Zeile im lesbaren Rahmen (Faustregel 45–75). */}
                          <p style={{ margin: "0.55rem 0 0", fontSize: "clamp(0.82rem, 0.9vw, 0.98rem)", lineHeight: "146%", color: tone.copy }}>
                            {f.copy}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
