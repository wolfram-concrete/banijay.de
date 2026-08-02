"use client";

import { Button } from "@/components/ui/button";
import { localizeHref, useLocale } from "@/i18n/config";

export default function NotFound() {
  const locale = useLocale();
  return (
    <div className="container flex flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight md:text-5xl">{locale === "en" ? "This page does not exist." : "Diese Seite existiert nicht."}</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        {locale === "en" ? "You may find what you are looking for elsewhere in the Banijay world." : "Vielleicht findest du, was du suchst, in der Banijay-Welt."}
      </p>
      {/* Der frühere zweite CTA zeigte auf /companies — die Seite ist entfernt
          (Wolfram 16.07.), das Companies-Bento liegt jetzt auf der Home. */}
      <div className="mt-8 flex gap-3">
        <Button href={localizeHref("/", locale)}>{locale === "en" ? "Back to home" : "Zur Startseite"}</Button>
      </div>
    </div>
  );
}
