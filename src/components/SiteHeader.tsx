"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { llmsManifest } from "@/generated/llms-manifest";

type ServicePage = (typeof llmsManifest.pages)[number];

type ServiceGroup = {
  hubRoute: string;
  hubLabel: string;
  hubDescription: string;
  accentClass: string;
  children: Array<{
    route: string;
    label: string;
  }>;
};

function cleanTitle(title: string) {
  return title.replace(/\s*\|\s*DS Consulting$/, "").trim();
}

function routeDepth(route: string) {
  return route.split("/").filter(Boolean).length;
}

function serviceLabelFromRoute(route: string, fallbackTitle: string) {
  const routeLabelMap: Record<string, string> = {
    "/services": "All Services",
    "/services/esg-advisory": "ESG and Sustainability",
    "/services/esg-advisory/carbon-accounting": "Carbon Accounting",
    "/services/esg-advisory/csrd-advisory": "CSRD and ESRS Advisory",
    "/services/esg-advisory/brsr-advisory": "BRSR Advisory",
    "/services/esg-advisory/uk-climate-reporting": "UK Climate Reporting",
    "/services/esg-advisory/ecovadis-readiness": "EcoVadis Readiness",
    "/services/marketing-automation": "Marketing Automation and RevOps",
    "/services/marketing-automation/crm-architecture-governance": "CRM Architecture and Governance",
    "/services/marketing-automation/lifecycle-lead-management": "Lifecycle and Lead Management",
    "/services/marketing-automation/revenue-analytics": "Revenue Analytics and Measurement",
  };

  return routeLabelMap[route] || cleanTitle(fallbackTitle);
}

function buildServiceGroups(): ServiceGroup[] {
  const servicePages = llmsManifest.pages
    .filter((page) => page.section === "services")
    .sort((a, b) => a.route.localeCompare(b.route));

  const hubs = servicePages.filter((page) => routeDepth(page.route) === 2 && page.route !== "/services");

  const hubMeta: Record<
    string,
    { label: string; description: string; accentClass: string }
  > = {
    "/services/esg-advisory": {
      label: "ESG and Sustainability",
      description: "Carbon accounting, CSRD, BRSR, EcoVadis, UK climate reporting",
      accentClass: "text-emerald-700",
    },
    "/services/marketing-automation": {
      label: "Marketing Automation and RevOps",
      description: "CRM governance, lifecycle, automation, revenue analytics",
      accentClass: "text-indigo-700",
    },
  };

  return hubs.map((hub) => {
    const children = servicePages
      .filter((page) => page.route.startsWith(`${hub.route}/`) && routeDepth(page.route) === 3)
      .sort((a, b) => a.route.localeCompare(b.route))
      .map((page) => ({
        route: page.route,
        label: serviceLabelFromRoute(page.route, page.title),
      }));

    return {
      hubRoute: hub.route,
      hubLabel: hubMeta[hub.route]?.label || serviceLabelFromRoute(hub.route, hub.title),
      hubDescription:
        hubMeta[hub.route]?.description || cleanTitle(hub.description),
      accentClass: hubMeta[hub.route]?.accentClass || "text-slate-900",
      children,
    };
  });
}

export default function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const serviceGroups = useMemo(() => buildServiceGroups(), []);

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
          <Image
            src="/brand/DSConsulting-mark.png"
            alt="DS Consulting logo"
            width={34}
            height={34}
            priority
          />

          <span className="text-xl font-semibold text-slate-900">
            DS Consulting
          </span>

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

          {/* Services dropdown */}
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
              <div className="absolute left-0 top-full mt-3 w-[720px] max-w-[calc(100vw-2rem)] max-h-[75vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-lg p-4">
                <Link
                  href="/services"
                  className="block rounded-xl px-4 py-3 hover:bg-slate-50"
                  onClick={() => setServicesOpen(false)}
                >
                  <div className="font-medium text-slate-900">All Services</div>
                  <div className="text-xs text-slate-500">
                    Explore all consulting pillars and service pathways
                  </div>
                </Link>

                <div className="my-3 border-t border-slate-100" />

                <div className="grid grid-cols-2 gap-4">
                  {serviceGroups.map((group) => (
                    <div
                      key={group.hubRoute}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <Link
                        href={group.hubRoute}
                        className="block"
                        onClick={() => setServicesOpen(false)}
                      >
                        <div className={`font-semibold ${group.accentClass}`}>
                          {group.hubLabel}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          {group.hubDescription}
                        </div>
                      </Link>

                      {group.children.length > 0 && (
                        <div className="mt-4 grid gap-2">
                          {group.children.map((child) => (
                            <Link
                              key={child.route}
                              href={child.route}
                              className="text-sm text-slate-700 hover:text-slate-900"
                              onClick={() => setServicesOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
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
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 text-sm">
            <div className="text-xs font-semibold text-slate-700">
              <span className="text-indigo-700 font-bold">Strategy to Systems.</span>{" "}
              <span className="font-bold">Delivered.</span>
            </div>

            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <div className="pt-2">
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-3">
                Services
              </div>

              <div className="grid gap-4">
                <Link href="/services" onClick={() => setMobileOpen(false)}>
                  All Services
                </Link>

                {serviceGroups.map((group) => (
                  <div key={group.hubRoute} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <Link
                      href={group.hubRoute}
                      className={`font-semibold ${group.accentClass}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {group.hubLabel}
                    </Link>
                    <div className="mt-1 text-xs text-slate-500">
                      {group.hubDescription}
                    </div>

                    {group.children.length > 0 && (
                      <div className="mt-3 grid gap-2">
                        {group.children.map((child) => (
                          <Link
                            key={child.route}
                            href={child.route}
                            className="text-sm text-slate-700"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/regulatory-hub" onClick={() => setMobileOpen(false)}>
              Regulatory Hub
            </Link>
            <Link href="/insights" onClick={() => setMobileOpen(false)}>
              Insights
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