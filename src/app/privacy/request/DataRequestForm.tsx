"use client";
import { useState } from "react";
import Script from "next/script";
import { getRecaptchaToken } from "@/lib/recaptcha-client";

/*
  Rights request form.

  Three design rules, all of which come from the law rather than from taste:

  1. The reason box is optional and says so twice. Section 6 requires that
     withdrawing consent is as easy as giving it, and our own DPDP
     assessment penalises anyone who bundles or conditions consent. A firm
     that publishes that test and then demands an explanation before it will
     delete you has failed it.

  2. No business email restriction. A data principal is a person. Every
     other form on this site rejects gmail addresses; this one must not.

  3. If anything fails, the fallback is the mailbox and the copy says the
     clock starts when they send it. Our form breaking is not their problem.
*/

type Kind = "access" | "correction" | "erasure" | "withdraw" | "nomination" | "grievance";

const KINDS: Array<{ value: Kind; label: string; hint: string }> = [
  { value: "access", label: "Send me a copy of my data", hint: "Everything we hold about you, and where each item came from" },
  { value: "correction", label: "Correct or complete my data", hint: "Something we hold is wrong, out of date or missing" },
  { value: "erasure", label: "Erase my data", hint: "Delete what you hold, except anything we must keep by law" },
  { value: "withdraw", label: "Withdraw my consent", hint: "Stop processing that relies on consent you gave earlier" },
  { value: "nomination", label: "Nominate someone", hint: "Name a person who may exercise these rights for you" },
  { value: "grievance", label: "Raise a grievance", hint: "You are unhappy with how we have handled your data" },
];

export default function DataRequestForm() {
  const [kind, setKind] = useState<Kind | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [context, setContext] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ reference: string; label: string } | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const canSubmit = kind !== null && name.trim().length >= 2 && emailOk && status !== "sending";

  async function submit() {
    if (!canSubmit) return;
    setError("");
    setStatus("sending");
    try {
      const captchaToken = await getRecaptchaToken(siteKey || "", "privacy_request");
      const res = await fetch("/api/privacy-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind, name: name.trim(), email: email.trim(), reason, context, captchaToken }),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) {
        setStatus("error");
        setError(json?.error || "Something went wrong. Email privacy@consult-ds.com and your request still counts from the moment you send it.");
        return;
      }
      setDone({ reference: json.reference, label: json.label });
      setStatus("idle");
    } catch {
      setStatus("error");
      setError("Something went wrong at our end. Email privacy@consult-ds.com with what you would like us to do. Your request counts from the moment you send it.");
    }
  }

  if (done) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Request received</h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          You asked us to: <strong>{done.label}</strong>
        </p>
        <div className="bg-white border border-emerald-200 rounded-xl p-4 mb-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Your reference</div>
          <div className="font-bold text-slate-900 text-lg">{done.reference}</div>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed mb-3">
          We have emailed an acknowledgement to the address you provided, carrying this reference and the
          date by which we will respond.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          If you have not heard from us, reply to that email or write to privacy@consult-ds.com quoting
          the reference.
        </p>
      </div>
    );
  }

  return (
    <>
      {siteKey && <Script src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`} strategy="afterInteractive" />}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">What would you like us to do?</h2>
          <p className="text-sm text-slate-500 mb-4">Choose one. You can make another request at any time.</p>
          <div className="space-y-2">
            {KINDS.map(({ value, label, hint }) => (
              <label
                key={value}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  kind === value ? "bg-indigo-50 border-indigo-300" : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="kind"
                  value={value}
                  checked={kind === value}
                  onChange={() => setKind(value)}
                  className="accent-indigo-600 mt-1 flex-shrink-0"
                />
                <span>
                  <span className="block text-sm font-medium text-slate-900">{label}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{hint}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dsr-name" className="block text-sm font-medium text-slate-700 mb-1">
              Your name
            </label>
            <input
              id="dsr-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="dsr-email" className="block text-sm font-medium text-slate-700 mb-1">
              Your email
            </label>
            <input
              id="dsr-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Where possible, use the address you previously provided to us.
            </p>
          </div>
        </div>

        <div>
          <label htmlFor="dsr-context" className="block text-sm font-medium text-slate-700 mb-1">
            Anything that helps us find your records <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <textarea
            id="dsr-context"
            rows={2}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="A company name, a form you filled in, roughly when"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="dsr-reason" className="block text-sm font-medium text-slate-700 mb-1">
            Why are you asking? <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <textarea
            id="dsr-reason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <p className="text-xs text-slate-500 mt-1">
            Optional. Your request will be actioned whether or not you complete this field.
          </p>
        </div>

        {/* Honeypot. Hidden from people, irresistible to bots. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="dsr-website">Website</label>
          <input id="dsr-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        {status === "error" && error && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-slate-700 leading-relaxed">{error}</p>
          </div>
        )}

        <div>
          <button
            onClick={submit}
            disabled={!canSubmit}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-7 py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : "Send my request"}
          </button>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            {siteKey
              ? "We use your name and email only to locate your records and respond to you. Protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply."
              : "Please email privacy@consult-ds.com instead."}
          </p>
        </div>
      </div>
    </>
  );
}
