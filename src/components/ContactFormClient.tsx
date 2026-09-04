"use client";

import Script from "next/script";
import { useMemo, useState, useCallback } from "react";
import { site } from "@/lib/site";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import { AVAILABLE_DAYS, MAX_DAYS_AHEAD } from "@/lib/booking-config";
import { getAttribution } from "@/lib/attribution";
import { trackGenerateLead } from "@/lib/analytics";

type Step = "details" | "date" | "time" | "confirm" | "success";

interface Slot {
  utc: string;
  local: string;
  ist: string;
}

/**
 * Build a YYYY-MM-DD string from the local calendar date.
 *
 * Not toISOString().slice(0, 10). That converts to UTC first, so anywhere east
 * of Greenwich, including India, local midnight is the previous day in UTC and
 * the button labelled Friday quietly asks the API for Thursday's availability.
 * The visitor then sees a short list or an empty one and assumes we are busy.
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
  let i = 1;
  while (results.length < MAX_DAYS_AHEAD) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (AVAILABLE_DAYS.includes(d.getDay())) {
      const dateStr = toLocalDateStr(d);
      const display = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(d);
      const dayName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(d);
      results.push({ dateStr, display, dayName });
    }
    i++;
    if (i > MAX_DAYS_AHEAD + 60) break;
  }
  return results;
}

const STEPS: Step[] = ["details", "date", "time", "confirm"];
const STEP_LABELS = ["Your details", "Select date", "Select time", "Confirm"];

export default function ContactFormClient() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const action = "contact_submit";
  const BOOKING_ACTION = "booking_submit";

  const [step, setStep] = useState<Step>("details");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    email: "",
    company: "",
    interest: "Not sure yet",
    message: "",
    website: "",
    hearAboutUs: "",
    hearAboutUsOther: "",
  });

  const [availableDates] = useState(getAvailableDates);
  const [visitorTz] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  const tzAbbr = useMemo(() => {
    try {
      return (
        new Intl.DateTimeFormat("en", { timeZoneName: "short", timeZone: visitorTz })
          .formatToParts(new Date())
          .find((p) => p.type === "timeZoneName")?.value ?? visitorTz
      );
    } catch { return visitorTz; }
  }, [visitorTz]);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateLabel, setSelectedDateLabel] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const emailValidation = useMemo(() => validateBusinessEmail(form.email), [form.email]);
  const emailError = form.email && !emailValidation.ok ? emailValidation.message : "";

  const detailsComplete = useMemo(() => {
    if (!form.firstName || !form.surname || !form.email || !form.message) return false;
    if (!form.hearAboutUs) return false;
    if (form.hearAboutUs === "Other" && !form.hearAboutUsOther.trim()) return false;
    if (!emailValidation.ok) return false;
    if (!siteKey) return false;
    return true;
  }, [
    form.firstName,
    form.surname,
    form.email,
    form.message,
    form.hearAboutUs,
    form.hearAboutUsOther,
    emailValidation.ok,
    siteKey,
  ]);

  const fetchSlots = useCallback(async (dateStr: string) => {
    setSlotsLoading(true);
    setSlotsError("");
    setSlots([]);
    try {
      const res = await fetch(`/api/booking/slots?date=${dateStr}&tz=${encodeURIComponent(visitorTz)}`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setSlots(data.slots);
    } catch {
      setSlotsError("Could not load availability. Please choose another date.");
    } finally {
      setSlotsLoading(false);
    }
  }, [visitorTz]);

  function selectDate(dateStr: string, display: string, dayName: string) {
    setSelectedDate(dateStr);
    setSelectedDateLabel(`${dayName}, ${display}`);
    setSelectedSlot(null);
    fetchSlots(dateStr);
    setStep("time");
  }

  function goBackToDate() {
    setSelectedSlot(null);
    setSlots([]);
    setSlotsError("");
    setStep("date");
  }

  async function handleConfirm() {
    setSubmitting(true);
    setSubmitError("");

    try {
      // Each endpoint verifies its own token. A reCAPTCHA v3 token can only
      // be checked with Google once, so sharing one across two parallel
      // requests would fail whichever arrived second.
      const [captchaToken, bookingCaptchaToken] = await Promise.all([
        getRecaptchaToken(siteKey || "", action),
        getRecaptchaToken(siteKey || "", BOOKING_ACTION),
      ]);

      // Captured on the FIRST page of this session, not here.
      const { landing_page, referrer } = getAttribution();

      // Fire both APIs in parallel
      const [contactRes, bookingRes] = await Promise.all([
        fetch("/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            ...form,
            name: `${form.firstName} ${form.surname}`,
            email: emailValidation.normalizedEmail,
            captchaToken,
            captchaAction: action,
            hear_about_us: form.hearAboutUs,
            hear_about_us_other: form.hearAboutUsOther,
            landing_page,
            referrer,
          }),
        }),
        fetch("/api/booking/create", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            firstName: form.firstName,
            surname: form.surname,
            email: emailValidation.normalizedEmail,
            slotUtc: selectedSlot?.utc,
            visitorTz,
            company: form.company,
            interest: form.interest,
            message: form.message,
            hearAboutUs:
              form.hearAboutUs === "Other"
                ? `Other: ${form.hearAboutUsOther}`
                : form.hearAboutUs,
            landingPage: landing_page,
            referrer,
            captchaToken: bookingCaptchaToken,
            captchaAction: BOOKING_ACTION,
            website: form.website,
          }),
        }),
      ]);

      const contactData = await contactRes.json();
      const bookingData = await bookingRes.json();

      if (!contactRes.ok || !contactData?.ok) {
        throw new Error(contactData?.error || "Submission failed. Please try again.");
      }
      if (!bookingRes.ok || !bookingData?.ok) {
        throw new Error(bookingData?.error || "Booking failed. Please try again.");
      }

      // GA4 conversion event. See src/lib/analytics.ts for why this is
      // explicit rather than measured automatically.
      trackGenerateLead("contact_booking", {
        interest: form.interest,
        hear_about_us: form.hearAboutUs,
      });

      setStep("success");
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const stepIndex = STEPS.indexOf(step);

  return (
    <div>
      {siteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      ) : null}

      {/* Step indicator */}
      {step !== "success" && (
        <div className="flex items-center gap-2 mb-6">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              {i > 0 && <div className="w-4 h-px bg-slate-200" />}
              <span className={`text-xs font-medium ${
                i === stepIndex ? "text-indigo-700"
                : i < stepIndex ? "text-emerald-600"
                : "text-slate-400"
              }`}>
                {i < stepIndex ? "✓ " : ""}{label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* No reCAPTCHA warning */}
      {!siteKey && step === "details" ? (
        <div className="mb-4 bg-white border rounded-xl p-4 text-sm text-slate-700">
          reCAPTCHA is not configured. You can still email{" "}
          <a className="underline" href={`mailto:${site.emails.general}`}>{site.emails.general}</a>.
        </div>
      ) : null}

      {/* STEP 1: DETAILS */}
      {step === "details" && (
        <div>
          <div className="font-semibold text-slate-900 mb-1">Your details</div>
          <p className="text-sm text-slate-500 mb-5">Fields marked * are required.</p>

          <div className="space-y-4">
            {/* Honeypot */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off"
              value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="hidden" aria-hidden="true" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="c-firstname" className="text-sm font-medium text-slate-700">First name*</label>
                <input id="c-firstname" type="text" autoComplete="given-name"
                  value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  placeholder="First name"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label htmlFor="c-surname" className="text-sm font-medium text-slate-700">Surname*</label>
                <input id="c-surname" type="text" autoComplete="family-name"
                  value={form.surname} onChange={(e) => setForm({ ...form, surname: e.target.value })}
                  placeholder="Surname"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div>
              <label htmlFor="c-email" className="text-sm font-medium text-slate-700">Work email*</label>
              <input id="c-email" type="email" autoComplete="email"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@company.com"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              {emailError ? <p className="mt-2 text-sm text-red-600">{emailError}</p> : null}
            </div>

            <div>
              <label htmlFor="c-company" className="text-sm font-medium text-slate-700">Company</label>
              <input id="c-company" type="text" autoComplete="organization"
                value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Company name"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <label htmlFor="c-interest" className="text-sm font-medium text-slate-700">What do you need help with?*</label>
              <select id="c-interest" value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Not sure yet</option>
                <option>Commerce and digital platforms</option>
                <option>ERP systems</option>
                <option>CRM and revenue operations</option>
                <option>Integration</option>
                <option>AI governance and adoption</option>
                <option>ESG and CSRD reporting</option>
                <option>Finance and accounting outsourcing</option>
                <option>Partnership</option>
              </select>
            </div>

            <div>
              <label htmlFor="c-hear" className="text-sm font-medium text-slate-700">
                How did you hear about us?*
              </label>
              <select
                id="c-hear"
                value={form.hearAboutUs}
                onChange={(e) => setForm({ ...form, hearAboutUs: e.target.value })}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Please choose</option>
                <option>Google or another search engine</option>
                <option>LinkedIn</option>
                <option>Referral or word of mouth</option>
                <option>Event, podcast or webinar</option>
                <option>Other</option>
              </select>

              {form.hearAboutUs === "Other" ? (
                <input
                  type="text"
                  value={form.hearAboutUsOther}
                  onChange={(e) => setForm({ ...form, hearAboutUsOther: e.target.value })}
                  placeholder="Where did you hear about us?"
                  className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : null}
            </div>

            <div>
              <label htmlFor="c-message" className="text-sm font-medium text-slate-700">Message*</label>
              <textarea id="c-message" autoComplete="off"
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us what is happening, timeline and what is not working today."
                className="mt-2 w-full min-h-[100px] rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <button onClick={() => setStep("date")} disabled={!detailsComplete}
              className={`w-full py-3 rounded-lg font-medium transition ${
                detailsComplete ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }`}>
              Next: choose a time →
            </button>

            <p className="text-xs text-slate-400 text-center">
              This site is protected by reCAPTCHA. Google Privacy Policy and Terms of Service apply.
            </p>
          </div>
        </div>
      )}

      {/* STEP 2: DATE */}
      {step === "date" && (
        <div>
          <button onClick={() => setStep("details")} className="text-sm text-indigo-600 hover:text-indigo-800 mb-4">
            ← Back to your details
          </button>
          <div className="font-semibold text-slate-900 mb-1">Choose a date</div>
          <p className="text-sm text-slate-500 mb-5">45 minutes · Mon to Fri · Times shown in {tzAbbr}</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-72 overflow-y-auto pr-1">
            {availableDates.map(({ dateStr, display, dayName }) => (
              <button key={dateStr} onClick={() => selectDate(dateStr, display, dayName)}
                className="flex flex-col items-center border rounded-xl py-3 px-2 hover:border-indigo-400 hover:bg-indigo-50 transition cursor-pointer">
                <span className="text-xs text-slate-400 font-medium">{dayName}</span>
                <span className="text-sm font-semibold text-slate-900 mt-1">{display}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: TIME */}
      {step === "time" && (
        <div>
          <button onClick={goBackToDate} className="text-sm text-indigo-600 hover:text-indigo-800 mb-4">
            ← {selectedDateLabel}
          </button>
          <div className="font-semibold text-slate-900 mb-1">Choose a time</div>
          <p className="text-sm text-slate-500 mb-5">All times in {tzAbbr}</p>

          {slotsLoading && (
            <p className="text-sm text-slate-500 py-8 text-center">Loading availability...</p>
          )}
          {slotsError && (
            <div>
              <p className="text-sm text-red-600 py-4">{slotsError}</p>
              <button onClick={goBackToDate} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                ← Choose a different date
              </button>
            </div>
          )}
          {!slotsLoading && !slotsError && slots.length === 0 && (
            <div>
              <p className="text-sm text-slate-500 py-4">No availability on this date.</p>
              <button onClick={goBackToDate} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                ← Choose a different date
              </button>
            </div>
          )}
          {!slotsLoading && slots.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {slots.map((slot) => (
                <button key={slot.utc} onClick={() => { setSelectedSlot(slot); setStep("confirm"); }}
                  className="border rounded-xl py-3 px-3 text-center hover:border-indigo-400 hover:bg-indigo-50 transition cursor-pointer">
                  <div className="text-sm font-semibold text-slate-900">{slot.local}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{slot.ist}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STEP 4: CONFIRM */}
      {step === "confirm" && selectedSlot && (
        <div>
          <button onClick={() => setStep("time")} className="text-sm text-indigo-600 hover:text-indigo-800 mb-5">
            ← Change time
          </button>
          <div className="font-semibold text-slate-900 mb-4">Review and confirm</div>

          <div className="bg-slate-50 border rounded-2xl p-6 mb-5 space-y-3 text-sm">
            {[
              ["Name", `${form.firstName} ${form.surname}`],
              ["Email", form.email],
              ["Company", form.company || "—"],
              ["Topic", form.interest],
              ["Date", selectedDateLabel],
              [`Time (${tzAbbr})`, selectedSlot.local],
              ["Time (IST)", selectedSlot.ist],
              ["Duration", "45 minutes"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-slate-500 shrink-0">{label}</span>
                <span className="font-medium text-slate-900 text-right">{value}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 mb-5">
            A Google Meet link and calendar invitation will be sent to {form.email}. Your message will also be received by our team.
          </p>

          {submitError && (
            <p className="text-sm text-red-600 mb-4">{submitError}</p>
          )}

          <button onClick={handleConfirm} disabled={submitting}
            className={`w-full py-3 rounded-lg font-medium text-white transition ${
              submitting ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}>
            {submitting ? "Confirming..." : "Confirm and book"}
          </button>
        </div>
      )}

      {/* STEP 5: SUCCESS */}
      {step === "success" && (
        <div className="text-center py-10">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-emerald-600 text-2xl font-bold">✓</span>
          </div>
          <div className="text-xl font-semibold text-slate-900 mb-2">
            You are confirmed, {form.firstName}.
          </div>
          <p className="text-sm text-slate-600 mb-1">
            Your consultation is booked for {selectedSlot?.local} ({tzAbbr}) on {selectedDateLabel}.
          </p>
          <p className="text-sm text-slate-500">
            A calendar invitation and Google Meet link have been sent to {form.email}.
          </p>
        </div>
      )}
    </div>
  );
}