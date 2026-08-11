import type { NewsItem } from "@/data/news";
import { CONTACT, SITE, SOCIAL } from "@/data/site";

export const SITE_URL = "https://www.banijay.de";

export type SeoLocale = "de" | "en";

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, `${SITE_URL}/`).toString();
}

export function germanDateToIso(date: string): string {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(date);
  if (!match) throw new Error(`Invalid German date: ${date}`);

  const [, day, month, year] = match;
  const parsed = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.getUTCFullYear() !== Number(year) ||
    parsed.getUTCMonth() + 1 !== Number(month) ||
    parsed.getUTCDate() !== Number(day)
  ) {
    throw new Error(`Invalid German date: ${date}`);
  }

  return `${year}-${month}-${day}`;
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const organizationId = `${SITE_URL}/#organization`;
const websiteId = `${SITE_URL}/#website`;

export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "Banijay Germany GmbH",
      alternateName: SITE.name,
      url: SITE_URL,
      logo: absoluteUrl("/brand/banijay-logo.png"),
      email: CONTACT.email,
      telephone: "+49 221 6509 5000",
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.street,
        postalCode: "51063",
        addressLocality: "Köln",
        addressCountry: "DE",
      },
      sameAs: [SOCIAL.instagram.url, SOCIAL.linkedin.url],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: CONTACT.email,
          telephone: "+49 221 6509 5000",
          availableLanguage: ["de", "en"],
        },
        {
          "@type": "ContactPoint",
          contactType: "press",
          name: CONTACT.pressContact,
          email: CONTACT.pressEmail,
          availableLanguage: ["de", "en"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: SITE.name,
      inLanguage: ["de-DE", "en"],
      publisher: { "@id": organizationId },
    },
  ],
} as const;

export function newsPageJsonLd(item: NewsItem, locale: SeoLocale) {
  const isEnglish = locale === "en";
  const newsPath = isEnglish ? "/en/news" : "/news";
  const articleUrl = absoluteUrl(`${newsPath}/${item.slug}`);
  const published = germanDateToIso(item.date);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        headline: item.title,
        description: item.lead,
        image: [absoluteUrl(item.img)],
        datePublished: published,
        dateModified: published,
        inLanguage: isEnglish ? "en" : "de-DE",
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        isPartOf: { "@id": websiteId },
        author: {
          "@type": "Organization",
          name: item.author,
          url: SITE_URL,
        },
        publisher: { "@id": organizationId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isEnglish ? "Home" : "Startseite",
            item: absoluteUrl(isEnglish ? "/en" : "/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "News",
            item: absoluteUrl(newsPath),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };
}
