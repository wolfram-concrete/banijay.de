import { CompanyCard } from "@/components/CompanyCard";
import { Reveal } from "@/components/cinematic/Reveal";
import { CLUSTERS, COMPANIES } from "@/data/companies";
import { cn } from "@/lib/utils";

// Companies-Welt (Konzept „Companies", Ebene 3): transparente, redaktionelle
// Cluster-Ordnung ohne Filter/Ranking. Einheitlicher Card-Stil.

export function CompaniesExplorer() {
  const clustersWithCompanies = CLUSTERS.map((cluster) => ({
    cluster,
    companies: COMPANIES.filter((c) => c.cluster === cluster.id),
  })).filter((group) => group.companies.length > 0);

  return (
    <div style={{ background: "#f8f7f3" }}>
      <div className="container space-y-24 py-16 lg:py-24">
        {clustersWithCompanies.map(({ cluster, companies }) => {
          const letter = String.fromCharCode(65 + CLUSTERS.findIndex((c) => c.id === cluster.id));
          return (
            <section key={cluster.id} id={cluster.id} className="scroll-mt-32">
              <Reveal>
                <div className="flex items-start gap-5 border-t border-border pt-8">
                  <span className="font-medium leading-none tracking-tight text-accent/25 text-[clamp(2.5rem,5vw,4.5rem)]">
                    {letter}
                  </span>
                  <div className="max-w-2xl pt-1">
                    <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{cluster.label}</h2>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {cluster.description}
                    </p>
                  </div>
                </div>
              </Reveal>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {companies.map((company) => (
                  <div key={company.slug} className={cn(company.tier === "featured" && "lg:col-span-2")}>
                    <CompanyCard company={company} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
