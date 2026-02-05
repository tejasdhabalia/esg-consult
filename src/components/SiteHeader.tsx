"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/regulations", label: "Regulatory Hub" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-xl bg-gradient-to-br from-purple-500 to-emerald-500" />
          <span className="text-base font-semibold tracking-tight">YourCo ESG Advisory</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:underline ${
                pathname === item.href ? "text-purple-700 font-medium" : "text-neutral-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-xl px-3 py-1.5 bg-purple-600 text-white hover:bg-purple-700"
          >
            Book a call
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden rounded-xl border px-3 py-1.5 text-sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 ${
                  pathname === item.href ? "bg-purple-50 text-purple-700" : "hover:bg-neutral-50"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-lg px-3 py-2 bg-purple-600 text-white text-center hover:bg-purple-700"
              onClick={() => setOpen(false)}
            >
              Book a call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
