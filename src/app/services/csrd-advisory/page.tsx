import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CSRD Advisory & ESRS Reporting Services",
  description:
    "CSRD scoping, double materiality, ESRS mapping, data controls & audit-readiness for EU-listed companies.",
  alternates: { canonical: "/services/csrd-advisory" },
};

export default function CSRDPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">CSRD Advisory & ESRS Reporting</h1>
      <p className="text-muted-foreground">
        We scope CSRD applicability, run double materiality, map ESRS disclosures, design data & control
        owners, and prepare you for limited assurance.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Typical scope</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>CSRD applicability & timing</li>
          <li>Double materiality assessment</li>
          <li>ESRS KPI mapping & data ownership</li>
          <li>Controls & audit-readiness</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">FAQs</h2>
        <details className="border rounded-xl p-4">
          <summary className="font-medium">Are we in scope for CSRD?</summary>
          <p className="text-muted-foreground mt-2">
            We check thresholds, listing status, and group structure to confirm applicability and timing.
          </p>
        </details>
        <details className="border rounded-xl p-4">
          <summary className="font-medium">What is double materiality?</summary>
          <p className="text-muted-foreground mt-2">
            Assessment across financial and impact materiality per ESRS; we align KPIs and disclosures accordingly.
          </p>
        </details>
      </section>

      <div className="pt-2">
        <Link href="/contact" className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700">
          Request a CSRD scoping call
        </Link>
      </div>
    </main>
  );
  {/* JSON-LD Service schema */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "CSRD Advisory & ESRS Reporting",
      "provider": {"@type": "Organization","name": "YourCo ESG Advisory"},
      "areaServed": [{"@type":"Country","name":"United Kingdom"},{"@type":"Country","name":"India"},{"@type":"Country","name":"Germany"}],
      "audience": {"@type":"BusinessAudience","name":"Listed companies (CFO/CSO/CEO)"},
      "offers": {"@type":"Offer","availability":"https://schema.org/InStock","price":"0","priceCurrency":"EUR","description":"Free 30-min CSRD scoping call"}
    }),
  }}
/>

}
