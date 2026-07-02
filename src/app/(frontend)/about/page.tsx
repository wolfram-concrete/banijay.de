import type { Metadata } from "next";
import { Reveal } from "@/components/cinematic/Reveal";
import { CountUp } from "@/components/cinematic/CountUp";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveAboutIntro } from "@/components/cinematic/algarve/AboutIntro";
import { AlgarveCeoTestimonial } from "@/components/cinematic/algarve/CeoTestimonial";
import { AlgarveFounders } from "@/components/cinematic/algarve/Founders";
import { AlgarveContactForm } from "@/components/cinematic/algarve/ContactForm";
import { ABOUT } from "@/data/about";
import { STATS } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Banijay Germany ist ein führendes Entertainment-Haus im deutschen Markt — geführt von Menschen, die Entertainment verstehen.",
};

const SHARP = "var(--font-sharp), sans-serif";

// Kleiner Magenta-Kicker (Eyebrow) im Algarve-/Kinetic-Look.
function Kicker({ children, tone = "#ff4370" }: { children: React.ReactNode; tone?: string }) {
  return (
    <span
      className="mb-[0.9vw] block max-[767px]:!text-[3vw]"
      style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.12vw", textTransform: "uppercase", color: tone }}
    >
      {children}
    </span>
  );
}

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
                const bg = accent ? "#fb4b68" : "rgba(14,13,11,0.05)";
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

      {/* 03 Prinzip — großes Statement */}
      <section style={{ background: "#f8f7f3", paddingTop: "2vw", paddingBottom: "6.5vw" }}>
        <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
          <Reveal>
            <div className="max-w-[62vw] max-[767px]:!max-w-full">
              <Kicker>Prinzip</Kicker>
              <h2
                className="m-0 max-[767px]:!text-[7vw]"
                style={{ fontFamily: SHARP, fontSize: "3.6vw", lineHeight: "112%", fontWeight: 500, letterSpacing: "-0.11vw", color: "#0e0d0b" }}
              >
                {ABOUT.principle.headline}
              </h2>
              <p
                className="max-[767px]:!text-[4vw] md:max-w-[48vw]"
                style={{ marginTop: "1.4vw", fontSize: "1.3vw", lineHeight: "150%", color: "rgba(0,0,0,0.64)" }}
              >
                {ABOUT.principle.text}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04 CEO / Führung — Testimonial-Section (Birkform) mit Magenta-Parallax */}
      <AlgarveCeoTestimonial
        heading="Führung"
        role={ABOUT.ceo.role}
        quote={ABOUT.ceo.quote}
        name={ABOUT.ceo.name}
        image="/people/marcus-wolter-gross.png"
        cta={{ text: "Kontakt aufnehmen", href: "mailto:hello@banijay.de" }}
      />

      {/* 05 Internationalität — reines Text-Statement (Panel ohne Hintergrundbild),
          Wort-für-Wort-Reveal wie die Home-AboutIntro. */}
      <AlgarveAboutIntro text={`${ABOUT.international.headline} ${ABOUT.international.text}`} />

      {/* 06 Leadership — Algarve Founder-Grid */}
      <AlgarveFounders />

      {/* 07 Partnerverständnis */}
      <section style={{ background: "#f8f7f3", paddingTop: "6.5vw", paddingBottom: "6.5vw" }}>
        <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
          <Reveal>
            <div className="max-w-[62vw] max-[767px]:!max-w-full">
              <Kicker>Partner</Kicker>
              <h2
                className="m-0 max-[767px]:!text-[7vw]"
                style={{ fontFamily: SHARP, fontSize: "3.4vw", lineHeight: "112%", fontWeight: 500, letterSpacing: "-0.11vw", color: "#0e0d0b" }}
              >
                {ABOUT.partnership.headline}
              </h2>
              <p
                className="max-[767px]:!text-[4vw] md:max-w-[48vw]"
                style={{ marginTop: "1.4vw", fontSize: "1.3vw", lineHeight: "150%", color: "rgba(0,0,0,0.64)" }}
              >
                {ABOUT.partnership.text}
              </p>
            </div>
            <div className="mt-[3vw] grid gap-x-[2vw] gap-y-[2.5vw] sm:grid-cols-2 lg:grid-cols-4">
              {ABOUT.partnership.cards.map((card) => (
                <div key={card.title} style={{ borderTop: "0.12vw solid rgba(0,0,0,0.16)", paddingTop: "1.2vw" }}>
                  <h3
                    className="max-[767px]:!text-[5vw]"
                    style={{ fontFamily: SHARP, fontSize: "1.25vw", fontWeight: 500, color: "#0e0d0b", letterSpacing: "-0.03vw" }}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-2 max-[767px]:!text-[3.6vw]" style={{ fontSize: "0.95vw", lineHeight: "150%", color: "rgba(0,0,0,0.6)" }}>
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 08 Kontakt-Formular (Eingabetemplate) */}
      <AlgarveContactForm
        headline="Lass uns über Entertainment sprechen, das Menschen erreicht."
        copy="Für Projekte, Presse, Partnerschaften oder einfach ein Hallo."
      />
    </>
  );
}
