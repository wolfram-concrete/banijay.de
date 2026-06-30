import { Reveal } from "@/components/util/Reveal";

export function Statement() {
  return (
    <section className="bg-bone py-28 lg:py-40">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-graphite/50">Die Banijay-Welt</p>
          <p className="display mt-8 max-w-[20ch] text-[clamp(2.5rem,8vw,9.5rem)] text-graphite">
            Wir bei Banijay sind ein Verbund der{" "}
            <span className="text-magenta">besten unabhängigen</span>{" "}
            Entertainment-Produzent:innen und Unternehmer:innen.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
