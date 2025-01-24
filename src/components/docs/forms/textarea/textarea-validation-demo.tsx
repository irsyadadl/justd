"use client"

import { useState } from "react"

import { Button, Form, Textarea } from "ui"

export default function TextareaValidationDemo() {
  const [value, setValue] = useState("")
  return (
    <Form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <Textarea value={value} onChange={setValue} label="Address" isRequired />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
