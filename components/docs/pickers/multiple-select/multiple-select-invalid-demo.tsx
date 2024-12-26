"use client"

import type React from "react"
import { useState } from "react"

import type { Key } from "react-aria-components"
import { useListData } from "react-stately"
import type { SelectedKey } from "ui"
import { Button, Form, MultipleSelect } from "ui"

export default function MultipleSelectInvalidDemo() {
  const [invalid, setInvalid] = useState(false)
  const selectedItems = useListData<SelectedKey>({
    initialItems: [],
  })

  function submit(e: React.FormEvent<HTMLFormElement>) {
    if (selectedItems.items.length === 0) {
      setInvalid(true)
      e.preventDefault()
      return
    }
    setInvalid(false)
  }

  function onItemInserted(key: Key) {
    setInvalid(false)
  }

  return (
    <Form className="space-y-2" onSubmit={submit}>
      <MultipleSelect
        className="max-w-xs"
        label="Fruits"
        selectedItems={selectedItems}
        items={fruits}
        isInvalid={invalid}
        onItemInserted={onItemInserted}
        tag={(item) => <MultipleSelect.Tag textValue={item.name}>{item.name}</MultipleSelect.Tag>}
      >
        {(item) => {
          return <MultipleSelect.Option textValue={item.name}>{item.name}</MultipleSelect.Option>
        }}
      </MultipleSelect>
      {invalid && (
        <div className="text-danger text-sm forced-colors:text-[Mark]">
          Please fill out this field.
        </div>
      )}
      <Button type="submit">Submit</Button>
    </Form>
  )
}

const fruits: SelectedKey[] = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
  { id: 4, name: "Date" },
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
