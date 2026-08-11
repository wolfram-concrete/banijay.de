import { describe, expect, it } from "vitest";
import { NEWS } from "@/data/news";
import {
  SITE_JSON_LD,
  SITE_URL,
  absoluteUrl,
  germanDateToIso,
  newsPageJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

describe("SEO helpers", () => {
  it("builds absolute www URLs without altering external URLs", () => {
    expect(absoluteUrl("/career")).toBe(`${SITE_URL}/career`);
    expect(absoluteUrl("https://example.com/image.jpg")).toBe(
      "https://example.com/image.jpg",
    );
  });

  it("converts valid German dates to ISO dates", () => {
    expect(germanDateToIso("04.08.2026")).toBe("2026-08-04");
  });

  it.each(["2026-08-04", "31.02.2026", "4.8.2026"])(
    "rejects invalid German dates: %s",
    (date) => {
      expect(() => germanDateToIso(date)).toThrow("Invalid German date");
    },
  );

  it("escapes opening angle brackets in JSON-LD", () => {
    const serialized = serializeJsonLd({ text: "</script><script>" });

    expect(serialized).not.toContain("<");
    expect(JSON.parse(serialized)).toEqual({ text: "</script><script>" });
  });

  it("publishes organization and website data on the canonical domain", () => {
    expect(SITE_JSON_LD["@graph"].map((entry) => entry["@type"])).toEqual([
      "Organization",
      "WebSite",
    ]);
    expect(serializeJsonLd(SITE_JSON_LD)).toContain(SITE_URL);
  });

  it("creates localized article and breadcrumb structured data", () => {
    const data = newsPageJsonLd(NEWS[0], "en");
    const [article, breadcrumb] = data["@graph"];

    expect(article).toMatchObject({
      "@type": "NewsArticle",
      datePublished: "2026-08-04",
      inLanguage: "en",
      image: [expect.stringMatching(/^https:\/\/www\.banijay\.de\//)],
    });
    expect(article.mainEntityOfPage).toMatchObject({
      "@id": `${SITE_URL}/en/news/${NEWS[0].slug}`,
    });
    expect(breadcrumb).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        expect.objectContaining({ position: 1, name: "Home" }),
        expect.objectContaining({ position: 2, name: "News" }),
        expect.objectContaining({ position: 3, name: NEWS[0].title }),
      ],
    });
  });
});
