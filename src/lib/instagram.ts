// Instagram-Reels über die Graph API (Account @banijaygermanylive).
// Läuft NUR serverseitig — der Token bleibt im Server, der Client erhält nur
// die öffentlichen CDN-URLs (Thumbnail, Video, Permalink).

import "server-only";
import type { InstagramReel } from "@/data/reels";

export type { InstagramReel };

interface IgMedia {
  id: string;
  caption?: string;
  media_type: string;
  media_product_type?: string;
  media_url?: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
  username?: string;
}

// Caption → knapper Titel (erste Zeile, ohne Hashtag-Schwanz).
function toTitle(caption?: string): string {
  if (!caption) return "Banijay Germany Live";
  const firstLine = caption.split("\n")[0].trim();
  const noTags = firstLine.split(/\s+#/)[0].trim();
  const clean = noTags || firstLine;
  return clean.length > 80 ? clean.slice(0, 79).trimEnd() + "…" : clean;
}

export async function getInstagramReels(
  token: string | undefined,
  limit = 12,
): Promise<InstagramReel[]> {
  if (!token) return [];

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_product_type",
    "media_url",
    "permalink",
    "thumbnail_url",
    "timestamp",
    "username",
  ].join(",");

  const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit * 2}&access_token=${token}`;

  try {
    // Stündlich neu validieren (IG-CDN-URLs sind kurzlebig).
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json: { data?: IgMedia[] } = await res.json();

    return (json.data ?? [])
      .filter((m) => m.media_type === "VIDEO" && m.thumbnail_url && m.media_url)
      .slice(0, limit)
      .map((m) => ({
        id: m.id,
        title: toTitle(m.caption),
        caption: m.caption ?? "",
        permalink: m.permalink,
        thumbnailUrl: m.thumbnail_url!,
        videoUrl: m.media_url!,
        timestamp: m.timestamp,
        username: m.username ?? "banijaygermanylive",
      }));
  } catch {
    return [];
  }
}
