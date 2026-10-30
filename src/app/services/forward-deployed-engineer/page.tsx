import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import { tejas, personSchema } from "@/lib/authors";

/*
  Forward deployed engineer (FDE) service. Agreed 30 October 2026.

  - Tejas personally, on retainer or per project. No engineers are
    supplied. Never imply a bench, a team or headcount on this page.
  - Executor role holds: the client's team runs the build. Rows 4 and 5 of
    the role list are worded softly on purpose (Tejas, 30 October 2026).
  - The right-hand column repeats job description wording so buyers and AI
    answers recognise the role. The left-hand column claims only what Tejas
    does (SEO answer 6).
  - Remote, on site or hybrid; the fee depends on the mix. areaServed
    IN, GB, US on that basis (SEO answer 7).
  - Title, description and H1 from the SEO project's answers, 30 October 2026.
*/
export const metadata = pageMetadata({
  title: "Fractional forward deployed engineer for AI",
  description:
    "Writing a forward deployed engineer job description? Get the role on retainer or per project, embedded with your teams to put your AI plan to work.",
  path: "/services/forward-deployed-engineer",
});

const PATH = "/services/forward-deployed-engineer";
const linkClass = "text-indigo-700 underline underline-offset-2 hover:text-indigo-900";

const FACTS = [
  ["Retainer or project", "Agreed in writing before we start"],
  ["Embedded with your teams", "Remote, on site or hybrid"],
  ["From strategy to a working use case", "Your team runs the build. The plan lands."],
];

type RoleRow = { n: number; ours: ReactNode; jd: string };

const ROLE: RoleRow[] = [
  {
    n: 1,
    ours: (
      <>
        <strong>Embed with your teams.</strong> Sit inside finance, operations, sales and service
        until each workflow is understood from the inside.
      </>
    ),
    jd: "Embed in the customer's environment rather than ship and leave",
  },
  {
    n: 2,
    ours: (
      <>
        <strong>Turn the strategy into scoped use cases.</strong> Translate the CTO&apos;s plan into
        concrete work with owners, data needs and a measure of success.
      </>
    ),
    jd: "Translate vague business problems into concrete technical work",
  },
  {
    n: 3,
    ours: (
      <>
        <strong>Connect the AI to your data and systems.</strong> Data, definitions, integrations
        and the hand-offs between systems, so the AI runs on real data.{" "}
        <Link href="/migrations/ai-ready-data" className={linkClass}>
          Getting the data ready
        </Link>
        .
      </>
    ),
    jd: "Connect the product to customer data and systems",
  },
  {
    n: 4,
    ours: (
      <>
        <strong>Guide pilots into live use.</strong> Work alongside your team as they set up
        workflows against real data, and help clear the blockers. Your team runs the build.
      </>
    ),
    jd: "Deploy and tune in production, troubleshoot on site",
  },
  {
    n: 5,
    ours: (
      <>
        <strong>Agree the checks with the business.</strong> Define the evaluation, review points
        and quality measures with your team, who put them in place. This is where{" "}
        <Link href="/services/ai-governance-and-adoption" className={linkClass}>
          AI and data governance
        </Link>{" "}
        meets the day job.
      </>
    ),
    jd: "Evaluation frameworks, guardrails, observability",
  },
  {
    n: 6,
    ours: (
      <>
        <strong>Train the people who will run it.</strong> So your teams operate it without us.
      </>
    ),
    jd: "Train internal teams to run AI systems independently",
  },
  {
    n: 7,
    ours: (
      <>
        <strong>Report back to the CTO.</strong> What works, what the plan missed and where a
        vendor falls short, said plainly. With the functional view, that includes a second look
        at the strategy itself.
      </>
    ),
    jd: "Carry field feedback to the roadmap; manage stakeholder expectations",
  },
];

const FAQS = [
  {
    q: "How is this different from hiring a full-time forward deployed engineer?",
    a: "You get the role for as many days as the work needs, from someone who already knows the functional side, without a recruiting cycle or a permanent salary. If the work turns out to need a full-time hire, we will say so.",
  },
  {
    q: "Is this staff augmentation?",
    a: "No. It is one person, Tejas Dhabalia, working with your CTO and your functional teams. We do not supply engineers.",
  },
  {
    q: "Do you replace our AI vendor or implementation partner?",
    a: "No. We work on your side of the table and hold them to the plan. Your team and your partners run the build.",
  },
  {
    q: "Where do you work?",
    a: "Remote, on site or a mix of the two, in India, the UK, the US and elsewhere. The fee depends on the mix and is agreed before we start.",
  },
  {
    q: "How is it priced?",
    a: "As a retainer, a set number of days each month alongside the CTO, or as a defined project, one use case or one function from plan to working. Either way it is agreed in writing before we start.",
  },
];

export default function ForwardDeployedEngineerPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Fractional forward deployed engineer for AI",
    serviceType: "Forward deployed engineering",
    description:
      "A forward deployed engineer on retainer or per project, embedded with a company's functional teams to put the CTO's AI strategy into practice and check it as it lands.",
    url: absUrl(PATH),
    provider: { "@type": "Organization", name: site.legalName, url: site.baseUrl },
    areaServed: ["IN", "GB", "US"].map((code) => ({ "@type": "Country", identifier: code })),
  };

  const personLd = { "@context": "https://schema.org", ...personSchema(tejas) };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absUrl("/services") },
      { "@type": "ListItem", position: 3, name: "Forward deployed engineer", item: absUrl(PATH) },
    ],
  };

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Forward deployed engineer, without the full-time hire"
        title="Your forward deployed engineer for AI"
        subtitle="Writing a job description for a forward deployed engineer? Get the role on retainer or for a defined project instead. Tejas Dhabalia embeds with your functional teams, puts your CTO's AI plan into practice and checks the strategy as it lands."
        primaryAction={{ label: site.headerCta.label, href: site.headerCta.href }}
        secondaryAction={{ label: "What the role covers", href: "#role" }}
        imageSrc="/hero/insights.jpg"
        imageAlt="Forward deployed engineer for AI strategy"
      />

      {/* THREE FACTS */}
      <section className="bg-indigo-50 border-b border-indigo-100">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
          {FACTS.map(([title, detail]) => (
            <div key={title}>
              <div className="font-semibold text-slate-900">{title}</div>
              <div className="mt-1 text-sm text-slate-600">{detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* THE GAP */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-slate-900">The gap after the AI strategy</h2>
          <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            <p>
              An AI strategy is written at the top. It lands in finance, operations, sales and
              service, where the people who run the processes were not in the room.
            </p>
            <p>
              The model works in the demo. Then it meets the real process: the exception nobody
              mentioned, the field that means something different in each team, the approval that
              happens in a WhatsApp group. The strategy is not wrong. It has never been tested
              against how the work is actually done.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT THE ROLE COVERS */}
      <section id="role" className="py-20 bg-slate-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-slate-900">What the role covers</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            Matched to what forward deployed engineer job descriptions ask for, so you can compare
            it with the one you are writing.
          </p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="py-3 pr-4 w-10 text-slate-500 font-medium">#</th>
                  <th className="py-3 pr-6 text-slate-900 font-semibold">What we do</th>
                  <th className="py-3 text-slate-500 font-medium w-[34%]">In an FDE job description</th>
                </tr>
              </thead>
              <tbody>
                {ROLE.map((row) => (
                  <tr key={row.n} className="border-b border-slate-200 align-top">
                    <td className="py-4 pr-4 text-slate-500">{row.n}</td>
                    <td className="py-4 pr-6 text-slate-700 leading-relaxed">{row.ours}</td>
                    <td className="py-4 text-slate-500 leading-relaxed">{row.jd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHY FUNCTIONAL KNOWLEDGE MATTERS. Bylined, first person. */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-slate-900">Why functional knowledge matters</h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-6 items-start">
            <Image
              src={tejas.imageSrc}
              alt={tejas.name}
              width={96}
              height={96}
              className="rounded-2xl object-cover flex-shrink-0"
            />
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                I have spent my career at the seam between systems and the business: mainframe
                engineering at IBM, then operating roles at Tata and Tata-Tesco. That is what lets me
                sit with a finance team at month end or an operations team at a stock count and see
                where an AI use case will help and where it will break.
              </p>
              <p>I do this work myself. You are not handed to a junior team.</p>
              <p className="text-sm text-slate-500">
                {tejas.name}, {tejas.roleShort}.{" "}
                <a href={tejas.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT IS ENGAGED */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-slate-900">How it is engaged</h2>
          <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
            <p>
              Case by case. Some clients want a retainer: a set number of days each month alongside
              the CTO. Others want a defined project: one use case or one function, from plan to
              working. We agree which before we start, in writing.
            </p>
            <p>
              Remote, on site or hybrid, in India, the UK, the US and elsewhere. The fee depends on
              the mix. This is not staff augmentation, and we do not supply engineers.
            </p>
          </div>
        </div>
      </section>

      {/* FAQS (visible only; no FAQPage schema, per the SEO brief) */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <div className="mt-10 grid gap-6">
            {FAQS.map((faq) => (
              <details key={faq.q} className="bg-slate-50 border rounded-2xl p-6">
                <summary className="font-semibold cursor-pointer">{faq.q}</summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">Have an AI plan that needs to land?</h2>
          <p className="mt-4 text-slate-300 leading-relaxed">
            Book a working session. Bring the strategy, and we will tell you where it is likely to
            meet the real process first.
          </p>
          <Link
            href={site.headerCta.href}
            className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium"
          >
            {site.headerCta.label}
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
