import { NextResponse } from "next/server";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";

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

    console.log("Contact submission accepted:", {
      name,
      email: emailValidation.normalizedEmail,
      company,
      interest,
      message,
      score: recaptcha.score,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}