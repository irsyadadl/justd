import sidebar from "@/resources/lib/sidebar.json"
import { goodTitle } from "@/resources/lib/utils"
import { IconArrowRight, IconPackage } from "justd-icons"
import { Link } from "next-view-transitions"
import { Heading } from "ui"

export function ListComponents() {
  return (
    <div className="[--gap:4px] gap-(--gap) columns-1 sm:columns-2 md:columns-3 lg:columns-4">
      {sidebar[3].children.map((item, index) => (
        <div
          key={index}
          className="relative p-4 bg-white mb-(--gap) rounded-xs inset-shadow-xs inset-shadow-none inset-ring-border inset-ring-1 break-inside-avoid dark:bg-[#111114] dark:inset-shadow-zinc-800 dark:inset-ring-fg/5"
        >
          <Heading
            level={2}
            className="flex gap-x-2 items-center mb-2 text-base font-semibold sm:text-base"
          >
            <IconPackage /> {goodTitle(item.title)}
          </Heading>
          <ol className="flex flex-col">
            {item.children.map((child, i) => (
              <li key={i}>
                <Link
                  href={`/${child.slug}`}
                  className="flex justify-between items-center py-1 duration-200 sm:text-sm text-muted-fg group hover:text-fg"
                >
                  <span className="flex gap-x-2 items-center">
                    {/*<IconCube /> */}
                    <span className="grid place-content-center rotate size-4.5 bg-current/10 inset-ring inset-ring-current/10 rounded-xs">
                      <span className="text-xs tabular-numbs">{i + 1}</span>
                    </span>
                    {child.title}
                  </span>
                  <IconArrowRight className="hidden group-hover:block size-4" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  )
}
