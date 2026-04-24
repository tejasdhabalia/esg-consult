import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Product sustainability advisory",
  description:
    "Clearer insight into product impacts, stronger customer-facing evidence and a structured basis for product claims and improvement priorities.",
  path: "/services/esg-advisory/product-sustainability",
});

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.product_sustainability} />;
}
