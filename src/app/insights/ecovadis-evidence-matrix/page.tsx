import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { pageMetadata } from "@/lib/page-metadata";

const page = getEsgInsightPage("ecovadis-evidence-matrix");

export const metadata = pageMetadata({
  title: "EcoVadis evidence matrix",
  description:
    "A practical submission-planning matrix for teams that need to organise policy, action, metrics and supporting evidence before uploading documents.",
  path: "/insights/ecovadis-evidence-matrix",
});

export default function EcoVadisEvidenceMatrixPage() {
  return <InsightEngagementPage config={page} />;
}
