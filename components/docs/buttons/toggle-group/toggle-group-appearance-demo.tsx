import { Separator, Toggle, ToggleGroup } from "ui"

export default function ToggleGroupAppearanceDemo() {
  return (
    <div className="flex flex-col gap-y-6">
      <ToggleGroup appearance="solid" defaultSelectedKeys={["center"]} selectionMode="single">
        <Toggle id="left">Left</Toggle>
        <Toggle id="center">Center</Toggle>
        <Toggle id="right">Right</Toggle>
      </ToggleGroup>
      <Separator />
      <ToggleGroup appearance="outline" defaultSelectedKeys={["center"]} selectionMode="single">
        <Toggle id="left">Left</Toggle>
        <Toggle id="center">Center</Toggle>
        <Toggle id="right">Right</Toggle>
      </ToggleGroup>
    </div>
  )
}
