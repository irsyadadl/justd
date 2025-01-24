"use client"

import { createContext, use } from "react"
import type { ToggleButtonGroupProps, ToggleButtonProps } from "react-aria-components"
import { ToggleButton, ToggleButtonGroup, composeRenderProps } from "react-aria-components"
import type { VariantProps } from "tailwind-variants"
import { tv } from "tailwind-variants"

type ToggleGroupContextProps = {
  isDisabled?: boolean
  gap?: 0 | 1 | 2 | 3 | 4
  appearance?: "plain" | "outline" | "solid"
  orientation?: "horizontal" | "vertical"
  size?: "small" | "medium" | "large" | "square-petite"
}

const ToggleGroupContext = createContext<ToggleGroupContextProps>({
  gap: 1,
  appearance: "outline",
  orientation: "horizontal",
  size: "medium",
})

type BaseToggleGroupProps = Omit<ToggleGroupContextProps, "gap" | "appearance">
interface ToggleGroupPropsNonZeroGap extends BaseToggleGroupProps {
  gap?: Exclude<ToggleGroupContextProps["gap"], 0>
  appearance?: ToggleGroupContextProps["appearance"]
}

interface ToggleGroupPropsGapZero extends BaseToggleGroupProps {
  gap?: 0
  appearance?: Exclude<ToggleGroupContextProps["appearance"], "plain">
}

type ToggleGroupProps = ToggleButtonGroupProps &
  (ToggleGroupPropsGapZero | ToggleGroupPropsNonZeroGap) & {
    ref?: React.RefObject<HTMLDivElement>
  }

const toggleGroupStyles = tv({
  base: "flex",
  variants: {
    orientation: {
      horizontal:
        "flex-row [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      vertical: "flex-col items-start",
    },
    gap: {
      0: "gap-0 rounded-lg *:[button]:inset-ring-1 *:[button]:rounded-none",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    gap: 0,
  },
  compoundVariants: [
    {
      gap: 0,
      orientation: "vertical",
      className:
        "*:[button]:-mt-px *:[button]:first:rounded-t-[calc(var(--radius-lg)-1px)] *:[button]:last:rounded-b-[calc(var(--radius-lg)-1px)]",
    },
    {
      gap: 0,
      orientation: "horizontal",
      className:
        "*:[button]:-mr-px *:[button]:first:rounded-s-[calc(var(--radius-lg)-1px)] *:[button]:last:rounded-e-[calc(var(--radius-lg)-1px)]",
    },
  ],
})

const ToggleGroup = ({
  className,
  ref,
  appearance = "outline",
  gap = 0,
  size = "medium",
  orientation = "horizontal",
  ...props
}: ToggleGroupProps) => {
  return (
    <ToggleGroupContext.Provider
      value={{ appearance, gap, orientation, size, isDisabled: props.isDisabled }}
    >
      <ToggleButtonGroup
        ref={ref}
        orientation={orientation}
        className={composeRenderProps(className, (className, renderProps) =>
          toggleGroupStyles({
            ...renderProps,
            gap,
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
  base: [
    "inset-ring inset-ring-border cursor-pointer items-center gap-x-2 rounded-lg outline-hidden sm:text-sm",
    "forced-colors:[--button-icon:ButtonText] forced-colors:hover:[--button-icon:ButtonText]",
    "*:data-[slot=icon]:-mx-0.5 data-hovered:*:data-[slot=icon]:text-current/90 data-pressed:*:data-[slot=icon]:text-current *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-current/60",
  ],
  variants: {
    isDisabled: {
      true: "cursor-default opacity-50 forced-colors:border-[GrayText]",
    },
    isFocusVisible: {
      true: "inset-ring-ring/70 z-20 ring-4 ring-ring/20",
    },
    appearance: {
      plain: "inset-ring-0 data-selected:bg-secondary data-selected:text-secondary-fg",
      solid: ["inset-ring data-selected:inset-ring-fg data-selected:bg-fg data-selected:text-bg"],
      outline: [
        "data-hovered:border-secondary-fg/10 data-pressed:border-secondary-fg/10 data-selected:border-secondary-fg/10 data-hovered:bg-muted data-selected:bg-secondary data-hovered:text-secondary-fg data-selected:text-secondary-fg",
      ],
    },
    noGap: { true: "" },
    orientation: {
      horizontal: "inline-flex justify-center",
      vertical: "flex",
    },
    size: {
      small: "h-9 px-3.5",
      medium: "h-10 px-4",
      large: "h-11 px-5 *:data-[slot=icon]:size-4.5 sm:text-base",
      "square-petite": "size-9 shrink-0",
    },
    shape: {
      square: "rounded-lg",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    appearance: "outline",
    size: "small",
    shape: "square",
  },
  compoundVariants: [
    {
      noGap: true,
      orientation: "vertical",
      className: "w-full",
    },
  ],
})

interface ToggleProps extends ToggleButtonProps, VariantProps<typeof toggleStyles> {
  ref?: React.RefObject<HTMLButtonElement>
}

const Toggle = ({ className, appearance, ref, ...props }: ToggleProps) => {
  const {
    appearance: groupAppearance,
    orientation,
    gap,
    size,
    isDisabled: isGroupDisabled,
  } = use(ToggleGroupContext)
  return (
    <ToggleButton
      ref={ref}
      isDisabled={props.isDisabled ?? isGroupDisabled}
      className={composeRenderProps(className, (className, renderProps) =>
        toggleStyles({
          ...renderProps,
          appearance: appearance ?? groupAppearance,
          size: props.size ?? size,
          orientation,
          shape: props.shape,
          noGap: gap === 0,
          className,
        }),
      )}
      {...props}
    />
  )
}

export type { ToggleGroupProps, ToggleProps }
export { ToggleGroup, Toggle }
