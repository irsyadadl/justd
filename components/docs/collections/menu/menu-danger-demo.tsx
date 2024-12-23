"use client"

import { Menu } from "ui"

export default function MenuDangerDemo() {
  return (
    <Menu>
      <Menu.Trigger>Open</Menu.Trigger>
      <Menu.Content placement="bottom">
        <Menu.Item>View</Menu.Item>
        <Menu.Item>Edit</Menu.Item>
        <Menu.Separator />
        <Menu.Item isDanger>Delete</Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
