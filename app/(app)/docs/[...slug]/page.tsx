import { DocRefs } from "@/components/doc-refs"
import { Mdx } from "@/components/mdx"
import { Pager } from "@/components/pager"
import { Toc } from "@/components/toc"
import { siteConfig } from "@/resources/config/site"
import { goodTitle } from "@/resources/lib/utils"
import { source } from "@/utils/source"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Badge } from "ui"

export interface DocPageProps {
  params: Promise<{
    slug: string[]
  }>
}

const extractSegment = (str: string): string | null => {
  const segments = str.split("/")
  return segments.length === 5 ? goodTitle(segments[3]!) : goodTitle(segments[3]!)
}

export async function generateMetadata(props: DocPageProps): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    return {}
  }

  const ogSearchParams = new URLSearchParams()
  ogSearchParams.set("title", page.data.title)

  return {
    title: page.data.title,
    description: page.data.description,
    applicationName: siteConfig.name,
    category: "Docs",
    keywords: [
      page.data.title,
      `${page.data.title} components`,
      `${page.data.title} component`,
      `${page.data.title} on React`,
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
}

export default async function Page(props: DocPageProps) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <>
      <div className="min-w-0 max-w-2xl flex-auto px-4 pt-16 pb-32 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-12">
        <main className="prose prose-blue dark:prose-invert prose-headings:mb-[0.3rem] max-w-[inherit] prose-headings:scroll-mt-24 prose-img:rounded-lg prose-pre:p-0">
          <div className="-mx-4 sm:mx-0">
            <div className="-mt-8 not-prose relative inset-shadow-xs isolate overflow-hidden p-4 ring-1 ring-fg/5 sm:mt-0 sm:rounded-xl sm:p-10 sm:ring-inset dark:ring-fg/10">
              <div
                aria-hidden="true"
                className="-top-40 sm:-top-80 -z-10 absolute inset-x-0 transform-gpu overflow-hidden blur-3xl"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="-translate-x-1/2 relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] rotate-[30deg] bg-gradient-to-tr from-cyan-500 to-blue-600 opacity-15 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:opacity-20"
                />
              </div>
              <div className="font-mono text-blue-600 text-xs uppercase dark:text-blue-400">
                {extractSegment(page.url)}
              </div>
              <h1 className="mt-2 font-semibold text-2xl tracking-tight sm:text-3xl">
                {page.data.title}
              </h1>
              {page.data.description ? (
                <p className="mt-2.5 text-pretty text-base text-fg/60 leading-relaxed">
                  {page.data.description}
                </p>
              ) : null}

              <div className="mt-6 flex items-center">
                {page.data.references && page.data.references?.length > 0 && (
                  <DocRefs references={page.data.references} />
                )}
                {page.data.status && (
                  <div className={page.data?.references?.length! > 0 ? "ml-auto" : "ml-0"}>
                    <Badge intent={page.data.status === "beta" ? "warning" : "primary"}>
                      {page.data.status}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Toc className="mt-4 block sm:mt-8 xl:hidden" items={page.data.toc} />
          <Mdx code={page.data.body} />
          <Pager className="pt-3" tree={source.pageTree} url={page.url} />
        </main>
      </div>
      <Toc className="hidden xl:block" items={page.data.toc} />
    </>
  )
}
