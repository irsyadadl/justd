import type React from "react"

import { Providers } from "@/components/providers"
import { siteConfig } from "@/resources/config/site"
import { cn } from "@/utils/classes"
import "@/resources/styles/app.css"
import { OpenPanelComponent } from "@openpanel/nextjs"
import type { Metadata, Viewport } from "next"
import { ViewTransitions } from "next-view-transitions"
import localFont from "next/font/local"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html dir="ltr" lang="en" className="scroll-smooth" suppressHydrationWarning>
        <head>
          {process.env.NODE_ENV === "production" && (
            <script
              defer
              data-site-id="getjustd.com"
              src="https://assets.onedollarstats.com/tracker.js"
            />
          )}
        </head>
        <body
          className={cn("min-h-screen font-sans antialiased", fontSans.variable, fontMono.variable)}
        >
          <Providers>
            {children}
            {process.env.NODE_ENV === "production" && (
              <OpenPanelComponent
                clientSecret={process.env.ANALYTICS_CLIENT_SECRET as string}
                clientId={process.env.ANALYTICS_CLIENT_ID as string}
                trackScreenViews={true}
                trackAttributes={true}
              />
            )}
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL("https://getjustd.com"),
  title: {
    default: `${siteConfig.name}`,
    template: `%s / ${siteConfig.name}`,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: "https://getjustd.com",
    siteName: siteConfig.name,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "./",
  },
  keywords: [
    "React",
    "Next.js",
    "Inertia.js",
    "Tailwind CSS",
    "UI Components",
    "UI Kit",
    "UI Library",
    "UI Framework",
    "Justd",
    "React Aria",
    "React Aria Components",
    "Server Components",
    "React Components",
    "Next UI Components",
    "UI Design System",
    "UI for Laravel Inertia",
    "Laravel Inertia UI",
    "Laravel Inertia Components",
    "Laravel Inertia UI Components",
    "Laravel Inertia UI Kit",
    "Laravel Inertia UI Library",
    "Laravel Inertia UI Framework",
    "Laravel Inertia Justd",
    "Laravel Justd",
    "Justd Components",
    "Justd UI Components",
    "Justd UI Kit",
    "Justd UI Library",
    "Justd UI Framework",
    "Justd Laravel Inertia",
    "Justd Laravel",
    "Justd Inertia",
  ],
  manifest: "/manifest.json",
  authors: [
    {
      name: "irsyadadl",
      url: "https://x.com/irsyadadl",
    },
  ],
  creator: "irsyadadl",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
}

const fontSans = localFont({
  src: [{ path: "./fonts/Inter.woff2" }],
  variable: "--font-sans",
})

const fontMono = localFont({
  src: [{ path: "./fonts/GeistMonoVF.woff" }, { path: "./fonts/GeistMonoVF.woff2" }],
  variable: "--font-mono",
})
