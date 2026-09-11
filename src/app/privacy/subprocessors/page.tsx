import Link from "next/link";
import { absUrl } from "@/lib/url";
import { pageMetadata } from "@/lib/page-metadata";

/*
  Subprocessor list. UNLISTED, not public.

  noindex, and excluded from the sitemap via EXCLUDED_ROUTES in
  scripts/generate-sitemap.mjs. Nothing links to it: not the footer, not the
  navigation, not the privacy notice. The privacy notice says the list is
  available on request, and this is the URL we send when someone asks.

  Keeping it as a page rather than a document means one version exists and
  the link can go in an email in ten seconds. Do not add it to navigation
  without deciding to make it public again, in which case the noindex flag
  and the sitemap exclusion both come off.

  MAINTENANCE OBLIGATION. This page claims to be complete. That claim is
  only true if it is updated when a provider is added or dropped. Adding a
  tool that touches personal data means editing this page in the same
  change, not later.
*/

export const metadata = pageMetadata({
  title: "Subprocessors",
  description:
    "Every third party that processes personal data on behalf of DS Consulting, what each one receives, and where it is processed.",
  path: "/privacy/subprocessors",
  noindex: true,
});

const LAST_UPDATED = "11 September 2026";

const SUBPROCESSORS = [
  {
    name: "Vercel Inc.",
    purpose: "Hosting and content delivery for consult-ds.com",
    receives: "Standard server log data for every visitor, including IP address, user agent and requested URL. We do not control how long Vercel keeps these and cannot delete them on request. Form contents pass through in transit but are not stored by Vercel.",
    where: "United States, with a global edge network",
    consent: "Not consent-based. Nothing can be served without a host.",
  },
  {
    name: "Google LLC, Calendar",
    purpose: "Creating booking events and sending calendar invitations",
    receives: "Name, email address and the meeting detail for anyone who books a call",
    where: "United States and global",
    consent: "Consent, given when you book",
  },
  {
    name: "Google LLC, Analytics 4",
    purpose: "Measuring how the site is used",
    receives: "Pseudonymous analytics identifiers, pages viewed, referrer, approximate location, device and browser. No name or email address.",
    where: "United States and global",
    consent: "Consent, through the cookie banner. Declined by default, so nothing is sent unless you accept",
  },
  {
    name: "Google LLC, reCAPTCHA",
    purpose: "Preventing spam and automated abuse on every form",
    receives: "Interaction signals and IP address, used to produce a risk score",
    where: "United States and global",
    consent: "Not consent-based. Without it the forms would be unusable within a week",
  },
  {
    name: "Google LLC, Workspace and Gmail",
    purpose: "Sending and receiving enquiry, booking, report and rights request email",
    receives: "Everything you type into a form, because that is what the email contains. This is where enquiries are stored and read, not just relayed.",
    where: "United States and global",
    consent: "Consent, given when you submit a form. For a rights request, legal obligation",
  },
];

export default function SubprocessorsPage() {
  return (
    <div className="bg-white">
      <div className="bg-indigo-950 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-indigo-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Subprocessors</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Subprocessors</h1>
          <p className="text-indigo-200 text-lg max-w-2xl leading-relaxed">
            Every third party that handles personal data on our behalf, what each one receives, and where
            it is processed. Complete as at {LAST_UPDATED}. Shared on request rather than listed publicly.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14 space-y-12">

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-5">The list</h2>
          <div className="space-y-4">
            {SUBPROCESSORS.map(({ name, purpose, receives, where, consent }) => (
              <div key={name} className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-900 mb-1">{name}</h3>
                <p className="text-sm text-slate-600 mb-4">{purpose}</p>
                <dl className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:gap-3">
                    <dt className="text-xs text-slate-500 uppercase tracking-wide sm:w-32 flex-shrink-0">Receives</dt>
                    <dd className="text-sm text-slate-700 leading-relaxed">{receives}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-3">
                    <dt className="text-xs text-slate-500 uppercase tracking-wide sm:w-32 flex-shrink-0">Processed in</dt>
                    <dd className="text-sm text-slate-700">{where}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-3">
                    <dt className="text-xs text-slate-500 uppercase tracking-wide sm:w-32 flex-shrink-0">Basis</dt>
                    <dd className="text-sm text-slate-700">{consent}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Concentration</h2>
          <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
            <p>
              Google appears four times above, and one of those is the mailbox where enquiries are stored
              rather than merely relayed. Google is therefore the single place most of the personal data we
              hold actually sits.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is not on this list</h2>
          <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
            <p>
              There is no CRM, no marketing automation platform, no advertising network, no data enrichment
              service and no lead broker. We do not run any of them.
            </p>
            <p>
              There is no application database either. Enquiries, bookings and report requests arrive as
              email and stay in a mailbox. That is a smaller footprint than most firms have, and it is why
              a request to delete your data is straightforward for us to honour.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes</h2>
          <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
            <p>
              This page is updated in the same change that adds or removes a provider, not afterwards. If
              you are relying on it for a supplier review and want to be told when it changes, email{" "}
              <a href="mailto:privacy@consult-ds.com" className="text-indigo-700 hover:underline">privacy@consult-ds.com</a>{" "}
              and we will write to you.
            </p>
            <p>
              Related:{" "}
              <Link href="/privacy" className="text-indigo-700 hover:underline">privacy notice</Link>,{" "}
              <Link href="/privacy/request" className="text-indigo-700 hover:underline">request your data</Link>,{" "}
              <Link href="/cookies" className="text-indigo-700 hover:underline">cookies</Link>.
            </p>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
        { "@type": "ListItem", position: 2, name: "Privacy", item: absUrl("/privacy") },
        { "@type": "ListItem", position: 3, name: "Subprocessors", item: absUrl("/privacy/subprocessors") },
      ] }) }} />
    </div>
  );
}
