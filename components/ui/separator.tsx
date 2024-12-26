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
  ref?: React.RefObject<HTMLDivElement>
}

const Separator = ({ className, ref, ...props }: SeparatorProps) => {
  return (
    <Divider
      ref={ref}
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
