"use client"

import { Button, Form, Note, Sheet, TextField } from "ui"

export default function SheetCustomStyleDemo() {
  return (
    <Sheet>
      <Button intent="warning">Archive Project</Button>
      <Sheet.Content role="dialog">
        <Sheet.Header
          className="bg-bg border-b mb-4"
          title="Archive Project"
          description="Archiving this project will disable access and hide it from active projects."
        >
          <Note intent="warning">You can restore the project anytime from the archive!</Note>
        </Sheet.Header>
        <Form className="overflow-y-auto flex-1" onSubmit={() => {}}>
          <Sheet.Body className="space-y-4">
            <TextField
              isRequired
              autoFocus
              label="Confirm by typing the project name"
              type="text"
              placeholder="team/project-name"
            />
            <TextField isRequired label='To verify, type "archive my project" below' type="text" />
          </Sheet.Body>
          <Sheet.Footer>
            <Sheet.Close>Cancel</Sheet.Close>
            <Button intent="warning" type="submit">
              Archive Project
            </Button>
          </Sheet.Footer>
        </Form>
      </Sheet.Content>
    </Sheet>
  )
}