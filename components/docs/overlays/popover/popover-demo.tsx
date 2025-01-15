"use client"

import { Button, Popover } from "ui"

export default function PopoverDemo() {
  return (
    <Popover>
      <Button>Forgot Password</Button>
      <Popover.Content className="max-w-72">
        <Popover.Header>
          <Popover.Title>Email</Popover.Title>
          <Popover.Description>We'll send you an email to log in.</Popover.Description>
        </Popover.Header>
        <Popover.Footer>
          <Button>Send Login Link</Button>
        </Popover.Footer>
      </Popover.Content>
    </Popover>
  )
}
