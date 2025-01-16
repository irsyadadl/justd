"use client"

import { useState } from "react"

import { Button, CommandMenu } from "ui"

export default function CommandMenuSeparatorDemo() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button appearance="outline" onPress={() => setIsOpen(true)}>
        Open
      </Button>
      <CommandMenu isOpen={isOpen} onOpenChange={setIsOpen}>
        <CommandMenu.Search placeholder="Quick search..." />
        <CommandMenu.List>
          <CommandMenu.Section>
            <CommandMenu.Item href="#">Profile Overview</CommandMenu.Item>
            <CommandMenu.Item href="#">Profile Settings</CommandMenu.Item>
            <CommandMenu.Item href="#">Security Settings</CommandMenu.Item>
            <CommandMenu.Separator />
            <CommandMenu.Item href="#">Notification Preferences</CommandMenu.Item>
            <CommandMenu.Item href="#">Privacy Settings</CommandMenu.Item>
            <CommandMenu.Separator />

            <CommandMenu.Item href="#">Billing Information</CommandMenu.Item>
            <CommandMenu.Item href="#">Subscription Plans</CommandMenu.Item>
            <CommandMenu.Separator />
            <CommandMenu.Item href="#">Connected Apps</CommandMenu.Item>
          </CommandMenu.Section>
        </CommandMenu.List>
      </CommandMenu>
    </>
  )
}
