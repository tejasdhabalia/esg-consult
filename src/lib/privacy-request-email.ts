import nodemailer from "nodemailer";

/**
 * Data principal rights requests under the DPDP Act.
 *
 * Three emails, and the sequence is the compliance evidence:
 *
 *   1. Acknowledgement to the requester, with a reference and the date we
 *      must complete by. This is their proof and ours, and because it goes
 *      to the address given it also verifies that address in one step.
 *   2. Notification to privacy@, which becomes the log entry.
 *   3. Closure, sent by hand when the request is actioned. The template is
 *      here so the wording is the same every time.
 *
 * What is deliberately NOT here: any requirement that the person explain
 * themselves. Section 6 requires that withdrawing consent is as easy as
 * giving it, so the reason field on the form is optional and nothing in
 * this path treats its absence as incomplete.
 *
 * Note also that a rights request is not a lead and is never tracked as
 * one. No generate_lead event fires from this path.
 */

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export const PRIVACY_INBOX = "privacy@consult-ds.com";

/**
 * The Rules set ninety days as the maximum to respond. We publish thirty as
 * our own target, which is a commitment we can keep at current volume and
 * which stops the statutory ceiling becoming the working habit.
 */
export const STATUTORY_MAX_DAYS = 90;
export const TARGET_DAYS = 30;

export type RequestKind = "access" | "correction" | "erasure" | "withdraw" | "nomination" | "grievance";

export const REQUEST_LABELS: Record<RequestKind, string> = {
  access: "Access a copy of my personal data",
  correction: "Correct or complete my personal data",
  erasure: "Erase my personal data",
  withdraw: "Withdraw my consent",
  nomination: "Nominate someone to exercise my rights",
  grievance: "Raise a grievance",
};

export interface PrivacyRequest {
  reference: string;
  kind: RequestKind;
  name: string;
  email: string;
  /** Optional. Never required, never chased. */
  reason?: string;
  /** Optional. Helps us find the records faster, and nothing more. */
  context?: string;
  receivedAt: Date;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function addDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}

/**
 * Reference format: DSR-YYYYMMDD-XXXX.
 *
 * DSR for data subject request, which is the term every vendor and auditor
 * recognises even though the Act says data principal. The date prefix makes
 * the log sortable and makes an overdue request obvious at a glance.
 */
export function makeReference(now: Date): string {
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `DSR-${stamp}-${suffix}`;
}

const SHELL_OPEN = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background-color:#f8fafc;padding:32px 16px;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;margin:0 auto;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:8px;">
    <tr><td style="padding:28px 32px;">`;

const SHELL_CLOSE = `</td></tr>
    <tr><td style="padding:18px 32px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;line-height:1.6;">
      DS Consulting &middot; Strategy to Systems. Delivered.<br>
      <a href="https://www.consult-ds.com/privacy" style="color:#4F46E5;text-decoration:none;">Privacy notice</a> &middot;
      <a href="https://www.consult-ds.com/privacy/request" style="color:#4F46E5;text-decoration:none;">Rights requests</a> &middot;
      ${PRIVACY_INBOX}
    </td></tr>
  </table>
</div>`;

function buildAcknowledgement(req: PrivacyRequest): string {
  const due = formatDate(addDays(req.receivedAt, TARGET_DAYS));
  const ceiling = formatDate(addDays(req.receivedAt, STATUTORY_MAX_DAYS));
  return `${SHELL_OPEN}
      <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#4F46E5;text-transform:uppercase;letter-spacing:0.08em;">Request received</p>
      <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a;">Your request has been received</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
        You asked us to: <strong>${escapeHtml(REQUEST_LABELS[req.kind])}</strong>
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px 20px;margin:0 0 20px;">
        <tr><td style="font-size:13px;color:#64748b;padding:3px 0;">Reference</td><td style="font-size:13px;font-weight:700;color:#0f172a;text-align:right;">${escapeHtml(req.reference)}</td></tr>
        <tr><td style="font-size:13px;color:#64748b;padding:3px 0;">Received</td><td style="font-size:13px;font-weight:700;color:#0f172a;text-align:right;">${formatDate(req.receivedAt)}</td></tr>
        <tr><td style="font-size:13px;color:#64748b;padding:3px 0;">Response due by</td><td style="font-size:13px;font-weight:700;color:#0f172a;text-align:right;">${due}</td></tr>
      </table>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
        We aim to complete within 30 days. The maximum permitted under the DPDP Rules is 90 days, which in
        this case would be ${ceiling}. We will write to you when the request is complete, and sooner if we
        require anything further from you.
      </p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
        Please retain this email as your record of the request.
      </p>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#334155;">
        If you did not make this request, please reply and we will close it.
      </p>
      <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">
        Rights requests and grievances are handled by Tejas Dhabalia, Co-founder, DS Consulting.
      </p>
${SHELL_CLOSE}`;
}

function buildInternalNotice(req: PrivacyRequest): string {
  const due = formatDate(addDays(req.receivedAt, TARGET_DAYS));
  const rows: Array<[string, string]> = [
    ["Reference", escapeHtml(req.reference)],
    ["Request", escapeHtml(REQUEST_LABELS[req.kind])],
    ["Name", escapeHtml(req.name)],
    ["Email", escapeHtml(req.email)],
    ["Received", formatDate(req.receivedAt)],
    ["Target close", due],
    ["Reason given", req.reason ? escapeHtml(req.reason) : "None. Not required and not to be chased."],
    ["Context given", req.context ? escapeHtml(req.context) : "None"],
  ];
  return `<div style="font-family:sans-serif;padding:20px;max-width:640px;">
    <h2 style="margin:0 0 12px;font-size:16px;color:#0f172a;">Data principal rights request</h2>
    <table cellpadding="0" cellspacing="0" style="font-size:14px;color:#0f172a;width:100%;">
      ${rows.map(([l, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#64748b;width:130px;vertical-align:top;">${l}</td><td style="padding:6px 0;font-weight:600;line-height:1.5;">${v}</td></tr>`).join("")}
    </table>
    <p style="margin:16px 0 0;font-size:13px;color:#64748b;line-height:1.6;">
      Places to search: the notify mailbox, Google Calendar, and any engagement records. The website holds
      no database, so there is no application store to clear. Log the outcome against the reference and
      send the closure email when done.
    </p>
  </div>`;
}

/**
 * Closure wording, kept here so every request is closed the same way.
 * Sent by hand once the work is done. Exported so the public process page
 * and any future admin tooling describe the same thing.
 */
export function buildClosureTemplate(reference: string, kind: RequestKind): string {
  const actioned: Record<RequestKind, string> = {
    access: "We have attached a copy of the personal data we hold about you, and listed where each item came from.",
    correction: "We have made the correction you asked for, everywhere the data appears.",
    erasure: "We have erased your personal data from our systems. Where a record must be kept for a statutory reason, we have told you which one and for how long.",
    withdraw: "We have recorded your withdrawal of consent and stopped the processing it covered.",
    nomination: "We have recorded your nomination.",
    grievance: "We have considered your grievance and set out our response.",
  };
  return `Reference ${reference}. ${actioned[kind]} If you are not satisfied with how we handled this, you can complain to the Data Protection Board of India.`;
}

export async function sendPrivacyRequestEmails(req: PrivacyRequest): Promise<void> {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  const notify = process.env.SMTP_PRIVACY ?? process.env.SMTP_NOTIFY ?? process.env.SMTP_USER;

  // The acknowledgement goes first. If the internal notice fails we still
  // want the requester holding proof, and a failed internal send is
  // recoverable from the server log.
  await transporter.sendMail({
    from,
    to: req.email,
    replyTo: PRIVACY_INBOX,
    subject: `Your request to DS Consulting, reference ${req.reference}`,
    html: buildAcknowledgement(req),
  });

  await transporter.sendMail({
    from,
    to: notify,
    replyTo: req.email,
    subject: `Rights request ${req.reference}: ${REQUEST_LABELS[req.kind]}`,
    html: buildInternalNotice(req),
  });
}
