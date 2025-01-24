"use client"

import {
  DateField as DateFieldPrimitive,
  type DateFieldProps as DateFieldPrimitiveProps,
  DateInput as DateInputPrimitive,
  type DateInputProps,
  DateSegment,
  type DateValue,
  type ValidationResult,
} from "react-aria-components"
import { tv } from "tailwind-variants"
import { Description, FieldError, FieldGroup, Label } from "./field"
import { composeTailwindRenderProps } from "./primitive"

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
      className={composeTailwindRenderProps(props.className, "group flex flex-col gap-y-1.5")}
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
  base: "inline shrink-0 rounded p-0.5 type-literal:px-0 text-fg tabular-nums tracking-wider caret-transparent outline outline-0 forced-color-adjust-none sm:text-sm sm:uppercase forced-colors:text-[ButtonText]",
  variants: {
    isPlaceholder: {
      true: "text-muted-fg",
    },
    isDisabled: {
      true: "text-fg/50 forced-colors:text-[GrayText]",
    },
    isFocused: {
      true: [
        "bg-primary text-primary-fg forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "data-invalid:bg-danger data-invalid:text-danger-fg",
      ],
    },
  },
})

const DateInput = ({ className, ...props }: Omit<DateInputProps, "children">) => {
  return (
    <DateInputPrimitive
      className={composeTailwindRenderProps(
        className,
        "bg-transparent p-2 text-base text-fg placeholder-muted-fg sm:text-sm",
      )}
      {...props}
    >
      {(segment) => <DateSegment segment={segment} className={segmentStyles} />}
    </DateInputPrimitive>
  )
}

export type { DateFieldProps }
export { DateField, DateInput, segmentStyles }
