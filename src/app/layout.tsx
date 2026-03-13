import "./globals.css";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";
import { GoogleAnalytics } from "@next/third-parties/google";
import { site } from "@/lib/site";

export const metadata = {
  title: site.defaultTitle,
  description: site.defaultDescription,
  metadataBase: new URL(site.baseUrl),
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: site.defaultTitle,
    description: site.defaultDescription,
    url: site.baseUrl,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: site.defaultTitle,
    description: site.defaultDescription,
  },
  icons: {
  icon: "/favicon.ico",
  apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body>
        {/* Consent Mode defaults must be set before Google tags run */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Default: deny analytics storage until user consents
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });
          `}
        </Script>

        <SiteHeader />
        <main>{children}</main>
        <CookieConsent />
        <SiteFooter />

        {/* Load GA only if env var is present */}
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}