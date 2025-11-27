import Script from 'next/script';
import React from 'react';
export default function Layout() {
  return (
    <html>
            <head>
                <Script src="https://example.com/other.js" />
            </head>
            <body>
                <main />
            
        <Script src="https://cdn.jsdelivr.net/gh/fluxly-dev/fluxly@d3887f2/apps/web/client/public/fluxly-preload-script.js" strategy="afterInteractive" type="module" id="fluxly-preload-script"></Script>
      </body>
        </html>);}