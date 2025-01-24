"use client"

import { Badge } from "ui"

export default function BadgeIntentDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {["primary", "secondary", "success", "info", "warning", "danger"].map((intent, index) => (
        <Badge key={index} intent={intent as any}>
          {intent}
        </Badge>
      ))}
    </div>
  )
}
