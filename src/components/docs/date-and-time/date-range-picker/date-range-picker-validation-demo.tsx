"use client"

import { Button, DateRangePicker, Form } from "ui"

export default function DateRangePickerValidationDemo() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <DateRangePicker isRequired label="Event date" className="mb-2" />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
