"use client"

import { getLocalTimeZone, today } from "@internationalized/date"
import { Button, DateRangePicker, Form } from "ui"

export default function DateRangePickerCustomValidationDemo() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <DateRangePicker
        label="Room Booking Dates"
        validate={(range) =>
          range?.end.compare(range.start) > 7 ? "Maximum booking duration is 1 week." : null
        }
        defaultValue={{
          start: today(getLocalTimeZone()),
          end: today(getLocalTimeZone()).add({ weeks: 2 }),
        }}
        className="mb-2"
      />
      <Button type="submit">Book Room</Button>
    </Form>
  )
}
