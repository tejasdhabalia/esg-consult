import IndustryPage from "@/components/IndustryPage";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Retail, D2C and consumer brands",
  description:
    "One SKU, four inventory numbers. Why channel inventory truth and returns reconciliation break in retail and D2C, and what it takes to fix the systems underneath.",
  path: "/industries/retail-and-d2c",
});

export default function RetailAndD2CPage() {
  return (
    <IndustryPage
      route="/industries/retail-and-d2c"
      label="Retail, D2C and consumer brands"
      heroTitle="One SKU, four inventory numbers"
      heroSubtitle="The website, the marketplace, the warehouse and the store each hold a different number for the same product. Every one of them is reading its own system correctly."
      heroImage="/hero/crm.jpg"
      heroImageAlt="Retail and D2C channel systems"
      fractureHeading="Inventory truth is where retail systems come apart"
      fractureParagraphs={[
        "Add a channel and you add a version of the truth. The storefront reserves stock at checkout. The marketplace panel holds its own buffer and updates on its own schedule. The warehouse system knows what has been picked but not what has been promised. The store knows what is on the shelf and tells nobody.",
        "None of these is wrong. They are answering different questions. The failure is that no system was ever given the job of being the one that decides, so the answer depends on which screen the person asking happens to be looking at.",
        "The commercial damage shows up twice. Once at the front, in oversells and cancellations that cost a customer rather than a sale. Then again at the back, in returns reconciliation, which is where margin quietly disappears because a return that never gets matched to its original order is stock you have paid for twice and can no longer sell at full price.",
        "Quick commerce made this worse rather than better. Replenishment windows that used to be weekly are now measured in hours, against planning systems built on the older assumption. A model that was merely inaccurate becomes actively expensive.",
      ]}
      stackIntro="Most mid-market retail and consumer businesses run some version of this. The specific products matter less than which layer was bought first and therefore ended up as the accidental system of record."
      stack={[
        {
          layer: "Storefront and commerce",
          platforms: "Shopify and Shopify Plus, Adobe Commerce, WooCommerce, BigCommerce",
        },
        {
          layer: "Order and channel management",
          platforms: "Unicommerce, EasyEcom, Vinculum, Browntape",
        },
        {
          layer: "Store and point of sale",
          platforms: "Ginesys, GoFrugal, LS Retail",
        },
        {
          layer: "Inventory and allocation",
          platforms: "Increff, plus whatever allocation logic sits in the ERP",
        },
        {
          layer: "Engagement and lifecycle",
          platforms: "Klaviyo, CleverTap, MoEngage, WebEngage",
        },
        {
          layer: "Marketplace",
          platforms:
            "Seller panels for Amazon and Flipkart, plus quick commerce partner portals, each with its own API behaviour and its own idea of a business day",
        },
      ]}
      relatedServices={[
        {
          route: "/services/integration",
          label: "Integration",
          relevance:
            "Deciding which system owns the inventory number, then designing the interfaces and the reconciliation that make every other system defer to it.",
        },
        {
          route: "/services/crm-and-revenue-operations",
          label: "CRM and revenue operations",
          relevance:
            "Customer and order definitions that hold across channels, so lifecycle reporting is not counting the same person three times.",
        },
        {
          route: "/services/systems-selection",
          label: "Systems selection",
          relevance:
            "Choosing the order management or inventory layer on requirements drawn from your actual channel mix rather than from a demo.",
        },
      ]}
      provenanceHeading="Where this comes from"
      provenanceParagraphs={[
        "Operating roles, not client engagements. The customer intelligence and omnichannel systems at Nature's Basket were built in-house across more than a million customers and 25 markets, integrating purchase history, survey data and third-party market share data.",
        "Before that, marketing operations at Tata-Tesco against an ₹800Cr revenue portfolio, and location strategy across more than 75 cities in India covering store viability, size and category assortment.",
        "That is the reason this page describes returns reconciliation rather than digital transformation. It is the part that actually took the margin.",
      ]}
      faqs={[
        {
          question: "We already have an order management system. Why is inventory still wrong?",
          answer:
            "Usually because it was installed as another participant rather than as the decision maker. If the storefront can still reserve stock on its own logic and the marketplace panel still holds a private buffer, the order management system is reporting on a decision that was made elsewhere. The fix is a governance decision before it is a technical one.",
        },
        {
          question: "Is this an integration problem or a process problem?",
          answer:
            "Both, and the order matters. Decide which system owns the number and what happens when two disagree, then build interfaces that enforce that. Integrating first just synchronises the disagreement faster.",
        },
        {
          question: "How do we quantify what this is costing us?",
          answer:
            "Three numbers are usually available and rarely looked at together: cancellation rate from oversells, the value of returns not matched to an original order within thirty days, and stock written down at end of season against stock that was invisible to the channel that could have sold it. An assessment starts there.",
        },
        {
          question: "Do we need to replace anything?",
          answer:
            "Often not. A meaningful share of this is allocation logic and interface design on the systems already in place. Where a replacement is genuinely needed we will say so, and we take no commission from anyone you buy from.",
        },
      ]}
    />
  );
}
