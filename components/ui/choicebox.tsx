"use client"

import type { GridListItemProps, GridListProps } from "react-aria-components"
import { GridList, GridListItem, composeRenderProps } from "react-aria-components"
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
      6: "sm:grid-cols-6",
    },
    gap: {
      2: "gap-2",
      4: "gap-4",
      6: "gap-6",
    },
  },
  defaultVariants: {
    columns: 2,
    gap: 6,
  },
})

interface ChoiceboxProps<T extends object>
  extends GridListProps<T>,
    VariantProps<typeof choiceboxStyles> {
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
        className,
      })}
      {...props}
    />
  )
}

const choiceboxItemStyles = tv({
  extend: focusStyles,
  base: [
    "bg-bg [--choicebox:color-mix(in_oklab,var(--color-primary)_4%,white_96%)] [--choicebox-fg:var(--color-primary)]",
    "[--choicebox-selected-hovered:color-mix(in_oklab,var(--color-primary)_15%,white_85%)]",
    "dark:[--choicebox-selected-hovered:color-mix(in_oklab,var(--color-primary)_25%,black_75%)]",
    "dark:[--choicebox:color-mix(in_oklab,var(--color-primary)_20%,black_70%)] dark:[--choicebox-fg:color-mix(in_oklab,var(--color-primary)_45%,white_55%)]",
    "rounded-lg cursor-pointer inset-ring inset-ring-border p-4 [&_[slot=title]]:font-medium",
  ],
  variants: {
    init: {
      true: [
        "bg-(--choicebox) text-(--choicebox-fg)",
        "z-20 data-hovered:bg-(--choicebox-selected-hovered) inset-ring-ring/70",
        "[&_[slot=title]]:text-(--choicebox-fg)",
        "[&_[slot=description]]:text-(--choicebox-fg)",
      ],
    },
    isDisabled: {
      true: "z-10 cursor-default opacity-50 [&_[slot=title]]:text-muted-fg [&_[slot=description]]:text-muted-fg/70 forced-colors:text-[GrayText]",
    },
  },
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
          init: renderProps.isSelected || renderProps.isHovered || renderProps.isFocusVisible,
          className,
        }),
      )}
    >
      {(values) => (
        <div className="flex gap-2 justify-between items-center w-full">
          <div className="flex flex-col pr-8">
            <Label slot="title" htmlFor={textValue}>
              {props.title}
            </Label>
            {props.description && <Description>{props.description}</Description>}
          </div>
          {values.selectionMode === "multiple" && values.selectionBehavior === "toggle" && (
            <Checkbox slot="selection" />
          )}
        </div>
      )}
    </GridListItem>
  )
}

Choicebox.Item = ChoiceboxItem

export type { ChoiceboxProps, ChoiceboxItemProps }
export { Choicebox }
