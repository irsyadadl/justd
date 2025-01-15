"use client"

import { useState } from "react"

import { ColorPicker, defaultColor } from "ui"

export default function ColorPickerWithDescriptionDemo() {
  const [color, setColor] = useState(defaultColor)
  return (
    <ColorPicker
      label="Theme Color"
      description="Snag a color for the app theme"
      value={color}
      onChange={setColor}
    />
  )
}
