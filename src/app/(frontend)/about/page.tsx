import type { Metadata } from "next";
import { Reveal } from "@/components/cinematic/Reveal";
import { CountUp } from "@/components/cinematic/CountUp";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveAboutIntro } from "@/components/cinematic/algarve/AboutIntro";
import { AlgarveCeoTestimonial } from "@/components/cinematic/algarve/CeoTestimonial";
import { AlgarveFounders } from "@/components/cinematic/algarve/Founders";
import { AlgarveStatementVideo } from "@/components/cinematic/algarve/StatementVideo";
import { AlgarvePartnerGrid } from "@/components/cinematic/algarve/PartnerGrid";
import { AlgarveContactForm } from "@/components/cinematic/algarve/ContactForm";
import { ABOUT } from "@/data/about";
import { STATS } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Banijay Germany ist ein führendes Entertainment-Haus im deutschen Markt — geführt von Menschen, die Entertainment verstehen.",
};

const SHARP = "var(--font-sharp), sans-serif";

export default function AboutPage() {
  return (
    <>
      {/* 01 Hero */}
      <AlgarvePageHero
        headline={"We are\nBanijay"}
        label="About"
        body="Ein führendes Entertainment-Netzwerk im deutschen Markt: eigenständige Companies, bekannte Marken und kreative Teams unter einem starken Dach."
        image="/grid/g05.jpg"
      />

      {/* 02 Proof / Zahlen — große kinetische Zahlen */}
      <section style={{ background: "#f8f7f3", paddingTop: "6.5vw", paddingBottom: "6.5vw" }}>
        <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
          <Reveal>
            <div className="max-w-[62vw] max-[767px]:!max-w-full">
              <p
                className="max-[767px]:!text-[5vw] md:max-w-[52vw]"
                style={{ fontFamily: SHARP, fontSize: "1.9vw", lineHeight: "132%", fontWeight: 500, color: "#0e0d0b", letterSpacing: "-0.03vw" }}
              >
                {ABOUT.proof.text}
              </p>
            </div>

            {/* Bento-Kennzahlen: getönte Rundkarten, erste Kachel Coral (col-span-2).
                Die „Umsatz"-Kachel (Freigabe nötig) ist entfernt; 5 Karten füllen im
                3-Spalten-Grid sauber zwei Reihen. */}
            <div className="mt-[3.5vw] grid grid-cols-2 gap-[1vw] md:grid-cols-3">
              {STATS.filter((s) => !s.aboutOnly).map((s, i) => {
                const accent = i === 0;
                const bg = accent ? "#ff4370" : "rgba(14,13,11,0.05)";
                return (
                  <div
                    key={s.label}
                    className={`flex flex-col justify-between max-[767px]:!min-h-[38vw] ${accent ? "col-span-2" : ""}`}
                    style={{ background: bg, color: "#0e0d0b", borderRadius: "1.11vw", padding: "2vw", minHeight: "12vw" }}
                  >
                    <div className="flex items-baseline gap-2">
                      <span
                        className="max-[767px]:!text-[12vw]"
                        style={{ fontFamily: SHARP, fontSize: accent ? "5vw" : "3.6vw", lineHeight: "100%", fontWeight: 500, letterSpacing: "-0.14vw" }}
                      >
                        <CountUp value={s.value} />
                      </span>
                    </div>
                    <div className="mt-[1.4vw]">
                      <p className="max-[767px]:!text-[3.4vw]" style={{ fontFamily: SHARP, fontSize: "1vw", fontWeight: 700, letterSpacing: "0.05vw", textTransform: "uppercase" }}>
                        {s.label}
                      </p>
                      {s.note && <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{s.note}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 Prinzip — als Statement auf einem großflächig aufskalierenden Video-
          Container, der sich über die Zahlen legt (b-Glas-Visual). */}
      <AlgarveStatementVideo
        statement={`${ABOUT.principle.headline} ${ABOUT.principle.text.split(". ")[0]}.`}
      />

      {/* 04 CEO / Führung — Testimonial-Section (Birkform) mit Magenta-Parallax */}
      <AlgarveCeoTestimonial
        heading="Führung"
        role={ABOUT.ceo.role}
        quote={ABOUT.ceo.quote}
        name={ABOUT.ceo.name}
        image="/people/marcus-wolter-2022.jpg"
        cta={{ text: "Kontakt aufnehmen", href: "mailto:hello@banijay.de" }}
        stats={[
          { value: "25+", label: "Companies & Labels" },
          { value: "1.300", label: "Mitarbeitende" },
        ]}
      />

      {/* 05 Internationalität — reines Text-Statement (Panel ohne Hintergrundbild),
          Wort-für-Wort-Reveal wie die Home-AboutIntro. */}
      <AlgarveAboutIntro text={`${ABOUT.international.headline} ${ABOUT.international.text}`} />

      {/* 06 Leadership — Algarve Founder-Grid */}
      <AlgarveFounders />

      {/* 07 Partnerverständnis — als blog-home-Grid (Algarve News-Template) */}
      <AlgarvePartnerGrid />

      {/* 08 Kontakt-Formular (Eingabetemplate) */}
      <AlgarveContactForm
        headline="Lass uns über Entertainment sprechen, das Menschen erreicht."
        copy="Für Projekte, Presse, Partnerschaften oder einfach ein Hallo."
      />
    </>
  );
}
