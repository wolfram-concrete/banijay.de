import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User"], allow: "/" },
      { userAgent: ["GPTBot", "ClaudeBot", "Google-Extended"], disallow: "/" },
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
