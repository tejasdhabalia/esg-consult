import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

const page = getEsgInsightPage("sustainability-steering-committee-charter");

export const metadata = {
  title: `${page.title} | ${site.legalName}`,
  description: page.description,
  alternates: { canonical: absUrl(`/insights/sustainability-steering-committee-charter`) },
};

export default function SustainabilitySteeringCommitteeCharterPage() {
  return <InsightEngagementPage config={page} />;
}
