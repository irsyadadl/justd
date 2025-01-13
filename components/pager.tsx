"use client"

import { cn } from "@/utils/classes"
import { type PageTree, findNeighbour } from "fumadocs-core/server"
import { IconChevronLgLeft, IconChevronLgRight } from "justd-icons"
import { Link } from "next-view-transitions"

export const Pager = ({
  tree,
  url,
  className,
}: { tree: PageTree.Root; url: string; className?: string }) => {
  const neighbours = findNeighbour(tree, url)

  return (
    <div className={cn("not-prose flex w-full justify-between gap-3", className)}>
      {neighbours.previous && (
        <div className="group w-full">
          <Link className="inline-flex justify-start" href={neighbours.previous.url}>
            <div>
              <div className="flex items-center gap-1 text-muted-fg">
                <IconChevronLgLeft className="group-hover:-translate-x-2 size-3.5 transition-transform" />
                Previous
              </div>
              <span className="text-fg">{neighbours.previous.name}</span>
            </div>
          </Link>
        </div>
      )}

      {neighbours.next && (
        <div className="group">
          <Link className="inline-flex justify-end" href={neighbours.next.url}>
            <div>
              <div className="flex items-center justify-end gap-1 text-right text-muted-fg">
                Next
                <IconChevronLgRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <span className="text-fg">{neighbours.next.name}</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}
