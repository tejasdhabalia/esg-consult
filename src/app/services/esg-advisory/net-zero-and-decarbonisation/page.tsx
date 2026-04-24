import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Net zero and decarbonisation advisory",
  description:
    "Credible net zero roadmaps, SBTi-aligned target setting and measurable decarbonisation delivery across operations, supply chain and the wider value chain.",
  path: "/services/esg-advisory/net-zero-and-decarbonisation",
});

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.net_zero_and_decarbonisation} />;
}
