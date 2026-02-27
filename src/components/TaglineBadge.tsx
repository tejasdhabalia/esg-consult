import { site } from "@/lib/site";

export default function TaglineBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-slate-700 bg-slate-800/60 px-5 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
      <span className="text-sm sm:text-base font-bold tracking-tight">
        <span className="text-indigo-300">{site.taglinePrimary}</span>{" "}
        <span className="text-white">{site.taglineSecondary}</span>
      </span>
    </div>
  );
}