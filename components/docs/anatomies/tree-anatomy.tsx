import { Collection } from "react-aria-components"
import { Tree, TreeItem } from "ui"

export default function TreeAnatomy() {
  return (
    <Tree>
      <TreeItem textValue="Item 1">
        <TreeItem.Content>
          <TreeItem.Indicator />
          <TreeItem.Checkbox />
          <TreeItem.Label>Title</TreeItem.Label>
        </TreeItem.Content>
        <Collection />
      </TreeItem>
    </Tree>
  )
}
