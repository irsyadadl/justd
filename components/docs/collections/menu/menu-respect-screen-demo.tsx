"use client"

import { IconDashboard, IconSettings, IconShield } from "justd-icons"
import { Button, Menu } from "ui"

export default function MenuRespectScreenDemo() {
  return (
    <Menu respectScreen={false}>
      <Button appearance="outline">Open</Button>
      <Menu.Content placement="bottom" className="min-w-48">
        <Menu.Item>
          <IconDashboard />
          <Menu.Label>Dashboard</Menu.Label>
        </Menu.Item>
        <Menu.Item>
          <IconSettings />
          <Menu.Label>Settings</Menu.Label>
        </Menu.Item>
        <Menu.Item>
          <IconShield /> <Menu.Label>Security</Menu.Label>
        </Menu.Item>
        <Menu.Item>
          <Menu.Label>Reports</Menu.Label>
        </Menu.Item>
        <Menu.Item>
          <Menu.Label>Privacy</Menu.Label>
        </Menu.Item>
        <Menu.Item>
          <Menu.Label>Help</Menu.Label>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  )
}
