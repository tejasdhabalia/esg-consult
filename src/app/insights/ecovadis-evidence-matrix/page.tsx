import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

const page = getEsgInsightPage("ecovadis-evidence-matrix");

export const metadata = {
  title: `${page.title} | ${site.legalName}`,
  description: page.description,
  alternates: { canonical: absUrl(`/insights/ecovadis-evidence-matrix`) },
};

export default function EcoVadisEvidenceMatrixPage() {
  return <InsightEngagementPage config={page} />;
}
