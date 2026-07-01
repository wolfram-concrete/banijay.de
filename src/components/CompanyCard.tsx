/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";
import type { Company } from "@/data/companies";
import { getCompanyImage } from "@/data/companyImages";

// Algarve-Editorial-Company-Card: bild-first, minimaler Text.
// Großes Teaser-Bild (Hover-Zoom + „known for"-Overlay), Name (Sharp), ein
// Profil-Satz, dezentes Tier-Label. Keine Corporate-Box, keine Tag-Wolke.

export function CompanyCard({ company }: { company: Company }) {
  const image = getCompanyImage(company);
  const isFeatured = company.tier === "featured";
  const href = company.externalLink;
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
      className="group block no-underline"
    >
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: isFeatured ? "16 / 10" : "4 / 3", background: "#e8e6df" }}
      >
        {image ? (
          <img
            src={image.url}
            alt={company.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl font-medium text-black/15">
            {company.name.charAt(0)}
          </div>
        )}

        {/* Tier-Label */}
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em]"
          style={{ background: "rgba(0,0,0,0.32)", color: "#f8f7f3", backdropFilter: "blur(6px)" }}
        >
          {company.tier}
        </span>

        {/* Hover-Overlay: known for */}
        {company.knownFor.length > 0 && (
          <div
            className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.82), rgba(0,0,0,0) 66%)" }}
          >
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white/60">Known for</span>
            <span className="mt-1 text-sm leading-snug text-white">
              {company.knownFor.slice(0, 4).join(" · ")}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3
            className="m-0 text-foreground"
            style={{ fontFamily: "var(--font-sharp), sans-serif", fontSize: "1.35rem", fontWeight: 500, letterSpacing: "-0.01em" }}
          >
            {company.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{company.profile}</p>
          {company.parent && (
            <p className="mt-1 text-xs text-muted-foreground/70">Label unter {company.parent}</p>
          )}
        </div>
        {href && (
          <ArrowUpRight
            size={20}
            className="mt-1 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        )}
      </div>
    </Wrapper>
  );
}
