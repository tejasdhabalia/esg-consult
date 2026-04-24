import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Climate risk advisory",
  description:
    "Physical and transition climate risk assessment, stronger TCFD-aligned disclosure inputs and a practical governance model for climate resilience.",
  path: "/services/esg-advisory/climate-risk",
});

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.climate_risk} />;
}
