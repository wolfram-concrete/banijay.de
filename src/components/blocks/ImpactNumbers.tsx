import Image from "next/image";
import { stats } from "@/lib/site-data";
import { Reveal } from "@/components/util/Reveal";

// Cinematische Hintergründe (alternierend) für die Zahlen-Sektionen
const backgrounds = [
  "/visuals/v-purple-portrait.jpeg",
  "/visuals/numbers-bg.png",
  "/visuals/v-projection.png",
  "/visuals/section-bg.png",
  "/visuals/v-orb-portrait.png",
];

export function ImpactNumbers() {
  return (
    <section className="relative bg-ink">
      <div className="shell py-24 lg:py-28">
        <Reveal>
          <p className="eyebrow text-bone/50">Impact in Zahlen</p>
          <h2 className="display mt-4 max-w-3xl text-[clamp(2rem,5vw,4rem)] text-bone">
            Entertainment mit <span className="text-magenta">messbarer Wirkung.</span>
          </h2>
        </Reveal>
      </div>

      <div className="flex flex-col">
        {stats.map((stat, i) => (
          <div
            key={stat.id}
            className="grain relative flex min-h-[80svh] items-center overflow-hidden border-t border-white/10"
          >
            {/* Hintergrundbild */}
            <Image
              src={backgrounds[i % backgrounds.length]}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            {/* Color-Block-Verlauf (Banijay-Blau ↔ Schwarz) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(75deg, rgba(5,5,7,0.92) 30%, rgba(1,3,180,0.55) 100%)"
                    : "linear-gradient(285deg, rgba(5,5,7,0.92) 30%, rgba(1,3,180,0.55) 100%)",
              }}
            />

            <div className="shell relative z-10">
              <div className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                {/* Riesenzahl */}
                <Reveal className="[direction:ltr]">
                  <div className="display leading-[0.7] text-magenta text-[clamp(6rem,22vw,20rem)]">
                    {stat.value}
                  </div>
                </Reveal>
                {/* Text */}
                <Reveal className="[direction:ltr] max-w-lg" delay={120}>
                  <h3 className="text-2xl font-medium text-bone md:text-3xl">{stat.label}</h3>
                  <p className="mt-5 leading-relaxed text-bone/70">{stat.body}</p>
                </Reveal>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
