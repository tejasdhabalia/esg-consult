import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Supplier engagement advisory",
  description:
    "Better Scope 3 data from suppliers, stronger procurement governance and a practical way to improve value chain readiness across the supply base.",
  path: "/services/esg-advisory/supplier-engagement",
});

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.supplier_engagement} />;
}
