import Image from "next/image";
import { formats, type FormatItem } from "@/lib/site-data";
import { Reveal } from "@/components/util/Reveal";

function FormatCard({ item }: { item: FormatItem }) {
  return (
    <div className="group relative aspect-[16/10] w-[58vw] shrink-0 overflow-hidden rounded-xl sm:w-[38vw] lg:w-[26rem]">
      <Image
        src={item.image.url}
        alt={item.image.alt}
        fill
        sizes="(min-width: 1024px) 26rem, (min-width: 640px) 38vw, 58vw"
        className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="eyebrow text-magenta-soft">{item.company}</p>
        <h3 className="display mt-1 text-2xl text-bone">{item.title}</h3>
      </div>
    </div>
  );
}

export function FormatWall() {
  const rowA = formats.slice(0, 5);
  const rowB = formats.slice(4); // Überlappung für volleres Band

  return (
    <section className="relative overflow-hidden bg-electric py-24 lg:py-32">
      {/* Übergang in das tiefe Schwarz darunter */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />

      <div className="shell relative z-10">
        <Reveal>
          <p className="eyebrow text-bone/55">Brands & Formate</p>
          <h2 className="display mt-4 max-w-4xl text-[clamp(2.25rem,5.5vw,4.5rem)] text-bone">
            Du kennst die Formate.<br />
            <span className="text-magenta">Jetzt lernst du die Welt dahinter kennen.</span>
          </h2>
          <p className="mt-6 max-w-xl text-bone/70">
            Viele Shows und Entertainment-Momente, die Deutschland kennt,
            entstehen in der Banijay-Welt — über Prime-Time, Reality und Factual
            bis Fiction, Comedy, Digital und Live.
          </p>
        </Reveal>
      </div>

      {/* Laufband 1 */}
      <div className="marquee relative z-10 mt-14 overflow-hidden">
        <div className="marquee-track">
          {[...rowA, ...rowA].map((item, i) => (
            <FormatCard key={`a-${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
      {/* Laufband 2 — Gegenrichtung */}
      <div className="marquee relative z-10 mt-4 overflow-hidden">
        <div className="marquee-track reverse">
          {[...rowB, ...rowB].map((item, i) => (
            <FormatCard key={`b-${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
