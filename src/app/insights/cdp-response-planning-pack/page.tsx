import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

const page = getEsgInsightPage("cdp-response-planning-pack");

export const metadata = {
  title: `${page.title} | ${site.legalName}`,
  description: page.description,
  alternates: { canonical: absUrl(`/insights/cdp-response-planning-pack`) },
};

export default function CDPResponsePlanningPackPage() {
  return <InsightEngagementPage config={page} />;
}
