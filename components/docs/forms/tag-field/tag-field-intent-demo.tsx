"use client"

import { useListData } from "react-stately"
import { TagField } from "ui"

export default function TagFieldIntentDemo() {
  const selectedItems = useListData({
    initialItems: [
      {
        id: 1,
        name: "Laravel",
      },
      {
        id: 2,
        name: "Inertia.js",
      },
      {
        id: 3,
        name: "React",
      },
      {
        id: 4,
        name: "Tailwind CSS",
      },
    ],
  })

  return (
    <TagField intent="secondary" className="max-w-xs" aria-label="Add tag" list={selectedItems} />
  )
}
