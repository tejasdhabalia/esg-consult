import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Climate risk advisory | ${site.legalName}`,
  description: "Climate risk advisory for organisations that need clearer visibility into physical and transition risks, stronger disclosure inputs, and a practical governance model for climate resilience.",
  alternates: { canonical: absUrl("/services/esg-advisory/climate-risk") },
};

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.climate_risk} />;
}
