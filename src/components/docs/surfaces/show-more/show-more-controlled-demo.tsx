"use client"

import { useState } from "react"

import { IconChevronLgDown } from "justd-icons"
import { ShowMore } from "ui"

export default function ShowMoreControlledDemo() {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className="py-6">
      <ShowMore onChange={setIsExpanded} isSelected={isExpanded}>
        {isExpanded ? "Expand" : "Collapse"}
        <IconChevronLgDown
          className={`${isExpanded ? "rotate-180" : ""} size-4 transition-transform duration-200`}
        />
      </ShowMore>
    </div>
  )
}
