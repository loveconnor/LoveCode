import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";

const departureFont = localFont({
  src: "./DepartureMono-Regular.woff2",
  variable: "--font-departure",
});

export const metadata: Metadata = {
  title: "Freelance Hub – Contractor Control Room",
  description:
    "Coordinate freelancers and contractors, monitor live projects, and trigger payouts from a single control room.",
  icons: {
    icon: [
      { url: "/heart-favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.className} ${departureFont.variable} antialiased min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
