import nodemailer from "nodemailer";
import path from "path";
import { insightResources } from "@/lib/insight-resources";

/**
 * MIME type for an email attachment, derived from the filename.
 *
 * Lead magnets were all PDFs until the AI use case register, which is a
 * workbook. The content type used to be hardcoded to application/pdf, which
 * would mislabel a spreadsheet and can stop some mail clients opening it.
 *
 * Deriving it from the extension means adding a new format is a matter of
 * dropping the file in public/downloads, not editing the send path.
 */
const CONTENT_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  csv: "text/csv",
  zip: "application/zip",
};

function contentTypeFor(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}

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

interface ReportConfig {
  subject: string;
  headline: string;
  description: string;
  fileName: string;
  attachmentName: string;
  accentHex: string;
  notifySubject: string;
  /**
   * How the document reaches the recipient.
   *
   * "attachment" is the original behaviour and stays the default, so the
   * four assessments that predate this field are untouched.
   *
   * "link" sends a download URL in the body instead. Used where the email
   * already carries the personalised result and the PDF is the reference
   * companion rather than the thing being delivered. A link also survives
   * the attachment filters on corporate mail gateways, which an 800KB PDF
   * from an unknown sender does not always do.
   */
  deliverAs?: "attachment" | "link";
  /**
   * The "other tools" footer. Defaults to the four marketing assessments,
   * which is what every report sent before September 2026 carried. Set it
   * where those would be irrelevant: a DPDP lead has no use for a funnel
   * audit, and four wrong links at the foot of a good email is a small,
   * avoidable way to look automated.
   */
  relatedLinks?: Array<{ label: string; href: string; desc: string }>;
}

/**
 * A scored assessment result, sent from the browser and rendered into both
 * the recipient's email and the internal notification.
 *
 * This arrives from outside and is not trusted. The API route clamps and
 * escapes every field before it reaches here. It is a self-assessment, so
 * the numbers were never authoritative anyway; the point is that the sales
 * follow-up starts from what the person actually answered.
 */
export interface AssessmentResult {
  overall: number;
  band: string;
  categories: Array<{ name: string; points: number; max: number }>;
  gaps: string[];
  flags: string[];
}

/** Everything here lands in an HTML email, so escape before interpolating. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const REPORT_CONFIGS: Record<string, ReportConfig> = {
  maturity_report: {
    subject: "Your Marketing Automation Maturity Report",
    headline: "Your Marketing Automation Maturity Report",
    description:
      "Your full benchmark report is attached. It includes the complete maturity framework, top-quartile industry benchmarks across all four dimensions, and the action framework for your maturity level. Share it with your leadership team as a briefing document.",
    fileName: "marketing-automation-maturity-report.pdf",
    attachmentName: "DS-Consulting-Marketing-Automation-Maturity-Report.pdf",
    accentHex: "#4338CA",
    notifySubject: "New lead: Marketing Automation Maturity Scorecard",
  },
  attribution_report: {
    subject: "Your Revenue Attribution Readiness Report",
    headline: "Your Revenue Attribution Readiness Report",
    description:
      "Your full readiness report is attached. It covers the complete attribution model comparison, the board-confidence framework, and the implementation roadmap for your readiness level. Use it to build the business case for attribution investment or to brief a new RevOps hire.",
    fileName: "revenue-attribution-readiness-report.pdf",
    attachmentName: "DS-Consulting-Revenue-Attribution-Readiness-Report.pdf",
    accentHex: "#0f172a",
    notifySubject: "New lead: Revenue Attribution Readiness Check",
  },
  dpdp_exposure_report: {
    subject: "Your DPDP exposure report",
    headline: "Your DPDP exposure report",
    description:
      "Your score and the gaps you named are below. The reference report covering the three commencement phases, what each obligation requires from 13 May 2027, the full penalty schedule and the order to close gaps in is linked underneath.",
    fileName: "dpdp-exposure-report.pdf",
    attachmentName: "DS-Consulting-DPDP-Exposure-Report.pdf",
    accentHex: "#4F46E5",
    notifySubject: "New lead: DPDP exposure assessment",
    deliverAs: "link",
    relatedLinks: [
      {
        label: "India's DPDP Act: what commences when",
        href: "https://www.consult-ds.com/regulatory-hub/dpdp-in-scope-and-timeline",
        desc: "The three phases, and the date most commentary gets wrong",
      },
      {
        label: "AI use case register",
        href: "https://www.consult-ds.com/insights/ai-use-case-register",
        desc: "Where AI meets the personal data question",
      },
      {
        label: "NIST AI RMF starter profile",
        href: "https://www.consult-ds.com/insights/nist-ai-rmf-starter-profile",
        desc: "The governance operating model around it",
      },
      {
        label: "CRM governance checklist",
        href: "https://www.consult-ds.com/insights/crm-governance-checklist",
        desc: "Most personal data sits in the CRM",
      },
    ],
  },
  ai_readiness_report: {
    subject: "Your AI Marketing Readiness Report",
    headline: "Your AI Marketing Readiness Report",
    description:
      "Your full readiness report is attached. It covers the complete readiness framework, use-case requirements for each AI application in marketing, the governance requirements for regulated industries, and a sequenced implementation roadmap. Includes IBM watsonx.governance coverage for regulated-sector deployments.",
    fileName: "ai-marketing-readiness-report.pdf",
    attachmentName: "DS-Consulting-AI-Marketing-Readiness-Report.pdf",
    accentHex: "#7c3aed",
    notifySubject: "New lead: AI Marketing Readiness Assessment",
  },
  audit_report: {
    subject: "Your Leaky Funnel Audit Report",
    headline: "Your Leaky Funnel Audit Report",
    description:
      "Your revenue visibility score and audit results are summarised above. For the full CRM governance checklist and a 30-day action plan, download our CRM Governance SOP Template at the link below.",
    fileName: "crm-governance-checklist.pdf",
    attachmentName: "DS-Consulting-CRM-Governance-Checklist.pdf",
    accentHex: "#4338CA",
    notifySubject: "New lead: Leaky Funnel Audit",
  },
};

function buildEmailShell({ headline, description, accentHex, links, deliveryHtml, resultHtml }: { headline: string; description: string; accentHex: string; links: Array<{ label: string; href: string; desc: string }>; deliveryHtml?: string; resultHtml?: string }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f8fafc;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">
          <tr>
            <td style="background-color:${accentHex};border-radius:8px 8px 0 0;padding:28px 32px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.08em;">DS Consulting</p>
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;line-height:1.3;">${headline}</h1>
            </td>
          </tr>
          <tr>
            <td style="background-color:#ffffff;padding:28px 32px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">${description}</p>
              ${resultHtml ?? ""}
              ${deliveryHtml ?? `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">The PDF is attached to this email. If you want to discuss what a scoped engagement would look like for your situation, reply directly to this email or book a diagnostic conversation below.</p>`}
              <table cellpadding="0" cellspacing="0" role="presentation" style="margin:24px 0;">
                <tr>
                  <td style="background-color:${accentHex};border-radius:6px;padding:12px 24px;">
                    <a href="https://www.consult-ds.com/contact" style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;display:block;">Book a diagnostic conversation</a>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f8fafc;border-radius:6px;padding:16px 20px;margin-top:8px;">
                <tr>
                  <td>
                    <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Other tools from DS Consulting</p>
                    ${links.map((link) => `
                      <p style="margin:0 0 6px;font-size:13px;line-height:1.5;color:#334155;">
                        <a href="${link.href}" style="color:${accentHex};text-decoration:none;font-weight:600;">${link.label}</a>
                        <span style="color:#94a3b8;"> | </span>
                        <span style="color:#64748b;">${link.desc}</span>
                      </p>
                    `).join("")}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f1f5f9;border-radius:0 0 8px 8px;padding:18px 32px;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 4px;font-size:12px;color:#64748b;line-height:1.5;"><strong style="color:#334155;">DS Consulting</strong> | Strategy to Systems. Delivered.</p>
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.5;"><a href="https://www.consult-ds.com" style="color:#94a3b8;text-decoration:none;">consult-ds.com</a> | <a href="mailto:contact@consult-ds.com" style="color:#94a3b8;text-decoration:none;">contact@consult-ds.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Renders the score, the category breakdown and the named gaps into the
 * body of the email, so the person still has their result after they close
 * the tab. Table layout throughout, because email clients do not do flexbox.
 */
function buildResultBlock(result: AssessmentResult, accentHex: string): string {
  const rows = result.categories.map((c) => {
    const pct = c.max > 0 ? Math.round((c.points / c.max) * 100) : 0;
    const colour = pct >= 70 ? "#059669" : pct >= 40 ? "#D97706" : "#EF4444";
    return `
      <tr>
        <td style="padding:6px 0;font-size:13px;color:#334155;">${escapeHtml(c.name)}</td>
        <td style="padding:6px 0;font-size:13px;font-weight:700;color:${colour};text-align:right;white-space:nowrap;">${Math.round(c.points)} of ${c.max}</td>
      </tr>`;
  }).join("");

  const gaps = result.gaps.length
    ? `
      <p style="margin:20px 0 8px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Your three biggest gaps</p>
      ${result.gaps.map((g, i) => `
        <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#334155;"><strong style="color:${accentHex};">${i + 1}.</strong> ${escapeHtml(g)}</p>
      `).join("")}`
    : `<p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#334155;">Nothing scored a flat no. Look at the categories above that sit below full marks, because partial credit usually means the thing is documented but not operating.</p>`;

  const flags = result.flags.length
    ? result.flags.map((f) => `
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:14px 18px;margin-top:16px;">
        <tr><td style="font-size:13px;line-height:1.6;color:#334155;">${escapeHtml(f)}</td></tr>
      </table>`).join("")
    : "";

  return `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:20px 24px;margin:0 0 20px;">
      <tr>
        <td>
          <p style="margin:0 0 2px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Your result</p>
          <p style="margin:0 0 2px;font-size:34px;font-weight:800;color:${accentHex};line-height:1.1;">${result.overall}<span style="font-size:16px;color:#94a3b8;font-weight:600;">/100</span></p>
          <p style="margin:0 0 16px;font-size:15px;font-weight:700;color:#334155;">${escapeHtml(result.band)}</p>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-top:1px solid #e2e8f0;">${rows}</table>
          ${gaps}
        </td>
      </tr>
    </table>
    ${flags}`;
}

function buildReportEmail(config: ReportConfig, result?: AssessmentResult): string {
  const downloadUrl = `https://www.consult-ds.com/downloads/${config.fileName}`;
  const deliveryHtml = config.deliverAs === "link"
    ? `<table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 20px;">
         <tr>
           <td style="background-color:#ffffff;border:2px solid ${config.accentHex};border-radius:6px;padding:11px 22px;">
             <a href="${downloadUrl}" style="color:${config.accentHex};text-decoration:none;font-size:14px;font-weight:700;display:block;">Download the full report (PDF)</a>
           </td>
         </tr>
       </table>
       <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">If you would rather walk through this with someone than read it alone, reply to this email or book a time below.</p>`
    : undefined;

  return buildEmailShell({
    headline: config.headline,
    description: config.description,
    accentHex: config.accentHex,
    deliveryHtml,
    resultHtml: result ? buildResultBlock(result, config.accentHex) : undefined,
    links: config.relatedLinks ?? [
      {
        label: "Marketing Automation Maturity Scorecard",
        href: "https://www.consult-ds.com/insights/marketing-automation-maturity",
        desc: "Benchmark your automation setup in 5 minutes",
      },
      {
        label: "Revenue Attribution Readiness Check",
        href: "https://www.consult-ds.com/insights/revenue-attribution-readiness",
        desc: "Can marketing prove its contribution to revenue?",
      },
      {
        label: "AI Marketing Readiness Assessment",
        href: "https://www.consult-ds.com/insights/ai-marketing-readiness",
        desc: "Is your stack ready for AI before you buy a tool?",
      },
      {
        label: "Leaky Funnel Audit Tool",
        href: "https://www.consult-ds.com/insights/leaky-funnel-audit",
        desc: "Quantify monthly revenue leakage",
      },
    ],
  });
}

function buildInsightResourceEmail(resourceKey: keyof typeof insightResources): string {
  const resource = insightResources[resourceKey];
  return buildEmailShell({
    headline: resource.title,
    description: `${resource.description} Use it as a working document with your leadership, sustainability, procurement, finance or operations teams.`,
    accentHex: resource.accentHex,
    links: [
      {
        label: "CSRD Readiness Checklist",
        href: "https://www.consult-ds.com/insights/csrd-readiness-first-90-days",
        desc: "Scoping, data governance, and assurance readiness",
      },
      {
        label: "EcoVadis evidence matrix",
        href: "https://www.consult-ds.com/insights/ecovadis-evidence-matrix",
        desc: "Organise policy, action and metrics before submission",
      },
      {
        label: "Scope 3 supplier data request pack",
        href: "https://www.consult-ds.com/insights/scope-3-supplier-data-request-pack",
        desc: "Improve supplier-side emissions evidence",
      },
      {
        label: "Net zero roadmap starter",
        href: "https://www.consult-ds.com/insights/net-zero-roadmap-starter",
        desc: "Translate your baseline into delivery workstreams",
      },
    ],
  });
}

function buildInternalNotification(subjectLabel: string, email: string, extraRows: Array<[string, string]> = []): string {
  const rows = [
    ["Email", email],
    ...extraRows,
    ["Timestamp", new Date().toISOString()],
  ];

  return `
<div style="font-family:sans-serif;padding:20px;max-width:640px;">
  <h3 style="margin:0 0 16px;">${subjectLabel}</h3>
  <table style="border-collapse:collapse;width:100%;">
    ${rows.map(([label, value]) => `
      <tr>
        <td style="padding:6px 12px 6px 0;color:#64748b;width:110px;vertical-align:top;">${label}</td>
        <td style="padding:6px 0;font-weight:600;line-height:1.5;">${value}</td>
      </tr>
    `).join("")}
  </table>
  <p style="margin-top:20px;font-size:13px;color:#64748b;">Source: <a href="https://www.consult-ds.com">consult-ds.com</a></p>
</div>
  `.trim();
}

export interface SendReportEmailParams {
  formType: string;
  email: string;
  result?: AssessmentResult;
}

export async function sendReportEmail({ formType, email, result }: SendReportEmailParams): Promise<void> {
  const config = REPORT_CONFIGS[formType];
  if (!config) {
    console.warn(`sendReportEmail: unknown formType "${formType}"`);
    return;
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log(`SMTP not configured. Would send "${config.subject}" to ${email}`);
    return;
  }

  const transporter = getTransporter();
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  const notify = process.env.SMTP_NOTIFY ?? process.env.SMTP_USER;
  const filePath = path.join(process.cwd(), "public", "downloads", config.fileName);

  // Link delivery sends no attachment. The download URL is in the body.
  const attachments = config.deliverAs === "link"
    ? []
    : [
        {
          filename: config.attachmentName,
          path: filePath,
          contentType: contentTypeFor(config.fileName),
        },
      ];

  await transporter.sendMail({
    from,
    to: email,
    subject: result ? `${config.subject}: ${result.overall}/100, ${result.band}` : config.subject,
    html: buildReportEmail(config, result),
    attachments,
  });

  /*
    The internal notification carries the score, the weakest categories and
    the named gaps. The point is that a follow-up can open with what the
    person actually answered rather than with a generic nudge. Someone
    sitting at 24/100 with no incident response plan is a different
    conversation from someone at 68/100 whose only gap is vendor contracts.
  */
  const notifyRows: Array<[string, string]> = [["Form type", formType]];
  if (result) {
    notifyRows.push(["Score", `${result.overall}/100`]);
    notifyRows.push(["Band", escapeHtml(result.band)]);
    notifyRows.push([
      "By category",
      result.categories.map((c) => `${escapeHtml(c.name)} ${Math.round(c.points)}/${c.max}`).join(" &middot; "),
    ]);
    if (result.gaps.length) {
      notifyRows.push(["Top gaps", result.gaps.map((g, i) => `${i + 1}. ${escapeHtml(g)}`).join("<br>")]);
    }
    if (result.flags.length) {
      notifyRows.push(["Flags", result.flags.map(escapeHtml).join("<br>")]);
    }
  }

  await transporter.sendMail({
    from,
    to: notify,
    subject: result ? `${config.notifySubject} (${result.overall}/100, ${result.band})` : config.notifySubject,
    html: buildInternalNotification(config.notifySubject, email, notifyRows),
  });
}

export interface SendInsightResourceEmailParams {
  resourceKey: keyof typeof insightResources;
  email: string;
}

export async function sendInsightResourceEmail({ resourceKey, email }: SendInsightResourceEmailParams): Promise<void> {
  const resource = insightResources[resourceKey];
  if (!resource) {
    console.warn(`sendInsightResourceEmail: unknown resourceKey "${resourceKey}"`);
    return;
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log(`SMTP not configured. Would send "${resource.title}" to ${email}`);
    return;
  }

  const transporter = getTransporter();
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  const notify = process.env.SMTP_NOTIFY ?? process.env.SMTP_USER;
  const filePath = path.join(process.cwd(), "public", "downloads", resource.fileName);

  await transporter.sendMail({
    from,
    to: email,
    subject: resource.title,
    html: buildInsightResourceEmail(resourceKey),
    attachments: [
      {
        filename: resource.attachmentName,
        path: filePath,
        contentType: contentTypeFor(resource.fileName),
      },
    ],
  });

  await transporter.sendMail({
    from,
    to: notify,
    subject: resource.notifySubject,
    html: buildInternalNotification(resource.notifySubject, email, [["Resource", resourceKey]]),
  });
}
