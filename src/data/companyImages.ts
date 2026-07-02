// Company-Teaserbilder von der Live-Seite (scraped_content, 2026-06-25).
// Liegen app-fertig in public/companies/<slug>.<ext>.
// CMS-ready: werden später Payload-Media-Uploads, daher PayloadImage-Shape.

import type { Company } from "./companies";
import type { PayloadImage } from "@/types/blocks";

/** slug → Dateiendung in public/companies/ (nicht alle Bilder sind .png). */
const COMPANY_IMAGE_EXT: Record<string, "png" | "jpg"> = {
  "banijay-productions-germany": "png",
  "endemolshine-germany": "jpg",
  "dynamic-ally-pictures": "png",
  brainpool: "png",
  "banijay-germany-live": "png",
  "cape-cross": "png",
  "banijay-media-germany": "png",
  "influence-vision": "jpg",
  madefor: "jpg",
  "good-humor": "jpg",
  "potatohead-pictures": "jpg",
  "bb-endemol-shine": "jpg",
  "endemol-shine-polska": "jpg",
  "mts-management": "png",
  "sr-management": "jpg",
  en2rage: "jpg",
  "ogp-only-good-people": "jpg",
  myshow: "png",
  "cologne-comedy-festival": "png",
  "elevate-talent-management": "png",
};

// Neue, hochauflösende & lokal optimierte Poster (Recherche 2026-07-02, siehe
// banijay-company-media-recherche.md). Liegen unter public/company-media/<slug>/
// poster.jpg (1400px lange Kante, JPG). Ersetzen für diese Companies die alten
// 260–270px-Scrapes; alle übrigen fallen weiter auf /companies/<slug>.<ext> zurück.
const COMPANY_MEDIA_POSTER = new Set<string>([
  "banijay-productions-germany",
  "endemolshine-germany",
  "brainpool",
  "madefor",
  "cape-cross",
  "influence-vision",
  "banijay-germany-live",
]);

export function getCompanyImage(company: Pick<Company, "slug" | "name">): PayloadImage | undefined {
  if (COMPANY_MEDIA_POSTER.has(company.slug)) {
    return {
      url: `/company-media/${company.slug}/poster.jpg`,
      alt: `${company.name} – Teaserbild`,
    };
  }
  const ext = COMPANY_IMAGE_EXT[company.slug];
  if (!ext) return undefined;
  return {
    url: `/companies/${company.slug}.${ext}`,
    alt: `${company.name} – Teaserbild`,
  };
}
