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
