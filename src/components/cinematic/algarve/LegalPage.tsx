import type { ReactNode } from "react";

// Rechtstext-Layout (Algarve section_blog-content adaptiert): links eine sticky
// Titel-/Meta-Spalte, rechts der Fließtext in begrenzter Spaltenbreite. Reine
// Server-Komponente. Banijay-Design (Paper/Ink, Sharp-Grotesk).

const SHARP = "var(--font-sharp), sans-serif";

// Rich-Text-Styling via Child-Selektoren — Inhalt bleibt einfaches h2/p/ul/a.
const RICH = [
  "[&_h2]:mt-[3vw] [&_h2]:mb-[1vw] [&_h2]:text-[1.8vw] [&_h2]:font-medium [&_h2]:leading-[120%] [&_h2]:tracking-[-0.03em] [&_h2]:text-[#f8f7f3]",
  "[&_h2:first-child]:mt-0",
  "[&_h3]:mt-[1.8vw] [&_h3]:mb-[0.6vw] [&_h3]:text-[1.25vw] [&_h3]:font-medium [&_h3]:text-[#f8f7f3]",
  "[&_p]:mb-[1vw] [&_p]:text-[1.05vw] [&_p]:leading-[165%] [&_p]:text-[rgba(248,247,243,0.78)]",
  "[&_ul]:mb-[1vw] [&_ul]:pl-[1.2vw] [&_ul]:list-disc [&_li]:mb-[0.4vw] [&_li]:text-[1.05vw] [&_li]:leading-[160%] [&_li]:text-[rgba(248,247,243,0.78)]",
  "[&_a]:text-[#f8f7f3] [&_a]:underline [&_strong]:font-medium [&_strong]:text-[#f8f7f3]",
  "max-[767px]:[&_h2]:!text-[6vw] max-[767px]:[&_h3]:!text-[4.6vw] max-[767px]:[&_p]:!text-[3.8vw] max-[767px]:[&_li]:!text-[3.8vw]",
].join(" ");

export function AlgarveLegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ background: "transparent", fontFamily: SHARP }}>
      <section style={{ paddingTop: "9rem", paddingBottom: "8.33vw" }}>
        <div className="max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
          <div
            className="grid max-[991px]:!grid-cols-1 max-[991px]:!gap-[5vw]"
            style={{ gridTemplateColumns: "5fr 7fr", columnGap: "9.17vw" }}
          >
            {/* Titel + Meta (sticky) */}
            <div className="flex flex-col items-start self-start md:sticky" style={{ top: "8rem", gap: "1.11vw" }}>
              <h1
                className="m-0 uppercase max-[767px]:!text-[11vw]"
                style={{ fontFamily: SHARP, fontSize: "4.44vw", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.139vw", color: "#f8f7f3" }}
              >
                {title}
              </h1>
              {updated && (
                <p
                  className="m-0 uppercase max-[767px]:!text-[2.6vw]"
                  style={{ fontSize: "0.9vw", fontWeight: 700, letterSpacing: "0.052vw", color: "rgba(248,247,243,0.5)" }}
                >
                  {updated}
                </p>
              )}
            </div>

            {/* Fließtext */}
            <div className={`${RICH} max-w-[47.22vw] max-[991px]:!max-w-full`}>{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
