"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  localeFromPathname,
  localizeHref,
} from "@/i18n/config";

const subscribeToHydration = () => () => undefined;

export function NotFoundContent() {
  const pathname = usePathname();
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const locale = hydrated ? localeFromPathname(pathname) : "de";
  const isEnglish = locale === "en";

  return (
    <section
      data-nav-theme="dark"
      className="relative isolate flex min-h-[82vh] items-center justify-center overflow-hidden px-6 pb-20 pt-36 text-center md:px-10 md:pb-28 md:pt-44"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(14rem,38vw,42rem)] leading-none tracking-[-0.08em] text-[#ff4370]/16"
        style={{ fontFamily: "var(--font-anton), sans-serif" }}
      >
        404
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <p className="m-0 text-xs font-medium uppercase tracking-[0.28em] text-[#ff4370]">
          Error 404
        </p>
        <h1 className="mt-6 text-[clamp(2rem,9vw,8rem)] font-normal uppercase leading-[0.92] tracking-[-0.035em] text-[#f8f7f3] md:text-[clamp(3.25rem,8vw,8rem)]">
          {isEnglish ? "Lost in entertainment." : "Im Entertainment verirrt."}
        </h1>
        <p className="mt-7 max-w-xl text-base leading-relaxed text-[#f8f7f3]/70 md:text-lg">
          {isEnglish
            ? "This page does not exist or has moved. The Banijay world continues elsewhere."
            : "Diese Seite existiert nicht oder wurde verschoben. Die Banijay-Welt geht an anderer Stelle weiter."}
        </p>
        <nav
          aria-label={isEnglish ? "Helpful links" : "Hilfreiche Links"}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Button href={localizeHref("/", locale)} size="lg">
            {isEnglish ? "Back to home" : "Zur Startseite"}
          </Button>
          <Button href={localizeHref("/news", locale)} variant="outline" size="lg">
            News
          </Button>
          <Button href={localizeHref("/career", locale)} variant="outline" size="lg">
            {isEnglish ? "Careers" : "Karriere"}
          </Button>
        </nav>
      </div>
    </section>
  );
}
