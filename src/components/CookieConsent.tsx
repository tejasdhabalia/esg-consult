"use client";

import { useCallback, useEffect, useState } from "react";

type ConsentState = {
  decided: boolean;
  analytics: boolean;
};

const STORAGE_KEY = "ds_consent_v1";

/**
 * Pushes the current choice to Google Consent Mode.
 *
 * Note this is the UPDATE call, which happens after the page has hydrated.
 * The DEFAULT call happens much earlier, in the inline script in layout.tsx,
 * and that script also restores a saved choice. Without that, every returning
 * visitor's first page view would be recorded as denied before this ran.
 */
function applyConsent(analyticsGranted: boolean) {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  if (!w.dataLayer) w.dataLayer = [];
  if (!w.gtag) {
    w.gtag = function (...args: unknown[]) {
      w.dataLayer!.push(args);
    };
  }

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

  const openPreferences = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: ConsentState = JSON.parse(raw);
        setAnalytics(!!saved.analytics);
      }
    } catch {
      // Fall through and show the banner with defaults.
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        // Never asked. Show the banner.
        setOpen(true);
      } else {
        const saved: ConsentState = JSON.parse(raw);
        setAnalytics(!!saved.analytics);

        // Re-assert the saved choice. The inline script in layout.tsx has
        // already set it as the default, so this is belt and braces rather
        // than the primary mechanism.
        applyConsent(!!saved.analytics);

        // Already decided, so stay hidden.
        setOpen(!saved.decided);
      }
    } catch {
      setOpen(true);
    }

    // Expose a way to reopen the banner, so the choice can be changed later.
    // OpenCookiePreferencesButton calls this. Required: withdrawing consent
    // has to be as easy as giving it.
    const w = window as unknown as { DS_OPEN_COOKIE_PREFS?: () => void };
    w.DS_OPEN_COOKIE_PREFS = openPreferences;

    return () => {
      delete w.DS_OPEN_COOKIE_PREFS;
    };
  }, [openPreferences]);

  function save(decided: boolean, analyticsGranted: boolean) {
    const payload: ConsentState = { decided, analytics: analyticsGranted };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Private mode. The choice applies to this session only.
    }
    applyConsent(analyticsGranted);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50"
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
        <div className="text-lg font-semibold text-slate-900">Cookie preferences</div>
        <p className="mt-2 text-sm text-slate-600">
          We use necessary cookies to run the site. With your permission, we also use analytics to
          understand what works and improve the experience.
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
            onClick={() => save(true, false)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-lg font-medium"
          >
            Reject analytics
          </button>

          <button
            onClick={() => save(true, analytics)}
            className="border border-slate-300 px-5 py-3 rounded-lg font-medium"
          >
            Save preferences
          </button>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          You can change this at any time on our{" "}
          <a href="/cookies" className="underline">
            cookies page
          </a>
          .
        </div>
      </div>
    </div>
  );
}
