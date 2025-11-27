import Script from 'next/script';

export default function Document() {
    return (
        <html>
            <head>
                <title>Test</title>
                <Script type="module" src="https://cdn.jsdelivr.net/gh/fluxly-dev/fluxly@main/apps/web/client/public/fluxly-preload-script.js" strategy="afterInteractive" type="module" id="https://cdn.jsdelivr.net/gh/fluxly-dev/fluxly@main/apps/web/client/public/fluxly-preload-script.js" />
            </head>
            <body>
                <main />
                <Script
                    type="module"
                    src="https://cdn.jsdelivr.net/gh/fluxly-dev/fluxly@main/apps/web/client/public/fluxly-preload-script.js" strategy="afterInteractive" type="module" id="https://cdn.jsdelivr.net/gh/fluxly-dev/fluxly@main/apps/web/client/public/fluxly-preload-script.js"
                    id="fluxly-preload-script"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}
