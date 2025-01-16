"use client"

import { useState } from "react"

import { Button, CommandMenu } from "ui"

export default function CommandMenuDangerItemDemo() {
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
            <CommandMenu.Item>System Shutdown</CommandMenu.Item>
            <CommandMenu.Item isDanger>Format Disk</CommandMenu.Item>
            <CommandMenu.Item>Restart Service</CommandMenu.Item>
            <CommandMenu.Item>Empty Trash</CommandMenu.Item>
            <CommandMenu.Item>Overwrite File</CommandMenu.Item>
            <CommandMenu.Item isDanger>Reset Factory Settings</CommandMenu.Item>
            <CommandMenu.Item>Disconnect Network</CommandMenu.Item>
          </CommandMenu.Section>
        </CommandMenu.List>
      </CommandMenu>
    </>
  )
}
