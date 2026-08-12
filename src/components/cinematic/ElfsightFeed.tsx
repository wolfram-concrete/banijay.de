import { AlgarveCareerSocialSlider, type SocialPost } from "./algarve/CareerSocialSlider";

// Instagram-Feed @banijaygermany (Wolfram 22.07.) — ARCHITEKTUR WIE GEHABT:
// Wir ziehen die Posts server-seitig als JSON und rendern sie über UNSEREN eigenen
// Banijay-Slider (AlgarveCareerSocialSlider), NICHT über das Elfsight-iframe-Widget.
// Damit sieht der Feed exakt aus wie der bisherige Juicer-Slider, hat aber endlich die
// Instagram-Posts (die in Juicer fehlten) — Banijay hat die Meta-/Instagram-Anbindung
// in Elfsight eingerichtet (Linda, 22.07.), wir greifen nur die Daten dahinter ab.
//
// Datenquelle: der Data-Service, den auch das Elfsight-Widget nutzt. Die Widget-App-ID
// aus Lindas Embed (d46ee32f-…) verweist auf diese Instagram-„Source" mit der pid unten.
// Endpoint per Netzwerk-Analyse des Widgets ermittelt (widget-data.service.elfsight.com).
// ⚠️ Undokumentierter Endpoint — vor Livegang gegen die offizielle Meta-/Instagram-API
//    absichern (Task #59); fällt der Fetch aus, blendet sich die Section einfach aus.
const ELF_PID = "40d4e231-a0fb-42fc-adbf-eec3b3e74c72";
const ELF_SOURCE = encodeURIComponent(JSON.stringify({ pid: ELF_PID, filters: [] }));
const ELF_URL = `https://widget-data.service.elfsight.com/api/posts?sources[]=${ELF_SOURCE}&sort=date&limit=50&offset=0`;

type ElfMedia = { type?: string; url?: string; thumbnail?: { url?: string } | null };
type ElfPost = { type?: string; link?: string; publishedAt?: string; caption?: string; media?: ElfMedia[] };

// Instagram-CDN-Bilder (scontent.cdninstagram.com) lassen sich NICHT direkt vom Browser
// hotlinken — Instagram blockt Cross-Origin-Requests (IMG ERROR), nur das allererste kommt
// zufällig durch. Elfsight löst das mit seinem Bild-Proxy `phosphor` (cached + liefert die
// Motive mit korrekten Headern aus). Wir routen die Cover-Bilder deshalb durch denselben
// Proxy — exakt wie das Widget. (Video-URLs bleiben direkt; die spielen der Album-Karte.)
const proxyImg = (url: string) => `https://phosphor.utils.elfsightcdn.com/?url=${encodeURIComponent(url)}`;

// Instagram-Caption (Plain-Text mit \n, Hashtags, @mentions) auf eine Kartencopy kürzen.
function toPlainText(s: string, max = 180): string {
  const txt = (s ?? "")
    .replace(/\s+/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
  return txt.length > max ? `${txt.slice(0, max).trimEnd()}…` : txt;
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// Elfsight-Data-Service → unser SocialPost[]. Bild = erstes Medium mit Thumbnail (Album-
// Cover / Foto-Post); Video = mp4-URL (nur bei Alben mit Video-Element).
//
// WICHTIG (Wolfram 22.07.): REINE REELS werden ÜBERSPRUNGEN. Ihre Datensätze enthalten KEIN
// Cover-Bild (nur die Video-URL), und Instagrams Reel-mp4s (…/o1/v/t2/…) lassen sich im
// Browser nicht direkt abspielen (MediaError 4) — ohne Poster UND ohne spielbares Video
// blieben das leere Karten. Foto-Posts und Alben haben dagegen immer ein Cover-Thumbnail;
// bei ihnen ist das Video nur Zugabe (spielt es nicht, bleibt das Poster stehen). Wir
// fordern deshalb ein Bild (`image`) — kein Bild ⇒ Post raus. Bleiben ~36 Bild/Album-Posts.
export async function fetchElfsightPosts(limit = 12): Promise<SocialPost[]> {
  try {
    const res = await fetch(ELF_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (banijay.de social feed)" },
      next: { revalidate: 3600 }, // 1 h cachen (wie der frühere Juicer-Feed)
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { payload?: Record<string, ElfPost> | ElfPost[] };
    const payload = data.payload ?? {};
    const posts: ElfPost[] = Array.isArray(payload) ? payload : Object.values(payload);

    const seen = new Set<string>();
    const out: SocialPost[] = [];
    for (const p of posts) {
      const media = p.media ?? [];
      const image = media.find((m) => m.thumbnail?.url)?.thumbnail?.url ?? "";
      const video = media.find((m) => m.type === "video" && m.url)?.url;
      const url = p.link ?? "";
      if (!image || !url || seen.has(url)) continue; // kein Cover-Bild (reines Reel) → raus
      seen.add(url);
      out.push({
        image: proxyImg(image), // über phosphor, sonst blockt Instagram das Hotlinking
        video,
        text: toPlainText(p.caption ?? ""),
        url,
        source: "Instagram",
        date: formatDate(p.publishedAt),
      });
      if (out.length >= limit) break;
    }
    return out;
  } catch {
    return [];
  }
}

export async function ElfsightFeed({
  headline = "#WeAreBanijay",
  subline = "Neuigkeiten, Menschen und Momente — direkt aus unseren Kanälen.",
  dark = true,
  showText = false,
}: {
  headline?: string;
  subline?: string;
  dark?: boolean;
  showText?: boolean;
} = {}) {
  const posts = await fetchElfsightPosts();
  if (posts.length === 0) return null; // Feed nicht verfügbar → Section ausblenden
  return (
    <AlgarveCareerSocialSlider posts={posts} headline={headline} subline={subline} dark={dark} showText={showText} />
  );
}
