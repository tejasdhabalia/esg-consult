import Link from "next/link";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import { tejas, personSchema } from "@/lib/authors";
import AiRoiTool from "./AiRoiTool";

/*
  AI ROI calculator. Brief 1, technology content plan; built as a lead-gated
  page instead of a spreadsheet, decided by Tejas 30 October 2026. The
  introduction above the form is open so search engines and visitors can
  read what the tool does. The companion article is /insights/ai-roi.
*/
export const metadata = pageMetadata({
  title: "AI ROI calculator: scale, fix or stop",
  description:
    "Work out whether an AI use case pays back: payback in months, three-year value and a scale, fix or stop recommendation. Results emailed to you.",
  path: "/insights/ai-roi-calculator",
});

const PATH = "/insights/ai-roi-calculator";
const linkClass = "text-indigo-700 underline underline-offset-2 hover:text-indigo-900";

export default function AiRoiCalculatorPage() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI ROI calculator",
    description:
      "Calculates payback, three-year net value and a scale, fix or stop recommendation for one AI use case, at half, planned and one and a half times planned adoption.",
    url: absUrl(PATH),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: personSchema(tejas),
    publisher: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    dateCreated: "2026-10-30",
    dateModified: "2026-10-30",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
      { "@type": "ListItem", position: 3, name: "AI ROI calculator", item: absUrl(PATH) },
    ],
  };

  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-indigo-100">AI ROI calculator</span>
          </nav>
          <div className="inline-block bg-indigo-800 text-indigo-100 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Interactive tool
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">AI ROI calculator</h1>
          <p className="text-lg max-w-2xl text-indigo-100">
            Is this AI use case paying back, and should you scale it, fix it or stop it? Enter one use
            case and get payback in months, three-year value and a recommendation.
          </p>
          <a
            href="#calculator"
            className="mt-8 inline-block bg-white text-indigo-800 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50"
          >
            Open the calculator
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-14">
        <section className="space-y-4 text-slate-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900">What it works out</h2>
          <p>
            You enter the baseline for one process: how often the task happens, how long it takes and
            how often it goes wrong. Then what changes with AI, how confident you are in each kind of
            value, and the one-off and running costs. Amounts can be in rupees, pounds or dollars.
          </p>
          <p>
            It returns the value per month, the running cost, payback in months and net value over
            three years. It shows each at half the adoption you planned and at one and a half times,
            because most AI cases live or die on whether people actually use it.
          </p>
        </section>

        <section className="space-y-4 text-slate-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900">Scale, fix or stop</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-slate-900">Scale</strong> when it pays back within 12 months at
              the adoption you planned, and still comes out ahead over three years at half that adoption.
            </li>
            <li>
              <strong className="text-slate-900">Fix</strong> when it pays back within 36 months at
              planned adoption but not at half. Fix adoption, data or ownership before spending more.
            </li>
            <li>
              <strong className="text-slate-900">Stop</strong> when it does not pay back within 36
              months even at planned adoption.
            </li>
          </ul>
          <p>
            Why the rules are this strict, and the costs most pilots leave out, are in{" "}
            <Link href="/insights/ai-roi" className={linkClass}>
              why your AI pilot is not paying back
            </Link>
            .
          </p>
        </section>

        <AiRoiTool />

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-600 leading-relaxed">
          <h2 className="text-lg font-semibold text-slate-900">Before and after the calculation</h2>
          <p className="mt-2">
            Keep each use case in the{" "}
            <Link href="/insights/ai-use-case-register" className={linkClass}>AI use case register</Link>
            , so you know what you run before you ask whether it pays. If the case depends on data
            spread across systems that do not talk, start with{" "}
            <Link href="/migrations/ai-ready-data" className={linkClass}>getting the data ready</Link>.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block bg-indigo-700 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-indigo-800"
          >
            {site.movePlan.label}
          </Link>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
