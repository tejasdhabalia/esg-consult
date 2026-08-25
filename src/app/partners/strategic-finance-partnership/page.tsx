import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

/*
  Migrated from hand-rolled metadata to the shared helper, which was missing
  OG tags and an image, so the page shared as a bare link.

  noindex is deliberate. Brief 3, Task 4 (SEO project), decision 3 confirmed
  25 Aug 2026. This page recruits introducers, and it was the only live page
  under the finance and accounting area, so a buyer searching for finance
  outsourcing could land on a page offering them commission. The commercial
  arrangement is sound. The audience is wrong for that search position.

  follow stays true, so links out of this page still pass value.

  The footer link stays. Anyone arriving deliberately should still get here.
  Buyers should reach /services/finance-and-accounting, which stays indexed.

  Also excluded from the sitemap in scripts/generate-sitemap.mjs. The two go
  together: a noindex page listed in the sitemap sends Google a contradiction.

  Rewriting the page for a clearer audience is separate work and sits with
  the DS Consulting project.
*/
export const metadata = pageMetadata({
  title: "Strategic finance partnership program",
  description:
    "A partnership program for advisors, consultants, ERP partners and ecosystem operators building dedicated India-based finance capacity for their clients.",
  path: "/partners/strategic-finance-partnership",
  noindex: true,
});
const roles = [
  // Transaction Layer
  {
    layer: "Transaction",
    items: [
      { title: "Bookkeeper", scope: "Bank feeds, coding, categorisation, reconciliation support" },
      { title: "Accounts Payable Specialist", scope: "Vendor invoice management, PO matching, approval workflow" },
      { title: "Accounts Receivable Specialist", scope: "Sales invoicing, collections follow-up, AR dashboards" },
      { title: "AP Manager", scope: "AP team oversight, payment runs, vendor relationship management" },
      { title: "Billing Specialist", scope: "Invoice generation, billing accuracy, client account reconciliation" },
      { title: "Collections Specialist", scope: "Overdue account follow-up, dispute resolution, DSO reduction" },
    ],
  },
  // Execution Layer
  {
    layer: "Execution",
    items: [
      { title: "Staff Accountant", scope: "Journal entries, account reconciliations, month-end support" },
      { title: "GL Accountant", scope: "General ledger ownership, close checklists, accruals, reporting" },
    ],
  },
  // Strategic Layer
  {
    layer: "Strategic",
    items: [
      { title: "Senior Accountant", scope: "Complex reconciliations, multi-entity, audit support, review" },
      { title: "Financial Controller", scope: "Financial governance, internal controls, board reporting" },
      { title: "Budget Analyst", scope: "Annual budgeting, rolling forecasts, variance analysis" },
      { title: "Financial Analyst", scope: "Financial modelling, scenario analysis, management reporting" },
      { title: "FP&A Analyst", scope: "Strategic planning, KPI dashboards, investor-ready reporting" },
    ],
  },
];
const layerColors: Record<string, string> = {
  Transaction: "bg-slate-100 text-slate-700 border-slate-200",
  Execution:   "bg-indigo-50  text-indigo-700 border-indigo-200",
  Strategic:   "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const partnerSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Strategic finance partnership program",
  description:
    "A strategic finance partnership program from DS Consulting for advisors, consultants, ERP partners, GCC advisors, and ecosystem operators who want structured referral fees or ongoing commission around dedicated India-based finance capacity.",
  provider: {
    "@type": "Organization",
    name: site.legalName,
    url: site.baseUrl,
  },
  url: absUrl("/partners/strategic-finance-partnership"),
};

const idealClient = [
  { label: "Company profile", value: "US, UK, Europe, UAE or Singapore-based global corporate, typically 100 to 1,000+ employees" },
  { label: "Stage", value: "Scaling fast, often Series B through mid-market growth" },
  { label: "Geography", value: "HQ in the US, UK, Europe, UAE or Singapore expanding into India or managing cross-border operations" },
  { label: "Finance state", value: "Lean or overloaded finance team, with no offshore finance function yet" },
  { label: "Buyer", value: "CFO, VP Finance, or COO, whoever controls the finance stack" },
  { label: "Common triggers", value: "ERP go-live, PE investment, GCC setup, rapid headcount growth, close pressure, AP and AR volume growth, or reporting complexity" },
];

const easyConversationCards = [
  {
    title: "They already trust you",
    body:
      "The client is already in your network. You are not creating a new need. You are extending an existing advisory relationship with a practical finance capacity answer.",
  },
  {
    title: "The pain is already visible",
    body:
      "Finance leaders already know when close is unstable, AP and AR volume is rising, hiring is delayed, or the team is overloaded. The need is present before the pitch begins.",
  },
  {
    title: "The offer is concrete",
    body:
      "This is not a vague BPO story. It is dedicated India-based finance capacity, by role, inside the client's ERP, SOPs and reporting rhythm, with a clear onboarding path.",
  },
  {
    title: "You stay strategic",
    body:
      "The partnership model supports the advisor. It does not replace the advisor. You stay in the relationship, help shape the starting model, and remain the trusted operating voice.",
  },
];

const gdcBarriers = [
  {
    title: "Entity setup takes months",
    body:
      "A full India entity takes time, approvals, counsel and operating effort before a single finance hire is productive.",
  },
  {
    title: "Finance hiring is hard to do remotely",
    body:
      "Benchmarking, screening, fit and retention are difficult for a US team trying to hire directly into India.",
  },
  {
    title: "Compliance and payroll are complex",
    body:
      "Local payroll, statutory compliance, and employment administration create operating drag that finance leaders do not want to absorb early.",
  },
  {
    title: "No bench means no continuity",
    body:
      "Direct hiring creates replacement risk. If one person leaves, the client is back to zero with retraining and disruption.",
  },
  {
    title: "Communication and time-zone gaps show up quickly",
    body:
      "Many teams struggle not on technical skill, but on escalation discipline, communication quality, and working rhythm across geographies.",
  },
  {
    title: "Technology ramp-up delays value",
    body:
      "Finance capacity is only useful when it can work inside the client's tools and reporting cadence quickly.",
  },
];

const whatClientGets = [
  "Dedicated roles, not generic outsourcing",
  "Interview-led selection with client control on final fit",
  "Structured onboarding and ramp-up into the client's systems",
  "Clear role architecture across transaction, execution and strategic layers",
  "Measurable gains in speed, accuracy and consistency",
];

const processStreams = [
  {
    name: "Procure-to-Pay (P2P)",
    summary:
      "For clients dealing with invoice growth, vendor reconciliation pressure, payment coordination, and approval bottlenecks.",
    items: [
      "Invoice intake, coding and validation support",
      "Two-way and three-way match support",
      "Vendor reconciliations and AP aging discipline",
      "Payments coordination and AP workflow management",
    ],
  },
  {
    name: "Order-to-Cash (O2C)",
    summary:
      "For clients dealing with billing volume, collections pressure, cash application issues, and receivables visibility gaps.",
    items: [
      "Billing accuracy and sales invoicing support",
      "Cash application and AR ledger discipline",
      "Collections follow-through and aging analysis",
      "Dispute coordination and DSO visibility",
    ],
  },
  {
    name: "Record-to-Report (R2R)",
    summary:
      "For clients dealing with unstable close, reconciliation gaps, reporting complexity, and pressure on balance sheet integrity.",
    items: [
      "Journal entries, accruals and prepaid accounting",
      "Reconciliations, intercompany and ledger discipline",
      "Close checklist execution, cut-off control, and variance commentary",
      "Audit-ready schedules, reporting support, and control visibility",
    ],
  },
];

const roleArchitecture = [
  {
    layer: "Transaction layer",
    accent: "text-slate-700 border-slate-200 bg-slate-50",
    roles: [
      "Finance / Accounting Clerk",
      "Bookkeeper",
      "Accounts Payable Specialist",
      "Accounts Receivable Specialist",
      "Billing Specialist",
      "Collections Specialist",
    ],
  },
  {
    layer: "Execution layer",
    accent: "text-indigo-700 border-indigo-200 bg-indigo-50",
    roles: [
      "AP Manager",
      "Staff Accountant",
      "GL Accountant",
      "Senior Accountant / Close Lead",
    ],
  },
  {
    layer: "Strategic layer",
    accent: "text-emerald-700 border-emerald-200 bg-emerald-50",
    roles: [
      "Financial Controller",
      "Budget Analyst",
      "Financial Analyst",
      "FP&A Analyst",
    ],
  },
];

const whyEasyToSell = [
  {
    title: "It maps to real finance pain",
    body:
      "The model is easy to position because it starts from visible finance-state problems, not abstract transformation language.",
  },
  {
    title: "It is structured by process and by layer",
    body:
      "Partners can explain the offer through P2P, O2C and R2R, then show how execution and strategic roles deepen the team where needed.",
  },
  {
    title: "It preserves client control",
    body:
      "The client keeps final say on fit, works inside its own systems and SOPs, and manages the team in its own finance rhythm.",
  },
  {
    title: "It is easier than a full captive path",
    body:
      "The conversation is simpler because the client can gain finance capacity without immediately standing up a full India entity and support stack.",
  },
  {
    title: "It has a visible path to go-live",
    body:
      "A defined onboarding sequence makes the offer feel operationally real, not conceptual.",
  },
  {
    title: "It is designed for meaningful scale",
    body:
      "This is not framed as a one-seat stopgap. The starting model is designed around 10 or more seats across process value streams and control layers.",
  },
];

const onboardingSteps = [
  {
    step: "01",
    title: "Identify the client situation",
    body:
      "Close pressure, AP or AR growth, reporting complexity, hiring delays, ERP change, GCC planning, or a broader India finance ambition.",
  },
  {
    step: "02",
    title: "Design the 10+ seat starting model",
    body:
      "Define the role mix, process ownership, control coverage, and first-phase deployment across P2P, O2C, R2R and close support.",
  },
  {
    step: "03",
    title: "Validate fit with the client",
    body:
      "Role matching, interviews, onboarding plan, SLAs and operating expectations are aligned before launch.",
  },
  {
    step: "04",
    title: "Onboarding and go-live",
    body:
      "Structured onboarding, sandbox testing, and live production are typically achieved in an 8 to 12 week path.",
  },
];

const faqs = [
  {
    q: "Who is this partnership program for?",
    a: "It is built for advisors, consultants, ERP partners, GCC advisors, retired finance leaders, fractional CFOs, and ecosystem operators who already work with finance leaders and can open the right conversations.",
  },
  {
    q: "What exactly is the client offer?",
    a: "It is a structured India-based finance capacity model built around dedicated roles, process ownership, onboarding discipline, and clear integration into the client's ERP, SOPs and reporting rhythm.",
  },
  {
    q: "How should a partner explain it simply?",
    a: "A clean shorthand is this: it gives scaling corporates dedicated India-based finance capacity across P2P, O2C, R2R, close support, control and planning without forcing the client into a full captive setup on day one.",
  },
  {
    q: "Why is this easier to sell than a generic outsourcing pitch?",
    a: "Because the conversation starts from visible finance pain, uses process language that CFOs already understand, and gives the client a structured operating model rather than an undefined staffing promise.",
  },
  {
    q: "What is the minimum starting shape of the model?",
    a: "The starting point is designed around a 10+ seat team. The goal is to give the client meaningful process coverage and control depth, not a single-role patch.",
  },
  {
    q: "How are partner economics discussed?",
    a: "The program supports both one-time referral economics and deeper commission-based relationships. The right structure is discussed once partner fit and client situation are clear.",
  },
];

export default function StrategicFinancePartnerPage() {
  return (
    <div>
      <PageHero
        title="A strategic finance partnership program for advisors and ecosystem partners"
        subtitle="Built for consultants, advisors, ERP partners, GCC advisors, and operators who already work with CFOs and finance leaders. If you can open the right conversations, there is a structured commercial model behind it."
        painLine="Not every partner wants a full alliance model. Some want structured referral income. Others want a deeper commercial relationship with ongoing upside."
        primaryAction={{ label: "Share your interest", href: "/contact" }}
        secondaryAction={{ label: "View partnership program", href: "#partnership-program" }}
        imageSrc="/hero/services.jpg"
        imageAlt="Strategic finance partnership program"
      />

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
                Strategic partnership program
              </p>
              <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                Built for people who already have trusted access to finance leaders
              </h2>
              <p className="mt-5 text-slate-600 text-base leading-relaxed">
                This program gives advisors and ecosystem partners a structured way to bring
                dedicated India-based finance capacity into client conversations. The commercial
                opportunity is clear, and the underlying offer is easy to explain because it is tied
                to real finance pain, familiar process value streams, and visible operating outcomes.
              </p>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                The partner story is simple. You stay in the advisor seat. DS Consulting supports
                the introduction and solution framing. The delivery model gives the client a defined
                finance capacity answer across transactional work, close mechanics, control, and
                planning.
              </p>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                This is designed for meaningful scale. The starting model is typically 10 or more
                seats, organized across process value streams and control layers, not a one-seat
                stopgap.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {easyConversationCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
                >
                  <div className="font-semibold text-slate-900 text-sm">{card.title}</div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="partnership-program"
        className="scroll-mt-24 py-20 bg-slate-900 text-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-400 uppercase tracking-widest mb-4">
            Partnership program
          </p>
          <h2 className="text-3xl font-bold leading-tight max-w-2xl">
            Choose the partnership model that matches how you want to work
          </h2>
          <p className="mt-5 text-slate-300 max-w-2xl leading-relaxed">
            Some partners want a clean referral arrangement with a one-time commercial benefit.
            Others want a deeper relationship with ongoing commission, broader visibility, and more
            active collaboration. This program supports both.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="rounded-2xl border border-indigo-700/50 bg-slate-800/60 p-8">
              <div className="text-indigo-400 font-semibold text-xs uppercase tracking-widest mb-3">
                Referral program
              </div>
              <h3 className="text-xl font-bold text-white">Simple introduction. One-time fee.</h3>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Best for partners who want a straightforward referral structure. You open the
                conversation, the opportunity is qualified and progressed, and you participate
                through a defined one-time commercial arrangement.
              </p>
              <div className="mt-6 space-y-2">
                {[
                  "Best for light-touch partner involvement",
                  "Clear one-time referral economics",
                  "Simple introduction model with low coordination overhead",
                  "Regular updates on referral progress",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-indigo-400 mt-0.5 flex-shrink-0">-</span>
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-700/50 bg-slate-800/60 p-8">
              <div className="text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-3">
                Strategic partner model
              </div>
              <h3 className="text-xl font-bold text-white">
                Ongoing commission. Deeper relationship.
              </h3>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Built for partners who want more than referral income. This route is for those who
                want an ongoing commercial relationship, stronger visibility, and a bigger role in
                how the partnership grows.
              </p>
              <div className="mt-6 space-y-2">
                {[
                  "Ongoing commission on converted client revenue",
                  "Broader partner visibility and brand association",
                  "Potential collaboration across events, thought leadership, and partner content",
                  "A stronger long-term commercial relationship",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">-</span>
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-8 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Want to know more about one-time fees, commission structure, and which model fits your
            profile? Share your interest and DS Consulting will facilitate the next conversation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-medium text-center text-white"
            >
              Share your interest
            </Link>
          </div>
        </div>
      </section>
      {/* Partner intro */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Left: what this is */}
            <div>
              <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
                Partner offering
              </p>
              <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                Dedicated finance roles that work inside your client's organisation
              </h2>
              <p className="mt-5 text-slate-600 text-base leading-relaxed">
                Our partner is an India-based outsourced accounting specialist with 19 years of
                delivery experience, 300+ active clients, and a 200+ person team serving the US, UK,
                Europe, UAE and Singapore.
              </p>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                Their product places dedicated, named professionals inside your client's
                finance function. They work on your client's ERP, follow your client's SOPs, and report to your client's team.
                This is not generic outsourcing. It is a structured offshore capacity layer that
                integrates directly into how your client's finance team already operates.
              </p>
              
            </div>
			
            {/* Right: Finsmart logo placeholder + stats */}
            <div className="space-y-6">
              {/* Logo placeholder */}
              {/*
			  <div className="rounded-2xl border border-slate-200 bg-white p-6 min-h-[140px] flex items-center justify-center">
			  <h2 className="text-3xl font-bold text-slate-900 leading-tight">
			  Outsource Accounting Partner
			  </h2>
			</div>
			*/}
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "19+", label: "Years in outsourced accounting" },
                  { stat: "300+", label: "Active clients globally" },
                  { stat: "200+", label: "Full-time finance professionals" },
                  { stat: "6", label: "Markets served" },
                ].map((s) => (
                  <div key={s.stat} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-3xl font-bold text-indigo-700">{s.stat}</div>
                    <div className="mt-1 text-sm text-slate-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why this works for CFOs */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            Why CFOs use this model
          </p>
          <h2 className="text-3xl font-bold text-slate-900 max-w-2xl leading-tight">
            The easier path to India finance capacity
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Most CFOs (your client) who want India-based finance talent face the same barriers: entity registration,
            local hiring cycles, compliance complexity, and team continuity risk. Our partner's product
            removes all of them.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              {
                heading: "Live in 8 to 12 weeks",
                body:
                  "No entity registration. No local hiring cycle. Your client's dedicated team is shortlisted, interviewed by your client, onboarded to your client's systems, and live - all within 8 to 12 weeks.",
                icon: "⟳",
              },
              {
                heading: "Up to 50% cost saving",
                body:
                  "Compared to the fully-loaded cost of a US or UK hire - including salary, benefits, payroll taxes, and recruitment - our partner's product delivers the same capability for significantly less.",
                icon: "↓",
              },
              {
                heading: "Your client keep control",
                body:
                  "Our partner's team works inside your client's ERP, follows thier SOPs, and reports directly to thier finance leadership. Our partner manages HR and compliance. Your client manage the work.",
                icon: "✓",
              },
              {
                heading: "Scale as your client grows",
                body:
                  "Begin with roles to fill the immediate gap of your client. Expand by layer - transaction, execution, strategic - as your client's confidence and demand grows. ",
                icon: "↑",
              },
              {
                heading: "Pre-certified on your client's ERP",
                body:
                  "Our partner professionals are certified across NetSuite, Sage Intacct, QuickBooks, Xero, Microsoft Dynamics, SAP and Zoho. No technology ramp-up required.",
                icon: "⊞",
              },
              {
                heading: "Bench-backed continuity",
                body:
                  "If someone leaves, our partner replaces them with a trained professional from their bench. No retraining cost to your clients. No disruption to their close cycle.",
                icon: "⇄",
              },
            ].map((card) => (
              <div
                key={card.heading}
                className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm"
              >
                <div className="text-2xl text-indigo-600 mb-4 font-light">{card.icon}</div>
                <h3 className="font-semibold text-slate-900 text-base">{card.heading}</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture and Communication */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            Culture and communication
          </p>
          <h2 className="text-3xl font-bold text-slate-900 max-w-3xl leading-tight">
            Like us, our partner understands India. They build teams that work for global companies.
          </h2>
          <p className="mt-5 text-slate-600 max-w-3xl leading-relaxed">
            One of the most common concerns US and UK CFOs raise is not the technical capability of offshore talent - it is whether those professionals can communicate clearly, escalate confidently, and operate as genuine members of a global finance team. Our partner has spent 19 years solving exactly that problem.
          </p>

          <div className="mt-14 grid md:grid-cols-2 gap-12">

            {/* Left: India landscape */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Where the talent is - and why it matters</h3>
              <div className="space-y-5">
                {[
                  {
                    city: "Pune",
                    note: "Our Partner's home base. A mature outsourced accounting hub with deep ICAI-qualified talent, lower attrition than metro cities, and a cost structure that keeps rates competitive without sacrificing quality.",
                  },
                  {
                    city: "Tier 1 and Tier 2 cities",
                    note: "India produces over 100,000 chartered accountants annually through the ICAI. Beyond CAs, the pipeline of commerce graduates, cost accountants, and finance professionals is deep across Bangalore, Hyderabad, Chennai and Ahmedabad.",
                  },
                  {
                    city: "Real estate and infrastructure",
                    note: "India's accounting talent works from modern, well-connected offices with reliable infrastructure. Our partner's teams operate in managed, professional environments - not informal setups. This matters for data security, system access, and daily operating discipline.",
                  },
                ].map((item) => (
                  <div key={item.city} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-indigo-600 mt-2" />
                    <div>
                      <span className="font-semibold text-slate-900 text-sm">{item.city}. </span>
                      <span className="text-slate-600 text-sm leading-relaxed">{item.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Global working style */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Built for global corporate working style</h3>
              <div className="space-y-5">
                {[
                  {
                    label: "Time zone management",
                    detail: "Our partner's teams align to a structured overlap window with US and UK hours. Morning US Eastern calls, afternoon UK sync sessions, and async-first communication norms mean your close cycle does not wait on geography.",
                  },
                  {
                    label: "Escalation paths that are clear from day one",
                    detail: "Every engagement includes a named Engagement Manager who sits between your team and the delivery professionals. Escalations go through a defined channel - not into a void. Weekly review calls are built into the model, not optional.",
                  },
                  {
                    label: "Global corporate orientation",
                    detail: "Our partner's professionals are trained in how global finance teams operate - including communication norms, documentation standards, deadline culture, and how to flag issues proactively rather than wait to be asked. This is not assumed. It is explicitly built into onboarding.",
                  },
                  {
                    label: "English-speaking, business-ready talent",
                    detail: "All professionals are fluent in business English. Client calls, email communication, and written reporting are handled to the standard you would expect from a US or UK team member.",
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <div className="font-semibold text-slate-900 text-sm mb-1">{item.label}</div>
                    <div className="text-slate-600 text-xs leading-relaxed">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

	  {/*<section className="py-20 bg-white">
	  <div className="max-w-6xl mx-auto px-6">
		<p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
		  About our partner
		</p>
		<h2 className="text-3xl font-bold text-slate-900 max-w-3xl leading-tight">
		  Our partner understands both India delivery and global finance communication
		</h2>
		<p className="mt-5 text-slate-600 max-w-3xl leading-relaxed">
		  A finance capacity model only works if the team can do more than process transactions. It has
		  to communicate clearly, escalate early, work inside the client&apos;s systems, and operate in a
		  rhythm that global finance leaders can trust. That is where our partner stands out.
		</p>
		<p className="mt-4 text-slate-600 max-w-3xl leading-relaxed">
		  They understand the realities of India-based delivery, but they also understand how US and UK
		  finance teams expect people to work. That combination makes the offer easier for partners to
		  position and easier for clients to say yes to.
		</p>

		<div className="mt-14 grid md:grid-cols-2 gap-12">
		  <div>
			<h3 className="text-xl font-semibold text-slate-900 mb-6">
			  Understanding India, without losing execution discipline
			</h3>
			<div className="space-y-5">
			  {[
				{
				  label: "Talent context",
				  detail:
					"Our partner understands where finance talent comes from, how to structure teams around different maturity levels, and how to build a delivery model that can support both scale and continuity.",
				},
				{
				  label: "Professional environment",
				  detail:
					"The team model is built for structured delivery, secure workflows, and repeatable operating discipline, not informal support arrangements.",
				},
				{
				  label: "Operational maturity",
				  detail:
					"This matters in partner conversations because clients are not only asking for lower-cost capacity. They are asking for dependable execution inside real finance processes.",
				},
			  ].map((item) => (
				<div key={item.label} className="flex gap-4">
				  <div className="mt-2 h-2 w-2 rounded-full bg-indigo-600 flex-shrink-0" />
				  <div>
					<span className="font-semibold text-slate-900 text-sm">{item.label}. </span>
					<span className="text-slate-600 text-sm leading-relaxed">{item.detail}</span>
				  </div>
				</div>
			  ))}
			</div>
		  </div>

		  <div>
			<h3 className="text-xl font-semibold text-slate-900 mb-6">
			  Built for global communication and working style
			</h3>
			<div className="space-y-5">
			  {[
				{
				  title: "Time zone management",
				  body:
					"Our partner works with structured overlap windows so teams can support US and UK finance rhythms without leaving communication gaps.",
				},
				{
				  title: "Clear escalation paths",
				  body:
					"Clients need to know where issues go, who owns follow-up, and how review cadence works. That clarity matters just as much as technical capability.",
				},
				{
				  title: "Global corporate orientation",
				  body:
					"Finance professionals need to understand documentation standards, deadline discipline, issue escalation, and how to communicate in a way that works for global companies.",
				},
				{
				  title: "Business-ready communication",
				  body:
					"Strong written and verbal communication is a core part of delivery, not an optional extra. That makes the model easier for partners to recommend with confidence.",
				},
			  ].map((item) => (
				<div
				  key={item.title}
				  className="rounded-xl border border-slate-200 bg-slate-50 p-5"
				>
				  <div className="font-semibold text-slate-900 text-sm mb-1">{item.title}</div>
				  <div className="text-slate-600 text-sm leading-relaxed">{item.body}</div>
				</div>
			  ))}
			</div>
		  </div>
		</div>
	  </div>
	</section>*/}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            The ideal client already in your network
          </p>
          <h2 className="text-3xl font-bold text-slate-900 max-w-2xl leading-tight">
            The client profile is familiar, which makes the conversation easier
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {idealClient.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                  {item.label}
                </div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            What you can take to market
          </p>
          <h2 className="text-3xl font-bold text-slate-900 max-w-3xl leading-tight">
            A structured finance capacity model, not a generic outsourcing pitch
          </h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            The client offer is practical. It gives scaling corporates dedicated, role-based
            finance capacity integrated into their ERP, SOPs and reporting rhythm, with defined
            onboarding and measurable improvement in how the finance function runs.
          </p>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <div className="grid md:grid-cols-5 gap-4">
              {whatClientGets.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Role table 
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            Role coverage
          </p>
          <h2 className="text-3xl font-bold text-slate-900 leading-tight">
            14 roles across three layers
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Roles are sourced and validated against the Robert Half 2026 Finance and Accounting
            hiring benchmarks. Every role is dedicated to your clients organisation - not shared across accounts.
          </p>

          <div className="mt-12 space-y-10">
            {roles.map((group) => (
              <div key={group.layer}>
                <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest mb-5 ${layerColors[group.layer]}`}>
                  {group.layer} layer
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map((role) => (
                    <div
                      key={role.title}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="font-semibold text-slate-900 text-sm">{role.title}</div>
                      <div className="mt-1 text-xs text-slate-500 leading-relaxed">{role.scope}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-slate-400">
            Payroll and Internal Audit roles are outside current scope. Contact us if you have specific requirements.
          </p>
        </div>
      </section>*/}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            End-to-end transactional finance work
          </p>
          <h2 className="text-3xl font-bold text-slate-900 max-w-3xl leading-tight">
            Organized by process value streams finance leaders already understand
          </h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            Partners do not need to sell this as generic offshore support. The offer can be framed
            through P2P, O2C and R2R, then extended into close, control and planning. That makes
            the story faster for a CFO to grasp.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {processStreams.map((stream) => (
              <div
                key={stream.name}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-bold text-slate-900">{stream.name}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{stream.summary}</p>
                <div className="mt-5 space-y-2">
                  {stream.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-indigo-600 mt-0.5 flex-shrink-0">-</span>
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
            <div className="font-semibold text-indigo-800">
              Typical starting structure
            </div>
            <p className="mt-2 text-sm text-indigo-700 leading-relaxed">
              The opening design is usually a 10+ seat model across P2P, O2C and R2R, with enough
              role depth to stabilize transactional throughput, close discipline, and reporting
              reliability from the outset.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            14 role profiles across three layers
          </p>
          <h2 className="text-3xl font-bold text-slate-900 max-w-3xl leading-tight">
            Enough role depth to show clients this is a real operating model
          </h2>
          <p className="mt-4 text-slate-600 max-w-3xl">
            The role depth matters in a partner conversation. It shows that the offer is not a
            generic staffing promise. It is a structured finance-function design with transaction,
            execution, and strategic coverage.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {roleArchitecture.map((group) => (
              <div
                key={group.layer}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${group.accent}`}
                >
                  {group.layer}
                </div>
                <div className="mt-5 grid gap-3">
                  {group.roles.map((role) => (
                    <div
                      key={role}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            Why this is easier than a captive path
          </p>
          <h2 className="text-3xl font-bold text-slate-900 max-w-3xl leading-tight">
            Finance capacity without the usual setup burden
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {gdcBarriers.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900 text-base">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {whyEasyToSell.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900 text-base">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-semibold text-indigo-700 uppercase tracking-widest mb-4">
            How we work together
          </p>
          <h2 className="text-3xl font-bold text-slate-900 leading-tight max-w-2xl">
            Clear ownership, visible onboarding, and an 8 to 12 week path to go-live
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {onboardingSteps.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm"
              >
                <div className="text-3xl font-bold text-indigo-100">{step.step}</div>
                <h3 className="mt-4 font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 leading-tight">
            Interested in the partnership program?
          </h2>
          <p className="mt-5 text-slate-600 text-lg max-w-2xl mx-auto">
            If you work with finance leaders and want to understand the referral fee or commission
            model, share your interest. DS Consulting will facilitate the right introduction.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium text-center"
            >
              Share your interest
            </Link>
            <a
              href="mailto:contact@consult-ds.com"
              className="border border-slate-300 hover:bg-slate-50 px-8 py-3 rounded-lg text-center text-slate-700"
            >
              Email us directly
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">Common questions</h2>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-slate-200 pb-8">
                <h3 className="font-semibold text-slate-900">{faq.q}</h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerSchema) }}
      />
    </div>
  );
}