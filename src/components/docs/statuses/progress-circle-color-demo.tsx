"use client"

import { ProgressCircle } from "ui"

export default function ProgressCircleColorDemo() {
  return (
    <div className="flex gap-2">
      <ProgressCircle isIndeterminate className="text-red-500" />
      <ProgressCircle isIndeterminate className="text-blue-500" />
      <ProgressCircle isIndeterminate className="text-warning" />
    </div>
  )
}
