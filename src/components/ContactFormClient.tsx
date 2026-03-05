"use client";

import Script from "next/script";
import { useMemo, useState } from "react";
import { site } from "@/lib/site";

declare global {
  interface Window {
    grecaptcha?: any;
  }
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactFormClient() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const action = "contact_submit";

  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    interest: "ESG readiness",
    message: "",
  });

  const canSubmit = useMemo(() => {
    if (!form.email || !form.message) return false;
    if (!siteKey) return false;
    if (status === "submitting") return false;
    return true;
  }, [form.email, form.message, siteKey, status]);

  async function getRecaptchaToken(): Promise<string> {
    if (!siteKey) throw new Error("reCAPTCHA site key missing.");
    if (!window.grecaptcha) throw new Error("reCAPTCHA not loaded.");

    // Wait for grecaptcha to be ready then execute
    await window.grecaptcha.ready(() => {});
    const token = await window.grecaptcha.execute(siteKey, { action });
    if (!token) throw new Error("reCAPTCHA token missing.");
    return token;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const captchaToken = await getRecaptchaToken();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
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

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Submission failed. Please try again.");
    }
  }

  return (
    <div>
      {/* Load reCAPTCHA v3 script only if configured */}
      {siteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      ) : null}

      <div className="font-semibold text-slate-900">Share your context</div>
      <p className="mt-2 text-sm text-slate-600">
        Fields marked with an asterisk (*) are required.
      </p>

      {!siteKey ? (
        <div className="mt-4 bg-white border rounded-xl p-4 text-sm text-slate-700">
          reCAPTCHA is not configured yet. Add{" "}
          <span className="font-medium">NEXT_PUBLIC_RECAPTCHA_SITE_KEY</span> and{" "}
          <span className="font-medium">RECAPTCHA_SECRET_KEY</span>. You can still email{" "}
          <a className="underline" href={`mailto:${site.emails.general}`}>
            {site.emails.general}
          </a>
          .
        </div>
      ) : null}

      {status === "success" ? (
        <div className="mt-6 bg-white border rounded-xl p-5">
          <div className="font-semibold text-slate-900">Thank you</div>
          <div className="mt-2 text-sm text-slate-600">
            Your message has been received. We will respond via email.
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Name*</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              placeholder="Your name"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Work email*</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="name@company.com"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Company</label>
            <input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              type="text"
              placeholder="Company name"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              What do you need help with?*
            </label>
            <select
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
            >
              <option>ESG readiness</option>
              <option>Marketing automation and RevOps</option>
              <option>Both ESG and revenue systems</option>
              <option>Not sure yet</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Message*</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us what is happening, timeline, and what is not working today."
              className="mt-2 w-full min-h-[120px] rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
              required
            />
          </div>

          <div className="text-xs text-slate-500">
            This site is protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply.
          </div>

          {status === "error" ? (
            <div className="bg-white border rounded-xl p-4 text-sm text-slate-700">
              <span className="font-medium text-slate-900">Error:</span> {errorMsg}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit}
            className={[
              "w-full px-6 py-3 rounded-lg font-medium",
              canSubmit
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-slate-200 text-slate-500 cursor-not-allowed",
            ].join(" ")}
          >
            {status === "submitting" ? "Submitting..." : "Submit"}
          </button>

          
        </form>
      )}
    </div>
  );
}