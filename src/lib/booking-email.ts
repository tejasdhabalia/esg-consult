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
}

export async function sendBookingConfirmation(params: BookingEmailParams) {
  const { firstName, surname, email, localDisplay, istDisplay, visitorTz } = params;

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
        </table>
      </div>
    `,
  });
}