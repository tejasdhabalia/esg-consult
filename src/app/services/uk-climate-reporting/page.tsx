import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UK Climate/ISSB Reporting Advisory (TCFD to UK SRS)",
  description:
    "FCA-aligned climate disclosure advisory—governance, metrics/targets, transition planning and UK SRS readiness.",
  alternates: { canonical: "/services/uk-climate-reporting" },
};

export default function UKClimatePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">UK Climate / ISSB Reporting</h1>
      <p className="text-muted-foreground">
        Advisory from TCFD to emerging UK SRS: governance, metrics & targets, transition plan and controls.
      </p>

      <div className="pt-2">
        <Link href="/contact" className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700">
          Check UK SRS readiness
        </Link>
      </div>
    </main>
  );
}
