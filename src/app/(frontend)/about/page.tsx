import type { Metadata } from "next";
import { Reveal } from "@/components/cinematic/Reveal";
import { CountUp } from "@/components/cinematic/CountUp";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveImageStatement } from "@/components/cinematic/algarve/ImageStatement";
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
        label="Über Banijay"
        body="Ein führendes Entertainment-Netzwerk im deutschen Markt: eigenständige Companies, bekannte Marken und kreative Teams unter einem starken Dach."
        image="/grid/g05.jpg"
      />

      {/* 02 Proof / Zahlen — große kinetische Zahlen */}
      <section style={{ background: "#f8f7f3", paddingTop: "6.5vw", paddingBottom: "6.5vw" }}>
        <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
          <Reveal>
            <div className="max-w-[52vw] max-[767px]:!max-w-full">
              <Kicker>Proof</Kicker>
              <h2
                className="m-0 uppercase max-[767px]:!text-[8vw]"
                style={{ fontFamily: SHARP, fontSize: "3.4vw", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.12vw", color: "#0e0d0b" }}
              >
                {ABOUT.proof.headline}
              </h2>
              <p
                className="max-[767px]:!text-[4vw] md:max-w-[40vw]"
                style={{ marginTop: "1.11vw", fontSize: "1.3vw", lineHeight: "145%", color: "rgba(0,0,0,0.64)" }}
              >
                {ABOUT.proof.text}
              </p>
            </div>

            <div className="mt-[3.5vw] grid gap-x-[2vw] gap-y-[3vw] sm:grid-cols-2 lg:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.label} style={{ borderTop: "0.12vw solid rgba(0,0,0,0.16)", paddingTop: "1.4vw" }}>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="max-[767px]:!text-[12vw]"
                      style={{ fontFamily: SHARP, fontSize: "4vw", lineHeight: "100%", fontWeight: 500, letterSpacing: "-0.14vw", color: "#0e0d0b" }}
                    >
                      <CountUp value={s.value} />
                    </span>
                    {s.aboutOnly && (
                      <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: "#fb4b68", fontWeight: 700 }}>
                        Freigabe nötig
                      </span>
                    )}
                  </div>
                  <p className="mt-3 max-[767px]:!text-[3.4vw]" style={{ fontFamily: SHARP, fontSize: "1vw", fontWeight: 700, letterSpacing: "0.05vw", textTransform: "uppercase", color: "#0e0d0b" }}>
                    {s.label}
                  </p>
                  {s.note && <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{s.note}</p>}
                </div>
              ))}
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

      {/* 04 CEO / Führung — dunkles Panel mit Coral-Akzent */}
      <section style={{ background: "#0e0d0b", color: "#f8f7f3", paddingTop: "6.5vw", paddingBottom: "6.5vw" }}>
        <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
          <Reveal>
            <div className="grid items-center gap-[3vw] lg:grid-cols-[1fr_1.4fr] max-[767px]:!gap-[6vw]">
              <div className="overflow-hidden" style={{ borderRadius: "1.4vw" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/people/marcus-wolter.jpg"
                  alt="Marcus Wolter, CEO & Co-Founder Banijay Germany"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div>
                <Kicker tone="#fb4b68">{ABOUT.ceo.headline}</Kicker>
                <p className="max-[767px]:!text-[4vw] md:max-w-[40vw]" style={{ fontSize: "1.3vw", lineHeight: "150%", color: "rgba(248,247,243,0.7)" }}>
                  {ABOUT.ceo.text}
                </p>
                <blockquote
                  className="m-0 max-[767px]:!text-[6vw]"
                  style={{ marginTop: "1.8vw", fontFamily: SHARP, fontSize: "2.4vw", lineHeight: "118%", fontWeight: 500, letterSpacing: "-0.08vw" }}
                >
                  „{ABOUT.ceo.quote}“
                </blockquote>
                <p className="mt-[1.6vw] max-[767px]:!text-[4vw]" style={{ fontFamily: SHARP, fontWeight: 600, fontSize: "1.15vw" }}>
                  {ABOUT.ceo.name}
                </p>
                <p className="max-[767px]:!text-[3.2vw]" style={{ fontSize: "0.95vw", color: "rgba(248,247,243,0.55)" }}>{ABOUT.ceo.role}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 05 Internationalität — Algarve Image-Block + Glass-Card */}
      <AlgarveImageStatement
        eyebrow="International"
        headline={ABOUT.international.headline}
        text={ABOUT.international.text}
        image="/grid/g06.jpg"
      />

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
