"use client"

import {
  IconBrandApple,
  IconBullet,
  IconNotes,
  IconSettings,
  IconStore,
  IconWhiteboard,
} from "justd-icons"
import {
  Link,
  Sidebar,
  SidebarContent,
  SidebarDisclosure,
  SidebarDisclosureGroup,
  SidebarDisclosurePanel,
  SidebarDisclosureTrigger,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
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
        {sections.map((section, sectionIndex) => (
          <SidebarDisclosureGroup defaultExpandedKeys={[1, 2]} key={sectionIndex}>
            <SidebarDisclosure id={sectionIndex + 1}>
              <SidebarDisclosureTrigger>
                <section.icon />
                <SidebarLabel> {section.label}</SidebarLabel>
              </SidebarDisclosureTrigger>
              <SidebarDisclosurePanel>
                {section.items.map((item, itemIndex) => (
                  <SidebarItem key={itemIndex} href="#">
                    {({ isHovered }) => (
                      <>
                        <i aria-hidden className="size-4 content-center">
                          <IconBullet
                            className={`${isHovered ? "fill-sky-500 text-sky-500" : ""} m-auto size-2`}
                          />
                        </i>
                        <SidebarLabel>{item}</SidebarLabel>
                      </>
                    )}
                  </SidebarItem>
                ))}
              </SidebarDisclosurePanel>
            </SidebarDisclosure>
          </SidebarDisclosureGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

const sections = [
  {
    icon: IconNotes,
    label: "Blog",
    items: ["Articles", "Categories", "Tags", "Comments", "Authors"],
  },
  {
    icon: IconStore,
    label: "Commerce",
    items: ["Orders", "Products", "Customers", "Coupons", "Discounts"],
  },
  {
    icon: IconWhiteboard,
    label: "Analytics",
    items: ["Reports", "Traffic", "Conversions", "Audience", "Engagement"],
  },
  {
    icon: IconSettings,
    label: "Settings",
    items: ["General", "Profile", "Billing", "Notifications", "Integrations"],
  },
]
