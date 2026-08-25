import type { Metadata } from "next";
import { AlgarveHome } from "@/components/cinematic/AlgarveHome";
import { NewsSections } from "@/components/cinematic/algarve/NewsSections";
import { fetchCombinedSocialPosts } from "@/components/cinematic/algarve/CareerSocialFeed";
import { mergeFeed } from "@/data/feed";
import { NEWS_EN } from "@/data/news.en";

export const metadata: Metadata = {
  title: { absolute: "News & Press | Banijay Germany" },
  description: "News, press releases and stories from across Banijay Germany.",
  alternates: { canonical: "/en/news", languages: { de: "/news", en: "/en/news", "x-default": "/news" } },
};

export default async function NewsPageEn() {
  const social = await fetchCombinedSocialPosts(30);
  const feed = mergeFeed(NEWS_EN, social, "en");

  return (
    <>
      <AlgarveHome variant="companies" frame3="/hero-v2/frame-3-news.webp" entryAnimation="direct" statementKey="news" parallaxExit />
      <section className="py-20 lg:py-28" style={{ background: "transparent" }}>
        <div className="mx-auto w-full px-6 max-[767px]:!px-6 lg:px-[2.5vw]" style={{ maxWidth: "1840px" }}>
          <NewsSections items={feed} />
        </div>
      </section>
    </>
  );
}
