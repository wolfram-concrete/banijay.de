import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PagePlaceholderProps {
  eyebrow: string;
  title: string;
  intro: string;
}

/** Markengetreuer Platzhalter, bis die jeweilige Unterseite gebaut ist. */
export function PagePlaceholder({ eyebrow, title, intro }: PagePlaceholderProps) {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-electric pt-28 pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48rem 40rem at 75% 25%, rgba(255,67,112,0.4), transparent 60%)",
        }}
      />
      <div className="shell relative z-10">
        <p className="eyebrow text-bone/60">{eyebrow}</p>
        <h1 className="display mt-5 max-w-[14ch] text-[clamp(3rem,11vw,12rem)] text-bone">
          {title}
        </h1>
        <p className="mt-8 max-w-xl text-lg text-bone/80">{intro}</p>
        <p className="mt-6 inline-block rounded-full glass px-5 py-2 text-sm text-bone/80">
          Diese Seite entsteht gerade.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-bone/80 transition-colors hover:text-bone"
          >
            <ArrowLeft size={16} /> Zurück zur Startseite
          </Link>
        </div>
      </div>
    </section>
  );
}
