"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { liveServiceLines } from "@/lib/service-lines";

export default function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(target)) {
        setServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/DSConsulting-mark.png"
            alt="DS Consulting logo"
            width={34}
            height={34}
            priority
          />

          <span className="text-xl font-semibold text-slate-900">DS Consulting</span>

          <span className="hidden items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold lg:inline-flex">
            <span className="font-bold text-indigo-700">{site.taglinePrimary}</span>
            <span className="ml-1 font-bold text-slate-700">{site.taglineSecondary}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>

          <div className="relative" ref={servicesDropdownRef}>
            <button
              type="button"
              className="flex items-center gap-1 hover:text-slate-900"
              onClick={() => setServicesOpen((value) => !value)}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              Services <span className="text-slate-400">▾</span>
            </button>

            {servicesOpen && (
              <div className="absolute left-0 top-full mt-3 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                <div className="grid gap-1">
                  <Link
                    href="/services"
                    className="block rounded-xl px-4 py-3 font-medium text-slate-900 hover:bg-slate-50"
                    onClick={() => setServicesOpen(false)}
                  >
                    All services
                  </Link>

                  {liveServiceLines.map((line) => (
                    <Link
                      key={line.route}
                      href={line.route}
                      className="block rounded-xl px-4 py-3 font-medium text-slate-900 hover:bg-slate-50"
                      onClick={() => setServicesOpen(false)}
                    >
                      {line.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/regulatory-hub" className="hover:text-slate-900">
            Regulatory hub
          </Link>
          <Link href="/insights" className="hover:text-slate-900">
            Insights
          </Link>
          <Link href="/about" className="hover:text-slate-900">
            About
          </Link>
          <Link href="/contact" className="hover:text-slate-900">
            Contact
          </Link>
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 md:inline-flex"
        >
          {site.assessment.label}
        </Link>

        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
        >
          Menu
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 text-sm">
            <div className="text-xs font-semibold text-slate-700">
              <span className="font-bold text-indigo-700">{site.taglinePrimary}</span>{" "}
              <span className="font-bold">{site.taglineSecondary}</span>
            </div>

            <Link href="/" onClick={closeMobileMenu}>
              Home
            </Link>

            <div className="rounded-xl border border-slate-200 bg-slate-50">
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-slate-900"
                onClick={() => setMobileServicesOpen((value) => !value)}
                aria-expanded={mobileServicesOpen}
              >
                <span>Services</span>
                <span className="text-slate-400">{mobileServicesOpen ? "▴" : "▾"}</span>
              </button>

              {mobileServicesOpen && (
                <div className="space-y-1 border-t border-slate-200 px-3 py-3">
                  <Link
                    href="/services"
                    className="block rounded-lg px-3 py-2 font-medium text-slate-900 hover:bg-white"
                    onClick={closeMobileMenu}
                  >
                    All services
                  </Link>

                  {liveServiceLines.map((line) => (
                    <Link
                      key={line.route}
                      href={line.route}
                      className="block rounded-lg px-3 py-2 font-medium text-slate-900 hover:bg-white"
                      onClick={closeMobileMenu}
                    >
                      {line.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/regulatory-hub" onClick={closeMobileMenu}>
              Regulatory hub
            </Link>
            <Link href="/insights" onClick={closeMobileMenu}>
              Insights
            </Link>
            <Link href="/about" onClick={closeMobileMenu}>
              About
            </Link>
            <Link href="/contact" onClick={closeMobileMenu}>
              Contact
            </Link>

            <Link
              href="/contact"
              className="mt-2 inline-flex justify-center rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
              onClick={closeMobileMenu}
            >
              {site.assessment.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
