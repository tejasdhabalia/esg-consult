"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/lib/site";

declare global {
  interface Window {
    grecaptcha?: any;
  }
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactFormClient() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const captchaContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);

  const [captchaToken, setCaptchaToken] = useState<string>("");
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
    if (!captchaToken) return false;
    if (status === "submitting") return false;
    return true;
  }, [form.email, form.message, siteKey, captchaToken, status]);

  useEffect(() => {
    // If script is already loaded, render immediately
    if (!siteKey) return;

    const tryRender = () => {
      if (!window.grecaptcha || !captchaContainerRef.current) return;
      if (widgetIdRef.current !== null) return;

      widgetIdRef.current = window.grecaptcha.render(captchaContainerRef.current, {
        sitekey: siteKey,
        theme: "light",
        callback: (token: string) => {
          setCaptchaToken(token);
          setErrorMsg("");
        },
        "expired-callback": () => {
          setCaptchaToken("");
        },
        "error-callback": () => {
          setCaptchaToken("");
          setErrorMsg("reCAPTCHA could not be verified. Please try again.");
        },
      });
    };

    const interval = setInterval(tryRender, 150);
    return () => clearInterval(interval);
  }, [siteKey]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          captchaToken,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Submission failed. Please try again.");
        // Reset captcha so bot attempts do not loop
        if (window.grecaptcha && widgetIdRef.current !== null) {
          window.grecaptcha.reset(widgetIdRef.current);
        }
        setCaptchaToken("");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Submission failed due to a network error. Please try again.");
    }
  }

  return (
    <div>
      {/* Load reCAPTCHA script only if configured */}
      {siteKey ? (
        <Script src="https://www.google.com/recaptcha/api.js?render=explicit" strategy="afterInteractive" />
      ) : null}

      <div className="font-semibold text-slate-900">Share your context</div>
      <p className="mt-2 text-sm text-slate-600">
        Required fields: work email and message. This form is protected by reCAPTCHA.
      </p>

      {!siteKey ? (
        <div className="mt-4 bg-white border rounded-xl p-4 text-sm text-slate-700">
          reCAPTCHA is not configured yet. Add{" "}
          <span className="font-medium">NEXT_PUBLIC_RECAPTCHA_SITE_KEY</span> and{" "}
          <span className="font-medium">RECAPTCHA_SECRET_KEY</span> to enable submissions.
          You can still be reached at{" "}
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
            <label className="text-sm font-medium text-slate-700">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              placeholder="Your name"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Work email</label>
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
            <label className="text-sm font-medium text-slate-700">What do you need help with?</label>
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
            <label className="text-sm font-medium text-slate-700">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us what is happening, timeline, and what is not working today."
              className="mt-2 w-full min-h-[120px] rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
              required
            />
          </div>

          {/* reCAPTCHA container */}
          <div className="pt-2">
            <div ref={captchaContainerRef} />
            <div className="mt-2 text-xs text-slate-500">
              This site is protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply.
            </div>
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

          <p className="text-xs text-slate-500">
            Prefer email? Write to{" "}
            <a className="underline" href={`mailto:${site.emails.general}`}>
              {site.emails.general}
            </a>
            .
          </p>
        </form>
      )}
    </div>
  );
}