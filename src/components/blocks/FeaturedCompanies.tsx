import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredCompanies } from "@/lib/site-data";
import { Reveal } from "@/components/util/Reveal";

export function FeaturedCompanies() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-bone/50">Featured Companies</p>
          <h2 className="display mt-4 max-w-4xl text-[clamp(2rem,5vw,4rem)] text-bone">
            Unsere Companies sind die{" "}
            <span className="text-magenta">kreativen Motoren</span> von Banijay
            Germany.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCompanies.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 90}>
              <Link
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-full overflow-hidden rounded-2xl border border-white/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={c.image.url}
                    alt={c.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-medium text-bone">{c.name}</h3>
                    <ArrowUpRight
                      size={20}
                      className="shrink-0 text-bone/50 transition-all group-hover:text-magenta group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-bone/65">{c.profile}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 rounded-full border border-bone/25 px-7 py-3 text-sm text-bone transition-colors hover:bg-bone/10"
          >
            Alle Companies entdecken <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
