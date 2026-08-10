import "server-only";

import {
  ALL_JOBS_URL,
  FALLBACK_CAREER_JOBS,
  type CareerJob,
} from "@/data/careerJobs";

export type CareerLocale = "de" | "en";

const API_BASE = "https://api.softgarden.io/api/rest";
const REVALIDATE_SECONDS = 15 * 60;

// Öffentliche Frontend-API-v3-Client-IDs. Laut softgarden ist für diese
// lesende Career-Website-Anbindung ausdrücklich kein Client-Secret nötig.
const CLIENTS = [
  {
    key: "banijay-germany",
    label: "Banijay Germany / Banijay Germany Live",
    clientId:
      process.env.SOFTGARDEN_BANIJAY_GERMANY_CLIENT_ID ??
      "c976d931-5b2b-4e97-b420-d55d99a1875a",
  },
  {
    key: "brainpool",
    label: "BRAINPOOL TV GmbH",
    clientId:
      process.env.SOFTGARDEN_BRAINPOOL_CLIENT_ID ??
      "872f22df-6011-41c3-89be-b811fc160174",
  },
  {
    key: "endemolshine",
    label: "Endemol Shine Germany",
    clientId:
      process.env.SOFTGARDEN_ENDEMOLSHINE_CLIENT_ID ??
      "c5c5aa40-590b-42f4-9140-b3eedabf12fa",
  },
  {
    key: "banijay-media",
    label: "Banijay Media Germany",
    clientId:
      process.env.SOFTGARDEN_BANIJAY_MEDIA_CLIENT_ID ??
      "2a5c2edd-27b8-405e-ac9d-d8787e2745e8",
  },
  {
    key: "banijay-productions",
    label: "Banijay Productions Germany",
    clientId:
      process.env.SOFTGARDEN_BANIJAY_PRODUCTIONS_CLIENT_ID ??
      "fac654db-f7f6-46d0-a7e7-c20f95a3600c",
  },
] as const;

type SoftgardenClient = (typeof CLIENTS)[number];

type SoftgardenJobboard = {
  id: string;
  accessible?: boolean;
  internal?: boolean;
};

type SoftgardenJob = {
  jobDbId?: number;
  externalPostingName?: string;
  internalPostingName?: string;
  company_name?: string;
  geo_city?: string;
  geo_name?: string;
  workTimes?: string[];
  job_ad_url?: string;
  applyOnlineLink?: string;
  postingLastUpdatedDate?: number;
};

type SoftgardenJobsResponse = {
  results?: SoftgardenJob[];
};

type SourcedJob = SoftgardenJob & {
  source: SoftgardenClient;
};

type MappedJob = CareerJob & {
  updatedAt: number;
};

const FALLBACK_WORK_TIMES_DE: Record<string, string> = {
  "799eb9d2c0bc4e7490fde05f847b331a": "Teilzeit",
  "137caf67764c4b63b0272895af1704b0": "Vollzeit",
  "87af1987840d4442b87f2e0ee3344a1f": "Voll- oder Teilzeit",
  "ebc0523b259945e3b633d88428a3ce7a": "Freie Mitarbeit/Projektmitarbeit",
};

const FALLBACK_WORK_TIMES_EN: Record<string, string> = {
  "799eb9d2c0bc4e7490fde05f847b331a": "Part Time",
  "137caf67764c4b63b0272895af1704b0": "Full Time",
  "87af1987840d4442b87f2e0ee3344a1f": "Full or Part Time",
  "ebc0523b259945e3b633d88428a3ce7a": "Freelancer, Project Assistant",
};

function authHeader(clientId: string) {
  return `Basic ${Buffer.from(`${clientId}:`).toString("base64")}`;
}

async function fetchSoftgardenJson(
  url: string,
  clientId: string,
  locale: CareerLocale,
): Promise<unknown> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Accept-Language": locale,
      Authorization: authHeader(clientId),
    },
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`softgarden responded with HTTP ${response.status}`);
  }

  return response.json();
}

function isJobboardList(value: unknown): value is SoftgardenJobboard[] {
  return (
    Array.isArray(value) &&
    value.every(
      (entry) =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as SoftgardenJobboard).id === "string",
    )
  );
}

function jobsFromResponse(value: unknown): SoftgardenJob[] {
  if (typeof value !== "object" || value === null) return [];
  const { results } = value as SoftgardenJobsResponse;
  return Array.isArray(results) ? results : [];
}

async function fetchClientJobs(
  client: SoftgardenClient,
  locale: CareerLocale,
): Promise<SourcedJob[]> {
  const jobboards = await fetchSoftgardenJson(
    `${API_BASE}/v2/frontend/jobboards`,
    client.clientId,
    locale,
  );

  if (!isJobboardList(jobboards)) {
    throw new Error("softgarden returned an invalid jobboard response");
  }

  const externalChannels = jobboards.filter(
    (channel) => channel.accessible !== false && channel.internal !== true,
  );

  const responses = await Promise.all(
    externalChannels.map((channel) =>
      fetchSoftgardenJson(
        `${API_BASE}/v3/frontend/jobslist/${encodeURIComponent(channel.id)}`,
        client.clientId,
        locale,
      ),
    ),
  );

  return responses.flatMap((response) =>
    jobsFromResponse(response).map((job) => ({ ...job, source: client })),
  );
}

async function fetchWorkingTimes(locale: CareerLocale) {
  const catalog = await fetchSoftgardenJson(
    `${API_BASE}/v3/frontend/catalogs/WORKING_HOURS?locale=${locale.toUpperCase()}`,
    CLIENTS[0].clientId,
    locale,
  );

  if (typeof catalog !== "object" || catalog === null || Array.isArray(catalog)) {
    throw new Error("softgarden returned an invalid working-hours catalog");
  }

  return Object.fromEntries(
    Object.entries(catalog).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
}

function normalizeText(value: string | undefined) {
  return value?.replace(/\s+/g, " ").trim() ?? "";
}

function safeJobUrl(job: SoftgardenJob) {
  const candidates = [job.job_ad_url, job.applyOnlineLink];

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const url = new URL(candidate);
      if (url.protocol === "https:") return url.toString();
    } catch {
      // Ignore malformed upstream URLs and use the central board below.
    }
  }

  return ALL_JOBS_URL;
}

function mapJob(
  job: SourcedJob,
  workingTimes: Record<string, string>,
  locale: CareerLocale,
): MappedJob | null {
  const title = normalizeText(
    job.externalPostingName || job.internalPostingName,
  );
  if (!title || typeof job.jobDbId !== "number") return null;

  const location = normalizeText(job.geo_city || job.geo_name) ||
    (locale === "en" ? "Germany" : "Deutschland");
  const workTime =
    job.workTimes
      ?.map((id) => workingTimes[id])
      .filter((value): value is string => Boolean(value))
      .join(" / ") || (locale === "en" ? "Open position" : "Offene Position");

  return {
    title,
    company: normalizeText(job.company_name) || job.source.label,
    location: locale === "en" && location === "Köln" ? "Cologne" : location,
    workTime,
    url: safeJobUrl(job),
    updatedAt: job.postingLastUpdatedDate ?? 0,
  };
}

function interleaveByCompany(groups: MappedJob[][]): CareerJob[] {
  const jobs: CareerJob[] = [];
  const seen = new Set<string>();
  const longestGroup = Math.max(0, ...groups.map((group) => group.length));

  for (let index = 0; index < longestGroup; index += 1) {
    for (const group of groups) {
      const job = group[index];
      if (!job) continue;
      const key = `${job.url}|${job.title}|${job.company}`;
      if (seen.has(key)) continue;
      seen.add(key);
      jobs.push(job);
    }
  }

  return jobs;
}

function localizedFallback(locale: CareerLocale): CareerJob[] {
  if (locale === "de") return FALLBACK_CAREER_JOBS;

  const workTimeEn: Record<string, string> = {
    Vollzeit: "Full Time",
    Teilzeit: "Part Time",
    "Voll- oder Teilzeit": "Full or Part Time",
    "Freie Mitarbeit/Projektmitarbeit": "Freelancer, Project Assistant",
  };

  return FALLBACK_CAREER_JOBS.map((job) => ({
    ...job,
    location: job.location === "Köln" ? "Cologne" : job.location,
    workTime: workTimeEn[job.workTime] ?? job.workTime,
  }));
}

export async function getSoftgardenJobs(
  locale: CareerLocale = "de",
): Promise<CareerJob[]> {
  const fallbackWorkingTimes =
    locale === "en" ? FALLBACK_WORK_TIMES_EN : FALLBACK_WORK_TIMES_DE;

  const [catalogResult, ...clientResults] = await Promise.allSettled([
    fetchWorkingTimes(locale),
    ...CLIENTS.map((client) => fetchClientJobs(client, locale)),
  ]);

  const workingTimes =
    catalogResult.status === "fulfilled"
      ? { ...fallbackWorkingTimes, ...catalogResult.value }
      : fallbackWorkingTimes;

  const groups = clientResults.map((result, index) => {
    if (result.status === "rejected") {
      console.warn(
        `[softgarden] ${CLIENTS[index].label} could not be refreshed.`,
      );
      return [];
    }

    return result.value
      .map((job) => mapJob(job, workingTimes, locale))
      .filter((job): job is MappedJob => job !== null)
      .sort((a, b) => b.updatedAt - a.updatedAt);
  });

  const jobs = interleaveByCompany(groups);
  return jobs.length > 0 ? jobs : localizedFallback(locale);
}
