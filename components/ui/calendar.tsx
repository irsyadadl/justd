"use client"

import { IconChevronLgLeft, IconChevronLgRight } from "justd-icons"
import type { CalendarProps as CalendarPrimitiveProps, DateValue } from "react-aria-components"
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader as CalendarGridHeaderPrimitive,
  CalendarHeaderCell,
  Calendar as CalendarPrimitive,
  Heading,
  Text,
  composeRenderProps,
  useLocale,
} from "react-aria-components"

import { cn } from "@/utils/classes"
import { getLocalTimeZone, today } from "@internationalized/date"
import { Button } from "./button"

interface CalendarProps<T extends DateValue>
  extends Omit<CalendarPrimitiveProps<T>, "visibleDuration"> {
  errorMessage?: string
  className?: string
}

const Calendar = <T extends DateValue>({ errorMessage, className, ...props }: CalendarProps<T>) => {
  const now = today(getLocalTimeZone())

  return (
    <CalendarPrimitive {...props}>
      <CalendarHeader />
      <CalendarGrid className="[&_td]:border-collapse [&_td]:p-1 sm:[&_td]:px-0 sm:[&_td]:py-0.5">
        <CalendarGridHeader />
        <CalendarGridBody>
          {(date) => (
            <CalendarCell
              date={date}
              className={composeRenderProps(
                className,
                (className, { isSelected, isDisabled, isHovered }) =>
                  cn(
                    "relative flex size-10 cursor-default items-center justify-center rounded-lg text-fg tabular-nums outline-hidden data-hovered:bg-secondary-fg/15 sm:size-9 sm:text-sm/6 forced-colors:text-[ButtonText] forced-colors:outline-0",
                    isSelected &&
                      "bg-primary text-primary-fg data-hovered:bg-primary/90 data-invalid:bg-danger data-pressed:bg-primary data-invalid:text-danger-fg forced-colors:bg-[Highlight] forced-colors:text-[Highlight] forced-colors:data-invalid:bg-[Mark]",
                    isDisabled && "text-muted-fg forced-colors:text-[GrayText]",
                    date.compare(now) === 0 &&
                      "after:-translate-x-1/2 after:pointer-events-none after:absolute after:start-1/2 after:bottom-1 after:z-10 after:size-[3px] after:rounded-full after:bg-primary data-focused:after:bg-primary-fg data-selected:after:bg-primary-fg",
                    className,
                  ),
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

const CalendarHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { direction } = useLocale()

  return (
    <header
      data-slot="calendar-header"
      className={cn("flex w-full justify-center gap-1 px-1 pb-5 sm:pb-4", className)}
      {...props}
    >
      <Heading
        className={cn("mr-2 flex-1 text-left font-medium text-muted-fg sm:text-sm", className)}
      />
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
      {(day) => (
        <CalendarHeaderCell className="pb-2 font-semibold text-muted-fg text-sm sm:px-0 sm:py-0.5 lg:text-xs">
          {day}
        </CalendarHeaderCell>
      )}
    </CalendarGridHeaderPrimitive>
  )
}

Calendar.Header = CalendarHeader
Calendar.GridHeader = CalendarGridHeader

export type { CalendarProps }
export { Calendar }
