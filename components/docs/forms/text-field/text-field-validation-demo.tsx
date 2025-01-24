"use client"

import { Button, Form, TextField } from "ui"

export default function TextFieldValidationDemo() {
  return (
    <Form className="space-y-4">
      <TextField isRequired label="Name" />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
