"use client"

import type { ColorSwatchPickerItemProps, ColorSwatchPickerProps } from "react-aria-components"
import {
  ColorSwatchPickerItem as ColorSwatchPickerItemPrimitive,
  ColorSwatchPicker as ColorSwatchPickerPrimitive,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { ColorSwatch } from "./color-swatch"
import { composeTailwindRenderProps, focusRing } from "./primitive"

const ColorSwatchPicker = ({
  children,
  className,
  layout = "grid",
  ...props
}: ColorSwatchPickerProps) => {
  return (
    <ColorSwatchPickerPrimitive
      layout={layout}
      {...props}
      className={composeTailwindRenderProps(className, "flex gap-1")}
    >
      {children}
    </ColorSwatchPickerPrimitive>
  )
}

const itemStyles = tv({
  extend: focusRing,
  base: "relative rounded-lg data-disabled:opacity-50",
})

const ColorSwatchPickerItem = (props: ColorSwatchPickerItemProps) => {
  return (
    <ColorSwatchPickerItemPrimitive {...props} className={itemStyles}>
      {({ isSelected }) => (
        <>
          <ColorSwatch />
          {isSelected && (
            <div className="absolute top-0 left-0 size-full rounded-md outline-hidden ring-1 ring-fg/30 ring-inset forced-color-adjust-none" />
          )}
        </>
      )}
    </ColorSwatchPickerItemPrimitive>
  )
}

ColorSwatchPicker.Item = ColorSwatchPickerItem

export { ColorSwatchPicker }
