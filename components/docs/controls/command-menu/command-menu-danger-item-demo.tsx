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
            <CommandMenu.Item textValue="system shutdown">System Shutdown</CommandMenu.Item>
            <CommandMenu.Item isDanger>Format Disk</CommandMenu.Item>
            <CommandMenu.Item textValue="restart service">Restart Service</CommandMenu.Item>
            <CommandMenu.Item textValue="empty trash">Empty Trash</CommandMenu.Item>
            <CommandMenu.Item textValue="overwrite file">Overwrite File</CommandMenu.Item>
            <CommandMenu.Item textValue="reset factory settings" isDanger>
              Reset Factory Settings
            </CommandMenu.Item>
            <CommandMenu.Item textValue="disconnect network">Disconnect Network</CommandMenu.Item>
          </CommandMenu.Section>
        </CommandMenu.List>
      </CommandMenu>
    </>
  )
}
