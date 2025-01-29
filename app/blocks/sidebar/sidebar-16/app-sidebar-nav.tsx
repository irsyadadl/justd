"use client"

import { IconLayoutAlignRight } from "justd-icons"
import { Breadcrumbs, SidebarNav, SidebarTrigger } from "ui"

export default function AppSidebarNav() {
  return (
    <SidebarNav>
      <span className="flex items-center gap-x-4">
        <Breadcrumbs className="@md:flex hidden">
          <Breadcrumbs.Item href="/blocks/sidebar/sidebar-01">Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item>Newsletter</Breadcrumbs.Item>
        </Breadcrumbs>
      </span>

      <SidebarTrigger className="-mr-2 ml-auto">
        <IconLayoutAlignRight />
      </SidebarTrigger>
    </SidebarNav>
  )
}
