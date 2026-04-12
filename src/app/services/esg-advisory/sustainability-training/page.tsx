import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Sustainability training and enablement | ${site.legalName}`,
  description: "Sustainability training and enablement for organisations that need shared understanding, better decision quality, and stronger execution across leadership, functional teams, and programme owners.",
  alternates: { canonical: absUrl("/services/esg-advisory/sustainability-training") },
};

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.sustainability_training} />;
}
