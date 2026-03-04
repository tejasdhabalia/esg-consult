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
      captchaAction = "",
    } = body || {};

    if (!email || !message) {
      return NextResponse.json({ ok: false, error: "Email and message are required." }, { status: 400 });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ ok: false, error: "reCAPTCHA is not configured on the server." }, { status: 500 });
    }

    if (!captchaToken) {
      return NextResponse.json({ ok: false, error: "reCAPTCHA token missing." }, { status: 400 });
    }

    const expectedAction = "contact_submit";
    if (captchaAction !== expectedAction) {
      return NextResponse.json({ ok: false, error: "Invalid reCAPTCHA action." }, { status: 400 });
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

    const verifyData: any = await verifyRes.json();

    if (!verifyData?.success) {
      return NextResponse.json({ ok: false, error: "reCAPTCHA verification failed." }, { status: 400 });
    }

    // reCAPTCHA v3 adds score and action
    const score = typeof verifyData.score === "number" ? verifyData.score : 0;
    const action = verifyData.action || "";

    if (action !== expectedAction) {
      return NextResponse.json({ ok: false, error: "reCAPTCHA action mismatch." }, { status: 400 });
    }

    // Tune threshold as you prefer. 0.5 is a common starting point.
    const threshold = 0.5;
    if (score < threshold) {
      return NextResponse.json({ ok: false, error: "Submission blocked as suspicious." }, { status: 403 });
    }

    // Accepted. Later: send email, push to CRM, store in DB, etc.
    console.log("Contact submission accepted:", { name, email, company, interest, message, score });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}