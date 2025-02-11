"use client"

import { IconChevronLgLeft, IconChevronLgRight } from "justd-icons"
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader as CalendarGridHeaderPrimitive,
  CalendarHeaderCell,
  Calendar as CalendarPrimitive,
  type CalendarProps as CalendarPrimitiveProps,
  type DateValue,
  Heading,
  Text,
  composeRenderProps,
  useLocale,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Button } from "./button"

const cell = tv({
  // extend: focusRing,
  base: "flex size-10 cursor-default items-center justify-center rounded-lg tabular-nums outline-hidden sm:size-9 sm:text-sm/6 forced-colors:outline-0",
  variants: {
    isSelected: {
      false:
        "text-fg data-hovered:bg-secondary-fg/15 data-pressed:bg-secondary-fg/20 forced-colors:text-[ButtonText]",
      true: "bg-primary text-primary-fg data-invalid:bg-danger data-invalid:text-danger-fg forced-colors:bg-[Highlight] forced-colors:text-[Highlight] forced-colors:data-invalid:bg-[Mark]",
    },
    isFocused: {
      true: "bg-primary text-primary-fg ring-0 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
    },
    isDisabled: {
      true: "text-muted-fg forced-colors:text-[GrayText]",
    },
  },
})

interface CalendarProps<T extends DateValue>
  extends Omit<CalendarPrimitiveProps<T>, "visibleDuration"> {
  errorMessage?: string
  className?: string
}

const Calendar = <T extends DateValue>({ errorMessage, className, ...props }: CalendarProps<T>) => {
  return (
    <CalendarPrimitive {...props}>
      <CalendarHeader />
      <CalendarGrid className="[&_td]:border-collapse [&_td]:p-1 sm:[&_td]:px-0 sm:[&_td]:py-0.5">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className={composeRenderProps(className, (className, renderProps) =>
                cell({
                  ...renderProps,
                  className,
                }),
              )}
            />
          )}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-danger text-sm/6">
          {errorMessage}
        </Text>
      )}
    </CalendarPrimitive>
  )
}

const calendarHeaderStyles = tv({
  slots: {
    header: "flex w-full justify-center gap-1 px-1 pb-5 sm:pb-4",
    heading: "mr-2 flex-1 text-left font-medium text-muted-fg sm:text-sm",
    calendarGridHeaderCell: "pb-2 font-semibold text-muted-fg text-sm sm:px-0 sm:py-0.5 lg:text-xs",
  },
})

const { header, heading, calendarGridHeaderCell } = calendarHeaderStyles()

const CalendarHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { direction } = useLocale()

  return (
    <header data-slot="calendar-header" className={header({ className })} {...props}>
      <Heading className={heading()} />
      <div className="flex items-center gap-1">
        <Button
          size="square-petite"
          className="size-8 **:data-[slot=icon]:text-fg sm:size-7"
          shape="circle"
          appearance="plain"
          slot="previous"
        >
          {direction === "rtl" ? <IconChevronLgRight /> : <IconChevronLgLeft />}
        </Button>
        <Button
          size="square-petite"
          className="size-8 **:data-[slot=icon]:text-fg sm:size-7"
          shape="circle"
          appearance="plain"
          slot="next"
        >
          {direction === "rtl" ? <IconChevronLgLeft /> : <IconChevronLgRight />}
        </Button>
      </div>
    </header>
  )
}

const CalendarGridHeader = () => {
  return (
    <CalendarGridHeaderPrimitive>
      {(day) => <CalendarHeaderCell className={calendarGridHeaderCell()}>{day}</CalendarHeaderCell>}
    </CalendarGridHeaderPrimitive>
  )
}

Calendar.Header = CalendarHeader
Calendar.GridHeader = CalendarGridHeader

export type { CalendarProps }
export { Calendar }
