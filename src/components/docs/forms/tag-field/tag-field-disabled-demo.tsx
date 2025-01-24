"use client"

import { useListData } from "react-stately"
import { TagField } from "ui"

export default function TagFieldDisabledDemo() {
  const selectedItems = useListData({
    initialItems: [],
  })

  return <TagField isDisabled label="Add tag" list={selectedItems} />
}
