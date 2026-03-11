const PERSONAL_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "yahoo.com",
  "ymail.com",
  "rocketmail.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "protonmail.com",
  "proton.me",
  "pm.me",
  "gmx.com",
  "mail.com",
  "yandex.com",
  "zoho.com",
  "rediffmail.com",
]);

const BLOCKED_DOMAINS = new Set([
  "example.com",
  "test.com",
  "domain.com",
  "email.com",
  "yourcompany.com",
  "company.com",
  "invalid.com",
]);

const BLOCKED_LOCAL_PARTS = new Set([
  "test",
  "testing",
  "demo",
  "dummy",
  "fake",
  "sample",
  "asdf",
  "qwerty",
  "noreply",
  "no-reply",
  "mail",
  "email",
  "admin",
  "info",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export type BusinessEmailValidation = {
  ok: boolean;
  normalizedEmail: string;
  message: string;
};

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateBusinessEmail(email: string): BusinessEmailValidation {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return {
      ok: false,
      normalizedEmail,
      message: "Work email is required.",
    };
  }

  if (!EMAIL_RE.test(normalizedEmail)) {
    return {
      ok: false,
      normalizedEmail,
      message: "Enter a valid work email address.",
    };
  }

  const [localPart = "", domain = ""] = normalizedEmail.split("@");

  if (!localPart || !domain) {
    return {
      ok: false,
      normalizedEmail,
      message: "Enter a valid work email address.",
    };
  }

  if (PERSONAL_EMAIL_DOMAINS.has(domain)) {
    return {
      ok: false,
      normalizedEmail,
      message: "Please use your company email address, not a personal email provider.",
    };
  }

  if (
    BLOCKED_DOMAINS.has(domain) ||
    domain.endsWith(".example") ||
    domain.endsWith(".invalid") ||
    domain.endsWith(".test")
  ) {
    return {
      ok: false,
      normalizedEmail,
      message: "Please enter your real company email address.",
    };
  }

  if (
    BLOCKED_LOCAL_PARTS.has(localPart) ||
    /^(test|demo|dummy|fake|sample)[._-]?\d*$/i.test(localPart) ||
    /^[a-z]([a-z])\1{3,}$/i.test(localPart) ||
    localPart.includes("noreply") ||
    localPart.includes("no-reply")
  ) {
    return {
      ok: false,
      normalizedEmail,
      message: "Please enter your real company email address.",
    };
  }

  return {
    ok: true,
    normalizedEmail,
    message: "",
  };
}