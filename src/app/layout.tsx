import "./globals.css";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";
import AttributionCapture from "@/components/AttributionCapture";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
        {/*
          Consent Mode defaults. Must run before any Google tag.

          This also RESTORES a previously saved choice. Without that, a
          returning visitor who accepted would still have their first page
          view of every session recorded as denied, because the React banner
          only re-applies consent after hydration, which is well after GA has
          loaded and sent its first event.

          Reading localStorage here is safe: it is synchronous and the value
          is our own, written by CookieConsent.tsx under the same key.
        */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            var dsAnalytics = 'denied';
            try {
              var dsRaw = localStorage.getItem('ds_consent_v1');
              if (dsRaw) {
                var dsSaved = JSON.parse(dsRaw);
                if (dsSaved && dsSaved.decided && dsSaved.analytics) {
                  dsAnalytics = 'granted';
                }
              }
            } catch (e) {}

            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: dsAnalytics
            });
          `}
        </Script>

        {/* Records landing page and referrer on the first page view.
            Not gated behind consent: read only when the visitor submits
            the enquiry form themselves. */}
        <AttributionCapture />

        <SiteHeader />
        <main>{children}</main>
        <CookieConsent />
        <SiteFooter />

        {/* Load GA only if env var is present */}
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}

        {/* Real-device Core Web Vitals. Cookieless, so unaffected by consent. */}
        <SpeedInsights />
      </body>
    </html>
  );
}