"use client"

import { IconHashtag, IconHeadphones, IconLogout, IconPlus, IconSettings } from "justd-icons"
import { Avatar, Menu } from "ui"

export default function MenuWithArrowDemo() {
  return (
    <>
      <Menu>
        <Menu.Trigger aria-label="Open Menu">
          <Avatar src="/images/avatar/cobain.jpg" />
        </Menu.Trigger>
        <Menu.Content placement="bottom" showArrow className="sm:min-w-54">
          <Menu.Section>
            <Menu.Header separator>
              <span className="block">Irsyad A. Panjaitan</span>
              <span className="font-normal text-muted-fg">@irsyadadl</span>
            </Menu.Header>
          </Menu.Section>
          <Menu.Item>
            <IconSettings />
            Settings
          </Menu.Item>
          <Menu.Item href="#">
            <IconPlus />
            Create Team
          </Menu.Item>
          <Menu.Item href="#">
            <IconHashtag />
            Command Menu
            <Menu.Keyboard keys="⌘K" />
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item href="#">
            <IconHeadphones />
            Contact Support
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item>
            <IconLogout />
            Log out
          </Menu.Item>
        </Menu.Content>
      </Menu>
    </>
  )
}
