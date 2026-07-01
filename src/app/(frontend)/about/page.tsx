import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Section, Heading, Eyebrow } from "@/components/wireframe";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/cinematic/Reveal";
import { CountUp } from "@/components/cinematic/CountUp";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveImageStatement } from "@/components/cinematic/algarve/ImageStatement";
import { AlgarveFounders } from "@/components/cinematic/algarve/Founders";
import { ABOUT } from "@/data/about";
import { STATS } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Banijay Germany ist ein führendes Entertainment-Haus im deutschen Markt — geführt von Menschen, die Entertainment verstehen.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <AlgarvePageHero
        headline={"We are\nBanijay"}
        label="Über Banijay"
        body="Ein führendes Entertainment-Netzwerk im deutschen Markt: eigenständige Companies, bekannte Marken und kreative Teams unter einem starken Dach."
        image="/grid/g05.jpg"
      />

      {/* Zahlen / Proof (inkl. About-only Umsatz) */}
      <Section surface>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow className="text-accent">Proof</Eyebrow>
            <Heading className="mt-4">{ABOUT.proof.headline}</Heading>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{ABOUT.proof.text}</p>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-medium tracking-tight md:text-5xl">
                    <CountUp value={s.value} />
                  </p>
                  {s.aboutOnly && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      Freigabe nötig
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">{s.label}</p>
                {s.note && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.note}</p>}
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Prinzip */}
      <Section>
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow className="text-accent">Prinzip</Eyebrow>
            <Heading className="mt-4">{ABOUT.principle.headline}</Heading>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{ABOUT.principle.text}</p>
          </div>
        </Reveal>
      </Section>

      {/* CEO / Führung */}
      <Section surface>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/people/marcus-wolter.jpg"
                alt="Marcus Wolter, CEO & Co-Founder Banijay Germany"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div>
              <Eyebrow className="text-accent">{ABOUT.ceo.headline}</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{ABOUT.ceo.text}</p>
              <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                „{ABOUT.ceo.quote}“
              </blockquote>
              <p className="mt-6 font-medium">{ABOUT.ceo.name}</p>
              <p className="text-sm text-muted-foreground">{ABOUT.ceo.role}</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Internationalität — Algarve Image-Block + Glass-Card */}
      <AlgarveImageStatement
        eyebrow="International"
        headline={ABOUT.international.headline}
        text={ABOUT.international.text}
        image="/grid/g06.jpg"
      />

      {/* Leadership — Algarve Founder-Grid */}
      <AlgarveFounders />

      {/* Partnerverständnis */}
      <Section surface>
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow className="text-accent">Partner</Eyebrow>
            <Heading className="mt-4">{ABOUT.partnership.headline}</Heading>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{ABOUT.partnership.text}</p>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT.partnership.cards.map((card) => (
              <div key={card.title} className="border-t border-black/15 pt-5">
                <h3
                  className="text-foreground"
                  style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "1.2rem", fontWeight: 500 }}
                >
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Kontakt-CTA */}
      <section className="bg-foreground py-24 text-background lg:py-32">
        <div className="container">
          <Reveal>
            <div className="flex flex-col items-start gap-6">
              <h2 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                Lass uns über Entertainment sprechen, das Menschen erreicht.
              </h2>
              <Button href={ABOUT.cta.href} className="bg-accent text-accent-foreground hover:bg-accent/90">
                {ABOUT.cta.text} <ArrowUpRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
