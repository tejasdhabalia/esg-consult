import nodemailer from "nodemailer";

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

interface BookingEmailParams {
  firstName: string;
  surname: string;
  email: string;
  localDisplay: string;
  istDisplay: string;
  visitorTz: string;
  /**
   * Enquiry detail and attribution. All optional so existing callers keep
   * working. These appear ONLY in the internal notification, never in the
   * email sent to the visitor and never in the calendar invitation, because
   * showing somebody their own referrer back is poor practice.
   */
  company?: string;
  interest?: string;
  message?: string;
  hearAboutUs?: string;
  landingPage?: string;
  referrer?: string;
}

export async function sendBookingConfirmation(params: BookingEmailParams) {
  const {
    firstName,
    surname,
    email,
    localDisplay,
    istDisplay,
    visitorTz,
    company = "",
    interest = "",
    message = "",
    hearAboutUs = "",
    landingPage = "",
    referrer = "",
  } = params;

  // Escape anything the visitor typed before it goes into an HTML email.
  const esc = (v: string) =>
    String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top;">${label}</td><td style="padding:6px 0;">${esc(value)}</td></tr>`
      : "";

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log("SMTP not configured. Booking confirmed for:", email, istDisplay);
    return;
  }

  const transporter = getTransporter();
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  const notify = process.env.SMTP_NOTIFY ?? process.env.SMTP_USER;

  // Confirmation to visitor
  await transporter.sendMail({
    from,
    to: email,
    subject: "Your DS Consulting consultation is confirmed",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1e293b;">
        <h2 style="margin:0 0 16px">Consultation confirmed</h2>
        <p>Hi ${firstName},</p>
        <p>Your 45-minute consultation with DS Consulting has been confirmed.</p>
        <div style="background:#f8fafc;border-radius:8px;padding:20px;margin:24px 0;border-left:4px solid #4f46e5;">
          <p style="margin:0 0 10px"><strong>Your local time:</strong><br>${localDisplay} (${visitorTz})</p>
          <p style="margin:0"><strong>IST:</strong><br>${istDisplay}</p>
        </div>
        <p>A Google Meet link and calendar invitation have been sent to your calendar separately.</p>

        <div style="background:#f8fafc;border-radius:8px;padding:20px;margin:24px 0;border-left:4px solid #4f46e5;">
          <p style="margin:0 0 12px;font-weight:600;color:#1e293b;">What to expect in the session</p>
          <p style="margin:0 0 6px;color:#475569;">This is a 45-minute working session, not a sales call.</p>
          <p style="margin:0 0 12px;font-weight:600;color:#1e293b;">Agenda</p>
          <ol style="margin:0;padding-left:20px;color:#475569;line-height:1.8;">
            <li>Your current challenge and where execution is breaking down</li>
            <li>What a scoped engagement looks like for your situation</li>
            <li>An honest view on where to start and what is realistic</li>
          </ol>
          <p style="margin:16px 0 0;color:#475569;">To make the most of the session, come prepared with a rough sense of your priority, whether that is a regulatory deadline you are working toward, a CRM or reporting system that is not delivering, or an AI adoption initiative that needs governance.</p>
        </div>

        <p>If you need to reschedule, reply to this email.</p>
        <p style="margin-top:32px;color:#64748b;font-size:13px;">
          DS Consulting &nbsp;·&nbsp; Strategy to Systems. Delivered.<br>
          <a href="https://www.consult-ds.com" style="color:#4f46e5;">consult-ds.com</a>
        </p>
      </div>
    `,
  });

  // Internal notification
  await transporter.sendMail({
    from,
    to: notify,
    subject: `New consultation booked: ${firstName} ${surname}`,
    html: `
      <div style="font-family:sans-serif;padding:20px;">
        <h3>New consultation booking</h3>
        <table style="border-collapse:collapse;width:100%;max-width:400px;">
          <tr><td style="padding:6px 12px 6px 0;color:#64748b;">Name</td><td style="padding:6px 0;font-weight:600;">${firstName} ${surname}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#64748b;">Email</td><td style="padding:6px 0;">${email}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#64748b;">Time (IST)</td><td style="padding:6px 0;font-weight:600;">${istDisplay}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#64748b;">Their timezone</td><td style="padding:6px 0;">${localDisplay} (${visitorTz})</td></tr>
          ${row("Topic", interest)}
        </table>
        <p style="color:#94a3b8;font-size:12px;margin-top:12px;">
          Their message and where they came from are in the separate
          "New enquiry" email for this person.
        </p>
      </div>
    `,
  });
}
interface EnquiryEmailParams {
  name: string;
  email: string;
  company?: string;
  interest?: string;
  message: string;
  hearAboutUs?: string;
  landingPage?: string;
  referrer?: string;
}

/**
 * Internal notification for every contact form submission.
 *
 * Sent by /api/contact independently of the booking. That separation is
 * deliberate: the two endpoints are called in parallel and either can fail on
 * its own. If the calendar call fails, this email still captures the enquiry,
 * so nobody is lost because Google had a bad minute.
 *
 * Nothing here is sent to the visitor. Attribution in particular is internal
 * only, because showing somebody their own referrer back is poor practice.
 */
export async function sendEnquiryNotification(params: EnquiryEmailParams) {
  const {
    name,
    email,
    company = "",
    interest = "",
    message,
    hearAboutUs = "",
    landingPage = "",
    referrer = "",
  } = params;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log("SMTP not configured. Enquiry received from:", email);
    return;
  }

  const esc = (v: string) =>
    String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top;">${label}</td><td style="padding:6px 0;">${esc(value)}</td></tr>`
      : "";

  const transporter = getTransporter();
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  const notify = process.env.SMTP_NOTIFY ?? process.env.SMTP_USER;

  await transporter.sendMail({
    from,
    to: notify,
    replyTo: email,
    subject: `New enquiry: ${name}`,
    html: `
      <div style="font-family:sans-serif;padding:20px;">
        <h3>New enquiry</h3>
        <table style="border-collapse:collapse;width:100%;max-width:520px;">
          ${row("Name", name)}
          ${row("Email", email)}
          ${row("Company", company)}
          ${row("Topic", interest)}
        </table>

        <h4 style="margin:20px 0 6px;">Their message</h4>
        <div style="white-space:pre-wrap;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;max-width:520px;">${esc(message)}</div>

        <h4 style="margin:20px 0 6px;">Where they came from</h4>
        <table style="border-collapse:collapse;width:100%;max-width:520px;">
          ${row("They said", hearAboutUs)}
          ${row("First page of visit", landingPage)}
          ${row("Referrer", referrer)}
        </table>
        <p style="color:#94a3b8;font-size:12px;margin-top:10px;">
          Blank referrer and first page are normal for a typed URL or a direct visit.
        </p>
      </div>
    `,
  });
}
