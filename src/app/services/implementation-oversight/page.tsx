import ServiceLinePage from "@/components/ServiceLinePage";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Implementation and delivery oversight",
  description:
    "Independent oversight of ERP and CRM implementations. Scope control against the business case, acceptance testing, risk reporting and go-live readiness for mid-market companies.",
  path: "/services/implementation-oversight",
});

export default function ImplementationOversightPage() {
  return (
    <ServiceLinePage
      route="/services/implementation-oversight"
      label="Implementation and delivery oversight"
      heroTitle="Someone on your side of the table while the implementation runs"
      heroSubtitle="We hold scope against the original business case, test what was promised rather than what was built, and surface problems while they are still cheap to fix. Whether the build is ours or somebody else's."
      heroImage="/hero/lifecycle.jpg"
      heroImageAlt="Implementation and delivery oversight for technology projects"
      problemHeading="The status report is green until the month it is red"
      problemParagraphs={[
        "Implementation partners are not villains. They are commercially rational. They build what the statement of work says, they raise change requests when it does not cover something, and they report progress against their own plan.",
        "What is missing is anybody checking that plan against the thing the board actually approved. Scope moves one change request at a time, each one reasonable on its own. Testing gets compressed because it sits at the end. The people who sold the project moved on to the next one.",
        "We sit on your side of that. Not to be adversarial with the partner, but to make sure someone in the room can read a technical design document and a business case, and can tell when the two have quietly stopped matching.",
      ]}
      scope={[
        {
          title: "Scope control against the business case",
          detail:
            "Every change request assessed for what it does to the outcome the board approved, not just for its price. A log of what has moved, cumulatively, in language a non-technical board can read.",
        },
        {
          title: "Independent acceptance criteria",
          detail:
            "Written before build starts, from the requirements rather than from the design. Testing against what you asked for, not against what was built.",
        },
        {
          title: "Risk and issue management",
          detail:
            "A risk log that names owners and dates, is reviewed on a fixed cadence, and escalates on its own terms rather than when somebody feels brave enough.",
        },
        {
          title: "Data migration assurance",
          detail:
            "Migration is the most common cause of a delayed go-live and the least likely thing to be tested properly. We check reconciliation, volumes and the exception handling before cutover weekend, not during it.",
        },
        {
          title: "Go-live readiness review",
          detail:
            "A structured assessment against defined criteria, with a real recommendation attached. Sometimes that recommendation is to delay, and it is worth having someone who can say so.",
        },
        {
          title: "Handover and benefit tracking",
          detail:
            "Documentation, training and support arrangements checked before the partner leaves. Then a look back at whether the business case is actually being delivered.",
        },
      ]}
      deliverables={[
        "Acceptance criteria mapped to the original requirements",
        "Cumulative scope movement log, business case impact stated in plain terms",
        "Risk and issue register with named owners and escalation triggers",
        "Data migration reconciliation and exception reports",
        "Go-live readiness assessment with a go or no go recommendation",
        "Handover checklist and post go-live benefit review",
      ]}
      signals={[
        "The project is reported as on track but the go-live date has moved twice.",
        "Change requests keep arriving and nobody can tell you what they add up to.",
        "Your team is being asked to sign off on designs they do not have the background to assess.",
        "User acceptance testing is scheduled for two weeks, right at the end, and it has already been shortened once.",
        "The people running the build are not the people who sold the project.",
      ]}
      faqs={[
        {
          question: "Does this make things adversarial with our implementation partner?",
          answer:
            "It should not, and in our experience it does not. Good partners tend to welcome a client-side counterpart who understands the technology, because it means design decisions get made faster and fewer things get relitigated later. What changes is that scope movement gets recorded rather than absorbed.",
        },
        {
          question: "Can you come in halfway through?",
          answer:
            "Yes, and that is often when we are called. We start by establishing two things: what was actually agreed at the outset, and what has been built against it. The gap between those is usually the whole conversation.",
        },
        {
          question: "Do you replace our internal project manager?",
          answer:
            "No. Your project manager runs the project. We provide the technical and commercial judgement to challenge what is being reported, which is a different job and a hard one to do while also running the plan.",
        },
        {
          question: "What if you also built the system?",
          answer:
            "Then this is not oversight, it is our own delivery governance, and we say so rather than dressing it up as independent assurance. If you want genuinely independent oversight of our build, you should appoint someone else and we will support that.",
        },
        {
          question: "How much of your time does this take?",
          answer:
            "It varies with the size of the build. Typically it is a defined number of days per month rather than a full time presence, concentrated around design sign-off, testing and cutover.",
        },
      ]}
    />
  );
}
