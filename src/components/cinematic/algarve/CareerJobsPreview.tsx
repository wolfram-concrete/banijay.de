import { ArrowUpRight } from "lucide-react";
import { CAREER } from "@/data/career";
import { CAREER_JOBS } from "@/data/careerJobs";

// Jobvorschau (Algarve WorksB-nah): große Headline + Intro + CTA, darunter eine
// ruhige vertikale Liste aktueller Stellen. Jede Zeile ist ein externer
// Softgarden-Link (neuer Tab): Titel links, Company/Standort/Arbeitszeit rechts.

const SHARP = "var(--font-sharp), sans-serif";
const META = {
  fontFamily: SHARP,
  fontSize: "0.9vw",
  fontWeight: 700,
  letterSpacing: "0.052vw",
  textTransform: "uppercase",
} as const;

export function AlgarveCareerJobsPreview() {
  return (
    <section id="jobs" style={{ background: "#f8f7f3", paddingTop: "5.56vw", paddingBottom: "5.56vw" }}>
      <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
        {/* Kopf */}
        <div
          className="flex items-end justify-between gap-8 max-[767px]:!flex-col max-[767px]:!items-start"
          style={{ marginBottom: "2.8vw" }}
        >
          <div className="max-w-[47vw] max-[767px]:!max-w-full">
            <h2
              className="m-0 uppercase max-[767px]:!text-[8vw]"
              style={{ fontFamily: SHARP, fontSize: "3.4vw", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.12vw", color: "#0e0d0b" }}
            >
              {CAREER.jobs.headline}
            </h2>
            <p
              className="max-[767px]:!text-[4vw]"
              style={{ marginTop: "1.11vw", fontSize: "1.25vw", lineHeight: "145%", color: "rgba(0,0,0,0.64)" }}
            >
              {CAREER.jobs.text}
            </p>
          </div>
          <a
            href={CAREER.jobs.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0e0d0b] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#ff4370]"
          >
            {CAREER.jobs.cta.text} <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Liste */}
        <div className="flex flex-col">
          {CAREER_JOBS.map((job) => (
            <a
              key={job.url}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${job.title} bei ${job.company} — in neuem Tab öffnen`}
              className="group flex items-center justify-between text-[#0e0d0b] no-underline transition-colors hover:text-[#ff4370] max-[767px]:!flex-col max-[767px]:!items-start max-[767px]:!gap-3"
              style={{
                gap: "2vw",
                paddingTop: "1.94vw",
                paddingBottom: "1.94vw",
                borderTop: "0.08vw solid rgba(0,0,0,0.14)",
              }}
            >
              <span
                className="transition-transform duration-500 group-hover:translate-x-2 max-[767px]:!text-[5.2vw]"
                style={{ fontFamily: SHARP, fontSize: "1.7vw", lineHeight: "112%", fontWeight: 500 }}
              >
                {job.title}
              </span>
              <span className="flex shrink-0 items-center max-[767px]:!flex-wrap" style={{ gap: "1.11vw" }}>
                <span className="flex items-center text-black/60 transition-colors group-hover:text-[#ff4370] max-[767px]:!text-[2.8vw]" style={{ gap: "0.83vw", ...META }}>
                  <span>{job.company}</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{job.location}</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{job.workTime}</span>
                </span>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
