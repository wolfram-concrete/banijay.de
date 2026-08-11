import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CareerContactDeliveryError } from "@/lib/career-contact";

const mocks = vi.hoisted(() => ({
  createTransport: vi.fn(),
  sendMail: vi.fn(),
  close: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("nodemailer", () => ({
  default: { createTransport: mocks.createTransport },
}));

import { sendCareerContactEmail } from "@/lib/career-contact-mail";

const payload = {
  name: "Erika Muster",
  company: "Muster GmbH",
  email: "erika@example.com",
  phone: "+49 221 123456",
  topic: "sonstiges" as const,
  message: "Eine Testnachricht.",
  locale: "de" as const,
  website: "" as const,
};

beforeEach(() => {
  vi.stubEnv("SMTP_HOST", "smtp.example.com");
  vi.stubEnv("SMTP_PORT", "587");
  vi.stubEnv("SMTP_USER", "smtp-user");
  vi.stubEnv("SMTP_PASSWORD", "smtp-password");
  vi.stubEnv("SMTP_FROM", "sender@example.com");
  vi.stubEnv("CAREER_CONTACT_RECIPIENT", "recipient@example.com");
  vi.stubEnv(
    "CAREER_CONTACT_ALLOWED_ORIGINS",
    "https://www.banijay.de,https://banijay.de",
  );

  mocks.createTransport.mockReturnValue({
    sendMail: mocks.sendMail,
    close: mocks.close,
  });
  mocks.sendMail.mockResolvedValue({
    accepted: ["recipient@example.com"],
    rejected: [],
  });
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("sendCareerContactEmail", () => {
  it("enforces STARTTLS and awaits SMTP acceptance", async () => {
    await sendCareerContactEmail(payload);

    expect(mocks.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.example.com",
        port: 587,
        secure: false,
        requireTLS: true,
        tls: {
          minVersion: "TLSv1.2",
          rejectUnauthorized: true,
        },
        connectionTimeout: 5_000,
        greetingTimeout: 5_000,
        socketTimeout: 10_000,
        disableFileAccess: true,
        disableUrlAccess: true,
        logger: false,
        debug: false,
      }),
    );
    expect(mocks.sendMail).toHaveBeenCalledTimes(1);
    expect(mocks.close).toHaveBeenCalledTimes(1);
  });

  it("returns a generic delivery error when SMTP rejects the recipient", async () => {
    mocks.sendMail.mockResolvedValueOnce({ accepted: [], rejected: [] });

    await expect(sendCareerContactEmail(payload)).rejects.toBeInstanceOf(
      CareerContactDeliveryError,
    );
  });

  it("does not log personal or SMTP data on transport errors", async () => {
    const consoleError = vi.spyOn(console, "error");
    mocks.sendMail.mockRejectedValueOnce(new Error("private SMTP details"));

    await expect(sendCareerContactEmail(payload)).rejects.toBeInstanceOf(
      CareerContactDeliveryError,
    );
    expect(consoleError).not.toHaveBeenCalled();
  });
});
