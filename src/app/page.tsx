"use client";
import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          ESG advisory for listed companies in the EU/UK & India
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          We help CFOs, CSOs and CEOs meet CSRD/ESRS, UK climate/ISSB and SEBI
          BRSR obligations—without bloat or greenwash. Audit-ready controls.
          Clear timelines. Practical templates.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700">
            Book a scoping call
          </Link>
          <Link href="/regulations" className="px-4 py-2 rounded-xl border">
            Explore the Regulatory Hub
          </Link>
        </div>
      </header>

      <section className="grid md:grid-cols-3 gap-4">
        {[
          { title: "CSRD / ESRS (EU)", href: "/services/csrd-advisory" },
          { title: "UK Climate / ISSB", href: "/services/uk-climate-reporting" },
          { title: "BRSR / BRSR Core (India)", href: "/services/brsr-advisory" },
        ].map((c) => (
          <Link key={c.href} href={c.href} className="rounded-2xl border p-5 hover:bg-muted">
            <div className="text-lg font-medium">{c.title}</div>
            <div className="text-sm text-muted-foreground mt-1">Read more →</div>
          </Link>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">How we work</h2>
        <ol className="list-decimal pl-6 text-muted-foreground space-y-1">
          <li>Scope & gap assessment (regulatory applicability, timelines).</li>
          <li>Double materiality & KPI mapping (controls, data owners).</li>
          <li>Disclosure drafting & audit-readiness (assurance coordination).</li>
          <li>Continuous updates as rules evolve (EU/UK/India).</li>
        </ol>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Lead resources</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li><Link className="underline" href="/regulations#csrd">CSRD timeline & ESRS overview</Link></li>
          <li><Link className="underline" href="/regulations#brsr">BRSR & BRSR Core scoping guide</Link></li>
          <li><Link className="underline" href="/insights">Insights: explainers for the C-suite</Link></li>
        </ul>
      </section>
    </main>
  );
}
