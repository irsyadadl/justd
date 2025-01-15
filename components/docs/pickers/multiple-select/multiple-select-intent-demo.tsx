"use client"

import { useListData } from "react-stately"
import type { SelectedKey } from "ui"
import { MultipleSelect } from "ui"

export default function MultipleSelectIntentDemo() {
  const selectedItems = useListData<SelectedKey>({
    initialItems: [fruits[0]!],
  })
  return (
    <MultipleSelect
      className="max-w-xs"
      intent="secondary"
      label="Fruits"
      selectedItems={selectedItems}
      items={fruits}
      tag={(item) => <MultipleSelect.Tag textValue={item.name}>{item.name}</MultipleSelect.Tag>}
    >
      {(item) => {
        return <MultipleSelect.Option textValue={item.name}>{item.name}</MultipleSelect.Option>
      }}
    </MultipleSelect>
  )
}

const fruits: SelectedKey[] = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
  { id: 7, name: "Grape" },
  { id: 8, name: "Honeydew" },
  { id: 9, name: "Kiwi" },
  { id: 10, name: "Lemon" },
  { id: 11, name: "Mango" },
  { id: 12, name: "Nectarine" },
  { id: 13, name: "Orange" },
  { id: 14, name: "Papaya" },
  { id: 15, name: "Quince" },
  { id: 16, name: "Raspberry" },
  { id: 17, name: "Strawberry" },
  { id: 18, name: "Tangerine" },
  { id: 19, name: "Ugli Fruit" },
  { id: 20, name: "Watermelon" },
]
