import MovePage from "@/components/MovePage";
import { pageMetadata } from "@/lib/page-metadata";

// Title, description and H1 from the SEO brief for Batches 3 and 4,
// 30 October 2026. Never write "tally migration" on this page: people
// search it for upgrading Tally, not for leaving it.
export const metadata = pageMetadata({
  title: "Outgrown Tally? When to move to an ERP",
  description:
    "Outgrown Tally or spreadsheets? Independent advice on choosing an ERP and moving your data, for Indian mid-market firms. Free 45-minute move plan session.",
  path: "/migrations/tally-to-erp",
});

export default function TallyToErpPage() {
  return (
    <MovePage
      route="/migrations/tally-to-erp"
      breadcrumbLabel="Outgrown Tally"
      eyebrow="Moving off Tally"
      h1="Outgrown Tally? Plan the move to an ERP"
      situation={[
        "Your books are in Tally, your operations are in Excel, and the two never agree. Month end takes a week because someone reconciles stock, credit and schemes by hand.",
        "Everyone knows the business has outgrown it. The move keeps getting deferred, and the reason is almost never the software. It is that the finance team knows exactly how much can go wrong in the middle, and nobody has shown them a plan for it.",
      ]}
      breaksHeading="What usually goes wrong when a business leaves Tally"
      breaks={[
        {
          title: "Masters copied as they are",
          detail:
            "Duplicate customers, items with three names and a chart of accounts built for a smaller business all come across, and the new ERP inherits every one of them.",
        },
        {
          title: "Opening balances that do not reconcile",
          detail:
            "Stock, receivables and GST balances that disagree on day one cost the new system the finance team's trust, and it is slow to win back.",
        },
        {
          title: "The spreadsheet processes nobody listed",
          detail:
            "Credit limits, scheme calculations and inter-branch transfers that lived in Excel have to be designed into the ERP, or they carry on in Excel beside it.",
        },
        {
          title: "A cutover with no way back",
          detail:
            "No tested rollback position and no parallel run through a full month end, so the first close on the new system is also the test.",
        },
      ]}
      stepsHeading="How we run the move"
      steps={[
        "Agree what the business needs from the ERP, then choose it with the scoring handed to you.",
        "Clean the masters before they move: customers, items, ledgers and the opening balances.",
        "Design the processes that live in Excel today into the new system, or decide in writing that they stay outside it.",
        "Plan the cutover with a rollback position and a parallel run through at least one month end.",
        "Run it on your side, holding the implementation partner to what the business agreed.",
      ]}
      links={[
        {
          before: "Choosing the system is its own decision.",
          anchor: "How we run an ERP selection",
          href: "/services/erp-systems",
          after: ", from requirements to a scored comparison.",
        },
      ]}
      showPrice
      areaServed={["IN"]}
      serviceName="Moving from Tally to an ERP"
      serviceDescription="Independent advice on choosing an ERP and moving off Tally and spreadsheets, led on the client's side, for Indian mid-market companies."
    />
  );
}
