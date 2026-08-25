import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Uncomment to skip ESLint during builds:
  // eslint: { ignoreDuringBuilds: true },

  /**
   * Permanent (301) redirects.
   *
   * Add a new entry here whenever a public route is renamed or retired.
   * Never delete a route without leaving a redirect behind it: old links in
   * email, LinkedIn posts and search results keep working for years.
   */
  async redirects() {
    return [
      // Service line renamed to match the six-line structure.
      {
        source: "/services/marketing-automation",
        destination: "/services/crm-and-revenue-operations",
        permanent: true,
      },
      // The three child pages move with it. ":slug" forwards whatever
      // follows, so crm-architecture-governance, lifecycle-lead-management
      // and revenue-analytics are all covered by this one rule.
      {
        source: "/services/marketing-automation/:slug",
        destination: "/services/crm-and-revenue-operations/:slug",
        permanent: true,
      },
      // AI service line renamed. The page now covers governance as well as
      // adoption, which is where the demand actually is.
      {
        source: "/services/ai-in-operations",
        destination: "/services/ai-governance-and-adoption",
        permanent: true,
      },
      // Two AI governance pages existed and were separately indexed, which
      // split authority between them. The service actually sold is "AI
      // governance and adoption", so that page is the target and the older
      // audit page redirects into it. Brief 2, Task 1 (SEO project).
      // The four week audit structure was folded into the target page as a
      // phased engagement block before this redirect went in, so nothing
      // was lost. Expect a few weeks of position noise while Google
      // reprocesses. That is normal and not a reason to reverse it.
      {
        source: "/services/ai-governance",
        destination: "/services/ai-governance-and-adoption",
        permanent: true,
      },
      // Case studies page retired. Placeholder engagements were published
      // without named client permission, so the page was removed rather
      // than rewritten. Restore a real page here when permission exists.
      {
        source: "/case-studies",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
