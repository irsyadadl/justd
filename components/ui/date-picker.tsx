"use client"

import { IconCalendarDays } from "justd-icons"
import {
  DatePicker as DatePickerPrimitive,
  type DatePickerProps as DatePickerPrimitiveProps,
  type DateValue,
  type DialogProps,
  type PopoverProps,
  type ValidationResult,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn } from "@/utils/classes"
import { useMediaQuery } from "@/utils/use-media-query"
import type { DateDuration } from "@internationalized/date"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { DateInput } from "./date-field"
import { Description, FieldError, FieldGroup, Label } from "./field"
import { Popover } from "./popover"
import { composeTailwindRenderProps } from "./primitive"
import { RangeCalendar } from "./range-calendar"

const datePickerStyles = tv({
  slots: {
    base: "group flex flex-col gap-y-1.5",
    datePickerIcon:
      "group mr-1 h-7 w-8 rounded outline-offset-0data-hovered:bg-transparent data-pressed:bg-transparent **:data-[slot=icon]:text-muted-fg",
    calendarIcon: "group-open:text-fg",
    datePickerInput: "w-full px-2 text-base sm:text-sm",
    dateRangePickerInputStart: "px-2 text-base sm:text-sm",
    dateRangePickerInputEnd: "flex-1 px-2 py-1.5 text-base sm:text-sm",
    dateRangePickerDash:
      "text-fg group-data-disabled:opacity-50 forced-colors:text-[ButtonText] forced-colors:group-data-disabled:text-[GrayText]",
  },
})

const { base, datePickerIcon, calendarIcon, datePickerInput } = datePickerStyles()

interface DatePickerOverlayProps
  extends Omit<DialogProps, "children" | "className" | "style">,
    Omit<PopoverProps, "children" | "className" | "style"> {
  className?: string | ((values: { defaultClassName?: string }) => string)
  children?: React.ReactNode
  closeButton?: boolean
  range?: boolean
  visibleDuration?: DateDuration
  pageBehavior?: "visible" | "single"
}

const DatePickerOverlay = ({
  visibleDuration = { months: 1 },
  closeButton = true,
  pageBehavior = "visible",
  range,
  ...props
}: DatePickerOverlayProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)")
  return (
    <Popover.Content
      showArrow={false}
      className={cn(
        "flex justify-center p-4 sm:min-w-[17rem] sm:p-2 sm:pt-3",
        visibleDuration?.months === 1 ? "sm:max-w-[17.5rem]" : "sm:max-w-none",
      )}
      {...props}
    >
      {range ? (
        <RangeCalendar
          pageBehavior={pageBehavior}
          visibleDuration={!isMobile ? visibleDuration : undefined}
        />
      ) : (
        <Calendar />
      )}
      {closeButton && (
        <div className="mx-auto flex w-full max-w-[inherit] justify-center py-2.5 sm:hidden">
          <Popover.Close shape="circle" className="w-full">
            Close
          </Popover.Close>
        </div>
      )}
    </Popover.Content>
  )
}

const DatePickerIcon = () => (
  <Button size="square-petite" appearance="plain" className={datePickerIcon()}>
    <IconCalendarDays aria-hidden className={calendarIcon()} />
  </Button>
)

interface DatePickerProps<T extends DateValue> extends DatePickerPrimitiveProps<T> {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
}

const DatePicker = <T extends DateValue>({
  label,
  className,
  description,
  errorMessage,
  ...props
}: DatePickerProps<T>) => {
  return (
    <DatePickerPrimitive {...props} className={composeTailwindRenderProps(className, base())}>
      {label && <Label>{label}</Label>}
      <FieldGroup className="min-w-40">
        <DateInput className={datePickerInput()} />
        <DatePickerIcon />
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
      <DatePickerOverlay />
    </DatePickerPrimitive>
  )
}
export type { DatePickerProps, DateValue, ValidationResult }
export { DatePicker, DatePickerIcon, DatePickerOverlay }
