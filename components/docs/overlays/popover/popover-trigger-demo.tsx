"use client"

import { Avatar, Button, Popover } from "ui"

export default function PopoverTriggerDemo() {
  return (
    <Popover>
      <Popover.Trigger aria-label="Open Popover">
        <Avatar alt="cobain" src="/images/avatar/cobain.jpg" />
      </Popover.Trigger>
      <Popover.Content className="min-w-72">
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
