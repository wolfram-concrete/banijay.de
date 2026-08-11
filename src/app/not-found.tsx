import type { Metadata } from "next";
import { GlobalNotFoundShell } from "@/components/errors/GlobalNotFoundShell";

export const metadata: Metadata = {
  title: { absolute: "404 | Banijay Germany" },
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return <GlobalNotFoundShell />;
}
