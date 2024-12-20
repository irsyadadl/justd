"use client"

import {
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

const linkStyles = tv({
  base: [
    "relative data-focus-visible:outline-2 outline-offset-2 outline-0 data-focused:outline-hidden outline-primary transition-colors",
    "forced-colors:outline-[Highlight] forced-colors:data-disabled:text-[GrayText] data-disabled:data-focus-visible:outline-0",
    "disabled:cursor-default data-disabled:opacity-60",
  ],
  variants: {
    intent: {
      unstyled: "text-current",
      primary: "text-fg data-hovered:underline forced-colors:data-disabled:text-[GrayText]",
      secondary:
        "text-muted-fg data-hovered:text-secondary-fg forced-colors:data-disabled:text-[GrayText]",
    },
  },
  defaultVariants: {
    intent: "unstyled",
  },
})

interface LinkProps extends LinkPrimitiveProps {
  intent?: "primary" | "secondary" | "unstyled"
  ref?: React.RefObject<HTMLAnchorElement>
}

const Link = ({ className, ref, ...props }: LinkProps) => {
  return (
    <LinkPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, ...renderProps) =>
        linkStyles({ ...renderProps, intent: props.intent, className }),
      )}
    >
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </LinkPrimitive>
  )
}

export type { LinkProps }
export { Link }
