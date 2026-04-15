"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { llmsManifest } from "@/generated/llms-manifest";

type ServiceHub = {
  route: string;
  label: string;
};

type PartnerItem = {
  route: string;
  label: string;
};

function cleanTitle(title: string) {
  return title.replace(/\s*\|\s*DS Consulting$/i, "")
  .replace(/\s*\|\s*Partners$/i, "")
  .trim();
}

function routeDepth(route: string) {
  return route.split("/").filter(Boolean).length;
}

function buildServiceHubs(): ServiceHub[] {
  const servicePages = llmsManifest.pages
    .filter((page) => page.section === "services")
    .sort((a, b) => a.route.localeCompare(b.route));

  const hubLabels: Record<string, string> = {
    "/services/esg-advisory": "ESG and Sustainability",
    "/services/marketing-automation": "Marketing Automation and RevOps",
  };

  return servicePages
    .filter((page) => routeDepth(page.route) === 2 && page.route !== "/services")
    .map((page) => ({
      route: page.route,
      label: hubLabels[page.route] || cleanTitle(page.title),
    }));
}

function buildPartnerItems(): PartnerItem[] {
  const partnerLabels: Record<string, string> = {
    "/partners/strategic-finance-partnership": "Strategic finance partnership",
  };

  return llmsManifest.pages
    .filter((page) => page.route.startsWith("/partners/") && routeDepth(page.route) === 2)
    .sort((a, b) => a.route.localeCompare(b.route))
    .map((page) => ({
      route: page.route,
      label: partnerLabels[page.route] || cleanTitle(page.title),
    }));
}

export default function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [partnersOpen, setPartnersOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePartnersOpen, setMobilePartnersOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement | null>(null);
  const partnersDropdownRef = useRef<HTMLDivElement | null>(null);

  const serviceHubs = useMemo(() => buildServiceHubs(), []);
  const partnerItems = useMemo(() => buildPartnerItems(), []);
  const hasPartnerChildren = partnerItems.length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(target)) {
        setServicesOpen(false);
      }

      if (partnersDropdownRef.current && !partnersDropdownRef.current.contains(target)) {
        setPartnersOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobilePartnersOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 relative border-b border-slate-200 bg-white">
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
            <span className="font-bold text-indigo-700">Strategy to Systems.</span>
            <span className="ml-1 font-bold text-slate-700">Delivered.</span>
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
              onClick={() => {
                setServicesOpen((value) => !value);
                setPartnersOpen(false);
              }}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              Services <span className="text-slate-400">▾</span>
            </button>

            {servicesOpen && (
              <div className="absolute left-0 top-full mt-3 w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                <div className="grid gap-1">
                  <Link
                    href="/services"
                    className="block whitespace-nowrap rounded-xl px-4 py-3 font-medium text-slate-900 hover:bg-slate-50"
                    onClick={() => setServicesOpen(false)}
                  >
                    All Services
                  </Link>

                  {serviceHubs.map((hub) => (
                    <Link
                      key={hub.route}
                      href={hub.route}
                      className="block whitespace-nowrap rounded-xl px-4 py-3 font-medium text-slate-900 hover:bg-slate-50"
                      onClick={() => setServicesOpen(false)}
                    >
                      {hub.label}
                    </Link>
                  ))}
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

          <div className="relative" ref={partnersDropdownRef}>
            {hasPartnerChildren ? (
              <>
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-slate-900"
                  onClick={() => {
                    setPartnersOpen((value) => !value);
                    setServicesOpen(false);
                  }}
                  aria-haspopup="true"
                  aria-expanded={partnersOpen}
                >
                  Partners <span className="text-slate-400">▾</span>
                </button>

                {partnersOpen && (
                  <div className="absolute left-0 top-full mt-3 w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
                    <div className="grid gap-1">
                      <Link
                        href="/partners"
                        className="block rounded-xl px-4 py-3 font-medium text-slate-900 hover:bg-slate-50"
                        onClick={() => setPartnersOpen(false)}
                      >
                        All Partners
                      </Link>

                      {partnerItems.map((partner) => (
                        <Link
                          key={partner.route}
                          href={partner.route}
                          className="block rounded-xl px-4 py-3 font-medium text-slate-900 hover:bg-slate-50"
                          onClick={() => setPartnersOpen(false)}
                        >
                          {partner.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link href="/partners" className="hover:text-slate-900">
                Partners
              </Link>
            )}
          </div>

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
          Book Consultation
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
              <span className="font-bold text-indigo-700">Strategy to Systems.</span>{" "}
              <span className="font-bold">Delivered.</span>
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
                    className="block whitespace-nowrap rounded-lg px-3 py-2 font-medium text-slate-900 hover:bg-white"
                    onClick={closeMobileMenu}
                  >
                    All Services
                  </Link>

                  {serviceHubs.map((hub) => (
                    <Link
                      key={hub.route}
                      href={hub.route}
                      className="block whitespace-nowrap rounded-lg px-3 py-2 font-medium text-slate-900 hover:bg-white"
                      onClick={closeMobileMenu}
                    >
                      {hub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/regulatory-hub" onClick={closeMobileMenu}>
              Regulatory Hub
            </Link>
            <Link href="/insights" onClick={closeMobileMenu}>
              Insights
            </Link>

            {hasPartnerChildren ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-slate-900"
                  onClick={() => setMobilePartnersOpen((value) => !value)}
                  aria-expanded={mobilePartnersOpen}
                >
                  <span>Partners</span>
                  <span className="text-slate-400">{mobilePartnersOpen ? "▴" : "▾"}</span>
                </button>

                {mobilePartnersOpen && (
                  <div className="space-y-1 border-t border-slate-200 px-3 py-3">
                    <Link
                      href="/partners"
                      className="block rounded-lg px-3 py-2 font-medium text-slate-900 hover:bg-white"
                      onClick={closeMobileMenu}
                    >
                      All Partners
                    </Link>

                    {partnerItems.map((partner) => (
                      <Link
                        key={partner.route}
                        href={partner.route}
                        className="block rounded-lg px-3 py-2 font-medium text-slate-900 hover:bg-white"
                        onClick={closeMobileMenu}
                      >
                        {partner.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link href="/partners" onClick={closeMobileMenu}>
                Partners
              </Link>
            )}

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
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
