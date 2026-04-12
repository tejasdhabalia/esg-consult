import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `RFP and tender sustainability support | ${site.legalName}`,
  description: "RFP and tender sustainability support for organisations that need stronger responses to buyer sustainability requirements, clearer evidence, and a repeatable way to answer ESG questions under commercial deadlines.",
  alternates: { canonical: absUrl("/services/esg-advisory/rfp-tender-support") },
};

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.rfp_tender_support} />;
}
