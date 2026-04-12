import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `CDP reporting advisory | ${site.legalName}`,
  description: "CDP reporting advisory for organisations that need stronger climate disclosure, better evidence quality, and a more structured response process across data, governance, and narrative.",
  alternates: { canonical: absUrl("/services/esg-advisory/cdp-reporting") },
};

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.cdp_reporting} />;
}
