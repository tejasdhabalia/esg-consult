import ESGServicePage from "@/components/ESGServicePage";
import { esgServiceConfigs } from "@/lib/esgServiceConfigs";
import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Product sustainability advisory | ${site.legalName}`,
  description: "Product sustainability advisory for organisations that need clearer insight into product impacts, stronger evidence for customers, and a more structured basis for product claims and improvement priorities.",
  alternates: { canonical: absUrl("/services/esg-advisory/product-sustainability") },
};

export default function Page() {
  return <ESGServicePage config={esgServiceConfigs.product_sustainability} />;
}
