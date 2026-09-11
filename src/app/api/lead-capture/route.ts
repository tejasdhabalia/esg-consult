import { NextResponse } from "next/server";
import { validateBusinessEmail } from "@/lib/businessEmail";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";
import { sendReportEmail, sendInsightResourceEmail, type AssessmentResult } from "@/lib/lead-email";
import { insightResources, type InsightResourceKey } from "@/lib/insight-resources";

type FormType =
  | "newsletter_subscribe"
  | "checklist_download"
  | "audit_report"
  | "maturity_report"
  | "attribution_report"
  | "ai_readiness_report"
  | "dpdp_exposure_report"
  | "insight_resource_download";

const FORM_ACTIONS: Record<FormType, string> = {
  newsletter_subscribe: "newsletter_subscribe",
  checklist_download: "checklist_download",
  audit_report: "audit_report_submit",
  maturity_report: "maturity_report_submit",
  attribution_report: "attribution_report_submit",
  ai_readiness_report: "ai_readiness_report",
  dpdp_exposure_report: "dpdp_exposure_report",
  insight_resource_download: "insight_resource_download",
};

const REPORT_FORM_TYPES = new Set<FormType>([
  "audit_report",
  "maturity_report",
  "attribution_report",
  "ai_readiness_report",
  "dpdp_exposure_report",
]);

/*
  Assessment results arrive from the browser, so they are shaped and clamped
  here before they reach the email builder. Nothing is trusted: a score is
  forced into 0-100, arrays are capped, strings are capped, and anything
  malformed produces undefined rather than an error. A bad payload should
  cost the person their score block, not their report.

  This deliberately does not HTML-escape. Escaping happens once, at the point
  each string is rendered into the email, so a value cannot be escaped twice
  and arrive as &amp;amp;.
*/
const MAX_TEXT = 400;

function clean(value: unknown, max = MAX_TEXT): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function parseAssessment(raw: unknown): AssessmentResult | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const r = raw as Record<string, unknown>;

  const overall = Number(r.overall);
  const band = clean(r.band, 60);
  if (!Number.isFinite(overall) || !band) return undefined;

  const categories = Array.isArray(r.categories)
    ? r.categories
        .slice(0, 10)
        .map((c) => {
          const item = c as Record<string, unknown>;
          return {
            name: clean(item?.name, 60),
            points: Math.max(0, Math.min(999, Math.round(Number(item?.points) || 0))),
            max: Math.max(0, Math.min(999, Math.round(Number(item?.max) || 0))),
          };
        })
        .filter((c) => c.name !== "")
    : [];

  const gaps = Array.isArray(r.gaps)
    ? r.gaps.slice(0, 5).map((g) => clean(g)).filter(Boolean)
    : [];

  const flags = Array.isArray(r.flags)
    ? r.flags.slice(0, 3).map((f) => clean(f, 700)).filter(Boolean)
    : [];

  return {
    overall: Math.max(0, Math.min(100, Math.round(overall))),
    band,
    categories,
    gaps,
    flags,
  };
}

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
    const assessment = parseAssessment(body?.assessment);

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
      assessmentScore: assessment ? `${assessment.overall}/100 ${assessment.band}` : undefined,
    });

    if (REPORT_FORM_TYPES.has(formType)) {
      try {
        await sendReportEmail({
          formType,
          email: emailValidation.normalizedEmail,
          result: assessment,
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
