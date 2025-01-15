"use client"

import {
  IconBrandApple,
  IconCart,
  IconChartBar,
  IconDashboard,
  IconGear,
  IconPackage,
  IconPeople,
} from "justd-icons"
import {
  Link,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarRail,
  SidebarSection,
} from "ui"

export default function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
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
        <SidebarSection>
          {navigation.map((item, index) => (
            <SidebarItem key={index} isCurrent={item.isCurrent} href="#">
              {item.icon}
              <SidebarLabel>{item.label}</SidebarLabel>
            </SidebarItem>
          ))}
        </SidebarSection>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

const navigation = [
  { label: "Overview", icon: <IconDashboard />, isCurrent: true },
  { label: "Orders", icon: <IconCart />, isCurrent: false },
  { label: "Products", icon: <IconPackage />, isCurrent: false },
  { label: "Customers", icon: <IconPeople />, isCurrent: false },
  { label: "Reports", icon: <IconChartBar />, isCurrent: false },
  { label: "Settings", icon: <IconGear />, isCurrent: false },
]
