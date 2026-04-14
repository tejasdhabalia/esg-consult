import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

const page = getEsgInsightPage("net-zero-roadmap-starter");

export const metadata = {
  title: `${page.title} | ${site.legalName}`,
  description: page.description,
  alternates: { canonical: absUrl(`/insights/net-zero-roadmap-starter`) },
};

export default function NetZeroRoadmapStarterPage() {
  return <InsightEngagementPage config={page} />;
}
