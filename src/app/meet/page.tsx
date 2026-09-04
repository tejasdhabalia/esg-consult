import { Suspense } from "react";
import { pageMetadata } from "@/lib/page-metadata";
import DirectBookingClient from "@/components/DirectBookingClient";

/**
 * Direct booking link. Not in navigation, not in the sitemap, not in
 * llms.txt, noindex.
 *
 * Sent by hand to people who already have the context: WhatsApp, LinkedIn,
 * or after meeting somebody. Because the conversation has already happened,
 * this page does not repeat the contact form's qualifying questions.
 *
 * Deliberately not added to robots.txt as a Disallow. Blocking the crawl
 * would stop Google reading the noindex tag, and a page it cannot read but
 * finds linked elsewhere can still be indexed with no description. Let it be
 * crawled and let the tag do the work.
 */
export const metadata = pageMetadata({
  title: "Book a time",
  description: "Direct booking link for scheduled conversations with DS Consulting.",
  path: "/meet",
  noindex: true,
});

export default function MeetPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl px-6 py-16 text-sm text-slate-500">Loading...</div>}>
      <DirectBookingClient />
    </Suspense>
  );
}
