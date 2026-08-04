import { ArrowUpRight } from "lucide-react";
import type { NewsBodyBlock } from "@/data/news";

const SHARP = "var(--font-sharp), sans-serif";
const PAPER = "#f8f7f3";
const MEDIUM = "rgba(248,247,243,0.75)";

const paragraphStyle = {
  fontFamily: SHARP,
  fontSize: "1.39vw",
  lineHeight: "150%",
  color: MEDIUM,
  marginTop: 0,
  marginBottom: "1.11vw",
} as const;

function HighlightedText({ text, highlights = [] }: { text: string; highlights?: string[] }) {
  const terms = [...new Set(highlights)].filter(Boolean).sort((a, b) => b.length - a.length);
  if (terms.length === 0) return text;

  const escaped = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");
  const highlighted = new Set(terms);

  return text.split(pattern).map((part, index) =>
    highlighted.has(part) ? (
      <strong key={`${part}-${index}`} style={{ color: PAPER, fontWeight: 600 }}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function NewsArticleBody({ blocks }: { blocks: NewsBodyBlock[] }) {
  return blocks.map((block, index) => {
    if (typeof block === "string" || block.type === "paragraph") {
      const text = typeof block === "string" ? block : block.text;
      return (
        <p
          key={index}
          className="max-[767px]:!mb-[4vw] max-[767px]:!text-[3.8vw]"
          style={{ ...paragraphStyle, whiteSpace: "pre-line" }}
        >
          <HighlightedText text={text} highlights={typeof block === "string" ? undefined : block.highlights} />
        </p>
      );
    }

    if (block.type === "list") {
      return (
        <ul
          key={index}
          className="list-disc max-[767px]:!mb-[6vw] max-[767px]:!pl-[6vw] max-[767px]:!text-[3.8vw]"
          style={{ ...paragraphStyle, paddingLeft: "1.6vw", marginBottom: "1.67vw" }}
        >
          {block.items.map((item) => (
            <li key={item} style={{ marginBottom: "0.55vw" }}>
              <HighlightedText text={item} highlights={block.highlights} />
            </li>
          ))}
        </ul>
      );
    }

    if (block.type === "heading") {
      return (
        <h2
          key={index}
          className="max-[767px]:!mb-[3vw] max-[767px]:!mt-[9vw] max-[767px]:!text-[6vw]"
          style={{
            fontFamily: SHARP,
            fontSize: "2vw",
            lineHeight: "120%",
            fontWeight: 500,
            color: PAPER,
            marginTop: "2.78vw",
            marginBottom: "1.11vw",
          }}
        >
          {block.text}
        </h2>
      );
    }

    if (block.type === "quote") {
      return (
        <blockquote
          key={index}
          className="max-[767px]:!my-[8vw] max-[767px]:!pl-[5vw]"
          style={{ borderLeft: "3px solid #ff4370", margin: "2.22vw 0", paddingLeft: "1.67vw" }}
        >
          <p
            className="max-[767px]:!text-[4vw]"
            style={{ fontFamily: SHARP, fontSize: "1.45vw", lineHeight: "140%", fontWeight: 400, color: PAPER, margin: "0 0 0.9vw" }}
          >
            <HighlightedText text={block.attribution} highlights={block.attributionHighlight ? [block.attributionHighlight] : undefined} />:
          </p>
          {block.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-[767px]:!mb-[4vw] max-[767px]:!text-[3.8vw]"
              style={{ ...paragraphStyle, fontStyle: "italic" }}
            >
              „{paragraph}“
            </p>
          ))}
        </blockquote>
      );
    }

    return (
      <a
        key={index}
        href={block.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-[2.22vw] inline-flex items-center gap-2 text-[#ff4370] underline underline-offset-4 max-[767px]:!mb-[8vw] max-[767px]:!text-[3.8vw]"
        style={{ fontFamily: SHARP, fontSize: "1.39vw", fontWeight: 500 }}
      >
        {block.label}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    );
  });
}
