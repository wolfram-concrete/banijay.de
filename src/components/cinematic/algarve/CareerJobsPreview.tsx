"use client";

import { ArrowUpRight } from "lucide-react";
import type { CareerJob } from "@/data/careerJobs";
import { useLocale } from "@/i18n/config";
import { copyFor } from "@/i18n/copy";

// Jobvorschau (Algarve WorksB-nah): große Headline + Intro, darunter eine ruhige
// vertikale Liste aktueller Stellen. Jede Zeile ist ein externer
// Softgarden-Link (neuer Tab): Titel links, Company/Standort/Arbeitszeit rechts.

const SHARP = "var(--font-sharp), sans-serif";
const META = {
  fontFamily: SHARP,
  fontSize: "0.9vw",
  fontWeight: 700,
  letterSpacing: "0.052vw",
  textTransform: "uppercase",
} as const;

export function AlgarveCareerJobsPreview({ jobs }: { jobs: CareerJob[] }) {
  const locale = useLocale();
  const copy = copyFor(locale);
  // Automatische API-Vorschau: Desktop zeigt ~2/3, Mobile etwa die Hälfte.
  // Die über den Mobile-Count hinausgehenden Zeilen werden mobil ausgeblendet.
  const total = jobs.length;
  const desktopCount = Math.max(3, Math.ceil((total * 2) / 3));
  const mobileCount = Math.max(3, Math.ceil(total / 2));
  const visibleJobs = jobs.slice(0, desktopCount).map((job) => locale === "en" ? {
    ...job,
    location: job.location === "Köln" ? "Cologne" : job.location,
  } : job);
  return (
    <section id="jobs" style={{ background: "transparent", paddingTop: "5.56vw", paddingBottom: "5.56vw" }}>
      <div className="mx-auto max-[767px]:!px-[3vw]" style={{ paddingLeft: "2vw", paddingRight: "2vw", maxWidth: "1440px" }}>
        {/* Kopf */}
        <div
          className="flex items-end justify-between gap-8 max-[767px]:!flex-col max-[767px]:!items-start"
          style={{ marginBottom: "2.8vw" }}
        >
          <div className="max-w-[47vw] max-[767px]:!max-w-full">
            <h2
              className="m-0 uppercase max-[767px]:!text-[8vw]"
              style={{ fontFamily: SHARP, fontSize: "3.4vw", lineHeight: "108%", fontWeight: 500, letterSpacing: "-0.12vw", color: "#f8f7f3" }}
            >
              {copy.career.jobsHeadline}
            </h2>
            <p
              className="max-[767px]:!text-[4vw]"
              style={{ marginTop: "1.11vw", fontSize: "1.25vw", lineHeight: "145%", color: "rgba(248,247,243,0.64)" }}
            >
              {copy.career.jobsText}
            </p>
          </div>
        </div>

        {/* Liste (gekürzt: Mobile ~halbiert via Blenden der Extra-Zeilen) */}
        <div className="flex flex-col">
          {visibleJobs.map((job, i) => (
            <a
              key={job.url}
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.career.jobAria(job.title, job.company)}
              className={`group flex items-center justify-between text-[#f8f7f3] no-underline transition-colors hover:text-[#ff4370] max-[767px]:!flex-col max-[767px]:!items-start max-[767px]:!gap-3 ${i >= mobileCount ? "max-[767px]:!hidden" : ""}`}
              style={{
                gap: "2vw",
                paddingTop: "1.94vw",
                paddingBottom: "1.94vw",
                borderTop: "0.08vw solid rgba(248,247,243,0.14)",
              }}
            >
              <span
                className="transition-transform duration-500 group-hover:translate-x-2 max-[767px]:!text-[5.2vw]"
                style={{ fontFamily: SHARP, fontSize: "1.7vw", lineHeight: "112%", fontWeight: 500 }}
              >
                {job.title}
              </span>
              <span className="flex shrink-0 items-center max-[767px]:!flex-wrap" style={{ gap: "1.11vw" }}>
                <span className="flex items-center text-[#f8f7f3]/60 transition-colors group-hover:text-[#ff4370] max-[767px]:!text-[2.8vw]" style={{ gap: "0.83vw", ...META }}>
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
