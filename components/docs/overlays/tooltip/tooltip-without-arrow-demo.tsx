"use client"

import { Badge, Description, Tooltip } from "ui"

export default function TooltipWithoutArrowDemo() {
  return (
    <Tooltip>
      <Tooltip.Trigger aria-label="Fresh drop alert">
        <Badge shape="circle">New</Badge>
      </Tooltip.Trigger>
      <Tooltip.Content showArrow={false}>
        <strong className="font-semibold">Fresh drop alert</strong> <br />
        <Description>Scope the newest addition to our stash.</Description>
      </Tooltip.Content>
    </Tooltip>
  )
}
