"use client"

import { Choicebox } from "ui"

export default function ChoiceboxColumnsDemo() {
  return (
    <div className="p-1">
      <Choicebox
        aria-label="Select prices"
        gap={2}
        columns={3}
        selectionMode="multiple"
        items={prices}
      >
        {(item) => <Choicebox.Item {...item} />}
      </Choicebox>
    </div>
  )
}

const prices = [
  { id: 1, title: "Basic", description: "Essentials, get started" },
  { id: 2, title: "Standard", description: "More features, support" },
  { id: 3, title: "Premium", description: "Advanced, growing needs" },
  { id: 4, title: "Deluxe", description: "Top-tier, maximum performance" },
  { id: 5, title: "Ultimate", description: "All-inclusive, every feature" },
  { id: 6, title: "Enterprise", description: "Custom, large-scale operations" },
]
