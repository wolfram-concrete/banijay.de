import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";
import { afterEach, describe, expect, it } from "vitest";
import { proxy } from "@/proxy";
import {
  isSupplierCodeDocumentPath,
  SUPPLIER_CODE_DOCUMENTS,
} from "@/lib/supplier-code-documents";

const originalMaintenanceMode = process.env.MAINTENANCE_MODE;

afterEach(() => {
  if (originalMaintenanceMode === undefined) {
    delete process.env.MAINTENANCE_MODE;
  } else {
    process.env.MAINTENANCE_MODE = originalMaintenanceMode;
  }
});

describe("Supplier Code of Conduct documents", () => {
  it("keeps the exact contract URLs", () => {
    expect(SUPPLIER_CODE_DOCUMENTS.map(({ legacyPath }) => legacyPath)).toEqual([
      "/supplier_code_of_conduct_DE",
      "/supplier_code_of_conduct_EN",
    ]);
  });

  it.each(SUPPLIER_CODE_DOCUMENTS)(
    "keeps the $locale PDF byte-exact",
    async ({ publicPath, sha256 }) => {
      const pdf = await readFile(path.join(process.cwd(), "public", publicPath.slice(1)));

      expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
      expect(createHash("sha256").update(pdf).digest("hex")).toBe(sha256);
    },
  );

  it("recognizes only the supported public and legacy paths", () => {
    for (const { legacyPath, publicPath } of SUPPLIER_CODE_DOCUMENTS) {
      expect(isSupplierCodeDocumentPath(legacyPath)).toBe(true);
      expect(isSupplierCodeDocumentPath(publicPath)).toBe(true);
    }

    expect(isSupplierCodeDocumentPath("/supplier_code_of_conduct_FR")).toBe(false);
  });

  it.each(SUPPLIER_CODE_DOCUMENTS)(
    "keeps $legacyPath available in maintenance mode",
    async ({ legacyPath }) => {
      process.env.MAINTENANCE_MODE = "1";

      const response = await proxy(new NextRequest(`https://www.banijay.de${legacyPath}`));

      expect(response.status).toBe(200);
      expect(response.headers.get("x-middleware-next")).toBe("1");
    },
  );
});
