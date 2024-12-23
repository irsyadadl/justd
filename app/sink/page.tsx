"use client"

import DateRangePickerDemo from "@/components/docs/date-and-time/date-range-picker/date-range-picker-demo"
import { DateRangePicker } from "ui"

export default function Page() {
  return (
    <div className="grid gap-6 p-2 sm:grid-cols-3 sm:p-32">
      <DateRangePickerDemo />
      <DateRangePicker visibleDuration={{ months: 2 }} label="Event date" />
      {/*<DatePickerDemo/>*/}
    </div>
  )
}
