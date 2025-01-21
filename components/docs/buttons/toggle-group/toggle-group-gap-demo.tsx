import {
  IconAlignmentCenter,
  IconAlignmentJustify,
  IconAlignmentLeft,
  IconAlignmentRight,
} from "justd-icons"
import { Toggle, ToggleGroup } from "ui"

export default function ToggleGroupGapDemo() {
  return (
    <ToggleGroup gap={1} defaultSelectedKeys={["center"]}>
      <Toggle id="left">
        <IconAlignmentLeft /> Left
      </Toggle>
      <Toggle id="justify">
        <IconAlignmentJustify /> Justify
      </Toggle>
      <Toggle id="center">
        <IconAlignmentCenter /> Center
      </Toggle>
      <Toggle id="right">
        <IconAlignmentRight /> Right
      </Toggle>
    </ToggleGroup>
  )
}
