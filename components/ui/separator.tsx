"use client"

import { Separator as Divider, type SeparatorProps as DividerProps } from "react-aria-components"
import { tv } from "tailwind-variants"

const separatorStyles = tv({
  base: "shrink-0 bg-border forced-colors:bg-[ButtonBorder]",
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

interface SeparatorProps extends DividerProps {
  className?: string
}

const Separator = ({ className, ...props }: SeparatorProps) => {
  return (
    <Divider
      {...props}
      className={separatorStyles({
        orientation: props.orientation,
        className: className,
      })}
    />
  )
}

export type { SeparatorProps }
export { Separator }
