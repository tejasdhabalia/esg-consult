"use client";

import { useState, useCallback } from "react";
import { AVAILABLE_DAYS, MAX_DAYS_AHEAD } from "@/lib/booking-config";
import { trackGenerateLead } from "@/lib/analytics";

interface Props {
  firstName: string;
  surname: string;
  email: string;
}

interface Slot {
  utc: string;
  local: string;
  ist: string;
}

type Step = "date" | "time" | "confirm" | "success";

function getAvailableDates() {
  const results: { dateStr: string; display: string; dayName: string }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; results.length < MAX_DAYS_AHEAD; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (!AVAILABLE_DAYS.includes(d.getDay())) continue;
    const dateStr = d.toISOString().slice(0, 10);
    const display = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(d);
    const dayName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(d);
    results.push({ dateStr, display, dayName });
    if (i > MAX_DAYS_AHEAD + 30) break; // safety exit
  }
  return results;
}

export default function BookingWidget({ firstName, surname, email }: Props) {
  const [step, setStep] = useState<Step>("date");
  const [visitorTz] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [availableDates] = useState(getAvailableDates);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateLabel, setSelectedDateLabel] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmedDisplay, setConfirmedDisplay] = useState("");

  const tzAbbr = (() => {
    try {
      return (
        new Intl.DateTimeFormat("en", { timeZoneName: "short", timeZone: visitorTz })
          .formatToParts(new Date())
          .find((p) => p.type === "timeZoneName")?.value ?? visitorTz
      );
    } catch {
      return visitorTz;
    }
  })();

  const fetchSlots = useCallback(
    async (dateStr: string) => {
      setSlotsLoading(true);
      setSlotsError("");
      setSlots([]);
      try {
        const res = await fetch(
          `/api/booking/slots?date=${dateStr}&tz=${encodeURIComponent(visitorTz)}`
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
    [visitorTz]
  );

  function selectDate(dateStr: string, display: string, dayName: string) {
    setSelectedDate(dateStr);
    setSelectedDateLabel(`${dayName}, ${display}`);
    setSelectedSlot(null);
    fetchSlots(dateStr);
    setStep("time");
  }

  function selectSlot(slot: Slot) {
    setSelectedSlot(slot);
    setStep("confirm");
  }

  async function confirmBooking() {
    if (!selectedSlot) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName,
          surname,
          email,
          slotUtc: selectedSlot.utc,
          visitorTz,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setConfirmedDisplay(data.localDisplay);
      setStep("success");
      trackGenerateLead("booking_widget");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const stepIndex = { date: 0, time: 1, confirm: 2, success: 3 }[step];

  return (
    <div className="mt-6 border-t pt-6">
      <div className="font-semibold text-slate-900">Book a consultation</div>
      <p className="mt-1 text-sm text-slate-500">
        45 minutes · Mon to Fri · Times shown in {tzAbbr}
      </p>

      {/* Step indicator */}
      {step !== "success" && (
        <div className="flex items-center gap-3 mt-5 mb-7">
          {["Select date", "Select time", "Confirm"].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              {i > 0 && <div className="w-5 h-px bg-slate-200" />}
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

      {/* DATE STEP */}
      {step === "date" && (
        <div>
          <div className="text-sm font-medium text-slate-700 mb-3">Choose a date</div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-72 overflow-y-auto pr-1">
            {availableDates.map(({ dateStr, display, dayName }) => (
              <button
                key={dateStr}
                onClick={() => selectDate(dateStr, display, dayName)}
                className="flex flex-col items-center border rounded-xl py-3 px-2 hover:border-indigo-400 hover:bg-indigo-50 transition cursor-pointer"
              >
                <span className="text-xs text-slate-400 font-medium">{dayName}</span>
                <span className="text-sm font-semibold text-slate-900 mt-1">{display}</span>
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
            className="text-sm text-indigo-600 mb-4 flex items-center gap-1 hover:text-indigo-800"
          >
            ← {selectedDateLabel}
          </button>
          <div className="text-sm font-medium text-slate-700 mb-3">Choose a time</div>
          {slotsLoading && (
            <p className="text-sm text-slate-500 py-6 text-center">Loading availability...</p>
          )}
          {slotsError && <p className="text-sm text-red-600 py-4">{slotsError}</p>}
          {!slotsLoading && !slotsError && slots.length === 0 && (
            <p className="text-sm text-slate-500 py-4">
              No availability on this date. Please choose another day.
            </p>
          )}
          {!slotsLoading && slots.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.utc}
                  onClick={() => selectSlot(slot)}
                  className="border rounded-xl py-3 px-3 text-center hover:border-indigo-400 hover:bg-indigo-50 transition cursor-pointer"
                >
                  <div className="text-sm font-semibold text-slate-900">{slot.local}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{slot.ist}</div>
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
            className="text-sm text-indigo-600 mb-5 hover:text-indigo-800"
          >
            ← Change time
          </button>
          <div className="bg-slate-50 border rounded-2xl p-6 mb-5">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
              Booking summary
            </div>
            <div className="grid gap-3 text-sm">
              {[
                ["Name", `${firstName} ${surname}`],
                ["Email", email],
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
          </div>
          <p className="text-xs text-slate-500 mb-5">
            A Google Meet link and calendar invitation will be sent to {email}.
          </p>
          {submitError && <p className="text-sm text-red-600 mb-4">{submitError}</p>}
          <button
            onClick={confirmBooking}
            disabled={submitting}
            className={`w-full py-3 rounded-lg font-medium text-white transition ${
              submitting
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {submitting ? "Confirming..." : "Confirm booking"}
          </button>
        </div>
      )}

      {/* SUCCESS STEP */}
      {step === "success" && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-emerald-600 text-xl font-bold">✓</span>
          </div>
          <div className="text-xl font-semibold text-slate-900 mb-2">Booking confirmed</div>
          <p className="text-sm text-slate-600 mb-1">
            {firstName}, your consultation is booked for {confirmedDisplay}.
          </p>
          <p className="text-sm text-slate-500">
            A calendar invitation and Google Meet link have been sent to {email}.
          </p>
        </div>
      )}
    </div>
  );
}