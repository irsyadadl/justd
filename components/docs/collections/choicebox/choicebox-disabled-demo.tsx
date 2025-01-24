"use client"

import { Choicebox } from "ui"

export default function ChoiceboxDisabledDemo() {
  return (
    <div className="p-1">
      <Choicebox aria-label="Select packages" selectionMode="multiple" items={packages}>
        {(item) => <Choicebox.Item isDisabled={["sm", "lg"].includes(item.id)} {...item} />}
      </Choicebox>
    </div>
  )
}

const packages = [
  {
    id: "sm",
    title: "Small",
    description: "Perfect for beginners. Basic resources for light projects.",
  },
  {
    id: "md",
    title: "Medium",
    description: "Great for growing sites. More power and storage.",
  },
  {
    id: "lg",
    title: "Large",
    description: "Ideal for busy sites. Lots of resources and support.",
  },
  {
    id: "xl",
    title: "Extra Large",
    description: "Max power for demanding applications. Top-tier performance.",
  },
]
