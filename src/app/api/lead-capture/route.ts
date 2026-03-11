import { NextResponse } from "next/server";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";

type FormType = "newsletter_subscribe" | "checklist_download" | "audit_report";

const FORM_ACTIONS: Record<FormType, string> = {
  newsletter_subscribe: "newsletter_subscribe",
  checklist_download: "checklist_download",
  audit_report: "audit_report_submit",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const formType = (body?.formType || "") as FormType;
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "");
    const checklistType = String(body?.checklistType || "").trim();
    const captchaToken = String(body?.captchaToken || "");
    const captchaAction = String(body?.captchaAction || "");
    const website = String(body?.website || "").trim();

    if (!formType || !(formType in FORM_ACTIONS)) {
      return NextResponse.json({ ok: false, error: "Unsupported form type." }, { status: 400 });
    }

    if (website) {
      return NextResponse.json({ ok: false, error: "Submission blocked." }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ ok: false, error: "Work email is required." }, { status: 400 });
    }

    if (formType === "checklist_download" && !name) {
      return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
    }

    const emailValidation = validateBusinessEmail(email);
    if (!emailValidation.ok) {
      return NextResponse.json({ ok: false, error: emailValidation.message }, { status: 400 });
    }

    const expectedAction = FORM_ACTIONS[formType];
    if (captchaAction !== expectedAction) {
      return NextResponse.json({ ok: false, error: "Invalid reCAPTCHA action." }, { status: 400 });
    }

    const recaptcha = await verifyRecaptchaToken({ token: captchaToken, expectedAction });
    if (!recaptcha.ok) {
      return NextResponse.json({ ok: false, error: recaptcha.error }, { status: 400 });
    }

    console.log("Lead capture accepted:", {
      formType,
      name,
      email: emailValidation.normalizedEmail,
      checklistType,
      score: recaptcha.score,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}