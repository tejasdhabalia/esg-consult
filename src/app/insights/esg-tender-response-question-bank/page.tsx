import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { pageMetadata } from "@/lib/page-metadata";

const page = getEsgInsightPage("esg-tender-response-question-bank");

export const metadata = pageMetadata({
  title: "ESG tender response question bank",
  description:
    "A commercial-use library for teams answering ESG questions in customer tenders, procurement forms and supplier questionnaires without a standard playbook.",
  path: "/insights/esg-tender-response-question-bank",
});

export default function EsgTenderResponseQuestionBankPage() {
  return <InsightEngagementPage config={page} />;
}
