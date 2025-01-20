import type React from "react"

import { Providers } from "@/components/providers"
import { siteConfig } from "@/resources/config/site"
import { cn } from "@/utils/classes"
import "@/resources/styles/app.css"
import { OpenPanelComponent } from "@openpanel/nextjs"
import type { Metadata, Viewport } from "next"
import { ViewTransitions } from "next-view-transitions"
import { Geist_Mono, Inter } from "next/font/google"
import { twJoin } from "tailwind-merge"
import { Toast } from "ui"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html
        dir="ltr"
        lang="en"
        className={twJoin("scroll-smooth", fontSans.variable, fontMono.variable)}
        suppressHydrationWarning
      >
        <body className={cn("min-h-screen font-sans antialiased")}>
          <Providers>
            <Toast />
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

const fontSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})
