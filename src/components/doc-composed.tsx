"use client"

import { usePathname } from "next/navigation"
import { Choicebox } from "ui"
import { docs } from ".source"

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
      <Choicebox gap={2} selectionMode="single" aria-label="Composed Components">
        {filteredComponents.map((item) => (
          <Choicebox.Item
            className="**:[[slot=description]]:line-clamp-2"
            key={item._file?.path}
            href={`/docs/${item._file?.path.replace(".mdx", "")}`}
            title={item.title}
            description={item.description}
          />
        ))}
      </Choicebox>
    </div>
  )
}

const getLatestOfString = (path: string): string => {
  const lastSegment = path.split("/").pop() || ""
  return lastSegment.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
}
