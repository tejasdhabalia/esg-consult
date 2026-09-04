import { NextResponse } from "next/server";
import { getCalendarClient, CALENDAR_ID } from "@/lib/google-calendar";
import { formatSlotDisplay, formatSlotIST } from "@/lib/booking-slots";
import { sendBookingConfirmation } from "@/lib/booking-email";
import { validateBusinessEmail, normalizeEmail } from "@/lib/businessEmail";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";
import { resolveDuration, sanitiseSubject, sanitiseSource } from "@/lib/booking-config";

const BASIC_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName = "",
      surname = "",
      email = "",
      slotUtc = "",
      visitorTz = "UTC",
      // Enquiry detail and attribution, forwarded to the internal
      // notification email only. Never shown to the visitor.
      company = "",
      interest = "",
      message = "",
      hearAboutUs = "",
      landingPage = "",
      referrer = "",
      // Direct booking fields. "site" is the contact page flow and behaves
      // exactly as before. "direct" is the unlisted /meet link, where the
      // meeting length and subject are set by us when the link is sent.
      mode = "site",
      mins,
      subject = "",
      source = "",
      // Spam controls. This endpoint writes to a real calendar and emails a
      // real person, so it is verified the same way the contact form is.
      captchaToken = "",
      captchaAction = "",
      website = "",
    } = body || {};

    // Honeypot. A real person never fills a field they cannot see.
    if (website) {
      return NextResponse.json({ ok: false, error: "Submission blocked." }, { status: 400 });
    }

    /**
     * reCAPTCHA, added September 2026.
     *
     * Until then this route was the only lead path on the site with no
     * verification at all, so anything that found the URL could create
     * calendar events and send invitations to arbitrary addresses.
     *
     * Skipped when no secret is configured, matching how the mail helpers
     * behave without SMTP. That is a server-side condition, so it cannot be
     * triggered by a request, and it keeps local development working for
     * anyone without the keys.
     */
    const expectedAction = "booking_submit";
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (captchaAction !== expectedAction) {
        return NextResponse.json(
          { ok: false, error: "Invalid reCAPTCHA action." },
          { status: 400 }
        );
      }
      const recaptcha = await verifyRecaptchaToken({ token: captchaToken, expectedAction });
      if (!recaptcha.ok) {
        return NextResponse.json({ ok: false, error: recaptcha.error }, { status: 400 });
      }
    } else {
      console.warn("RECAPTCHA_SECRET_KEY not set. Booking accepted without verification.");
    }

    const isDirect = mode === "direct";
    const durationMins = resolveDuration(mins);
    const cleanSubject = sanitiseSubject(subject);
    const cleanSource = sanitiseSource(source);

    if (!firstName || !surname || !email || !slotUtc) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    // The work email rule exists to qualify strangers arriving from search.
    // Somebody sent a direct link has already been qualified in person, on
    // WhatsApp or on LinkedIn, and a founder using a personal address is
    // common, so the direct flow checks the address is valid and stops there.
    let resolvedEmail: string;
    if (isDirect) {
      resolvedEmail = normalizeEmail(email);
      if (!BASIC_EMAIL_RE.test(resolvedEmail)) {
        return NextResponse.json(
          { ok: false, error: "Enter a valid email address." },
          { status: 400 }
        );
      }
    } else {
      const emailValidation = validateBusinessEmail(email);
      if (!emailValidation.ok) {
        return NextResponse.json({ ok: false, error: emailValidation.message }, { status: 400 });
      }
      resolvedEmail = emailValidation.normalizedEmail ?? email;
    }

    const slotStart = new Date(slotUtc);
    if (isNaN(slotStart.getTime())) {
      return NextResponse.json({ ok: false, error: "Invalid slot time." }, { status: 400 });
    }

    const slotEnd = new Date(slotStart.getTime() + durationMins * 60 * 1000);

    const localStart = formatSlotDisplay(slotStart, visitorTz);
    const localEnd = formatSlotDisplay(slotEnd, visitorTz);
    const localDisplay = `${localStart} - ${localEnd}`;
    const istDisplay = `${formatSlotIST(slotStart)} - ${formatSlotIST(slotEnd)}`;

    const attendeeName = `${firstName} ${surname}`;

    const summary = isDirect
      ? `DS Consulting: ${cleanSubject || "Call"} with ${attendeeName}`
      : `DS Consulting: Consultation with ${attendeeName}`;

    // The website agenda is written for somebody who arrived cold and needs
    // to know what the session is. A direct invitation goes to somebody we
    // have already spoken to, so it carries the detail and nothing else.
    const description = isDirect
      ? [
          cleanSubject ? `Subject: ${cleanSubject}` : "DS Consulting call",
          ``,
          `${durationMins} minutes.`,
          ``,
          `---`,
          `Name: ${attendeeName}`,
          `Email: ${resolvedEmail}`,
          cleanSource ? `Arranged via: ${cleanSource}` : ``,
          `Booked via direct link`,
        ]
          .filter(Boolean)
          .join("\n")
      : `DS Consulting: Strategy & Systems Consultation\n\nThis is a ${durationMins}-minute working session, not a sales call.\n\nAgenda:\n1. Your current challenge and where execution is breaking down\n2. What a scoped engagement looks like for your situation\n3. Honest view on where to start and what is realistic\n\nCome prepared with a rough sense of your priority, whether that is a regulatory deadline, a CRM or reporting system that is not delivering, or an AI adoption initiative that needs governance.\n\n---\nVisitor: ${attendeeName}\nEmail: ${resolvedEmail}\nBooked via consult-ds.com`;

    const calendar = getCalendarClient();

    await calendar.events.insert({
      calendarId: CALENDAR_ID,
      sendUpdates: "all",
      conferenceDataVersion: 1,
      requestBody: {
        summary,
        description,
        start: { dateTime: slotStart.toISOString(), timeZone: "UTC" },
        end: { dateTime: slotEnd.toISOString(), timeZone: "UTC" },
        attendees: [
          {
            email: resolvedEmail,
            displayName: attendeeName,
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

    // The calendar event now exists and Google has already emailed the invite.
    // If our own confirmation mail fails, that is not a failed booking, so it
    // must not throw. Telling the visitor it failed would make them rebook and
    // create a duplicate event.
    try {
      await sendBookingConfirmation({
        firstName,
        surname,
        email: resolvedEmail,
        localDisplay,
        istDisplay,
        visitorTz,
        company,
        interest,
        message,
        hearAboutUs,
        landingPage,
        referrer,
        durationMins,
        subject: cleanSubject,
        source: cleanSource,
        isDirect,
      });
    } catch (err) {
      console.error("Booking confirmation email failed, booking itself is fine:", err);
    }

    return NextResponse.json({ ok: true, localDisplay, istDisplay, durationMins });
  } catch (err) {
    console.error("Booking create error:", err);
    return NextResponse.json(
      { ok: false, error: "Booking failed. Please try again." },
      { status: 500 }
    );
  }
}
