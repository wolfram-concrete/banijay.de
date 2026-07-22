import sharp from "sharp";
import { AlgarveCareerSocialSlider, type SocialPost } from "./CareerSocialSlider";
import { fetchElfsightPosts } from "@/components/cinematic/ElfsightFeed";

// #workatBanijay — Social-Feed-Section für die Career-Seite. Zieht die Posts
// server-seitig aus dem Juicer-JSON (derselbe Feed wie die bestehende Live-
// Karriereseite), rendert sie aber über einen eigenen Banijay-Slider (kein
// Fremd-Widget/Script). Bei Fehler wird die Section einfach ausgeblendet.

// per=50 → genug Rohposts zum Deduplizieren; wie viele wir am Ende behalten, steuert
// der `limit`-Parameter von fetchSocialPosts (News-Liste zieht mehr als der Slider).
const JUICER_URL = "https://www.juicer.io/api/feeds/banijaygermany?per=50";

type JuicerPost = {
  image?: string;
  /** Direkte Video-URL (nur bei Video-Posts; ~4 von 50). */
  video?: string;
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

// ── DUBLETTEN-ERKENNUNG: BILD + TEXT ────────────────────────────────────────
// Juicer vergibt für dasselbe Motiv unterschiedliche media-IDs, ein URL-Vergleich
// läuft daher ins Leere. Stattdessen wird das Bild PERZEPTUELL verglichen
// (Average-Hash) UND zusätzlich der Text — beides zusammen, denn einzeln irrt jedes:
//   • Bild allein: Banijays Stellenanzeigen nutzen alle dasselbe Template-Motiv —
//     bildgleich, aber inhaltlich völlig verschiedene Jobs.
//   • Text allein: dieselbe Meldung wird von mehreren Abteilungen unterschiedlich
//     getextet (13.07., „Plötzlich Schwester": drei Formulierungen, ein Motiv).
// Am Live-Feed vermessen — die Werte trennen sauber:
//   Dubletten  → Text-Ähnlichkeit 1.0 / 0.41 / 0.40   (bei identischem Bild)
//   echte Posts→ Text-Ähnlichkeit 0.16 … 0.09         (Stellenanzeigen)
// Dazwischen liegt eine deutliche Lücke → Schwelle 0.30.

/** Average-Hash eines Bildes als 64-Bit-String; null, wenn nicht ladbar/decodierbar. */
async function imageHash(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (banijay.de feed)" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const px = await sharp(buf).greyscale().resize(8, 8, { fit: "fill" }).raw().toBuffer();
    let sum = 0;
    for (const v of px) sum += v;
    const avg = sum / px.length;
    return Array.from(px, (v) => (v > avg ? "1" : "0")).join("");
  } catch {
    return null;
  }
}

/** Abweichende Bits zweier Hashes (0 = identisches Motiv). */
function hashDistance(a: string, b: string): number {
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d;
}

const STOPWORDS = new Set([
  "eine","einen","einem","der","die","das","den","dem","des","und","oder","aber","auch","für","mit","von","vom",
  "beim","bei","ist","sind","wird","werden","haben","hat","sich","auf","aus","als","wie","zum","zur","nach","über",
  "unter","nicht","mehr","sehr","heute","jetzt","noch","hier","dass","wir","uns","unsere","unser","ihr","ihre",
  "dich","dein","deine",
]);

/** Inhaltswörter eines Textes (>3 Zeichen, ohne Füllwörter). */
function words(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-zäöüß0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOPWORDS.has(w)),
  );
}

/** Jaccard-Ähnlichkeit zweier Wortmengen (0 = nichts gemeinsam, 1 = gleich). */
function textSimilarity(a: Set<string>, b: Set<string>): number {
  let shared = 0;
  a.forEach((w) => {
    if (b.has(w)) shared++;
  });
  const union = a.size + b.size - shared;
  return union === 0 ? 0 : shared / union;
}

const IMG_MAX_DISTANCE = 5; // Bilder gelten bis hier als dasselbe Motiv
const TEXT_MIN_SIMILARITY = 0.3; // darüber: dieselbe Meldung, nur anders getextet

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
    // Rohposts aufbereiten — der UNGEKÜRZTE Text dient dem Vergleich (die Kartencopy ist
    // auf 180 Zeichen gekürzt und würde die Ähnlichkeit verfälschen).
    const raw = items
      .filter((p) => p.image && p.full_url)
      .map((p) => ({
        full: toPlainText(p.message ?? p.unformatted_message ?? "", 4000),
        post: {
          image: p.image as string,
          // Video-Posts: Juicers Auto-Thumbnail ist immer der ERSTE Frame (beim
          // NightWash-Post vom 16.07. nur Himmel). Die Video-URL geht deshalb mit an die
          // Karte — die sucht sich daraus einen aussagekräftigen Frame und spielt das
          // Video ab, sobald sie im Viewport steht (Wolfram 16.07.).
          video: p.video,
          text: toPlainText(p.message ?? p.unformatted_message ?? ""),
          url: p.full_url as string,
          source: p.source?.source ?? "Social",
          date: formatDate(p.external_created_at),
        } satisfies SocialPost,
      }));

    // Alle Motive parallel hashen (~1,4 s für 50 Bilder, läuft serverseitig und wird
    // eine Stunde gecacht). Schlägt ein Hash fehl → null, dann greift für diesen Post
    // nur die Exakt-Prüfung; der Feed fällt deswegen nicht aus.
    const hashes = await Promise.all(raw.map(({ post }) => imageHash(post.image)));

    const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9äöüß]/gi, "").slice(0, 55);
    const seen = new Set<string>();
    const kept: { hash: string | null; words: Set<string> }[] = [];

    return raw
      .filter(({ post, full }, i) => {
        // ① EXAKT: gleiche URL / gleiches Bild-Ziel / gleicher Text-Präfix
        const imgKey = post.image.split("?")[0];
        const textKey = norm(post.text);
        if (seen.has(post.url) || seen.has(imgKey) || (textKey.length > 12 && seen.has(textKey))) return false;

        // ② BILD + TEXT: dasselbe Motiv UND inhaltlich dieselbe Meldung. Beide Bedingungen
        //    müssen zutreffen — sonst würden die bildgleichen Stellenanzeigen zusammenfallen.
        const hash = hashes[i];
        const w = words(full);
        if (hash) {
          const isDuplicate = kept.some(
            (k) =>
              k.hash !== null &&
              hashDistance(hash, k.hash) <= IMG_MAX_DISTANCE &&
              textSimilarity(w, k.words) >= TEXT_MIN_SIMILARITY,
          );
          if (isDuplicate) return false;
        }

        seen.add(post.url);
        seen.add(imgKey);
        if (textKey.length > 12) seen.add(textKey);
        kept.push({ hash, words: w });
        return true;
      })
      .map(({ post }) => post)
      .slice(0, limit);
  } catch {
    return [];
  }
}

/** "DD.MM.YYYY" → sortierbarer Timestamp (0 bei unparsbar). */
function dateMs(d: string): number {
  const m = d.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  return m ? Date.UTC(Number(m[3]), Number(m[2]) - 1, Number(m[1])) : 0;
}

// GEMISCHTER Social-Feed (Wolfram 22.07.): LinkedIn (Juicer) + Instagram (Elfsight) in EINER
// datumssortierten Liste. Banijay postet vieles PARALLEL auf beiden Kanälen — damit dasselbe
// Motiv nicht doppelt erscheint, wird KANALÜBERGREIFEND dedupliziert.
//
// WARUM TEXT ZUERST: Anders als bei der Juicer-internen Prüfung taugt der Bild-Hash hier NICHT
// als Hauptsignal — Instagram und LinkedIn croppen dieselbe Grafik unterschiedlich (Hochformat
// vs. Landscape), der Average-Hash weicht dann > IMG_MAX_DISTANCE ab. Die CAPTION ist bei
// Reposts dagegen praktisch identisch. Darum: Dublette, wenn der Text stark überlappt
// (Jaccard ≥ CROSS_TEXT_MIN) ODER dieselbe Grafik + ähnlicher Text (Bild ≤ IMG_MAX_DISTANCE
// UND Text ≥ TEXT_MIN_SIMILARITY, fängt umgetextete Reposts desselben Motivs). Bei einem
// Treffer bleibt die PRÄFERIERTE Quelle stehen, der Zwilling fliegt raus.
const PREFER: "instagram" | "linkedin" = "instagram";
const CROSS_TEXT_MIN = 0.5; // Text-Ähnlichkeit, ab der zwei Posts als derselbe gelten

export async function fetchCombinedSocialPosts(limit = 12): Promise<SocialPost[]> {
  const [linkedin, instagram] = await Promise.all([fetchSocialPosts(50), fetchElfsightPosts(50)]);
  const preferred = PREFER === "instagram" ? instagram : linkedin;
  const secondary = PREFER === "instagram" ? linkedin : instagram;

  // Keine Präferenz-Posts (z. B. Elfsight down) → nur die andere Quelle, sortiert.
  if (preferred.length === 0) {
    return [...secondary].sort((a, b) => dateMs(b.date) - dateMs(a.date)).slice(0, limit);
  }

  // Normalisierte Anfangszeile (Reposts teilen oft denselben Aufhänger, danach umgetextet →
  // Jaccard rutscht unter die Schwelle). 28 Zeichen sind spezifisch genug, um NICHT bei
  // generischen Openings verschiedener Posts zu kollidieren.
  const prefixKey = (t: string) => t.toLowerCase().replace(/[^a-z0-9äöüß]/gi, "").slice(0, 28);

  const prefHashes = await Promise.all(preferred.map((p) => imageHash(p.image)));
  const prefWords = preferred.map((p) => words(p.text));
  const prefKeys = preferred.map((p) => prefixKey(p.text));
  const secHashes = await Promise.all(secondary.map((p) => imageHash(p.image)));

  const merged: SocialPost[] = [...preferred];
  secondary.forEach((p, i) => {
    const h = secHashes[i];
    const w = words(p.text);
    const pk = prefixKey(p.text);
    const isDuplicate = preferred.some((_, j) => {
      const textSim = textSimilarity(w, prefWords[j]);
      const sameImage = h !== null && prefHashes[j] !== null && hashDistance(h, prefHashes[j] as string) <= IMG_MAX_DISTANCE;
      const samePrefix = pk.length >= 24 && prefKeys[j] === pk; // gleiche Anfangszeile
      // Gleicher Aufhänger ODER stark überlappender Text → derselbe Post; ODER dasselbe Motiv
      // mit nur ähnlichem Text (fängt umgetextete Reposts desselben Bildes).
      return samePrefix || textSim >= CROSS_TEXT_MIN || (sameImage && textSim >= TEXT_MIN_SIMILARITY);
    });
    if (!isDuplicate) merged.push(p);
  });

  return merged.sort((a, b) => dateMs(b.date) - dateMs(a.date)).slice(0, limit);
}

export async function AlgarveCareerSocialFeed({
  headline,
  subline,
  dark,
  showText,
}: {
  headline?: string;
  subline?: string;
  /** V2-Mood (Task #69): transparent auf dem MoodBackdrop, Typo in Paper. */
  dark?: boolean;
  /** Post-Caption auf der Karte zeigen (Default an = Career; Home schaltet sie aus). */
  showText?: boolean;
} = {}) {
  const posts = await fetchCombinedSocialPosts(); // LinkedIn + Instagram, dublettenbereinigt
  if (posts.length === 0) return null; // Feed nicht verfügbar → Section ausblenden
  return (
    <AlgarveCareerSocialSlider posts={posts} headline={headline} subline={subline} dark={dark} showText={showText} />
  );
}
