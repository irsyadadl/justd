"use client"

import { Button, Form, TimeField } from "ui"

export default function TimeFieldValidationDemo() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <TimeField label="Event time" isRequired className="mb-2" />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
