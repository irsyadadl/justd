"use client"

import { cn } from "@/utils/classes"
import { IconChevronLgDown } from "justd-icons"
import type {
  ListBoxProps,
  PopoverProps,
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
import {
  DropdownItem,
  DropdownItemDetails,
  DropdownLabel,
  DropdownSection,
  DropdownSeparator,
} from "./dropdown"
import { Description, FieldError, Label } from "./field"
import { ListBox } from "./list-box"
import { PopoverContent } from "./popover"
import { composeTailwindRenderProps, focusStyles } from "./primitive"

const selectTriggerStyles = tv({
  extend: focusStyles,
  base: [
    "btr flex h-10 w-full cursor-default items-center gap-4 gap-x-2 rounded-lg border border-input py-2 pr-2 pl-3 text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition **:data-[slot=icon]:size-4 group-data-disabled:opacity-50 dark:shadow-none",
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
  className,
  ...props
}: SelectProps<T>) => {
  return (
    <SelectPrimitive
      {...props}
      className={composeTailwindRenderProps(className, "group flex w-full flex-col gap-y-1.5")}
    >
      {(values) => (
        <>
          {label && <Label>{label}</Label>}
          {typeof props.children === "function" ? props.children(values) : props.children}
          {description && <Description>{description}</Description>}
          <FieldError>{errorMessage}</FieldError>
        </>
      )}
    </SelectPrimitive>
  )
}

interface SelectListProps<T extends object>
  extends ListBoxProps<T>,
    Pick<PopoverProps, "placement"> {
  items?: Iterable<T>
  popoverClassName?: PopoverProps["className"]
}

const SelectList = <T extends object>({
  children,
  items,
  className,
  popoverClassName,
  ...props
}: SelectListProps<T>) => {
  return (
    <PopoverContent
      showArrow={false}
      respectScreen={false}
      className={cn("sm:min-w-(--trigger-width)", popoverClassName)}
      placement={props.placement}
    >
      <ListBox className={cn("border-0", className)} items={items} {...props}>
        {children}
      </ListBox>
    </PopoverContent>
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
      <SelectValue className="*:data-[slot=icon]:-mx-0.5 *:data-[slot=avatar]:-mx-0.5 *:data-[slot=avatar]:*:-mx-0.5 grid flex-1 grid-cols-[auto_1fr] items-center text-base data-placeholder:text-muted-fg *:data-[slot=avatar]:*:mr-2 *:data-[slot=avatar]:mr-2 *:data-[slot=icon]:mr-2 sm:text-sm [&_[slot=description]]:hidden" />
      <IconChevronLgDown
        aria-hidden
        className="size-4 shrink-0 text-muted-fg duration-300 group-data-open:rotate-180 group-data-open:text-fg group-data-disabled:opacity-50 forced-colors:text-[ButtonText] forced-colors:group-data-disabled:text-[GrayText]"
      />
    </Button>
  )
}

const SelectSection = DropdownSection
const SelectSeparator = DropdownSeparator
const SelectLabel = DropdownLabel
const SelectOptionDetails = DropdownItemDetails
const SelectOption = DropdownItem

Select.OptionDetails = SelectOptionDetails
Select.Option = SelectOption
Select.Label = SelectLabel
Select.Separator = SelectSeparator
Select.Section = SelectSection
Select.Trigger = SelectTrigger
Select.List = SelectList

export type { SelectProps, SelectTriggerProps }
export { Select }
