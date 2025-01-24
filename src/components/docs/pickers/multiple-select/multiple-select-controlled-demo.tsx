"use client"

import { useListData } from "react-stately"
import type { SelectedKey } from "ui"
import { Description, MultipleSelect } from "ui"

const tags = [
  { id: 1, name: "Travel" },
  { id: 2, name: "Food" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Music" },
  { id: 5, name: "Photography" },
]

export default function MultipleSelectControlledDemo() {
  const selectedItems = useListData<SelectedKey>({
    initialItems: [],
  })

  return (
    <>
      <MultipleSelect
        className="max-w-xs"
        onItemInserted={(key) => console.info("onItemInserted", key)}
        onItemCleared={(key) => console.info("onItemCleared", key)}
        label="Select tags"
        selectedItems={selectedItems}
        items={tags}
        tag={(item) => <MultipleSelect.Tag textValue={item.name}>{item.name}</MultipleSelect.Tag>}
      >
        {(item) => {
          return (
            <MultipleSelect.Option id={item.id} textValue={item.name}>
              {item.name}
            </MultipleSelect.Option>
          )
        }}
      </MultipleSelect>
      {selectedItems.items.length > 0 && (
        <Description className="mt-2 block max-w-xs text-muted-fg [&>strong]:text-fg">
          You have selected:{" "}
          <strong>{selectedItems.items.map((item) => item.name).join(", ")}</strong>
        </Description>
      )}
    </>
  )
}
