"use client"

import { IconAdjustment, IconArchive2, IconDuplicate, IconTrash } from "justd-icons"
import { Button } from "ui"

export default function ButtonIntentDemo() {
  return (
    <div className="flex max-w-sm flex-wrap gap-2">
      <Button>
        <IconDuplicate /> Label
      </Button>
      <Button intent="secondary">
        <IconAdjustment /> Label
      </Button>
      <Button intent="danger">
        <IconTrash /> Label
      </Button>
      <Button intent="warning">
        <IconArchive2 /> Label
      </Button>
    </div>
  )
}
