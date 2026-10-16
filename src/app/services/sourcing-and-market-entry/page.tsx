import PillarHub from "@/components/PillarHub";
import { pillars } from "@/lib/service-pillars";
import { pageMetadata } from "@/lib/page-metadata";

/**
 * Operational obligations. Confirmed by the founder on 16 October 2026.
 * Each line comes off the page if it stops being true:
 *
 *   1. We are paid only by the company we act for, and manufacturers we
 *      contact for samples pay us nothing. If a commission, retainer or
 *      margin from a manufacturer is ever agreed, the hero note, the first
 *      FAQ here and the supplier FAQ on the services hub all come off.
 *   2. Every manufacturer that sends samples hears the outcome either way.
 *   3. A founder runs this work directly, and any specialist used for
 *      testing or logistics is introduced before they start.
 *   4. The firm is based in Mumbai.
 *
 * Primary audience: export and sales managers at overseas manufacturers
 * arriving from sourcing outreach. They want to know who we are and
 * whether we are a serious channel into India, fast. Keep the hero and
 * the first section short.
 */

const pillar = pillars.find((item) => item.route === "/services/sourcing-and-market-entry")!;

export const metadata = pageMetadata({
  // Title leads with "India market entry", the stronger search term. Most
  // visitors arrive from the email signature, so the OG image matters more
  // than usual: mail clients and LinkedIn preview the link.
  title: "India market entry and overseas sourcing",
  description:
    "We take overseas manufacturers to qualified Indian industrial buyers and help Indian firms qualify overseas suppliers. Samples, tenders and channel CRM.",
  path: "/services/sourcing-and-market-entry",
  ogImage: "/og/sourcing.jpg",
});

export default function SourcingAndMarketEntryPillarPage() {
  return (
    <PillarHub
      pillar={pillar}
      heroTitle="A channel into India, run as a system"
      heroSubtitle="We help overseas manufacturers reach qualified Indian industrial buyers, and help Indian companies find and qualify overseas suppliers. Discovery, samples and buyer introductions, with the CRM and reporting that keep the channel running after the first order."
      heroImage="/hero/sourcing.jpg"
      heroImageAlt="Sourcing and market entry between India and overseas manufacturers"
      heroNote="We are paid by the company we act for. Manufacturers we contact for samples pay us nothing."
      primaryAction={{ label: "Talk to us", href: "/contact" }}
      signalsIntro="Any one of these is enough. Tell us the product, the market and where things stand, and we will tell you whether we can help."
      problemHeading="Most cross-border channels stall between the sample and the second order"
      problemParagraphs={[
        "A manufacturer ships samples to India and hears nothing for three months. An Indian buyer holds three quotes and cannot tell which supplier will still meet the specification a year from now. Neither side is careless. Nobody owns the qualification, and nobody records it.",
        "We do that work. DS Consulting is an advisory firm based in Mumbai, working with indenting houses and industrial buyers in India and with companies setting up here, from consumer goods factories to capability centres and retail networks.",
        "Strategy to Systems. Delivered. applies here too. Every supplier, sample and buyer conversation sits in a pipeline you can read, so the channel does not depend on one person's inbox.",
      ]}
      signals={[
        "You manufacture industrial consumables and want Indian buyers, but have no channel you can verify.",
        "You are an Indian company or indenting house that needs a new source, a second source or a supplier that can meet a tender specification.",
        "Samples have gone out and nobody can say which passed, which failed or why.",
        "You are planning a factory, a capability centre or a retail network in India and need the location and the supply side worked out.",
        "The channel runs on email and spreadsheets, and the pipeline lives in one person's head.",
      ]}
      faqs={[
        {
          question: "Who pays you on sourcing work?",
          answer:
            "The company we act for, and nobody else. When we ask a manufacturer for samples on behalf of an Indian buyer or channel partner, the manufacturer pays us nothing. No commission, retainer or margin from a supplier decides which product qualifies, and we tell both sides who we are acting for.",
        },
        {
          question: "We have been asked for samples. What happens next?",
          answer:
            "We log the samples against the buyer's specification, coordinate testing and come back to you with the outcome either way. If the product qualifies, the next step is commercial terms with the buyer or channel partner, and we run that process.",
        },
        {
          question: "Which sectors and situations do you cover?",
          answer:
            "Industrial consumables for Indian manufacturers, distributors and public tenders. Indenting houses acting for foreign manufacturers. And companies setting up in India, from consumer goods factories to capability centres, outsourcing operations and retail store networks, where we also handle location planning.",
        },
        {
          question: "Who will we deal with?",
          answer:
            "One of the firm's founders runs this work directly, from first contact through qualification. If a specialist is needed for testing or logistics, you are introduced to them before they start.",
        },
        {
          question: "Do you help with tenders?",
          answer:
            "Yes. We match product specifications to tender requirements, assemble the supplier documentation evaluators ask for and track the procurement timeline, so a qualified product is not lost to a missed deadline.",
        },
        {
          question: "Why does a technology firm do sourcing?",
          answer:
            "Because a channel fails the same way a system does. Supplier details, sample results and buyer conversations end up spread across inboxes and spreadsheets. We set up the CRM, pipeline and reporting so the channel can be run, measured and handed over.",
        },
      ]}
    />
  );
}
