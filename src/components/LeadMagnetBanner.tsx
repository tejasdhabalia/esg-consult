import Link from "next/link";

export default function LeadMagnetBanner() {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 my-12 flex flex-col md:flex-row md:items-center gap-6">
      <div className="flex-1">
        <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">
          Free Resource
        </div>
        <h3 className="text-xl font-semibold text-slate-900">
          Download: CSRD Readiness Checklist
        </h3>
        <p className="mt-2 text-slate-600 text-sm max-w-xl">
          A one-page checklist for CFOs and CSOs to confirm scope, ownership, evidence
          trails, and first-cycle readiness — before your first assurance review.
        </p>
      </div>
      <div className="shrink-0">
        <Link
          href="/contact"
          className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors"
        >
          Download Free Checklist →
        </Link>
      </div>
    </div>
  );
}
