"use client"

import { parseDate } from "@internationalized/date"
import { IconBrandApple } from "justd-icons"
import {
  Link,
  RangeCalendar,
  SearchField,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarLabel,
  SidebarRail,
  SidebarSection,
  SidebarSectionGroup,
  useSidebar,
} from "ui"

export default function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          className="flex items-center gap-x-2 group-data-[collapsible=dock]:size-10 group-data-[collapsible=dock]:justify-center"
          href="/docs/2.x/components/layouts/sidebar"
        >
          <IconBrandApple className="size-5" />
          <SidebarLabel className="font-medium">Apple</SidebarLabel>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSectionGroup>
          {state !== "collapsed" && (
            <SidebarSection className="pt-1">
              <SearchField className="col-span-full mb-6" />
              <RangeCalendar
                defaultValue={{
                  start: parseDate(`${new Date().getFullYear()}-02-03`),
                  end: parseDate(`${new Date().getFullYear()}-02-12`),
                }}
              />
            </SidebarSection>
          )}
        </SidebarSectionGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
