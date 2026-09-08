import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { pageMetadata } from "@/lib/page-metadata";

const page = getEsgInsightPage("nist-ai-rmf-starter-profile");

export const metadata = pageMetadata({
  title: "NIST AI RMF starter profile",
  description:
    "The four functions of the NIST AI Risk Management Framework, and a workbook to rate where your business actually stands against each one.",
  path: "/insights/nist-ai-rmf-starter-profile",
});

export default function NistAiRmfStarterProfilePage() {
  return <InsightEngagementPage config={page} />;
}
