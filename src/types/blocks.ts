// src/types/blocks.ts — Payload-kompatible Typen ohne Payload-Import.
// Jedes Block-Interface extends BlockBase. Bilder sind immer Objekte (PayloadImage),
// niemals nackte Strings — so bildet jede Komponente 1:1 auf einen Payload-Block ab.

export interface PayloadImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  mimeType?: string;
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
