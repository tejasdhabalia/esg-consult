"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "ds_cookie_consent_v1";
const COOKIE_NAME = "ds_cookie_consent_v1";

function setCookie(name: string, value: string, days = 180) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax`;
}

function getStoredConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Consent;
  } catch {
    return null;
  }
}

function storeConsent(consent: Consent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  setCookie(COOKIE_NAME, JSON.stringify(consent));
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      setOpen(true);
      return;
    }
    setAnalytics(!!existing.analytics);
    setMarketing(!!existing.marketing);
  }, []);

  function acceptAll() {
    const consent: Consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      updatedAt: new Date().toISOString(),
    };
    storeConsent(consent);
    setAnalytics(true);
    setMarketing(true);
    setOpen(false);
    setShowPrefs(false);
  }

  function rejectNonEssential() {
    const consent: Consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      updatedAt: new Date().toISOString(),
    };
    storeConsent(consent);
    setAnalytics(false);
    setMarketing(false);
    setOpen(false);
    setShowPrefs(false);
  }

  function savePreferences() {
    const consent: Consent = {
      necessary: true,
      analytics,
      marketing,
      updatedAt: new Date().toISOString(),
    };
    storeConsent(consent);
    setOpen(false);
    setShowPrefs(false);
  }

  useEffect(() => {
    (window as any).DS_OPEN_COOKIE_PREFS = () => {
      setOpen(true);
      setShowPrefs(true);
    };
    return () => {
      delete (window as any).DS_OPEN_COOKIE_PREFS;
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pb-4">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-lg p-5">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold text-slate-900">
                We use cookies
              </div>
              <p className="mt-2 text-sm text-slate-600">
                We use cookies to make the site work smoothly. With your permission, we may also use
                analytics cookies to learn what’s working (and what isn’t), and marketing cookies to
                understand what brought you here and share information that’s more relevant.
                You’re in control - choose what you’re comfortable with.
              </p>

              <div className="mt-2 text-xs text-slate-500">
                Read our{" "}
                <Link className="underline" href="/cookies">
                  Cookies Policy
                </Link>{" "}
                and{" "}
                <Link className="underline" href="/privacy">
                  Privacy Policy
                </Link>
                .
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <button
                onClick={() => setShowPrefs((v) => !v)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium hover:bg-slate-50"
              >
                {showPrefs ? "Hide preferences" : "Manage preferences"}
              </button>
              <button
                onClick={rejectNonEssential}
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium hover:bg-slate-50"
              >
                Reject non-essential
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
              >
                Accept all
              </button>
            </div>
          </div>

          {showPrefs && (
            <div className="mt-5 border-t border-slate-200 pt-4">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                {/* Necessary */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="font-semibold text-slate-900">Necessary</div>
                  <p className="mt-1 text-slate-600 text-xs">
                    These help the website run properly - like keeping things secure and loading pages correctly.
                    They’re always on.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    Always enabled
                  </div>
                </div>

                {/* Analytics */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="font-semibold text-slate-900">Analytics</div>
                  <p className="mt-1 text-slate-600 text-xs">
                    These help us understand how people use the site - so we can improve what’s useful and fix what’s not.
                    You can switch this off anytime.
                  </p>
                  <label className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-600">Allow analytics</span>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="h-4 w-4"
                    />
                  </label>
                </div>

                {/* Marketing */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="font-semibold text-slate-900">Marketing</div>
                  <p className="mt-1 text-slate-600 text-xs">
                    These help us understand what brought you here and share information that’s more relevant.
                    You can switch this off anytime.
                  </p>
                  <label className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-600">Allow marketing</span>
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="h-4 w-4"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
                <button
                  onClick={() => {
                    setShowPrefs(false);
                    setOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={savePreferences}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                >
                  Save preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}