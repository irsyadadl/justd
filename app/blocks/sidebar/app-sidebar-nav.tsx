"use client"

import { IconSearch } from "justd-icons"
import { Breadcrumbs, Button, Separator, SidebarNav, SidebarTrigger } from "ui"

export default function AppSidebarNav() {
  return (
    <SidebarNav>
      <span className="flex gap-x-4 items-center">
        <SidebarTrigger className="-mx-2" />
        <Separator className="hidden h-6 @md:block" orientation="vertical" />
        <Breadcrumbs className="hidden @md:flex">
          <Breadcrumbs.Item href="/blocks/sidebar/sidebar-01">Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item>Newsletter</Breadcrumbs.Item>
        </Breadcrumbs>
      </span>

      <div className="flex gap-x-2 items-center ml-auto">
        <Button appearance="plain" aria-label="Search..." size="square-petite">
          <IconSearch />
        </Button>
      </div>
    </SidebarNav>
  )
}
