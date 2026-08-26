import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { pageMetadata } from "@/lib/page-metadata";

const page = getEsgInsightPage("ai-use-case-register");

export const metadata = pageMetadata({
  title: "AI use case register template",
  description:
    "A register that records where AI is used, who owns each use and which obligations attach. Structured around EU AI Act risk tiers and Article 50 triggers.",
  path: "/insights/ai-use-case-register",
});

export default function AiUseCaseRegisterPage() {
  return <InsightEngagementPage config={page} />;
}
