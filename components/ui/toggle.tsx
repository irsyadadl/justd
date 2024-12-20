"use client"

import { createContext, use } from "react"

import type { ToggleButtonGroupProps, ToggleButtonProps } from "react-aria-components"
import { ToggleButton, ToggleButtonGroup, composeRenderProps } from "react-aria-components"
import type { VariantProps } from "tailwind-variants"
import { tv } from "tailwind-variants"

import { focusButtonStyles } from "./primitive"

interface ToggleGroupContextProps {
  appearance?: "outline" | "plain" | "solid"
}

const ToggleGroupContext = createContext<ToggleGroupContextProps>({
  appearance: "plain",
})

const toggleGroupStyles = tv({
  base: "flex gap-1",
  variants: {
    orientation: {
      horizontal:
        "flex-row [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]",
      vertical: "flex-col items-start",
    },
  },
})

interface ToggleGroupProps extends ToggleButtonGroupProps, ToggleGroupContextProps {
  ref?: React.RefObject<HTMLDivElement>
}
const ToggleGroup = ({
  className,
  orientation = "horizontal",
  appearance = "plain",
  ref,
  ...props
}: ToggleGroupProps) => {
  return (
    <ToggleGroupContext.Provider value={{ appearance }}>
      <ToggleButtonGroup
        ref={ref}
        orientation={orientation}
        className={composeRenderProps(className, (className, renderProps) =>
          toggleGroupStyles({
            ...renderProps,
            orientation,
            className,
          }),
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
    "data-hovered:bg-secondary data-hovered:text-secondary-fg",
    "forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText]",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-(--button-icon)",
  ],
  variants: {
    isDisabled: {
      true: "opacity-50 cursor-default forced-colors:border-[GrayText]",
    },
    appearance: {
      plain: [
        "data-selected:bg-secondary data-selected:text-secondary-fg",
        "[--button-icon:var(--color-secondary-fg)]/60 data-selected:[--button-icon:var(--color-secondary-fg)] data-hovered:[--button-icon:var(--color-secondary-fg)]/80",
      ],
      solid: [
        "bg-white border-border data-selected:border-primary data-hovered:bg-white/95 data-hovered:text-black text-black data-selected:bg-primary data-selected:text-primary-fg",
        "[--button-icon:var(--color-black)]/60 data-selected:[--button-icon:var(--color-white)] data-hovered:[--button-icon:var(--color-black)]/80",
      ],
      outline: [
        "border-border data-hovered:border-secondary-fg/10 data-pressed:border-secondary-fg/10 data-selected:border-secondary-fg/10 data-selected:bg-secondary/90 data-selected:backdrop-blur-sm data-selected:text-secondary-fg data-hovered:bg-secondary/90 data-hovered:text-secondary-fg",
        "[--button-icon:var(--color-secondary-fg)]/60 data-selected:[--button-icon:var(--color-secondary-fg)] data-hovered:[--button-icon:var(--color-secondary-fg)]/80",
      ],
    },
    size: {
      small: "h-9 px-3.5",
      medium: "h-10 px-4",
      large: "h-11 px-5",
      "square-petite": "size-9 shrink-0",
    },
    shape: {
      square: "rounded-lg",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    appearance: "plain",
    size: "small",
    shape: "square",
  },
})

interface ToggleProps extends ToggleButtonProps, VariantProps<typeof toggleStyles> {
  ref?: React.RefObject<HTMLButtonElement>
}
const Toggle = ({ className, appearance, ref, ...props }: ToggleProps) => {
  const { appearance: groupAppearance } = use(ToggleGroupContext)
  return (
    <ToggleButton
      ref={ref}
      className={composeRenderProps(className, (className, renderProps) =>
        toggleStyles({
          ...renderProps,
          appearance: appearance ?? groupAppearance,
          size: props.size,
          shape: props.shape,
          className,
        }),
      )}
      {...props}
    />
  )
}

export type { ToggleGroupProps, ToggleProps }
export { ToggleGroup, Toggle }
