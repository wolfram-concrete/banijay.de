import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Section, Heading, Eyebrow } from "@/components/wireframe";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/cinematic/Reveal";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveImageStatement } from "@/components/cinematic/algarve/ImageStatement";
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
      <AlgarvePageHero
        headline={"Komm\nins Team"}
        label="Career"
        body="Arbeite dort, wo Unterhaltung entsteht: in Produktion, Redaktion, Entwicklung, Digital, Live und den Teams dahinter."
        image="/grid/g08.jpg"
      />

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

          {/* Jobbereiche — typografische Liste */}
          <div className="mt-14 border-t border-black/15 pt-8">
            <p className="text-[0.8rem] font-bold uppercase tracking-[0.14em] text-accent">Jobbereiche</p>
            <p
              className="mt-5 text-foreground"
              style={{
                fontFamily: "var(--font-sharp), sans-serif",
                fontSize: "clamp(1.4rem, 2.6vw, 2.4rem)",
                lineHeight: "1.3",
                letterSpacing: "-0.01em",
              }}
            >
              {CAREER.jobWorld.areas.join(" · ")}
            </p>
          </div>

          {/* CTA zu allen Stellen */}
          <div className="mt-14 flex flex-col items-start gap-5 border-t border-black/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-lg font-medium">Alle offenen Stellen über die Companies und Standorte.</p>
            <Button href="https://banijay.de/offene-stellen/" variant="primary">
              Offene Stellen ansehen <ArrowUpRight size={16} />
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Talententwicklung — BANIJAY TOMORROW als Image-Block */}
      <AlgarveImageStatement
        eyebrow="Banijay Tomorrow"
        headline={CAREER.talent.headline}
        text={CAREER.talent.text}
        image="/grid/g12.jpg"
      />

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
