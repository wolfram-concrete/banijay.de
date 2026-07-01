// Contact-Copy (Konzept „CONTACT"). Funktional und partnerorientiert.

export const CONTACT_PAGE = {
  hero: {
    headline: "Let’s talk entertainment.",
    subline:
      "Du möchtest mit Banijay Germany sprechen, eine Partnerschaft anfragen, Presseinformationen erhalten oder mehr über unsere Companies erfahren? Hier findest du den richtigen Einstieg.",
  },
  areas: [
    { title: "Partner & Projekte", text: "Für Sender, Plattformen, Marken und kreative Partner." },
    { title: "Presse", text: "Für Medienanfragen, Informationen und offizielles Material." },
    { title: "Career", text: "Für Bewerbungen, Jobs und Einstiegsmöglichkeiten." },
    { title: "Allgemeine Anfragen", text: "Für alles, was nicht in eine der anderen Kategorien fällt." },
  ],
  /** Felder für das Kontaktformular-Wireframe. */
  formFields: [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "E-Mail", type: "email" },
    { name: "topic", label: "Anliegen", type: "select", options: ["Partner & Projekte", "Presse", "Career", "Allgemeine Anfrage"] },
    { name: "message", label: "Nachricht", type: "textarea" },
  ],
};
