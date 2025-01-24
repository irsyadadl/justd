"use client"

import { Button, ColorField, Form } from "ui"

export default function ColorFieldValidationDemo() {
  function submit(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <Form onSubmit={submit} className="space-y-4">
      <ColorField label="Color" isRequired placeholder="#FAFAFA" />
      <Button type="submit">Save</Button>
    </Form>
  )
}
