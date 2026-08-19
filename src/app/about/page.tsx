import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { pillars } from "@/lib/service-pillars";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Why DS Consulting exists, who runs it, and how business systems, sustainability reporting and finance operations fit together in one firm.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "About", item: absUrl("/about") },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.baseUrl,
    description: site.ai.summary,
    sameAs: [site.linkedin.tejas, site.linkedin.jigar],
  };

  const foundersSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Tejas Dhabalia",
      jobTitle: "Co-founder and Principal Consultant",
      sameAs: [site.linkedin.tejas],
      worksFor: { "@type": "Organization", name: site.legalName },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Jigar Dhabalia",
      jobTitle: "Co-founder and Principal Consultant",
      sameAs: [site.linkedin.jigar],
      worksFor: { "@type": "Organization", name: site.legalName },
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Why did ${site.displayName} start?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because the two halves of a technology project are usually bought from different people. One firm writes requirements it could not build. Another builds exactly what the requirements said, including the parts that made no commercial sense. We started to hold both ends of that.",
        },
      },
      {
        "@type": "Question",
        name: "What are the three areas you work in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Business systems, covering commerce platforms, ERP, CRM, integration and AI governance. Sustainability and ESG reporting systems. And outsourced finance and accounting teams. They meet in the finance function, which is why running them separately creates the handoffs where things get lost.",
        },
      },
      {
        "@type": "Question",
        name: "How big is the firm?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Small, deliberately, with specialist freelancers brought in for delivery. Anyone who will work on your project is introduced to you during scoping, so you know who is doing the work before you commit.",
        },
      },
      {
        "@type": "Question",
        name: "Do you do the consulting and the implementation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both. The people who scope your project are the people who deliver it. That is the point of the design surviving into the build.",
        },
      },
      {
        "@type": "Question",
        name: "How are you paid?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "By the client, always. We take no commissions, referral fees, reseller margin or partner incentives from any software vendor. We do not resell software and we do not provide IT support, help desk, networking or hardware.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide statutory audit or assurance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. On ESG and CSRD work we build the reporting system, the controls and the evidence trail so that assurance can be performed by someone else.",
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="About DS Consulting"
        subtitle="We run technology projects for mid-market companies, from the decision through to the build. Small firm, deep on both the systems and the business they have to serve."
        painLine={site.positioning.supporting}
        primaryAction={{ label: site.assessment.label, href: "/contact" }}
        secondaryAction={{ label: "See what we do", href: "/services" }}
        imageSrc="/hero/about.jpg"
        imageAlt="DS Consulting, technology consulting and implementation"
      />

      {/* WHY */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold max-w-3xl">Why the firm exists</h2>

          <div className="mt-6 max-w-3xl space-y-4 text-slate-600 leading-relaxed">
            <p>
              A technology project has two halves and they are usually bought from different
              people. A strategy firm writes the requirements. An implementation partner builds
              against them. Each does its own half competently.
            </p>
            <p>
              What nobody owns is the join. The requirements were written by people who would
              not use the system. The build followed them faithfully, including the parts that
              made no commercial sense. Neither party is at fault and the result is still a
              system the business works around rather than through.
            </p>
            <p>
              We started DS Consulting to hold both ends of that. Someone who can read an
              interface specification and a month end close calendar, and who is still there
              when the thing goes live.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {site.positioning.depth.map((item) => (
              <div key={item.title} className="bg-slate-50 border rounded-2xl p-8">
                <div className="h-1 w-10 rounded-full bg-indigo-600" />
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE WORK ON */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold max-w-3xl">What we work on</h2>
          <p className="mt-5 text-slate-600 max-w-3xl leading-relaxed">
            Three kinds of work, and they are less separate than they look. A sustainability
            disclosure is a data problem before it is a reporting problem. An outsourced finance
            team is only as good as the systems it works in. And a technology project is judged
            on numbers that come out of finance.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {pillars.map((pillar) => (
              <Link
                key={pillar.route}
                href={pillar.route}
                className="rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{pillar.summary}</p>
                <div className="mt-5 text-sm font-medium text-indigo-700">Read more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLE */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white border rounded-2xl p-10">
            <div className="text-sm font-semibold text-slate-500">Our principle</div>
            <div className="mt-3 text-2xl font-semibold text-slate-900">
              योगः कर्मसु कौशलम्
            </div>
            <div className="mt-2 text-slate-600">
              <span className="font-semibold">Transliteration:</span> Yogaḥ karmasu kauśalam
            </div>
            <div className="mt-1 text-slate-600">
              <span className="font-semibold">Meaning:</span> Excellence in execution
            </div>
            <div className="mt-5 text-slate-600 max-w-3xl">
              A decision is worth nothing until something has been built that reflects it.
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE ARE PAID */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">How we are paid</h2>
          <p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
            {site.positioning.independenceShort}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {site.positioning.independenceProof.map((point) => (
              <div key={point} className="bg-slate-50 border rounded-2xl p-8">
                <p className="text-slate-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border-2 border-slate-900 p-10">
            <h3 className="text-xl font-semibold text-slate-900">What we do not do</h3>
            <p className="mt-3 text-slate-600 max-w-3xl">
              Every item here is a revenue line that would give us a reason to recommend one
              thing over another.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {site.positioning.doesNotDo.map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE ARE SET UP */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold max-w-3xl">How the firm is set up</h2>
          <p className="mt-5 text-slate-300 max-w-3xl leading-relaxed">
            Worth being straight about, because it changes what you should expect from us.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              [
                "We are small",
                "Two principals, with specialist freelancers brought in for delivery. If you need a hundred consultants on site next month, we are the wrong firm and we will say so.",
              ],
              [
                "You meet everyone",
                "Anyone who will work on your project is introduced to you during scoping. No handover to a delivery team you have never met.",
              ],
              [
                "We turn work down",
                "Where the work sits outside what we do, or where the honest answer is that you do not need it. That is easier to do without a licence quota to hit.",
              ],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-700 bg-slate-800/40 p-8"
              >
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Who runs it</h2>

          <div className="grid md:grid-cols-2 gap-10 mt-12">
            {/* Tejas */}
            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="flex items-start gap-5">
                <Image
                  src="/team/tejas.jpg"
                  alt="Tejas Dhabalia"
                  width={96}
                  height={96}
                  className="rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="text-xl font-semibold text-slate-900">Tejas Dhabalia</div>
                  <div className="text-sm text-slate-600">
                    Co-founder and Principal Consultant
                  </div>
                  <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                    Started as a mainframe engineer at IBM, working in COBOL, DB2, CICS and
                    VSAM, then moved into commercial roles and ended up running marketing at
                    Tata-Tesco against an ₹800Cr revenue portfolio. Built the customer
                    intelligence and omnichannel systems at Nature&apos;s Basket across more than
                    a million customers and 25 markets.
                  </div>
                  <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                    That combination is the reason the firm looks the way it does. He has written
                    the code and he has owned the P&amp;L the code was supposed to move.
                  </div>

                  <ul className="mt-4 text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>
                      Built in-house CRM and 360-degree customer view systems integrating
                      purchase history, survey data and third-party market share data at scale
                    </li>
                    <li>
                      Led location strategy across more than 75 cities in India, covering store
                      viability, size and category assortment
                    </li>
                    <li>
                      Restructured merchandise to shift from festival-driven to occasion-driven
                      sales, sustaining revenue across the year
                    </li>
                  </ul>

                  <div className="mt-5">
                    <a
                      href={site.linkedin.tejas}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-700 font-medium"
                    >
                      LinkedIn profile →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Jigar */}
            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="flex items-start gap-5">
                <Image
                  src="/team/jigard.jpg"
                  alt="Jigar Dhabalia"
                  width={96}
                  height={96}
                  className="rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="text-xl font-semibold text-slate-900">Jigar Dhabalia</div>
                  <div className="text-sm text-slate-600">
                    Co-founder and Principal Consultant
                  </div>
                  <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                    Corporate sustainability, built as a reporting systems problem rather than a
                    disclosure exercise. Works with leadership teams on data ownership, operating
                    cadence and the control systems that make a number defensible when someone
                    asks where it came from.
                  </div>
                  <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                    Cross-industry experience spanning B2B, manufacturing, oil and gas, chemicals
                    and energy and utilities.
                  </div>

                  <ul className="mt-4 text-sm text-slate-600 list-disc list-inside space-y-1">
                    <li>
                      Designs sustainability reporting to be repeatable and ready for assurance
                    </li>
                    <li>
                      Translates ESG requirements into operating systems with named owners
                    </li>
                    <li>
                      Builds measurement frameworks leadership can actually review
                    </li>
                  </ul>

                  <div className="mt-5">
                    <a
                      href={site.linkedin.jigar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-700 font-medium"
                    >
                      LinkedIn profile →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              {site.assessment.label}
            </Link>
            <Link
              href="/services"
              className="border bg-white px-6 py-3 rounded-lg font-medium text-center"
            >
              See what we do
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <div className="mt-10 grid gap-6">
            {faqSchema.mainEntity.map((item) => (
              <details key={item.name} className="bg-slate-50 border rounded-2xl p-6">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  {item.name}
                </summary>
                <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {item.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(foundersSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
