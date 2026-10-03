import type { Metadata } from "next";
import Script from "next/script";
import "../assets/mizan.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mizangov.com"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Script id="mizan-language-bootstrap" strategy="beforeInteractive">{`try{if(localStorage.getItem("mizan-language")==="ar"){document.documentElement.lang="ar";document.documentElement.dir="rtl";}}catch(error){}`}</Script>
        {children}
        <Script src="/assets/mizan.js?v=20261003-netlify-form" strategy="afterInteractive" />
      </body>
    </html>
  );
}
