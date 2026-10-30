import MovePage from "@/components/MovePage";
import { pageMetadata } from "@/lib/page-metadata";

// Title shortened from the SEO brief's 61-character version, agreed with
// Tejas 30 October 2026. Description and H1 as in the brief. Keep this page
// away from infrastructure language (server, cloud or data centre moves).
export const metadata = pageMetadata({
  title: "Failed ERP implementation recovery",
  description:
    "Two systems running and the move half finished? Independent recovery advice for stalled ERP, CRM and integration projects. Free 45-minute session.",
  path: "/migrations/implementation-recovery",
});

export default function ImplementationRecoveryPage() {
  return (
    <MovePage
      route="/migrations/implementation-recovery"
      breadcrumbLabel="A stalled move"
      eyebrow="A move that stalled"
      h1="Finish the move you started"
      situation={[
        "The new system went live, or half live. The old one is still running because nobody trusts the new numbers, and finance reconciles both every month.",
        "The partner says it is a training problem. The team says it is a system problem. Usually it is both, and nobody owns the gap between them.",
      ]}
      breaksHeading="What keeps a stalled move stalled"
      breaks={[
        {
          title: "Two versions of every number",
          detail:
            "With two systems running, the business picks whichever number suits the meeting, and neither system becomes the record.",
        },
        {
          title: "Workarounds become the process",
          detail:
            "Each workaround makes the old system harder to switch off, until switching it off feels riskier than keeping both.",
        },
        {
          title: "Change requests nobody reads together",
          detail:
            "Scope moves one request at a time, each reasonable on its own, and nobody checks the total against the business case the board approved.",
        },
        {
          title: "An argument about whose fault it is",
          detail:
            "The relationship with the implementation partner turns into a dispute, and the work that would finish the move stops while it runs.",
        },
      ]}
      stepsHeading="How we get it finished"
      steps={[
        "Stop and baseline: an independent view of the real status and what it will cost to finish.",
        "Decide whether to finish, re-scope, change partner or stop, with the test for each written down.",
        "Agree in writing what has to be true before the old system is switched off.",
        "Run the finish on your side, holding the partner to the plan and the business case.",
        "Switch off the old system on a date, with a rollback position.",
      ]}
      links={[
        {
          before: "If the project is still running and you want someone on your side before it stalls, that is",
          anchor: "implementation oversight",
          href: "/services/implementation-oversight",
          after: ".",
        },
      ]}
      areaServed={["IN", "GB", "US"]}
      serviceName="Stalled implementation recovery"
      serviceDescription="Independent recovery of stalled ERP, CRM and integration projects where two systems are still running, led on the client's side."
    />
  );
}
