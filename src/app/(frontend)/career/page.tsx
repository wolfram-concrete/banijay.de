import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Section, Heading, Eyebrow } from "@/components/wireframe";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/cinematic/Reveal";
import { CAREER } from "@/data/career";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Arbeite dort, wo Unterhaltung entsteht. Jobs über die Companies und Standorte der Banijay-Welt — plus BANIJAY TOMORROW.",
};

export default function CareerPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border px-[2vw] pb-20 pt-36 lg:pb-28 lg:pt-44">
        <Reveal>
          <Eyebrow className="text-accent">Career</Eyebrow>
          <h1 className="mt-6 max-w-[16ch] font-medium uppercase leading-[0.9] tracking-tight text-[clamp(2.4rem,7vw,7.5rem)]">
            {CAREER.hero.headline}
          </h1>
          <div className="mt-8 max-w-2xl">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {CAREER.hero.subline}
            </p>
            <Button href={CAREER.hero.cta.href} className="mt-7">
              {CAREER.hero.cta.text}
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Einstieg in die Jobwelt */}
      <Section surface id="stellen">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow className="text-accent">Jobwelt</Eyebrow>
            <Heading className="mt-4">{CAREER.jobWorld.headline}</Heading>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{CAREER.jobWorld.text}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{CAREER.jobWorld.text2}</p>
          </div>

          {/* Standorte */}
          <div className="mt-8 flex flex-wrap gap-2">
            {CAREER.jobWorld.locations.map((loc) => (
              <span
                key={loc}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-foreground"
              >
                <MapPin size={13} className="text-muted-foreground" /> {loc}
              </span>
            ))}
          </div>

          {/* Jobbereiche */}
          <div className="mt-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Jobbereiche</p>
            <div className="mt-4 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {CAREER.jobWorld.areas.map((area) => (
                <div
                  key={area}
                  className="flex items-center justify-between bg-background p-5 transition-colors hover:bg-surface"
                >
                  <span className="text-base font-medium">{area}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">offene Stellen</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA zu allen Stellen */}
          <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-border bg-background p-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-medium">Alle offenen Stellen über die Companies und Standorte.</p>
            <Button href="https://banijay.de/offene-stellen/" variant="primary">
              Offene Stellen ansehen <ArrowUpRight size={16} />
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Talententwicklung — BANIJAY TOMORROW */}
      <Section>
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow className="text-accent">Banijay Tomorrow</Eyebrow>
            <Heading className="mt-4">{CAREER.talent.headline}</Heading>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{CAREER.talent.text}</p>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <section className="bg-foreground py-24 text-background lg:py-32">
        <div className="container">
          <Reveal>
            <div className="flex flex-col items-start gap-6">
              <h2 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                Finde deine Rolle in der Banijay-Welt.
              </h2>
              <Button href={CAREER.cta.href} className="bg-accent text-accent-foreground hover:bg-accent/90">
                {CAREER.cta.text} <ArrowUpRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
