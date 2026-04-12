import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `B Corp certification advisory | ${site.legalName}`,
  description: "B Corp certification advisory for organisations that need a structured readiness plan, stronger evidence, and practical coordination across policy, data, and operating model changes.",
  alternates: { canonical: absUrl("/services/esg-advisory/b-corp-certification") },
};

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.b_corp_certification} />;
}
