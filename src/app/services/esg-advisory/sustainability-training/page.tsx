import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Sustainability training and enablement",
  description:
    "ESG and sustainability training for leadership, functional teams and programme owners. Shared understanding, better decisions and stronger execution.",
  path: "/services/esg-advisory/sustainability-training",
});

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.sustainability_training} />;
}
