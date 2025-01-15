"use client"

import { Button, Checkbox, CheckboxGroup, Sheet } from "ui"

export default function SheetControlledDemo() {
  return (
    <Sheet>
      <Button appearance="outline">Notifications</Button>
      <Sheet.Content aria-label="Notifications">
        <Sheet.Header>
          <Sheet.Title>Manage Notifications</Sheet.Title>
          <Sheet.Description>Adjust your notification settings below.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Body>
          <CheckboxGroup aria-label="Notification Settings">
            <Checkbox
              value="n1"
              label="Email Notifications"
              description="Receive updates via email."
            />
            <Checkbox
              value="n2"
              label="SMS Notifications"
              description="Receive updates via SMS messages."
            />
            <Checkbox
              value="n3"
              label="Push Notifications"
              description="Receive real-time notifications on your device."
            />
          </CheckboxGroup>
        </Sheet.Body>
        <Sheet.Footer>
          <Sheet.Close>Cancel</Sheet.Close>
          <Button intent="primary">Save Settings</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>
  )
}
