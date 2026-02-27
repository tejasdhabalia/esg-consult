import { NextResponse } from "next/server";

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
    } = body || {};

    if (!email || !message) {
      return NextResponse.json({ ok: false, error: "Email and message are required." }, { status: 400 });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { ok: false, error: "reCAPTCHA is not configured on the server." },
        { status: 500 }
      );
    }

    if (!captchaToken) {
      return NextResponse.json({ ok: false, error: "reCAPTCHA token missing." }, { status: 400 });
    }

    // Verify token with Google
    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", captchaToken);

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const verifyData = await verifyRes.json();

    if (!verifyData?.success) {
      return NextResponse.json(
        { ok: false, error: "reCAPTCHA verification failed." },
        { status: 400 }
      );
    }

    // At this point captcha is valid.
    // For now we simply accept and return ok.
    // Later you can: push to CRM, send email via provider, store in DB, etc.
    console.log("Contact submission:", { name, email, company, interest, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}