import Link from "next/link";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import ArticleByline from "@/components/ArticleByline";
import { tejas, personSchema } from "@/lib/authors";

/*
  REGULATORY CONTENT. Verified 11 September 2026.

  Sources, both primary:
    Press Information Bureau, Ministry of Electronics and Information
      Technology, "Government notifies DPDP Rules to empower citizens and
      protect privacy", 14 November 2025, Release ID 2190014
    The Digital Personal Data Protection Act, 2023 and the Digital Personal
      Data Protection Rules, 2025, notified 13 November 2025, MeitY

  Every date on this page:
    13 November 2025  Phase 1. Definitions, and the establishment,
                      composition and procedure of the Data Protection
                      Board of India. In force
    13 November 2026  Phase 2. The consent manager framework
    13 May 2027       Phase 3. All remaining substantive obligations

  THE PHASE MAPPING IS THE POINT OF THIS PAGE AND IT IS WIDELY REPORTED
  WRONG. A large amount of commentary assigns notice, consent, breach
  reporting, rights and SDF obligations to November 2026. Those commence
  in Phase 3, on 13 May 2027. November 2026 is the consent manager
  framework. Do not "correct" this page to match a secondary summary.

  Penalty ceilings from the Schedule to the DPDP Act 2023:
    INR 250 crore  reasonable security safeguards
    INR 200 crore  breach notification
    INR 200 crore  children's data obligations
    INR 150 crore  significant data fiduciary obligations
    INR 50 crore   any other provision
    INR 10,000     data principal duties

  Cross-border position, Section 16 of the Act and Rule 15 of the Rules:
    Negative list, not localisation. Transfers permitted to any country
    unless the Central Government restricts it by notification. No
    restricted list has been notified. Rule 13(4) allows the government to
    bar offshore transfer of specified categories, but only for designated
    significant data fiduciaries, and no categories are notified. Section
    16(2) preserves sectoral localisation such as the RBI payment data
    rules. Section 16 and Rule 15 commence 13 May 2027.

    The 2019 and 2021 drafts of the Bill did propose localisation for
    sensitive data. That was dropped. Commentary describing the draft
    position is still circulating, which is why this is on the page.

  Two things that decay and must be re-checked before republishing:
    1. Board staffing. Established November 2025, membership set at four.
       Confirm current staffing before restating that it has no published
       decisions.
    2. The 18-month timeline has been reported as under reconsideration
       for shortening. Nothing formally amended as at this date.
*/

export const metadata = pageMetadata({
  title: "India's DPDP Act: what commences when",
  description:
    "November 2026 is the consent manager framework, not the compliance deadline. The obligations that bind your business commence on 13 May 2027.",
  path: "/regulatory-hub/dpdp-in-scope-and-timeline",
});

const definitionText =
  "India's Digital Personal Data Protection framework commences in three phases over eighteen months from 13 November 2025, when the DPDP Rules 2025 were notified. Phase 1 established the Data Protection Board of India and is in force. Phase 2, on 13 November 2026, brings the consent manager framework into effect. Phase 3, on 13 May 2027, commences the obligations that apply to businesses handling personal data: notice, consent, security safeguards, breach notification, data principal rights, retention and erasure, children's data, and the additional duties of a significant data fiduciary.";

const definitionSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "DPDP commencement timeline",
  alternateName: "Digital Personal Data Protection Act 2023 and Rules 2025 phased implementation",
  description: definitionText,
  inDefinedTermSet: {
    "@type": "DefinedTermSet",
    name: "DS Consulting Regulatory Dictionary",
    url: absUrl("/regulatory-hub"),
  },
};

// Rendered copy and FAQPage schema are built from this one array, so the
// two cannot drift apart.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the DPDP compliance deadline November 2026 or May 2027?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "May 2027 for the obligations that apply to your business. The DPDP Rules 2025 set an eighteen month phased timetable from notification on 13 November 2025. The twelve month mark, 13 November 2026, commences the consent manager framework, which creates a registered class of intermediary that individuals can use to manage their consent across many companies. The eighteen month mark, 13 May 2027, commences everything else: notice, consent, security safeguards, breach notification, data principal rights, retention and erasure, children's data obligations and the additional duties of a significant data fiduciary. A great deal of published commentary assigns those to November 2026. It is worth checking any advice you receive against the commencement notification itself.",
      },
    },
    {
      "@type": "Question",
      name: "Does the DPDP Act apply to companies outside India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, where the processing is connected with offering goods or services to individuals in India. The Act applies to digital personal data processed within India, and it applies outside India where processing relates to offering goods or services to data principals in India. Place of incorporation does not decide the question. A company registered anywhere that runs a signup flow, a support desk or a payment page serving people in India is within scope.",
      },
    },
    {
      "@type": "Question",
      name: "What is a significant data fiduciary and how do I know if I am one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A significant data fiduciary is a data fiduciary, or a class of them, that the Central Government designates by notification. The factors include the volume and sensitivity of personal data processed, the risk to the rights of data principals, and the risk to the sovereignty and integrity of India, electoral democracy, security of the state and public order. Designation is by government notification rather than by self-assessment against a published threshold, so no organisation can confirm its own status in advance. The additional obligations, once designated, are structural: a Data Protection Officer based in India, periodic data protection impact assessments, periodic independent audits and due diligence on algorithmic software.",
      },
    },
    {
      "@type": "Question",
      name: "Does the DPDP Act require personal data of Indian customers to be stored in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, not as a general rule. Section 16 of the Act and Rule 15 of the Rules use a negative list: personal data may be transferred to any country except those the Central Government restricts by notification, and no restricted list has been published. This is the opposite of an adequacy regime. Hosting with a cloud provider whose infrastructure sits outside India is permitted. Three qualifications matter. The government may bar offshore transfer of specified categories of data for organisations designated as significant data fiduciaries, though no categories have been notified. Sectoral rules survive untouched, so the RBI payment data localisation requirements and equivalent SEBI and IRDAI rules still apply in those sectors. And earlier drafts of the Bill in 2019 and 2021 did propose mandatory localisation for sensitive data, which was dropped, so commentary describing that position is describing a version of the law that was never enacted.",
      },
    },
    {
      "@type": "Question",
      name: "What are the penalties under the DPDP Act?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Schedule to the Act sets ceilings against specific failures. Failure to take reasonable security safeguards to prevent a personal data breach carries up to INR 250 crore. Failure to notify the Data Protection Board of India and affected individuals of a breach carries up to INR 200 crore, as does breach of the children's data obligations. Breach of the additional obligations of a significant data fiduciary carries up to INR 150 crore. Any other breach of the Act or Rules carries up to INR 50 crore. These are maximums rather than typical outcomes, and that regulator determines each case after an inquiry. Enforcement runs exclusively through it. There is no private right of action, so a data principal cannot sue a data fiduciary directly for a DPDP breach.",
      },
    },
    {
      "@type": "Question",
      name: "How long do we have to respond to a data principal rights request?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Rules set a maximum of ninety days. That sounds generous until you try it. Most of the ninety days in a first attempt is spent establishing which systems hold data about the person, because the answer usually lives across a CRM, a support tool, a billing system, a marketing platform and at least one spreadsheet. Organisations that can answer quickly are the ones that did the data inventory first.",
      },
    },
    {
      "@type": "Question",
      name: "Can we appoint a registered DPDP consent manager now?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The consent manager framework does not commence until 13 November 2026, and registration with the Data Protection Board of India opens with it. A consent manager must be a company incorporated in India and must meet the conditions set out in the Rules. Anyone offering a registered DPDP consent manager service before that date is describing something that cannot yet exist in that form.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
    { "@type": "ListItem", position: 2, name: "Regulatory Hub", item: absUrl("/regulatory-hub") },
    {
      "@type": "ListItem",
      position: 3,
      name: "India's DPDP Act",
      item: absUrl("/regulatory-hub/dpdp-in-scope-and-timeline"),
    },
  ],
};

const personSchemaBlock = {
  "@context": "https://schema.org",
  ...personSchema(tejas),
};

const SCOPE = [
  {
    name: "Data fiduciary",
    badge: "MAY 2027",
    badgeClass: "bg-amber-100 text-amber-800",
    description:
      "You, if you decide why and how personal data is collected and used. A signup form, a CRM, a payroll system or a customer database makes you one. Size is not a factor.",
  },
  {
    name: "Data processor",
    badge: "MAY 2027",
    badgeClass: "bg-amber-100 text-amber-800",
    description:
      "Anyone processing personal data on a fiduciary's behalf. The fiduciary stays accountable, which is why processor contracts are a live piece of work rather than paperwork.",
  },
  {
    name: "Companies outside India",
    badge: "MAY 2027",
    badgeClass: "bg-amber-100 text-amber-800",
    description:
      "In scope where processing is connected with offering goods or services to individuals in India. Place of incorporation does not decide the question.",
  },
  {
    name: "Significant data fiduciary",
    badge: "ON DESIGNATION",
    badgeClass: "bg-red-100 text-red-800",
    description:
      "Designated by the Central Government on volume, sensitivity and risk. Extra structural duties follow: an India-based DPO, impact assessments, independent audits and algorithmic due diligence.",
  },
  {
    name: "Consent managers",
    badge: "NOV 2026",
    badgeClass: "bg-blue-100 text-blue-800",
    description:
      "Registered intermediaries that let individuals manage consent across many fiduciaries at once. Must be companies incorporated in India. A supplier category, not an obligation on you.",
  },
];

const TIMELINE = [
  {
    date: "13 November 2025",
    label: "Phase 1, in force",
    note: "Definitions, and the establishment, composition and procedure of the Data Protection Board of India. Appeals lie to TDSAT. No operational duty on your business from this date, but the enforcement machinery exists.",
  },
  {
    date: "13 November 2026",
    label: "Phase 2, the consent manager framework",
    note: "Consent managers may register with the Data Protection Board of India. They must be companies incorporated in India. This is an ecosystem milestone and is not the date your own obligations commence.",
  },
  {
    date: "13 May 2027",
    label: "Phase 3, everything that binds you",
    note: "Notice, consent, security safeguards, breach notification, data principal rights, retention and erasure, children's data, processor arrangements and the additional obligations of a significant data fiduciary.",
  },
];

const OBLIGATIONS = [
  {
    title: "Give a real notice",
    body:
      "Standalone, separate from your terms of service, in plain language, with an itemised description of the personal data collected and the specific purpose for each. A privacy policy saying data is collected to improve the service does not satisfy this.",
  },
  {
    title: "Get consent that means something",
    body:
      "Free, specific, informed, unconditional and unambiguous, given by a clear affirmative action. No pre-ticked boxes. No bundling with unrelated terms. Withdrawal must be as easy as giving it.",
  },
  {
    title: "Answer rights requests",
    body:
      "Access, correction, completion, updating, erasure, grievance redressal and nomination. The Rules set a maximum of ninety days to respond. Most of a first attempt is spent finding the data rather than deciding what to do with it.",
  },
  {
    title: "Report breaches to two audiences",
    body:
      "Affected individuals must be told promptly and in plain language: what happened, the likely consequences, what you have done about it and who to contact. The Data Protection Board of India must be informed as well.",
  },
  {
    title: "Set retention limits and honour them",
    body:
      "A defined reason for how long you hold data, and a process that actually deletes it when the reason ends. Specified classes of e-commerce, social media and online gaming intermediary face a fixed retention limit, with advance notice to the individual before erasure.",
  },
  {
    title: "Treat children's data as a separate problem",
    body:
      "Verifiable parental consent before processing a child's data, with narrow exemptions for purposes such as healthcare, education and real-time safety. Tracking, behavioural monitoring and targeted advertising directed at children are prohibited.",
  },
];

const PENALTIES = [
  { failure: "Failure to take reasonable security safeguards", cap: "₹250 crore" },
  { failure: "Failure to notify a personal data breach", cap: "₹200 crore" },
  { failure: "Breach of children's data obligations", cap: "₹200 crore" },
  { failure: "Breach of significant data fiduciary obligations", cap: "₹150 crore" },
  { failure: "Breach of any other provision of the Act or Rules", cap: "₹50 crore" },
];

export default function DpdpTimelinePage() {
  return (
    <div className="bg-white">
      {/* Hero / Definition banner */}
      <div className="bg-indigo-950 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/regulatory-hub" className="hover:text-white">Regulatory Hub</Link>
            <span className="mx-2">/</span>
            <span className="text-white">India&rsquo;s DPDP Act</span>
          </nav>
          <div className="inline-block bg-indigo-800 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Regulatory Dictionary
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">India&rsquo;s DPDP Act: what commences when</h1>
          <p className="text-indigo-200 text-xl font-medium mb-3">
            Digital Personal Data Protection Act 2023, and the DPDP Rules 2025
          </p>
          <p className="text-indigo-300 text-base max-w-2xl leading-relaxed">
            November 2026 is the consent manager framework. It is not the compliance deadline, whatever
            you have read. The obligations that bind your business commence on 13 May 2027.
          </p>
          <ArticleByline author={tejas} datePublished="2026-09-11" variant="hero" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Definition box */}
        <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6 mb-12">
          <p className="text-slate-800 leading-relaxed font-medium">
            <strong>The DPDP commencement timeline.</strong> {definitionText}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Quick facts */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Key facts at a glance</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Legal basis", value: "DPDP Act 2023, DPDP Rules 2025" },
                  { label: "Rules notified", value: "13 November 2025" },
                  { label: "In force now", value: "Board and enforcement machinery" },
                  { label: "Consent managers", value: "13 November 2026" },
                  { label: "Your obligations commence", value: "13 May 2027" },
                  { label: "Maximum penalty", value: "₹250 crore" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</div>
                    <div className="font-semibold text-slate-900 text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* The correction */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">The date most commentary gets wrong</h2>
              <p className="text-slate-700 text-sm leading-relaxed mb-3">
                India has had a data protection law on paper since August 2023. It sat unenforced for two
                years because the rules that operate it had not been made. That changed on 13 November 2025,
                when the government notified the DPDP Rules 2025 and set an eighteen month phased timetable.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-3">
                A large amount of published guidance reports that the substantive obligations land at the
                twelve month mark, in November 2026. They do not. November 2026 commences the consent
                manager framework, which creates a registered class of intermediary that individuals can use
                to manage consent across many companies at once. Useful, and not an obligation on you.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed">
                Notice, consent, security safeguards, breach notification, rights, retention, children&rsquo;s
                data and the significant data fiduciary duties all commence at the eighteen month mark, on
                13 May 2027. That is the date to plan against, and it is the one to check any advice you are
                given against.
              </p>
            </div>

            {/* Commencement timeline */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Commencement timeline</h2>
              <div className="relative">
                <div className="absolute left-[18px] top-5 bottom-5 w-0.5 bg-indigo-200" />
                <div className="space-y-4">
                  {TIMELINE.map(({ date, label, note }, i) => (
                    <div key={date} className="flex gap-4 items-start">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 z-10">
                        {i + 1}
                      </div>
                      <div className="pt-1">
                        <div className="font-semibold text-slate-900 text-sm">{date}: {label}</div>
                        <div className="text-xs text-slate-500 leading-relaxed">{note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-4">
                One live caveat. The government has been reported as considering a shorter compliance
                timeline than the eighteen months notified. Nothing has been formally amended. Plan against
                May 2027 and treat an earlier date as a risk rather than a certainty.
              </p>
            </div>

            {/* Scope */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Who is in scope?</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Scope follows the role you play and whether the processing touches people in India. It does
                not follow company size, sector or place of incorporation. The law uses two terms that
                everything else is built on: the data fiduciary decides why and how personal data is used,
                and the data principal is the person the data is about.
              </p>
              <div className="space-y-3">
                {SCOPE.map(({ name, badge, badgeClass, description }) => (
                  <div key={name} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900 text-sm">{name}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeClass}`}>
                        {badge}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Obligations */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">What you actually have to do</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Strip away the legal language and Phase 3 comes down to six things, plus a separate and
                non-negotiable rule on children.
              </p>
              <div className="space-y-3">
                {OBLIGATIONS.map(({ title, body }) => (
                  <div key={title} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-border */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Where the data can sit</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                The most common question we get is whether personal data of Indian customers has to stay
                on Indian servers. It does not, as a general rule. Section 16 of the Act and Rule 15 of the
                Rules work as a negative list: data may be transferred to any country except those the
                Central Government restricts by notification. No restricted list has been published.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                That is the opposite of an adequacy regime. Running your site, CRM or mail on
                infrastructure outside India is permitted, and most mid-market Indian companies do exactly
                that without a problem.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Three qualifications. The government may bar offshore transfer of specified categories for
                organisations designated as significant data fiduciaries, though no categories have been
                notified. Sectoral rules survive untouched, so RBI payment data localisation and the
                equivalent SEBI and IRDAI requirements still bite in those sectors. And this commences on
                13 May 2027 with everything else.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                The reason the confusion persists is that the 2019 and 2021 drafts of the Bill did propose
                mandatory localisation for sensitive data. It was dropped. A good deal of published
                commentary is still describing a version of the law that was never enacted. What you do
                owe your overseas providers is a processor arrangement that carries your obligations, which
                is a contract question rather than a hosting one.
              </p>
            </div>

            {/* Penalties */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">What it costs to get wrong</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                The Schedule to the Act attaches ceilings to specific failures rather than to the law in the
                abstract. These are maximums and the Data Protection Board of India decides each case after an
                inquiry, but they establish the scale the government intends.
              </p>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                {PENALTIES.map(({ failure, cap }, i) => (
                  <div
                    key={failure}
                    className={`flex items-center justify-between gap-4 px-4 py-3 ${i % 2 === 1 ? "bg-slate-50" : "bg-white"}`}
                  >
                    <span className="text-sm text-slate-700">{failure}</span>
                    <span className="text-sm font-bold text-slate-900 whitespace-nowrap">Up to {cap}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mt-4">
                Two points that matter more than the headline number. The ceilings attach per failure, so a
                single incident handled badly can engage more than one line of the Schedule. And enforcement
                runs exclusively through that regulator, so your exposure is regulatory rather than litigation
                driven. There is no private right of action.
              </p>
            </div>

            {/* Unsettled */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">What is still unsettled</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                The Data Protection Board of India is established, with membership set at four, but it has
                not yet published decisions. Until it rules on cases, everyone is reading the text of the law
                rather than a body of precedent. That includes us. Where this page says what something is
                likely to mean in practice, that is a reading and not a settled answer.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Significant data fiduciary designation is made by government notification rather than
                against a published threshold, so no organisation can confirm its own status in advance.
                Most mid-market companies will not be designated. That is a judgement rather than a fact,
                and it is worth a straight conversation instead of an assumption.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Consent manager registration does not open until November 2026. Anyone offering you a
                registered DPDP consent manager today is offering something that cannot yet exist in that
                form.
              </p>
            </div>

            {/* What to do now */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">What to do between now and May 2027</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Eight months sounds like time. It is, if you start now. Most remediation plans fail because
                they begin with the privacy policy, which is the output rather than the input.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                The starting point is the same in every case: work out what personal data you actually hold,
                where it lives, who touches it and which vendor operates the system it sits in. Everything
                else, from rewriting notices to answering a rights request inside ninety days, depends on
                having that list. Most companies find the gap is wider in the details than in the headline
                principles, which everyone already agrees with.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Where the fix reaches the data model and the integration layer rather than the policy
                alone, that is{" "}
                <Link
                  href="/services/integration"
                  className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4"
                >
                  integration
                </Link>{" "}
                work, and it takes longer than a legal review.
              </p>
            </div>

            {/* FAQ section */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-5">Frequently asked questions</h2>
              <div className="space-y-5">
                {faqSchema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
                  <div key={i} className="border-b border-slate-100 pb-5">
                    <h3 className="font-semibold text-slate-900 text-sm mb-2">{faq.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sources. Primary only. */}
            <div className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Sources</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Both primary. Secondary summaries of this timetable disagree with each other and several
                disagree with the notification, which is the reason this page exists.
              </p>
              <ul className="space-y-5">
                <li>
                  <a
                    href="https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2190014"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4 font-medium text-sm"
                  >
                    Government notifies DPDP Rules to empower citizens and protect privacy
                  </a>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">
                    Press Information Bureau, Ministry of Electronics and Information Technology,
                    14 November 2025. Release ID 2190014. Source for the eighteen month phased timetable,
                    the standalone itemised notice requirement, the ninety day response window for rights
                    requests, and the requirement that consent managers be Indian companies.
                  </p>
                </li>
                <li>
                  <a
                    href="https://www.meity.gov.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-700 hover:text-indigo-800 underline underline-offset-4 font-medium text-sm"
                  >
                    Ministry of Electronics and Information Technology
                  </a>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">
                    Publisher of the DPDP Act 2023, the DPDP Rules 2025 and the commencement notifications
                    of 13 November 2025. Check the current gazette text here before relying on any date on
                    this page.
                  </p>
                </li>
              </ul>
              <p className="text-xs text-slate-500 leading-relaxed mt-6">
                Dates and figures verified 11 September 2026. This page is a management summary and not
                legal advice.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lead magnet */}
            <div className="bg-indigo-600 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-2">DPDP exposure assessment</h3>
              <p className="text-indigo-200 text-xs mb-3 leading-relaxed">
                Eighteen questions across notice and consent, rights, breach readiness, retention,
                children&rsquo;s data and vendors. Scored, with the specific gaps named rather than a single
                number.
              </p>
              <Link
                href="/insights/dpdp-exposure-assessment"
                className="block bg-white text-indigo-700 text-xs font-bold text-center py-2 rounded-lg hover:bg-indigo-50"
              >
                Take the assessment
              </Link>
            </div>

            {/* Author */}
            <ArticleByline author={tejas} variant="sidebar" />

            <div className="border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-3">Related resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/insights/dpdp-exposure-assessment" className="text-indigo-700 hover:underline">
                    DPDP exposure assessment →
                  </Link>
                </li>
                <li>
                  <Link href="/regulatory-hub/eu-ai-act-in-scope-and-timeline" className="text-indigo-700 hover:underline">
                    EU AI Act timeline →
                  </Link>
                </li>
                <li>
                  <Link href="/insights/nist-ai-rmf-starter-profile" className="text-indigo-700 hover:underline">
                    NIST AI RMF starter profile →
                  </Link>
                </li>
                <li>
                  <Link href="/regulatory-hub" className="text-indigo-700 hover:underline">
                    All regulatory terms →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Service */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm mb-2">CRM and revenue operations</h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Most DPDP exposure sits in the systems that hold customer records. We help mid-market teams
                work out what personal data they hold, where it lives and which system has to change.
              </p>
              <Link
                href="/services/crm-and-revenue-operations"
                className="block text-xs font-semibold text-indigo-600 hover:underline"
              >
                View CRM and revenue operations →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definitionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchemaBlock) }} />
    </div>
  );
}
