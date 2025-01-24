"use client"

import { Button, DateField, Form } from "ui"

export default function DateFieldValidationDemo() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <DateField isRequired label="Event date" className="mb-2" />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
