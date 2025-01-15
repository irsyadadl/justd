"use client"

import {
  TimeField as TimeFieldPrimitive,
  type TimeFieldProps as TimeFieldPrimitiveProps,
  type TimeValue,
  type ValidationResult,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { DateInput } from "./date-field"
import { Description, FieldError, FieldGroup, Label } from "./field"
import { composeTailwindRenderProps } from "./primitive"

interface TimeFieldProps<T extends TimeValue> extends TimeFieldPrimitiveProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const timeFieldStyles = tv({
  base: "flex w-fit min-w-28 justify-around whitespace-nowrap p-2 sm:text-sm",
})

const TimeField = <T extends TimeValue>({
  prefix,
  suffix,
  label,
  className,
  description,
  errorMessage,
  ...props
}: TimeFieldProps<T>) => {
  return (
    <TimeFieldPrimitive
      {...props}
      className={composeTailwindRenderProps(className, "group flex flex-col gap-y-1.5")}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        {prefix ? <span data-slot="prefix">{prefix}</span> : null}
        <DateInput className={timeFieldStyles} />
        {suffix ? <span data-slot="suffix">{suffix}</span> : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </TimeFieldPrimitive>
  )
}

export type { TimeFieldProps }
export { TimeField }
