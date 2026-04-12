import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Sustainability strategy advisory | ${site.legalName}`,
  description: "Sustainability strategy advisory for leadership teams that need clearer priorities, a stronger operating model, and a practical route from ambition to governed execution.",
  alternates: { canonical: absUrl("/services/esg-advisory/sustainability-strategy") },
};

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.sustainability_strategy} />;
}
