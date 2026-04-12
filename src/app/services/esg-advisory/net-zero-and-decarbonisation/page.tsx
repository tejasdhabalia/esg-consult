import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Net zero and decarbonisation advisory | ${site.legalName}`,
  description: "Net zero and decarbonisation advisory for organisations that need a credible reduction roadmap, target-setting discipline, and measurable delivery across operations and the value chain.",
  alternates: { canonical: absUrl("/services/esg-advisory/net-zero-and-decarbonisation") },
};

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.net_zero_and_decarbonisation} />;
}
