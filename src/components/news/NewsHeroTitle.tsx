const SHARP = "var(--font-sharp), sans-serif";

/** Einheitliche H1-Stufe für alle deutschen und englischen News-Detailseiten. */
export function NewsHeroTitle({ title }: { title: string }) {
  return (
    <h1
      className="m-0 uppercase max-[767px]:!text-[7.2vw]"
      style={{
        fontFamily: SHARP,
        fontSize: "clamp(2.25rem, 3.9vw, 4.5rem)",
        lineHeight: "105%",
        fontWeight: 500,
        letterSpacing: "-0.139vw",
        textWrap: "balance",
      }}
    >
      {title}
    </h1>
  );
}
