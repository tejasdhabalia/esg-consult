import {
  SLOT_DURATION_MINS,
  spacingFor,
  AVAILABLE_WINDOWS,
  MIN_ADVANCE_HOURS,
  BOOKING_TZ,
} from "./booking-config";

// Convert an IST date string (YYYY-MM-DD) to UTC ms of midnight IST
function istMidnightMs(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  // IST = UTC+5:30, so IST midnight = UTC midnight - 330 minutes
  return Date.UTC(y, m - 1, d, 0, 0, 0) - 330 * 60 * 1000;
}

/**
 * All possible slot start times for a given IST date.
 *
 * durationMins defaults to the standard consultation length so the contact
 * page flow is unaffected. The direct booking link at /meet passes its own
 * length, which changes both how much room a slot needs inside a window and
 * how far apart consecutive slots sit.
 */
export function generateSlots(
  dateStr: string,
  durationMins: number = SLOT_DURATION_MINS
): Date[] {
  const midnight = istMidnightMs(dateStr);
  const minStart = Date.now() + MIN_ADVANCE_HOURS * 60 * 60 * 1000;
  const spacing = spacingFor(durationMins);
  const slots: Date[] = [];

  for (const [winStart, winEnd] of AVAILABLE_WINDOWS) {
    let cursor = winStart;
    while (cursor + durationMins <= winEnd) {
      const slotMs = midnight + cursor * 60 * 1000;
      if (slotMs >= minStart) {
        slots.push(new Date(slotMs));
      }
      cursor += spacing;
    }
  }
  return slots;
}

// Remove slots that overlap with any busy period from Google Calendar
export function filterBusySlots(
  slots: Date[],
  busyPeriods: { start: string; end: string }[],
  durationMins: number = SLOT_DURATION_MINS
): Date[] {
  const durationMs = durationMins * 60 * 1000;
  return slots.filter((slot) => {
    const slotStart = slot.getTime();
    const slotEnd = slotStart + durationMs;
    return !busyPeriods.some(({ start, end }) => {
      const busyStart = new Date(start).getTime();
      const busyEnd = new Date(end).getTime();
      return slotStart < busyEnd && slotEnd > busyStart;
    });
  });
}

// Format a Date for display in a given timezone
export function formatSlotDisplay(date: Date, tz: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: tz,
  }).format(date);
}

// Format a Date for display in IST
export function formatSlotIST(date: Date): string {
  return (
    new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: BOOKING_TZ,
    }).format(date) + " IST"
  );
}
