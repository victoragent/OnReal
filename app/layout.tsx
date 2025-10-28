import type { Metadata } from "next";
import "./globals.css";
import { primaryFont } from "./fonts";
import { PreferencesProvider } from "./providers";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "OnReal | Operating System for Real World Assets",
  description: "Build compliant, composable RWA products faster with OnReal's modular APIs and tooling.",
  openGraph: {
    title: "OnReal | Operating System for Real World Assets",
    description: "Build compliant, composable RWA products faster with OnReal's modular APIs and tooling.",
    url: "https://onreal.example.com",
    siteName: "OnReal",
    images: [
      {
        url: "https://onreal.example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "OnReal platform preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "OnReal | Operating System for Real World Assets",
    description: "Build compliant, composable RWA products faster with OnReal's modular APIs and tooling.",
    images: ["https://onreal.example.com/og-image.png"]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      id="root-html"
      data-theme="dark"
      className={primaryFont.variable}
      suppressHydrationWarning
    >
      <body id="root-body">
        <PreferencesProvider>
          {children}
        </PreferencesProvider>
      </body>
    </html>
  );
}
