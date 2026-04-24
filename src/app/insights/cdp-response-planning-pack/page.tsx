import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { pageMetadata } from "@/lib/page-metadata";

const page = getEsgInsightPage("cdp-response-planning-pack");

export const metadata = pageMetadata({
  title: "CDP response planning pack",
  description:
    "Run CDP response preparation in a structured way before deadlines compress the work. Ownership map, evidence workstream and defined review cadence.",
  path: "/insights/cdp-response-planning-pack",
});

export default function CDPResponsePlanningPackPage() {
  return <InsightEngagementPage config={page} />;
}
