import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { pageMetadata } from "@/lib/page-metadata";

const page = getEsgInsightPage("net-zero-roadmap-starter");

export const metadata = pageMetadata({
  title: "Net zero roadmap starter",
  description:
    "A practical decision guide for leadership teams ready to move from emissions calculation to a credible decarbonisation roadmap with owners and cadence.",
  path: "/insights/net-zero-roadmap-starter",
});

export default function NetZeroRoadmapStarterPage() {
  return <InsightEngagementPage config={page} />;
}
