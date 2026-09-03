import type { NextConfig } from "next";
import { SUPPLIER_CODE_DOCUMENTS } from "./src/lib/supplier-code-documents";

const nextConfig: NextConfig = {
  async rewrites() {
    return SUPPLIER_CODE_DOCUMENTS.map(({ legacyPath, publicPath }) => ({
      source: legacyPath,
      destination: publicPath,
    }));
  },
  async headers() {
    return SUPPLIER_CODE_DOCUMENTS.flatMap(({ legacyPath, publicPath, locale, downloadName }) =>
      [legacyPath, publicPath].map((source) => ({
        source,
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          { key: "Content-Disposition", value: `inline; filename="${downloadName}"` },
          { key: "Content-Language", value: locale },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      })),
    );
  },
};

export default nextConfig;
