import { AlgarveCareerSocialSlider, type SocialPost } from "./CareerSocialSlider";

// #workatBanijay — Social-Feed-Section für die Career-Seite. Zieht die Posts
// server-seitig aus dem Juicer-JSON (derselbe Feed wie die bestehende Live-
// Karriereseite), rendert sie aber über einen eigenen Banijay-Slider (kein
// Fremd-Widget/Script). Bei Fehler wird die Section einfach ausgeblendet.

const JUICER_URL = "https://www.juicer.io/api/feeds/banijaygermany?per=6";

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

async function fetchPosts(): Promise<SocialPost[]> {
  try {
    const res = await fetch(JUICER_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (banijay.de career feed)" },
      next: { revalidate: 3600 }, // 1 h cachen
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { posts?: { items?: JuicerPost[] } };
    const items = data.posts?.items ?? [];
    return items
      .filter((p) => p.image && p.full_url)
      .slice(0, 6)
      .map((p) => ({
        image: p.image as string,
        text: toPlainText(p.message ?? p.unformatted_message ?? ""),
        url: p.full_url as string,
        source: p.source?.source ?? "Social",
        date: formatDate(p.external_created_at),
      }));
  } catch {
    return [];
  }
}

export async function AlgarveCareerSocialFeed() {
  const posts = await fetchPosts();
  if (posts.length === 0) return null; // Feed nicht verfügbar → Section ausblenden
  return <AlgarveCareerSocialSlider posts={posts} />;
}
