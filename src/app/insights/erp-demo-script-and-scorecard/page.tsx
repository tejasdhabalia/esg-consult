import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";
import { articleSchema } from "@/lib/article-schema";
import { tejas } from "@/lib/authors";
import { site } from "@/lib/site";
import InsightSidebar from "@/components/InsightSidebar";
import InsightResourceForm from "@/components/InsightResourceForm";
import ErpDemoScorecard from "./ErpDemoScorecard";

/*
  Brief 7, SEO project, 22 November 2026. The site's first ERP resource page.
  Text from "ERP demo script and scorecard (final).docx", used as written:
  only heading levels, apostrophes (normalised to straight) and link paths
  were changed. Passed the SEO project's pre-publish check.

  The interactive scorecard is built from ERP-demo-scorecard-template.xlsx.
  It needs no sign-up and fires tool_use, never generate_lead.

  Download, agreed with Tejas 22 November 2026 (after Brief 7, which had
  ruled one out): the same template as an Excel file, behind the standard
  insight resource form (resource key erp_demo_scorecard). That form fires
  generate_lead with form_name insight_resource.
*/
const PATH = "/insights/erp-demo-script-and-scorecard";
const H1 = "ERP demo script and scorecard: make vendors show your hardest days";
const DESCRIPTION =
  "Score ERP vendor demos on your processes, not their polish. A free ERP demo script and scorecard with scenarios, weights and the questions to ask.";
const IMAGE = "/og/erp-demo-script-scorecard.webp";
const IMAGE_ALT = "An ERP demo script with exception scenarios scored across three vendors on a weighted scorecard.";
const PUBLISHED_ISO = "2026-11-22";
const PUBLISHED_DISPLAY = "22 November 2026";

export const metadata = pageMetadata({
  title: "ERP demo script and interactive scorecard",
  description: DESCRIPTION,
  path: PATH,
  ogImage: IMAGE,
  type: "article",
});

const linkClass = "text-indigo-700 underline underline-offset-2 hover:text-indigo-900";
const strong = "text-slate-900";

const FAQS = [
  {
    q: "What should an ERP demo script include?",
    a: "An ERP demo script should include company context sent to vendors in advance, a small sample of your own anonymised data and eight to twelve weighted scenarios. Most scenarios should test exceptions, not routine transactions. Add a timebox for each scenario, define the expected outcomes and reserve one unscripted slot for your team.",
  },
  {
    q: "How do you score an ERP demo fairly?",
    a: "Agree scenario weights before the first demonstration and use a defined scoring scale, such as zero to three. Anything not demonstrated live scores zero, including roadmap features and promised partner development. Each attendee should score independently before discussion, and the product and implementation partner should receive separate assessments.",
  },
  {
    q: "Should we give ERP vendors our own data for the demo?",
    a: "Yes. Provide a small, anonymised sample early enough for vendors to load it before the demonstration. Include realistic, imperfect records such as partial orders, price differences, stock discrepancies and multi-currency transactions. Your own data reveals how the system handles your business conditions in ways that clean sample data cannot.",
  },
  {
    q: "How many ERP vendors should we invite to scripted demos?",
    a: "Three vendors is usually a practical number for a mid-market selection. It gives your team enough choice without spreading attention across too many demonstrations. After the first round, use the scorecards to shortlist the strongest two for a shorter second round focused on unresolved requirements and critical exceptions.",
  },
  {
    q: "Who from our side should attend ERP demos?",
    a: "Include the finance and operations process owners who will use the ERP daily, an IT representative who understands integrations and a chair responsible for keeping the session on-script. Other relevant users can attend where necessary. Keep the core evaluation team consistent across every vendor so comparisons remain fair.",
  },
  {
    q: "What does a bad ERP demo choice cost?",
    a: "Choosing an ERP based on presentation quality rather than demonstrated capability can create problems during implementation and beyond. Requirements may turn into additional change requests, custom code, manual workarounds and delays. The consequences can include disrupted processes, additional project effort and a system that does not meet operational needs.",
  },
];

function H2({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-bold text-slate-900 mb-4">{children}</h2>;
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">{children}</h3>;
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function Scenario({ title, children }: { title: string; children: ReactNode }) {
  return (
    <p>
      <strong className={strong}>{title}:</strong> {children}
    </p>
  );
}

export default function ErpDemoScriptPage() {
  const articleLd = articleSchema({
    path: PATH,
    headline: H1,
    description: DESCRIPTION,
    image: IMAGE,
    datePublished: PUBLISHED_ISO,
    author: tejas,
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: "Insights", item: absUrl("/insights") },
      { "@type": "ListItem", position: 3, name: "ERP demo script and scorecard", item: absUrl(PATH) },
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
            <span className="text-indigo-100">ERP demo script and scorecard</span>
          </nav>
          <div className="inline-block bg-indigo-800 text-indigo-100 text-xs font-medium px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Technology
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-8">{H1}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-indigo-300">
            <Link href="/team" className="flex items-center gap-2 hover:opacity-90">
              <Image src={tejas.imageSrc} alt={tejas.name} width={32} height={32} className="rounded-full object-cover" />
              <div>
                <div className="text-white font-medium underline-offset-2 hover:underline">{tejas.name}</div>
                <div className="text-xs opacity-80">{tejas.roleShort}</div>
              </div>
            </Link>
            <span>·</span>
            <span>{PUBLISHED_DISPLAY}</span>
            <span>·</span>
            <span>13 min read</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16">
        <div className="grid lg:grid-cols-3 gap-12">
      <article className="lg:col-span-2 min-w-0 space-y-12 text-slate-600 leading-relaxed">
        <section className="space-y-6">
          <Image
            src={IMAGE}
            alt={IMAGE_ALT}
            width={1200}
            height={630}
            priority
            className="w-full h-auto rounded-2xl border border-slate-200"
          />
          <p>
            A standard ERP demo shows the vendor&apos;s best path on clean sample data, so every shortlisted
            system can look good. A scripted ERP demo gives every vendor the same scenarios from your
            business, mostly exceptions, in the same amount of time, scored live by your team against
            weights agreed in advance. Two rules decide whether it works, and most guides skip them:
            anything a vendor does not show live scores zero, and the product and the reseller who will
            implement it are scored separately. This guide sets out the ERP demo script, the scoring rules
            and a free interactive scorecard to help you compare what vendors actually show.
          </p>
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
            <p className="font-semibold text-slate-900">Ready to score your vendors?</p>
            <p className="mt-1 text-sm">
              The interactive scorecard on this page holds the scenarios, weights and 0 to 3 scale from this
              guide. Free, no sign-up, and your entries stay in your browser. Prefer a spreadsheet? Get the
              same scorecard as an Excel template.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href="#scorecard"
                className="inline-block bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-800"
              >
                Open the scorecard
              </a>
              <a
                href="#download"
                className="inline-block border border-indigo-300 bg-white text-indigo-700 text-sm font-semibold px-4 py-2 rounded-lg hover:border-indigo-500"
              >
                Get the Excel template
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <H2>Why standard ERP demos all look the same</H2>
          <p>
            Most ERP demos follow a familiar pattern. The vendor introduces the software, walks through
            dashboards, shows how to create a customer or supplier record, processes a straightforward
            transaction and finishes with a few impressive reports.
          </p>
          <p>
            Everything works. The screens look clean, the workflow is smooth and the presenter knows
            exactly where to click.
          </p>
          <p>The problem is that your business rarely operates under those conditions.</p>
          <p>
            Your difficult days are not the days when every customer pays on time, every supplier delivers
            in full and every transaction follows the expected route. They are the days when a shipment is
            short, a customer is placed on credit hold, a supplier invoice does not match the purchase order
            or a return needs to be processed after the accounting period has closed.
          </p>
          <p>
            Take a quick commerce order. The system shows two units of a product in the dark store. At the
            bin, the picker finds one missing and the other past its expiry date. Both are marked out of
            stock and the customer gets a partial refund. A polished demo shows an order moving cleanly from
            entry to invoice. It rarely shows what happens to the stock, the refund and the approval when
            the order breaks halfway through.
          </p>
          <p>
            That is where the differences between ERP systems start to matter. Can the system manage the
            exception without losing the audit trail? Does it update inventory and financial records
            correctly? Are approvals triggered? Can users see what has changed and why?
          </p>
          <p>A demo that does not answer these questions gives you an incomplete picture of the product.</p>
          <p>
            A poor ERP selection can become an implementation problem later, with additional change
            requests, custom development, workarounds and delays. The consequences are harder to manage once
            the business has committed to the system. See our guide to{" "}
            <Link href="/migrations/implementation-recovery" className={linkClass}>
              what happens when an implementation stalls
            </Link>
            .
          </p>
          <p>The answer is to stop letting vendors decide what they demonstrate.</p>
          <p>
            Give every shortlisted vendor the same script, use your own business scenarios and score the
            results against requirements your team has agreed in advance.
          </p>
          <p>
            If you are approaching a major system change and need help getting the selection right, you can
            also{" "}
            <Link href="/contact" className={linkClass}>
              get your move plan through a free 45-minute working session
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <H2>What goes in an ERP demo script?</H2>
          <p>
            An effective ERP demo script has five parts: company context, sample data, scenarios, time
            limits and an unscripted session.
          </p>
          <p>
            The aim is to give vendors enough information to prepare a realistic demonstration without
            giving them control over the evaluation.
          </p>

          <H3>1. Send your company context in advance</H3>
          <p>Start with a short briefing document describing how your business operates.</p>
          <p>Include the information vendors need to prepare a relevant demonstration:</p>
          <Bullets
            items={[
              "Number of employees, business units and operating locations.",
              "Countries in which you trade and the relevant tax requirements.",
              "Main financial and operational processes.",
              "Approximate transaction volumes and business complexity.",
              "Existing systems and the integrations you expect to retain.",
              "Reporting, approval and audit requirements.",
              "Known problems with your current system.",
            ]}
          />
          <p>
            Be specific about what you need the ERP to demonstrate. For example, if you currently run
            finance in Tally and manage inventory through spreadsheets, explain how those processes interact
            today.
          </p>
          <p>
            The point is not to prescribe the solution. It is to establish the business context in which the
            solution must work.
          </p>

          <H3>2. Provide a small sample of your own data</H3>
          <p>Ask vendors to demonstrate the system using a small, anonymised sample of your business data.</p>
          <p>
            This might include customer and supplier records, products, stock balances, transaction
            histories, price lists and representative financial records.
          </p>
          <p>
            Do not send only perfectly formatted records. Include examples of the conditions that create
            problems in your current operation:
          </p>
          <Bullets
            items={[
              "Incomplete or inconsistent master data.",
              "Customers with different credit terms.",
              "Products with multiple units of measure.",
              "Partially fulfilled orders.",
              "Supplier invoices that do not match purchase orders.",
              "Transactions involving different currencies.",
            ]}
          />
          <p>
            Remove confidential and personally identifiable information before sharing the sample. Give
            vendors sufficient time to load and prepare it.
          </p>
          <p>
            Also ask them to explain which parts of the demonstration use your actual data, which use
            substituted data and which are simulated.
          </p>
          <p>
            Clean sample data can make almost any system look straightforward. Realistic data reveals how
            much preparation, correction and manual intervention the process requires.
          </p>

          <H3>3. Prepare 8 to 12 weighted scenarios</H3>
          <p>This is the most important part of the ERP demo script.</p>
          <p>
            Prepare between eight and twelve scenarios covering the processes that matter most to your
            business. Most should test exceptions rather than routine transactions.
          </p>
          <p>For every scenario, document:</p>
          <Bullets
            items={[
              "The business situation.",
              "The expected outcome.",
              "The users or departments involved.",
              "The key controls and approvals.",
              "The reports or records that should be updated.",
              "Its importance to your selection.",
              "The time allocated for the demonstration.",
            ]}
          />
          <p>
            Weight the scenarios according to business impact. A process that could stop dispatch, disrupt
            financial close or create a compliance problem should carry more weight than a feature that would
            simply make a routine task easier.
          </p>
          <p>The weights must be agreed before the first vendor demonstration.</p>

          <H3>4. Give every scenario a timebox</H3>
          <p>Set a time limit for each scenario and apply the same limit to every vendor.</p>
          <p>
            A vendor should not receive extra time to work through a difficult process while another is
            assessed against a shorter session.
          </p>
          <p>
            Timeboxing also exposes complexity. If a seemingly straightforward transaction requires several
            screens, manual adjustments or explanations from the presenter, your team should be able to
            record that.
          </p>
          <p>
            Allow time for questions, but keep the chair responsible for bringing the discussion back to the
            agreed script.
          </p>

          <H3>5. Include one unscripted slot</H3>
          <p>Reserve one part of the session for your team to drive the system.</p>
          <p>
            Ask a process owner to choose a transaction or exception and see how the system handles it
            without a prepared walkthrough.
          </p>
          <p>
            This is an opportunity to test navigation, flexibility and the presenter&apos;s understanding of
            the product.
          </p>
          <p>
            It also helps reveal whether the apparent simplicity of the scripted demonstration depends on a
            carefully rehearsed sequence.
          </p>
        </section>

        <section className="space-y-4">
          <H2>The exception scenarios that separate ERP vendors</H2>
          <p>
            The best scenarios depend on your business, but the following list provides a starting point.
            Select the ones relevant to your operations and adapt the details to your processes.
          </p>

          <H3>Order to cash</H3>
          <Scenario title="Partial shipment and backorder">
            A customer orders 100 units, but only 70 are available. Can the system dispatch the available
            stock, retain the balance as a backorder and complete the remaining transaction later?
          </Scenario>
          <Scenario title="Credit hold">
            A customer exceeds the agreed credit limit after placing an order. Can the system stop or
            restrict further processing, trigger the right approval and record the decision?
          </Scenario>
          <Scenario title="Price change mid-order">
            A product price changes after an order has been entered but before the invoice is raised. Can
            the system preserve the agreed commercial terms while maintaining an accurate audit trail?
          </Scenario>
          <Scenario title="Customer return">
            A customer buys online and returns the item, damaged, to a store in another region or tax
            jurisdiction. Can the system receive it into a damaged stock location rather than sellable stock,
            issue the credit note against the original invoice and show an auditor the chain from invoice to
            return receipt to the manager who approved it?
          </Scenario>
          <Scenario title="Price override at the till">
            A promotion fails to reach a store&apos;s point of sale and the cashier overrides the price. Does
            the system require a supervisor above a set discount, capture a reason code and keep the before
            and after price in a log nobody can edit? In India this has to work for packaged goods sold under
            an older, lower printed MRP, which cannot legally be exceeded.
          </Scenario>

          <H3>Procure to pay</H3>
          <Scenario title="Partial goods receipt">
            A supplier delivers only part of a purchase order. Can the system record the actual receipt,
            retain the outstanding quantity and prevent an incorrect invoice from being approved?
          </Scenario>
          <Scenario title="Purchase order and invoice mismatch">
            A supplier delivers 500 cases at a higher price than the purchase order, and 15 arrive damaged.
            Does the system book the good cases at the agreed price, quarantine the damaged ones, block
            payment when the price variance passes your tolerance and route it to the buyer for approval?
            Where e-invoicing applies the supplier&apos;s invoice cannot be edited, so the system also has to
            track the supplier&apos;s credit note until the tax position is corrected.
          </Scenario>
          <Scenario title="Approval threshold">
            A purchase request exceeds an employee&apos;s approval limit. Can the system automatically route
            it to the appropriate authority?
          </Scenario>

          <H3>Inventory management</H3>
          <Scenario title="Stock transfer">
            Goods move between warehouses or locations. Can the system track the movement, account for goods
            in transit and show the correct stock balance at each location?
          </Scenario>
          <Scenario title="Stock adjustment">
            A picker finds stock missing or expired, or a count does not match the system. Does the stock
            leave available to sell immediately, and can users record the write-off with a reason, a
            manager&apos;s approval and a record of who flagged it and when?
          </Scenario>
          <Scenario title="Batch, serial or expiry tracking">
            Can the system trace the relevant item through receipt, storage, movement and dispatch?
          </Scenario>

          <H3>Financial management and period close</H3>
          <Scenario title="Return against a closed period">
            A customer return relates to a transaction from an accounting period that has already closed. Can
            finance process the required adjustment without silently reopening or changing historical
            records?
          </Scenario>
          <Scenario title="Late supplier invoice">
            An invoice arrives after period end for goods already received. Can finance handle the accounting
            treatment, approvals and reporting implications correctly?
          </Scenario>
          <Scenario title="Reconciliation and audit trail">
            Can users trace a financial balance back to the underlying transaction and identify who changed a
            record and when?
          </Scenario>

          <H3>Multi-entity and multi-currency operations</H3>
          <Scenario title="Foreign currency receipt">
            A customer pays an invoice in a different currency. Can the system record the receipt, calculate
            the relevant exchange difference and update the financial records?
          </Scenario>
          <Scenario title="Intercompany transaction">
            A transaction takes place between two entities within the group. Can the system record the
            relevant entries and support group-level reporting?
          </Scenario>

          <H3>Local tax and e-invoicing</H3>
          <p>
            Include at least one scenario covering the statutory requirements of every country in which you
            trade.
          </p>
          <p>For example:</p>
          <Bullets
            items={[
              <>
                <strong className={strong}>India:</strong> Demonstrate GST calculations, applicable tax
                treatment and the relevant GST e-invoicing process.
              </>,
              <>
                <strong className={strong}>Europe and the Middle East:</strong> Demonstrate the applicable VAT
                treatment and country-specific e-invoicing requirements.
              </>,
              <>
                <strong className={strong}>Americas:</strong> Test the relevant sales tax rules, including
                differences between applicable jurisdictions where required.
              </>,
            ]}
          />
          <p>
            Do not settle for a slide explaining that the system supports local compliance. Ask the vendor to
            demonstrate the transaction, the resulting tax treatment and the associated reporting or invoice
            output for your actual operating context.
          </p>
          <p>
            If you are{" "}
            <Link href="/migrations/tally-to-erp" className={linkClass}>
              moving off Tally
            </Link>
            , for example, your script should include the financial, tax and inventory exceptions that your
            existing processes struggle to handle.
          </p>
          <p>
            The test is not whether the vendor can describe the feature. It is whether the system can
            demonstrate the required outcome.
          </p>
        </section>

        <section className="space-y-4">
          <H2>ERP demo scorecard: scoring rules that keep it fair</H2>
          <p>A scorecard is only useful when everyone understands the scoring rules and applies them consistently.</p>
          <p>
            The biggest mistake is deciding what matters after seeing the demonstrations. Once a persuasive
            presenter has shown an impressive feature, it becomes tempting to give that vendor more credit.
          </p>
          <p>Set the weights and scoring definitions before demo one.</p>

          <H3>Step 1: Agree the weights in advance</H3>
          <p>Assign a weight to each scenario based on its importance to the business.</p>
          <p>For illustration, a company might give the following priorities to its evaluation:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="py-3 pr-4 text-slate-900 font-semibold">Evaluation area</th>
                  <th className="py-3 text-slate-900 font-semibold">Illustrative weight</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Order to cash", "25%"],
                  ["Procure to pay", "20%"],
                  ["Inventory management", "20%"],
                  ["Financial management and period close", "20%"],
                  ["Multi-entity, multi-currency and local compliance", "15%"],
                ].map(([area, weight]) => (
                  <tr key={area} className="border-b border-slate-200">
                    <td className="py-3 pr-4">{area}</td>
                    <td className="py-3">{weight}</td>
                  </tr>
                ))}
                <tr className="border-b border-slate-300">
                  <td className="py-3 pr-4 font-semibold text-slate-900">Total</td>
                  <td className="py-3 font-semibold text-slate-900">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            These are example weights, not a universal allocation. A distribution business may prioritise
            inventory and order fulfilment. A multi-entity organisation may place more weight on financial
            consolidation and reporting.
          </p>
          <p>
            Agree your actual weights with finance, operations and IT before the first demonstration. Do not
            change them to improve a vendor&apos;s position.
          </p>

          <H3>Step 2: Use a defined 0 to 3 scoring scale</H3>
          <p>Give each scenario a score from zero to three.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="py-3 pr-4 text-slate-900 font-semibold">Score</th>
                  <th className="py-3 pr-4 text-slate-900 font-semibold">Definition</th>
                  <th className="py-3 text-slate-900 font-semibold">What it means</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["0", "Not demonstrated", "The vendor says it can be done, but does not show it live. Roadmap items and promised partner development also score zero."],
                  ["1", "Partially demonstrated", "Some of the process works, but important steps are missing or depend on manual workarounds."],
                  ["2", "Demonstrated with limitations", "The end-to-end process works through demonstrated configuration or a controlled workaround, but there are limitations or additional effort to consider."],
                  ["3", "Fully demonstrated", "The system completes the scenario successfully, using realistic data and showing the relevant controls, records and outputs."],
                ].map(([score, def, meaning]) => (
                  <tr key={score} className="border-b border-slate-200 align-top">
                    <td className="py-3 pr-4 font-semibold text-slate-900">{score}</td>
                    <td className="py-3 pr-4 text-slate-900">{def}</td>
                    <td className="py-3">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The most important rule is simple: <strong className={strong}>what is not shown live scores zero.</strong>
          </p>
          <p>This includes statements such as:</p>
          <Bullets
            items={[
              <>&ldquo;We can configure that.&rdquo;</>,
              <>&ldquo;Our implementation partner can build it.&rdquo;</>,
              <>&ldquo;That feature is on the roadmap.&rdquo;</>,
              <>&ldquo;It will be available in the next release.&rdquo;</>,
              <>&ldquo;We have done this for another customer.&rdquo;</>,
            ]}
          />
          <p>
            These statements may be worth investigating during due diligence, but they are not evidence of
            demonstrated capability.
          </p>
          <p>
            If a vendor claims that a configuration will solve the problem, ask them to demonstrate it. Record
            how it works, who will configure it, what additional effort is involved and what happens during
            upgrades.
          </p>
          <p>A promise is not a passing score.</p>

          <H3>Step 3: Calculate the weighted score</H3>
          <p>For each scenario, multiply its weight by the score divided by three.</p>
          <p className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-4 font-semibold text-slate-900">
            Weighted points = (Scenario score ÷ 3) × Scenario weight
          </p>
          <p>Add the weighted points for all scenarios to get an overall score out of 100.</p>
          <p>
            For example, if a scenario has a weight of 20 and a vendor scores two out of three, the vendor
            receives approximately 13.3 weighted points.
          </p>
          <p>
            This gives your team a consistent way to compare demonstrations while recognising that not all
            requirements have equal importance.
          </p>
          <p>Keep the individual scenario scores visible. An overall score can hide a serious weakness in an important process.</p>

          <H3>Step 4: Make each attendee score independently</H3>
          <p>Everyone attending should complete their own scorecard before the team discusses the demonstration.</p>
          <p>
            Do not allow the vendor&apos;s presenter, the most senior person in the room or the most confident
            member of the selection team to influence the initial scores.
          </p>
          <p>Once everyone has submitted their assessment, compare the differences.</p>
          <p>
            A finance manager may consider an accounting workaround unacceptable, while an operations manager
            may think it is manageable. That discussion is useful. It helps the team understand where the real
            business trade-offs sit.
          </p>
          <p>Record the reasons for significant differences rather than simply agreeing on an average score.</p>

          <H3>Step 5: Score the ERP product and implementer separately</H3>
          <p>This distinction is particularly important in mid-market ERP selections.</p>
          <p>
            The person demonstrating the product is often a reseller or implementation partner. That
            organisation may also earn revenue from the software licence and the implementation project.
          </p>
          <p>But two different decisions are being made:</p>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>Is the ERP product suitable for your business?</li>
            <li>Is the implementation partner capable of delivering it successfully?</li>
          </ol>
          <p>Do not combine these decisions into one score.</p>
          <p>
            <strong className={strong}>The product assessment</strong> should cover demonstrated
            functionality, reporting, integration, controls, usability and how well the system handles your
            scenarios.
          </p>
          <p>
            <strong className={strong}>The implementer assessment</strong> should cover its understanding of
            your processes, the quality of its answers, its proposed implementation approach, the experience
            of its delivery team, its handling of risks and the availability of ongoing support.
          </p>
          <p>
            Ask who will actually lead the implementation and who will configure, migrate, integrate and
            support the system. Evaluate the people and organisation responsible for that work, not just the
            person presenting the demo.
          </p>
          <p>
            A strong product cannot compensate automatically for a weak implementation partner. Equally, a
            confident and experienced partner cannot make an unsuitable product the right choice.
          </p>
          <p>
            For a more structured evaluation, see our approach to{" "}
            <Link href="/services/systems-selection" className={linkClass}>
              independent systems selection with structured demos
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <H2>ERP vendor demo questions to ask in the room</H2>
          <p>
            Once the scripted scenarios are complete, use the discussion to establish what sits behind the
            demonstration.
          </p>
          <p>
            The following ERP vendor demo questions can help expose differences between the product, the
            proposed implementation and the ongoing cost of ownership.
          </p>

          <H3>1. What was standard, configured or custom in what we just saw?</H3>
          <p>
            Ask the presenter to classify each important capability. Get a clear distinction between existing
            product functionality, configuration performed for the demonstration and custom development that
            would be needed for your business.
          </p>

          <H3>2. Who will actually build or configure this for us?</H3>
          <p>
            Ask for the names or roles of the people responsible. Will the work be completed by the vendor,
            the proposed implementation partner or another third party?
          </p>

          <H3>3. What happens to this configuration during an upgrade?</H3>
          <p>
            A solution that works today may introduce additional work during future releases. Ask how
            customisations and integrations are maintained, tested and supported through upgrades.
          </p>

          <H3>4. What additional licences, modules or third-party tools are required?</H3>
          <p>
            A feature shown in the demo may depend on a separate module, integration platform or additional
            service. Ask what is included in the proposed scope and what would need to be purchased or
            developed separately.
          </p>

          <H3>5. Can you show the integration with our existing systems?</H3>
          <p>
            Do not accept a diagram or slide in place of a demonstration. Ask the vendor to show how data
            moves between the ERP and the systems you actually use.
          </p>
          <p>
            What happens when an integration fails? Can transactions be retried? How are errors identified and
            resolved? Which system holds the authoritative record?
          </p>

          <H3>6. Can you produce one of our actual management reports?</H3>
          <p>
            Provide a report your finance or operations team uses today. Ask the vendor to reproduce it using
            your sample data.
          </p>
          <p>
            This tests whether reporting is genuinely available from the system and whether the necessary
            information can be accessed without exporting data into spreadsheets.
          </p>

          <H3>7. Who supports us after go-live?</H3>
          <p>
            Ask who handles support, how issues are escalated, what responsibilities sit with the software
            vendor and which sit with the implementer.
          </p>
          <p>Ask about support arrangements during critical periods, including month-end close.</p>

          <H3>8. What would you put outside the standard implementation scope?</H3>
          <p>
            This question can be more revealing than asking what the software can do. It encourages the vendor
            to identify assumptions, limitations and possible change requests before you commit.
          </p>
          <p>
            For further due diligence, use our{" "}
            <Link href="/insights/access-and-vendor-risk-checklist" className={linkClass}>
              questions on vendor access and data risk
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <H2>What to do after the ERP demos</H2>
          <p>
            The final demonstration is not the end of the selection process. It is the point at which your
            team should turn observations into evidence and decisions.
          </p>

          <H3>Reconcile scores, not opinions</H3>
          <p>Bring the individual scorecards together and identify where attendees agree or disagree.</p>
          <p>
            Look beyond the overall weighted score. Review the individual scenarios, especially those with the
            highest business impact.
          </p>
          <p>
            A vendor with an impressive total score may still have a critical weakness in inventory controls,
            statutory compliance or financial close.
          </p>
          <p>Record the reasons behind the scores so the decision can be explained later.</p>

          <H3>Get unanswered questions in writing</H3>
          <p>
            Prepare a list of every item that was not demonstrated, every limitation identified and every
            commitment made by a vendor.
          </p>
          <p>Ask for written answers covering:</p>
          <Bullets
            items={[
              "Functionality that was not shown.",
              "Additional configuration or custom development.",
              "Implementation ownership and dependencies.",
              "Licensing and third-party requirements.",
              "Upgrade implications.",
              "Integration and reporting limitations.",
              "Support responsibilities.",
            ]}
          />
          <p>
            Keep these responses separate from the live demo scores. A written assurance may help your due
            diligence, but it should not retrospectively turn an undemonstrated feature into a demonstrated
            capability.
          </p>

          <H3>Speak to relevant customer references</H3>
          <p>
            Ask for reference customers with a similar business size, operational complexity and
            implementation scope.
          </p>
          <p>
            A company with 50 employees may have very different needs from one with 1,000 employees. A
            successful deployment in a simple single-location business does not necessarily establish
            suitability for a multi-site or multi-entity operation.
          </p>
          <p>
            Where possible, speak to customers who were not selected by the vendor. They may offer a less
            rehearsed view of the experience.
          </p>
          <p>
            Ask about data migration, implementation delays, change requests, user adoption, reporting, support
            response and the experience of managing upgrades.
          </p>
          <p>
            Do not ask only whether the customer is happy with the product. Ask what they would do differently
            if they were selecting and implementing it again.
          </p>

          <H3>Make two decisions before making one commitment</H3>
          <p>
            Your final assessment should identify the preferred ERP product and the preferred implementation
            partner separately.
          </p>
          <p>
            If you have any significant gaps, resolve them before signing. A low score on a critical scenario
            should not disappear because the vendor performed well elsewhere.
          </p>
          <p>
            The objective is not to select the best presentation. It is to select a system and delivery team
            that can support your business through routine operations, exceptions and future change.
          </p>
          <p>
            For more support with{" "}
            <Link href="/services/erp-systems" className={linkClass}>
              ERP selection and migration advice
            </Link>
            , take a structured approach before committing to implementation.
          </p>
        </section>

        <section className="space-y-4">
          <H2>Use the interactive ERP demo scorecard</H2>
          <p>Running a consistent evaluation is much easier when every vendor is assessed the same way.</p>
          <p>
            The <strong className={strong}>interactive ERP demo scorecard</strong> on this page helps your
            selection team prepare scenarios, agree weights and record results during each demonstration.
          </p>
          <p>It includes:</p>
          <Bullets
            items={[
              "A scenario list covering the major ERP business processes.",
              "Space to add your own company-specific exceptions.",
              "Weighted scoring fields for each scenario.",
              "A 0 to 3 scoring scale with clear definitions.",
              "Separate scores for the ERP product and the implementation partner.",
              "A summary to compare vendors and review weighted scores.",
            ]}
          />
          <p>
            Use it as a starting point. Adapt the scenarios and weights to your business before inviting
            vendors to demonstrate their systems.
          </p>
          <p>
            Prefer to work in a spreadsheet, or want every attendee to score in their own copy? The same
            scorecard is available as an <a href="#download" className={linkClass}>Excel template</a>, with the
            formulas built in.
          </p>
        </section>
      </article>

          <InsightSidebar
            cta={{
              title: "Get the Excel scorecard template",
              body: (
                <>
                  Setup, 16 exception scenarios, the implementer scorecard, summary and follow-ups, with the
                  formulas built in. Or{" "}
                  <a href="#scorecard" className="underline underline-offset-2">
                    use the scorecard on this page
                  </a>
                  .
                </>
              ),
              children: <InsightResourceForm resourceKey="erp_demo_scorecard" theme="dark" />,
            }}
            author={tejas}
            relatedServices={[
              { label: "ERP systems", href: "/services/erp-systems" },
              { label: "Systems selection", href: "/services/systems-selection" },
              { label: "Implementation and delivery oversight", href: "/services/implementation-oversight" },
            ]}
            relatedHeading="Related reading"
            related={[
              { label: "Moving off Tally", href: "/migrations/tally-to-erp", description: "Plan the move to an ERP" },
              { label: "When an implementation stalls", href: "/migrations/implementation-recovery", description: "Finish the move you started" },
              { label: "Access and vendor risk checklist", href: "/insights/access-and-vendor-risk-checklist", description: "Questions on vendor access and data risk" },
            ]}
          />
        </div>
      </div>

      <div id="scorecard" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 scroll-mt-24">
        <ErpDemoScorecard />
      </div>

      <div id="download" className="max-w-6xl mx-auto px-6 pb-12 scroll-mt-24">
        <div className="grid gap-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:grid-cols-2 md:p-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Download the Excel template</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              The same scorecard as a workbook, so every attendee can score in their own copy and you can
              keep one master version for the decision. It has six tabs: how to use, setup, product
              scorecard, implementer scorecard, summary and follow-ups.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed">
              We email it to your work address straight away.
            </p>
          </div>
          <div>
            <InsightResourceForm resourceKey="erp_demo_scorecard" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 min-w-0 space-y-12 text-slate-600 leading-relaxed">
        <p>
          The scorecard works alongside this ERP demo script to help finance, operations and IT assess vendors
          consistently, rather than relying on presentation quality or unsupported promises.
        </p>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently asked questions</h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <H2>Make your ERP selection a business decision</H2>
          <p>
            An ERP demonstration should test how a system performs when business conditions are difficult, not
            simply how attractive its dashboards look.
          </p>
          <p>
            Give every shortlisted vendor the same script. Use your own sample data. Make exceptions the focus.
            Agree weights before the first demonstration, score independently and distinguish the ERP product
            from the implementation partner.
          </p>
          <p>Most importantly, do not award points for promises.</p>
          <p>
            A vendor that demonstrates your hardest processes successfully provides stronger evidence than one
            that delivers the most polished presentation.
          </p>
          <p>
            Choosing the right system is only one part of a successful move. The selection, data migration,
            implementation approach and future operating model all need to work together.
          </p>
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
            <p>
              <strong className={strong}>Get your move plan:</strong> Book a free 45-minute working session to
              discuss your current systems, ERP selection and migration priorities.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-block bg-indigo-700 text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-indigo-800"
            >
              {site.movePlan.label}
            </Link>
            <p className="mt-5">
              Explore{" "}
              <Link href="/services/erp-systems" className={linkClass}>
                ERP selection and migration advice
              </Link>{" "}
              to understand how to approach the wider move.
            </p>
          </div>
        </section>

      </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
