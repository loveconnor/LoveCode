import Script from "next/script";export default function Document() {
  return (
    <html>
            <body>
        <Script src="https://cdn.jsdelivr.net/gh/fluxly-dev/fluxly@d3887f2/apps/web/client/public/fluxly-preload-script.js" strategy="afterInteractive" type="module" id="fluxly-preload-script"></Script>
      </body>
        </html>);}