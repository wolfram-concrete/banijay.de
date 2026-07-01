// Reels / Newest — vertikale 9:16 Video-Reels direkt unter dem Hero.
// CMS-ready Collection: bildet später Payload „reels" ab (video, poster, title…).
// Phase 1: Video als Platzhalter, Titel aus echten Banijay-Marken.

// Echte Instagram-Reel-Form (befüllt serverseitig via src/lib/instagram.ts).
// Hier definiert, damit Client-Komponenten den Typ ohne „server-only" nutzen.
export interface InstagramReel {
  id: string;
  title: string;
  caption: string;
  permalink: string;
  thumbnailUrl: string;
  videoUrl: string;
  timestamp: string;
  username: string;
}

export interface Reel {
  id: string;
  title: string;
  /** Kontext-Label (Live, Show, Comedy …). */
  category: string;
  /** Zugehörige Company (Verknüpfung in die Company-Welt). */
  companySlug: string;
  companyName: string;
}

export const REELS: Reel[] = [
  { id: "comedy-nacht-xxl", title: "1LIVE Comedy-Nacht XXL", category: "Live", companySlug: "banijay-germany-live", companyName: "Banijay Germany Live" },
  { id: "beste-comedians", title: "Die besten Comedians Deutschlands", category: "Live", companySlug: "banijay-germany-live", companyName: "Banijay Germany Live" },
  { id: "nightwash", title: "NightWash", category: "Comedy", companySlug: "banijay-germany-live", companyName: "Banijay Germany Live" },
  { id: "cologne-comedy-festival", title: "Cologne Comedy Festival", category: "Festival", companySlug: "cologne-comedy-festival", companyName: "Cologne Comedy Festival" },
  { id: "tv-total", title: "TV total", category: "Show", companySlug: "brainpool", companyName: "Brainpool" },
  { id: "schlag-den-star", title: "Schlag den Star", category: "Show", companySlug: "brainpool", companyName: "Brainpool" },
  { id: "the-masked-singer", title: "The Masked Singer", category: "Show", companySlug: "endemolshine-germany", companyName: "EndemolShine Germany" },
  { id: "kitchen-impossible", title: "Kitchen Impossible", category: "Factual", companySlug: "endemolshine-germany", companyName: "EndemolShine Germany" },
];
