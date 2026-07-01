import { cn } from "@/lib/utils";

// Immersives Section-Reveal (drinksom-Referenz): Inhalt steigt von unten rein
// und zoomt minimal auf, sobald die Sektion in den Viewport scrollt.
//
// Reine CSS scroll-driven animation (siehe globals .reveal). Kein JS — daher
// kein Observer-/Hydration-Timing und KEIN Failure-Mode „Inhalt unsichtbar":
// ohne Feature-Support bleibt der Inhalt einfach sichtbar.

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
