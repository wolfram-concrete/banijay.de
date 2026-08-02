"use client";

import { ArrowUpRight } from "lucide-react";
import { CAREER_JOBS } from "@/data/careerJobs";
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

export function AlgarveCareerJobsPreview() {
  const locale = useLocale();
  const copy = copyFor(locale);
  // Kuratierte Vorschau: Desktop zeigt ~2/3, Mobile etwa die Hälfte der Einträge.
  // Die über den Mobile-Count hinausgehenden Zeilen werden mobil ausgeblendet.
  const total = CAREER_JOBS.length;
  const desktopCount = Math.max(3, Math.ceil((total * 2) / 3));
  const mobileCount = Math.max(3, Math.ceil(total / 2));
  const titleEn: Record<string, string> = {
    "(Senior) Artist Manager (w/m/d)": "(Senior) Artist Manager (all genders)",
    "Eventmanager (w/m/d)": "Event Manager (all genders)",
    "Jungredakteur (w/m/d)": "Junior Editor (all genders)",
    "Werkstudent Video Content Creation / Video Editing (w/m/d)": "Working Student — Video Content Creation / Editing (all genders)",
    "Lead Technical Facility & Studio Service (m/w/d)": "Lead Technical Facility & Studio Service (all genders)",
    "Freelancer Licht / Ton / Rigging – Veranstaltungstechnik (m/w/d)": "Freelance Lighting / Sound / Rigging Technician (all genders)",
    "Business Unit Lead Sales & Brand Partnerships (w/m/d)": "Business Unit Lead Sales & Brand Partnerships (all genders)",
    "Werkstudent Social Media Redaktion (w/m/d)": "Working Student — Social Media Editorial (all genders)",
    "Ausbildung zur Fachkraft für Veranstaltungstechnik": "Apprenticeship — Event Technology Specialist",
  };
  const workTimeEn: Record<string, string> = { Vollzeit: "Full-time", Werkstudent: "Working student", "Freie Mitarbeit": "Freelance", Ausbildung: "Apprenticeship" };
  const jobs = CAREER_JOBS.slice(0, desktopCount).map((job) => locale === "en" ? {
    ...job,
    title: titleEn[job.title] ?? job.title,
    location: job.location === "Köln" ? "Cologne" : job.location,
    workTime: workTimeEn[job.workTime] ?? job.workTime,
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
          {jobs.map((job, i) => (
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
