"use client"

import { IconChevronLgDown } from "justd-icons"
import type {
  ListBoxProps,
  SelectProps as SelectPrimitiveProps,
  ValidationResult,
} from "react-aria-components"
import {
  Button,
  Select as SelectPrimitive,
  SelectValue,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import type { Placement } from "@react-types/overlays"
import { DropdownItem, DropdownItemDetails, DropdownSection } from "./dropdown"
import { Description, FieldError, Label } from "./field"
import { ListBox } from "./list-box"
import { Popover } from "./popover"
import { composeTailwindRenderProps, focusStyles } from "./primitive"

const selectTriggerStyles = tv({
  extend: focusStyles,
  base: [
    "btr flex h-10 w-full cursor-default items-center gap-4 rounded-lg border border-input py-2 pr-2 pl-3 text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition **:data-[slot=icon]:size-4 group-data-disabled:opacity-50 dark:shadow-none",
    "group-data-open:border-ring/70 group-data-open:ring-4 group-data-open:ring-ring/20",
    "text-fg group-data-invalid:border-danger group-data-invalid:ring-danger/20 forced-colors:group-data-invalid:border-[Mark]",
  ],
  variants: {
    isDisabled: {
      true: "opacity-50 forced-colors:border-[GrayText] forced-colors:text-[GrayText]",
    },
  },
})

interface SelectProps<T extends object> extends SelectPrimitiveProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  items?: Iterable<T>
  className?: string
}

const Select = <T extends object>({
  label,
  description,
  errorMessage,
  children,
  className,
  ...props
}: SelectProps<T>) => {
  return (
    <SelectPrimitive
      {...props}
      className={composeTailwindRenderProps(className, "group flex w-full flex-col gap-y-1.5")}
    >
      {label && <Label>{label}</Label>}
      {children as React.ReactNode}
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </SelectPrimitive>
  )
}

interface ListProps<T extends object> extends ListBoxProps<T> {
  items?: Iterable<T>
  placement?: Placement
  children: React.ReactNode | ((item: T) => React.ReactNode)
  className?: string
}

const List = <T extends object>({
  className,
  children,
  items,
  placement,
  ...props
}: ListProps<T>) => {
  return (
    <Popover.Picker className={className} placement={placement}>
      <ListBox.Picker aria-label="items" items={items} {...props}>
        {children}
      </ListBox.Picker>
    </Popover.Picker>
  )
}

interface SelectTriggerProps extends React.ComponentProps<typeof Button> {
  prefix?: React.ReactNode
  className?: string
}

const SelectTrigger = ({ className, ...props }: SelectTriggerProps) => {
  return (
    <Button
      className={composeRenderProps(className, (className, renderProps) =>
        selectTriggerStyles({
          ...renderProps,
          className,
        }),
      )}
    >
      {props.prefix && <span className="-mr-1">{props.prefix}</span>}
      <SelectValue className="flex-1 text-base data-placeholder:text-muted-fg sm:text-sm [&_[slot=description]]:hidden" />
      <IconChevronLgDown
        aria-hidden
        className="size-4 shrink-0 text-muted-fg duration-300 group-data-open:rotate-180 group-data-open:text-fg group-data-disabled:opacity-50 forced-colors:text-[ButtonText] forced-colors:group-data-disabled:text-[GrayText]"
      />
    </Button>
  )
}

Select.OptionDetails = DropdownItemDetails
Select.Option = DropdownItem
Select.Section = DropdownSection
Select.Trigger = SelectTrigger
Select.List = List

export type { SelectProps, SelectTriggerProps }
export { Select }
