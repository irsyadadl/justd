import { Header } from "@/components/header"
import { siteConfig } from "@/resources/config/site"
import type { Metadata } from "next"

import { ThemeContainer } from "./partials/theme-container"

export default function Page() {
  return (
    <div>
      <Header>
        <span className="text-fg">Them</span>
        <span className="text-muted-fg">es</span>
      </Header>
      <ThemeContainer />
    </div>
  )
}

export const metadata: Metadata = {
  title: "Themes",
  description:
    "Curated themes, selected for you, ready to copy, paste, and integrate into your apps for a polished, custom look without the hassle.",
  metadataBase: new URL("https://getjustd.com"),
  applicationName: siteConfig.name,
  category: "Themes",
  twitter: {
    card: "summary_large_image",
    title: "Themes",
    description:
      "Curated themes, selected for you, ready to copy, paste, and integrate into your apps for a polished, custom look without the hassle.",
  },
  keywords: [
    "Themes",
    "Justd Themes",
    "Tailwind CSS",
    "UI Components",
    "UI Kit",
    "UI Library",
    "UI Framework",
    "Justd",
    "Next.js 15",
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
}
