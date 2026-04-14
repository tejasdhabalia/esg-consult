import nodemailer from "nodemailer";
import path from "path";
import { insightResources } from "@/lib/insight-resources";

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
      "Your full benchmark report is attached. It includes the complete maturity framework, top-quartile industry benchmarks across all four dimensions, and the action framework for your maturity level. Share it with your leadership team as a briefing document.",
    pdfFileName: "marketing-automation-maturity-report.pdf",
    pdfAttachmentName: "DS-Consulting-Marketing-Automation-Maturity-Report.pdf",
    accentHex: "#4338CA",
    notifySubject: "New lead: Marketing Automation Maturity Scorecard",
  },
  attribution_report: {
    subject: "Your Revenue Attribution Readiness Report",
    headline: "Your Revenue Attribution Readiness Report",
    description:
      "Your full readiness report is attached. It covers the complete attribution model comparison, the board-confidence framework, and the implementation roadmap for your readiness level. Use it to build the business case for attribution investment or to brief a new RevOps hire.",
    pdfFileName: "revenue-attribution-readiness-report.pdf",
    pdfAttachmentName: "DS-Consulting-Revenue-Attribution-Readiness-Report.pdf",
    accentHex: "#0f172a",
    notifySubject: "New lead: Revenue Attribution Readiness Check",
  },
  ai_readiness_report: {
    subject: "Your AI Marketing Readiness Report",
    headline: "Your AI Marketing Readiness Report",
    description:
      "Your full readiness report is attached. It covers the complete readiness framework, use-case requirements for each AI application in marketing, the governance requirements for regulated industries, and a sequenced implementation roadmap. Includes IBM watsonx.governance coverage for regulated-sector deployments.",
    pdfFileName: "ai-marketing-readiness-report.pdf",
    pdfAttachmentName: "DS-Consulting-AI-Marketing-Readiness-Report.pdf",
    accentHex: "#7c3aed",
    notifySubject: "New lead: AI Marketing Readiness Assessment",
  },
  audit_report: {
    subject: "Your Leaky Funnel Audit Report",
    headline: "Your Leaky Funnel Audit Report",
    description:
      "Your revenue visibility score and audit results are summarised above. For the full CRM governance checklist and a 30-day action plan, download our CRM Governance SOP Template at the link below.",
    pdfFileName: "crm-governance-checklist.pdf",
    pdfAttachmentName: "DS-Consulting-CRM-Governance-Checklist.pdf",
    accentHex: "#4338CA",
    notifySubject: "New lead: Leaky Funnel Audit",
  },
};

function buildEmailShell({ headline, description, accentHex, links }: { headline: string; description: string; accentHex: string; links: Array<{ label: string; href: string; desc: string }> }) {
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
              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">The PDF is attached to this email. If you want to discuss what a scoped engagement would look like for your situation, reply directly to this email or book a diagnostic conversation below.</p>
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

function buildReportEmail(config: ReportConfig): string {
  return buildEmailShell({
    headline: config.headline,
    description: config.description,
    accentHex: config.accentHex,
    links: [
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
    description: `${resource.description} Use it as a working document with your leadership, sustainability, procurement, finance, or operations teams.`,
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
        desc: "Organise policy, action, and metrics before submission",
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
<div style="font-family:sans-serif;padding:20px;max-width:500px;">
  <h3 style="margin:0 0 16px;">${subjectLabel}</h3>
  <table style="border-collapse:collapse;width:100%;">
    ${rows.map(([label, value]) => `
      <tr>
        <td style="padding:6px 12px 6px 0;color:#64748b;width:120px;">${label}</td>
        <td style="padding:6px 0;font-weight:600;">${value}</td>
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
  const pdfPath = path.join(process.cwd(), "public", "downloads", config.pdfFileName);

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

  await transporter.sendMail({
    from,
    to: notify,
    subject: config.notifySubject,
    html: buildInternalNotification(config.notifySubject, email, [["Form type", formType]]),
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
  const pdfPath = path.join(process.cwd(), "public", "downloads", resource.pdfFileName);

  await transporter.sendMail({
    from,
    to: email,
    subject: resource.title,
    html: buildInsightResourceEmail(resourceKey),
    attachments: [
      {
        filename: resource.pdfAttachmentName,
        path: pdfPath,
        contentType: "application/pdf",
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
