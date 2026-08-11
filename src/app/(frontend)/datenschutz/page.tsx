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
        Stabilität). Die Website wird über Vercel gehostet. Vercel verarbeitet die technisch
        erforderlichen Verbindungs- und Protokolldaten als unser Auftragsverarbeiter. Die Daten werden
        gelöscht, sobald sie für die genannten Zwecke nicht mehr erforderlich sind und keine
        gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>
      <h3>2. Bewerbungen und Karriere-Anfragen</h3>
      <p>
        Für formelle Bewerbungen verlinkt unsere Karriereseite auf das externe
        Bewerbermanagement-System softgarden. Hinweise zur dortigen Verarbeitung im
        Bewerbungsverfahren erhalten Sie bei softgarden. Über das Karriereformular dieser Website
        können Sie uns zusätzlich eine Anfrage ohne Anhang senden.
      </p>
      <p>
        Dabei verarbeiten wir Name, optional Unternehmen, E-Mail-Adresse, optional Telefonnummer,
        gewähltes Anliegen und Nachricht, um Ihre Anfrage zu beantworten und mögliche nächste
        Schritte zu prüfen. Bei Anfragen mit Bewerbungsbezug ist Rechtsgrundlage § 26 Abs. 1 BDSG
        in Verbindung mit Art. 88 DSGVO. Für andere vorvertragliche Anfragen gilt Art. 6 Abs. 1
        lit. b DSGVO, andernfalls Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
        Bearbeitung von Karriere-Anfragen). Einer auf Art. 6 Abs. 1 lit. f DSGVO gestützten
        Verarbeitung können Sie jederzeit unter{" "}
        <a href="mailto:datenschutz@banijaygermany.de">datenschutz@banijaygermany.de</a>{" "}
        widersprechen.
      </p>
      <p>
        Die Formulardaten werden kurzzeitig in einer Vercel Function verarbeitet und dort nicht
        dauerhaft gespeichert. Anschließend werden sie per SMTP über den kasserver.com-Maildienst
        von ALL-INKL.COM an unser Empfängerpostfach übermittelt. Empfänger sind die intern mit der
        Anfrage befassten Stellen sowie Vercel und ALL-INKL.COM als technische Dienstleister. Die
        Nachricht bleibt im Empfängerpostfach gespeichert, bis die Anfrage abschließend bearbeitet
        ist; gesetzliche Aufbewahrungspflichten können eine längere Speicherung erfordern. Über das
        Formular werden keine Dateien, Lebensläufe oder Zeugnisse übertragen.
      </p>
      <h3>3. Kontaktaufnahme</h3>
      <p>
        Wenn Sie per E-Mail mit uns Kontakt aufnehmen, werden Ihre Angaben zur Bearbeitung der Anfrage
        gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an der Bearbeitung von Anfragen). Sie können der Verarbeitung
        jederzeit unter <a href="mailto:datenschutz@banijaygermany.de">datenschutz@banijaygermany.de</a>{" "}
        widersprechen. Die Daten werden gelöscht, sobald die Anfrage abschließend geklärt ist.
      </p>
      <h3>4. Cookies</h3>
      <p>
        Diese Website setzt selbst keine Analyse- oder Marketing-Cookies. Ausschließlich beim Aufruf
        eines besonders geschützten Vorschau-Links kann ein technisch notwendiges Cookie mit einer
        Gültigkeit von sieben Tagen gesetzt werden, das den Zugriff auf die Vorschau ermöglicht.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Der eingebundene Spotify-Player kann jedoch
        Cookies und vergleichbare Speichertechniken von Spotify und weiteren Anbietern einsetzen.
        Weitere Informationen finden Sie im nachfolgenden Abschnitt zu Spotify. Eine gesonderte
        Einwilligungsverwaltung ist derzeit nicht eingebunden.
      </p>
      <h3>5. Eigene Videos</h3>
      <p>
        Die redaktionellen Videos auf dieser Website werden als HTML5-Videos von unserer eigenen
        Web-Infrastruktur ausgeliefert. Für ihre Wiedergabe werden keine Video-Player von YouTube,
        Vimeo oder vergleichbaren Plattformen eingebunden und keine Verbindung zu diesen Anbietern
        hergestellt.
      </p>
      <h3>6. Spotify</h3>
      <p>
        Im Menü ist ein Podcast-Player des Dienstes Spotify als externer iFrame eingebunden. Beim
        Aufruf der Website wird eine Verbindung zu Spotify hergestellt. Spotify kann insbesondere
        Ihre IP-Adresse, Browser- und Geräteinformationen sowie die aufgerufene Seite verarbeiten.
        Nach den Nutzungsbedingungen für Spotify-Widgets setzt Spotify dabei Cookies und vergleichbare
        Technologien ein und kann auch Cookies weiterer Anbieter setzen lassen. Die weitere
        Datenverarbeitung erfolgt in der Verantwortung von Spotify.
      </p>
      <h3>7. Social-Media-Inhalte</h3>
      <p>
        Wir zeigen ausgewählte Beiträge aus unseren Social-Media-Kanälen. Die Beitragsdaten werden
        serverseitig über Elfsight und Juicer abgerufen; Vorschaubilder und einzelne Medien können über
        deren Content-Delivery-Netzwerke beziehungsweise die Netzwerke der jeweiligen Social-Media-
        Anbieter ausgeliefert werden. Hierbei können technisch erforderliche Verbindungsdaten wie Ihre
        IP-Adresse und Browserinformationen verarbeitet werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
        DSGVO (berechtigtes Interesse an einer aktuellen Darstellung unserer Unternehmenskommunikation).
        Eine weitergehende Interaktion mit Instagram, LinkedIn oder anderen Plattformen erfolgt erst,
        wenn Sie den jeweiligen externen Link öffnen.
      </p>
      <h3>8. Stellenangebote und softgarden</h3>
      <p>
        Die auf unserer Karriereseite dargestellten Stelleninformationen werden serverseitig aus dem
        Bewerbermanagement-System softgarden abgerufen. Eine formelle Bewerbung auf ein konkretes
        Stellenangebot und die dabei stattfindende Verarbeitung von Bewerbungsunterlagen erfolgen
        erst nach dem Öffnen des entsprechend gekennzeichneten externen Angebots bei softgarden.
        Dort gelten die Datenschutzhinweise des Anbieters.
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
