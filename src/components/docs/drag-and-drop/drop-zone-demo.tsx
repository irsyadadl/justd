"use client"

import { useState } from "react"

import { DropZone, Label } from "ui"

export default function DropZoneDemo() {
  const [dropped, setDropped] = useState(false)

  return (
    <DropZone onDrop={() => setDropped(true)}>
      <Label>{dropped ? "Drop nailed" : "Toss your stuff here"}</Label>
    </DropZone>
  )
}
