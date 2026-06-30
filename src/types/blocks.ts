// Payload-kompatible Typen ohne Payload-Import.
// Wenn später das CMS angebunden wird, ersetzen diese Shapes 1:1 die API-Responses.

export interface PayloadImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface PayloadLink {
  text: string;
  url: string;
  newTab?: boolean;
}

export interface BlockBase {
  blockType?: string;
  id?: string;
}
