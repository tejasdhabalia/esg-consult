import { NextResponse } from "next/server";
import { getCalendarClient, CALENDAR_ID } from "@/lib/google-calendar";
import { generateSlots, filterBusySlots, formatSlotDisplay, formatSlotIST } from "@/lib/booking-slots";

export async function GET(req: Request) {
  try {

	const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const tz = searchParams.get("tz") || "UTC";

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ ok: false, error: "Invalid date." }, { status: 400 });
    }

    const possibleSlots = generateSlots(date);

    if (possibleSlots.length === 0) {
      return NextResponse.json({ ok: true, slots: [] });
    }

    // Query Google Calendar freebusy for that window
    const calendar = getCalendarClient();
    const timeMin = possibleSlots[0].toISOString();
    const lastSlot = possibleSlots[possibleSlots.length - 1];
    const timeMax = new Date(lastSlot.getTime() + 45 * 60 * 1000).toISOString();

    const freebusyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: CALENDAR_ID }],
      },
    });

    const busy = (freebusyRes.data.calendars?.[CALENDAR_ID]?.busy ?? []) as {
      start: string;
      end: string;
    }[];

    const available = filterBusySlots(possibleSlots, busy);

    const slots = available.map((slot) => ({
      utc: slot.toISOString(),
      local: formatSlotDisplay(slot, tz),
      ist: formatSlotIST(slot),
    }));

    return NextResponse.json({ ok: true, slots });
  } catch (err) {
    console.error("Slots error:", err);
    return NextResponse.json({ ok: false, error: "Could not load availability." }, { status: 500 });
  }
}