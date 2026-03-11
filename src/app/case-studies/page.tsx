import { site } from "@/lib/site";
import { absUrl } from "@/lib/url";

export const metadata = {
  title: `Case Studies | ${site.legalName}`,
  description:
    "Selected engagement experience from DS Consulting. ESG readiness and revenue visibility outcomes delivered for leadership teams across B2B and B2C organisations.",
  alternates: { canonical: absUrl("/case-studies") },
};

export default function CaseStudiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold">Selected Engagement Experience</h1>

      <div className="mt-12 space-y-12">
        <div className="border rounded-xl p-8">
          <h2 className="text-2xl font-semibold">Omnichannel Retail Growth</h2>
          <p className="mt-4 text-slate-600">
            Designed operating model improvements across e-commerce, supply chain
            and commercial reporting for a multi-location retail business.
          </p>
        </div>

        <div className="border rounded-xl p-8">
          <h2 className="text-2xl font-semibold">Marketing Automation Transformation</h2>
          <p className="mt-4 text-slate-600">
            Implemented CRM governance, lifecycle management and funnel measurement
            systems for a growth-stage organization.
          </p>
        </div>
      </div>
    </div>
  );
}