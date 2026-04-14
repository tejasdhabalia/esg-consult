import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

const page = getEsgInsightPage("esg-tender-response-question-bank");

export const metadata = {
  title: `${page.title} | ${site.legalName}`,
  description: page.description,
  alternates: { canonical: absUrl(`/insights/esg-tender-response-question-bank`) },
};

export default function EsgTenderResponseQuestionBankPage() {
  return <InsightEngagementPage config={page} />;
}
