"use client"

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { focusButtonStyles } from "./primitive"

const buttonStyles = tv({
  extend: focusButtonStyles,
  base: [
    "kbt32x before:absolute after:absolute box-border relative no-underline isolate inline-flex items-center justify-center gap-x-2 border font-medium",
    "forced-colors:[--button-icon:ButtonText] forced-colors:data-hovered:[--button-icon:ButtonText]",
    "*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-1 *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:text-(--button-icon)",
  ],
  variants: {
    intent: {
      primary: [
        "text-primary-fg [--button-bg:var(--color-primary)] [--button-border:var(--color-primary)] [--button-hover-overlay:var(--color-primary-fg)]/10",
        "[--button-icon:var(--color-primary-fg)]/60 data-pressed:[--button-icon:var(--color-primary-fg)]/80 data-hovered:[--button-icon:var(--color-primary-fg)]/80",
      ],
      secondary: [
        "text-secondary-fg [--button-bg:var(--color-secondary)] dark:[--button-bg:var(--color-secondary)] [--button-border:var(--color-secondary-fg)]/10 [--button-hover-overlay:color-mix(in_oklab,var(--color-secondary)_95%,white_5%)] data-data-pressed:[--button-border:var(--color-secondary-fg)]/15 data-hovered:[--button-border:var(--color-secondary-fg)]/15",
        "[--button-icon:var(--color-secondary-fg)]/60 data-pressed:[--button-icon:var(--color-secondary-fg)] data-hovered:[--button-icon:var(--color-secondary-fg)]",
      ],
      warning: [
        "text-warning-fg outline-warning [--button-bg:var(--color-warning)] [--button-border:var(--color-warning)] [--button-hover-overlay:color-mix(in_oklab,var(--color-warning)_90%,white_10%)]",
        "[--button-icon:var(--color-warning-fg)]/60 data-pressed:[--button-icon:var(--color-warning-fg)]/80 data-hovered:[--button-icon:var(--color-warning-fg)]/80",
      ],
      danger: [
        "text-danger-fg outline-danger [--button-bg:var(--color-danger)] [--button-border:var(--color-danger)] [--button-hover-overlay:var(--color-danger-fg)]/10",
        "[--button-icon:var(--color-white)]/60 data-pressed:[--button-icon:var(--color-danger-fg)]/80 data-hovered:[--button-icon:var(--color-danger-fg)]/80",
      ],
    },
    appearance: {
      solid: [
        "border-transparent bg-(--button-border)",
        "before:inset-0 before:-z-10 before:bg-(--button-bg) before:shadow-sm data-disabled:before:shadow-none",
        "after:shadow-[shadow:inset_0_1px_theme(--color-white/15%)] data-pressed:after:bg-(--button-hover-overlay) data-hovered:after:bg-(--button-hover-overlay) data-disabled:after:shadow-none after:inset-0 after:-z-10",
        "dark:after:-inset-px dark:before:hidden dark:border-white/5 dark:bg-(--button-bg)",
      ],
      outline: [
        "border-border data-hovered:border-secondary-fg/10 data-pressed:border-secondary-fg/10 data-hovered:bg-secondary/90 text-secondary-fg",
        "[--button-icon:var(--color-secondary-fg)]/50 data-hovered:[--button-icon:var(--color-fg)]",
        "data-pressed:bg-secondary/90 data-pressed:[--button-icon:var(--color-secondary-fg)]",
      ],
      plain: [
        "border-transparent text-secondary-fg [--button-icon:var(--color-secondary-fg)]/50",
        "data-hovered:[--button-icon:var(--color-secondary-fg)] data-hovered:bg-secondary",
        "data-pressed:[--button-icon:var(--color-secondary-fg)] data-pressed:bg-secondary",
      ],
    },
    size: {
      "extra-small":
        "h-8 px-[calc(calc(var(--spacing)*3)-1px)] py-[calc(calc(var(--spacing)*1)-1px)] text-xs/4 lg:text-[0.800rem]/4",
      small:
        "h-9 px-[calc(calc(var(--spacing)*4)-1px)] py-[calc(calc(var(--spacing)*1.5)-1px)] text-sm/5 sm:text-sm/5",
      medium:
        "h-10 px-[calc(calc(var(--spacing)*4)-1px)] py-[calc(calc(var(--spacing)*2)-1px)] text-base sm:text-sm/6",
      large:
        "h-10 *:data-[slot=icon]:mx-[-3px] sm:h-11 px-[calc(calc(var(--spacing)*4)-1px)] sm:px-[calc(calc(var(--spacing)*5)-1px)] py-[calc(calc(var(--spacing)*2.5)-1px)] text-base lg:text-base/7 sm:*:data-[slot=icon]:size-5",
      "square-petite": "size-9 shrink-0 **:data-[slot=icon]:text-current",
    },
    shape: {
      square:
        "rounded-lg before:rounded-[calc(var(--radius-lg)-1px)] after:rounded-[calc(var(--radius-lg)-1px)] dark:after:rounded-lg",
      circle: "rounded-full before:rounded-full after:rounded-full",
    },
    isDisabled: {
      false: "forced-colors:data-disabled:text-[GrayText] cursor-pointer",
      true: "cursor-default opacity-50 forced-colors:data-disabled:text-[GrayText]",
    },
    isPending: {
      true: "cursor-default opacity-50",
    },
  },
  defaultVariants: {
    intent: "primary",
    appearance: "solid",
    size: "medium",
    shape: "square",
  },
})

interface ButtonProps extends ButtonPrimitiveProps {
  intent?: "primary" | "secondary" | "danger" | "warning"
  size?: "medium" | "large" | "square-petite" | "extra-small" | "small"
  shape?: "square" | "circle"
  appearance?: "solid" | "outline" | "plain"
  ref?: React.Ref<HTMLButtonElement>
}

const Button = ({ className, intent, appearance, size, shape, ref, ...props }: ButtonProps) => {
  return (
    <ButtonPrimitive
      ref={ref}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        buttonStyles({
          ...renderProps,
          intent,
          appearance,
          size,
          shape,
          className,
        }),
      )}
    >
      {(values) => (
        <>{typeof props.children === "function" ? props.children(values) : props.children}</>
      )}
    </ButtonPrimitive>
  )
}

export type { ButtonProps }
export { Button, ButtonPrimitive, buttonStyles }
