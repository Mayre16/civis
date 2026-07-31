import type { Metadata } from "next";
import { cmsFaviconUrl } from "@/lib/cms-favicon-url";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { CivisSiteChrome } from "@/components/CivisSiteChrome";
import { CivisFooter } from "@/components/CivisFooter";
import { DeferredSiteScripts } from "@/components/DeferredSiteScripts";
import { CivisCmsEditGate } from "@/components/cms/CivisCmsEditGate";
import { CmsProvider } from "@/lib/cms/provider";
import { SITE_URL } from "@/lib/site-config";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Civis Consulting — Nueva Acrópolis República Dominicana",
    template: "%s | Civis Consulting",
  },
  description:
    "Civis Consulting de Nueva Acrópolis RD: talleres para empresas y equipos sobre comunicación, convivencia y liderazgo.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Civis Consulting — Nueva Acrópolis República Dominicana",
    description:
      "Talleres para empresas y equipos sobre comunicación, convivencia y liderazgo.",
    url: SITE_URL,
    siteName: "Civis Consulting",
    locale: "es_DO",
    type: "website",
  },
  icons: { icon: [{ url: cmsFaviconUrl("civis"), type: "image/webp" }] },
  ...(gscVerification
    ? { verification: { google: gscVerification } }
    : undefined),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://editor.acropolis.adesa.com.do"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://editor.acropolis.adesa.com.do" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(window.parent!==window){document.documentElement.classList.add("cms-edit-embedded")}}catch(e){}try{var api=${JSON.stringify(
              process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/$/, "") || "",
            )};if(!api)return;var u=api+"/content/civis/published";var slot=window.__civisCmsPublished=window.__civisCmsPublished||{};if(slot.promise)return;slot.promise=new Promise(function(resolve){function boot(){fetch(u,{cache:"no-store"}).then(function(r){return r.ok?r.json():null}).then(function(d){slot.doc=d;resolve(d)}).catch(function(){resolve(null)})}if(window.requestIdleCallback)requestIdleCallback(boot,{timeout:2500});else setTimeout(boot,1)})}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${notoSans.variable} flex min-h-screen flex-col font-sans antialiased text-na-ink`}
      >
        <DeferredSiteScripts />
        <CmsProvider>
          {/* Sin Suspense alrededor del contenido: evita CSR bailout y LCP alto en móvil. */}
          <CivisCmsEditGate>
            <CivisSiteChrome>{children}</CivisSiteChrome>
            <CivisFooter />
          </CivisCmsEditGate>
        </CmsProvider>
      </body>
    </html>
  );
}
