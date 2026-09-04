export const BOOKING_TZ = "Asia/Kolkata";

export const SLOT_DURATION_MINS = 45;
export const BUFFER_MINS = 15;
export const SLOT_SPACING_MINS = SLOT_DURATION_MINS + BUFFER_MINS; // 60

// Available windows as [startMinsFromMidnightIST, endMinsFromMidnightIST]
export const AVAILABLE_WINDOWS: [number, number][] = [
  [0, 240],     // 00:00 - 04:00 IST
  [660, 1020],  // 11:00 - 17:00 IST
  [1140, 1440], // 19:00 - 24:00 IST
];

export const AVAILABLE_DAYS = [1, 2, 3, 4, 5]; // Mon-Fri (0=Sun, 6=Sat)
export const MIN_ADVANCE_HOURS = 4;
export const MAX_DAYS_AHEAD = 45;

/**
 * Meeting lengths a booking link is allowed to request.
 *
 * The direct booking page at /meet takes its duration from the URL, which
 * means the value arrives from outside and cannot be trusted. Anything not
 * on this list falls back to the standard 45 minutes rather than erroring,
 * so a mistyped link still produces a usable booking instead of a dead page.
 *
 * Adding a value here is all that is needed to allow a new length. Both API
 * routes and the booking page read from this one list.
 */
export const ALLOWED_DURATIONS = [15, 30, 45, 60, 90] as const;

export function resolveDuration(value: unknown): number {
  const mins = Number(value);
  return (ALLOWED_DURATIONS as readonly number[]).includes(mins)
    ? mins
    : SLOT_DURATION_MINS;
}

/**
 * Gap left after a meeting before the next slot can start. Applies to every
 * duration, so a 30 minute meeting still leaves 15 minutes behind it.
 */
export function spacingFor(durationMins: number): number {
  return durationMins + BUFFER_MINS;
}

export const MAX_SUBJECT_LENGTH = 80;

/**
 * The subject arrives in a URL and ends up in a calendar invitation and an
 * email, so it is stripped of anything that could break either. Newlines out,
 * angle brackets out, length capped.
 */
export function sanitiseSubject(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\r\n\t<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_SUBJECT_LENGTH);
}

/**
 * Where the link was sent from, for the internal notification only. Free text
 * so a new channel needs no code change, but cleaned and capped the same way.
 */
export function sanitiseSource(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[^a-zA-Z0-9 _-]/g, "")
    .trim()
    .slice(0, 40);
}
