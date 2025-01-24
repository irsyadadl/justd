"use client"

import { Toggle } from "ui"

export default function ToggleShapeDemo() {
  return (
    <Toggle appearance="outline" shape="circle">
      {({ isSelected }) => <>{isSelected ? "Disabled" : "Enabled"}</>}
    </Toggle>
  )
}
