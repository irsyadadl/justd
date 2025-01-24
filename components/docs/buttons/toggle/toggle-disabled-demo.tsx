"use client"

import { IconPin } from "justd-icons"
import { Toggle } from "ui"

export default function ToggleDisabledDemo() {
  return (
    <Toggle size="square-petite" isDisabled>
      <IconPin />
    </Toggle>
  )
}
