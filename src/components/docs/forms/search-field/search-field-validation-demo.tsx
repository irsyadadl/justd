"use client"

import { Button, Form, SearchField } from "ui"

export default function SearchFieldValidationDemo() {
  return (
    <Form>
      <SearchField isRequired label="Name" className="mb-2" />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
