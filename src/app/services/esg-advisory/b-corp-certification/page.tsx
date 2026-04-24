import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "B Corp certification advisory",
  description:
    "B Corp certification readiness. Structured assessment across policy, data, evidence trails and operating model, with practical coordination through submission.",
  path: "/services/esg-advisory/b-corp-certification",
});

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.b_corp_certification} />;
}
