import sidebar from "@/resources/lib/sidebar.json"
import { goodTitle } from "@/resources/lib/utils"
import { IconArrowRight, IconPackage } from "justd-icons"
import { Link } from "next-view-transitions"
import { Heading } from "ui"

export function ListComponents() {
  return (
    <div className="columns-1 gap-(--gap) [--gap:4px] sm:columns-2 md:columns-3 lg:columns-4">
      {sidebar[3].children.map((item, index) => (
        <div
          key={index}
          className="relative inset-ring-1 inset-ring-border inset-shadow-none inset-shadow-xs mb-(--gap) break-inside-avoid rounded-xs bg-white p-4 dark:inset-ring-fg/5 dark:inset-shadow-zinc-800 dark:bg-[#111114]"
        >
          <Heading
            level={2}
            className="mb-2 flex items-center gap-x-2 font-semibold text-base sm:text-base"
          >
            <IconPackage /> {goodTitle(item.title)}
          </Heading>
          <ol className="flex flex-col">
            {item.children.map((child, i) => (
              <li key={i}>
                <Link
                  href={`/${child.slug}`}
                  className="group flex items-center justify-between py-1 text-muted-fg duration-200 hover:text-fg sm:text-sm"
                >
                  <span className="flex items-center gap-x-2">
                    {/*<IconCube /> */}
                    <span className="rotate inset-ring inset-ring-current/10 grid size-4.5 place-content-center rounded-xs bg-current/10">
                      <span className="tabular-numbs text-xs">{i + 1}</span>
                    </span>
                    {child.title}
                  </span>
                  <IconArrowRight className="hidden size-4 group-hover:block" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  )
}
