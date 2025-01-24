import { Card, Skeleton } from "ui"

export default function SkeletonAnatomy() {
  return (
    <Card className="p-4">
      <div className="flex gap-2">
        <Skeleton intent="lighter" shape="circle" className="size-8" />
        <div className="space-y-1">
          <Skeleton intent="muted" shape="circle" className="h-4 w-56" />
          <Skeleton intent="lighter" shape="circle" className="h-4 w-16" />
          <Skeleton intent="lighter" className="h-4 w-24" />
          <Skeleton intent="muted" className="h-4 w-32" />
        </div>
      </div>
    </Card>
  )
}
