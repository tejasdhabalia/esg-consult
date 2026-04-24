import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { pageMetadata } from "@/lib/page-metadata";

const page = getEsgInsightPage("sustainability-steering-committee-charter");

export const metadata = pageMetadata({
  title: "Sustainability steering committee charter",
  description:
    "A practical governance guide for leadership teams that need a real ESG operating cadence, not a vague cross-functional working group meeting monthly.",
  path: "/insights/sustainability-steering-committee-charter",
});

export default function SustainabilitySteeringCommitteeCharterPage() {
  return <InsightEngagementPage config={page} />;
}
