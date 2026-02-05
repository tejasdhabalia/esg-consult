import Link from "next/link";

export const metadata = {
  title: "Services",
  description:
    "ESG advisory: CSRD/ESRS, UK climate/ISSB, BRSR/BRSR Core, data & controls, assurance readiness.",
};

export default function ServicesPage() {
  const items = [
    { title: "CSRD / ESRS Advisory (EU)", href: "/services/csrd-advisory" },
    { title: "UK Climate / ISSB Reporting", href: "/services/uk-climate-reporting" },
    { title: "BRSR & BRSR Core (India)", href: "/services/brsr-advisory" },
    { title: "Data & Controls / Audit-readiness", href: "/services/data-controls" },
  ];
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Services</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((i) => (
          <Link key={i.href} href={i.href} className="border rounded-2xl p-5 hover:bg-muted">
            <div className="text-lg font-medium">{i.title}</div>
            <div className="text-sm text-muted-foreground mt-1">Learn more →</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
