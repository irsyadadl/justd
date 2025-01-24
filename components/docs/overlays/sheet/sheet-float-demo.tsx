"use client"

import { Button, Sheet } from "ui"

export default function SheetFloatDemo() {
  return (
    <Sheet>
      <Button appearance="outline">Float</Button>
      <Sheet.Content isFloat={false}>
        <Sheet.Header>
          <Sheet.Title>Not Floated</Sheet.Title>
          <Sheet.Description>This sheet is not floated.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Footer>
          <Sheet.Close>Cancel</Sheet.Close>
          <Button intent="primary">Save Changes</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  )
}
