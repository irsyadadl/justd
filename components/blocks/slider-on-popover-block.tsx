"use client"

import { useRef, useState } from "react"

import { IconAdjustment } from "justd-icons"
import { Button, Description, Popover, Separator, Slider } from "ui"

export function SliderOnPopoverBlock() {
  const [fontSize, setFontSize] = useState<number>(16)
  const [lineHeight, setLineHeight] = useState<number[]>([1.5, 1.75])

  const [isOpen, setIsOpen] = useState(false)
  const button = useRef(null)

  return (
    <>
      <Button
        ref={button}
        onPress={() => setIsOpen(true)}
        aria-label="Slider on Popover"
        size="square-petite"
        appearance="outline"
      >
        <IconAdjustment />
      </Button>
      <Popover.Content
        triggerRef={button}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        showArrow={false}
        className="p-4"
      >
        <div className="space-y-4">
          <Slider
            output="tooltip"
            value={fontSize}
            onChange={(v) => setFontSize(v as number)}
            label="Font Size"
          />
          <Slider
            value={lineHeight}
            onChange={(v) => setLineHeight(v as number[])}
            label="Line Height"
          />
          <Separator />
          <Description className="flex flex-col gap-y-2 [&>strong]:text-fg">
            <strong>Font Size:</strong> {fontSize}
            <strong>Line Height:</strong> {lineHeight[0]} / {lineHeight[1]}
          </Description>
        </div>
      </Popover.Content>
    </>
  )
}
