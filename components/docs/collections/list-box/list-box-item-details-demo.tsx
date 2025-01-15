"use client"

import { useState } from "react"

import type { Selection } from "react-aria-components"
import { ListBox } from "ui"

export default function ListBoxItemDetailsDemo() {
  const [selected, setSelected] = useState<Selection>(new Set([1]))
  return (
    <ListBox
      selectedKeys={selected}
      onSelectionChange={setSelected}
      items={roles}
      aria-label="Bands"
    >
      {(item) => (
        <ListBox.Item id={item.id}>
          <ListBox.ItemDetails label={item.name} description={item.description} />
        </ListBox.Item>
      )}
    </ListBox>
  )
}

const roles = [
  { id: 1, name: "Admin", description: "Has full access to all resources" },
  { id: 2, name: "Editor", description: "Can edit content but has limited access to settings" },
  { id: 3, name: "Viewer", description: "Can view content but cannot make changes" },
  { id: 4, name: "Contributor", description: "Can contribute content for review" },
  { id: 5, name: "Guest", description: "Limited access, mostly for viewing purposes" },
]
