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
    // Deduplizieren: der Juicer-Feed liefert denselben Inhalt mehrfach. Beispiel
    // „Plötzlich Schwester"/Good Humor: dieselbe Ankündigung ist mehrfach gepostet
    // (Cross-/Reshare) — mit UNTERSCHIEDLICHER Post-URL UND unterschiedlichem Bild,
    // aber praktisch identischem Text. url-/bild-/exakt-Text-Dedup greift da nicht.
    // Daher zusätzlich über einen NORMALISIERTEN Text-Präfix (erste ~55 Zeichen,
    // nur Buchstaben/Ziffern, lowercase) filtern → identische Ankündigungen fallen
    // auf einen Eintrag zusammen, echte verschiedene Posts bleiben erhalten.
    const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9äöüß]/gi, "").slice(0, 55);
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
        // Bild-URL ohne Query/Cache-Params normalisieren (Juicer hängt teils ?…-Params an)
        const imgKey = post.image.split("?")[0];
        const textKey = norm(post.text);
        if (seen.has(post.url) || seen.has(imgKey) || (textKey.length > 12 && seen.has(textKey))) return false;
        seen.add(post.url);
        seen.add(imgKey);
        if (textKey.length > 12) seen.add(textKey);
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
  dark,
}: {
  headline?: string;
  subline?: string;
  /** V2-Mood (Task #69): transparent auf dem MoodBackdrop, Typo in Paper. */
  dark?: boolean;
} = {}) {
  const posts = await fetchSocialPosts();
  if (posts.length === 0) return null; // Feed nicht verfügbar → Section ausblenden
  return <AlgarveCareerSocialSlider posts={posts} headline={headline} subline={subline} dark={dark} />;
}
