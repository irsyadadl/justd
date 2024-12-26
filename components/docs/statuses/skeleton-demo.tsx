"use client"

import { Card, Skeleton } from "ui"

export default function SkeletonDemo() {
  return (
    <Card className="p-4">
      <div className="flex gap-2">
        <Skeleton shape="circle" className="size-6" />
        <div className="space-y-1">
          <Skeleton className="h-3 w-56" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </Card>
  )
}
