import MovePage from "@/components/MovePage";
import { pageMetadata } from "@/lib/page-metadata";

// Title, description and H1 from the SEO brief for Batches 3 and 4,
// 30 October 2026.
export const metadata = pageMetadata({
  title: "Ecommerce migration advisory",
  description:
    "Moving your store to a new platform? Independent ecommerce migration advice covering data, orders and integrations. Free 45-minute move plan session.",
  path: "/migrations/ecommerce-migration",
});

export default function EcommerceMovePage() {
  return (
    <MovePage
      route="/migrations/ecommerce-migration"
      breadcrumbLabel="Replatforming your store"
      eyebrow="Replatforming your store"
      h1="Move your store without losing orders or customer data"
      situation={[
        "The platform you launched on no longer fits your channels, your volumes or the way you fulfil orders. The new storefront can be live in weeks.",
        "Whether the move works depends on everything that has to come across with it, and most of that sits behind the storefront.",
      ]}
      breaksHeading="What usually goes wrong in a replatform"
      breaks={[
        {
          title: "Search rankings disappear",
          detail:
            "Product and category URLs change, and without a redirect for each one the rankings they carried are gone.",
        },
        {
          title: "Customers start again",
          detail:
            "Accounts, saved addresses and order history do not come across, so your most loyal customers meet the new store as strangers.",
        },
        {
          title: "Orders fall between platforms",
          detail:
            "Orders in flight, returns against old orders, gift cards and subscriptions all need a decision, and each one missed is a complaint the week after launch.",
        },
        {
          title: "Stock goes out of step",
          detail:
            "Feeds to the warehouse, the marketplaces and finance break, and the same product shows a different number in every channel.",
        },
      ]}
      stepsHeading="How we run the move"
      steps={[
        "List everything that has to come across: catalogue, customers, orders, URLs and integrations.",
        "Map every old URL to a new one, with the redirects tested before launch.",
        "Plan the cutover around orders in flight and the returns still to come back.",
        "Re-test every integration: warehouse, marketplaces, payments and finance.",
        "Lead the move on your side. Where we can build the storefront ourselves, we say so before the platform decision, and you are free to use another builder.",
      ]}
      links={[
        {
          before: "Choosing the platform comes first. See",
          anchor: "how we choose a commerce platform",
          href: "/services/commerce-and-digital-platforms",
          after: ".",
        },
      ]}
      areaServed={["IN", "GB", "US"]}
      serviceName="Ecommerce replatforming"
      serviceDescription="Independent advice on moving a store to a new ecommerce platform without losing orders, customer data, search rankings or integrations."
    />
  );
}
