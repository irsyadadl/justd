"use client"

import { Card, Skeleton } from "ui"

export default function SkeletonIntentDemo() {
  return (
    <Card className="p-4">
      <div className="flex gap-2">
        <Skeleton intent="lighter" className="size-8" />
        <div className="space-y-1">
          <Skeleton intent="muted" className="h-3.5 w-20" />
          <Skeleton intent="muted" className="h-3.5 w-48" />
        </div>
      </div>
    </Card>
  )
}
