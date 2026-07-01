// Führungsteam Banijay Germany (Namen/Rollen aus dem Corporate-Snapshot).
// Bilder = B/W-Corporate-Shots als Platzhalter (9 Dateien, 11 Personen → 2 doppelt).
// CMS-ready: wird später eine Payload-Collection „leadership".

export interface Leader {
  name: string;
  role: string;
  img: string;
}

export const LEADERSHIP: Leader[] = [
  { name: "Marcus Wolter", role: "CEO", img: "/people/lead-1.jpg" },
  { name: "Knut Kremling", role: "COO", img: "/people/lead-2.jpg" },
  { name: "Michael Laegel", role: "CFO", img: "/people/lead-3.jpg" },
  { name: "Simone Lenzen", role: "Director Communications", img: "/people/lead-4.jpg" },
  { name: "Michael Gaul", role: "Director Legal / General Counsel", img: "/people/lead-5.jpg" },
  { name: "Natali Naso", role: "Director Human Resources", img: "/people/lead-6.jpg" },
  { name: "Sebastian Menge", role: "Director Information Technology", img: "/people/lead-7.jpg" },
  { name: "Heike Lutzer", role: "Director Marketing & Design", img: "/people/lead-8.jpg" },
  {
    name: "Matthaeus Jaworek",
    role: "Director Financial Planning, Reporting & Controlling",
    img: "/people/lead-9.jpg",
  },
  { name: "Janine Berns", role: "Director Accounting & Tax", img: "/people/lead-1.jpg" },
  { name: "Aylin Firat", role: "Personal Assistant to CEO", img: "/people/lead-2.jpg" },
];
