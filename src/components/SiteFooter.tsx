import Link from "next/link";
import NewsletterSignup from "@/components/NewsletterSignup";
import { site } from "@/lib/site";

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 23.5h4V7.5h-4v16zM8.5 7.5h3.8v2.2h.05c.53-1 1.83-2.2 3.76-2.2 4.02 0 4.76 2.65 4.76 6.09v9.91h-4v-8.79c0-2.09-.04-4.78-2.91-4.78-2.92 0-3.37 2.28-3.37 4.63v8.94h-4v-16z"
      />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      {/* Newsletter strip */}
      <div className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <NewsletterSignup />
        </div>
      </div>

      {/* Main links section */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-semibold mb-2">{site.legalName}</h4>
          <div className="text-sm font-semibold">
            <span className="text-indigo-300 font-bold">{site.taglinePrimary}</span>{" "}
            <span className="text-white font-bold">{site.taglineSecondary}</span>
          </div>
          <p className="text-slate-400 mt-3">
            ESG readiness and Revenue Visibility through advisory plus implementation.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Services</h4>
          <ul className="space-y-1 text-slate-400">
            <li>
              <Link href="/services/esg-advisory">ESG Advisory</Link>
            </li>
            <li>
              <Link href="/services/marketing-automation">Marketing Automation</Link>
            </li>
            <li>
              <Link href="/services">All Services</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-slate-400">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/insights">Insights</Link>
            </li>
            <li>
              <Link href="/team">Team</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-slate-400">
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/cookies">Cookies</Link>
            </li>
            <li>
              <Link href="/accessibility">Accessibility</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} {site.legalName}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-500">Follow us</div>
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="https://www.linkedin.com/company/consult-ds"
                aria-label="Company LinkedIn"
                className="hover:text-white"
              >
                <IconLinkedIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
