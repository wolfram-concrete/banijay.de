import { FORMATS } from "@/data/formats";

// Endlos-Marquee: laufender Format-Ticker als kinetisches Band.
// Server Component — reine CSS-Animation (siehe globals .marquee-track).

export function Marquee() {
  const items = FORMATS.map((f) => f.title);
  const loop = [...items, ...items];

  return (
    <div className="marquee-mask overflow-hidden border-y border-border bg-foreground py-6 text-background">
      <div className="marquee-track">
        {loop.map((title, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 text-2xl font-medium tracking-tight md:text-4xl">{title}</span>
            <span className="text-2xl text-accent md:text-4xl">✶</span>
          </span>
        ))}
      </div>
    </div>
  );
}
