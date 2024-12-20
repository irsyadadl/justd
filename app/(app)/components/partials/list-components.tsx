import sidebar from "@/resources/lib/sidebar.json"
import { goodTitle } from "@/resources/lib/utils"
import { IconArrowRight, IconCube, IconPackage } from "justd-icons"
import { Link } from "next-view-transitions"
import { Heading } from "ui"

export function ListComponents() {
  return (
    <div className="gap-1 columns-1 sm:columns-2 md:columns-3 lg:columns-4">
      {sidebar[3].children.map((item, index) => (
        <div key={index} className="p-4 mb-1 rounded-lg border break-inside-avoid">
          <Heading
            level={2}
            className="flex gap-x-2 items-center mb-2 text-base font-semibold sm:text-base"
          >
            <IconPackage /> {goodTitle(item.title)}
          </Heading>
          <ul className="flex flex-col">
            {item.children.map((child, i) => (
              <li key={i}>
                <Link
                  href={`/${child.slug}`}
                  className="flex justify-between items-center py-1 duration-200 sm:text-sm text-muted-fg group hover:text-fg"
                >
                  <span className="flex gap-x-2 items-center">
                    <IconCube /> {child.title}
                  </span>
                  <IconArrowRight className="hidden group-hover:block size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
