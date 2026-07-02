"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SHARP = "var(--font-sharp), sans-serif";
const INK = "#0e0d0b";
const MAGENTA = "#ff4370";

export type SocialPost = {
  image: string;
  text: string;
  url: string;
  source: string;
  date: string;
};

function Card({ post }: { post: SocialPost }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex shrink-0 flex-col overflow-clip no-underline max-[767px]:!w-[78vw]"
      style={{ width: "26vw", background: "#fff", borderRadius: "1.11vw", boxShadow: "0 0.6vw 2vw -0.6vw rgba(0,0,0,0.16)", color: INK }}
    >
      <div className="relative overflow-clip" style={{ aspectRatio: "4 / 5", background: "#e8e6df" }}>
        <img src={post.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <span
          className="absolute max-[767px]:!text-[2.8vw]"
          style={{ top: "0.9vw", left: "0.9vw", background: "rgba(14,13,11,0.55)", color: "#f8f7f3", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", borderRadius: "999px", padding: "0.3vw 0.8vw", fontFamily: SHARP, fontSize: "0.72vw", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}
        >
          {post.source}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between max-[767px]:!p-[5vw]" style={{ padding: "1.4vw", gap: "1vw" }}>
        <p
          className="m-0 max-[767px]:!text-[3.8vw]"
          style={{ fontFamily: SHARP, fontSize: "1vw", lineHeight: "142%", fontWeight: 500, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}
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
  );
}

export function AlgarveCareerSocialSlider({ posts }: { posts: SocialPost[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!window.matchMedia("(min-width: 768px)").matches) return; // Desktop: pinned horizontal
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tr = track.current;
      if (!tr) return;

      // Horizontale Distanz = Track-Überhang. Beim Scrollen wird die Section gepinnt
      // und der Track von links nach rechts durchgescrubbt, bis alle Cards da waren.
      const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth + window.innerWidth * 0.04);
      gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-clip" style={{ background: "#f8f7f3", paddingTop: "5.56vw", paddingBottom: "5.56vw" }}>
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        {/* Headline */}
        <div className="mb-[3vw] flex items-end justify-between gap-8 max-[767px]:!mb-[8vw] max-[767px]:!flex-col max-[767px]:!items-start">
          <h2 className="m-0 max-[767px]:!text-[9vw]" style={{ fontFamily: SHARP, fontSize: "4.44vw", lineHeight: "104%", fontWeight: 500, letterSpacing: "-0.139vw", color: INK }}>
            #workatBanijay
          </h2>
          <p className="m-0 max-[767px]:!text-[4vw]" style={{ fontSize: "1.25vw", lineHeight: "145%", color: "rgba(14,13,11,0.6)", maxWidth: "34vw" }}>
            Einblicke, Menschen und Momente aus der Banijay-Welt — direkt aus unseren Kanälen.
          </p>
        </div>
      </div>

      {/* Track: Desktop wird gepinnt horizontal gescrubbt; Mobile = nativer Swipe. */}
      <div
        ref={track}
        className="flex w-max max-[767px]:!w-full max-[767px]:overflow-x-auto max-[767px]:[scrollbar-width:none] max-[767px]:[&::-webkit-scrollbar]:hidden max-[767px]:snap-x"
        style={{ gap: "1.4vw", paddingLeft: "2vw", paddingRight: "2vw" }}
      >
        {posts.map((post, i) => (
          <div key={`${post.url}-${i}`} className="max-[767px]:snap-start">
            <Card post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}
