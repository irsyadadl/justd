"use client"

import * as React from "react"

import type { GridListItemProps, GridListProps } from "react-aria-components"
import { composeRenderProps, GridList, GridListItem } from "react-aria-components"
import type { VariantProps } from "tailwind-variants"
import { tv } from "tailwind-variants"

import { Checkbox } from "./checkbox"
import { Description, Label } from "./field"
import { focusStyles } from "./primitive"

const choiceboxStyles = tv({
  base: "grid",
  variants: {
    columns: {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
      5: "sm:grid-cols-5",
      6: "sm:grid-cols-6"
    },
    gap: {
      2: "gap-2",
      4: "gap-4",
      6: "gap-6"
    }
  },
  defaultVariants: {
    columns: 2,
    gap: 6
  }
})

interface ChoiceboxProps<T extends object> extends GridListProps<T>, VariantProps<typeof choiceboxStyles> {
  className?: string
}

const Choicebox = <T extends object>({
  columns,
  gap,
  className,
  selectionMode = "multiple",
  ...props
}: ChoiceboxProps<T>) => {
  return (
    <GridList
      layout={columns === 1 ? "stack" : "grid"}
      selectionMode={selectionMode}
      className={choiceboxStyles({
        columns,
        gap,
        className
      })}
      {...props}
    />
  )
}

const choiceboxItemStyles = tv({
  extend: focusStyles,
  base: "rounded-lg cursor-pointer border p-4 [&_[slot=title]]:font-medium",
  variants: {
    isHovered: {
      true: "bg-secondary/30"
    },
    isSelected: {
      true: [
        "z-20 bg-subtle/20 hover:bg-subtle/50 border-ring/75",
        "[&_[slot=title]]:text-subtle-fg",
        "[&_[slot=description]]:text-subtle-fg/70"
      ],
      false: ""
    },
    isFocused: {
      true: "border-ring/80"
    },
    isDisabled: {
      true: "z-10 cursor-default opacity-50 [&_[slot=title]]:text-muted-fg forced-colors:text-[GrayText]"
    }
  }
})

interface ChoiceboxItemProps extends GridListItemProps, VariantProps<typeof choiceboxItemStyles> {
  title: string
  description?: string
}

const ChoiceboxItem = ({ className, ...props }: ChoiceboxItemProps) => {
  const textValue = props.title ?? props.textValue
  return (
    <GridListItem
      textValue={textValue}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        choiceboxItemStyles({
          ...renderProps,
          className
        })
      )}
    >
      {(values) => (
        <div className="flex items-center w-full justify-between gap-2">
          <div className="pr-8 flex flex-col">
            <Label slot="title" htmlFor={textValue}>
              {props.title}
            </Label>
            {props.description && <Description>{props.description}</Description>}
          </div>
          <>
            {values.selectionMode === "multiple" && values.selectionBehavior === "toggle" && (
              <Checkbox slot="selection" />
            )}
          </>
        </div>
      )}
    </GridListItem>
  )
}

Choicebox.Item = ChoiceboxItem
export { Choicebox }
