"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { COMPANIES_DIRECTORY } from "@/data/companiesDirectory";
import { ECO_CATEGORIES } from "@/data/ecosystem";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// „Unsere Companies" (Home) — Stand 13.07. (Task #61, Wolfram-Diktat):
//  • Datenbasis: companiesDirectory.ts — ALLE Logo-Companies aus
//    assets/Logo/Logos companies + Platzhalter aus der Coopetition-Grafik,
//    OHNE Brainpool (Kundenwunsch). Rubrik-Filter über ecoKeys.
//  • BENTO-GRID (Wolfram 13.07.: wieder Bento statt 2-Spalten-Liste) —
//    4 Spalten dense mit wiederkehrendem Feature-Rhythmus (spanFor), echtes
//    Weiß-Logo o. r., Name + Keywords unten links, exemplarisches
//    Bewegtbild (Trailer-Loops).
//  • Klick → LIGHTBOX als SCROLL-FLIP-STACK (Optik + Mechanik der früheren
//    Kompetenzfelder-Flip-Cards): eigener Scroll-Kontext im Overlay, die
//    aktuelle Karte kippt beim Scrollen um ihre Oberkante nach hinten weg
//    (rotationX/scale/fade, gescrubbt), die nächste Company-Karte schiebt
//    sich darüber. Video läuft FULL-SIZE im Karten-Background (Farb-Tint
//    aus der Video-Palette + Scrim für Lesbarkeit). X/Esc schließt
//    jederzeit, Pfeiltasten blättern (Smooth-Scroll zur nächsten Karte).

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";

// BENTO-RHYTHMUS (Wolfram 14.07.): 4-spaltig mit variierenden Kacheln — BREITE
// (col-span-2) UND HOCHFORMATIGE, über zwei Zeilen gehende (row-span-2) Cards,
// dense füllt Lücken. Wiederholt sich alle 12 Kacheln.
const SPAN: Record<number, string> = {
  0: "md:row-span-2", // hochformat (1×2)
  2: "md:col-span-2", // breit (2×1)
  4: "md:row-span-2", // hochformat (1×2)
  7: "md:row-span-2", // hochformat (1×2)
  9: "md:col-span-2", // breit (2×1)
};
// SAUBERER UNTERER ABSCHLUSS (Wolfram 14.07.): die LETZTEN Kacheln bekommen KEINEN
// Span (uniformer „Schwanz") → unten steht nichts über, das Grid wirkt ruhig; die
// row-span/hochformat-Cards leben nur im oberen/mittleren Teil.
const TAIL_UNIFORM = 8;
// IMMER KLEINES MODUL (Wolfram 16.07.): diese Companies bekommen NIE einen Span —
// weder breit noch hochformatig, auch nicht als letzte Kachel. Ihr Motiv trägt kein
// großes Format.
const SMALL_ONLY = new Set<string>(["lucky-pics"]);
// FESTES FORMAT (Wolfram 16.07.): diese Companies bekommen IMMER denselben Span,
// unabhängig von ihrer Position — ihr Motiv verträgt kein anderes Format.
// Pausenclown: Hochformat-Porträt (Sebastian Lege) → nie breit, sondern eine
// einspaltige Box über zwei Zeilen.
const FORCE_SPAN: Record<string, string> = {
  "pausenclown-media": "md:row-span-2",
};
const spanFor = (i: number, total: number, id?: string) =>
  id && SMALL_ONLY.has(id)
    ? ""
    : id && FORCE_SPAN[id]
      ? FORCE_SPAN[id]
      : i >= total - TAIL_UNIFORM
        ? ""
        : SPAN[i % 12] ?? "";
// Fläche einer Kachel (colspan × rowspan) — für die bündige Rest-Füllung der letzten Zeile.
const areaOf = (s: string) => (s.includes("col-span-2") ? 2 : 1) * (s.includes("row-span-2") ? 2 : 1);

// Exemplarisches Bewegtbild: stabile Zuordnung Company → Trailer-Loop
const REEL: Record<string, string> = Object.fromEntries(
  COMPANIES_DIRECTORY.map((c, i) => [c.id, `/company-media/reel-${(i % 6) + 1}.mp4`]),
);
// ECHTE COMPANY-VIDEOS (Wolfram 16.07.) — überschreiben das generische Reel.
// Quellen: assets/Videos Companies/<Company>/ (gitignored). Aufbereitung je Clip:
// 960px breit, 25 fps, ohne Tonspur (die Kacheln laufen stumm), ~1,6 Mbit/s — das ist
// der Schnitt der bestehenden Reels; die Rohdateien liegen bei 19–351 MB.
// GESCHNITTEN AUF EINEN TEXTFREIEN MITTELTEIL (Wolfram: keine Vorspann-/Insert-Szenen).
// Die Startzeiten sind an einem Frame-Kontaktbogen abgelesen, nicht geschätzt:
//   • filmpool fiction (Dupin Clip2)      ab 2 s, 10 s — Clip ist durchgehend textfrei
//   • South & Browse (Deepfake Clip2)     ab 1,5 s, 10 s — textfrei
//   • Good Humor (Plötzlich Schwester)    ab 10 s, 12 s — Titelkarte liegt erst bei ~62 s
//   • MadeFor (Trailer)                   ab 112 s, 12 s — Titelkarten bei 6/42/66/78/90/102 s,
//     ab ~112 s läuft der Trailer ohne Inserts durch
//   • filmpool entertainment (Reel, 72 s) ab 4 s, 12 s — Format-Showreel mit Titelkarten
//     ZWISCHEN den Segmenten („DIE VERRÄTER" bis ~3,5 s, „BAD BOYFRIENDS" ab ~18 s,
//     weitere bei ~40 s/~43 s). 4–16 s ist der erste durchgehend textfreie Block.
//     Quelle ist bereits eine Web-Fassung (640×360) — NICHT hochskaliert, deshalb mit
//     1,7 MB / 1188 kb/s der kleinste Clip.
//   • Cape Cross (Imagefilm, 83 s)        ab 29,6 s, 5,6 s — Titelkarte bei ~2 s, End-Karte
//     („cape×cross"-X) bei ~82 s. Das Fenster liegt auf durchgehenden Arena-/Stadion-
//     bildern. Es endet bei 35,2 s, weil dort der nächste Schnitt auf einen Interview-Take
//     liegt (am Kontaktbogen abgelesen: bei 35,9 s steht er im Bild): Ein Talking Head ohne
//     Ton liest sich in der kleinen Kachel nicht — und im 5,6-s-Loop hätte er pro Runde
//     kurz aufgeblitzt.
//   • Rainer Laux Productions (Trailer, 45 s) ab 19,5 s, 10,5 s — „Promi Big Brother"-Spot
//     für Joyn. Aufbau: dunkle Set-Bilder bis 18 s, Schwarzbild bei 18,5 s, danach die
//     helle Gartensequenz, ab ~35,5 s wächst das Big-Brother-Auge zur LOGO-ENDKARTE, die
//     die letzten ~8 s füllt. Das Fenster liegt komplett in der Gartensequenz: startet nach
//     dem Schwarzbild, endet vor dem Abblenden (Helligkeit fällt ab 30,5 s: 58 → 26 → 0 bei
//     31,5 s) und damit weit vor der Endkarte. Loop läuft hell auf hell, kein Schwarzblitz.
//     ACHTUNG bei künftigen Schnitten: Der Kontaktbogen zeigte scheinbar ein zweites
//     Schwarzbild bei 28 s — ein Zeichenfehler der Montage. Zwei Helligkeitsscans belegen
//     dort 102,9. Im Bereich 18–38 s ist NUR 31,5 s wirklich schwarz.
//   • Banijay Media Germany (Brandtrailer, 201 s) ab 16,7 s, 12,5 s — AUSNAHME VON DER
//     TEXTFREI-REGEL, ausdrücklich so entschieden (Wolfram 17.07.: „mehr Bilder als diese
//     komische Fernbedienung"). Der Clip trägt den eingebrannten Rahmen des Trailers:
//     Label oben links („BIG SCREEN FORMATS"), Bauchbinde unten mit Case + Marke
//     („TV TOTAL | MC DONALD", „SCHLAG DEN STAR | HAGEBAU", „NIGHTWASH | KLARNA") und
//     Reichweiten-Zähler rechts (759 K, 2.87 M, 14,6 %).
//     Warum es keine textfreie Alternative gibt: 0–3,8 s Hand mit TV-Fernbedienung
//     (einziges textfreies Footage im ganzen Film), 3,9–4,2 s formt sich das „B"-Logo
//     (an der Pixelverteilung abgelesen: die hellen Pixel ziehen sich von 45 % auf 98 % in
//     die Bildmitte), bis ~8 s Logokarten, ~9–10 s Textkarte „WELCOME TO OUR UNIVERSE",
//     ab 11 s bis zum Ende die Case-Montagen. Der Rahmen ist kein Abschnitt, sondern das
//     Gestaltungsprinzip — bei einer Vermarktungs-Company sind Marken und Reichweiten der
//     Inhalt. Erste Fassung waren die 3,8 s Vorspann; als Kachelinhalt zu wenig.
//     16,7–29,2 s ist das bildreichste Fenster: vier echte Szenen (Figur mit Publikum,
//     Bühne mit Moderator, Spielshow, jubelnde Menge). Davor und danach nur
//     Screen-Wall-Montagen aus vielen Mini-Screens, die in der Kachel zu Brei werden.
//   • Endemol Shine Polska (Showreel 2018, 327 s) ab 204 s, 12 s — klassischer
//     Showreel-Aufbau: Logokarte bei ~2 s, Format-Titelkarten dazwischen („FEAR FACTOR"
//     ~34 s, „THE DANCE" ~50 s), Grafik-/Textstrecke gegen Ende („THE HIGHEST QUALITY"
//     ~306 s), Logo-Endkarte bei ~322 s. Das Fenster liegt in der zusammenhängenden
//     Spielshow-Sequenz (~200–240 s): blaue LED-Arena, Kandidatinnen, Moderator.
//     Die Zahlen auf den LED-Wänden („1 2 3 4 5", „100K") sind BÜHNENBILD, keine
//     eingeblendeten Titel — die Regel meint Text-Overlays, nicht das Set.
//   • Minestrone TV (Pastewka_0802_Recap, 92,6 s) ab 10 s, 12 s — Küchenszene, Dialoge,
//     Luftaufnahme, Partyszene. Der Recap ist ein Glücksfall: KEINE Titelkarte, kein Logo,
//     kein Schwarzbild über die ganze Länge; das Fenster war frei wählbar. (Im Ordner liegt
//     noch Pastewka_0810_Recap.mxf — nicht verwendet, Wolfram wählte 0802.)
//   • Ladykracher (LK_08_11_Intro_und_Kino, 137,4 s) ab 80 s, 12 s — Kino-Sketch mit Anke
//     Engelke. Der Vorspann (1–25 s) ist Animation MIT Titelkarte („Anke Engelke" bei
//     ~17 s), ab ~29 s läuft der Sketch textfrei. 80–92 s ist die lebendigste Passage.
//
//   • NightWash Club (Club-Film, 53,3 s) ab 7 s, 12 s — Publikum, Kameracrew, Bühnenlicht,
//     Regieraum. Der Film ist eine Promo mit Format-Titelkarten: „LASS LABERN" ~20,5 s,
//     „DIE MACHT DER 1000 WITZE" ~27 s, „…SLAM" ~39 s, dazu Logokarten am Anfang und
//     Ende. 7–19 s ist der erste durchgehend textfreie Block. Der „night wash"-Schriftzug
//     auf der LED-Rückwand ist BÜHNENBILD, keine eingeblendete Karte.
//     FORMATWAHL: Die Quelle lag als 16x9 UND 9x16 vor. Genommen: 16x9. Die Kachel misst
//     nachgemessen 308×222 (1.39) — bei object-cover bleiben vom 16:9 rund 78 % der
//     Bildbreite stehen, vom 9:16 nur 40 % der Höhe. (Das Bento hat zwar auch
//     Hochformat-Kacheln (0.68) — NightWash ist aber keine davon.)
//
// ⚠️ MXF (Minestrone, Ladykracher): avconvert kann das NICHT lesen („unable to read"),
// AVFoundation unterstützt das Format nicht, macOS liest nicht mal die Metadaten
// (kMDItemCodecs = null). ffmpeg ist weiterhin nicht installiert. Konvertiert mit VLC,
// das eigene MXF-Decoder mitbringt:
//   /Applications/VLC.app/Contents/MacOS/VLC -I dummy -q "<quelle>.mxf" \
//     --start-time=10 --stop-time=22 \
//     --sout "#transcode{vcodec=h264,vb=2200,width=960,acodec=none}:standard{access=file,mux=mp4,dst=<ziel>.mp4}" \
//     vlc://quit
// Da der Browser MXF ebenfalls nicht abspielt, braucht der Kontaktbogen einen Umweg:
// erst einen Proxy der GANZEN Datei (width=480, vb=500) ziehen, den abtasten, dann den
// finalen Ausschnitt aus dem ORIGINAL schneiden. Nebenbei: `timeout` gibt es auf macOS
// nicht (exit 127) — nicht davorsetzen, sonst läuft der Befehl gar nicht.
// Ergebnis wie immer im Browser gegengeprüft (11 Frames, Farbdrift-Check gegen die
// CEWE-Falle): 0 korrupt, natürliche Farben.
// NICHT übernommen: Banijay Germany Live / Luminiscence — das Video trägt von Anfang bis
// Ende eingebrannte Untertitel („DER WÄCHTER HAMBURGS", „LEUCHTFEUER DES NORDENS" …),
// es gibt keinen textfreien Abschnitt. Die Kachel behält bis auf Weiteres das
// generische Reel.
REEL["filmpool-fiction"] = "/company-media/filmpool-fiction.mp4";
REEL["south-and-browse"] = "/company-media/south-and-browse.mp4";
REEL["good-humor"] = "/company-media/good-humor.mp4";
REEL["madefor"] = "/company-media/madefor.mp4";
REEL["cape-cross"] = "/company-media/cape-cross.mp4";
REEL["filmpool-entertainment"] = "/company-media/filmpool-entertainment.mp4";
REEL["rainer-laux-productions"] = "/company-media/rainer-laux-productions.mp4";
REEL["banijay-media-germany"] = "/company-media/banijay-media-germany.mp4";
REEL["endemol-shine-polska"] = "/company-media/endemol-shine-polska.mp4";
REEL["minestrone-tv"] = "/company-media/minestrone-tv.mp4";
REEL["ladykracher"] = "/company-media/ladykracher.mp4";
REEL["nightwash-club"] = "/company-media/nightwash-club.mp4";

// FOTO STATT BEWEGTBILD (Wolfram 16.07.): Companies, für die ein Still statt eines
// Trailers vorliegt. Diese Kacheln bekommen einen leichten, langsamen Ken-Burns-Zoom
// (siehe useGSAP unten) — Bewegung auch ohne Video.
// objectPosition ist bewusst kopflastig gesetzt: die Bento-Kacheln sind mal quadratisch,
// mal breit (col-span-2), mal hoch (row-span-2) — so bleibt das Gesicht in JEDEM Zuschnitt
// im Bild (bei zentriertem Crop würde der Kopf im breiten Format wegfallen).
const STILL: Record<string, { src: string; alt: string; objectPosition: string }> = {
  "pausenclown-media": {
    src: "/company-media/pausenclown-sebastian-lege.jpg",
    alt: "Sebastian Lege, Food-Experte, Koch & Entertainer",
    objectPosition: "50% 22%",
  },
};


export function AlgarveCompaniesBento() {
  const root = useRef<HTMLElement>(null);
  const [rubrik, setRubrik] = useState<string>("alle");

  const cards = useMemo(
    () => (rubrik === "alle" ? COMPANIES_DIRECTORY : COMPANIES_DIRECTORY.filter((d) => d.ecoKeys.includes(rubrik))),
    [rubrik],
  );

  // Kachel-Aufbau: gestaffelt herein; bei Rubrikwechsel remountet die Liste.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const els = gsap.utils.toArray<HTMLElement>("[data-bento-card]");
      gsap.set(els, { autoAlpha: 0, y: 40, scale: 0.96 });
      ScrollTrigger.batch(els, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.06 }),
      });

      // FOTO-KACHELN (kein Video): leichter, langsamer Ken-Burns-Zoom, damit auch die
      // Still-Companies leben. Läuft auf dem IMG (die Einblend-Animation oben liegt auf
      // der Karte) → keine zwei Writer auf derselben transform. Versetzter Delay, damit
      // mehrere Foto-Kacheln nicht synchron „atmen".
      gsap.utils.toArray<HTMLElement>("[data-bento-still]").forEach((img, k) => {
        gsap.fromTo(
          img,
          { scale: 1 },
          { scale: 1.08, duration: 14, ease: "sine.inOut", yoyo: true, repeat: -1, delay: k * 0.8 },
        );
      });
    },
    { scope: root, dependencies: [rubrik], revertOnUpdate: true },
  );

  // Kachel-Videos: nur sichtbare spielen (40 parallele Decodes vermeiden).
  useEffect(() => {
    const vids = Array.from(root.current?.querySelectorAll<HTMLVideoElement>("[data-bento-video]") ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) void v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.15 },
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [rubrik]);

  return (
    <section ref={root} data-nav-theme="dark" className="relative w-full" style={{ background: "transparent", color: PAPER }}>
      {/* FULL SIZE (Wolfram 13.07.): kein maxWidth-Container mehr — die Liste
          läuft full-bleed mit dem 2vw-Randmaß der übrigen Module. Oben knapp:
          die AnimatedHeading davor bringt ihren eigenen Raum mit. */}
      <div className="w-full pb-24 pt-4 lg:pb-32 lg:pt-6" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        {/* Kein eigener Header mehr (Wolfram 13.07.): die Headline kommt als
            großes AnimatedHeading-Panel direkt VOR dieser Section (page.tsx). */}

        {/* Rubrik-Filter (Ökosystem-Kategorien) — Chip-Optik wie News-Filter,
            mittelachsig überm Grid */}
        <div className="mb-8 flex flex-wrap justify-center gap-2.5 md:gap-3">
          {[{ key: "alle", label: "Alle" }, ...ECO_CATEGORIES.map((c) => ({ key: c.key, label: c.label }))].map((r) => {
            const isActive = r.key === rubrik;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setRubrik(r.key)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-[6px] border px-5 py-2.5 text-sm font-medium transition-colors duration-200 max-[767px]:!px-4 max-[767px]:!py-2 max-[767px]:!text-[3.6vw] ${
                  isActive
                    ? "border-[#ff4370] bg-[#ff4370] text-[#f8f7f3]"
                    : "border-[rgba(248,247,243,0.18)] bg-transparent text-[#f8f7f3] hover:border-[#f8f7f3]"
                }`}
                style={{ fontFamily: SHARP }}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Bento-Grid — kompakt & uniform, 4-spaltig, niedrige Zeilen (Wolfram
            14.07.): mehr Companies auf weniger Scrollhöhe. Die GANZE Karte ist der
            Klick → externe Company-Website (nur wenn eine URL vorliegt), sonst eine
            neutrale, nicht klickbare Kachel. Keine Flip-/Detailkarten mehr. */}
        {/* Zeilenhöhe (Wolfram 16.07.): war 11.5vw → bei 4 Spalten (Kachel ≈ 23vw breit)
            ergab das flache 2:1-Kacheln, breite (col-span-2) sogar 4:1 — die Videos wurden
            zu niedrig. 17vw bringt die Normalkachel auf ≈ 4:3. */}
        <div key={rubrik} className="grid grid-cols-2 gap-1.5 md:grid-cols-4 md:gap-2 md:[grid-auto-flow:dense] md:[grid-auto-rows:17vw]">
          {cards.map((card, i) => {
            const still = STILL[card.id];
            const inner = (
              <>
                {/* Foto-Company: Still mit leichtem Ken-Burns-Zoom. Sonst: exemplarisches
                    Bewegtbild (Loop aus dem Banijay-Trailer). */}
                {still ? (
                  <img
                    data-bento-still
                    src={still.src}
                    alt={still.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: still.objectPosition, willChange: "transform" }}
                  />
                ) : (
                  <video
                    data-bento-video
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={card.image}
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <source src={REEL[card.id]} type="video/mp4" />
                  </video>
                )}
                {/* Scrim für Lesbarkeit */}
                <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0) 38%, rgba(10,10,10,0.35) 62%, rgba(10,10,10,0.88) 100%)" }} />

                {/* Echtes weißes Company-Logo oben rechts (Platzhalter: keins) */}
                {card.logo && (
                  <img
                    src={card.logo}
                    alt=""
                    aria-hidden
                    className={`absolute right-[4%] top-[6%] w-auto max-w-[34%] object-contain opacity-95 ${
                      card.logoClass ?? "h-[1.4rem] md:h-[1.6rem]"
                    }`}
                  />
                )}

                {/* Name + (falls URL) Website-Affordanz — der Klick liegt auf der
                    ganzen Karte, daher hier nur ein Span (kein verschachteltes <a>). */}
                <div className="relative z-10 flex flex-col gap-1 p-3 md:p-3.5">
                  <h3 className="m-0 text-white" style={{ fontFamily: SHARP, fontSize: "clamp(0.95rem, 1.35vw, 1.5rem)", lineHeight: "106%", fontWeight: 500, letterSpacing: "-0.01em" }}>
                    {card.name}
                  </h3>
                  {card.url && (
                    <span className="inline-flex w-fit items-center gap-1.5 text-white/85 transition-colors group-hover:text-white" style={{ fontFamily: SHARP, fontSize: "clamp(0.72rem, 0.9vw, 0.9rem)", fontWeight: 500 }}>
                      <span className="underline underline-offset-[5px]">Zur Website</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </>
            );
            // Die LETZTE Kachel füllt die Restspalten der letzten Zeile → das Grid
            // schließt unten immer BÜNDIG ab (Wolfram 14.07., gilt für alle Rubriken).
            // Rest aus der GESAMT-FLÄCHE (colspan × rowspan) der übrigen Kacheln.
            // Auf max. col-span-2 GECAPPT (Wolfram 14.07.): NIE eine Karte über 3–4
            // Spalten ziehen (Bildcontainer wird zu groß). Lieber einen kleinen Rest
            // offen lassen als eine Riesenkarte — der Boden bleibt „einigermaßen grade".
            const LAST_FILL: Record<number, string> = { 1: "", 2: "md:col-span-2", 3: "md:col-span-2", 4: "" };
            const span = SMALL_ONLY.has(card.id)
              ? "" // nie spannen — auch nicht als letzte Kachel (Rest bleibt lieber offen)
              : FORCE_SPAN[card.id]
                ? FORCE_SPAN[card.id] // festes Format — auch als letzte Kachel
                : i === cards.length - 1
                ? LAST_FILL[4 - (cards.slice(0, -1).reduce((n, c, k) => n + areaOf(spanFor(k, cards.length, c.id)), 0) % 4)] ?? ""
                : spanFor(i, cards.length, card.id);
            const cls = `group relative flex min-h-[32vw] flex-col justify-end overflow-hidden text-left md:min-h-0 ${span}`;
            return card.url ? (
              <a
                key={card.id}
                data-bento-card
                data-company-id={card.id}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cls} no-underline`}
                style={{ background: "#14100f" }}
              >
                {inner}
              </a>
            ) : (
              <div key={card.id} data-bento-card data-company-id={card.id} className={cls} style={{ background: "#14100f" }}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
