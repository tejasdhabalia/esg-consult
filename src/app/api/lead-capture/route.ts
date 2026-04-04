import { NextResponse } from "next/server";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";
import { sendReportEmail } from "@/lib/lead-email";

// ─── Supported form types and their expected reCAPTCHA actions ────────────────

type FormType =
  | "newsletter_subscribe"
  | "checklist_download"
  | "audit_report"
  | "maturity_report"
  | "attribution_report"
  | "ai_readiness_report";

const FORM_ACTIONS: Record<FormType, string> = {
  newsletter_subscribe:  "newsletter_subscribe",
  checklist_download:    "checklist_download",
  audit_report:          "audit_report_submit",
  maturity_report:       "maturity_report_submit",
  attribution_report:    "attribution_report_submit",
  ai_readiness_report:   "ai_readiness_report",
};

// Form types that trigger a report email with a PDF attachment
const REPORT_FORM_TYPES = new Set<FormType>([
  "audit_report",
  "maturity_report",
  "attribution_report",
  "ai_readiness_report",
]);

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

    // Honeypot check
    if (website) {
      return NextResponse.json({ ok: false, error: "Submission blocked." }, { status: 400 });
    }

    // Validate form type
    if (!formType || !(formType in FORM_ACTIONS)) {
      return NextResponse.json({ ok: false, error: "Unsupported form type." }, { status: 400 });
    }

    // Email required for all types
    if (!email) {
      return NextResponse.json({ ok: false, error: "Work email is required." }, { status: 400 });
    }

    // Name required for checklist downloads only
    if (formType === "checklist_download" && !name) {
      return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
    }

    // Validate business email
    const emailValidation = validateBusinessEmail(email);
    if (!emailValidation.ok) {
      return NextResponse.json({ ok: false, error: emailValidation.message }, { status: 400 });
    }

    // Validate reCAPTCHA action matches expected value
    const expectedAction = FORM_ACTIONS[formType];
    if (captchaAction !== expectedAction) {
      return NextResponse.json({ ok: false, error: "Invalid reCAPTCHA action." }, { status: 400 });
    }

    // Verify reCAPTCHA token
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

    // Send report email with PDF attachment for applicable form types
    if (REPORT_FORM_TYPES.has(formType)) {
      try {
        await sendReportEmail({
          formType,
          email: emailValidation.normalizedEmail,
        });
      } catch (emailErr) {
        // Log but do not fail the request — the lead is captured even if email delivery fails
        console.error("Report email failed:", emailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
