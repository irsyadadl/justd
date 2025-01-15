"use client"

import {
  IconCommandRegular,
  IconDashboard,
  IconHeadphones,
  IconLogout,
  IconMic,
  IconSettings,
} from "justd-icons"
import { Avatar, Button, Menu, SearchField, SidebarNav, SidebarTrigger } from "ui"

export default function AppSidebarNav() {
  return (
    <SidebarNav className="flex justify-between border-b-0 sm:mt-2">
      <SidebarTrigger />
      <div className="mx-auto flex items-center gap-x-2 sm:min-w-120">
        <SearchField className="w-full" />
        <Button size="square-petite" className="size-10" appearance="plain">
          <IconMic />
        </Button>
      </div>
      <div>
        <Menu>
          <Menu.Trigger aria-label="Open Menu">
            <Avatar alt="cobain" src="/images/avatar/cobain.jpg" />
          </Menu.Trigger>
          <Menu.Content placement="bottom" className="sm:min-w-56">
            <Menu.Section>
              <Menu.Header separator>
                <span className="block">Kurt Cobain</span>
                <span className="font-normal text-muted-fg">@cobain</span>
              </Menu.Header>
            </Menu.Section>

            <Menu.Item href="#dashboard">
              <IconDashboard />
              Dashboard
            </Menu.Item>
            <Menu.Item href="#settings">
              <IconSettings />
              Settings
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item>
              <IconCommandRegular />
              Command Menu
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item href="#contact-s">
              <IconHeadphones />
              Contact Support
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item href="#logout">
              <IconLogout />
              Log out
            </Menu.Item>
          </Menu.Content>
        </Menu>
      </div>
    </SidebarNav>
  )
}
