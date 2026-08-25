import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Team",
  description:
    "The people who run DS Consulting. Tejas Dhabalia on systems, CRM and revenue operations, Jigar Dhabalia on ESG and CSRD reporting systems.",
  path: "/team",
});

export default function TeamPage() {
  const teamSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DS Consulting Leadership Team",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Person",
          name: "Tejas Dhabalia",
          jobTitle: "Co-founder and Principal Consultant",
          description:
            "Former mainframe engineer turned commercial operator. Works across systems selection, integration, CRM and revenue operations, and AI in operations, with prior experience at Deloitte, Tata, Tesco and Godrej.",
          worksFor: {
            "@type": "Organization",
            name: site.legalName,
            url: site.baseUrl,
          },
          sameAs: site.linkedin.tejas,
          knowsAbout: [
            "Systems selection",
            "Systems integration",
            "CRM governance",
            "Revenue operations",
            "Marketing automation",
            "AI in operations",
          ],
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Person",
          name: "Jigar Dhabalia",
          jobTitle: "Co-founder and Principal Consultant",
          description:
            "Corporate sustainability specialist building reporting systems with data ownership, operating cadence and measurable controls. Cross-industry experience spanning B2B, manufacturing, oil and gas, chemicals and energy and utilities.",
          worksFor: {
            "@type": "Organization",
            name: site.legalName,
            url: site.baseUrl,
          },
          sameAs: site.linkedin.jigar,
          knowsAbout: [
            "ESG reporting systems",
            "CSRD and ESRS",
            "SEBI BRSR",
            "Sustainability governance",
            "GHG methodology",
          ],
        },
      },
    ],
  };

  return (
    <div>
      <PageHero
        title="Team"
        subtitle="Two principals, with specialist freelancers brought in for delivery. Anyone who will work on your project is introduced to you during scoping."
        primaryAction={{ label: site.assessment.label, href: "/contact" }}
        secondaryAction={{ label: "About the firm", href: "/about" }}
        imageSrc="/hero/team.jpg"
        imageAlt="DS Consulting team"
      />

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold">Who runs it</h2>

          <div className="grid md:grid-cols-2 gap-10 mt-12">
            <div className="bg-slate-50 border rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <Image
                  src="/team/tejas.jpg"
                  alt="Tejas Dhabalia"
                  width={96}
                  height={96}
                  className="rounded-xl object-cover"
                />
                <div>
                  <div className="text-xl font-semibold text-slate-900">Tejas Dhabalia</div>
                  <div className="text-sm text-slate-600">
                    Co-founder and Principal Consultant
                  </div>
                  <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                    Systems selection, integration, CRM and revenue operations, and AI in
                    operations. Started in mainframe engineering, moved into commercial roles,
                    and has since run marketing operations and customer systems at scale across
                    B2B and B2C. Previously at Deloitte, Tata, Tesco and Godrej.
                  </div>
                  <div className="mt-4">
                    <a
                      href={site.linkedin.tejas}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-700 font-medium"
                    >
                      LinkedIn profile →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <Image
                  src="/team/jigard.jpg"
                  alt="Jigar Dhabalia"
                  width={96}
                  height={96}
                  className="rounded-xl object-cover"
                />
                <div>
                  <div className="text-xl font-semibold text-slate-900">Jigar Dhabalia</div>
                  <div className="text-sm text-slate-600">
                    Co-founder and Principal Consultant
                  </div>
                  <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                    ESG and CSRD reporting systems. Focused on data ownership, operating cadence
                    and controls, so that a disclosed number can be traced back to where it came
                    from. Cross-industry experience across manufacturing, oil and gas, chemicals,
                    and energy and utilities.
                  </div>
                  <div className="mt-4">
                    <a
                      href={site.linkedin.jigar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-700 font-medium"
                    >
                      LinkedIn profile →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 rounded-2xl border-2 border-slate-900 p-10">
            <h3 className="text-xl font-semibold text-slate-900">How delivery works</h3>
            <p className="mt-3 text-slate-600 max-w-3xl leading-relaxed">
              We bring in specialist freelancers for delivery where a project needs skills we do
              not hold ourselves. They are introduced to you during scoping, not after you have
              signed. If we cannot cover the work with people you have met, we will tell you
              rather than staffing it and hoping.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              On ESG work we do not provide statutory audit or assurance. We build the reporting
              system that makes assurance possible.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium text-center"
            >
              {site.assessment.label}
            </Link>
            <Link href="/services" className="border px-6 py-3 rounded-lg font-medium text-center">
              See what we do
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />
    </div>
  );
}
