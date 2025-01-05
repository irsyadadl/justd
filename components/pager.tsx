import { type PageTree, findNeighbour } from "fumadocs-core/server"
import { IconChevronLeft, IconChevronRight } from "justd-icons"
import Link from "next/link"
import { Button } from "ui"

export const Pager = ({ tree, url }: { tree: PageTree.Root; url: string }) => {
  const neighbours = findNeighbour(tree, url)

  return (
    <div className="flex w-full justify-between gap-3">
      {neighbours.previous && (
        <Link className="w-full" href={neighbours.previous.url}>
          <Button appearance="outline" className={"size-full justify-start p-4"}>
            <div>
              <div className="flex items-center gap-px text-muted-fg">
                <IconChevronLeft className="size-5" />
                Previous
              </div>
              {neighbours.previous.name}
            </div>
          </Button>
        </Link>
      )}

      {neighbours.next && (
        <Link className="w-full" href={neighbours.next.url}>
          <Button appearance="outline" className={"size-full justify-end p-4"}>
            <div>
              <div className="flex items-center gap-px text-muted-fg">
                Next
                <IconChevronRight className="size-5" />
              </div>
              {neighbours.next.name}
            </div>
          </Button>
        </Link>
      )}
    </div>
  )
}
