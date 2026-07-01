// Wireframe-Primitives — geteilte Bausteine für die Struktur-Phase.
// In Phase 2 (Cinematic) werden v. a. Placeholder/SectionTag entfernt oder
// durch echte Medien/Visuals ersetzt; Section/Eyebrow/Heading bleiben.

import { cn } from "@/lib/utils";

/**
 * Selbsterklärendes Wireframe-Label. Verankert jede Sektion sichtbar in der
 * Konzeption (z. B. „HOME · 03 — Brands & Formate"). Nur in Phase 1.
 */
export function SectionTag({ page, index, title }: { page: string; index?: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent/40" />
      <span className="text-accent/70">{page}</span>
      {index && <span className="text-border">·</span>}
      {index && <span>{index}</span>}
      <span className="text-border">—</span>
      <span>{title}</span>
    </div>
  );
}

export function Section({
  children,
  className,
  surface,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  /** Dezenter Flächen-Hintergrund zur Abgrenzung im Wireframe. */
  surface?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-24 lg:py-32", className)}
      style={{ background: surface ? "#f0eee6" : "#f8f7f3" }}
    >
      <div className="container">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn("text-[0.8rem] font-bold uppercase tracking-[0.14em] text-accent", className)}
    >
      {children}
    </span>
  );
}

export function Heading({
  children,
  as: Tag = "h2",
  className,
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-medium leading-[1.04] tracking-tight text-foreground",
        Tag === "h1"
          ? "text-[clamp(2.4rem,6vw,5rem)]"
          : Tag === "h2"
            ? "text-[clamp(1.9rem,4.2vw,3.6rem)]"
            : "text-[clamp(1.3rem,2vw,1.9rem)]",
        className,
      )}
      style={{ fontFamily: "var(--font-sharp), sans-serif" }}
    >
      {children}
    </Tag>
  );
}

/**
 * Media-/Visual-Platzhalter (Video, Bild, Eclipse-Glow, Portrait …).
 * Schraffierte Fläche signalisiert: hier kommt in Phase 2 ein echtes Asset.
 */
export function Placeholder({
  label,
  ratio = "16/9",
  className,
}: {
  label: string;
  ratio?: "16/9" | "4/3" | "3/4" | "1/1" | "21/9";
  className?: string;
}) {
  const ratioClass = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "3/4": "aspect-[3/4]",
    "1/1": "aspect-square",
    "21/9": "aspect-[21/9]",
  }[ratio];

  return (
    <div
      className={cn(
        "wf-placeholder flex items-center justify-center rounded-md border border-border/70 text-center",
        ratioClass,
        className,
      )}
    >
      <span className="px-4 font-mono text-[11px] uppercase tracking-[0.15em]">{label}</span>
    </div>
  );
}
