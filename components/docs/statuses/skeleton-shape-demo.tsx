"use client"

import { Card, Skeleton } from "ui"

export default function SkeletonShapeDemo() {
  return (
    <Card className="p-4">
      <div className="flex gap-2">
        <Skeleton intent="lighter" shape="circle" className="size-8" />
        <div className="space-y-1">
          <Skeleton intent="muted" shape="circle" className="h-4 w-56" />
          <Skeleton intent="muted" shape="circle" className="h-4 w-10" />
        </div>
      </div>
    </Card>
  )
}
