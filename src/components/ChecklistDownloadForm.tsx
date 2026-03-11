"use client";
import { useState } from "react";

interface Props {
  checklistType?: "crm" | "csrd";
  theme?: "light" | "dark";
}

const CONTENT = {
  crm: {
    title: "CRM Governance SOP Template",
    pdfPath: "/downloads/crm-governance-checklist.pdf",
    successMsg: "Your CRM Governance Checklist is ready.",
    emailNote: "You will also receive it at your email shortly.",
  },
  csrd: {
    title: "CSRD Readiness Checklist",
    pdfPath: "/downloads/csrd-readiness-checklist.pdf",
    successMsg: "Your CSRD Readiness Checklist is ready.",
    emailNote: "You will also receive it at your email shortly.",
  },
};

export default function ChecklistDownloadForm({ checklistType = "csrd", theme = "light" }: Props) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const content = CONTENT[checklistType];

  const isDark = theme === "dark";
  const inputClass = `w-full rounded-lg px-3 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
    isDark
      ? "bg-indigo-700 border-indigo-500 text-white placeholder-indigo-300"
      : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
  }`;
  const labelClass = `block text-xs font-medium mb-1 ${isDark ? "text-indigo-200" : "text-slate-700"}`;

  async function handleSubmit() {
    if (!form.name.trim() || !form.email.trim()) return;
    setStatus("loading");

    // TODO: wire to email provider (Mailchimp / ConvertKit / Resend)
    // POST to /api/send-checklist with { name, email, checklistType }
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  }

  if (status === "done") {
    const firstName = form.name.split(" ")[0];
    return (
      <div className={`text-center py-2 ${isDark ? "text-white" : "text-slate-800"}`}>
        <div className="text-2xl mb-2">✓</div>
        <p className="font-semibold text-sm mb-1">Thank you, {firstName}.</p>
        <p className={`text-xs mb-4 ${isDark ? "text-indigo-200" : "text-slate-500"}`}>
          {content.emailNote}
        </p>
        <a
          href={content.pdfPath}
          download
          className="inline-block bg-white text-indigo-700 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          Download PDF now
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>Your name</label>
        <input
          type="text"
          placeholder="First name"
          className={inputClass}
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
      </div>
      <div>
        <label className={labelClass}>Work email</label>
        <input
          type="email"
          placeholder="you@company.com"
          className={inputClass}
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={status === "loading" || !form.name.trim() || !form.email.trim()}
        className="w-full bg-white text-indigo-700 font-semibold text-sm py-2.5 rounded-lg hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === "loading" ? "Sending…" : `Get the ${content.title}`}
      </button>
      <p className={`text-center text-xs ${isDark ? "text-indigo-300" : "text-slate-400"}`}>
        No spam. Unsubscribe any time.
      </p>
    </div>
  );
}
