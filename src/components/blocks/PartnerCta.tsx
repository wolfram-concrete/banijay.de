import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/util/Reveal";

export function PartnerCta() {
  return (
    <section className="grain relative overflow-hidden bg-electric py-28 lg:py-40">
      {/* Lichtwelt */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50rem 40rem at 80% 20%, rgba(255,67,112,0.5), transparent 60%)",
        }}
      />
      <div className="shell relative z-10">
        <Reveal>
          <p className="eyebrow text-bone/60">Partner</p>
          <h2 className="display mt-6 max-w-[16ch] text-[clamp(2.75rem,9vw,11rem)] text-bone">
            Let&apos;s create what{" "}
            <span className="text-magenta">people talk about.</span>
          </h2>
          <p className="mt-8 max-w-xl text-bone/80">
            Ob Sender, Plattform, Marke, Talent oder kreativer Partner: Wer
            Entertainment mit Wirkung entwickeln will, findet in Banijay Germany
            eine Welt aus Erfahrung, Reichweite und Produktionskraft.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-bone px-8 py-4 text-base font-medium text-ink transition-transform hover:scale-[1.03]"
          >
            Kontakt aufnehmen <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
