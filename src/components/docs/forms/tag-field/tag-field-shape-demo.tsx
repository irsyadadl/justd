"use client"

import { useListData } from "react-stately"
import { TagField } from "ui"

export default function TagFieldShapeDemo() {
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
    ],
  })

  return <TagField shape="circle" className="max-w-xs" label="Add tag" list={selectedItems} />
}
