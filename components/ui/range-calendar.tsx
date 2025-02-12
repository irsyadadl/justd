"use client"

import { getLocalTimeZone, today } from "@internationalized/date"
import type {
  DateValue,
  RangeCalendarProps as RangeCalendarPrimitiveProps,
} from "react-aria-components"
import {
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  RangeCalendar as RangeCalendarPrimitive,
  Text,
} from "react-aria-components"
import { twMerge } from "tailwind-merge"
import { Calendar } from "./calendar"

interface RangeCalendarProps<T extends DateValue> extends RangeCalendarPrimitiveProps<T> {
  errorMessage?: string
}

const RangeCalendar = <T extends DateValue>({
  errorMessage,
  className,
  visibleDuration = { months: 1 },
  ...props
}: RangeCalendarProps<T>) => {
  const now = today(getLocalTimeZone())
  return (
    <RangeCalendarPrimitive visibleDuration={visibleDuration} {...props}>
      <Calendar.Header />
      <div className="flex gap-2 overflow-auto">
        {Array.from({ length: visibleDuration?.months ?? 1 }).map((_, index) => {
          const id = index + 1
          return (
            <CalendarGrid
              key={index}
              offset={id >= 2 ? { months: id - 1 } : undefined}
              className="**:[td]:px-0 **:[td]:py-[1.5px]"
            >
              <Calendar.GridHeader />
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className={twMerge([
                      "[--cell-fg:var(--color-primary)] [--cell:color-mix(in_oklab,var(--color-primary)_15%,white_85%)]",
                      "dark:[--cell-fg:color-mix(in_oklab,var(--color-primary)_80%,white_20%)] dark:[--cell:color-mix(in_oklab,var(--color-primary)_30%,black_45%)]",
                      "group/calendar-cell relative size-10 cursor-default outline-hidden [line-height:2.286rem] data-selection-start:rounded-s-lg data-selection-end:rounded-e-lg data-outside-month:text-muted-fg sm:text-sm lg:size-9",
                      "data-selected:bg-(--cell)/70 data-selected:text-(--cell-fg) dark:data-selected:bg-(--cell)",
                      "data-invalid:data-selected:bg-danger/10 data-focused:after:bg-primary-fg data-selected:after:bg-primary-fg dark:data-invalid:data-selected:bg-danger/13",
                      "[td:first-child_&]:rounded-s-lg [td:last-child_&]:rounded-e-lg",
                      "forced-colors:data-invalid:data-selected:bg-[Mark] forced-colors:data-selected:bg-[Highlight] forced-colors:data-selected:text-[HighlightText]",
                      date.compare(now) === 0 &&
                        "after:-translate-x-1/2 after:pointer-events-none after:absolute after:start-1/2 after:bottom-1 after:z-10 after:size-[3px] after:rounded-full after:bg-primary data-selected:after:bg-primary-fg",
                    ])}
                  >
                    {({
                      formattedDate,
                      isSelected,
                      isSelectionStart,
                      isSelectionEnd,
                      isDisabled,
                    }) => (
                      <span
                        className={twMerge(
                          "flex size-full items-center justify-center rounded-lg tabular-nums forced-color-adjust-none",
                          isSelected && (isSelectionStart || isSelectionEnd)
                            ? "bg-primary text-primary-fg group-data-invalid/calendar-cell:bg-danger group-data-invalid/calendar-cell:text-danger-fg forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:group-data-invalid/calendar-cell:bg-[Mark]"
                            : isSelected
                              ? [
                                  "group-data-hovered/calendar-cell:bg-primary/15 dark:group-data-hovered/calendar-cell:bg-primary/20 forced-colors:group-data-hovered/calendar-cell:bg-[Highlight]",
                                  "group-data-pressed/calendar-cell:bg-(--cell) forced-colors:text-[HighlightText] forced-colors:group-data-pressed/calendar-cell:bg-[Highlight]",
                                  "group-data-invalid/calendar-cell:group-data-hovered/calendar-cell:bg-danger/20 group-data-invalid/calendar-cell:group-data-pressed/calendar-cell:bg-danger/30 forced-colors:group-data-invalid/calendar-cell:group-data-pressed/calendar-cell:bg-[Mark]",
                                  "group-data-invalid/calendar-cell:text-danger forced-colors:group-data-invalid:group-data-hovered/calendar-cell:bg-[Mark]",
                                ]
                              : "group-data-hovered/calendar-cell:bg-secondary-fg/15 group-data-pressed/calendar-cell:bg-secondary-fg/20 forced-colors:group-data-pressed/calendar-cell:bg-[Highlight]",
                          isDisabled && "opacity-50 forced-colors:text-[GrayText]",
                        )}
                      >
                        {formattedDate}
                      </span>
                    )}
                  </CalendarCell>
                )}
              </CalendarGridBody>
            </CalendarGrid>
          )
        })}
      </div>

      {errorMessage && (
        <Text slot="errorMessage" className="text-danger text-sm">
          {errorMessage}
        </Text>
      )}
    </RangeCalendarPrimitive>
  )
}

export type { RangeCalendarProps }
export { RangeCalendar }
