import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import { SITE_URL } from "@/lib/seo";

describe("robots metadata", () => {
  it("points crawlers to the canonical host and sitemap", () => {
    const value = robots();

    expect(value.host).toBe(SITE_URL);
    expect(value.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });

  it("separates search crawlers from training crawlers", () => {
    const value = robots();

    expect(value.rules).toContainEqual({
      userAgent: ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User"],
      allow: "/",
    });
    expect(value.rules).toContainEqual({
      userAgent: ["GPTBot", "ClaudeBot", "Google-Extended"],
      disallow: "/",
    });
    expect(value.rules).toContainEqual({
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    });
  });
});
