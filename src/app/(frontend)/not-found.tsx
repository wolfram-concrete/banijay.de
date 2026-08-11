import type { Metadata } from "next";
import { NotFoundContent } from "@/components/errors/NotFoundContent";

export const metadata: Metadata = {
  title: { absolute: "404 | Banijay Germany" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundContent />;
}
