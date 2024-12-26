import type React from "react"

import { type VariantProps, tv } from "tailwind-variants"

const skeletonStyles = tv({
  base: "shrink-0 animate-pulse",
  variants: {
    intent: {
      muted: "bg-fg/20",
      lighter: "bg-fg/15",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-lg",
    },
  },
  defaultVariants: {
    intent: "muted",
    shape: "square",
  },
})

type SkeletonProps = React.ComponentProps<"div"> & VariantProps<typeof skeletonStyles>
const Skeleton = ({ shape, ref, intent, className, ...props }: SkeletonProps) => {
  return <div ref={ref} className={skeletonStyles({ shape, intent, className })} {...props} />
}

export type { SkeletonProps }
export { Skeleton }
