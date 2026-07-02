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

// Pro Poster einzeln im echten Hochkant-Card-Container geprüfter Fokuspunkt
// (object-position), damit Gesichter/Körper/Show-Objekte nicht abgeschnitten
// werden. NICHT pauschal „center center" — jeder Wert ist motivspezifisch:
//   Banijay Productions „Hast du Töne" (4 Personen): mittiges Paar + Logo, Gesichter oben.
//   EndemolShine „WWM" (Jauch steht rechts): Fokus rechts.
//   Brainpool „TV total" (Pufpaff sitzt links): Fokus links.
//   MadeFor „Tatort" (3 Personen + Monitor mittig): Gesichter oben.
//   Cape Cross (Live-Techniker mittig-rechts, sehr breites Motiv): leicht rechts.
//   influence.vision (Porträt): mittig, Kopf oben.
//   Banijay Germany Live (Comedian mittig auf Bühne): mittig, Kopf oben.
const COMPANY_MEDIA_POSITION: Record<string, string> = {
  "banijay-productions-germany": "50% 34%",
  "endemolshine-germany": "70% 50%",
  brainpool: "24% 50%",
  madefor: "50% 34%",
  "cape-cross": "58% 50%",
  "influence-vision": "50% 20%",
  "banijay-germany-live": "50% 26%",
};

/** Motivspezifischer object-position-Fokuspunkt (nur für neue company-media-Poster). */
export function getCompanyImagePosition(slug: string): string {
  return COMPANY_MEDIA_POSITION[slug] ?? "center";
}

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
