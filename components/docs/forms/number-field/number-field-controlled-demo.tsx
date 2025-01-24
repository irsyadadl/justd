"use client"

import { useState } from "react"

import { Description, NumberField } from "ui"

export default function NumberFieldControlledDemo() {
  const [number, setNumber] = useState(1280)
  return (
    <div>
      <NumberField label="Width" value={number} onChange={setNumber} />

      <Description className="mt-2 block [&>strong]:text-fg">
        You have typed: <strong>{number ?? "-"}</strong>
      </Description>
    </div>
  )
}
