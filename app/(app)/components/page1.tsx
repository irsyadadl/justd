import { Thumbnail } from "@/app/(app)/components/(partials)/thumbnail"
import { Header } from "@/components/header"
import { siteConfig } from "@/resources/config/site"
import { source } from "@/utils/source"
import type { Metadata } from "next"
import { Link } from "next-view-transitions"
import { Container, Heading } from "ui"

export default function Page1() {
  const components =
    (source.pageTree as any).children?.[0]?.children?.find(
      (item: any) => item.name === "Components",
    )?.children || []
  return (
    <div>
      <Header>
        <span className="text-fg tracking-tight">Comp</span>
        <span className="text-muted-fg tracking-tight">onents</span>
      </Header>
      <div className="bg-muted/35 py-10 lg:py-16">
        <Container>
          <div className="grid gap-x-6 gap-y-12">
            {components.map((item: ComponentProps, index: number) => (
              <div key={index} className="grid gap-2">
                <Heading
                  level={2}
                  className="mb-2 flex items-center gap-x-2 font-semibold text-base sm:text-base"
                >
                  {item.name}
                </Heading>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {item?.children?.map((child: ComponentProps, i: number) => (
                    <div className="rounded-xl border bg-bg p-4 shadow-xs" key={i}>
                      <Link href={child.url} className="" aria-label={child.name}>
                        <Thumbnail name={child.url.split("/").pop() as string} />
                        <h3 className="font-mono text-xs uppercase">{child.name}</h3>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  )
}

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

interface ComponentProps {
  name: string
  url: string
  children?: {
    name: string
    url: string
  }[]
}
