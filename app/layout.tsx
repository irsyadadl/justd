import type React from "react"

import { Providers } from "@/components/providers"
import { siteConfig } from "@/resources/config/site"
import { cn } from "@/utils/classes"
import "@/resources/styles/app.css"
import { OpenPanelComponent } from "@openpanel/nextjs"
import type { Metadata, Viewport } from "next"
import { ViewTransitions } from "next-view-transitions"
import { Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import { twJoin } from "tailwind-merge"
import { Toast } from "ui"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const js = String.raw
  return (
    <ViewTransitions>
      <html
        dir="ltr"
        lang="en"
        className={twJoin("scroll-smooth", fontSans.variable, fontMono.variable)}
        suppressHydrationWarning
      >
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: js`
              try {
                _updateTheme(localStorage.currentTheme)
              } catch (_) {}

              try {
                if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
                  document.documentElement.classList.add('os-macos')
                }
              } catch (_) {}

              function _updateTheme(theme) {
                let classList = document.documentElement.classList;

                classList.remove("light", "dark", "system");
                document.querySelectorAll('meta[name="theme-color"]').forEach(el => el.remove())
                if (theme === 'dark') {
                  classList.add('dark')

                  let meta = document.createElement('meta')
                  meta.name = 'theme-color'
                  meta.content = 'oklch(.13 .028 261.692)'
                  document.head.appendChild(meta)
                } else if (theme === 'light') {
                  classList.add('light')

                  let meta = document.createElement('meta')
                  meta.name = 'theme-color'
                  meta.content = 'white'
                  document.head.appendChild(meta)
                } else {
                  classList.add('system')

                  let meta1 = document.createElement('meta')
                  meta1.name = 'theme-color'
                  meta1.content = 'oklch(.13 .028 261.692)'
                  meta1.media = '(prefers-color-scheme: dark)'
                  document.head.appendChild(meta1)

                  let meta2 = document.createElement('meta')
                  meta2.name = 'theme-color'
                  meta2.content = 'white'
                  meta2.media = '(prefers-color-scheme: light)'
                  document.head.appendChild(meta2)
                }
              }
            `,
            }}
          />
        </head>
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

const fontSans = localFont({
  src: [
    { path: "./fonts/InterVariable.woff2", weight: "100 900", style: "normal" },
    {
      path: "./fonts/InterVariable-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-inter",
})

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})
