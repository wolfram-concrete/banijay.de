import { ArrowUpRight } from "lucide-react";
import { Section, Heading, Eyebrow } from "@/components/wireframe";
import { Button } from "@/components/ui/button";
import { ReelsSlider } from "@/components/ReelsSlider";
import { KineticHero } from "@/components/cinematic/KineticHero";
import { StickyShowcase } from "@/components/cinematic/StickyShowcase";
import { Marquee } from "@/components/cinematic/Marquee";
import { HorizontalCompanies } from "@/components/cinematic/HorizontalCompanies";
import { EcosystemOrbit } from "@/components/cinematic/EcosystemOrbit";
import { CountUp } from "@/components/cinematic/CountUp";
import { Reveal } from "@/components/cinematic/Reveal";
import { getInstagramReels } from "@/lib/instagram";
import { BANIJAY_GERMANY_SNAPSHOTS } from "@/data/banijayGermanySnapshots";
import { HOME } from "@/data/home";
import { homeStats } from "@/data/site";

export default async function HomePage() {
  const stats = homeStats();
  // Home zeigt Reels von Banijay Germany (Haupt-Account). Mit Graph-Token in
  // IG_TOKEN_BANIJAYGERMANY: echte Reels inkl. Hover-Autoplay-Video. Ohne Token:
  // lokale Snapshots der 6 neuesten Posts — beides im nativen 9:16-Look.
  const liveReels = await getInstagramReels(process.env.IG_TOKEN_BANIJAYGERMANY);
  const reels = liveReels.length > 0 ? liveReels : BANIJAY_GERMANY_SNAPSHOTS;

  return (
    <>
      {/* Hero — Kinetik „WE ARE BANIJAY" */}
      <KineticHero />

      {/* Sticky-Scroll-Showcase — die Format-Wand mit Trailer */}
      <StickyShowcase />

      {/* Kinetisches Format-Ticker-Band */}
      <Marquee />

      {/* News / Reels — @banijaygermany im nativen 9:16-Look (Snapshots bzw.
          echte Reels mit Token). */}
      <Section>
        <Reveal>
          <ReelsSlider reels={reels} />
        </Reveal>
      </Section>

      {/* Impact in Zahlen */}
      <Section surface>
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow className="text-accent">Impact</Eyebrow>
            <Heading className="mt-4">{HOME.stats.headline}</Heading>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{HOME.stats.text}</p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-medium tracking-tight md:text-5xl">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Die Banijay-Welt */}
      <Section>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <Eyebrow className="text-accent">Die Banijay-Welt</Eyebrow>
              <Heading className="mt-4">{HOME.world.headline}</Heading>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{HOME.world.text}</p>
              <p className="mt-4 text-base font-medium italic leading-relaxed text-foreground">
                {HOME.world.extra}
              </p>
            </div>
            <EcosystemOrbit />
          </div>
        </Reveal>
      </Section>

      {/* Kompetenzfelder */}
      <Section surface>
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow className="text-accent">Kompetenzfelder</Eyebrow>
            <Heading className="mt-4">{HOME.competenceFields.headline}</Heading>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {HOME.competenceFields.text}
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {HOME.competenceFields.fields.map((field) => (
              <div key={field.title} className="bg-background p-7 transition-colors hover:bg-surface">
                <h3 className="text-lg font-medium">{field.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{field.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* CEO-Moment */}
      <Section>
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
              <Eyebrow className="text-accent">{HOME.ceo.headline}</Eyebrow>
              <blockquote className="mt-5 text-3xl font-medium leading-[1.15] tracking-tight md:text-4xl">
                „{HOME.ceo.quote}“
              </blockquote>
              <div className="mt-6">
                <p className="font-medium">{HOME.ceo.name}</p>
                <p className="text-sm text-muted-foreground">{HOME.ceo.role}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Featured Companies — horizontal gepinnter Scroll */}
      <HorizontalCompanies />

      {/* Partner-CTA */}
      <section className="bg-foreground py-24 text-background lg:py-32">
        <div className="container">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <h2 className="text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                {HOME.partnerCta.headline}
              </h2>
              <div>
                <p className="text-base leading-relaxed text-background/70">{HOME.partnerCta.text}</p>
                <Button
                  href={HOME.partnerCta.cta.href}
                  className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {HOME.partnerCta.cta.text} <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
