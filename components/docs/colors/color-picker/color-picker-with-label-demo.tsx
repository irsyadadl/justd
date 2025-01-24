"use client"

import { useState } from "react"

import { ColorPicker, defaultColor } from "ui"

export default function ColorPickerWithLabelDemo() {
  const [color, setColor] = useState(defaultColor)
  return <ColorPicker label="Theme Color" value={color} onChange={setColor} />
}
