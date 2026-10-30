import MovePage from "@/components/MovePage";
import { pageMetadata } from "@/lib/page-metadata";

// Title shortened from the SEO brief's 61-character version, agreed with
// Tejas 30 October 2026. Description and H1 as in the brief. Keep this page
// away from infrastructure language (server, cloud or data centre moves).
export const metadata = pageMetadata({
  title: "AI data readiness: get your data AI-ready",
  description:
    "AI plans waiting on the data? Independent advice on getting data into shape before you build. Free 45-minute session and a one-page move plan.",
  path: "/migrations/ai-ready-data",
});

export default function AiReadyDataPage() {
  return (
    <MovePage
      route="/migrations/ai-ready-data"
      breadcrumbLabel="Data for AI"
      eyebrow="Data for AI"
      h1="Your AI plans are waiting on the data. Start there."
      situation={[
        "You have picked the AI use cases. The data they need is spread across a CRM, an ERP, spreadsheets and a support tool, each with its own idea of what a customer or a product is.",
        "The pilot worked on a sample someone cleaned by hand. Production will run on whatever the source systems hold that day.",
      ]}
      breaksHeading="Why AI plans stall on the data"
      breaks={[
        {
          title: "The same thing, defined four ways",
          detail:
            "Each system defines a customer, a product or an order differently, so the AI gets conflicting answers to the same question.",
        },
        {
          title: "Nobody owns the data",
          detail:
            "The data a use case depends on has no owner, so when it drifts nobody notices and nobody fixes it.",
        },
        {
          title: "The data is hard to reach",
          detail:
            "What the use case needs is locked in a system with no clean way to get it out, or arrives too late to be useful.",
        },
        {
          title: "Personal data goes where it should not",
          detail:
            "Customer and employee data goes into AI tools without anyone checking what is allowed, which India's DPDP Act and the EU AI Act both care about.",
        },
      ]}
      stepsHeading="How we get the data ready"
      steps={[
        "Start from the use cases: what data each one needs and how good it has to be.",
        "Map where that data lives, what state it is in and who may see it.",
        "Agree definitions and owners for the data that matters.",
        "Fix it where it lives, or during a system move you are already planning, which is the cheapest moment to do it.",
        "Hand over the checks that keep the data fit for the AI after we leave.",
      ]}
      links={[
        {
          before: "Once the data is ready, the next step is",
          anchor: "governing the AI built on it",
          href: "/services/ai-governance-and-adoption",
          after: ".",
        },
        {
          before: "Once the data is ready, check whether each use case pays back with the",
          anchor: "AI ROI calculator",
          href: "/insights/ai-roi-calculator",
          after: ".",
        },
        {
          before: "Need someone to sit with your teams and make the CTO's AI plan land?",
          anchor: "See the forward deployed engineer service",
          href: "/services/forward-deployed-engineer",
          after: ".",
        },
      ]}
      areaServed={["IN", "GB", "US"]}
      serviceName="AI data readiness"
      serviceDescription="Independent advice on getting business data ready for planned AI use cases: definitions, owners, access and fixing it at the source."
    />
  );
}
