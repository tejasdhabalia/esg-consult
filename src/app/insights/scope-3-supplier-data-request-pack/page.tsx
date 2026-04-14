import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

const page = getEsgInsightPage("scope-3-supplier-data-request-pack");

export const metadata = {
  title: `${page.title} | ${site.legalName}`,
  description: page.description,
  alternates: { canonical: absUrl(`/insights/scope-3-supplier-data-request-pack`) },
};

export default function Scope3SupplierDataRequestPackPage() {
  return <InsightEngagementPage config={page} />;
}
