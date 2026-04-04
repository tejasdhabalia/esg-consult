import nodemailer from "nodemailer";
import path from "path";

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

// ─── Report config ────────────────────────────────────────────────────────────

interface ReportConfig {
  subject: string;
  headline: string;
  description: string;
  pdfFileName: string;
  pdfAttachmentName: string;
  accentHex: string;
  notifySubject: string;
}

const REPORT_CONFIGS: Record<string, ReportConfig> = {
  maturity_report: {
    subject: "Your Marketing Automation Maturity Report",
    headline: "Your Marketing Automation Maturity Report",
    description:
      "Your full benchmark report is attached. It includes the complete maturity framework, " +
      "top-quartile industry benchmarks across all four dimensions, and the action framework " +
      "for your maturity level. Share it with your leadership team as a briefing document.",
    pdfFileName: "marketing-automation-maturity-report.pdf",
    pdfAttachmentName: "DS-Consulting-Marketing-Automation-Maturity-Report.pdf",
    accentHex: "#4338CA",
    notifySubject: "New lead: Marketing Automation Maturity Scorecard",
  },
  attribution_report: {
    subject: "Your Revenue Attribution Readiness Report",
    headline: "Your Revenue Attribution Readiness Report",
    description:
      "Your full readiness report is attached. It covers the complete attribution model comparison, " +
      "the board-confidence framework, and the implementation roadmap for your readiness level. " +
      "Use it to build the business case for attribution investment or to brief a new RevOps hire.",
    pdfFileName: "revenue-attribution-readiness-report.pdf",
    pdfAttachmentName: "DS-Consulting-Revenue-Attribution-Readiness-Report.pdf",
    accentHex: "#0f172a",
    notifySubject: "New lead: Revenue Attribution Readiness Check",
  },
  ai_readiness_report: {
    subject: "Your AI Marketing Readiness Report",
    headline: "Your AI Marketing Readiness Report",
    description:
      "Your full readiness report is attached. It covers the complete readiness framework, " +
      "use-case requirements for each AI application in marketing, the governance requirements " +
      "for regulated industries, and a sequenced implementation roadmap. " +
      "Includes IBM watsonx.governance coverage for regulated-sector deployments.",
    pdfFileName: "ai-marketing-readiness-report.pdf",
    pdfAttachmentName: "DS-Consulting-AI-Marketing-Readiness-Report.pdf",
    accentHex: "#7c3aed",
    notifySubject: "New lead: AI Marketing Readiness Assessment",
  },
  audit_report: {
    subject: "Your Leaky Funnel Audit Report",
    headline: "Your Leaky Funnel Audit Report",
    description:
      "Your revenue visibility score and audit results are summarised above. " +
      "For the full CRM governance checklist and a 30-day action plan, " +
      "download our CRM Governance SOP Template at the link below.",
    pdfFileName: "crm-governance-checklist.pdf",
    pdfAttachmentName: "DS-Consulting-CRM-Governance-Checklist.pdf",
    accentHex: "#4338CA",
    notifySubject: "New lead: Leaky Funnel Audit",
  },
};

// ─── Email HTML builder ───────────────────────────────────────────────────────

function buildReportEmail(config: ReportConfig): string {
  const { headline, description, accentHex } = config;
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

          <!-- Header -->
          <tr>
            <td style="background-color:${accentHex};border-radius:8px 8px 0 0;padding:28px 32px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.08em;">DS Consulting</p>
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;line-height:1.3;">${headline}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:28px 32px;">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
                ${description}
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
                The PDF is attached to this email. If you have questions about the findings or want to
                discuss what a scoped engagement would look like for your situation, reply directly to
                this email or book a 45-minute consultation below.
              </p>

              <!-- CTA button -->
              <table cellpadding="0" cellspacing="0" role="presentation" style="margin:24px 0;">
                <tr>
                  <td style="background-color:${accentHex};border-radius:6px;padding:12px 24px;">
                    <a href="https://www.consult-ds.com/contact"
                       style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;display:block;">
                      Book a diagnostic conversation
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Related tools -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                     style="background-color:#f8fafc;border-radius:6px;padding:16px 20px;margin-top:8px;">
                <tr>
                  <td>
                    <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;">Other tools from DS Consulting</p>
                    <p style="margin:0 0 6px;font-size:13px;line-height:1.5;color:#334155;">
                      <a href="https://www.consult-ds.com/insights/marketing-automation-maturity" style="color:${accentHex};text-decoration:none;font-weight:600;">Marketing Automation Maturity Scorecard</a>
                      <span style="color:#94a3b8;"> &mdash; </span>
                      <span style="color:#64748b;">Benchmark your automation setup in 5 minutes</span>
                    </p>
                    <p style="margin:0 0 6px;font-size:13px;line-height:1.5;color:#334155;">
                      <a href="https://www.consult-ds.com/insights/revenue-attribution-readiness" style="color:${accentHex};text-decoration:none;font-weight:600;">Revenue Attribution Readiness Check</a>
                      <span style="color:#94a3b8;"> &mdash; </span>
                      <span style="color:#64748b;">Can marketing prove its contribution to revenue?</span>
                    </p>
                    <p style="margin:0 0 6px;font-size:13px;line-height:1.5;color:#334155;">
                      <a href="https://www.consult-ds.com/insights/ai-marketing-readiness" style="color:${accentHex};text-decoration:none;font-weight:600;">AI Marketing Readiness Assessment</a>
                      <span style="color:#94a3b8;"> &mdash; </span>
                      <span style="color:#64748b;">Is your stack ready for AI before you buy a tool?</span>
                    </p>
                    <p style="margin:0;font-size:13px;line-height:1.5;color:#334155;">
                      <a href="https://www.consult-ds.com/insights/leaky-funnel-audit" style="color:${accentHex};text-decoration:none;font-weight:600;">Leaky Funnel Audit Tool</a>
                      <span style="color:#94a3b8;"> &mdash; </span>
                      <span style="color:#64748b;">Quantify your monthly revenue leakage</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f1f5f9;border-radius:0 0 8px 8px;padding:18px 32px;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 4px;font-size:12px;color:#64748b;line-height:1.5;">
                <strong style="color:#334155;">DS Consulting</strong> &nbsp;|&nbsp; Strategy to Systems. Delivered.
              </p>
              <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.5;">
                <a href="https://www.consult-ds.com" style="color:#94a3b8;text-decoration:none;">consult-ds.com</a>
                &nbsp;|&nbsp;
                <a href="mailto:contact@consult-ds.com" style="color:#94a3b8;text-decoration:none;">contact@consult-ds.com</a>
              </p>
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

function buildInternalNotification(formType: string, email: string): string {
  const label = REPORT_CONFIGS[formType]?.notifySubject ?? `Lead capture: ${formType}`;
  return `
<div style="font-family:sans-serif;padding:20px;max-width:500px;">
  <h3 style="margin:0 0 16px;">${label}</h3>
  <table style="border-collapse:collapse;width:100%;">
    <tr>
      <td style="padding:6px 12px 6px 0;color:#64748b;width:120px;">Email</td>
      <td style="padding:6px 0;font-weight:600;">${email}</td>
    </tr>
    <tr>
      <td style="padding:6px 12px 6px 0;color:#64748b;">Form type</td>
      <td style="padding:6px 0;">${formType}</td>
    </tr>
    <tr>
      <td style="padding:6px 12px 6px 0;color:#64748b;">Timestamp</td>
      <td style="padding:6px 0;">${new Date().toISOString()}</td>
    </tr>
  </table>
  <p style="margin-top:20px;font-size:13px;color:#64748b;">
    Source: <a href="https://www.consult-ds.com">consult-ds.com</a>
  </p>
</div>
  `.trim();
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface SendReportEmailParams {
  formType: string;
  email: string;
}

export async function sendReportEmail({ formType, email }: SendReportEmailParams): Promise<void> {
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

  // Resolve PDF path relative to project root (works in both dev and Vercel)
  const pdfPath = path.join(process.cwd(), "public", "downloads", config.pdfFileName);

  // Send report to lead
  await transporter.sendMail({
    from,
    to: email,
    subject: config.subject,
    html: buildReportEmail(config),
    attachments: [
      {
        filename: config.pdfAttachmentName,
        path: pdfPath,
        contentType: "application/pdf",
      },
    ],
  });

  // Internal notification
  await transporter.sendMail({
    from,
    to: notify,
    subject: config.notifySubject,
    html: buildInternalNotification(formType, email),
  });
}
