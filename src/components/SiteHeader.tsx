"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 relative">
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xl font-semibold text-slate-900">
            DS Consulting
          </span>

          {/* Tagline */}
          <span className="hidden lg:inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold">
            <span className="text-indigo-700 font-bold">Strategy to Systems.</span>
            <span className="ml-1 text-slate-700 font-bold">Delivered.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>

          {/* Services Dropdown (click-to-toggle) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="flex items-center gap-1 hover:text-slate-900"
              onClick={() => setServicesOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              Services <span className="text-slate-400">▾</span>
            </button>

            {servicesOpen && (
              <div className="absolute left-0 top-full mt-3 w-[320px] max-w-[calc(100vw-2rem)]rounded-xl border border-slate-200 bg-white shadow-lg p-3">
                <Link
                  href="/services"
                  className="block rounded-lg px-3 py-2 hover:bg-slate-50"
                  onClick={() => setServicesOpen(false)}
                >
                  <div className="font-medium text-slate-900">All Services</div>
                  <div className="text-xs text-slate-500">
                    Explore our consulting pillars
                  </div>
                </Link>

                <div className="my-2 border-t border-slate-100" />

                <Link
                  href="/services/esg-advisory"
                  className="block rounded-lg px-3 py-2 hover:bg-slate-50"
                  onClick={() => setServicesOpen(false)}
                >
                  <div className="font-medium text-emerald-700">
                    ESG & Sustainability
                  </div>
                  <div className="text-xs text-slate-500">
                    CSRD, BRSR, GHG systems, ESG data governance
                  </div>
                </Link>

                <Link
                  href="/services/marketing-automation"
                  className="block rounded-lg px-3 py-2 hover:bg-slate-50"
                  onClick={() => setServicesOpen(false)}
                >
                  <div className="font-medium text-indigo-700">
                    Marketing Automation & RevOps
                  </div>
                  <div className="text-xs text-slate-500">
                    Lifecycle, CRM governance, automation, revenue analytics
                  </div>
                </Link>

                <div className="my-2 border-t border-slate-100" />
                <div className="px-3 py-2 text-xs text-slate-500">
                  Additional capabilities: AI & Data • Growth Strategy • Location Intelligence
                </div>
              </div>
            )}
          </div>

          <Link href="/regulatory-hub" className="hover:text-slate-900">
            Regulatory Hub
          </Link>
          <Link href="/insights" className="hover:text-slate-900">
            Insights
          </Link>
          <Link href="/case-studies" className="hover:text-slate-900">
            Case Studies
          </Link>
          <Link href="/about" className="hover:text-slate-900">
            About
          </Link>
          <Link href="/contact" className="hover:text-slate-900">
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Book Consultation
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden px-3 py-2 border rounded-lg text-sm"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
        >
          Menu
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 text-sm">
            <div className="text-xs font-semibold text-slate-700">
              <span className="text-indigo-700 font-bold">Strategy to Systems.</span>{" "}
              <span className="font-bold">Delivered.</span>
            </div>

            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <div className="pt-2">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">
                Services
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/services" onClick={() => setMobileOpen(false)}>
                  All Services
                </Link>
                <Link
                  href="/services/esg-advisory"
                  className="text-emerald-700"
                  onClick={() => setMobileOpen(false)}
                >
                  ESG & Sustainability
                </Link>
                <Link
                  href="/services/marketing-automation"
                  className="text-indigo-700"
                  onClick={() => setMobileOpen(false)}
                >
                  Marketing Automation & RevOps
                </Link>
              </div>
            </div>

            <Link href="/regulatory-hub" onClick={() => setMobileOpen(false)}>
              Regulatory Hub
            </Link>
            <Link href="/insights" onClick={() => setMobileOpen(false)}>
              Insights
            </Link>
            <Link href="/case-studies" onClick={() => setMobileOpen(false)}>
              Case Studies
            </Link>
            <Link href="/about" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>

            <Link
              href="/contact"
              className="mt-2 inline-flex justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}