import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Sustainability strategy advisory",
  description:
    "Clearer sustainability priorities, a stronger operating model and a practical route from ambition to governed execution for leadership teams.",
  path: "/services/esg-advisory/sustainability-strategy",
});

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.sustainability_strategy} />;
}
