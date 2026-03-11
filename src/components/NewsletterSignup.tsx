"use client";

import Script from "next/script";
import { useMemo, useState } from "react";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

type FormState = "idle" | "submitting" | "success" | "error";

export default function NewsletterSignup({ className = "" }: { className?: string }) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const action = "newsletter_subscribe";

  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const emailValidation = useMemo(() => validateBusinessEmail(email), [email]);
  const emailError = email && !emailValidation.ok ? emailValidation.message : "";
  const canSubmit = !!email && emailValidation.ok && !!siteKey && status !== "submitting";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!emailValidation.ok) {
      setStatus("error");
      setErrorMsg(emailValidation.message);
      return;
    }

    setStatus("submitting");

    try {
      const captchaToken = await getRecaptchaToken(siteKey || "", action);
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          formType: "newsletter_subscribe",
          email: emailValidation.normalizedEmail,
          website,
          captchaToken,
          captchaAction: action,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Subscription failed. Please try again.");
        return;
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Subscription failed. Please try again.");
    }
  }

  return (
    <div className={`bg-indigo-950 rounded-2xl p-8 ${className}`}>
      {siteKey ? <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" /> : null}

      <h3 className="text-white font-semibold text-lg">
        Regulatory Radar &amp; Revenue Intelligence
      </h3>
      <p className="mt-2 text-indigo-200 text-sm">
        Monthly briefing for ESG and revenue leaders. Regulatory updates, governance
        frameworks, and practical guides delivered straight to your inbox.
      </p>

      {status === "success" ? (
        <div className="mt-5 bg-indigo-800/60 rounded-lg px-5 py-4 text-indigo-100 text-sm font-medium">
          You are on the list. First issue coming soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-900 text-white placeholder-indigo-400 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
            />
            <button
              type="submit"
              disabled={!canSubmit}
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Submitting..." : "Subscribe free"}
            </button>
          </div>
          {emailError ? <p className="text-sm text-rose-200">{emailError}</p> : null}
          {status === "error" && errorMsg ? <p className="text-sm text-rose-200">{errorMsg}</p> : null}
          {!siteKey ? (
            <p className="text-xs text-indigo-300">
              reCAPTCHA is not configured yet. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY and RECAPTCHA_SECRET_KEY.
            </p>
          ) : (
            <p className="text-xs text-indigo-300">
              This form is protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply.
            </p>
          )}
        </form>
      )}
      <p className="mt-3 text-xs text-indigo-400">No spam. Unsubscribe any time.</p>
    </div>
  );
}