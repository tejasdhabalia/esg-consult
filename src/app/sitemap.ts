import { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.baseUrl;
  const now = new Date();

  const routes: { url: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { url: "/",                                                              priority: 1.0,  changeFrequency: "weekly"  },
    { url: "/services",                                                      priority: 0.9,  changeFrequency: "monthly" },
    { url: "/services/esg-advisory",                                         priority: 0.9,  changeFrequency: "monthly" },
    { url: "/services/esg-advisory/csrd-advisory",                           priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/esg-advisory/brsr-advisory",                           priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/esg-advisory/uk-climate-reporting",                    priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/marketing-automation",                                 priority: 0.9,  changeFrequency: "monthly" },
    { url: "/services/marketing-automation/crm-architecture-governance",     priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/marketing-automation/lifecycle-lead-management",       priority: 0.85, changeFrequency: "monthly" },
    { url: "/services/marketing-automation/revenue-analytics",               priority: 0.85, changeFrequency: "monthly" },
    { url: "/regulatory-hub",                                                priority: 0.85, changeFrequency: "weekly"  },
    { url: "/regulatory-hub/csrd-in-scope-and-timeline",                     priority: 0.8,  changeFrequency: "monthly" },
    { url: "/regulatory-hub/csrd-double-materiality-and-esrs-mapping",       priority: 0.8,  changeFrequency: "monthly" },
    { url: "/regulatory-hub/brsr-core-readiness-kpis-controls",              priority: 0.8,  changeFrequency: "monthly" },
    { url: "/regulatory-hub/brsr-value-chain-data-collection",               priority: 0.8,  changeFrequency: "monthly" },
    { url: "/regulatory-hub/uk-climate-governance-and-risk-management",      priority: 0.8,  changeFrequency: "monthly" },
    { url: "/regulatory-hub/uk-climate-metrics-targets-and-evidence",        priority: 0.8,  changeFrequency: "monthly" },
    { url: "/insights",                                                      priority: 0.85, changeFrequency: "weekly"  },
    { url: "/insights/csrd-readiness-first-90-days",                         priority: 0.8,  changeFrequency: "monthly" },
    { url: "/insights/marketing-governance-model-for-automation",            priority: 0.8,  changeFrequency: "monthly" },
    { url: "/about",                                                         priority: 0.75, changeFrequency: "monthly" },
    { url: "/team",                                                          priority: 0.7,  changeFrequency: "monthly" },
    { url: "/contact",                                                       priority: 0.8,  changeFrequency: "yearly"  },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${base}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
