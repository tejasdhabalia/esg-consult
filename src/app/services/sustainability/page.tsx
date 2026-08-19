import PillarHub from "@/components/PillarHub";
import { pillars } from "@/lib/service-pillars";
import { pageMetadata } from "@/lib/page-metadata";

const pillar = pillars.find((item) => item.route === "/services/sustainability")!;

export const metadata = pageMetadata({
  title: "Sustainability and ESG reporting",
  description:
    "CSRD, ESRS, SEBI BRSR and UK SECR reporting built as a system. Data ownership, controls and evidence trails, so a disclosed number can be traced to where it came from.",
  path: "/services/sustainability",
});

export default function SustainabilityPillarPage() {
  return (
    <PillarHub
      pillar={pillar}
      heroTitle="A disclosure is only as good as the system underneath it"
      heroSubtitle="Reporting treated as a data and controls problem rather than an annual scramble. Owners, validation rules and evidence trails, so the number holds when somebody asks where it came from."
      heroImage="/hero/esg.jpg"
      heroImageAlt="Sustainability and ESG reporting systems"
      heroNote="We build the reporting system. We do not provide assurance or statutory audit."
      problemHeading="The first report is survivable. The third one is not"
      problemParagraphs={[
        "Most organisations get their first disclosure out by force. A small group assembles numbers from spreadsheets and inboxes, chases suppliers directly, and reconciles by hand in the last fortnight. It works once, because people are willing to do it once.",
        "It stops working when the scope widens, the assurance provider starts asking for evidence rather than figures, and the people who did it the first time have moved on. At that point the question is not what to disclose but whether anyone can reproduce last year's number.",
        "So we treat it as a systems problem. Which system is the source for each data point, who owns it, what validates it, and what evidence exists behind it. Once that holds, disclosure becomes a report you run rather than a project you survive.",
      ]}
      signals={[
        "You are in scope for CSRD or BRSR and the current process would not survive being asked for evidence.",
        "Your last report was assembled by hand and the people who did it are no longer available.",
        "An assurance provider has asked for a data lineage you cannot produce.",
        "Scope 3 data is being requested from suppliers by email with no structure behind it.",
        "The sustainability team and the finance team hold different numbers for the same metric.",
      ]}
      faqs={[
        {
          question: "Do you provide assurance or statutory audit?",
          answer:
            "No. We build the reporting system, the data ownership model, the controls and the evidence trail so that assurance can be performed by someone else. Doing both would defeat the purpose of either.",
        },
        {
          question: "Which frameworks do you cover?",
          answer:
            "CSRD and ESRS, SEBI BRSR, UK SECR and SRS, alongside voluntary disclosures such as CDP and EcoVadis where they matter commercially. The regulatory hub on this site covers the specific obligations in more detail.",
        },
        {
          question: "Why does an ESG practice sit inside a technology firm?",
          answer:
            "Because the hard part is not knowing what to disclose, it is producing a number that can be traced back through the systems it came from. That is data governance work, and it is the same discipline as any other reporting build.",
        },
        {
          question: "We already have a sustainability consultant. What would you add?",
          answer:
            "Usually the layer underneath. Advisory tells you what to report. This is about where the data lives, who owns it, what validates it and how it is evidenced. The two are complementary and we are happy to work alongside an existing advisor.",
        },
        {
          question: "Do you sell an ESG reporting platform?",
          answer:
            "No. We take no commissions, referral fees or reseller margin from any software vendor, including ESG platform vendors. Where a platform is the right answer we will score the options and hand you the scoring. Often the right answer is that you do not need one yet.",
        },
      ]}
    />
  );
}
