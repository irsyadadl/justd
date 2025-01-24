"use client"

import { Button, Menu } from "ui"

export default function MenuItemDetailsDemo() {
  return (
    <Menu>
      <Button appearance="outline">Open</Button>
      <Menu.Content placement="bottom" items={roles}>
        {(item) => (
          <Menu.Item id={item.id} textValue={item.name}>
            <Menu.ItemDetails label={item.name} description={item.description} />
          </Menu.Item>
        )}
      </Menu.Content>
    </Menu>
  )
}

const roles = [
  { id: 1, name: "Admin", description: "Has full access to all resources" },
  { id: 2, name: "Editor", description: "Can edit content but has limited access to settings" },
  { id: 3, name: "Viewer", description: "Can view content but cannot make changes" },
  { id: 4, name: "Contributor", description: "Can contribute content for review" },
  { id: 5, name: "Guest", description: "Limited access, mostly for viewing purposes" },
]
