import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/wireframe";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/cinematic/Reveal";
import { CompaniesExplorer } from "@/components/CompaniesExplorer";
import { COMPANIES, CLUSTERS } from "@/data/companies";

export const metadata: Metadata = {
  title: "Companies",
  description:
    "Die Banijay-World: spezialisierte Companies, Labels, Live-Einheiten, Talent-Managements und Plattformen — geclustert nach Kompetenzfeldern.",
};

export default function CompaniesPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border px-[2vw] pb-20 pt-36 lg:pb-28 lg:pt-44">
        <Reveal>
          <Eyebrow className="text-accent">
            {CLUSTERS.length} Cluster · {COMPANIES.length} Companies
          </Eyebrow>
          <h1 className="mt-6 font-medium uppercase leading-[0.9] tracking-tight text-[clamp(2.6rem,8.5vw,9rem)]">
            Unsere
            <br />
            Banijay-World
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Von großen Shows über Reality, Fiction und Comedy bis zu Live-Entertainment, Digital,
            Talent-Management und Production Services: Die Banijay-Welt verbindet spezialisierte
            Einheiten mit der Kraft eines gemeinsamen Entertainment-Hauses.
          </p>
        </Reveal>
      </section>

      {/* Filter nach Kompetenzfeldern + Cluster-Cards */}
      <CompaniesExplorer />

      {/* Abschluss-CTA */}
      <section className="bg-foreground py-24 text-background lg:py-32">
        <div className="container">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <h2 className="text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                Teil der Banijay-Welt werden oder mit einer Company sprechen?
              </h2>
              <div>
                <p className="text-base leading-relaxed text-background/70">
                  Wer Entertainment mit Wirkung entwickeln will, findet hier den richtigen Einstieg.
                </p>
                <Button
                  href="/contact"
                  className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Kontakt aufnehmen <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
