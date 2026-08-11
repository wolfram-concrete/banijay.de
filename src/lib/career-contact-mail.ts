import "server-only";

import nodemailer from "nodemailer";
import {
  buildCareerContactMail,
  CareerContactDeliveryError,
  getCareerContactConfig,
  type CareerContactPayload,
} from "@/lib/career-contact";

export async function sendCareerContactEmail(
  payload: CareerContactPayload,
): Promise<void> {
  const config = getCareerContactConfig();
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.user,
      pass: config.password,
    },
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
  });

  try {
    const info = await transport.sendMail(
      buildCareerContactMail(payload, config),
    );

    if (!info.accepted.some((address) => String(address) === config.recipient)) {
      throw new CareerContactDeliveryError();
    }
  } catch (error) {
    if (error instanceof CareerContactDeliveryError) throw error;
    throw new CareerContactDeliveryError();
  } finally {
    transport.close();
  }
}
