"use client";

import { useState, useCallback, useMemo } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import {
  AVAILABLE_DAYS,
  MAX_DAYS_AHEAD,
  resolveDuration,
  sanitiseSubject,
} from "@/lib/booking-config";
import { trackGenerateLead } from "@/lib/analytics";

/**
 * Booking page for people who already know who we are.
 *
 * Reached only from a link sent by hand over WhatsApp, LinkedIn or after
 * meeting somebody. Not in navigation, not in the sitemap, noindex.
 *
 * Everything the contact form asks a stranger (company, topic, message, how
 * they heard about us) is already known before the link is sent, so this page
 * asks for three things and nothing else. The meeting length and the subject
 * travel in the URL, set by us:
 *
 *   /meet?mins=30&subject=Scoping%20call&src=whatsapp
 *   /meet?mins=90&subject=ERP%20selection%20review&src=linkedin&name=Ravi%20Sharma
 *
 * mins     one of the allowed durations, anything else falls back to 45
 * subject  becomes the calendar event title, cleaned and capped at 80 chars
 * src      where the link was sent, internal notification only
 * name     optional prefill, still editable by the person booking
 * email    optional prefill, still editable by the person booking
 */

type Step = "details" | "date" | "time" | "confirm" | "success";

interface Slot {
  utc: string;
  local: string;
  ist: string;
}

const BASIC_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const BOOKING_ACTION = "booking_submit";

/**
 * Build a YYYY-MM-DD string from the local calendar date.
 *
 * Not toISOString().slice(0, 10). That converts to UTC first, so for anybody
 * east of Greenwich, midnight local is the previous day in UTC and the button
 * labelled Friday quietly requests Thursday's availability.
 */
function toLocalDateStr(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getAvailableDates() {
  const results: { dateStr: string; display: string; dayName: string }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Starts at today, not tomorrow. Somebody who just left a meeting may want a
  // slot this afternoon, and the four hour minimum notice still protects the
  // diary. If nothing is left today the time step says so.
  for (let i = 0; results.length < MAX_DAYS_AHEAD && i <= MAX_DAYS_AHEAD + 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (!AVAILABLE_DAYS.includes(d.getDay())) continue;
    results.push({
      dateStr: toLocalDateStr(d),
      display: new Intl.DateTimeFormat("en-GB", { month: "short", day: "numeric" }).format(d),
      dayName: new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(d),
    });
  }
  return results;
}

export default function DirectBookingClient() {
  const searchParams = useSearchParams();
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const durationMins = resolveDuration(searchParams.get("mins"));
  const subject = sanitiseSubject(searchParams.get("subject"));
  const source = searchParams.get("src") ?? "";

  const prefillName = (searchParams.get("name") ?? "").trim();
  const [prefillFirst = "", ...prefillRest] = prefillName.split(/\s+/);

  const [step, setStep] = useState<Step>("details");
  const [visitorTz] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [availableDates] = useState(getAvailableDates);

  const [firstName, setFirstName] = useState(prefillFirst);
  const [surname, setSurname] = useState(prefillRest.join(" "));
  const [email, setEmail] = useState((searchParams.get("email") ?? "").trim());

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateLabel, setSelectedDateLabel] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  // Honeypot. Never shown, never focusable, never filled by a person.
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmedDisplay, setConfirmedDisplay] = useState("");

  const tzAbbr = useMemo(() => {
    try {
      return (
        new Intl.DateTimeFormat("en", { timeZoneName: "short", timeZone: visitorTz })
          .formatToParts(new Date())
          .find((p) => p.type === "timeZoneName")?.value ?? visitorTz
      );
    } catch {
      return visitorTz;
    }
  }, [visitorTz]);

  const detailsValid =
    firstName.trim().length > 0 &&
    surname.trim().length > 0 &&
    BASIC_EMAIL_RE.test(email.trim());

  const fetchSlots = useCallback(
    async (dateStr: string) => {
      setSlotsLoading(true);
      setSlotsError("");
      setSlots([]);
      try {
        const res = await fetch(
          `/api/booking/slots?date=${dateStr}&tz=${encodeURIComponent(visitorTz)}&mins=${durationMins}`
        );
        const data = await res.json();
        if (!data.ok) throw new Error(data.error);
        setSlots(data.slots);
      } catch {
        setSlotsError("Could not load availability. Please try another date.");
      } finally {
        setSlotsLoading(false);
      }
    },
    [visitorTz, durationMins]
  );

  function selectDate(dateStr: string, display: string, dayName: string) {
    setSelectedDate(dateStr);
    setSelectedDateLabel(`${dayName}, ${display}`);
    setSelectedSlot(null);
    fetchSlots(dateStr);
    setStep("time");
  }

  async function confirmBooking() {
    if (!selectedSlot) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      // The endpoint verifies this the same way the contact form is verified.
      // If the key is missing locally the server decides what to do, rather
      // than this failing before the request is even made.
      let captchaToken = "";
      try {
        if (siteKey) captchaToken = await getRecaptchaToken(siteKey, BOOKING_ACTION);
      } catch {
        captchaToken = "";
      }

      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mode: "direct",
          firstName: firstName.trim(),
          surname: surname.trim(),
          email: email.trim(),
          slotUtc: selectedSlot.utc,
          visitorTz,
          mins: durationMins,
          subject,
          source,
          captchaToken,
          captchaAction: BOOKING_ACTION,
          website,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setConfirmedDisplay(data.localDisplay);
      setStep("success");
      trackGenerateLead("direct_booking");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const stepIndex = { details: 0, date: 1, time: 2, confirm: 3, success: 4 }[step];
  const stepLabels = ["Your details", "Select date", "Select time", "Confirm"];

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      {siteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      ) : null}

      <h1 className="text-2xl font-semibold text-slate-900">
        {subject || "Book a time"}
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        {durationMins} minutes · Monday to Friday · Times shown in {tzAbbr}
      </p>

      <div className="mt-8 rounded-2xl border bg-white p-6 sm:p-8">
        {step !== "success" && (
          <div className="mb-7 flex flex-wrap items-center gap-3">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                {i > 0 && <div className="h-px w-5 bg-slate-200" />}
                <span
                  className={`text-xs font-medium ${
                    i === stepIndex
                      ? "text-indigo-700"
                      : i < stepIndex
                      ? "text-emerald-600"
                      : "text-slate-400"
                  }`}
                >
                  {i < stepIndex ? "✓ " : ""}
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* DETAILS STEP */}
        {step === "details" && (
          <div>
            <p className="mb-5 text-sm text-slate-600">
              Three things and you are done. The calendar invitation goes to this address.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="db-first" className="mb-1 block text-sm font-medium text-slate-700">
                  First name
                </label>
                <input
                  id="db-first"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400"
                />
              </div>
              <div>
                <label htmlFor="db-last" className="mb-1 block text-sm font-medium text-slate-700">
                  Surname
                </label>
                <input
                  id="db-last"
                  type="text"
                  autoComplete="family-name"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="db-email" className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="db-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-400"
                />
              </div>
            </div>
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="db-website">Website</label>
              <input
                id="db-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <button
              onClick={() => setStep("date")}
              disabled={!detailsValid}
              className={`mt-6 w-full rounded-lg py-3 font-medium text-white transition ${
                detailsValid
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "cursor-not-allowed bg-slate-300"
              }`}
            >
              Choose a date
            </button>
          </div>
        )}

        {/* DATE STEP */}
        {step === "date" && (
          <div>
            <button
              onClick={() => setStep("details")}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-800"
            >
              ← Your details
            </button>
            <div className="mb-3 text-sm font-medium text-slate-700">Choose a date</div>
            <div className="grid max-h-72 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
              {availableDates.map(({ dateStr, display, dayName }) => (
                <button
                  key={dateStr}
                  onClick={() => selectDate(dateStr, display, dayName)}
                  className={`flex cursor-pointer flex-col items-center rounded-xl border px-2 py-3 transition hover:border-indigo-400 hover:bg-indigo-50 ${
                    selectedDate === dateStr ? "border-indigo-400 bg-indigo-50" : ""
                  }`}
                >
                  <span className="text-xs font-medium text-slate-400">{dayName}</span>
                  <span className="mt-1 text-sm font-semibold text-slate-900">{display}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TIME STEP */}
        {step === "time" && (
          <div>
            <button
              onClick={() => setStep("date")}
              className="mb-4 flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
            >
              ← {selectedDateLabel}
            </button>
            <div className="mb-3 text-sm font-medium text-slate-700">Choose a time</div>
            {slotsLoading && (
              <p className="py-6 text-center text-sm text-slate-500">Loading availability...</p>
            )}
            {slotsError && <p className="py-4 text-sm text-red-600">{slotsError}</p>}
            {!slotsLoading && !slotsError && slots.length === 0 && (
              <p className="py-4 text-sm text-slate-500">
                Nothing free on this date. Please choose another day.
              </p>
            )}
            {!slotsLoading && slots.length > 0 && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {slots.map((slot) => (
                  <button
                    key={slot.utc}
                    onClick={() => {
                      setSelectedSlot(slot);
                      setStep("confirm");
                    }}
                    className="cursor-pointer rounded-xl border px-3 py-3 text-center transition hover:border-indigo-400 hover:bg-indigo-50"
                  >
                    <div className="text-sm font-semibold text-slate-900">{slot.local}</div>
                    <div className="mt-0.5 text-xs text-slate-400">{slot.ist}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONFIRM STEP */}
        {step === "confirm" && selectedSlot && (
          <div>
            <button
              onClick={() => setStep("time")}
              className="mb-5 text-sm text-indigo-600 hover:text-indigo-800"
            >
              ← Change time
            </button>
            <div className="mb-5 rounded-2xl border bg-slate-50 p-6">
              <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Booking summary
              </div>
              <div className="grid gap-3 text-sm">
                {[
                  ...(subject ? [["Subject", subject] as const] : []),
                  ["Name", `${firstName.trim()} ${surname.trim()}`] as const,
                  ["Email", email.trim()] as const,
                  ["Date", selectedDateLabel] as const,
                  [`Time (${tzAbbr})`, selectedSlot.local] as const,
                  ["Time (IST)", selectedSlot.ist] as const,
                  ["Duration", `${durationMins} minutes`] as const,
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="shrink-0 text-slate-500">{label}</span>
                    <span className="text-right font-medium text-slate-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mb-5 text-xs text-slate-500">
              A Google Meet link and calendar invitation will be sent to {email.trim()}.
            </p>
            {submitError && <p className="mb-4 text-sm text-red-600">{submitError}</p>}
            <button
              onClick={confirmBooking}
              disabled={submitting}
              className={`w-full rounded-lg py-3 font-medium text-white transition ${
                submitting ? "cursor-not-allowed bg-slate-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {submitting ? "Confirming..." : "Confirm booking"}
            </button>
          </div>
        )}

        {/* SUCCESS STEP */}
        {step === "success" && (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <span className="text-xl font-bold text-emerald-600">✓</span>
            </div>
            <div className="mb-2 text-xl font-semibold text-slate-900">Booking confirmed</div>
            <p className="mb-1 text-sm text-slate-600">
              {firstName.trim()}, we are booked for {confirmedDisplay}.
            </p>
            <p className="text-sm text-slate-500">
              A calendar invitation and Google Meet link have been sent to {email.trim()}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
