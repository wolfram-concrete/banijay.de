// Home-Copy (Konzept „HOME", Sections 1–9). CMS-ready: bildet später einen
// Page-Global „home" mit Blocks ab.

export const HOME = {
  /** Section 1: Cinematic Intro — gestaffelte Zeilen, max. 5–8s Animation. */
  intro: {
    lines: [
      "Jede Geschichte beginnt mit einem kreativen Funken.",
      "Ihre größte Wirkung erreicht sie erst, wenn sie Menschen verbindet, bewegt und begeistert.",
      "Wir bieten Unterhaltung, über die ganz Deutschland spricht.",
    ],
    signature: "We are Banijay.",
  },

  /** Section 2: Hero nach Intro. */
  hero: {
    headline: "Die Entertainment-Welt hinter den Momenten, über die Deutschland spricht.",
    subline:
      "Banijay Germany vereint starke Companies, kreative Unternehmer:innen und bekannte Formate unter einem Dach. Gemeinsam schaffen wir Unterhaltung für TV, Streaming, Digital, Live und Bühnen – mit Reichweite, Haltung und Wirkung.",
    primaryCta: { text: "Companies entdecken", href: "/companies" },
    secondaryCta: { text: "Kontakt aufnehmen", href: "/contact" },
  },

  /** Section 3: Brands & Formate — die Format-Wand (Aha-Moment). */
  brands: {
    headline: "Du kennst die Formate. Jetzt lernst du die Welt dahinter kennen.",
    text:
      "Viele Shows, Formate und Entertainment-Momente, die Menschen in Deutschland kennen, entstehen in der Banijay-Welt. Die Brands sind der Kernwert des Unternehmens und werden von eigenständigen Companies produziert, die unterschiedliche Genres, Plattformen und Zielgruppen bedienen – von Prime-Time-Shows über Reality und Factual bis Fiction, Comedy, Digital und Live.",
  },

  /** Section 4: Impact in Zahlen. */
  stats: {
    headline: "Entertainment mit messbarer Wirkung.",
    text:
      "Banijay Germany steht für kreative Vielfalt, Produktionskraft und Reichweite. Hinter der Banijay-Welt stehen Companies, Labels, Teams und Formate, die täglich Entertainment für ein Millionenpublikum möglich machen.",
  },

  /** Section 5: Die Banijay-Welt. */
  world: {
    headline: "Eine Welt. Viele kreative Zentren.",
    text:
      "Banijay Germany ist kein einzelnes Produktionshaus, sondern ein Verbund aus eigenständigen Companies und Labels. Jede Einheit bringt ihr eigenes Profil, ihre eigene Handschrift und ihre eigene Marktnähe ein. Gemeinsam entsteht daraus ein Entertainment-Netzwerk, das Ideen entwickelt, Formate produziert, Talente begleitet und Inhalte in die Öffentlichkeit bringt.",
    extra: "Die Stärke von Banijay liegt nicht in Gleichförmigkeit. Sie liegt in der Verbindung unterschiedlicher kreativer Spezialist:innen.",
  },

  /** Section 6: Kompetenzfelder. */
  competenceFields: {
    headline: "Von Show bis Fiction. Von TV bis Live.",
    text:
      "Die Banijay-Welt lässt sich nicht über eine einzige Kategorie erklären. Manche Companies entwickeln große Shows, andere produzieren Fiction, betreuen Talente, bauen digitale Reichweiten auf, schaffen Live-Erlebnisse oder ermöglichen Produktionen technisch und organisatorisch.",
    fields: [
      { title: "Show & Entertainment", text: "Prime-Time, Studio, Quiz, Competition, große Publikumsformate." },
      { title: "Reality & Factual", text: "Reality, Factual Entertainment, Doku-Entertainment, Social Experiments." },
      { title: "Comedy & Live", text: "Comedy-Marken, Bühnenprogramme, Festivals, Tourneen und Live-Erlebnisse." },
      { title: "Fiction & Scripted", text: "Serien, Filme, Reihen, Comedy-Fiction und fiktionales Storytelling." },
      { title: "Digital & Social", text: "Social Content, Plattformlogiken, Creator, Communities, digitale Distribution." },
      { title: "Talent & Artists", text: "Künstlermanagement, Personality-Aufbau, Artist Development." },
      { title: "Services & Experiences", text: "Production Services, Ticketing, Events, Postproduktion, Studio- und Veranstaltungstechnik." },
    ],
  },

  /** Section 7: CEO-Moment. */
  ceo: {
    headline: "Nicht nur Produktion. Entertainmenthaus.",
    quote: "Wir verstehen uns nicht als Filmproduzent, sondern als Entertainmenthaus.",
    name: "Marcus Wolter",
    role: "CEO & Co-Founder Banijay Germany",
    context: "Im Zusammenhang mit einem Handelsblatt-Interview.",
    altQuote:
      "Banijay Germany ist stark, weil wir kreative Unternehmer:innen nicht vereinheitlichen, sondern verbinden. Unsere Companies sollen eigenständig denken, schnell handeln und ihre eigene Handschrift behalten – genau daraus entsteht die Kraft unserer Gruppe.",
  },

  /** Section 8: Featured Companies (6–8 Cards, aus companies.ts). */
  featured: {
    headline: "Unsere Companies sind die kreativen Motoren von Banijay Germany.",
    text:
      "Unter dem Dach von Banijay Germany arbeiten Produktionshäuser, Entertainment-Unternehmen, Live-Einheiten, Talent-Managements, Plattformen und Services. Gemeinsam bilden sie ein Ökosystem, das moderne Unterhaltung entwickelt, produziert, verlängert und erlebbar macht.",
    cta: { text: "Alle Companies entdecken", href: "/companies" },
  },

  /** Section 9: Partner-CTA. */
  partnerCta: {
    headline: "Let’s create what people talk about.",
    text:
      "Ob Sender, Plattform, Marke, Talent oder kreativer Partner: Wer Entertainment mit Wirkung entwickeln will, findet in Banijay Germany eine Welt aus Erfahrung, Reichweite, Produktionskraft und kreativer Eigenständigkeit.",
    cta: { text: "Kontakt aufnehmen", href: "/contact" },
  },
};
