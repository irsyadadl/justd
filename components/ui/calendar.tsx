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
import { composeTailwindRenderProps, focusRing } from "./primitive"

const cell = tv({
  extend: focusRing,
  base: "flex size-10 sm:size-9 cursor-default tabular-nums items-center justify-center rounded-lg sm:text-sm forced-colors:outline-0",
  variants: {
    isSelected: {
      false:
        "text-fg forced-colors:text-[ButtonText] data-hovered:bg-secondary-fg/15 data-pressed:bg-secondary-fg/20",
      true: "bg-primary text-primary-fg data-invalid:bg-danger data-invalid:text-danger-fg forced-colors:bg-[Highlight] forced-colors:text-[Highlight] forced-colors:data-invalid:bg-[Mark]",
    },
    isDisabled: {
      true: "text-muted-fg/70 forced-colors:text-[GrayText]",
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
    <CalendarPrimitive
      className={composeTailwindRenderProps(className, "max-w-[17.5rem] sm:max-w-[15.8rem]")}
      {...props}
    >
      <CalendarHeader />
      <CalendarGrid className="[&_td]:border-collapse [&_td]:px-0">
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
        <Text slot="errorMessage" className="text-sm text-red-600">
          {errorMessage}
        </Text>
      )}
    </CalendarPrimitive>
  )
}

const calendarHeaderStyles = tv({
  slots: {
    header: "flex w-full justify-center gap-1 px-1 pb-5 sm:pb-4",
    heading: "mr-2 text-muted-fg sm:text-sm flex-1 text-left font-medium",
    calendarGridHeaderCell: "text-sm lg:text-xs font-semibold text-muted-fg",
  },
})

const { header, heading, calendarGridHeaderCell } = calendarHeaderStyles()

const CalendarHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { direction } = useLocale()

  return (
    <header data-slot="calendar-header" className={header({ className })} {...props}>
      <Heading className={heading()} />
      <div className="flex gap-1 items-center">
        <Button
          size="square-petite"
          className="size-8 **:data-[slot=icon]:text-fg sm:size-7"
          shape="circle"
          appearance="plain"
          slot="previous"
        >
          {direction === "rtl" ? <IconChevronLgRight /> : <IconChevronLgLeft aria-hidden />}
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
