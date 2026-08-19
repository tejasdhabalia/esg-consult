import ServiceLinePage from "@/components/ServiceLinePage";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Commerce and digital platforms",
  description:
    "Ecommerce and D2C platform selection, build and replatforming. Channel inventory truth, order flow into finance and returns reconciliation for mid-market consumer businesses.",
  path: "/services/commerce-and-digital-platforms",
});

export default function CommerceAndDigitalPlatformsPage() {
  return (
    <ServiceLinePage
      route="/services/commerce-and-digital-platforms"
      label="Commerce and digital platforms"
      heroTitle="The storefront is where it starts, not where it ends"
      heroSubtitle="Websites, ecommerce and D2C platforms, built with the part most people leave out. Inventory truth across channels, order flow into finance, and the returns reconciliation nobody scopes until the margin has gone."
      heroImage="/hero/crm.jpg"
      heroImageAlt="Commerce and digital platform systems"
      problemHeading="Adding a channel adds a version of the truth"
      problemParagraphs={[
        "A storefront can be launched in weeks, and that is where most of the market stops. We build them too. The difference is what we do about everything downstream, which is where the eighteen month problems live.",
        "The storefront reserves stock at checkout. The marketplace panel holds its own buffer and updates on its own schedule. The warehouse knows what has been picked but not what has been promised. The store knows what is on the shelf and tells nobody. None of them is wrong. They are answering different questions, and no system was ever given the job of deciding.",
        "The damage lands twice. At the front, in oversells and cancellations that cost a customer rather than a sale. At the back, in returns reconciliation, where a return not matched to its original order is stock you have paid for twice and can no longer sell at full price.",
        "Quick commerce made this sharper. Replenishment windows that used to be weekly are now measured in hours, running against planning logic built on the older assumption. A model that was merely inaccurate becomes expensive.",
      ]}
      scope={[
        {
          title: "Website and storefront build",
          detail:
            "Design and build for the customer-facing side, from a marketing site through to a full transactional storefront. Built so the catalogue, customer records and order data behind it are usable by everything downstream rather than trapped in the front end.",
        },
        {
          title: "Platform selection and replatforming",
          detail:
            "Which commerce platform fits your channel mix, order volumes and fulfilment model. Scored against your requirements, with the scoring handed over. Replatforming plans that account for catalogue, customer accounts and SEO continuity.",
        },
        {
          title: "Inventory and order management",
          detail:
            "Deciding which system owns the stock number and what happens when two disagree. This is a governance decision before it is a technical one, and getting it the wrong way round is why most integrations synchronise the disagreement faster.",
        },
        {
          title: "Channel and marketplace integration",
          detail:
            "Marketplace panels, quick commerce partners and retail customers, each with its own API behaviour and its own idea of a business day. Built with the error handling and reconciliation any other interface would get.",
        },
        {
          title: "Order to cash into finance",
          detail:
            "Orders, payments, refunds and settlements landing in the finance system in a form that reconciles. Usually the least glamorous part of the project and the one that decides whether anyone trusts the numbers.",
        },
        {
          title: "Returns and margin recovery",
          detail:
            "Matching returns to original orders, routing them to the right disposition, and reporting the true landed margin per channel rather than the gross number the storefront shows.",
        },
        {
          title: "Customer data and lifecycle",
          detail:
            "A single customer record across store, web and marketplace, so lifecycle reporting is not counting the same person three times and engagement tooling is working from something real.",
        },
      ]}
      deliverables={[
        "Channel and system map showing where each version of stock truth currently lives",
        "Inventory ownership model with conflict resolution rules",
        "Scored platform comparison where a selection or replatform is in scope",
        "Interface specifications with error handling and reconciliation design",
        "Returns matching logic and true margin reporting by channel",
        "Cutover plan and post go-live reconciliation reports",
      ]}
      signals={[
        "The website, the marketplace, the warehouse and the store each hold a different number for the same product.",
        "Oversells and cancellations are frequent enough that someone monitors them manually.",
        "Returns are reconciled at quarter end, if at all, and nobody can state true margin by channel.",
        "You are adding quick commerce and the replenishment planning was built for weekly cycles.",
        "Your commerce platform was chosen for the storefront and is now the accidental system of record for stock.",
      ]}
      faqs={[
        {
          question: "Do you build websites?",
          answer:
            "Yes. Storefronts, marketing sites and the commerce systems behind them. A website is often the first place a systems problem becomes visible, so it is a sensible place to start even when the eventual work turns out to sit further back in the stack.",
        },
        {
          question: "Do we need to replace our platform?",
          answer:
            "Often not. A meaningful share of this is allocation logic, interface design and ownership governance on the systems already in place. Where a replacement is genuinely needed we will say so, and we take no commission from anyone you buy from.",
        },
        {
          question: "Is this an integration problem or a process problem?",
          answer:
            "Both, and the order matters. Decide which system owns the number and what happens when two disagree, then build interfaces that enforce it. Integrating first just makes the disagreement propagate faster.",
        },
        {
          question: "How do we quantify what this is costing us?",
          answer:
            "Three numbers are usually available and rarely looked at together: cancellation rate from oversells, the value of returns not matched to an original order within thirty days, and end of season write-downs against stock that was invisible to the channel that could have sold it.",
        },
        {
          question: "Which platforms do you work on?",
          answer:
            "Shopify and Shopify Plus, Adobe Commerce, WooCommerce and BigCommerce at the storefront, alongside the order management and inventory layers that sit behind them. We hold no reseller agreement or partner status with any of them.",
        },
      ]}
    />
  );
}
