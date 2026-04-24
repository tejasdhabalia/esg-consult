import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { pageMetadata } from "@/lib/page-metadata";

const page = getEsgInsightPage("climate-risk-register-template");

export const metadata = pageMetadata({
  title: "Climate risk register template",
  description:
    "A practical guide to structuring climate risk in a form leadership, finance and operations teams can review, prioritise and connect to action planning.",
  path: "/insights/climate-risk-register-template",
});

export default function ClimateRiskRegisterTemplatePage() {
  return <InsightEngagementPage config={page} />;
}
