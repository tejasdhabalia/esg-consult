import { NextResponse } from "next/server";
import { verifyRecaptchaToken } from "@/lib/recaptcha-server";
import {
  sendPrivacyRequestEmails,
  makeReference,
  REQUEST_LABELS,
  type RequestKind,
} from "@/lib/privacy-request-email";

/**
 * Data principal rights requests.
 *
 * Deliberately different from every other form endpoint on this site in two
 * ways, and both differences are the point:
 *
 *   1. It does NOT use validateBusinessEmail. A data principal is a person,
 *      not a company. Rejecting gmail.com here would mean refusing requests
 *      from most of the people entitled to make them, which is a worse
 *      failure than accepting a few junk submissions.
 *
 *   2. The reason field is optional and stays optional. Section 6 requires
 *      that withdrawing consent is as easy as giving it, so nothing in this
 *      route treats a missing reason as an incomplete request.
 *
 * reCAPTCHA still runs, because an unprotected endpoint that sends two
 * emails per call is an obvious relay. The threshold is deliberately lower
 * than the lead forms use: a false negative here blocks someone exercising
 * a statutory right, which is not a cost worth paying for cleaner data.
 */

const VALID_KINDS: RequestKind[] = ["access", "correction", "erasure", "withdraw", "nomination", "grievance"];

/** Lower than the 0.5 used on lead forms. See the note above. */
const RECAPTCHA_MIN_SCORE = 0.3;

const MAX_NAME = 120;
const MAX_TEXT = 2000;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

/** Permissive on purpose. Personal addresses are the normal case here. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 254;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot. Bots fill it, people never see it.
    if (String(body?.website || "").trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const kind = String(body?.kind || "") as RequestKind;
    if (!VALID_KINDS.includes(kind)) {
      return NextResponse.json({ ok: false, error: "Choose what you would like us to do." }, { status: 400 });
    }

    const name = clean(body?.name, MAX_NAME);
    if (name.length < 2) {
      return NextResponse.json({ ok: false, error: "Please give us a name we can use." }, { status: 400 });
    }

    const email = clean(body?.email, 254).toLowerCase();
    if (!looksLikeEmail(email)) {
      return NextResponse.json({ ok: false, error: "That email address does not look right." }, { status: 400 });
    }

    const captchaToken = String(body?.captchaToken || "");
    const recaptcha = await verifyRecaptchaToken({
      token: captchaToken,
      expectedAction: "privacy_request",
    });
    if (!recaptcha.ok || (recaptcha.score ?? 0) < RECAPTCHA_MIN_SCORE) {
      return NextResponse.json(
        {
          ok: false,
          error: `We could not verify this submission. Email us directly at privacy@consult-ds.com and your request still counts from the moment you send it.`,
        },
        { status: 400 },
      );
    }

    const receivedAt = new Date();
    const reference = makeReference(receivedAt);

    await sendPrivacyRequestEmails({
      reference,
      kind,
      name,
      email,
      reason: clean(body?.reason, MAX_TEXT) || undefined,
      context: clean(body?.context, MAX_TEXT) || undefined,
      receivedAt,
    });

    return NextResponse.json({ ok: true, reference, label: REQUEST_LABELS[kind] });
  } catch (err) {
    console.error("[privacy-request] failed", err);
    /*
      A failure here must not read as a refusal. The person has a statutory
      right and our form breaking is our problem, so the message routes them
      to the mailbox and makes clear the clock starts when they send it.
    */
    return NextResponse.json(
      {
        ok: false,
        error:
          "Something went wrong at our end. Email privacy@consult-ds.com with what you would like us to do. Your request counts from the moment you send it, not from when we fix this.",
      },
      { status: 500 },
    );
  }
}
