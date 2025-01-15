"use client"

import { docs } from "@/.source"
import { usePathname } from "next/navigation"
import { Card, Link } from "ui"

export function DocComposed({
  components,
  text,
}: { components: string[]; text?: string | React.ReactNode }) {
  const pathname = usePathname()
  const name = getLatestOfString(pathname)

  const filteredComponents = docs.filter((doc) => {
    const filename = doc._file?.path?.split("/").at(-1)?.split(".")[0]
    return components.includes(filename!)
  })
  return (
    <div className="not-prose">
      {!text ? (
        <>
          <p className="mb-6">
            When you plug this component from the CLI, it autoloads all the composed components. No
            need to toss 'em in one at a time.
          </p>
          <p className="mb-6">
            The <strong className="font-medium lowercase">{name}</strong>'s decked out with several
            components to make it bangin'.
          </p>
        </>
      ) : (
        <p className="mb-4">{text}</p>
      )}
      <div className="grid gap-2 sm:grid-cols-2">
        {filteredComponents.map((item) => (
          <Link
            className="group"
            key={item._file?.path}
            href={`/docs/${item._file?.path.replace(".mdx", "")}`}
          >
            <div className="inset-ring inset-ring-border overflow-hidden rounded-sm bg-white shadow-xs transition-colors group-data-hovered:bg-secondary/50 dark:inset-ring-fg/5 dark:inset-shadow-2xs dark:inset-shadow-fg/7 dark:bg-overlay dark:group-data-hovered:bg-muted">
              <Card.Header className="p-4">
                <Card.Title className="line-clamp-1 font-medium text-base sm:text-lg">
                  {item.title}
                </Card.Title>
                <Card.Description className="line-clamp-2 text-xs sm:text-sm">
                  {item.description}
                </Card.Description>
              </Card.Header>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const getLatestOfString = (path: string): string => {
  const lastSegment = path.split("/").pop() || ""
  return lastSegment.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
}
