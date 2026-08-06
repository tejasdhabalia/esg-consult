import ServiceLinePage from "@/components/ServiceLinePage";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Integration",
  description:
    "Systems integration for mid-market companies. Interface design across ERP, CRM and finance systems, middleware selection, data migration, error handling and reconciliation.",
  path: "/services/integration",
});

export default function IntegrationPage() {
  return (
    <ServiceLinePage
      route="/services/integration"
      label="Integration"
      heroTitle="Systems that pass data to each other without a person in the middle"
      heroSubtitle="Interface design across ERP, CRM, finance and operational systems. Middleware selection, data migration, and the error handling that nobody scopes until the night it matters."
      heroImage="/hero/revenue.jpg"
      heroImageAlt="Systems integration across ERP, CRM and finance platforms"
      problemHeading="The spreadsheet between two systems is a permanent employee"
      problemParagraphs={[
        "Every mid-market company has one. An export from one system, a transformation someone built years ago, an import into another. It runs monthly, it takes a day, and one person understands it.",
        "It survives because integration projects get scoped around the happy path. Two systems, one direction, matching records. Then real data arrives: the duplicate customer, the credit note with no matching invoice, the record that fails validation at three in the morning with nobody watching.",
        "The interesting engineering in integration is not moving the data. It is deciding what happens when the data is wrong, who finds out, and how the two systems get back into agreement afterwards.",
      ]}
      scope={[
        {
          title: "Interface mapping",
          detail:
            "Which systems need to know what, in which direction, and how quickly. Most integration backlogs shrink at this stage, because a good share of proposed interfaces turn out to be reporting problems.",
        },
        {
          title: "Middleware and iPaaS selection",
          detail:
            "Whether you need a platform at all, and if so which one. Assessed on the same independent basis as any other systems selection, because a platform decision is harder to reverse than an interface.",
        },
        {
          title: "Interface build and testing",
          detail:
            "Field level mapping, transformation logic and validation, tested against real data volumes and real edge cases rather than a clean sample.",
        },
        {
          title: "Error handling and reconciliation",
          detail:
            "What happens to a record that fails, who is told, how it is retried, and how you prove at month end that both systems agree. This is the part that determines whether an integration is trusted.",
        },
        {
          title: "Data migration",
          detail:
            "Extract, cleanse, map, load, reconcile. Including the decision about how much history to bring, which is a business decision that gets made by default far too often.",
        },
        {
          title: "Monitoring and handover",
          detail:
            "Alerting that reaches a named person, documentation your team can act on, and a support arrangement that does not depend on us being available.",
        },
      ]}
      deliverables={[
        "Interface catalogue covering direction, frequency, volume and owner",
        "Field level mapping and transformation specifications",
        "Error handling design, including retry, alerting and manual intervention paths",
        "Reconciliation reports that prove the systems agree",
        "Migration plan with cutover sequence and rollback position",
        "Monitoring dashboards and runbook documentation for your team",
      ]}
      signals={[
        "Someone spends a day a month moving data between two systems by hand.",
        "Finance and sales report different numbers for the same thing and both are reading their own system correctly.",
        "An integration was built by a contractor who has left, and nobody wants to touch it.",
        "You are about to buy a system and nobody has asked how it will talk to the ones you keep.",
        "An interface fails silently, and you find out from a customer rather than from an alert.",
      ]}
      faqs={[
        {
          question: "Do we need an integration platform, or will point to point do?",
          answer:
            "It depends on how many interfaces you expect to run and how much they change. Below roughly five stable interfaces, point to point is usually cheaper and simpler. Above that, or where interfaces change often, a platform starts paying for itself in monitoring and maintenance. We will tell you which side of that line you are on before recommending anything you have to buy.",
        },
        {
          question: "Can you work with the integrations we already have?",
          answer:
            "Yes. Most engagements start with an inventory of what already runs, which is frequently the first time anyone has written it all down. Some of it will be fine and should be left alone.",
        },
        {
          question: "Who owns the integrations after go-live?",
          answer:
            "Your team, with documentation and monitoring built for that. If you would rather we ran them, that is a separate support conversation and we will be clear that it is a different commercial arrangement.",
        },
        {
          question: "How do you handle data quality problems found during migration?",
          answer:
            "We surface them early and put the decisions in front of the business rather than resolving them quietly in the mapping. Migration is usually the first time anyone has looked at the whole data set at once, and what it finds is often worth acting on independently of the project.",
        },
        {
          question: "Do you build the interfaces yourselves?",
          answer:
            "Yes. The people who design the interfaces build and test them. That is the point of the design surviving into the build.",
        },
      ]}
    />
  );
}
