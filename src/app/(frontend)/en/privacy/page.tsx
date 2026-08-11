import type { Metadata } from "next";
import { AlgarveLegalPage } from "@/components/cinematic/algarve/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy of Banijay Germany GmbH.",
  alternates: { canonical: "/en/privacy", languages: { de: "/datenschutz", en: "/en/privacy", "x-default": "/datenschutz" } },
};

export default function PrivacyPage() {
  return (
    <AlgarveLegalPage title="Privacy" updated="Privacy policy">
      <p>Protecting your personal data is important to Banijay Germany GmbH. This privacy policy explains which data we process and for what purposes. You may access, save and print this policy at any time.</p>

      <h2>§ 1 Controller, data protection officer and scope</h2>
      <p>The controller within the meaning of the General Data Protection Regulation (GDPR) is:<br />Banijay Germany GmbH, Schanzenstraße 22, 51063 Cologne, Germany,<br />Email: <a href="mailto:hello@banijay.de">hello@banijay.de</a>.</p>
      <p>You can contact our data protection officer at <a href="mailto:datenschutz@banijaygermany.de">datenschutz@banijaygermany.de</a>. This privacy policy applies to the online services at www.banijay.de and associated subdomains.</p>

      <h2>§ 2 Principles of data processing</h2>
      <p>Personal data means any information relating to an identified or identifiable person, such as a name, age, address, telephone number, date of birth, email address, IP address or user behaviour. Information that cannot be linked to an individual, for example after anonymisation, is not personal data.</p>
      <p>We process personal data only on the basis of statutory permission or your consent. Personal data is deleted once the purpose of processing has been fulfilled and no statutory retention obligations apply.</p>

      <h2>§ 3 Individual processing activities</h2>
      <h3>1. Provision of the website</h3>
      <p>Each time our website is accessed, data is automatically stored in log files: IP address, date and time of access, requested file, amount of data transferred, referrer URL, browser type, operating system and the name of your access provider. The legal basis is Art. 6(1)(f) GDPR, reflecting our legitimate interests in connectivity, security and stability. The website is hosted through Vercel, which processes the technically required connection and log data as our processor. Data is deleted when it is no longer required for these purposes and no statutory retention obligation applies.</p>
      <h3>2. Applications</h3>
      <p>Our careers page links to the external softgarden applicant-management system for applications. Personal application data is not submitted through this website. Information about processing during the application procedure is provided by softgarden.</p>
      <h3>3. Contact</h3>
      <p>If you contact us by email, your details are stored to process your enquiry. The legal basis is Art. 6(1)(f) GDPR. You may object at any time by emailing <a href="mailto:datenschutz@banijaygermany.de">datenschutz@banijaygermany.de</a>. The data is deleted once the enquiry has been fully resolved.</p>
      <h3>4. Cookies</h3>
      <p>This website does not itself set analytics or marketing cookies. A technically necessary cookie with a lifetime of seven days may be set only when a specially protected preview link is opened; it enables access to that preview. The legal basis is Art. 6(1)(f) GDPR. However, the embedded Spotify player may use cookies and similar storage technologies from Spotify and other providers. Further information is provided in the Spotify section below. A separate consent-management facility is not currently integrated.</p>
      <h3>5. First-party videos</h3>
      <p>The editorial videos on this website are delivered as HTML5 videos from our own web infrastructure. Their playback does not embed video players from YouTube, Vimeo or comparable platforms and does not establish a connection to those providers.</p>
      <h3>6. Spotify</h3>
      <p>A podcast player provided by Spotify is embedded in the menu as an external iframe. A connection to Spotify is established when the website is accessed. Spotify may process your IP address, browser and device information and the page you visited. According to the Spotify Widget Terms, Spotify uses cookies and similar technologies and may also cause cookies from other providers to be set. Further data processing is carried out under Spotify’s responsibility.</p>
      <h3>7. Social-media content</h3>
      <p>We display selected posts from our social-media channels. Post data is retrieved server-side through Elfsight and Juicer; preview images and individual media may be delivered through their content-delivery networks or those of the relevant social-media provider. Technically required connection data such as your IP address and browser information may be processed. The legal basis is Art. 6(1)(f) GDPR, reflecting our legitimate interest in presenting current corporate communications. Further interaction with Instagram, LinkedIn or another platform takes place only when you open the relevant external link.</p>
      <h3>8. Job vacancies and softgarden</h3>
      <p>The vacancy information displayed on our careers page is retrieved server-side from the softgarden applicant-management system. An application and the associated processing of personal data take place only after you open the correspondingly marked external offer hosted by softgarden. The provider’s privacy information applies there.</p>

      <h2>§ 4 Disclosure of data</h2>
      <p>We disclose data to third parties only where you have consented, this is necessary to perform a contract, a legal obligation applies, or a legitimate interest requires it. Processors are selected carefully, reviewed regularly and contractually bound. We ensure an appropriate level of data protection before transferring data to third countries.</p>

      <h2>§ 5 Retention period</h2>
      <p>Personal data is stored only for as long as required for the stated purposes or until you withdraw consent. Statutory retention obligations may require longer storage.</p>

      <h2>§ 6 External links</h2>
      <p>Our website contains links to external third-party websites whose data processing is beyond our control. We accept no responsibility for those providers’ compliance with data protection requirements.</p>

      <h2>§ 7 Your rights</h2>
      <p>Under the GDPR, you have rights of access, rectification, erasure, restriction of processing, data portability, withdrawal of consent with future effect, objection to processing and the right to lodge a complaint with a supervisory authority. To exercise your rights, contact <a href="mailto:datenschutz@banijaygermany.de">datenschutz@banijaygermany.de</a>.</p>

      <h2>§ 8 Data security</h2>
      <p>We use comprehensive technical and organisational security measures to protect your data and review them regularly. Please note that data transmission over the internet may have security vulnerabilities and complete protection against access by third parties is not possible.</p>
    </AlgarveLegalPage>
  );
}
