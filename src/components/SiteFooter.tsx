import Link from "next/link";
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

function IconX() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.7L5.3 22H2l7.3-8.4L1 2h6.9l4.7 6.1L18.9 2zm-1.2 18h1.7L7.1 3.9H5.3L17.7 20z"
      />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.9 2.5 12 2.5 12 2.5h0s-4.9 0-8.2.3c-.5.1-1.5.1-2.4 1C.7 4.5.5 6.2.5 6.2S.2 8.1.2 10v1.9c0 1.9.3 3.8.3 3.8s.2 1.7.9 2.4c.9.9 2.1.9 2.6 1 1.9.2 8 .3 8 .3s4.9 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.3-1.9.3-3.8V10c0-1.9-.3-3.8-.3-3.8zM9.7 14.3V7.7l6.3 3.3-6.3 3.3z"
      />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-semibold mb-2">{site.legalName}</h4>
          <div className="text-sm font-semibold">
            <span className="text-indigo-300 font-bold">{site.taglinePrimary}</span>{" "}
            <span className="text-white font-bold">{site.taglineSecondary}</span>
          </div>
          <p className="text-slate-400 mt-3">
            ESG readiness and revenue visibility through advisory plus implementation.
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
                href="#"
                aria-label="Company LinkedIn (placeholder)"
                className="hover:text-white"
              >
                <IconLinkedIn />
              </a>
              <a
                href="#"
                aria-label="Company Twitter or X (placeholder)"
                className="hover:text-white"
              >
                <IconX />
              </a>
              <a
                href="#"
                aria-label="Company YouTube (placeholder)"
                className="hover:text-white"
              >
                <IconYouTube />
              </a>
            </div>
          </div>

          <div className="text-xs text-slate-500 md:text-right">
            Prim Rose Tower, Azad Nagar Lane No. 3, Off Veera Desai Road, Andheri (W), Mumbai, Maharashtra 400058, India
          </div>
        </div>
      </div>
    </footer>
  );
}