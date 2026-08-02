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
      <p>Each time our website is accessed, data is automatically stored in log files: IP address, date and time of access, requested file, amount of data transferred, referrer URL, browser type, operating system and the name of your access provider. The legal basis is Art. 6(1)(f) GDPR, reflecting our legitimate interests in connectivity, security and stability. The data is deleted when it is no longer required to display the website and is not disclosed to third parties.</p>
      <h3>2. Applications</h3>
      <p>You may submit applications and personal data through our careers page. We process this data in order to conduct the application procedure. Further information is available in the privacy policy of the applicant-management system used.</p>
      <h3>3. Contact</h3>
      <p>If you contact us by email or contact form, your details are stored to process your enquiry. The legal basis is Art. 6(1)(f) GDPR. You may object at any time by emailing <a href="mailto:datenschutz@banijaygermany.de">datenschutz@banijaygermany.de</a>. The data is deleted once the enquiry has been fully resolved.</p>
      <h3>4. Cookies</h3>
      <p>Technically necessary cookies are based on Art. 6(1)(f) GDPR. We process data from all other cookies on the basis of your consent under Art. 6(1)(a) GDPR, which you may withdraw at any time through the cookie settings.</p>
      <h3>5. Google Maps</h3>
      <p>We use Google Maps, provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. When activated, your IP address is transmitted to Google and a transfer to the United States cannot be ruled out. The legal basis is your consent under Art. 6(1)(a) GDPR, which may be withdrawn through the cookie settings.</p>

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
