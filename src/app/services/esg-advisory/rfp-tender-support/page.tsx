import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "RFP and tender sustainability support",
  description:
    "Stronger responses to buyer sustainability requirements in RFPs and tenders. Evidence libraries and a repeatable way to answer ESG questions under deadline.",
  path: "/services/esg-advisory/rfp-tender-support",
});

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.rfp_tender_support} />;
}
