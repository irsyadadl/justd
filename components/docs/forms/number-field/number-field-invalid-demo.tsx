"use client"

import { Button, Form, NumberField } from "ui"

export default function NumberFieldInvalidDemo() {
  return (
    <Form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <NumberField isRequired label="Cookies" />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
