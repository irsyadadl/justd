"use client"

import { Menu } from "ui"

export default function MenuDisabledDemo() {
  return (
    <Menu>
      <Menu.Trigger>Open</Menu.Trigger>
      <Menu.Content placement="bottom">
        <Menu.Item id="view">View</Menu.Item>
        <Menu.Item id="edit">Edit</Menu.Item>
        <Menu.Item id="gsu" isDisabled>
          Generate Short URL
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
