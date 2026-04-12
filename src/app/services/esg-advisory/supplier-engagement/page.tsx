import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Supplier engagement advisory | ${site.legalName}`,
  description: "Supplier engagement advisory for organisations that need better sustainability data from the supply base, stronger procurement governance, and a more practical way to improve value chain readiness.",
  alternates: { canonical: absUrl("/services/esg-advisory/supplier-engagement") },
};

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.supplier_engagement} />;
}
