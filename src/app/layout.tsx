import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import CookieConsent from "@/components/CookieConsent";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/lib/site";

export const metadata = {
  title: site.defaultTitle,
  description: site.defaultDescription,
  metadataBase: new URL(site.baseUrl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <CookieConsent />
        <SiteFooter />
      </body>
    </html>
  );
}