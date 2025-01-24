"use client"

import { Toggle } from "ui"

export default function ToggleDemo() {
  return <Toggle>{({ isSelected }) => <>{isSelected ? "Unpin" : "Pin"}</>}</Toggle>
}
