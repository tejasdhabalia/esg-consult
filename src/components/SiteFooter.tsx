import Link from "next/link";
import { site } from "@/lib/site";
import { allServiceLines as serviceLines } from "@/lib/service-pillars";

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
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="font-semibold mb-2">{site.legalName}</h4>
          <div className="text-sm font-semibold">
            <span className="text-indigo-300 font-bold">{site.taglinePrimary}</span>{" "}
            <span className="text-white font-bold">{site.taglineSecondary}</span>
          </div>
          <p className="text-slate-400 mt-3 leading-relaxed">
            Independent technology consulting and implementation for mid-market companies.
          </p>
          <p className="text-slate-400 mt-3 leading-relaxed">
            {site.positioning.independenceShort}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Services</h4>
          <ul className="space-y-1 text-slate-400">
            {serviceLines.map((line) =>
              line.live ? (
                <li key={line.route}>
                  <Link href={line.route} className="hover:text-white">
                    {line.label}
                  </Link>
                </li>
              ) : (
                <li key={line.route} className="text-slate-500">
                  {line.label}
                </li>
              )
            )}
            <li className="pt-1">
              <Link href="/services" className="hover:text-white">
                All services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-slate-400">
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-white">
                Team
              </Link>
            </li>
            <li>
              <Link href="/insights" className="hover:text-white">
                Insights
              </Link>
            </li>
            {/* Industries hidden from navigation until more than two pages
                exist. The pages stay live at /industries. Uncomment to restore. */}
            {/*
            <li>
              <Link href="/industries" className="hover:text-white">
                Industries
              </Link>
            </li>
            */}
            <li>
              <Link href="/regulatory-hub" className="hover:text-white">
                Regulatory hub
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-slate-400">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-white">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-white">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} {site.legalName}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-500">Follow us</div>
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href={site.linkedin.company}
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
