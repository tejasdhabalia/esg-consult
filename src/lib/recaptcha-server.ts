export async function verifyRecaptchaToken({
  token,
  expectedAction,
}: {
  token: string;
  expectedAction: string;
}): Promise<{ ok: boolean; error?: string; score?: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    return { ok: false, error: "reCAPTCHA is not configured on the server." };
  }

  if (!token) {
    return { ok: false, error: "reCAPTCHA token missing." };
  }

  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", token);

  const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: params.toString(),
    cache: "no-store",
  });

  const verifyData: {
    success?: boolean;
    score?: number;
    action?: string;
  } = await verifyRes.json();

  if (!verifyData?.success) {
    return { ok: false, error: "reCAPTCHA verification failed." };
  }

  if (verifyData.action !== expectedAction) {
    return { ok: false, error: "reCAPTCHA action mismatch." };
  }

  const threshold = 0.5;
  const score = typeof verifyData.score === "number" ? verifyData.score : 0;

  if (score < threshold) {
    return { ok: false, error: "Submission blocked as suspicious.", score };
  }

  return { ok: true, score };
}