"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type RegulatoryCategory = "CSRD" | "BRSR" | "UK Climate";

export type RegulatoryContentItem = {
  slug: string;
  category: RegulatoryCategory;
  title: string;
  summary: string;
  topics: string[];
  audience: string;
  readTime: string;
  updated: string;
};

export default function RegulatoryHubClient({
  items,
}: {
  items: RegulatoryContentItem[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    RegulatoryCategory | "All"
  >("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items
      .filter((item) => (activeCategory === "All" ? true : item.category === activeCategory))
      .filter((item) => {
        if (!q) return true;
        const haystack =
          `${item.title} ${item.summary} ${item.category} ${item.topics.join(" ")} ${item.audience}`.toLowerCase();
        return haystack.includes(q);
      });
  }, [items, query, activeCategory]);

  const categories: Array<RegulatoryCategory | "All"> = ["All", "CSRD", "BRSR", "UK Climate"];

  return (
    <div>
      {/* Search + filters */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 items-end">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-slate-700">
                Search regulations and readiness topics
              </label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: double materiality, value chain, metrics and targets, evidence trail"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
              />
              <div className="mt-2 text-xs text-slate-500">
                This hub is designed to help leaders translate regulation into practical operating steps.
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="text-sm font-medium text-slate-700">Filter by regulation</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((c) => {
                  const active = c === activeCategory;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setActiveCategory(c)}
                      className={[
                        "px-3 py-2 rounded-lg text-sm border",
                        active
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/services/esg-advisory"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg font-medium text-center"
            >
              ESG advisory services
            </Link>
            <Link
              href="/contact"
              className="border px-5 py-3 rounded-lg font-medium text-center"
            >
              Discuss your reporting timeline
            </Link>
          </div>
        </div>
      </section>

      {/* Content list */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-semibold">Starter library</h2>
              <p className="mt-3 text-slate-600 max-w-3xl">
                Short, practical guides that help you decide what to do first, what to govern, and how to create evidence trails
                that leadership can rely on.
              </p>
            </div>
            <div className="text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filtered.length}</span> items
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {filtered.map((item) => (
              <Link
                key={item.slug}
                href={`/regulatory-hub/${item.slug}`}
                className="bg-white border rounded-2xl p-7 shadow-sm hover:shadow-md transition"
              >
                <div className="text-xs font-semibold text-slate-500">
                  {item.category}
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-900">
                  {item.title}
                </div>
                <p className="mt-3 text-sm text-slate-600">{item.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.topics.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 text-xs text-slate-500">
                  Audience: {item.audience}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {item.readTime} · Updated {item.updated}
                </div>

                <div className="mt-5 text-sm font-medium text-indigo-700">
                  Read guide →
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-white border rounded-2xl p-8">
            <div className="font-semibold text-slate-900">Add more content later</div>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl">
              To add a new guide, create a new page under <span className="font-medium">src/app/regulatory-hub/&lt;slug&gt;/page.tsx</span>
              and add one item to the content list in the hub page. Search and filters will work automatically.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}