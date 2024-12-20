"use client"

import {
  DateRangePicker as DateRangePickerPrimitive,
  type DateRangePickerProps as DateRangePickerPrimitiveProps,
  type DateValue,
  type ValidationResult,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { DateInput } from "./date-field"
import { DatePickerIcon, DatePickerOverlay } from "./date-picker"
import { Description, FieldError, FieldGroup, Label } from "./field"
import { composeTailwindRenderProps } from "./primitive"

const dateRangePickerStyles = tv({
  slots: {
    base: "group flex flex-col gap-y-1.5",
    dateRangePickerInputStart: "px-2 sm:text-sm tabular-nums text-base",
    dateRangePickerInputEnd: "flex-1 px-2 py-1.5 tabular-nums text-base sm:text-sm",
    dateRangePickerDash:
      "text-fg group-data-disabled:text-muted-fg forced-colors:text-[ButtonText] forced-colors:group-data-disabled:text-[GrayText]",
  },
})
const { base, dateRangePickerInputStart, dateRangePickerInputEnd, dateRangePickerDash } =
  dateRangePickerStyles()

interface DateRangePickerProps<T extends DateValue> extends DateRangePickerPrimitiveProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

const DateRangePicker = <T extends DateValue>({
  label,
  className,
  description,
  errorMessage,
  ...props
}: DateRangePickerProps<T>) => {
  return (
    <DateRangePickerPrimitive {...props} className={composeTailwindRenderProps(className, base())}>
      {label && <Label>{label}</Label>}
      <FieldGroup className="w-auto min-w-40">
        <DateInput slot="start" className={dateRangePickerInputStart()} />
        <span aria-hidden="true" className={dateRangePickerDash()}>
          –
        </span>
        <DateInput slot="end" className={dateRangePickerInputEnd()} />
        <DatePickerIcon />
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <DatePickerOverlay range />
    </DateRangePickerPrimitive>
  )
}
export type { DateRangePickerProps }
export { DateRangePicker }
