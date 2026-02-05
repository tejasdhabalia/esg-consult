import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://example-esg.vercel.app"), // replace after deploy
  title: {
    default: "ESG Advisory for Listed Companies | CSRD · UK Climate/ISSB · BRSR",
    template: "%s | YourCo ESG Advisory",
  },
  description:
    "Independent ESG consultancy for EU/UK & India—CSRD/ESRS, UK climate/ISSB, and BRSR advisory. Scoping, double materiality, controls, and audit-readiness.",
  alternates: {
    canonical: "/",
    languages: {
      "en-gb": "/",
      "en-in": "/",
    },
  },
  openGraph: {
    title: "YourCo ESG Advisory",
    description:
      "ESG advisory for EU/UK & India listed companies: CSRD/ESRS, UK climate/ISSB, BRSR.",
    url: "https://example-esg.vercel.app",
    siteName: "YourCo ESG Advisory",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YourCo ESG Advisory",
    description:
      "ESG advisory for EU/UK & India listed companies: CSRD/ESRS, UK climate/ISSB, BRSR.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900">
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}