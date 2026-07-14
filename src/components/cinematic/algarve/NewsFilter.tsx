"use client";

import { useMemo, useState } from "react";
import { NewsGrid } from "./NewsGrid";
import type { FeedItem, FeedRubrik } from "@/data/feed";

// News-Rubriken: News · Primetime · Podcast (bündelt Podcast + Wolter Talks) · Social.
// Die Social-Posts sind bereits in die Liste eingemischt (nach Datum) — der Filter zeigt
// wahlweise nur eine Rubrik.
const RUBRIKEN = ["Alle", "Presse", "Primetime", "Podcast", "Social", "Marcus Wolter"] as const;

const SHARP = "var(--font-sharp), sans-serif";

export function NewsFilter({ items }: { items: FeedItem[] }) {
  const [rubrik, setRubrik] = useState<string>("Alle");

  const filtered = useMemo(
    () => (rubrik === "Alle" ? items : items.filter((it) => it.rubrik === (rubrik as FeedRubrik))),
    [items, rubrik],
  );

  return (
    <>
      {/* Rubrik-Filter — Chip-Optik + mittelachsig, global gleich zur Companies-
          Section auf der Home (Wolfram 14.07.). */}
      <div className="mb-8 flex flex-wrap justify-center gap-2.5 md:gap-3">
        {RUBRIKEN.map((r) => {
          const active = r === rubrik;
          return (
            <button
              key={r}
              type="button"
              onClick={() => setRubrik(r)}
              aria-pressed={active}
              className={`inline-flex items-center gap-2 rounded-[6px] border px-5 py-2.5 text-sm font-medium transition-colors duration-200 max-[767px]:!px-4 max-[767px]:!py-2 max-[767px]:!text-[3.6vw] ${
                active
                  ? "border-[#ff4370] bg-[#ff4370] text-[#f8f7f3]"
                  : "border-[rgba(248,247,243,0.18)] bg-transparent text-[#f8f7f3] hover:border-[#f8f7f3]"
              }`}
              style={{ fontFamily: SHARP }}
            >
              {r}
            </button>
          );
        })}
      </div>

      {/* Grid remountet bei Rubrikwechsel (sauberer Reveal + Reset „Weitere laden") */}
      <NewsGrid key={rubrik} items={filtered} />
    </>
  );
}
