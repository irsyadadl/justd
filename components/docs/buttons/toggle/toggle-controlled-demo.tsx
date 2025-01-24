"use client"

import { useState } from "react"

import { IconPin, IconUnpin } from "justd-icons"
import { Toggle } from "ui"

export default function ToggleControlledDemo() {
  const [isSelected, setSelected] = useState(false)
  return (
    <Toggle size="square-petite" isSelected={isSelected} onChange={setSelected}>
      {({ isSelected }) => <>{isSelected ? <IconUnpin /> : <IconPin />}</>}
    </Toggle>
  )
}
