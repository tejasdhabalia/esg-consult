import InsightEngagementPage from "@/components/InsightEngagementPage";
import { getEsgInsightPage } from "@/lib/esg-insight-pages";
import { pageMetadata } from "@/lib/page-metadata";

const page = getEsgInsightPage("scope-3-supplier-data-request-pack");

export const metadata = pageMetadata({
  title: "Scope 3 supplier data request pack",
  description:
    "A working guide for leadership teams that need better Scope 3 supplier data without creating chaos across procurement, sustainability and operations.",
  path: "/insights/scope-3-supplier-data-request-pack",
});

export default function Scope3SupplierDataRequestPackPage() {
  return <InsightEngagementPage config={page} />;
}
