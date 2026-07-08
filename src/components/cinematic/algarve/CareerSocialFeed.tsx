import { AlgarveCareerSocialSlider, type SocialPost } from "./CareerSocialSlider";

// #workatBanijay — Social-Feed-Section für die Career-Seite. Zieht die Posts
// server-seitig aus dem Juicer-JSON (derselbe Feed wie die bestehende Live-
// Karriereseite), rendert sie aber über einen eigenen Banijay-Slider (kein
// Fremd-Widget/Script). Bei Fehler wird die Section einfach ausgeblendet.

// per=50 → genug Rohposts zum Deduplizieren; wie viele wir am Ende behalten, steuert
// der `limit`-Parameter von fetchSocialPosts (News-Liste zieht mehr als der Slider).
const JUICER_URL = "https://www.juicer.io/api/feeds/banijaygermany?per=50";

type JuicerPost = {
  image?: string;
  message?: string;
  unformatted_message?: string;
  full_url?: string;
  external_created_at?: string;
  poster_name?: string;
  source?: { source?: string };
};

// HTML aus dem Juicer-`message` sicher als Plain-Text strippen und kürzen.
function toPlainText(html: string, max = 180): string {
  const txt = html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|div|li)>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
  return txt.length > max ? `${txt.slice(0, max).trimEnd()}…` : txt;
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export async function fetchSocialPosts(limit = 12): Promise<SocialPost[]> {
  try {
    const res = await fetch(JUICER_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (banijay.de career feed)" },
      next: { revalidate: 3600 }, // 1 h cachen
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { posts?: { items?: JuicerPost[] } };
    const items = data.posts?.items ?? [];
    // Deduplizieren: der Juicer-Feed liefert gelegentlich denselben Beitrag doppelt
    // (z. B. „Nächster Drehstart … Good Humor" am Ende). Über URL UND Text-Inhalt
    // filtern, sonst erscheint die Karte zweimal.
    const seen = new Set<string>();
    return items
      .filter((p) => p.image && p.full_url)
      .map((p) => ({
        image: p.image as string,
        text: toPlainText(p.message ?? p.unformatted_message ?? ""),
        url: p.full_url as string,
        source: p.source?.source ?? "Social",
        date: formatDate(p.external_created_at),
      }))
      .filter((post) => {
        const key = `${post.url}::${post.text}`;
        if (seen.has(post.url) || seen.has(post.text) || seen.has(key)) return false;
        seen.add(post.url);
        seen.add(post.text);
        seen.add(key);
        return true;
      })
      .slice(0, limit);
  } catch {
    return [];
  }
}

export async function AlgarveCareerSocialFeed({
  headline,
  subline,
}: {
  headline?: string;
  subline?: string;
} = {}) {
  const posts = await fetchSocialPosts();
  if (posts.length === 0) return null; // Feed nicht verfügbar → Section ausblenden
  return <AlgarveCareerSocialSlider posts={posts} headline={headline} subline={subline} />;
}
