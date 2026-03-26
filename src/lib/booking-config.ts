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