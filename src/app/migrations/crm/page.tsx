import MovePage from "@/components/MovePage";
import { pageMetadata } from "@/lib/page-metadata";

// Title, description and H1 from the SEO brief for Batches 3 and 4,
// 30 October 2026. No price: a rupee price tells UK readers the page is
// not for them (agreed 30 October 2026).
export const metadata = pageMetadata({
  title: "CRM migration advisory",
  description:
    "Moving off spreadsheets or switching CRMs? Independent CRM migration advice for teams in India and the UK, led on your side. Free 45-minute session.",
  path: "/migrations/crm",
});

export default function CrmMovePage() {
  return (
    <MovePage
      route="/migrations/crm"
      breadcrumbLabel="Changing CRM"
      eyebrow="Changing CRM"
      h1="Switch CRMs, or move off spreadsheets, without losing your pipeline"
      situation={[
        "Your pipeline lives in spreadsheets, or in a CRM nobody trusts. Sales and finance report different numbers for the same quarter, and both are reading their own data correctly.",
        "A move is the chance to fix what a qualified lead means, not only to copy the records across. Most CRM moves skip that part, and six months later the new system reports the same disputed numbers as the old one.",
      ]}
      breaksHeading="What usually goes wrong in a CRM switch"
      breaks={[
        {
          title: "Duplicates come across",
          detail:
            "Dead records and duplicate contacts inflate the pipeline from the first day, and nobody believes the new dashboards.",
        },
        {
          title: "Old definitions come across",
          detail:
            "Stages are copied as they were, so the argument about what counts as a qualified lead moves into the new system with them.",
        },
        {
          title: "The pipeline sits in two places",
          detail:
            "Open deals, activity history and email threads are split between two systems during cutover, and some of them never arrive.",
        },
        {
          title: "Automations stop quietly",
          detail:
            "Routing, follow-ups and the feeds to marketing, finance and service tools stop working, and the first sign is a lead nobody called.",
        },
      ]}
      stepsHeading="How we run the switch"
      steps={[
        "Agree the definitions first: stages, what a qualified lead is and who owns each record.",
        "Clean, deduplicate and map the data, and decide how much history to bring.",
        "List every automation and integration that touches the CRM, so none of them is lost.",
        "Plan the cutover so the pipeline is never in two places at once.",
        "Hold whoever sets up the new CRM to what the business agreed, and train the people who will own it.",
      ]}
      links={[
        {
          before: "Before you switch, run the",
          anchor: "CRM governance checklist",
          href: "/insights/crm-governance-checklist",
          after: " against the system you have now.",
        },
        {
          before: "The definitions, governance and reporting that keep the new CRM trustworthy are",
          anchor: "our CRM and revenue operations work",
          href: "/services/crm-and-revenue-operations",
          after: ".",
        },
      ]}
      areaServed={["IN", "GB"]}
      serviceName="CRM switch and move off spreadsheets"
      serviceDescription="Independent advice on switching CRMs or moving off spreadsheets, with definitions agreed first and the move led on the client's side."
    />
  );
}
