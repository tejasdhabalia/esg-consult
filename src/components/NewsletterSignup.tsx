"use client";
import { useState } from "react";

export default function NewsletterSignup({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire up to your email provider (Mailchimp, ConvertKit, etc.)
    setSubmitted(true);
  }

  return (
    <div className={`bg-indigo-950 rounded-2xl p-8 ${className}`}>
      <h3 className="text-white font-semibold text-lg">
        Regulatory Radar &amp; Revenue Intelligence
      </h3>
      <p className="mt-2 text-indigo-200 text-sm">
        Monthly briefing for ESG and revenue leaders. Regulatory updates, governance
        frameworks, and practical guides delivered straight to your inbox.
      </p>

      {submitted ? (
        <div className="mt-5 bg-indigo-800/60 rounded-lg px-5 py-4 text-indigo-100 text-sm font-medium">
          You are on the list. First issue coming soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-900 text-white placeholder-indigo-400 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors"
          >
            Subscribe free
          </button>
        </form>
      )}
      <p className="mt-3 text-xs text-indigo-400">No spam. Unsubscribe any time.</p>
    </div>
  );
}
