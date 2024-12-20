import { ListComponents } from "@/app/(app)/components/partials/list-components"
import { Header } from "@/components/header"
import { siteConfig } from "@/resources/config/site"
import type { Metadata } from "next"
import { Container } from "ui"

export const metadata: Metadata = {
  title: "Components",
  description:
    "Over 50 accessible components, neatly grouped into sections. Guaranteed usability for all!",
  metadataBase: new URL("https://getjustd.com"),
  applicationName: siteConfig.name,
  keywords: [
    "Components",
    "Justd Components",
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

export default function Page() {
  return (
    <div>
      <Header>
        <span className="text-fg">Comp</span>
        <span className="text-muted-fg">onents</span>
      </Header>
      <div className="py-10 lg:py-16 bg-muted/35">
        <Container>
          <ListComponents />
        </Container>
      </div>
    </div>
  )
}
