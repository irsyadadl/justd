import { useListData } from "react-stately"
import { MultipleSelect, type SelectedKey } from "ui"

export default function MultipleSelectAnatomy() {
  const selectedItems = useListData<SelectedKey>({ initialItems: [] })
  return (
    <MultipleSelect
      className="max-w-xs"
      label="Fruits"
      selectedItems={selectedItems}
      items={[
        { id: 1, name: "Apple" },
        { id: 2, name: "Banana" },
      ]}
      tag={(item) => <MultipleSelect.Tag textValue={item.name}>{item.name}</MultipleSelect.Tag>}
    >
      {(item) => {
        return <MultipleSelect.Option textValue={item.name}>{item.name}</MultipleSelect.Option>
      }}
    </MultipleSelect>
  )
}
