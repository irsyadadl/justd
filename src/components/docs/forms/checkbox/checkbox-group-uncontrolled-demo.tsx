"use client"

import { Checkbox, CheckboxGroup } from "ui"

export default function CheckboxGroupUncontrolledDemo() {
  return (
    <CheckboxGroup defaultValue={["sound", "wifi"]} label="Options">
      <Checkbox value="sound">Sound</Checkbox>
      <Checkbox value="wifi">Wi-Fi</Checkbox>
      <Checkbox value="sync">Sync</Checkbox>
    </CheckboxGroup>
  )
}
