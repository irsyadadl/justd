"use client"

import * as React from "react"

import type { ToggleButtonGroupProps, ToggleButtonProps } from "react-aria-components"
import { composeRenderProps, ToggleButton, ToggleButtonGroup } from "react-aria-components"
import type { VariantProps } from "tailwind-variants"
import { tv } from "tailwind-variants"

import { focusButtonStyles } from "./primitive"

interface ToggleGroupContextProps {
  appearance?: "outline" | "plain" | "solid"
}

const ToggleGroupContext = React.createContext<ToggleGroupContextProps>({
  appearance: "plain"
})

const toggleGroupStyles = tv({
  base: ["flex gap-1"],
  variants: {
    orientation: {
      horizontal:
        "flex-row [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]",
      vertical: "flex-col items-start"
    }
  }
})

const ToggleGroup = ({
  className,
  orientation = "horizontal",
  appearance = "plain",
  ...props
}: ToggleButtonGroupProps & ToggleGroupContextProps) => {
  return (
    <ToggleGroupContext.Provider value={{ appearance }}>
      <ToggleButtonGroup
        orientation={orientation}
        className={composeRenderProps(className, (className, renderProps) =>
          toggleGroupStyles({
            ...renderProps,
            orientation,
            className
          })
        )}
        {...props}
      />
    </ToggleGroupContext.Provider>
  )
}

const toggleStyles = tv({
  extend: focusButtonStyles,
  base: [
    "inline-flex relative items-center gap-x-2 bg-transparent justify-center border border-transparent rounded-lg text-sm font-medium ring-offset-bg transition-colors",
    "enabled:hover:bg-secondary enabled:hover:text-secondary-fg",
    "forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText]",
    "[&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-1 [&>[data-slot=icon]]:size-4 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--button-icon]"
  ],
  variants: {
    isDisabled: {
      true: "opacity-50 cursor-default forced-colors:border-[GrayText]"
    },
    appearance: {
      plain: [
        "selected:bg-secondary selected:text-secondary-fg",
        "[--button-icon:theme(colors.secondary.fg/60%)] selected:[--button-icon:theme(colors.secondary.fg)] enabled:hover:[--button-icon:theme(colors.secondary.fg/80%)]"
      ],
      solid: [
        "bg-white border-border selected:border-primary enabled:hover:bg-white/95 enabled:hover:text-black text-black selected:bg-primary selected:text-primary-fg",
        "[--button-icon:theme(colors.black/60%)] selected:[--button-icon:theme(colors.white)] enabled:hover:[--button-icon:theme(colors.black/80%)]"
      ],
      outline: [
        "border-border selected:bg-secondary selected:backdrop-blur-sm selected:text-secondary-fg enabled:hover:bg-secondary/50 enabled:hover:text-secondary-fg",
        "[--button-icon:theme(colors.secondary.fg/60%)] selected:[--button-icon:theme(colors.secondary.fg)] enabled:hover:[--button-icon:theme(colors.secondary.fg/80%)]"
      ]
    },
    size: {
      small: "h-9 px-3.5",
      medium: "h-10 px-4",
      large: "h-11 px-5",
      "square-petite": "size-9 shrink-0"
    },
    shape: {
      square: "rounded-lg",
      circle: "rounded-full"
    }
  },
  defaultVariants: {
    appearance: "plain",
    size: "small",
    shape: "square"
  }
})

type ToggleProps = ToggleButtonProps & VariantProps<typeof toggleStyles>

const Toggle = ({ className, appearance, ...props }: ToggleProps) => {
  const { appearance: groupAppearance } = React.useContext(ToggleGroupContext)
  return (
    <ToggleButton
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        toggleStyles({
          ...renderProps,
          appearance: appearance ?? groupAppearance,
          size: props.size,
          shape: props.shape,
          className
        })
      )}
    />
  )
}

export { ToggleGroup, Toggle }
