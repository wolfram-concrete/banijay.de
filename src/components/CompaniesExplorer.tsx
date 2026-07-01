"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { CompanyCard } from "@/components/CompanyCard";
import { Reveal } from "@/components/cinematic/Reveal";
import { CLUSTERS, COMPANIES, COMPETENCIES, type Competency } from "@/data/companies";
import { cn } from "@/lib/utils";

type Filter = Competency | "Alle";

// Companies-Explorer (Konzept „Companies", Ebene 2–3).
// Filter nach Kompetenzfeld + transparente, redaktionelle Cluster-Ordnung.
// list-ui-design: Tier nur als Mini-Label, keine farbigen Featured-Banner,
// Counter + transparente Ordnungs-Note, einheitlicher Card-Stil.

export function CompaniesExplorer() {
  const [filter, setFilter] = useState<Filter>("Alle");

  const matches = useMemo(
    () => COMPANIES.filter((c) => filter === "Alle" || c.competencies.includes(filter)),
    [filter],
  );

  const clustersWithMatches = CLUSTERS.map((cluster) => ({
    cluster,
    companies: matches.filter((c) => c.cluster === cluster.id),
  })).filter((group) => group.companies.length > 0);

  return (
    <div>
      {/* Filterleiste — sticky unter der schwebenden Nav */}
      <div className="sticky top-[5.5rem] z-30 border-y border-border bg-background/90 py-4 backdrop-blur-xl">
        <div className="container">
          <div className="flex flex-wrap items-center gap-2">
            <FilterChip active={filter === "Alle"} onClick={() => setFilter("Alle")}>
              Alle
            </FilterChip>
            {COMPETENCIES.map((c) => (
              <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>
                {c}
              </FilterChip>
            ))}
          </div>

          {/* Counter + Reset + Ordnungs-Note */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <p>
              <span className="text-foreground">{matches.length}</span> Companies
              {filter !== "Alle" && (
                <>
                  {" "}
                  in <span className="text-foreground">{filter}</span>
                </>
              )}{" "}
              · Reihenfolge: nach Cluster (redaktionell), kein Ranking
            </p>
            {filter !== "Alle" && (
              <button
                type="button"
                onClick={() => setFilter("Alle")}
                className="inline-flex items-center gap-1.5 text-foreground hover:text-muted-foreground"
              >
                <RotateCcw size={13} /> Filter zurücksetzen
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Geclusterte Company-Welt */}
      <div className="container space-y-24 py-16 lg:py-24">
        {clustersWithMatches.map(({ cluster, companies }) => {
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
                  <div
                    key={company.slug}
                    className={cn(company.tier === "featured" && "lg:col-span-2")}
                  >
                    <CompanyCard company={company} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {clustersWithMatches.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg font-medium">Keine Companies in diesem Kompetenzfeld.</p>
            <button
              type="button"
              onClick={() => setFilter("Alle")}
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground underline-offset-4 hover:underline"
            >
              <RotateCcw size={14} /> Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
