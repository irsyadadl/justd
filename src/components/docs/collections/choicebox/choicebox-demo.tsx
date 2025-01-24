"use client"

import { Choicebox } from "ui"

export default function ChoiceboxDemo() {
  return (
    <Choicebox aria-label="Select items" selectionMode="multiple">
      <Choicebox.Item title="Basic" description="Just the essentials to get started." />
      <Choicebox.Item title="Standard" description="A step up with more features and support." />
      <Choicebox.Item title="Premium" description="Advanced options for growing needs." />
      <Choicebox.Item title="Deluxe" description="Top-tier features for maximum performance." />
      <Choicebox.Item
        title="Ultimate"
        description="All-inclusive plan with every feature available."
      />
      <Choicebox.Item
        title="Enterprise"
        description="Custom solutions for large-scale operations."
      />
    </Choicebox>
  )
}
