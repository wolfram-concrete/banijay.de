/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { NEWS, getNewsBySlug } from "@/data/news";
import { NewsArticleBody } from "@/components/news/NewsArticleBody";
import { NewsHeroTitle } from "@/components/news/NewsHeroTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, germanDateToIso, newsPageJsonLd } from "@/lib/seo";

// section_blog-post (Algarve/ByQ cms-page-2, adaptiert): Hero-Bild mit Overlay +
// Tags/Titel, darunter Content-Grid (sticky Info-Spalte + Fließtext), Divider und
// „Mehr News". Banijay-Design: Paper/Ink, Sharp-Grotesk, Magenta-Akzent.

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";
// Dark-Mood (V2): Typo hell auf globalem MoodBackdrop — ehemals INK (#0e0d0b) → PAPER.
const INK = "#f8f7f3";
const MEDIUM = "rgba(248,247,243,0.75)";

const LABEL = {
  fontFamily: SHARP,
  fontSize: "0.9vw",
  lineHeight: "100%",
  fontWeight: 700,
  letterSpacing: "0.052vw",
  textTransform: "uppercase",
} as const;

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return { title: "News" };
  const url = `/news/${slug}`;
  const image = absoluteUrl(item.img);
  return {
    title: item.title,
    description: item.lead,
    alternates: {
      canonical: url,
      languages: { de: `/news/${slug}`, en: `/en/news/${slug}`, "x-default": `/news/${slug}` },
    },
    openGraph: {
      type: "article",
      title: item.title,
      description: item.lead,
      url,
      siteName: "Banijay Germany",
      locale: "de_DE",
      alternateLocale: ["en_GB"],
      publishedTime: germanDateToIso(item.date),
      images: [{ url: image, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.lead,
      images: [image],
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const more = NEWS.filter((n) => n.slug !== slug).slice(0, 3);
  const isWideImage = item.imageVariant === "wide";

  return (
    <div style={{ background: "transparent" }}>
      <JsonLd id="news-article-structured-data" data={newsPageJsonLd(item, "de")} />
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: "7rem", paddingBottom: "2.22vw" }}>
        <div className="max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
          <div
            className="relative flex items-end overflow-clip max-[767px]:!p-[8vw]"
            style={{
              padding: isWideImage ? "3.33vw" : "22vw 3.33vw 3.33vw",
              aspectRatio: isWideImage ? "40 / 17" : undefined,
              minHeight: isWideImage ? "min(40.8vw, 780px)" : undefined,
              background: "#09060d",
              color: PAPER,
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              className={`absolute inset-0 h-full w-full ${isWideImage ? "object-contain object-top" : "object-cover"}`}
            />
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.6)" }} />
            <div className="relative flex max-w-[74vw] flex-col items-start" style={{ gap: "1.11vw", zIndex: 3 }}>
              <div className="flex items-center" style={{ gap: "0.83vw" }}>
                <span style={{ ...LABEL, fontSize: "1vw" }} className="max-[767px]:!text-[2.9vw]">
                  {item.category}
                </span>
                <span style={{ ...LABEL, fontSize: "1vw", opacity: 0.7 }} className="max-[767px]:!text-[2.9vw]">
                  {item.date}
                </span>
              </div>
              <NewsHeroTitle title={item.title} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: "2.22vw", paddingBottom: "5.56vw" }}>
        <div className="max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
          <div
            className="grid max-[767px]:!grid-cols-1 max-[767px]:!gap-[8vw]"
            style={{ gridTemplateColumns: "5fr 7fr", columnGap: "9.17vw", rowGap: "3vw" }}
          >
            {/* Sticky Info */}
            <div
              className="flex flex-col items-start self-start max-[767px]:!static max-[767px]:!flex-row max-[767px]:!flex-wrap max-[767px]:!gap-[6vw] md:sticky"
              style={{ gap: "2.22vw", top: "7rem" }}
            >
              {[
                { k: "Kategorie", v: item.category },
                { k: "Veröffentlicht", v: item.date },
                { k: "Autor", v: item.author },
              ].map((row) => (
                <div key={row.k} className="flex flex-col items-start" style={{ gap: "1.11vw" }}>
                  <div style={{ ...LABEL, color: MEDIUM }} className="max-[767px]:!text-[2.6vw]">
                    {row.k}
                  </div>
                  <div
                    className="max-[767px]:!text-[3.6vw]"
                    style={{ fontFamily: SHARP, fontSize: "1.39vw", lineHeight: "135%", color: INK }}
                  >
                    {row.v}
                  </div>
                </div>
              ))}
              {item.download && (
                <a
                  href={item.download.href}
                  download={item.download.filename}
                  className="inline-flex items-center gap-2 rounded-[6px] border border-[#f8f7f3] px-4 py-3 text-[#f8f7f3] no-underline transition-colors duration-200 hover:border-[#ff4370] hover:bg-[#ff4370] max-[767px]:!text-[3.4vw]"
                  style={{ fontFamily: SHARP, fontSize: "1.05vw", fontWeight: 500 }}
                >
                  <Download className="h-4 w-4" />
                  {item.download.label}
                </a>
              )}
            </div>

            {/* Fließtext */}
            <div style={{ maxWidth: "47.22vw" }} className="max-[767px]:!max-w-full">
              <p
                className="m-0 max-[767px]:!text-[4.4vw]"
                style={{ fontFamily: SHARP, fontSize: "1.94vw", lineHeight: "132%", fontWeight: 500, color: INK, marginBottom: "1.67vw" }}
              >
                {item.lead}
              </p>
              <NewsArticleBody blocks={item.body} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div style={{ height: "1px", background: "rgba(248,247,243,0.16)" }} />
      </div>

      {/* ── Mehr News ────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: "5.56vw", paddingBottom: "8.33vw" }}>
        <div className="max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
          <h2
            className="m-0 uppercase max-[767px]:!text-[9vw]"
            style={{ fontFamily: SHARP, fontSize: "4.44vw", fontWeight: 500, letterSpacing: "-0.139vw", marginBottom: "2.22vw", color: INK }}
          >
            Mehr News
          </h2>
          <div className="grid grid-cols-3 max-[767px]:!grid-cols-1" style={{ gap: "1vw" }}>
            {more.map((n) => (
              <Link
                key={n.slug}
                href={`/news/${n.slug}`}
                className="group relative flex items-end overflow-clip no-underline max-[767px]:!p-[6vw]"
                style={{ padding: "44% 2.22vw 2.22vw", color: PAPER }}
              >
                <img
                  src={n.img}
                  alt={n.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.45)" }} />
                <div
                  className="relative flex flex-col items-start"
                  style={{
                    gap: "1.11vw",
                    zIndex: 3,
                    padding: "1.67vw",
                    background: "rgba(0,0,0,0.28)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxShadow: "inset 0 0 24px 0 rgba(248,247,243,0.08), inset 0 6px 12px 0 rgba(248,247,243,0.16)",
                  }}
                >
                  <span style={{ ...LABEL }} className="max-[767px]:!text-[2.9vw]">
                    {n.category}
                  </span>
                  <div
                    className="max-[767px]:!text-[5.5vw]"
                    style={{ fontFamily: SHARP, fontSize: "2vw", lineHeight: "112%", fontWeight: 500 }}
                  >
                    {n.title}
                  </div>
                  <span
                    className="inline-flex items-center max-[767px]:!text-[3.4vw]"
                    style={{ fontFamily: SHARP, fontSize: "1.05vw", gap: "0.4vw" }}
                  >
                    Artikel lesen <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
