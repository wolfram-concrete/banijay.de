import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">Diese Seite existiert nicht.</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Vielleicht findest du, was du suchst, in der Banijay-Welt.
      </p>
      {/* Der frühere zweite CTA zeigte auf /companies — die Seite ist entfernt
          (Wolfram 16.07.), das Companies-Bento liegt jetzt auf der Home. */}
      <div className="mt-8 flex gap-3">
        <Button href="/">Zur Startseite</Button>
      </div>
    </div>
  );
}
