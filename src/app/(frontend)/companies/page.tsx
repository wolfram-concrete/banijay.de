import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/cinematic/Reveal";
import { AlgarvePageHero } from "@/components/cinematic/algarve/PageHero";
import { AlgarveWorksB } from "@/components/cinematic/algarve/WorksB";

export const metadata: Metadata = {
  title: "Companies",
  description:
    "Die Banijay-World: spezialisierte Companies, Labels, Live-Einheiten, Talent-Managements und Plattformen — geclustert nach Kompetenzfeldern.",
};

export default function CompaniesPage() {
  return (
    <>
      {/* Hero */}
      <AlgarvePageHero
        headline={"Die Welt\ndahinter"}
        label="Companies"
        body="25+ Companies und Labels, jede mit eigener Handschrift. Gemeinsam entwickeln sie Shows, Reality, Fiction, Comedy, Digital und Live-Erlebnisse für den deutschen Markt."
        image="/grid/g03.png"
      />

      {/* Companies-Vorstellung — vertikale Works-B-Liste (sticky Labels) */}
      <AlgarveWorksB />

      {/* Abschluss-CTA */}
      <section className="bg-foreground py-24 text-background lg:py-32">
        <div className="container">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <h2 className="text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                Die richtige Company für deine Idee, dein Format oder deine Partnerschaft?
              </h2>
              <div>
                <p className="text-base leading-relaxed text-background/70">
                  Sag uns, worum es geht – wir bringen dich mit der passenden Handschrift zusammen.
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
