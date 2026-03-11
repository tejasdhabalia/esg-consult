declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export async function getRecaptchaToken(siteKey: string, action: string): Promise<string> {
  if (!siteKey) throw new Error("reCAPTCHA site key missing.");
  if (!window.grecaptcha) throw new Error("reCAPTCHA not loaded.");

  await new Promise<void>((resolve) => {
    window.grecaptcha?.ready(resolve);
  });

  const token = await window.grecaptcha.execute(siteKey, { action });

  if (!token) throw new Error("reCAPTCHA token missing.");

  return token;
}