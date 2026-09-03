export const SUPPLIER_CODE_DOCUMENTS = [
  {
    locale: "de",
    legacyPath: "/supplier_code_of_conduct_DE",
    publicPath: "/downloads/supplier_code_of_conduct_DE.pdf",
    downloadName: "Banijay-Entertainment-Supplier-Code-of-Conduct-DE.pdf",
    sha256: "b8ffb7f441dc3d5415275506a5d8324f1654290c8a295837b5a429b637a4cb76",
  },
  {
    locale: "en",
    legacyPath: "/supplier_code_of_conduct_EN",
    publicPath: "/downloads/supplier_code_of_conduct_EN.pdf",
    downloadName: "Banijay-Entertainment-Supplier-Code-of-Conduct-EN.pdf",
    sha256: "e89c4ab4cef24b3cf250254a185eeab1f52c17b7d23b5c810effa604f4457d1b",
  },
] as const;

const ALWAYS_AVAILABLE_PATHS = new Set<string>(
  SUPPLIER_CODE_DOCUMENTS.flatMap(({ legacyPath, publicPath }) => [legacyPath, publicPath]),
);

export function isSupplierCodeDocumentPath(pathname: string): boolean {
  return ALWAYS_AVAILABLE_PATHS.has(pathname);
}
