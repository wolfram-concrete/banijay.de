"use client";

import { useMemo, useState } from "react";
import { NewsGrid } from "./NewsGrid";
import type { FeedItem, FeedRubrik } from "@/data/feed";

// News-Rubriken: News · Primetime · Podcast (bündelt Podcast + Wolter Talks) · Social.
// Die Social-Posts sind bereits in die Liste eingemischt (nach Datum) — der Filter zeigt
// wahlweise nur eine Rubrik.
const RUBRIKEN = ["Alle", "News", "Primetime", "Podcast", "Social"] as const;

const SHARP = "var(--font-sharp), sans-serif";

export function NewsFilter({ items }: { items: FeedItem[] }) {
  const [rubrik, setRubrik] = useState<string>("Alle");

  const counts = useMemo(() => {
    const map: Record<string, number> = { Alle: items.length, News: 0, Primetime: 0, Podcast: 0, Social: 0 };
    items.forEach((it) => (map[it.rubrik] += 1));
    return map;
  }, [items]);

  const filtered = useMemo(
    () => (rubrik === "Alle" ? items : items.filter((it) => it.rubrik === (rubrik as FeedRubrik))),
    [items, rubrik],
  );

  return (
    <>
      {/* Rubrik-Filter */}
      <div className="mb-10 flex flex-wrap gap-2.5 md:gap-3">
        {RUBRIKEN.map((r) => {
          const active = r === rubrik;
          return (
            <button
              key={r}
              type="button"
              onClick={() => setRubrik(r)}
              aria-pressed={active}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200 max-[767px]:!px-4 max-[767px]:!py-2 max-[767px]:!text-[3.6vw] ${
                active
                  ? "border-[#ff4370] bg-[#ff4370] text-[#f8f7f3]"
                  : "border-[rgba(14,13,11,0.18)] bg-transparent text-[#0e0d0b] hover:border-[#0e0d0b]"
              }`}
              style={{ fontFamily: SHARP }}
            >
              {r}
              <span className={active ? "text-white/70" : "text-[rgba(14,13,11,0.4)]"}>{counts[r]}</span>
            </button>
          );
        })}
      </div>

      {/* Grid remountet bei Rubrikwechsel (sauberer Reveal + Reset „Weitere laden") */}
      <NewsGrid key={rubrik} items={filtered} />
    </>
  );
}
