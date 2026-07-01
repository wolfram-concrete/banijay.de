import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Section, Heading, Eyebrow } from "@/components/wireframe";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/cinematic/Reveal";
import { CountUp } from "@/components/cinematic/CountUp";
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
      <section className="border-b border-border px-[2vw] pb-20 pt-36 lg:pb-28 lg:pt-44">
        <Reveal>
          <Eyebrow className="text-accent">About</Eyebrow>
          <h1 className="mt-6 font-medium uppercase leading-[0.9] tracking-tight text-[clamp(2.6rem,8.5vw,9rem)]">
            {ABOUT.hero.headline}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {ABOUT.hero.text}
          </p>
        </Reveal>
      </section>

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
            <div className="overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/people/marcus-wolter.jpg"
                alt="Marcus Wolter, CEO & Co-Founder Banijay Germany"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div>
              <Eyebrow className="text-accent">{ABOUT.ceo.headline}</Eyebrow>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{ABOUT.ceo.text}</p>
              <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                „{ABOUT.ceo.quote}“
              </blockquote>
              <p className="mt-4 font-medium">{ABOUT.ceo.name}</p>
              <p className="text-sm text-muted-foreground">{ABOUT.ceo.role}</p>
              <div className="mt-6 rounded-md border border-dashed border-border p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Alternative Quote zur Freigabe
                </p>
                <p className="mt-2 text-sm italic leading-relaxed text-foreground">„{ABOUT.ceo.altQuote}“</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Internationalität */}
      <Section>
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow className="text-accent">International</Eyebrow>
            <Heading className="mt-4">{ABOUT.international.headline}</Heading>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {ABOUT.international.text}
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Partnerverständnis */}
      <Section surface>
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow className="text-accent">Partner</Eyebrow>
            <Heading className="mt-4">{ABOUT.partnership.headline}</Heading>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{ABOUT.partnership.text}</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {ABOUT.partnership.cards.map((card) => (
              <div key={card.title} className="bg-background p-7 transition-colors hover:bg-surface">
                <h3 className="text-lg font-medium">{card.title}</h3>
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
                Lass uns über Entertainment mit Wirkung sprechen.
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
