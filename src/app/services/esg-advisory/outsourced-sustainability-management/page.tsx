import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Outsourced sustainability management",
  description:
    "Sustained ESG leadership capacity, programme coordination and governance support without needing to build a full in-house sustainability team.",
  path: "/services/esg-advisory/outsourced-sustainability-management",
});

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.outsourced_sustainability_management} />;
}
