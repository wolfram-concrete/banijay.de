import type { Metadata } from "next";
import { AlgarveLegalPage } from "@/components/cinematic/algarve/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der Banijay Germany GmbH.",
  alternates: { canonical: "/datenschutz", languages: { de: "/datenschutz", en: "/en/privacy", "x-default": "/datenschutz" } },
};

export default function DatenschutzPage() {
  return (
    <AlgarveLegalPage title="Datenschutz" updated="Datenschutzerklärung">
      <p>
        Der Banijay Germany GmbH ist der Schutz Ihrer personenbezogenen Daten wichtig. Diese
        Datenschutzerklärung informiert Sie darüber, welche Daten wir zu welchen Zwecken verarbeiten.
        Sie können diese Erklärung jederzeit auf unserer Website einsehen, speichern und ausdrucken.
      </p>

      <h2>§ 1 Verantwortlicher, Datenschutzbeauftragter und Geltungsbereich</h2>
      <p>
        Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist die
        <br />
        Banijay Germany GmbH, Schanzenstraße 22, 51063 Köln, Deutschland,
        <br />
        E-Mail: <a href="mailto:hello@banijay.de">hello@banijay.de</a>.
      </p>
      <p>
        Unseren Datenschutzbeauftragten erreichen Sie unter{" "}
        <a href="mailto:datenschutz@banijaygermany.de">datenschutz@banijaygermany.de</a>. Diese
        Datenschutzerklärung gilt für die Internetangebote unter www.banijay.de und die zugehörigen
        Subdomains.
      </p>

      <h2>§ 2 Grundsätze der Datenverarbeitung</h2>
      <p>
        Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder
        identifizierbare Person beziehen — etwa Name, Alter, Adresse, Telefonnummer, Geburtsdatum,
        E-Mail-Adresse, IP-Adresse oder Nutzerverhalten. Informationen ohne Personenbezug
        (z. B. durch Anonymisierung) fallen nicht darunter.
      </p>
      <p>
        Die Verarbeitung personenbezogener Daten erfolgt stets auf Grundlage einer gesetzlichen
        Erlaubnis oder Ihrer Einwilligung. Personenbezogene Daten werden gelöscht, sobald der Zweck
        der Verarbeitung erfüllt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2>§ 3 Einzelne Verarbeitungsvorgänge</h2>
      <h3>1. Bereitstellung der Website</h3>
      <p>
        Bei jedem Aufruf unserer Website werden automatisch Daten in Logfiles gespeichert:
        IP-Adresse, Datum und Uhrzeit des Zugriffs, abgerufene Datei, übertragene Datenmenge,
        Referrer-URL, Browsertyp, Betriebssystem sowie der Name Ihres Access-Providers. Rechtsgrundlage
        ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Verbindungsaufbau, Sicherheit und
        Stabilität). Die Daten werden gelöscht, sobald sie für die Darstellung der Website nicht mehr
        erforderlich sind. Eine Weitergabe an Dritte erfolgt nicht.
      </p>
      <h3>2. Bewerbungen</h3>
      <p>
        Über unsere Karriereseite können Sie sich bewerben und dabei personenbezogene Daten
        übermitteln. Die Verarbeitung erfolgt zur Durchführung des Bewerbungsverfahrens. Nähere
        Hinweise finden Sie in der Datenschutzerklärung des eingesetzten Bewerbermanagement-Systems.
      </p>
      <h3>3. Kontaktaufnahme</h3>
      <p>
        Wenn Sie per E-Mail oder Kontaktformular mit uns Kontakt aufnehmen, werden Ihre Angaben zur
        Bearbeitung der Anfrage gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an der Bearbeitung von Anfragen). Sie können der Verarbeitung
        jederzeit unter <a href="mailto:datenschutz@banijaygermany.de">datenschutz@banijaygermany.de</a>{" "}
        widersprechen. Die Daten werden gelöscht, sobald die Anfrage abschließend geklärt ist.
      </p>
      <h3>4. Cookies</h3>
      <p>
        Für technisch notwendige Cookies ist Art. 6 Abs. 1 lit. f DSGVO Rechtsgrundlage. Für alle
        übrigen Cookies verarbeiten wir Daten auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a
        DSGVO), die Sie jederzeit über die Cookie-Einstellungen widerrufen können.
      </p>
      <h3>5. Google Maps</h3>
      <p>
        Wir nutzen Google Maps (Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin
        4, Irland). Bei Aktivierung wird Ihre IP-Adresse an Google übertragen, wobei ein Transfer in
        die USA nicht ausgeschlossen ist. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a
        DSGVO). Die Einwilligung ist über die Cookie-Einstellungen widerrufbar.
      </p>

      <h2>§ 4 Weitergabe von Daten</h2>
      <p>
        Eine Weitergabe an Dritte erfolgt nur, wenn Sie eingewilligt haben (Art. 6 Abs. 1 lit. a
        DSGVO), dies zur Vertragserfüllung erforderlich ist (lit. b), eine gesetzliche Verpflichtung
        besteht (lit. c) oder ein berechtigtes Interesse dies erfordert (lit. f). Eingesetzte
        Auftragsverarbeiter werden sorgfältig ausgewählt, regelmäßig geprüft und vertraglich gebunden.
        Vor einer Übermittlung in Drittländer stellen wir ein angemessenes Datenschutzniveau sicher.
      </p>

      <h2>§ 5 Speicherdauer</h2>
      <p>
        Personenbezogene Daten werden nur so lange gespeichert, wie es für die genannten Zwecke
        erforderlich ist oder bis Sie eine erteilte Einwilligung widerrufen. Gesetzliche
        Aufbewahrungspflichten können eine längere Speicherung erforderlich machen.
      </p>

      <h2>§ 6 Hyperlinks</h2>
      <p>
        Unsere Website enthält Links zu externen Websites Dritter, auf deren Datenverarbeitung wir
        keinen Einfluss haben. Für die Einhaltung der Datenschutzbestimmungen durch die jeweiligen
        Anbieter übernehmen wir keine Verantwortung.
      </p>

      <h2>§ 7 Ihre Rechte</h2>
      <p>
        Ihnen stehen nach der DSGVO folgende Rechte zu: Auskunft (Art. 15), Berichtigung (Art. 16),
        Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20),
        Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3), Widerspruch gegen die
        Verarbeitung (Art. 21) sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77). Zur
        Ausübung Ihrer Rechte wenden Sie sich an{" "}
        <a href="mailto:datenschutz@banijaygermany.de">datenschutz@banijaygermany.de</a>.
      </p>

      <h2>§ 8 Datensicherheit</h2>
      <p>
        Wir setzen umfassende technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten
        zu schützen, und überprüfen diese regelmäßig. Bitte beachten Sie, dass die Datenübertragung im
        Internet Sicherheitslücken aufweisen kann; ein lückenloser Schutz vor dem Zugriff durch Dritte
        ist nicht möglich.
      </p>
    </AlgarveLegalPage>
  );
}
