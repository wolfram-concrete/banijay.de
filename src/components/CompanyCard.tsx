"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import type { Company } from "@/data/companies";
import { getCompanyImage } from "@/data/companyImages";
import { cn } from "@/lib/utils";

// Tier-bewusste Company-Card (Konzept „Company Card UX"):
//  - featured:   große Card mit voller Tiefe
//  - specialist: kompakter
//  - label:      kurze Label-/Experience-Card
// Aufklappbare Detail-Ebene laut Konzept: „Bei Klick auf Mehr erfahren".

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}

export function CompanyCard({ company }: { company: Company }) {
  const [open, setOpen] = useState(false);
  const isFeatured = company.tier === "featured";
  const isLabel = company.tier === "label";
  const image = getCompanyImage(company);

  return (
    <article
      className={cn(
        "group flex flex-col rounded-lg border border-border bg-background p-6 transition-colors hover:border-foreground/30",
        isFeatured && "lg:p-8",
      )}
    >
      {/* Kopf: Logo-Platzhalter + Name + Tier-Marker */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "relative flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/70 bg-surface font-medium text-foreground/70",
              isFeatured ? "h-12 w-12 text-lg" : "h-10 w-10 text-base",
            )}
          >
            {image ? (
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              company.name.charAt(0)
            )}
          </span>
          <div>
            <h3 className={cn("font-medium leading-tight tracking-tight", isFeatured ? "text-xl" : "text-lg")}>
              {company.name}
            </h3>
            {company.parent && (
              <p className="text-[11px] text-muted-foreground">Label unter {company.parent}</p>
            )}
          </div>
        </div>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {company.tier}
        </span>
      </div>

      {/* Profil-Satz */}
      <p className="mt-4 text-sm font-medium text-foreground">{company.profile}</p>

      {/* Kurztext (Label-Cards knapper) */}
      {!isLabel && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{company.description}</p>
      )}

      {/* Kompetenz-Tags */}
      {company.competencies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {company.competencies.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </div>
      )}

      {/* Known for */}
      {company.knownFor.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Known for</p>
          <p className="mt-1 text-sm text-foreground">{company.knownFor.join(" · ")}</p>
        </div>
      )}

      <div className="mt-auto" />

      {/* Aufklappbare Detail-Ebene */}
      {open && (
        <div className="mt-5 space-y-4 border-t border-border pt-5 text-sm">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Rolle im Banijay-Netzwerk
            </p>
            <p className="mt-1 text-foreground">{company.roleInWorld}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Ausgewählte Produktionen / Cases
            </p>
            <p className="mt-1 text-muted-foreground">
              {company.knownFor.length > 0 ? company.knownFor.join(", ") : "folgt"}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Geschäftsführung / kreative Köpfe
            </p>
            <p className="mt-1 text-muted-foreground">Platzhalter — Inhalte mit Banijay ergänzen</p>
          </div>
        </div>
      )}

      {/* Aktionen */}
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-muted-foreground"
        >
          {open ? "Weniger" : "Mehr erfahren"}
          <ChevronDown size={15} className={cn("transition-transform", open && "rotate-180")} />
        </button>
        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground">
          Zur Company <ArrowUpRight size={14} />
        </span>
      </div>
    </article>
  );
}
