"use client"

import { Menu } from "ui"

export default function MenuBasicDemo() {
  return (
    <Menu>
      <Menu.Trigger>Open</Menu.Trigger>
      <Menu.Content placement="bottom">
        <Menu.Item>Inbox</Menu.Item>
        <Menu.Item>Sent</Menu.Item>
        <Menu.Item>New Message</Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
