/**
 * GA4 conversion tracking for form submissions.
 *
 * Every form on the site is a React component that posts with fetch and
 * never navigates, so it fires no native submit and produces no thank-you
 * page URL. Neither GA4 enhanced measurement nor a destination URL goal
 * will see any of it. The event has to be sent explicitly.
 *
 * Until August 2026 only the contact form did this, so seven other lead
 * forms were converting invisibly. This helper exists so the next form
 * added to the site has one obvious thing to call rather than an eight-line
 * block to copy and get subtly wrong.
 *
 * Safe under denied consent: with Consent Mode v2 defaults, gtag still
 * sends a cookieless ping, so the count stays correct even when the
 * visitor declined analytics.
 *
 * `generate_lead` is marked as a key event in GA4 Admin. Renaming it here
 * would silently stop conversions being counted, so do not.
 */

/**
 * Identifies which form converted, used to segment in GA4.
 *
 * Add a new value here rather than passing a loose string, so the reports
 * do not fill up with near-duplicate names like "contact" and "contact_form".
 */
export type LeadFormName =
  | "contact_booking"
  | "booking_widget"
  | "direct_booking"
  | "insight_resource"
  | "checklist_download"
  | "newsletter_signup"
  | "ai_readiness_tool"
  | "marketing_automation_maturity"
  | "revenue_attribution_readiness"
  | "leaky_funnel_audit";

/**
 * Event parameters registered as custom dimensions in GA4 Admin.
 *
 * GA4 matches custom dimensions on the exact parameter name. A dimension
 * registered as `resource_key` will report (not set) for every event if the
 * code sends `resource`. Renaming a parameter here without renaming the
 * dimension breaks reporting silently, with no error anywhere.
 *
 * Registered, both event-scoped:
 *   form_name     which form converted. Sent on every event.
 *   resource_key  which asset was requested. Sent by the resource and
 *                 checklist download forms only.
 *
 * Custom dimensions are not retroactive, so a new one only populates from
 * the day it is created in GA4.
 */
export function trackGenerateLead(
  formName: LeadFormName,
  params: Record<string, string | undefined> = {},
): void {
  try {
    if (typeof window === "undefined") return;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };

    // Drop undefined values so GA4 does not receive empty parameters.
    const clean: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
      if (value) clean[key] = value;
    }

    w.gtag?.("event", "generate_lead", { form_name: formName, ...clean });
  } catch {
    // Analytics must never break a completed submission.
  }
}
