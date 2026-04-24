import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "CDP reporting advisory",
  description:
    "Stronger CDP disclosure scores through better evidence quality and a structured response process across climate data, governance and narrative.",
  path: "/services/esg-advisory/cdp-reporting",
});

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.cdp_reporting} />;
}
