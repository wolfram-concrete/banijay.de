import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { NEWS } from "@/data/news";
import { SITE_URL, germanDateToIso } from "@/lib/seo";

describe("sitemap metadata", () => {
  const entries = sitemap();

  it("contains all indexable static and news URLs on www", () => {
    const urls = entries.map((entry) => entry.url);

    expect(entries).toHaveLength(12 + NEWS.length * 2);
    expect(urls).toContain(`${SITE_URL}/`);
    expect(urls).toContain(`${SITE_URL}/en`);
    expect(urls).toContain(`${SITE_URL}/career`);
    expect(urls).toContain(`${SITE_URL}/en/privacy`);
    expect(urls).toContain(`${SITE_URL}/news/${NEWS[0].slug}`);
    expect(urls.every((url) => url.startsWith(SITE_URL))).toBe(true);
  });

  it("excludes non-indexable and operational routes", () => {
    const urls = entries.map((entry) => entry.url);

    expect(urls.some((url) => /\/(api|wartung|type-test|mood-test|looktest)/.test(url))).toBe(
      false,
    );
  });

  it("provides complete language alternatives", () => {
    const career = entries.find((entry) => entry.url === `${SITE_URL}/career`);

    expect(career?.alternates?.languages).toEqual({
      de: `${SITE_URL}/career`,
      en: `${SITE_URL}/en/career`,
      "x-default": `${SITE_URL}/career`,
    });
  });

  it("adds source dates only to news articles", () => {
    const home = entries.find((entry) => entry.url === `${SITE_URL}/`);
    const article = entries.find(
      (entry) => entry.url === `${SITE_URL}/news/${NEWS[0].slug}`,
    );

    expect(home?.lastModified).toBeUndefined();
    expect(article?.lastModified).toBe(germanDateToIso(NEWS[0].date));
  });
});
