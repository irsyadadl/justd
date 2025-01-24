"use client"

import { useListData } from "react-stately"
import type { SelectedKey } from "ui"
import { MultipleSelect } from "ui"

export default function MultipleSelectDisabledDemo() {
  const selectedItems = useListData<SelectedKey>({
    initialItems: [],
  })
  return (
    <MultipleSelect
      isDisabled
      className="max-w-xs"
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

const fruits: SelectedKey[] = [{ id: 1, name: "Apple" }]
