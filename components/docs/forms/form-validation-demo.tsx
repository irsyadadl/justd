"use client"

import { Button, Form, TextField } from "ui"

export default function FormValidationDemo() {
  return (
    <Form onSubmit={() => {}}>
      <TextField label="Name" isRequired className="mb-2" />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
