"use client"

import { useState } from "react"

import { getLocalTimeZone, parseDate, startOfYear, today } from "@internationalized/date"
import { Button, DatePicker, Form } from "ui"

export default function DatePickerInvalidDemo() {
  const ly = startOfYear(today(getLocalTimeZone()))
  const now = today(getLocalTimeZone())
  const [value, setValue] = useState(parseDate(ly.toString()))
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <DatePicker
        validate={(date) => (date < now ? "Select a future date, please." : null)}
        value={value}
        onChange={(newValue) => setValue(newValue!)}
        label="Delivery date"
        className="mb-2"
      />

      <Button type="submit">Submit</Button>
    </Form>
  )
}
