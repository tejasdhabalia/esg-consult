/**
 * First-touch attribution capture.
 *
 * Records the landing page and referrer on the FIRST page view of a session,
 * then keeps them unchanged for the rest of the visit. By the time somebody
 * reaches the contact form, document.referrer has been overwritten by internal
 * navigation and the current path is /contact, so both values are useless
 * unless they were captured up front.
 *
 * Stored in sessionStorage, so it clears when the tab closes. That is
 * deliberate: this is enquiry attribution, not visitor tracking.
 *
 * NOT gated behind cookie consent. These values are only ever read when the
 * visitor submits the form themselves, and they travel as part of that
 * submission. That is first-party data collected at the point of enquiry,
 * which is a different thing from analytics tracking. Gating it would lose
 * attribution on exactly the European visitors the firm most wants to
 * understand.
 */

const LANDING_KEY = "ds_landing_page";
const REFERRER_KEY = "ds_referrer";

export type Attribution = {
  landing_page: string;
  referrer: string;
};

/**
 * Call once, on the first page view. Safe to call repeatedly: it only writes
 * if nothing has been recorded yet, so internal navigation cannot overwrite
 * the original values.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    // Already captured this session. Do not overwrite.
    if (sessionStorage.getItem(LANDING_KEY) !== null) return;

    sessionStorage.setItem(LANDING_KEY, window.location.pathname || "");

    // Empty for direct visits, typed URLs and most app-to-web clicks.
    // Store the empty string rather than inventing a placeholder.
    const ref = document.referrer || "";

    // Ignore our own domain. An internal referrer means this is not really
    // the first page of the session, for example after a hard reload.
    let external = ref;
    if (ref) {
      try {
        if (new URL(ref).hostname === window.location.hostname) external = "";
      } catch {
        external = "";
      }
    }

    sessionStorage.setItem(REFERRER_KEY, external);
  } catch {
    // Private browsing modes can throw on sessionStorage. Attribution is a
    // nice-to-have, never a reason to break the page.
  }
}

/** Read what was captured. Returns empty strings if nothing was recorded. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { landing_page: "", referrer: "" };
  }

  try {
    return {
      landing_page: sessionStorage.getItem(LANDING_KEY) || "",
      referrer: sessionStorage.getItem(REFERRER_KEY) || "",
    };
  } catch {
    return { landing_page: "", referrer: "" };
  }
}
