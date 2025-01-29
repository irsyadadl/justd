import {
  IconAlignmentCenter,
  IconAlignmentJustify,
  IconAlignmentLeft,
  IconAlignmentRight,
} from "justd-icons"
import { Toggle, ToggleGroup } from "ui"

export default function ToggleGroupSelectionModeDemo() {
  return (
    <ToggleGroup defaultSelectedKeys={["center"]} selectionMode="single">
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
