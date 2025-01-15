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
      0: "gap-0",
      2: "gap-2",
      4: "gap-4",
      6: "gap-6",
    },
  },
  defaultVariants: {
    columns: 2,
    gap: 4,
  },
  compoundVariants: [
    {
      gap: 0,
      columns: 1,
      className:
        "*:data-[slot=choicebox-item]:-mt-px rounded-lg *:data-[slot=choicebox-item]:inset-ring-1 *:data-[slot=choicebox-item]:rounded-none *:data-[slot=choicebox-item]:last:rounded-b-[calc(var(--radius-lg)-1px)] *:data-[slot=choicebox-item]:first:rounded-t-[calc(var(--radius-lg)-1px)]",
    },
  ],
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
    "bg-bg [--choicebox-fg:var(--color-primary)] [--choicebox:color-mix(in_oklab,var(--color-primary)_4%,white_96%)]",
    "[--choicebox-selected-hovered:color-mix(in_oklab,var(--color-primary)_15%,white_85%)]",
    "dark:[--choicebox-selected-hovered:color-mix(in_oklab,var(--color-primary)_25%,black_75%)]",
    "dark:[--choicebox-fg:color-mix(in_oklab,var(--color-primary)_45%,white_55%)] dark:[--choicebox:color-mix(in_oklab,var(--color-primary)_20%,black_70%)]",
    "inset-ring inset-ring-border cursor-pointer rounded-lg p-4 [&_[slot=title]]:font-medium",
    "data-selected:**:data-[slot=choicebox-icon]:text-current/90 **:data-[slot=choicebox-icon]:size-5 **:data-[slot=choicebox-icon]:shrink-0 **:data-[slot=choicebox-icon]:text-current/60",
  ],
  variants: {
    init: {
      true: [
        "bg-(--choicebox) text-(--choicebox-fg)",
        "inset-ring-ring/70 z-20 data-hovered:bg-(--choicebox-selected-hovered)",
        "[&_[slot=title]]:text-(--choicebox-fg)",
        "[&_[slot=description]]:text-(--choicebox-fg)",
      ],
    },
    isDisabled: {
      true: "z-10 cursor-default opacity-50 forced-colors:text-[GrayText] [&_[slot=description]]:text-muted-fg/70 [&_[slot=title]]:text-muted-fg",
    },
  },
})

interface ChoiceboxItemProps extends GridListItemProps, VariantProps<typeof choiceboxItemStyles> {
  title?: string
  description?: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const ChoiceboxItem = ({ icon: Icon, className, ...props }: ChoiceboxItemProps) => {
  const textValue = props.title ?? props.textValue
  return (
    <GridListItem
      textValue={textValue}
      data-slot="choicebox-item"
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
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex gap-x-2.5">
            {Icon && <Icon data-slot="choicebox-icon" />}
            <div className="flex flex-col gap-y-1 pr-8">
              <Label slot="title" className="text-sm/4" htmlFor={textValue}>
                {props.title}
              </Label>
              {props.description && (
                <Description className="text-sm/5">{props.description}</Description>
              )}
            </div>
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
