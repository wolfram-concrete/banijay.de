import { z } from "zod";

export const CAREER_CONTACT_MAX_BODY_BYTES = 16 * 1024;

export const CAREER_CONTACT_TOPICS = [
  "initiativbewerbung",
  "format-idee",
  "sonstiges",
] as const;

const PRODUCTION_ORIGINS = [
  "https://www.banijay.de",
  "https://banijay.de",
] as const;

const optionalText = (maxLength: number) =>
  z.string().trim().max(maxLength).optional().default("");

export const careerContactSchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    company: optionalText(120),
    email: z.string().trim().max(254).email(),
    phone: optionalText(50),
    topic: z.enum(CAREER_CONTACT_TOPICS),
    message: z.string().trim().min(1).max(5_000),
    locale: z.enum(["de", "en"]),
    website: z.literal(""),
  })
  .strict();

export type CareerContactPayload = z.infer<typeof careerContactSchema>;

export type CareerContactConfig = {
  host: string;
  port: 587;
  user: string;
  password: string;
  from: string;
  recipient: string;
  allowedOrigins: ReadonlySet<string>;
};

export type CareerContactMail = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  disableFileAccess: true;
  disableUrlAccess: true;
};

const configSchema = z.object({
  SMTP_HOST: z.string().trim().min(1),
  SMTP_PORT: z.coerce.number().int().refine((port) => port === 587),
  SMTP_USER: z.string().trim().min(1),
  SMTP_PASSWORD: z.string().min(1),
  SMTP_FROM: z.string().trim().email(),
  CAREER_CONTACT_RECIPIENT: z.string().trim().email(),
  CAREER_CONTACT_ALLOWED_ORIGINS: z.string().trim().min(1),
});

export class CareerContactConfigError extends Error {
  constructor() {
    super("Career contact configuration is unavailable");
    this.name = "CareerContactConfigError";
  }
}

export class CareerContactDeliveryError extends Error {
  constructor() {
    super("Career contact message could not be delivered");
    this.name = "CareerContactDeliveryError";
  }
}

function parseAllowedOrigins(value: string): ReadonlySet<string> {
  const origins = new Set(
    value
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );

  if (
    origins.size !== PRODUCTION_ORIGINS.length ||
    PRODUCTION_ORIGINS.some((origin) => !origins.has(origin))
  ) {
    throw new CareerContactConfigError();
  }

  return origins;
}

export function getCareerContactConfig(
  env: Record<string, string | undefined> = process.env,
): CareerContactConfig {
  const result = configSchema.safeParse(env);
  if (!result.success) throw new CareerContactConfigError();

  return {
    host: result.data.SMTP_HOST,
    port: 587,
    user: result.data.SMTP_USER,
    password: result.data.SMTP_PASSWORD,
    from: result.data.SMTP_FROM,
    recipient: result.data.CAREER_CONTACT_RECIPIENT,
    allowedOrigins: parseAllowedOrigins(
      result.data.CAREER_CONTACT_ALLOWED_ORIGINS,
    ),
  };
}

export function getCareerContactAllowedOrigins(
  env: Record<string, string | undefined> = process.env,
): ReadonlySet<string> {
  const value = env.CAREER_CONTACT_ALLOWED_ORIGINS;
  if (!value) throw new CareerContactConfigError();
  return parseAllowedOrigins(value);
}

const topicLabels: Record<
  CareerContactPayload["locale"],
  Record<CareerContactPayload["topic"], string>
> = {
  de: {
    initiativbewerbung: "Initiativbewerbung",
    "format-idee": "Format-Idee",
    sonstiges: "Sonstiges",
  },
  en: {
    initiativbewerbung: "Unsolicited application",
    "format-idee": "Format idea",
    sonstiges: "Other",
  },
};

export function buildCareerContactMail(
  payload: CareerContactPayload,
  config: Pick<CareerContactConfig, "from" | "recipient">,
): CareerContactMail {
  const topic = topicLabels[payload.locale][payload.topic];
  const labels =
    payload.locale === "de"
      ? {
          intro: "Neue Karriere-Anfrage über banijay.de",
          name: "Name",
          company: "Unternehmen",
          email: "E-Mail",
          phone: "Telefon",
          topic: "Anliegen",
          message: "Nachricht",
          missing: "Nicht angegeben",
        }
      : {
          intro: "New career enquiry via banijay.de",
          name: "Name",
          company: "Company",
          email: "Email",
          phone: "Phone",
          topic: "Topic",
          message: "Message",
          missing: "Not provided",
        };

  return {
    from: config.from,
    to: config.recipient,
    replyTo: payload.email,
    subject: `[banijay.de Career] ${topic}`,
    text: [
      labels.intro,
      "",
      `${labels.name}: ${payload.name}`,
      `${labels.company}: ${payload.company || labels.missing}`,
      `${labels.email}: ${payload.email}`,
      `${labels.phone}: ${payload.phone || labels.missing}`,
      `${labels.topic}: ${topic}`,
      "",
      `${labels.message}:`,
      payload.message,
    ].join("\n"),
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}
