"use client"

import { IconBrandX } from "justd-icons"
import { Tooltip, buttonStyles } from "ui"

export default function TooltipDelayDemo() {
  return (
    <div className="flex gap-2">
      <Tooltip delay={0}>
        <Tooltip.Trigger
          aria-label="Follow me"
          className={buttonStyles({
            appearance: "outline",
            size: "square-petite",
          })}
        >
          <IconBrandX />
        </Tooltip.Trigger>
        <Tooltip.Content>Follow me @getjustd</Tooltip.Content>
      </Tooltip>
    </div>
  )
}
