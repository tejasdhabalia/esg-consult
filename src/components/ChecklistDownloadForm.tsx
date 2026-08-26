"use client";

import Script from "next/script";
import { useMemo, useState } from "react";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

interface Props {
  checklistType?: "crm" | "csrd";
  theme?: "light" | "dark";
}

const CONTENT = {
  crm: {
    title: "CRM Governance SOP Template",
    filePath: "/downloads/crm-governance-checklist.pdf",
    emailNote: "You will also receive it at your email shortly.",
  },
  csrd: {
    title: "CSRD Readiness Checklist",
    filePath: "/downloads/csrd-readiness-checklist.pdf",
    emailNote: "You will also receive it at your email shortly.",
  },
};

type FormState = "idle" | "loading" | "done" | "error";

export default function ChecklistDownloadForm({ checklistType = "csrd", theme = "light" }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const action = "checklist_download";

  const [form, setForm] = useState({ name: "", email: "", website: "" });
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const content = CONTENT[checklistType];
  const isDark = theme === "dark";

  const emailValidation = useMemo(() => validateBusinessEmail(form.email), [form.email]);
  const emailError = form.email && !emailValidation.ok ? emailValidation.message : "";

  const inputCls = `w-full rounded-lg px-3 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
    isDark
      ? "bg-indigo-700 border-indigo-500 text-white placeholder-indigo-300"
      : "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
  }`;
  const labelCls = `block text-xs font-medium mb-1 ${isDark ? "text-indigo-200" : "text-slate-700"}`;
  const helperCls = `text-xs ${isDark ? "text-indigo-200" : "text-slate-500"}`;
  const errorCls = `mt-2 text-sm ${isDark ? "text-rose-200" : "text-red-600"}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim()) {
      setStatus("error");
      setErrorMsg("Name is required.");
      return;
    }

    if (!emailValidation.ok) {
      setStatus("error");
      setErrorMsg(emailValidation.message);
      return;
    }

    setStatus("loading");

    try {
      const captchaToken = await getRecaptchaToken(siteKey || "", action);
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          formType: "checklist_download",
          checklistType,
          name: form.name.trim(),
          email: emailValidation.normalizedEmail,
          website: form.website,
          captchaToken,
          captchaAction: action,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Submission failed. Please try again.");
        return;
      }

      setStatus("done");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  if (status === "done") {
    const firstName = form.name.split(" ")[0];
    return (
      <div className={`text-center py-2 ${isDark ? "text-white" : "text-slate-800"}`}>
        <div className="text-2xl mb-2">&#10003;</div>
        <p className="font-semibold text-sm mb-1">Thank you, {firstName}.</p>
        <p className={`text-xs mb-4 ${isDark ? "text-indigo-200" : "text-slate-500"}`}>
          {content.emailNote}
        </p>
        <a
          href={content.filePath}
          download
          className="inline-block bg-white text-indigo-700 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          Download PDF now
        </a>
      </div>
    );
  }

  const idPrefix = `checklist-${checklistType}`;
  const canSubmit = !!form.name.trim() && emailValidation.ok && !!siteKey && status !== "loading";

  return (
    <div className="space-y-3">
      {siteKey ? (
        <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" />
      ) : null}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          className="hidden"
          aria-hidden="true"
        />

        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelCls}>
            Your name
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            name="name"
            autoComplete="given-name"
            placeholder="First name"
            className={inputCls}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className={labelCls}>
            Work email
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={inputCls}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          {emailError ? <p className={errorCls}>{emailError}</p> : null}
        </div>
        {status === "error" && errorMsg ? <p className={errorCls}>{errorMsg}</p> : null}
        {!siteKey ? (
          <p className={helperCls}>
            reCAPTCHA is not configured yet. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY and RECAPTCHA_SECRET_KEY.
          </p>
        ) : (
          <p className={helperCls}>
            This form is protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply.
          </p>
        )}
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-white text-indigo-700 font-semibold text-sm py-2.5 rounded-lg hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === "loading" ? "Sending…" : `Get the ${content.title}`}
        </button>
        <p className={`text-center text-xs ${isDark ? "text-indigo-300" : "text-slate-400"}`}>
          No spam. Unsubscribe any time.
        </p>
      </form>
    </div>
  );
}