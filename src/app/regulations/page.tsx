import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regulatory Hub: CSRD · UK Climate/ISSB · BRSR",
  description: "EU/UK & India ESG regulations—timelines, scope and how to get ready.",
  alternates: { canonical: "/regulations" },
};

export default function RegulationsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Regulatory Hub</h1>

      <section id="csrd" className="space-y-2">
        <h2 className="text-xl font-semibold">CSRD / ESRS (EU)</h2>
        <p className="text-muted-foreground">
          Who’s in scope, timelines, double materiality, ESRS mapping and assurance.
        </p>
        <Link className="underline" href="/services/csrd-advisory">CSRD Advisory →</Link>
      </section>

      <section id="uk" className="space-y-2">
        <h2 className="text-xl font-semibold">UK Climate / ISSB</h2>
        <p className="text-muted-foreground">FCA requirements, TCFD history and UK SRS transition.</p>
        <Link className="underline" href="/services/uk-climate-reporting">UK Climate Advisory →</Link>
      </section>

      <section id="brsr" className="space-y-2">
        <h2 className="text-xl font-semibold">BRSR & BRSR Core (India)</h2>
        <p className="text-muted-foreground">Top 1000 listed, indicators, value-chain, Core assurance.</p>
        <Link className="underline" href="/services/brsr-advisory">BRSR Advisory →</Link>
      </section>
    </main>
  );
}
