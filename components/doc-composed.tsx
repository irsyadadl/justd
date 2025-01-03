"use client"

import { cn } from "@/utils/classes"
import { usePathname } from "next/navigation"
import { Card, Link } from "ui"
import { docs } from "#site/content"

const simplifiedDocs = docs.map(({ title, slug, description }) => ({ title, slug, description }))

export function DocComposed({
  components,
  text,
}: { components: string[]; text?: string | React.ReactNode }) {
  const pathname = usePathname()
  const name = getLatestOfString(pathname)
  const filteredComponents = simplifiedDocs.filter((component) => {
    const lastSegment = component.slug.split("/").pop()
    return components.includes(lastSegment || "")
  })
  return (
    <div className="not-prose">
      {!text ? (
        <>
          <p className="mb-6">
            Plug this component into the CLI, and it automatically loads all the included
            components. No need to add them individually.
          </p>
          <p className="mb-6">
            The <strong className="font-medium text-fg lowercase">{name}</strong> comes packed with
            a variety of components to make it stand out.
          </p>
        </>
      ) : (
        <p className="mb-4">{text}</p>
      )}
      <div
        className={cn(
          "grid gap-2",
          filteredComponents.length === 1 ? "grid-cols-1" : "grid-cols-2",
        )}
      >
        {filteredComponents.map((item) => (
          <div className="relative" key={item.slug}>
            <Link
              aria-label={`Open ${item.title}`}
              rel="noopener noreferrer"
              href={`/${item.slug}`}
              className="peer absolute inset-0 size-full rounded-lg"
            />
            <Card className="overflow-hidden transition-colors peer-hover:bg-secondary/30">
              <Card.Header className="p-4">
                <Card.Title className="line-clamp-1 font-medium text-base sm:text-lg">
                  {item.title}
                </Card.Title>
                <Card.Description className="line-clamp-2 text-xs sm:text-sm">
                  {item.description}
                </Card.Description>
              </Card.Header>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

const getLatestOfString = (path: string): string => {
  const lastSegment = path.split("/").pop() || ""
  return lastSegment.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
}
