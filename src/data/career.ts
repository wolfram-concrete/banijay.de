// Career-Content (nach Career-Page-Briefing, Stand 2026-07-02).
// Kuratierte Inhalte für die Banijay-Welt als Arbeitsort — Rollenwelt,
// Jobvorschau, Standorte, BANIJAY TOMORROW, Code of Conduct.

export const CAREER = {
  hero: {
    label: "Career",
    headline: "Komm\nins Team",
    body: "Arbeite dort, wo Unterhaltung entsteht: in Produktion, Redaktion, Entwicklung, Digital, Live und den Teams dahinter.",
    // Poster = erster Frame des Hero-Videos (kein Schwarz-Weiß-Flash mehr vor dem Play).
    image: "/career/career-hero-poster.jpg",
  },

  // Intro zur Rollenwelt (Cards darunter).
  // Wording von Wolfram (20.07.) — ersetzt „Viele Companies, viele Rollen, ein
  // gemeinsames Ziel: …". Der Text hat jetzt ZWEI Ebenen: Zeile 1 ist ein Zuruf, danach
  // folgt der Fließtext. Das „\n" trennt beide — der Statement-Renderer in
  // AlgarveHome.tsx bricht dort um und hält den Zuruf auf einer eigenen Zeile.
  // (Der alte Kommentar „keine eigene Headline" ist damit überholt.)
  roleIntro: {
    text: "Finde hier deinen Traumjob!\nEine Karriere bei uns bedeutet die Möglichkeit, deine ganz eigene Erfolgsstory zu schreiben. Wenn du Entertainment liebst und mit uns die Welt verändern willst, sieh nach, ob eine unserer Stellen zu dir passen könnte.",
  },

  // Rollenwelt als Sticky-Card-Stack (value-features/ServicesStack-Prinzip).
  roles: [
    {
      index: "01",
      title: "Produktion & Redaktion",
      claim: "Nah an Formaten, Geschichten und Entscheidungen.",
      text: "Für Menschen, die Themen finden, Abläufe halten, Drehs vorbereiten und Entertainment in Sendung bringen.",
      image: "/career/c1.png",
    },
    {
      index: "02",
      title: "Live, Technik & Events",
      claim: "Dort arbeiten, wo Momente entstehen.",
      text: "Von Bühne, Studio und Veranstaltungstechnik bis Ticketing, Touring und Festivalbetrieb.",
      image: "/career/c2.png",
    },
    {
      index: "03",
      title: "Digital & Vermarktung",
      claim: "Entertainment für Plattformen, Marken und Communities.",
      text: "Social Content, Brand Partnerships, Distribution, Rechte und digitale Kampagnen.",
      image: "/career/c4.png",
    },
    {
      index: "04",
      title: "Talent & Organisation",
      claim: "Menschen, Teams und Persönlichkeiten weiterbringen.",
      text: "Talent-Management, Administration, HR, Finance, Legal und die Strukturen hinter der Gruppe.",
      image: "/career/c3.png",
    },
  ],

  jobs: {
    headline: "Aktuelle Einstiege",
    text: "Ein Ausschnitt aus den offenen Stellen der Banijay-Companies. Die komplette Übersicht mit Filtern nach Company, Standort und Arbeitszeit liegt in der Jobbörse.",
    cta: { text: "Alle Jobs ansehen", href: "https://banijay.de/offene-stellen/" },
  },

  // Standorte + Jobzahlen (Quelle: scraped_content/career_job_cards.json,
  // Stand 2026-07-02). Köln ist der Hauptstandort.
  locations: {
    text: "Köln ist unsere Heimat. Dazu kommen Jobs und Companies in Berlin, Münster, Wien und Zürich.",
    items: [
      { name: "Köln", count: 27, url: "https://banijay.de/offene-stellen/?ort=Köln" },
      { name: "Berlin", count: 0, url: "https://banijay.de/offene-stellen/?ort=Berlin" },
      { name: "Münster", count: 0, url: "https://banijay.de/offene-stellen/?ort=Münster" },
      { name: "Wien", count: 0, url: "https://banijay.de/offene-stellen/?ort=Wien" },
      { name: "Zürich", count: 0, url: "https://banijay.de/offene-stellen/?ort=Zürich" },
    ],
  },

  tomorrow: {
    eyebrow: "Banijay Tomorrow",
    headline: "Für Talente, die mehr wollen als einen Job.",
    // Copy 1:1 von der aktuellen banijay.de-Karriereseite, Section BANIJAY TOMORROW
    // (Wolfram 16.07. — ersetzt den zuvor frei formulierten Text). Nicht umschreiben.
    text: "Die Banijay Germany und ihre Companies stehen für ein kreatives und innovatives Arbeitsumfeld. Mit dem gemeinsamen Personalentwicklungsprogramm BANIJAY TOMORROW finden und fördern wir Talente. Die Academy als Marke richtet sich gezielt an Talents als Neuzugänge für einen perfekten Start ins Berufsleben. Auch Professionals als Mitarbeitende und Leader mit Personalverantwortung profitieren in der Academy von Workshops mit internen und externen Dozentinnen und Dozenten.",
    // Banijay-Keyvisual „All lights on you" (Wolfram 16.07., aus assets/Logo Companies/
    // Header2560x1311(2).png; 1920px/JPEG-86 → 54 KB). Natives Seitenverhältnis 1,951:1.
    // ACHTUNG: Das Visual hat Typo + B-Marke einkomponiert — es darf NICHT beschnitten
    // werden. Container-Ratio + Parallax in CareerTomorrowStack sind darauf abgestimmt.
    image: "/career/tomorrow-keyvisual.jpg",
    imageAspect: 2560 / 1312,
    cta: { text: "BANIJAY TOMORROW Login", href: "https://banijaytomorrow.de/" },
  },

  codeOfConduct: {
    headline: "Wie wir zusammenarbeiten.",
    text: "Banijay steht für kreative Eigenständigkeit, Vielfalt im Denken und Zusammenarbeit mit gemeinsamen Ambitionen.",
    cta: {
      text: "Code of Conduct öffnen",
      href: "https://banijay.de/assets/template/Medien/Dateien/CoC/Banijay_Code_of_Conduct_DEUTSCH_FINAL_15.12.2022_KA_extern.pdf",
    },
  },
};
