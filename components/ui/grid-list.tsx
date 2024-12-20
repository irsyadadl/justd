"use client"

import type React from "react"

import { IconHamburger } from "justd-icons"
import type { GridListItemProps, GridListProps } from "react-aria-components"
import {
  Button,
  GridListItem,
  GridList as GridListPrimitive,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn } from "@/utils/classes"
import { Checkbox } from "./checkbox"
import { composeTailwindRenderProps } from "./primitive"

const gridListStyles = tv({
  base: "relative *:data-drop-target:border *:data-drop-target:border-accent [&::-webkit-scrollbar]:size-0.5 [scrollbar-width:thin] max-h-96 overflow-auto rounded-lg border",
})

const GridList = <T extends object>({ children, className, ...props }: GridListProps<T>) => (
  <GridListPrimitive className={composeTailwindRenderProps(className, gridListStyles())} {...props}>
    {children}
  </GridListPrimitive>
)

const itemStyles = tv({
  base: "[--selected-item:theme(--color-muted/80%)] [--selected-item-hovered:theme(--color-muted/70%)] relative group transition outline-hidden flex cursor-default select-none gap-3 border-y px-3 -mb-px py-2 sm:text-sm text-fg -outline-offset-2 first:rounded-t-md first:border-t-0 last:mb-0 last:rounded-b-md last:border-b-0",
  variants: {
    isHovered: { true: "bg-subtle" },
    isSelected: {
      true: "bg-(--selected-item) z-20 border-border/50 data-hovered:bg-(--selected-item-hovered)",
    },
    isFocused: {
      true: "outline-hidden",
    },
    isFocusVisible: {
      true: "ring-1 ring-ring outline-hidden bg-(--selected-item) data-selected:bg-(--selected-item) data-hovered:bg-(--selected-item-hovered)",
    },
    isDisabled: {
      true: "text-muted-fg/70 forced-colors:text-[GrayText]",
    },
  },
})

const Item = ({ className, ...props }: GridListItemProps) => {
  const textValue = typeof props.children === "string" ? props.children : undefined
  return (
    <GridListItem
      textValue={textValue}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        itemStyles({ ...renderProps, className }),
      )}
    >
      {({ selectionMode, selectionBehavior, allowsDragging }) => (
        <>
          {allowsDragging && (
            <Button
              slot="drag"
              className="cursor-grab data-dragging:cursor-grabbing *:data-[slot=icon]:text-muted-fg"
            >
              <IconHamburger />
            </Button>
          )}

          <span
            aria-hidden
            className="hidden absolute inset-y-0 left-0 w-0.5 h-full bg-primary group-data-selected:block"
          />
          {selectionMode === "multiple" && selectionBehavior === "toggle" && (
            <Checkbox className="-mr-2" slot="selection" />
          )}
          {props.children as React.ReactNode}
        </>
      )}
    </GridListItem>
  )
}

const EmptyState = ({ ref, className, ...props }: React.ComponentProps<"div">) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
)

GridList.Item = Item
GridList.EmptyState = EmptyState

export type { GridListProps, GridListItemProps }
export { GridList }
