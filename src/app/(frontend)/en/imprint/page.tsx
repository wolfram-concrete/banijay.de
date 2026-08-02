import type { Metadata } from "next";
import { AlgarveLegalPage } from "@/components/cinematic/algarve/LegalPage";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal notice for Banijay Germany GmbH.",
  alternates: { canonical: "/en/imprint", languages: { de: "/impressum", en: "/en/imprint", "x-default": "/impressum" } },
};

export default function ImprintPage() {
  return (
    <AlgarveLegalPage title="Imprint" updated="Information pursuant to Section 5 TMG">
      <h2>Banijay Germany GmbH</h2>
      <p>Schanzenstraße 22<br />51063 Cologne<br />Germany</p>

      <h2>Represented by</h2>
      <p>Managing Director: Marcus Wolter</p>

      <h2>Contact</h2>
      <p>Phone: +49 221 650 95000<br />Email: <a href="mailto:hello@banijay.de">hello@banijay.de</a></p>

      <h2>Commercial register</h2>
      <p>Registered in the commercial register<br />Register court: Cologne Local Court<br />Registration number: HRB 95735</p>

      <h2>VAT identification number</h2>
      <p>VAT identification number pursuant to Section 27a of the German VAT Act:<br />DE319673542</p>

      <h2>Responsible for content pursuant to Section 18(2) MStV</h2>
      <p>Marcus Wolter<br />c/o Banijay Germany GmbH<br />Schanzenstraße 22<br />51063 Cologne</p>

      <h2>Consumer dispute resolution</h2>
      <p>We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>

      <h2>Liability for content</h2>
      <p>As a service provider, we are responsible for our own content on these pages in accordance with general legislation. Under Sections 8 to 10 TMG, however, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances indicating unlawful activity.</p>
      <p>Obligations to remove or block the use of information under general legislation remain unaffected. Liability in this respect is only possible from the time we become aware of a specific infringement. We will remove such content immediately upon becoming aware of corresponding infringements.</p>

      <h2>Liability for links</h2>
      <p>Our website contains links to external third-party websites whose content is beyond our control. We therefore cannot accept any liability for such external content. The respective provider or operator is always responsible for the content of linked pages. We will remove links immediately if we become aware of any legal infringement.</p>

      <h2>Copyright</h2>
      <p>Content and works created by the website operators are subject to German copyright law. Reproduction, editing, distribution or any form of exploitation beyond the limits of copyright law requires the written consent of the respective author or creator. Downloads and copies of this website are permitted for private, non-commercial use only.</p>
    </AlgarveLegalPage>
  );
}
