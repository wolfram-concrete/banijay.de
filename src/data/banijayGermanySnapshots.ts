// Snapshot-Interim: die 6 neuesten Posts von @banijaygermany als lokale Bilder
// (gezogen aus dem Live-Feed, public/reels/r1–r6.jpg), gemappt auf unser
// Reel-Format. So zeigt unser natives 9:16-Modul schon jetzt die Ziel-Optik.
// Wird automatisch durch echte Reels ersetzt, sobald IG_TOKEN_BANIJAYGERMANY
// gesetzt ist (dann inkl. Hover-Autoplay-Video).

import type { InstagramReel } from "./reels";

const post = (shortcode: string, file: string, title = ""): InstagramReel => ({
  id: shortcode,
  title,
  caption: "",
  permalink: `https://www.instagram.com/p/${shortcode}`,
  thumbnailUrl: `/reels/${file}`,
  videoUrl: "",
  timestamp: "",
  username: "banijaygermany",
});

export const BANIJAY_GERMANY_SNAPSHOTS: InstagramReel[] = [
  // Featured: „Wolter Talks"-Podcast mit Marcus Wolter & Aaron Troschke.
  post("DZ2pIFeMnzy", "wolter-talks.jpg", "Wolter Talks · Marcus Wolter & Aaron Troschke"),
  post("DZ_0d7biUkQ", "r1.jpg"),
  post("DZ9tG4JA0yc", "r2.jpg"),
  post("DZ9gPhNjTy9", "r3.jpg"),
  post("DZ4v_Xxl7qN", "r4.jpg"),
  post("DZ4ZTgAAs_i", "r5.jpg"),
  post("DZ4XFkrF2BV", "r6.jpg"),
];
