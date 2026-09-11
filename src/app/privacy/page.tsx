import Link from "next/link";
import PageHero from "@/components/PageHero";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

/*
  REGULATORY CONTENT. Rewritten 11 September 2026.

  Drafted against two frameworks, because the audience spans both:
    - India, DPDP Act 2023 and DPDP Rules 2025. Requires an itemised notice
      separate from other terms, a route to exercise rights and withdraw
      consent, and the Data Protection Board of India as the complaint
      route. Substantive obligations commence 13 May 2027.
    - EU and UK GDPR, which apply to the European side of the practice.
      Article 13 requires legal basis per purpose, categories of recipient,
      third country transfers, retention, and the supervisory authority as
      a complaint route.

  Drafting rules for anyone editing this page:
    - State what happens. Do not explain why we chose to say it, do not
      describe our internal systems, and do not argue a legal position. The
      regulatory hub is where reasoning belongs.
    - Categories of recipient only. No vendor names. The named list is at
      /privacy/subprocessors, which is unlisted and shared on request.
    - Retention periods must stay identical to /privacy/request.

  Commitments carrying an operational obligation: no sale of personal data,
  no use for AI training, Tejas Dhabalia as the contact for rights and
  grievances. If any stops being true the line comes off the page.
*/

export const metadata = pageMetadata({
  title: "Privacy notice",
  description:
    "How DS Consulting collects and uses personal data, the basis for each use, how long it is kept, and how to exercise your rights.",
  path: "/privacy",
});

const LAST_UPDATED = "11 September 2026";

const PURPOSES = [
  {
    purpose: "Responding to an enquiry",
    data: "Name, email address, company, your message, and the source you selected",
    basis: "Consent",
    retention: "24 months from last contact",
  },
  {
    purpose: "Arranging and holding a meeting",
    data: "Name, email address, time zone, and any detail you provide when booking",
    basis: "Consent",
    retention: "24 months",
  },
  {
    purpose: "Sending a report, checklist or assessment result you requested",
    data: "Email address, and where applicable the responses you submitted and the result generated",
    basis: "Consent",
    retention: "24 months from last interaction",
  },
  {
    purpose: "Handling a data rights request or grievance",
    data: "Name, email address, the nature of the request, and any detail you provide",
    basis: "Legal obligation",
    retention: "36 months after closure",
  },
  {
    purpose: "Providing services to clients",
    data: "Contact details, engagement records, correspondence and deliverables",
    basis: "Performance of a contract",
    retention: "8 years from the end of the engagement",
  },
  {
    purpose: "Measuring website usage",
    data: "Pages viewed, referrer, approximate location, device and browser, as pseudonymous identifiers",
    basis: "Consent, given through the cookie banner",
    retention: "14 months",
  },
  {
    purpose: "Website security and prevention of abuse",
    data: "Technical data, including IP address and request metadata",
    basis: "Legitimate interests",
    retention: "As set by our service providers",
  },
];

const RECIPIENTS = [
  "Website hosting and content delivery",
  "Email, calendar and productivity services",
  "Website analytics",
  "Security and abuse prevention",
];

const RIGHTS = [
  { right: "Access", detail: "Obtain a copy of the personal data we hold about you." },
  { right: "Correction and completion", detail: "Have inaccurate data corrected and incomplete data completed." },
  { right: "Erasure", detail: "Have your personal data deleted, subject to any legal retention requirement." },
  { right: "Withdraw consent", detail: "Withdraw consent at any time, as easily as it was given." },
  { right: "Nomination", detail: "Nominate another person to exercise your rights on your behalf." },
  { right: "Grievance redressal", detail: "Raise a complaint about our handling of your personal data." },
  { right: "Objection and restriction", detail: "Where EU or UK data protection law applies, object to or restrict certain processing." },
  { right: "Portability", detail: "Where EU or UK data protection law applies, receive your data in a portable format." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does DS Consulting sell personal data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. We do not sell, rent or trade personal data, we do not disclose it to advertising networks, and we do not use it to train artificial intelligence models.",
      },
    },
    {
      "@type": "Question",
      name: "How do I request a copy of my data or ask for it to be deleted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use the form at consult-ds.com/privacy/request or email privacy@consult-ds.com. You do not need to give a reason. We acknowledge each request with a reference number and aim to complete within 30 days.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data transferred outside my country?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our service providers operate internationally, so personal data may be processed outside India and outside the European Economic Area, including in the United States. Where required, transfers are made under appropriate safeguards.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I decline cookies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The website functions normally and no analytics cookies are set. Analytics is declined by default and is only enabled if you accept it.",
      },
    },
  ],
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
      <div className="space-y-3 text-slate-600 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        title="Privacy notice"
        subtitle="How we collect and use personal data, the basis for each use, and how to exercise your rights."
        primaryAction={{ label: "Request your data", href: "/privacy/request" }}
        secondaryAction={{ label: "Cookies", href: "/cookies" }}
        imageSrc="/hero/legal.jpg"
        imageAlt="Privacy and data protection"
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-14">

          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6">
            <p className="text-slate-800 text-sm leading-relaxed">
              This notice applies to consult-ds.com and to personal data DS Consulting handles in the course
              of its business. It is a standalone document and does not form part of our terms of service.
              Last updated {LAST_UPDATED}.
            </p>
          </div>

          <Section id="who-we-are" title="Who we are">
            <p>
              DS Consulting is the data fiduciary, and the data controller where EU or UK data protection
              law applies. We decide the purposes for which personal data is used and are accountable for
              it.
            </p>
            <p>
              For any question about this notice, or to exercise a right, contact{" "}
              <a href="mailto:privacy@consult-ds.com" className="text-indigo-700 hover:underline">privacy@consult-ds.com</a>.
            </p>
          </Section>

          <Section id="purposes" title="What we collect and why">
            <p className="mb-2">
              We collect personal data only for the purposes set out below, and use only the data listed
              against each purpose.
            </p>
            <div className="space-y-3">
              {PURPOSES.map(({ purpose, data, basis, retention }) => (
                <div key={purpose} className="border border-slate-200 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900 text-sm mb-3">{purpose}</h3>
                  <dl className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:gap-3">
                      <dt className="text-xs text-slate-500 uppercase tracking-wide sm:w-24 flex-shrink-0">Data</dt>
                      <dd className="text-sm text-slate-700">{data}</dd>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-3">
                      <dt className="text-xs text-slate-500 uppercase tracking-wide sm:w-24 flex-shrink-0">Basis</dt>
                      <dd className="text-sm text-slate-700">{basis}</dd>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:gap-3">
                      <dt className="text-xs text-slate-500 uppercase tracking-wide sm:w-24 flex-shrink-0">Retention</dt>
                      <dd className="text-sm font-semibold text-indigo-700">{retention}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mt-4">
              Providing personal data is voluntary. If you choose not to, we may be unable to respond to
              your enquiry or provide the material you requested.
            </p>
          </Section>

          <Section id="not" title="What we do not do">
            <ul className="list-disc list-outside pl-5 space-y-2">
              <li>We do not sell, rent or trade personal data.</li>
              <li>We do not disclose personal data to advertising networks, and this site carries no advertising trackers.</li>
              <li>We do not use personal data to train artificial intelligence models.</li>
              <li>We do not acquire contact data from list brokers or by scraping.</li>
              <li>We do not make decisions about you by automated means alone.</li>
            </ul>
          </Section>

          <Section id="recipients" title="Who we share it with">
            <p className="mb-2">
              We use service providers who process personal data on our instructions and for no purpose of
              their own. They fall into the following categories.
            </p>
            <ul className="list-disc list-outside pl-5 space-y-1">
              {RECIPIENTS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p>
              A named list of our service providers is available on request from{" "}
              <a href="mailto:privacy@consult-ds.com" className="text-indigo-700 hover:underline">privacy@consult-ds.com</a>.
            </p>
            <p>
              We also disclose personal data where required by law, or in connection with professional
              advice, insurance or a corporate transaction.
            </p>
          </Section>

          <Section id="transfers" title="International transfers">
            <p>
              Our service providers operate internationally. Personal data may therefore be processed
              outside India and outside the European Economic Area, including in the United States. Where
              required, such transfers are made under appropriate safeguards.
            </p>
          </Section>

          <Section id="security" title="Security">
            <p>
              We apply technical and organisational measures appropriate to the nature of the data we hold,
              including access control, encryption in transit and restricted administrative access.
            </p>
            <p>
              In the event of a personal data breach we will notify affected individuals and the relevant
              authority as required.
            </p>
          </Section>

          <Section id="rights" title="Your rights">
            <div className="space-y-2 mb-5">
              {RIGHTS.map(({ right, detail }) => (
                <div key={right} className="flex flex-col sm:flex-row sm:gap-4 border-b border-slate-100 pb-2">
                  <span className="text-sm font-semibold text-slate-900 sm:w-52 flex-shrink-0">{right}</span>
                  <span className="text-sm text-slate-600 leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
            <p>
              Exercising a right is free of charge and you do not need to give a reason. We acknowledge each
              request with a reference and aim to respond within 30 days.
            </p>
            <div className="bg-indigo-600 rounded-xl p-5 text-white mt-4">
              <h3 className="font-bold mb-1">Make a request</h3>
              <p className="text-indigo-100 text-sm mb-4 leading-relaxed">
                Use the request form, or email privacy@consult-ds.com.
              </p>
              <Link
                href="/privacy/request"
                className="inline-block bg-white text-indigo-700 text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-indigo-50"
              >
                Request your data
              </Link>
            </div>
          </Section>

          <Section id="complaints" title="Complaints">
            <p>
              Data protection queries, rights requests and grievances are handled by Tejas Dhabalia,
              Co-founder, at{" "}
              <a href="mailto:privacy@consult-ds.com" className="text-indigo-700 hover:underline">privacy@consult-ds.com</a>.
            </p>
            <p>
              If you are not satisfied with our response, you may complain to the Data Protection Board of
              India. Where EU or UK data protection law applies, you may instead complain to your local
              supervisory authority.
            </p>
          </Section>

          <Section id="cookies" title="Cookies">
            <p>
              Analytics cookies are set only with your consent and are declined by default. You can change
              your preferences at any time from our{" "}
              <Link href="/cookies" className="text-indigo-700 hover:underline">cookie policy</Link>.
            </p>
          </Section>

          <Section id="children" title="Children">
            <p>
              Our services are directed at businesses and we do not knowingly collect personal data from
              anyone under 18. We do not direct advertising or behavioural tracking at children.
            </p>
            <p>
              If you believe a child has provided us with personal data, contact
              privacy@consult-ds.com and we will delete it.
            </p>
          </Section>

          <Section id="changes" title="Changes to this notice">
            <p>
              We update this notice when our practices change and record the date of the most recent
              revision above. Where a change materially affects how we use personal data already provided
              to us, we will notify affected individuals directly.
            </p>
            <p>
              Our <Link href="/terms" className="text-indigo-700 hover:underline">terms of service</Link> and{" "}
              <Link href="/cookies" className="text-indigo-700 hover:underline">cookie policy</Link> are
              separate documents.
            </p>
          </Section>

          <div className="border-t border-slate-200 pt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-5">Common questions</h2>
            <div className="space-y-5">
              {faqSchema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
                <div key={i}>
                  <h3 className="font-semibold text-slate-900 text-sm mb-2">{faq.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
        { "@type": "ListItem", position: 2, name: "Privacy notice", item: absUrl("/privacy") },
      ] }) }} />
    </div>
  );
}
