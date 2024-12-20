"use client"

import {
  ColorSlider as ColorSliderPrimitive,
  type ColorSliderProps as ColorSliderPrimitiveProps,
  SliderOutput,
  SliderTrack,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { ColorThumb } from "./color-thumb"
import { Label } from "./field"

const trackStyles = tv({
  base: "group col-span-2 rounded-lg",
  variants: {
    orientation: {
      horizontal: "w-full h-6",
      vertical: "w-6 h-56 ml-[50%] -translate-x-[50%]",
    },
    isDisabled: {
      true: "opacity-75 bg-muted forced-colors:bg-[GrayText]",
    },
  },
})

interface ColorSliderProps extends ColorSliderPrimitiveProps {
  label?: string
  showOutput?: boolean
}

const colorSliderStyles = tv({
  base: "group relative gap-2",
  variants: {
    orientation: {
      horizontal: "grid grid-cols-[1fr_auto] min-w-56",
      vertical: "flex flex-col justify-center items-center",
    },
    isDisabled: {
      true: "opacity-75 bg-muted forced-colors:bg-[GrayText]",
    },
  },
})
const ColorSlider = ({ showOutput = true, label, className, ...props }: ColorSliderProps) => {
  return (
    <ColorSliderPrimitive
      {...props}
      data-slot="color-slider"
      className={composeRenderProps(className, (className, renderProps) =>
        colorSliderStyles({ ...renderProps, className }),
      )}
    >
      <div className="flex items-center">
        {label && <Label className="text-sm [grid-area:label]">{label}</Label>}
        {showOutput && (
          <SliderOutput className="text-sm [grid-area:output] data-[orientation=horizontal]:ml-auto" />
        )}
      </div>
      <SliderTrack
        className={trackStyles}
        style={({ defaultStyle, isDisabled }) => ({
          ...defaultStyle,
          background: isDisabled
            ? undefined
            : `${defaultStyle.background}, repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
        })}
      >
        <ColorThumb />
      </SliderTrack>
    </ColorSliderPrimitive>
  )
}

export type { ColorSliderProps }
export { ColorSlider }
