"use client"

import { Toggle } from "ui"

export default function ToggleAppearanceDemo() {
  return (
    <div className="flex gap-2">
      <Toggle>{({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}</Toggle>
      <Toggle appearance="outline">
        {({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}
      </Toggle>
      <Toggle appearance="solid">{({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}</Toggle>
    </div>
  )
}
