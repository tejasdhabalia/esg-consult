import { NextResponse } from "next/server";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";
import { sendEnquiryNotification } from "@/lib/booking-email";

/**
 * Contact form submissions.
 *
 * Sends an internal notification email for EVERY submission, independently of
 * the booking endpoint. The two are called in parallel by the form and either
 * can fail on its own, so each has to be able to capture the enquiry alone.
 * Before August 2026 this route only wrote to the server log, which meant a
 * failed booking silently discarded the enquiry.
 *
 * Email failure never fails the request. The visitor has done nothing wrong
 * and their booking is unaffected, so a broken mail server is logged loudly
 * and swallowed rather than shown to them as a submission error.
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name = "",
      email = "",
      company = "",
      interest = "",
      message = "",
      captchaToken = "",
      captchaAction = "",
      website = "",
      // Attribution. Added August 2026.
      hear_about_us = "",
      hear_about_us_other = "",
      landing_page = "",
      referrer = "",
    } = body || {};

    if (website) {
      return NextResponse.json({ ok: false, error: "Submission blocked." }, { status: 400 });
    }

    if (!email || !message) {
      return NextResponse.json({ ok: false, error: "Email and message are required." }, { status: 400 });
    }

    const emailValidation = validateBusinessEmail(email);
    if (!emailValidation.ok) {
      return NextResponse.json({ ok: false, error: emailValidation.message }, { status: 400 });
    }

    const expectedAction = "contact_submit";
    if (captchaAction !== expectedAction) {
      return NextResponse.json({ ok: false, error: "Invalid reCAPTCHA action." }, { status: 400 });
    }

    const recaptcha = await verifyRecaptchaToken({ token: captchaToken, expectedAction });
    if (!recaptcha.ok) {
      return NextResponse.json({ ok: false, error: recaptcha.error }, { status: 400 });
    }

    try {
      await sendEnquiryNotification({
        name,
        email: emailValidation.normalizedEmail ?? email,
        company,
        interest,
        message,
        hearAboutUs:
          hear_about_us === "Other" && hear_about_us_other
            ? `Other: ${hear_about_us_other}`
            : hear_about_us,
        landingPage: landing_page,
        referrer,
      });
    } catch (err) {
      // Log everything, because this is now the only copy of the enquiry.
      console.error("ENQUIRY EMAIL FAILED. Full submission follows:", {
        name,
        email: emailValidation.normalizedEmail,
        company,
        interest,
        message,
        hearAboutUs: hear_about_us,
        hearAboutUsOther: hear_about_us_other,
        landingPage: landing_page,
        referrer,
        error: err,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
