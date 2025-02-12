"use client"

import { useState } from "react"

import { parseColor } from "@react-stately/color"
import { ColorPicker } from "ui"

export default function ColorPickerEyeDropperDemo() {
  const [color, setColor] = useState(parseColor("#0d6efd"))
  return <ColorPicker eyeDropper label="Color Picker" value={color} onChange={setColor} />
}
