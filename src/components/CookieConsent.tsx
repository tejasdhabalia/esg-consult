"use client";

import { useEffect, useState } from "react";

type ConsentState = {
  decided: boolean;
  analytics: boolean;
};

const STORAGE_KEY = "ds_consent_v1";

function applyConsent(analyticsGranted: boolean) {
  if (typeof window === "undefined") return;

  // gtag is defined by our consent-default Script in layout
  const w = window as any;
  if (!w.dataLayer) w.dataLayer = [];
  w.gtag = w.gtag || function () { w.dataLayer.push(arguments); };

  w.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: analyticsGranted ? "granted" : "denied",
  });
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setOpen(true);
        return;
      }
      const saved: ConsentState = JSON.parse(raw);
      setAnalytics(!!saved.analytics);
      applyConsent(!!saved.analytics);
      setOpen(!saved.decided);
    } catch {
      setOpen(true);
    }
  }, []);

  function save(decided: boolean, analyticsGranted: boolean) {
    const payload: ConsentState = { decided, analytics: analyticsGranted };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    applyConsent(analyticsGranted);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="text-lg font-semibold text-slate-900">Cookie preferences</div>
        <p className="mt-2 text-sm text-slate-600">
          We use necessary cookies to run the site. With your permission, we also use analytics to understand
          what works and improve the experience.
        </p>

        <div className="mt-5 grid gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-slate-900">Necessary</div>
                <div className="mt-1 text-sm text-slate-600">
                  Keeps the site secure and functional. Always on.
                </div>
              </div>
              <div className="text-xs font-semibold text-slate-500">On</div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-slate-900">Analytics</div>
                <div className="mt-1 text-sm text-slate-600">
                  Helps us understand usage in aggregate so we can improve pages and navigation.
                </div>
              </div>

              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-4 w-4"
                />
                Allow
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => save(true, true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-lg font-medium"
          >
            Accept all
          </button>

          <button
            onClick={() => save(true, analytics)}
            className="border border-slate-300 px-5 py-3 rounded-lg font-medium"
          >
            Save preferences
          </button>

          <button
            onClick={() => save(true, false)}
            className="border border-slate-300 px-5 py-3 rounded-lg font-medium"
          >
            Reject analytics
          </button>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          You can update this choice anytime by clearing site data in your browser.
        </div>
      </div>
    </div>
  );
}