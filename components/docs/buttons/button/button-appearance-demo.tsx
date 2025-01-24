"use client"

import { IconArrowUpRight, IconDownload, IconUpload } from "justd-icons"
import { Button } from "ui"

export default function ButtonAppearanceDemo() {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
      <Button appearance="solid">
        <IconDownload />
        Label
      </Button>
      <Button appearance="outline">
        <IconUpload />
        Label
      </Button>
      <Button appearance="plain">
        Label
        <IconArrowUpRight />
      </Button>
    </div>
  )
}
