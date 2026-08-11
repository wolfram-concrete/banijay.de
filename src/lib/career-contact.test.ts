import { describe, expect, it } from "vitest";
import {
  buildCareerContactMail,
  CareerContactConfigError,
  careerContactSchema,
  getCareerContactConfig,
} from "@/lib/career-contact";

const validPayload = {
  name: "Erika Muster",
  company: "Muster GmbH",
  email: "erika@example.com",
  phone: "+49 221 123456",
  topic: "initiativbewerbung" as const,
  message: "Ich möchte mich vorstellen.",
  locale: "de" as const,
  website: "" as const,
};

const validEnv = {
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: "587",
  SMTP_USER: "smtp-user",
  SMTP_PASSWORD: "smtp-password",
  SMTP_FROM: "sender@example.com",
  CAREER_CONTACT_RECIPIENT: "recipient@example.com",
  CAREER_CONTACT_ALLOWED_ORIGINS:
    "https://www.banijay.de,https://banijay.de",
};

describe("careerContactSchema", () => {
  it("accepts and trims a valid payload", () => {
    const result = careerContactSchema.parse({
      ...validPayload,
      name: "  Erika Muster  ",
      company: undefined,
      phone: undefined,
    });

    expect(result.name).toBe("Erika Muster");
    expect(result.company).toBe("");
    expect(result.phone).toBe("");
  });

  it.each([
    ["name", ""],
    ["name", "x".repeat(121)],
    ["company", "x".repeat(121)],
    ["email", "not-an-email"],
    ["email", `${"x".repeat(250)}@example.com`],
    ["phone", "x".repeat(51)],
    ["topic", "format"],
    ["message", ""],
    ["message", "x".repeat(5_001)],
    ["locale", "fr"],
  ])("rejects an invalid %s field", (field, value) => {
    expect(
      careerContactSchema.safeParse({ ...validPayload, [field]: value }).success,
    ).toBe(false);
  });

  it("accepts the exact maximum field lengths", () => {
    expect(
      careerContactSchema.safeParse({
        ...validPayload,
        name: "x".repeat(120),
        company: "x".repeat(120),
        phone: "x".repeat(50),
        message: "x".repeat(5_000),
      }).success,
    ).toBe(true);
  });

  it("rejects unexpected fields", () => {
    expect(
      careerContactSchema.safeParse({ ...validPayload, attachment: "cv.pdf" })
        .success,
    ).toBe(false);
  });

  it("requires the empty honeypot field", () => {
    const withoutHoneypot: Record<string, unknown> = { ...validPayload };
    delete withoutHoneypot.website;

    expect(careerContactSchema.safeParse(withoutHoneypot).success).toBe(false);
  });
});

describe("career contact configuration", () => {
  it("accepts only the fixed production origins and port 587", () => {
    const config = getCareerContactConfig(validEnv);

    expect(config.port).toBe(587);
    expect([...config.allowedOrigins]).toEqual([
      "https://www.banijay.de",
      "https://banijay.de",
    ]);
  });

  it.each([
    ["missing password", { ...validEnv, SMTP_PASSWORD: "" }],
    ["wrong port", { ...validEnv, SMTP_PORT: "465" }],
    [
      "unexpected origin",
      {
        ...validEnv,
        CAREER_CONTACT_ALLOWED_ORIGINS: "https://example.com",
      },
    ],
  ])("rejects %s without exposing a value", (_label, env) => {
    expect(() => getCareerContactConfig(env)).toThrow(CareerContactConfigError);
  });
});

describe("buildCareerContactMail", () => {
  it("uses fixed envelope fields and only a validated Reply-To", () => {
    const mail = buildCareerContactMail(validPayload, {
      from: "sender@example.com",
      recipient: "recipient@example.com",
    });

    expect(mail).toMatchObject({
      from: "sender@example.com",
      to: "recipient@example.com",
      replyTo: "erika@example.com",
      subject: "[banijay.de Career] Initiativbewerbung",
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    expect(mail.text).toContain("Erika Muster");
    expect(mail).not.toHaveProperty("html");
    expect(mail).not.toHaveProperty("attachments");
    expect(mail).not.toHaveProperty("cc");
    expect(mail).not.toHaveProperty("bcc");
  });

  it("translates the fixed topic label for English messages", () => {
    const mail = buildCareerContactMail(
      { ...validPayload, locale: "en", topic: "format-idee" },
      { from: "sender@example.com", recipient: "recipient@example.com" },
    );

    expect(mail.subject).toBe("[banijay.de Career] Format idea");
  });
});
