"use client";

import { usePathname } from "next/navigation";

export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];

const DE_TO_EN: Record<string, string> = {
  "/": "/en",
  "/career": "/en/career",
  "/contact": "/en/contact",
  "/news": "/en/news",
  "/impressum": "/en/imprint",
  "/datenschutz": "/en/privacy",
};

const EN_TO_DE = Object.fromEntries(
  Object.entries(DE_TO_EN).map(([de, en]) => [en, de]),
) as Record<string, string>;

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de";
}

export function useLocale(): Locale {
  return localeFromPathname(usePathname());
}

export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;
  if (locale === "de") {
    if (href.startsWith("/en/news/")) return href.replace("/en/news/", "/news/");
    return EN_TO_DE[href] ?? (href.replace(/^\/en(?=\/|$)/, "") || "/");
  }
  if (href.startsWith("/en")) return href;
  if (href.startsWith("/news/")) return `/en${href}`;
  return DE_TO_EN[href] ?? `/en${href === "/" ? "" : href}`;
}

export function alternateLocaleHref(pathname: string, target: Locale): string {
  return localizeHref(pathname, target);
}
