import { NextResponse } from "next/server";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";
import { sendReportEmail, sendInsightResourceEmail } from "@/lib/lead-email";
import { insightResources, type InsightResourceKey } from "@/lib/insight-resources";

type FormType =
  | "newsletter_subscribe"
  | "checklist_download"
  | "audit_report"
  | "maturity_report"
  | "attribution_report"
  | "ai_readiness_report"
  | "insight_resource_download";

const FORM_ACTIONS: Record<FormType, string> = {
  newsletter_subscribe: "newsletter_subscribe",
  checklist_download: "checklist_download",
  audit_report: "audit_report_submit",
  maturity_report: "maturity_report_submit",
  attribution_report: "attribution_report_submit",
  ai_readiness_report: "ai_readiness_report",
  insight_resource_download: "insight_resource_download",
};

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
    const resourceKey = String(body?.resourceKey || "").trim() as InsightResourceKey;
    const captchaToken = String(body?.captchaToken || "");
    const captchaAction = String(body?.captchaAction || "");
    const website = String(body?.website || "").trim();

    if (website) {
      return NextResponse.json({ ok: false, error: "Submission blocked." }, { status: 400 });
    }

    if (!formType || !(formType in FORM_ACTIONS)) {
      return NextResponse.json({ ok: false, error: "Unsupported form type." }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ ok: false, error: "Work email is required." }, { status: 400 });
    }

    if ((formType === "checklist_download" || formType === "insight_resource_download") && !name) {
      return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
    }

    if (formType === "insight_resource_download" && !insightResources[resourceKey]) {
      return NextResponse.json({ ok: false, error: "Unsupported resource type." }, { status: 400 });
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
      resourceKey,
      score: recaptcha.score,
    });

    if (REPORT_FORM_TYPES.has(formType)) {
      try {
        await sendReportEmail({
          formType,
          email: emailValidation.normalizedEmail,
        });
      } catch (emailErr) {
        console.error("sendReportEmail failed:", emailErr);
      }
    }

    if (formType === "insight_resource_download") {
      try {
        await sendInsightResourceEmail({
          resourceKey,
          email: emailValidation.normalizedEmail,
        });
      } catch (emailErr) {
        console.error("sendInsightResourceEmail failed:", emailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ ok: false, error: "Submission failed." }, { status: 500 });
  }
}
