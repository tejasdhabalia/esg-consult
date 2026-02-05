import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BRSR & BRSR Core Advisory for Listed Companies",
  description:
    "India-listed ESG reporting—BRSR/BRSR Core scoping, KPI mapping, value-chain coverage and assurance readiness.",
  alternates: { canonical: "/services/brsr-advisory" },
};

export default function BRSRPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">BRSR & BRSR Core (India)</h1>
      <p className="text-muted-foreground">
        We map essential/leadership indicators, plan value-chain data and coordinate BRSR Core assurance readiness.
      </p>

      <div className="pt-2">
        <Link href="/contact" className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700">
          Start a BRSR gap assessment
        </Link>
      </div>
    </main>
  );
}
