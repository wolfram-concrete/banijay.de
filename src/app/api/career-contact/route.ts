import {
  CAREER_CONTACT_MAX_BODY_BYTES,
  CareerContactConfigError,
  careerContactSchema,
  getCareerContactAllowedOrigins,
} from "@/lib/career-contact";
import { sendCareerContactEmail } from "@/lib/career-contact-mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

class BodyTooLargeError extends Error {}

function json(status: number, ok: boolean): Response {
  return Response.json(
    { ok },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

async function readBodyWithLimit(request: Request): Promise<string> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength) {
    const length = Number(declaredLength);
    if (Number.isFinite(length) && length > CAREER_CONTACT_MAX_BODY_BYTES) {
      throw new BodyTooLargeError();
    }
  }

  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let body = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      size += value.byteLength;
      if (size > CAREER_CONTACT_MAX_BODY_BYTES) {
        await reader.cancel();
        throw new BodyTooLargeError();
      }

      body += decoder.decode(value, { stream: true });
    }

    body += decoder.decode();
    return body;
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request): Promise<Response> {
  const contentType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();

  if (contentType !== "application/json") return json(415, false);

  let allowedOrigins: ReadonlySet<string>;
  try {
    allowedOrigins = getCareerContactAllowedOrigins();
  } catch {
    return json(503, false);
  }

  const origin = request.headers.get("origin");
  if (!origin || !allowedOrigins.has(origin)) return json(403, false);

  let rawBody: string;
  try {
    rawBody = await readBodyWithLimit(request);
  } catch (error) {
    if (error instanceof BodyTooLargeError) return json(413, false);
    return json(400, false);
  }

  let input: unknown;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return json(400, false);
  }

  if (
    typeof input === "object" &&
    input !== null &&
    "website" in input &&
    typeof input.website === "string" &&
    input.website.trim().length > 0
  ) {
    return json(200, true);
  }

  const parsed = careerContactSchema.safeParse(input);
  if (!parsed.success) return json(400, false);

  try {
    await sendCareerContactEmail(parsed.data);
    return json(200, true);
  } catch (error) {
    if (error instanceof CareerContactConfigError) return json(503, false);
    return json(503, false);
  }
}
