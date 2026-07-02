/* eslint-disable @next/next/no-img-element */
import { ArrowUpRight } from "lucide-react";

// #workatBanijay — Social-Feed-Section für die Career-Seite. Zieht die Posts
// server-seitig aus dem Juicer-JSON (derselbe Feed wie die bestehende Live-
// Karriereseite) und rendert sie als eigene, Banijay-gerechte Cards — KEIN
// Fremd-Widget/Script. Bei Fehler wird die Section einfach ausgeblendet.

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const MAGENTA = "#ff4370";

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

type Post = {
  image: string;
  text: string;
  url: string;
  source: string;
  date: string;
};

// HTML aus dem Juicer-`message` sicher als Plain-Text strippen (Tags entfernen,
// gängige Entities dekodieren) und auf eine handliche Länge kürzen.
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

async function fetchPosts(): Promise<Post[]> {
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

  return (
    <section style={{ background: "#f8f7f3", paddingTop: "5.56vw", paddingBottom: "6.94vw" }}>
      <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
        {/* Headline */}
        <div className="mb-[3vw] flex items-end justify-between gap-8 max-[767px]:!mb-[8vw] max-[767px]:!flex-col max-[767px]:!items-start">
          <h2
            className="m-0 max-[767px]:!text-[9vw]"
            style={{ fontFamily: SHARP, fontSize: "4.44vw", lineHeight: "104%", fontWeight: 500, letterSpacing: "-0.139vw", color: INK }}
          >
            #workatBanijay
          </h2>
          <p className="m-0 max-[767px]:!text-[4vw]" style={{ fontSize: "1.25vw", lineHeight: "145%", color: "rgba(14,13,11,0.6)", maxWidth: "34vw" }}>
            Einblicke, Menschen und Momente aus der Banijay-Welt — direkt aus unseren Kanälen.
          </p>
        </div>

        {/* Grid: 3 / 2 / 1 */}
        <div className="grid gap-[1.4vw] md:grid-cols-3 max-[991px]:!grid-cols-2 max-[767px]:!grid-cols-1 max-[767px]:!gap-[5vw]">
          {posts.map((post, i) => (
            <a
              key={`${post.url}-${i}`}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-clip no-underline"
              style={{ background: "#fff", borderRadius: "1.11vw", boxShadow: "0 0.6vw 2vw -0.6vw rgba(0,0,0,0.16)", color: INK }}
            >
              {/* Bild oben — stabiles 4:5-Format */}
              <div className="relative overflow-clip" style={{ aspectRatio: "4 / 5", background: "#e8e6df" }}>
                <img
                  src={post.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Quellenkennzeichnung dezent */}
                <span
                  className="absolute max-[767px]:!text-[2.8vw]"
                  style={{
                    top: "0.9vw",
                    left: "0.9vw",
                    background: "rgba(14,13,11,0.55)",
                    color: "#f8f7f3",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    borderRadius: "999px",
                    padding: "0.3vw 0.8vw",
                    fontFamily: SHARP,
                    fontSize: "0.72vw",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {post.source}
                </span>
              </div>

              {/* Textauszug + Link */}
              <div className="flex flex-1 flex-col justify-between max-[767px]:!p-[5vw]" style={{ padding: "1.4vw", gap: "1vw" }}>
                <p
                  className="m-0 max-[767px]:!text-[3.8vw]"
                  style={{
                    fontFamily: SHARP,
                    fontSize: "1vw",
                    lineHeight: "142%",
                    fontWeight: 500,
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.text}
                </p>
                <div className="flex items-center justify-between" style={{ gap: "1vw" }}>
                  <span className="max-[767px]:!text-[3vw]" style={{ fontSize: "0.8vw", color: "rgba(14,13,11,0.5)", fontFamily: SHARP }}>
                    {post.date}
                  </span>
                  <span
                    className="inline-flex items-center gap-[0.3vw] transition-transform duration-300 group-hover:translate-x-1 max-[767px]:!text-[3.2vw]"
                    style={{ fontFamily: SHARP, fontSize: "0.9vw", fontWeight: 700, color: MAGENTA }}
                  >
                    Ansehen <ArrowUpRight className="h-[0.9vw] w-[0.9vw] max-[767px]:!h-[3.2vw] max-[767px]:!w-[3.2vw]" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
