import Link from "next/link";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import DataRequestForm from "./DataRequestForm";

/*
  REGULATORY CONTENT. Position at 11 September 2026.

  Drafting rules, same as /privacy:
    - State the process. Do not explain why we run it, do not describe our
      internal systems, and do not argue a legal position.
    - Retention periods must stay identical to /privacy.

  Commitments carrying an operational obligation:
    - acknowledgement within one working day
    - 30 day target against the 90 day statutory maximum
    - Tejas Dhabalia named as the contact
  If any stops being true, the wording comes off the page.
*/

export const metadata = pageMetadata({
  title: "Request your data",
  description:
    "Request a copy of your personal data, ask for it to be corrected or erased, withdraw consent, or raise a grievance.",
  path: "/privacy/request",
});

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to make a data rights request to DS Consulting",
  description:
    "The process DS Consulting follows when an individual requests access to their personal data, correction, erasure, withdrawal of consent, nomination or grievance redressal.",
  totalTime: "P30D",
  step: [
    { "@type": "HowToStep", name: "Submit the request", text: "Use the form on this page or email privacy@consult-ds.com. No reason is required." },
    { "@type": "HowToStep", name: "Receive an acknowledgement", text: "We acknowledge within one working day, with a reference number and the date by which we will respond." },
    { "@type": "HowToStep", name: "Verification", text: "We confirm your identity, proportionately to the nature of the request." },
    { "@type": "HowToStep", name: "Response", text: "We act on the request and confirm in writing what has been done. Our target is 30 days, against a statutory maximum of 90." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need to give a reason?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The form includes an optional field for context, which helps us locate your records, but no request depends on it and we will not ask a second time.",
      },
    },
    {
      "@type": "Question",
      name: "How long will it take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We aim to complete every request within 30 days of acknowledgement. The maximum permitted under the DPDP Rules is 90 days. If a request is complex and requires longer, we will tell you before the 30 day point.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a charge?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Exercising your rights is free of charge.",
      },
    },
    {
      "@type": "Question",
      name: "Can a request be refused?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only where a legal requirement prevents us acting on it. Client engagement records are retained for eight years under Indian statutory record-keeping requirements. Where this affects your request we will tell you which records are held, on what basis, and until when. All other data is erased.",
      },
    },
    {
      "@type": "Question",
      name: "What if I am not satisfied with the response?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reply to the closure email quoting your reference, or write to privacy@consult-ds.com. If you remain unsatisfied you may complain to the Data Protection Board of India, or, where EU or UK data protection law applies, to your local supervisory authority.",
      },
    },
  ],
};

const RETENTION = [
  { data: "Enquiries", period: "24 months from last contact" },
  { data: "Report, checklist and assessment requests", period: "24 months from last interaction" },
  { data: "Meeting and booking records", period: "24 months" },
  { data: "Client engagement records", period: "8 years from end of engagement" },
  { data: "Newsletter subscriptions", period: "Until unsubscribed" },
  { data: "Rights request records", period: "36 months after closure" },
  { data: "Website analytics", period: "14 months" },
];

const STEPS = [
  { n: "1", title: "Submit the request", body: "Use the form below or email privacy@consult-ds.com. No reason is required." },
  { n: "2", title: "Acknowledgement", body: "We respond within one working day with a reference number, the date received and the date by which we will complete." },
  { n: "3", title: "Verification", body: "We confirm your identity, proportionately to the nature of the request. Where a request is made on behalf of another person we will ask for evidence of authority." },
  { n: "4", title: "Response", body: "We act on the request and confirm in writing what has been done. For erasure we identify any records retained under a legal requirement, the basis, and the date they can be removed." },
  { n: "5", title: "Escalation", body: "If you are not satisfied, reply quoting your reference. You may also complain to the Data Protection Board of India or, where EU or UK law applies, your local supervisory authority." },
];

export default function DataRequestPage() {
  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Request your data</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Request your data</h1>
          <p className="text-indigo-200 text-lg max-w-2xl leading-relaxed">
            Request a copy of the personal data we hold about you, ask for it to be corrected or erased,
            withdraw consent, or raise a grievance. No reason is required and there is no charge.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-14">

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Submit a request</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            You can also email{" "}
            <a href="mailto:privacy@consult-ds.com" className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4">privacy@consult-ds.com</a>.
            Requests are treated as received on the date they are sent.
          </p>
          <DataRequestForm />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Our process</h2>
          <div className="space-y-3">
            {STEPS.map(({ n, title, body }) => (
              <div key={n} className="flex gap-4 items-start border border-slate-200 rounded-xl p-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {n}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Retention periods</h2>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            {RETENTION.map(({ data, period }, i) => (
              <div
                key={data}
                className={`flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 ${i % 2 === 1 ? "bg-slate-50" : "bg-white"} ${i > 0 ? "border-t border-slate-200" : ""}`}
              >
                <span className="text-sm font-medium text-slate-900">{data}</span>
                <span className="text-sm font-bold text-indigo-700">{period}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mt-4">
            Personal data held beyond its retention period is deleted on review, whether or not a request
            has been made.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Contact</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Rights requests and grievances are handled by Tejas Dhabalia, Co-founder, at{" "}
            <a href="mailto:privacy@consult-ds.com" className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4">privacy@consult-ds.com</a>.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common questions</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
              <div key={i} className="border-b border-slate-100 pb-5">
                <h3 className="font-semibold text-slate-900 text-sm mb-2">{faq.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-slate-500 leading-relaxed">
          See also our{" "}
          <Link href="/privacy" className="text-indigo-700 hover:underline">privacy notice</Link> and{" "}
          <Link href="/cookies" className="text-indigo-700 hover:underline">cookie policy</Link>.
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
        { "@type": "ListItem", position: 2, name: "Privacy", item: absUrl("/privacy") },
        { "@type": "ListItem", position: 3, name: "Request your data", item: absUrl("/privacy/request") },
      ] }) }} />
    </div>
  );
}
