import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-5 gap-6">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-xl bg-gradient-to-br from-purple-500 to-emerald-500" />
            <span className="text-base font-semibold tracking-tight">YourCo ESG Advisory</span>
          </div>
          <p className="mt-3 text-sm text-neutral-600 max-w-sm">
            Independent ESG consultancy for EU/UK & India—CSRD/ESRS, UK climate/ISSB, and BRSR advisory.
          </p>
        </div>

        <div>
          <div className="font-medium mb-2">Navigate</div>
          <ul className="space-y-1 text-sm text-neutral-700">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/services" className="hover:underline">Services</Link></li>
            <li><Link href="/regulations" className="hover:underline">Regulatory Hub</Link></li>
            <li><Link href="/insights" className="hover:underline">Insights</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-medium mb-2">Company</div>
          <ul className="space-y-1 text-sm text-neutral-700">
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/team" className="hover:underline">Team</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-medium mb-2">Legal</div>
          <ul className="space-y-1 text-sm text-neutral-700">
            <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms</Link></li>
            <li><Link href="/cookies" className="hover:underline">Cookies</Link></li>
            <li><Link href="/accessibility" className="hover:underline">Accessibility</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-xs text-neutral-600 text-center px-4">
        © {new Date().getFullYear()} YourCo ESG Advisory. All rights reserved.
      </div>
    </footer>
  );
}
