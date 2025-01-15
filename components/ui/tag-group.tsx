"use client"

import React from "react"

import { IconX } from "justd-icons"
import type {
  TagGroupProps as TagGroupPrimitiveProps,
  TagListProps,
  TagProps as TagPrimitiveProps,
} from "react-aria-components"
import {
  Button,
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive,
  Tag as TagPrimitive,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn } from "@/utils/classes"
import { badgeIntents, badgeShapes, badgeStyles } from "./badge"
import { Description, Label } from "./field"
import { composeTailwindRenderProps, focusStyles } from "./primitive"

const intents = {
  primary: {
    base: [
      badgeIntents.primary,
      "**:[[slot=remove]]:data-hovered:bg-primary **:[[slot=remove]]:data-hovered:text-primary-fg",
    ],
    selected: [
      "bg-primary dark:data-hovered:bg-primary dark:bg-primary data-hovered:bg-primary ring-primary ring-inset text-primary-fg dark:text-primary-fg data-hovered:text-primary-fg",
      "**:[[slot=remove]]:data-hovered:bg-primary-fg/50 **:[[slot=remove]]:data-hovered:text-primary",
    ],
  },
  secondary: {
    base: [
      badgeIntents.secondary,
      "**:[[slot=remove]]:data-hovered:bg-fg **:[[slot=remove]]:data-hovered:text-bg",
    ],
    selected: [
      "bg-fg ring-fg/50 text-bg dark:bg-fg/90 dark:text-secondary ring-inset",
      "**:[[slot=remove]]:data-hovered:**:[[slot=remove]]:data-hovered:text-secondary-fg",
    ],
  },
  success: {
    base: [
      badgeIntents.success,
      "**:[[slot=remove]]:data-hovered:bg-success **:[[slot=remove]]:data-hovered:text-success-fg",
    ],
    selected: [
      "bg-success dark:bg-success ring-success ring-inset dark:text-success-fg dark:data-hovered:bg-success data-hovered:bg-success text-success-fg data-hovered:text-success-fg",
      "**:[[slot=remove]]:data-hovered:bg-success-fg/80 **:[[slot=remove]]:data-hovered:text-success",
    ],
  },
  warning: {
    base: [
      badgeIntents.warning,
      "**:[[slot=remove]]:data-hovered:bg-warning **:[[slot=remove]]:data-hovered:text-warning-fg",
    ],
    selected: [
      "bg-warning dark:data-hovered:bg-warning dark:bg-warning dark:text-bg data-hovered:bg-warning text-warning-fg data-hovered:text-warning-fg",
      "**:[[slot=remove]]:data-hovered:bg-warning-fg/80 **:[[slot=remove]]:data-hovered:text-warning",
    ],
  },
  danger: {
    base: [
      badgeIntents.danger,
      "**:[[slot=remove]]:data-hovered:bg-danger **:[[slot=remove]]:data-hovered:text-danger-fg",
    ],
    selected: [
      "bg-danger dark:bg-danger dark:data-hovered:bg-danger/90 data-hovered:bg-danger text-danger-fg ring-danger data-hovered:text-danger-fg",
      "**:[[slot=remove]]:bg-danger-fg/80 **:[[slot=remove]]:data-hovered:text-danger",
    ],
  },
}

type RestrictedIntent = "primary" | "secondary"

type Intent = "primary" | "secondary" | "warning" | "danger" | "success"

type Shape = keyof typeof badgeShapes

type TagGroupContextValue = {
  intent: Intent
  shape: Shape
}

const TagGroupContext = React.createContext<TagGroupContextValue>({
  intent: "primary",
  shape: "square",
})

interface TagGroupProps extends TagGroupPrimitiveProps {
  intent?: Intent
  shape?: "square" | "circle"
  errorMessage?: string
  label?: string
  description?: string
  ref?: React.RefObject<HTMLDivElement>
}

const TagGroup = ({ children, ref, ...props }: TagGroupProps) => {
  return (
    <TagGroupPrimitive
      ref={ref}
      className={cn("flex flex-col flex-wrap", props.className)}
      {...props}
    >
      <TagGroupContext.Provider
        value={{
          intent: props.intent || "primary",
          shape: props.shape || "square",
        }}
      >
        {props.label && <Label className="mb-1">{props.label}</Label>}
        {children}
        {props.description && <Description>{props.description}</Description>}
      </TagGroupContext.Provider>
    </TagGroupPrimitive>
  )
}

const TagList = <T extends object>({ className, ...props }: TagListProps<T>) => {
  return (
    <TagListPrimitive
      {...props}
      className={composeTailwindRenderProps(className, "flex flex-wrap gap-2")}
    />
  )
}

const tagStyles = tv({
  extend: focusStyles,
  base: [badgeStyles.base, "jdt3lr2x cursor-pointer"],
  variants: {
    isFocused: { true: "ring-1" },
    isDisabled: { true: "cursor-default opacity-50" },
    allowsRemoving: { true: "pr-1" },
  },
})

interface TagProps extends TagPrimitiveProps {
  intent?: Intent
  shape?: Shape
}

const Tag = ({ className, intent, shape, ...props }: TagProps) => {
  const textValue = typeof props.children === "string" ? props.children : undefined
  const groupContext = React.useContext(TagGroupContext)

  return (
    <TagPrimitive
      textValue={textValue}
      {...props}
      className={composeRenderProps(className, (_, renderProps) => {
        const finalIntent = intent || groupContext.intent
        const finalShape = shape || groupContext.shape

        return tagStyles({
          ...renderProps,
          className: cn([
            intents[finalIntent]?.base,
            badgeShapes[finalShape],
            renderProps.isSelected ? intents[finalIntent].selected : undefined,
          ]),
        })
      })}
    >
      {({ allowsRemoving }) => {
        return (
          <>
            {props.children as React.ReactNode}
            {allowsRemoving && (
              <Button
                slot="remove"
                className="-mr-0.5 grid size-3.5 place-content-center rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-primary [&>[data-slot=icon]]:size-3 [&>[data-slot=icon]]:shrink-0"
              >
                <IconX />
              </Button>
            )}
          </>
        )
      }}
    </TagPrimitive>
  )
}

export type { TagGroupProps, TagProps, TagListProps, RestrictedIntent }
export { Tag, TagList, TagGroup }
