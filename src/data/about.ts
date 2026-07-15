// About-Copy (Konzept „ABOUT", Sections 1–6 + Kontakt-CTA).

export const ABOUT = {
  hero: {
    headline: "We are Banijay Germany.",
    text:
      "Banijay Germany ist ein führendes Entertainment-Haus im deutschen Markt. Unter unserem Dach entstehen Programme, Formate, Live-Erlebnisse, digitale Inhalte und Talentwelten – entwickelt von eigenständigen Companies, Labels und kreativen Unternehmer:innen.",
  },
  proof: {
    headline: "Eine der stärksten Entertainment-Welten Deutschlands.",
    text:
      "Unsere Companies entwickeln, produzieren und vermarkten Entertainment für Sender, Plattformen, Marken, Bühnen und Communities.",
  },
  principle: {
    headline: "Kreative Freiheit braucht ein starkes Dach.",
    // Der ProofVideo-Statement-Overlay auf der About-Seite nutzt headline + den
    // ERSTEN Satz von text (siehe about/page.tsx).
    text:
      "So entstehen Geschichten, die Millionen erreichen. Banijay Germany verbindet Strategie, Reichweite, Erfahrung und operative Kraft.",
  },
  ceo: {
    headline: "Geführt von Menschen, die Entertainment verstehen.",
    text:
      "Marcus Wolter ist CEO & Co-Founder von Banijay Germany. Die aktuelle Website zeigt ihn prominent als CEO & Co-Founder; die Corporate-Seite beschreibt ihn als einen profilierten Vordenker und Manager der Branche.",
    quote: "Wir verstehen uns nicht als Filmproduzent, sondern als Entertainmenthaus.",
    name: "Marcus Wolter",
    role: "CEO & Co-Founder Banijay Germany",
    altQuote:
      "Unsere Stärke liegt in der Verbindung: kreative Unternehmer:innen, starke Companies und die Kraft eines internationalen Entertainment-Hauses. So entstehen Formate, die nicht nur produziert werden, sondern Menschen erreichen.",
  },
  international: {
    headline: "Aus Deutschland. Mit Anschluss an die ganze Banijay-Welt.",
    text:
      "Banijay Germany ist Teil der internationalen Banijay-Gruppe. So treffen lokale Marktnähe, globale Erfahrung und ein Netzwerk aus mehr als 130 Companies weltweit zusammen.",
  },
  world: {
    eyebrow: "Local Everywhere",
    headline: "Local everywhere",
    text:
      "Banijay Germany ist Teil eines internationalen Netzwerks aus Territory Holdings, Labels, Rights-, Kids-&-Family- und Live-Einheiten. So verbinden wir lokale Marktnähe mit globaler Formatkraft, Austausch und Reichweite.",
    note: "Geschichten entstehen lokal. Ihre Wirkung kann überall beginnen.",
    image: "/about-world/banijay-worldwide-bkg.jpg",
    cta: { text: "Banijay World ansehen", href: "https://www.banijay.com/our-world/" },
    holdings: [
      { name: "Banijay Asia", image: "/about-world/banijay-asia.png", href: "https://banijayasia.com/" },
      { name: "Banijay Benelux", image: "/about-world/banijay-benelux.png", href: "https://banijaybenelux.com/" },
      { name: "Banijay Italy", image: "/about-world/banijay-italy.png", href: "https://www.banijayitalia.it/" },
      { name: "Banijay Nordic", image: "/about-world/banijay-nordic.png", href: "https://www.linkedin.com/company/banijay-nordic/" },
      { name: "Banijay Germany", image: "/about-world/banijay-germany.png", href: "https://banijay.de/en/" },
      { name: "Banijay UK", image: "/about-world/banijay-uk.png", href: "https://banijayuk.com/" },
      { name: "Banijay France", image: "/about-world/banijay-france.png", href: "https://www.instagram.com/banijayfrance/" },
      { name: "Banijay Iberia", image: "/about-world/banijay-iberia.png", href: "https://www.linkedin.com/company/banijayiberia/" },
      { name: "Banijay Americas", image: "/about-world/banijay-americas.png", href: "https://banijayamericas.com/" },
    ],
    worldwide: [
      { label: "Banijay Rights", href: "https://www.banijayrights.com/" },
      { label: "Banijay Kids & Family", href: "https://www.banijaykidsandfamily.com/" },
      { label: "Banijay Live", href: "https://www.banijay.com/banijay-live/" },
      { label: "Banijay Group", href: "https://group.banijay.com/" },
    ],
  },
  partnership: {
    headline: "Partner für Entertainment.",
    text:
      "Ob Sender, Plattform, Marke, Talent oder Live-Partner: Banijay Germany bringt Ideen dorthin, wo sie Publikum finden und im Gespräch bleiben.",
    cta: { text: "Partner werden", href: "mailto:hello@banijay.de" },
    cards: [
      {
        label: "Sender & Plattformen",
        title: "Formate für starke Ausspielwege",
        text: "Produktionen, die im linearen Programm, im Stream und auf digitalen Kanälen funktionieren.",
        image: "/about-partners/sender-plattformen-wwm.jpg",
        imageAlt: "Wer wird Millionär Studio mit Moderator Günther Jauch",
        // Fokus: Günther Jauch (Prio 1) sitzt rechts im Bild → Crop nach rechts, damit
        // er im Container mittig steht (statt am Rand angeschnitten).
        objectPosition: "66% 42%",
      },
      {
        label: "Marken & Unternehmen",
        title: "Marken werden Teil von Entertainment",
        text: "Branded Entertainment, Creator-Kampagnen und Integrationen, die Marken als Teil von Geschichten erlebbar machen.",
        image: "/about-partners/marken-unternehmen-mission-unknown-atlantik.jpg",
        imageAlt: "Mission Unknown Atlantik Branded Entertainment Case mit Creator-Cast",
        objectPosition: "50% 50%",
      },
      {
        label: "Talente & Künstler:innen",
        title: "Persönlichkeiten mit Publikum",
        text: "Management, Entwicklung und Sichtbarkeit für Menschen, die Bühnen, Formate und Communities prägen.",
        image: "/about-partners/talente-kuenstler-lisa-feller.webp",
        imageAlt: "Lisa Feller als Comedy- und Live-Talent",
        objectPosition: "50% 38%",
      },
      {
        label: "Live & Experience Partner",
        title: "Entertainment im Raum",
        text: "Shows, Tourneen, Festivals und immersive Erlebnisse, die Begegnung und Reichweite verbinden.",
        image: "/about-partners/live-experience-cologne-comedy-festival.jpg",
        imageAlt: "Cologne Comedy Festival Live-Location bei Nacht",
        objectPosition: "50% 50%",
      },
    ],
  },
  cta: { text: "Gespräch starten", href: "/contact" },
};
