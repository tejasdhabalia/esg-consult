import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Outsourced sustainability management | ${site.legalName}`,
  description: "Outsourced sustainability management for organisations that need sustained ESG leadership capacity, programme coordination, and governance support without building a full in-house team immediately.",
  alternates: { canonical: absUrl("/services/esg-advisory/outsourced-sustainability-management") },
};

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.outsourced_sustainability_management} />;
}
