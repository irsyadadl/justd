"use client"

import * as React from "react"

import { cn } from "@/utils/classes"
import {
  DateField as DateFieldPrimitive,
  type DateFieldProps as DateFieldPrimitiveProps,
  DateInput as DateInputPrimitive,
  type DateInputProps,
  DateSegment,
  type DateValue,
  type ValidationResult
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Description, FieldError, FieldGroup, Label } from "./field"
import { ctr } from "./primitive"

interface DateFieldProps<T extends DateValue> extends DateFieldPrimitiveProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const DateField = <T extends DateValue>({
  prefix,
  suffix,
  label,
  description,
  errorMessage,
  ...props
}: DateFieldProps<T>) => {
  return (
    <DateFieldPrimitive
      {...props}
      className={ctr(props.className, "flex group flex-col gap-y-1.5")}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        {prefix ? <span data-slot="prefix">{prefix}</span> : null}
        <DateInput />
        {suffix ? <span data-slot="suffix">{suffix}</span> : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </DateFieldPrimitive>
  )
}

const segmentStyles = tv({
  base: "inline shrink-0 sm:uppercase tabular-nums rounded p-0.5 tracking-wider text-fg caret-transparent outline outline-0 forced-color-adjust-none type-literal:px-0 lg:text-sm forced-colors:text-[ButtonText]",
  variants: {
    isPlaceholder: {
      true: "text-muted-fg"
    },
    isDisabled: {
      true: "text-fg/50 forced-colors:text-[GrayText]"
    },
    isFocused: {
      true: [
        "bg-primary text-primary-fg forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "invalid:bg-danger invalid:text-danger-fg"
      ]
    }
  }
})

const DateInput = ({ className, ...props }: Omit<DateInputProps, "children">) => {
  return (
    <DateInputPrimitive
      className={cn(
        "bg-transparent p-2 text-base text-fg placeholder-muted-fg lg:text-sm",
        className
      )}
      {...props}
    >
      {(segment) => <DateSegment segment={segment} className={segmentStyles} />}
    </DateInputPrimitive>
  )
}

export { DateField, DateInput, segmentStyles, type DateFieldProps }
