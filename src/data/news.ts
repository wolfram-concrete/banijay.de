// News: die 9 neuesten Meldungen von der Live-Seite (scraped_content,
// Stand 2026-06-25), Bilder lokal in public/news/. Fließtexte sind realistische
// deutsche Platzhalter im Banijay-Ton — CMS-ready austauschbar, sobald die
// Redaktions-Anbindung steht.

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  img: string;
  /** Anreißer (Slider + Detail-Lead). */
  lead: string;
  /** Fließtext als Absätze. */
  body: string[];
}

export const NEWS: NewsItem[] = [
  {
    slug: "aaron-troschke-wolter-talks",
    title: "Aaron Troschke spricht bei WOLTER TALKS",
    date: "03.06.2026",
    category: "Wolter Talks",
    author: "Redaktion",
    img: "/news/n1.png",
    lead: "Zu Gast in der Gesprächsreihe von Marcus Wolter: Aaron Troschke über Reichweite, Formate und die Zukunft von Creator-Entertainment.",
    body: [
      "In der aktuellen Ausgabe von WOLTER TALKS trifft Marcus Wolter auf Aaron Troschke. Im Gespräch geht es um die Frage, wie aus digitaler Reichweite tragfähige Formate werden — und was klassische Produktion von der Creator-Welt lernen kann.",
      "Troschke gibt Einblicke in seine Arbeitsweise, die Mechaniken hinter erfolgreichen Social-Formaten und die Rolle von Authentizität in einem zunehmend fragmentierten Medienmarkt.",
      "WOLTER TALKS ist die Gesprächsreihe, in der Marcus Wolter mit Persönlichkeiten aus Entertainment, Wirtschaft und Kultur über die Kräfte spricht, die Unterhaltung heute prägen.",
    ],
  },
  {
    slug: "dkms-gegen-blutkrebs",
    title: "Gemeinsam gegen Blutkrebs: Wir stehen hinter der DKMS",
    date: "29.05.2026",
    category: "Verantwortung",
    author: "Banijay Germany",
    img: "/news/n2.png",
    lead: "Banijay Germany unterstützt die Arbeit der DKMS und ruft Mitarbeitende sowie Partner zur Registrierung als Stammzellspender:innen auf.",
    body: [
      "Alle 12 Minuten erhält in Deutschland ein Mensch die Diagnose Blutkrebs. Für viele ist eine Stammzellspende die einzige Chance auf Leben. Banijay Germany unterstützt deshalb die Arbeit der DKMS und macht innerhalb der eigenen Companies auf das Thema aufmerksam.",
      "Im Rahmen der Aktion informieren wir über den Ablauf der Registrierung und motivieren Teams an allen Standorten, sich als potenzielle Spender:innen typisieren zu lassen.",
      "Entertainment erreicht Millionen Menschen — diese Reichweite wollen wir nutzen, um für ein Thema zu sensibilisieren, das Leben retten kann.",
    ],
  },
  {
    slug: "marcus-wolter-brand-eins-podcast",
    title: "Marcus Wolter im brand eins Podcast",
    date: "17.04.2026",
    category: "Podcast",
    author: "Redaktion",
    img: "/news/n3.jpg",
    lead: "CEO Marcus Wolter spricht im brand eins Podcast über Führung, Kreativität und den deutschen Entertainment-Markt.",
    body: [
      "Im brand eins Podcast gibt Marcus Wolter Einblicke in die Führung eines der größten Entertainment-Häuser Deutschlands. Es geht um die Balance zwischen kreativer Freiheit und wirtschaftlicher Verantwortung.",
      "Wolter erläutert, warum eigenständige Companies mit klarer Handschrift der Kern des Banijay-Modells sind — und wie aus dieser Vielfalt Hits entstehen.",
      "Ein Gespräch über Mut zum Format, den Wert von Marken und die Frage, was gute Unterhaltung im Jahr 2026 ausmacht.",
    ],
  },
  {
    slug: "nelson-mueller-wolter-talks",
    title: "Nelson Müller spricht bei WOLTER TALKS",
    date: "13.04.2026",
    category: "Wolter Talks",
    author: "Redaktion",
    img: "/news/n4.jpg",
    lead: "Spitzenkoch und TV-Gesicht Nelson Müller zu Gast bei WOLTER TALKS — über Handwerk, Haltung und Entertainment mit Substanz.",
    body: [
      "Nelson Müller verbindet Spitzengastronomie und Fernsehen wie kaum ein anderer. Bei WOLTER TALKS spricht er mit Marcus Wolter über die Gemeinsamkeiten von Küche und Produktion: Präzision, Timing und ein Gespür für das Publikum.",
      "Müller erzählt, wie aus einer Idee ein Format wird, das Menschen bewegt — und warum Authentizität für ihn die wichtigste Zutat ist.",
      "WOLTER TALKS bringt Persönlichkeiten an einen Tisch, die Entertainment aus unterschiedlichen Perspektiven prägen.",
    ],
  },
  {
    slug: "primetime-hitrate-maerz",
    title: "88 % Primetime-Hitrate im März",
    date: "01.04.2026",
    category: "Erfolg",
    author: "Banijay Germany",
    img: "/news/n5.jpg",
    lead: "Starker Monat: 88 Prozent der Banijay-Primetime-Ausstrahlungen im März lagen über dem Sendermittelwert.",
    body: [
      "Der März war ein starker Monat für die Formate aus der Banijay-Welt: 88 Prozent aller Primetime-Ausstrahlungen erzielten Marktanteile über dem jeweiligen Sendermittelwert.",
      "Getragen wurde das Ergebnis von einer Mischung aus etablierten Marken und neuen Formaten, die bei Publikum und Sendern gleichermaßen überzeugten.",
      "Die Hitrate ist für uns ein wichtiger Gradmesser: Sie zeigt, dass unsere Companies verlässlich Formate liefern, die im Wettbewerb bestehen.",
    ],
  },
  {
    slug: "max-schradin-wolter-talks",
    title: "Max Schradin spricht bei WOLTER TALKS",
    date: "03.03.2026",
    category: "Wolter Talks",
    author: "Redaktion",
    img: "/news/n6.png",
    lead: "Max Schradin zu Gast bei WOLTER TALKS — über Innovation, Teams und die Produktion von morgen.",
    body: [
      "Bei WOLTER TALKS spricht Max Schradin mit Marcus Wolter darüber, wie sich Produktionsprozesse verändern und welche Rolle Technologie und Teamkultur dabei spielen.",
      "Im Zentrum steht die Frage, wie Kreativität skaliert werden kann, ohne ihre Kraft zu verlieren.",
      "Ein Gespräch über die Bedingungen, unter denen heute die Formate von morgen entstehen.",
    ],
  },
  {
    slug: "marcus-wolter-handelsblatt-interview",
    title: "Marcus Wolter im Handelsblatt-Interview",
    date: "22.02.2026",
    category: "Interview",
    author: "Redaktion",
    img: "/news/n7.jpg",
    lead: "Im Handelsblatt spricht Marcus Wolter über Marktdynamik, Streaming und die Stärke lokaler Produktion.",
    body: [
      "Im Interview mit dem Handelsblatt ordnet Marcus Wolter die aktuelle Marktdynamik ein: zwischen linearem Fernsehen, Streaming und einem wachsenden Wettbewerb um Aufmerksamkeit.",
      "Wolter betont die Bedeutung lokaler Produktion und starker Marken als Antwort auf einen globalisierten Content-Markt.",
      "Sein Fazit: Wer nah am Publikum produziert und Formate konsequent weiterdenkt, bleibt relevant.",
    ],
  },
  {
    slug: "primetime-hitrate-januar",
    title: "97 % Primetime-Hitrate im Januar",
    date: "02.02.2026",
    category: "Erfolg",
    author: "Banijay Germany",
    img: "/news/n8.jpg",
    lead: "Rekordstart ins Jahr: 97 Prozent der Banijay-Primetime-Ausstrahlungen im Januar über dem Sendermittelwert.",
    body: [
      "Das Jahr beginnt mit einem Ausrufezeichen: 97 Prozent aller Primetime-Ausstrahlungen aus der Banijay-Welt lagen im Januar über dem Sendermittelwert.",
      "Damit knüpfen unsere Companies an ein starkes Vorjahr an und untermauern die Verlässlichkeit ihrer Formate.",
      "Ein Ergebnis, das die Handschrift der Teams hinter den Marken widerspiegelt.",
    ],
  },
  {
    slug: "marcus-wolter-focus-money-interview",
    title: "Marcus Wolter im FOCUS-Money-Interview",
    date: "22.01.2026",
    category: "Interview",
    author: "Redaktion",
    img: "/news/n9.jpg",
    lead: "Marcus Wolter spricht mit FOCUS Money über Wachstum, Wertschöpfung und die Zukunft des Entertainment-Geschäfts.",
    body: [
      "Im Gespräch mit FOCUS Money erläutert Marcus Wolter, wie Banijay Germany wirtschaftliches Wachstum und kreative Exzellenz zusammenbringt.",
      "Er spricht über Investitionen in Talente und Formate — und über die Verantwortung, die mit einer führenden Marktposition einhergeht.",
      "Ein Ausblick auf die Kräfte, die das Entertainment-Geschäft in den kommenden Jahren prägen werden.",
    ],
  },
];

export const getNewsBySlug = (slug: string): NewsItem | undefined => NEWS.find((n) => n.slug === slug);
