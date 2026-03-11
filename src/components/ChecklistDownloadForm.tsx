"use client";
import { useState } from "react";

export default function ChecklistDownloadForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    // TODO: wire up to your email provider to send the checklist PDF
    await new Promise((r) => setTimeout(r, 800)); // simulate network
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <div className="text-emerald-700 text-3xl mb-3">✓</div>
        <h3 className="text-lg font-semibold text-slate-900">Request received</h3>
        <p className="mt-2 text-slate-600 text-sm">
          Thank you, {form.name.split(" ")[0]}. You will receive the CSRD Readiness
          Checklist via email shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
      <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">
        Free Resource
      </div>
      <h3 className="text-xl font-semibold text-slate-900">
        Download: CSRD Readiness Checklist
      </h3>
      <p className="mt-2 text-slate-600 text-sm max-w-xl">
        A one-page checklist for CFOs and CSOs to confirm scope, ownership, evidence
        trails, and first-cycle readiness before your first assurance review.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-emerald-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
        />
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-emerald-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white px-6 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors"
        >
          {loading ? "Sending..." : "Send me the checklist"}
        </button>
      </form>
      <p className="mt-3 text-xs text-slate-500">
        We will email you the checklist. No spam, unsubscribe any time.
      </p>
    </div>
  );
}
