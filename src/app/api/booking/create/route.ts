import { NextResponse } from "next/server";
import { getCalendarClient, CALENDAR_ID } from "@/lib/google-calendar";
import { formatSlotDisplay, formatSlotIST } from "@/lib/booking-slots";
import { sendBookingConfirmation } from "@/lib/booking-email";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { SLOT_DURATION_MINS } from "@/lib/booking-config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName = "",
      surname = "",
      email = "",
      slotUtc = "",
      visitorTz = "UTC",
    } = body || {};

    if (!firstName || !surname || !email || !slotUtc) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const emailValidation = validateBusinessEmail(email);
    if (!emailValidation.ok) {
      return NextResponse.json({ ok: false, error: emailValidation.message }, { status: 400 });
    }

    const slotStart = new Date(slotUtc);
    if (isNaN(slotStart.getTime())) {
      return NextResponse.json({ ok: false, error: "Invalid slot time." }, { status: 400 });
    }

    const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION_MINS * 60 * 1000);

    const localStart = formatSlotDisplay(slotStart, visitorTz);
    const localEnd = formatSlotDisplay(slotEnd, visitorTz);
    const localDisplay = `${localStart} - ${localEnd}`;
    const istDisplay = `${formatSlotIST(slotStart)} - ${formatSlotIST(slotEnd)}`;

    const calendar = getCalendarClient();

    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      sendUpdates: "all",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `DS Consulting: Consultation with ${firstName} ${surname}`,
        description: `DS Consulting: Strategy & Systems Consultation\n\nThis is a 45-minute working session, not a sales call.\n\nAgenda:\n1. Your current challenge and where execution is breaking down\n2. What a scoped engagement looks like for your situation\n3. Honest view on where to start and what is realistic\n\nCome prepared with a rough sense of your priority, whether that is a regulatory deadline, a CRM or reporting system that is not delivering, or an AI adoption initiative that needs governance.\n\n---\nVisitor: ${firstName} ${surname}\nEmail: ${email}\nBooked via consult-ds.com`,
        start: { dateTime: slotStart.toISOString(), timeZone: "UTC" },
        end: { dateTime: slotEnd.toISOString(), timeZone: "UTC" },
        attendees: [
          {
            email: emailValidation.normalizedEmail ?? email,
            displayName: `${firstName} ${surname}`,
          },
        ],
        conferenceData: {
          createRequest: {
            requestId: `ds-booking-${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 30 },
          ],
        },
      },
    });

    await sendBookingConfirmation({
      firstName,
      surname,
      email: emailValidation.normalizedEmail ?? email,
      localDisplay,
      istDisplay,
      visitorTz,
    });

    return NextResponse.json({ ok: true, localDisplay, istDisplay });
  } catch (err) {
    console.error("Booking create error:", err);
    return NextResponse.json(
      { ok: false, error: "Booking failed. Please try again." },
      { status: 500 }
    );
  }
}