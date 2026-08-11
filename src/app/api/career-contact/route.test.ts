import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  CareerContactConfigError,
  CareerContactDeliveryError,
} from "@/lib/career-contact";

const mocks = vi.hoisted(() => ({
  sendCareerContactEmail: vi.fn(),
}));

vi.mock("@/lib/career-contact-mail", () => ({
  sendCareerContactEmail: mocks.sendCareerContactEmail,
}));

import { POST } from "@/app/api/career-contact/route";

const validPayload = {
  name: "Erika Muster",
  company: "Muster GmbH",
  email: "erika@example.com",
  phone: "+49 221 123456",
  topic: "initiativbewerbung",
  message: "Ich möchte mich vorstellen.",
  locale: "de",
  website: "",
};

function request(
  body: string = JSON.stringify(validPayload),
  headers: Record<string, string> = {},
): Request {
  return new Request("https://www.banijay.de/api/career-contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://www.banijay.de",
      ...headers,
    },
    body,
  });
}

beforeEach(() => {
  vi.stubEnv(
    "CAREER_CONTACT_ALLOWED_ORIGINS",
    "https://www.banijay.de,https://banijay.de",
  );
  mocks.sendCareerContactEmail.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("POST /api/career-contact", () => {
  it("returns 200 only after the message was sent", async () => {
    const response = await POST(request());

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(mocks.sendCareerContactEmail).toHaveBeenCalledWith(
      expect.objectContaining({ email: "erika@example.com" }),
    );
  });

  it("rejects a non-JSON content type", async () => {
    const response = await POST(
      request(JSON.stringify(validPayload), { "content-type": "text/plain" }),
    );

    expect(response.status).toBe(415);
    expect(mocks.sendCareerContactEmail).not.toHaveBeenCalled();
  });

  it("rejects missing and foreign origins", async () => {
    const foreign = await POST(
      request(JSON.stringify(validPayload), { origin: "https://example.com" }),
    );
    const missingRequest = request();
    missingRequest.headers.delete("origin");
    const missing = await POST(missingRequest);

    expect(foreign.status).toBe(403);
    expect(missing.status).toBe(403);
    expect(mocks.sendCareerContactEmail).not.toHaveBeenCalled();
  });

  it("returns 413 for bodies above 16 KiB", async () => {
    const response = await POST(request("x".repeat(16 * 1024 + 1)));

    expect(response.status).toBe(413);
    expect(mocks.sendCareerContactEmail).not.toHaveBeenCalled();
  });

  it("returns 400 for invalid JSON and invalid fields", async () => {
    const invalidJson = await POST(request("{"));
    const invalidPayload = await POST(
      request(JSON.stringify({ ...validPayload, topic: "unknown" })),
    );

    expect(invalidJson.status).toBe(400);
    expect(invalidPayload.status).toBe(400);
    expect(mocks.sendCareerContactEmail).not.toHaveBeenCalled();
  });

  it("silently accepts the honeypot without sending a message", async () => {
    const response = await POST(
      request(JSON.stringify({ ...validPayload, website: "spam.example" })),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(mocks.sendCareerContactEmail).not.toHaveBeenCalled();
  });

  it("returns 503 when the origin configuration is missing", async () => {
    vi.stubEnv("CAREER_CONTACT_ALLOWED_ORIGINS", "");

    const response = await POST(request());

    expect(response.status).toBe(503);
    expect(mocks.sendCareerContactEmail).not.toHaveBeenCalled();
  });

  it.each([
    new CareerContactConfigError(),
    new CareerContactDeliveryError(),
  ])("returns 503 for configuration and SMTP errors", async (error) => {
    mocks.sendCareerContactEmail.mockRejectedValueOnce(error);

    const response = await POST(request());

    expect(response.status).toBe(503);
  });
});
