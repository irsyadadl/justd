"use client"

import { useState } from "react"

import { Button, CommandMenu } from "ui"

export default function CommandMenuDisabledDemo() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button appearance="outline" onPress={() => setIsOpen(true)}>
        Open
      </Button>
      <CommandMenu isOpen={isOpen} onOpenChange={setIsOpen}>
        <CommandMenu.Search placeholder="Quick search..." />
        <CommandMenu.List>
          <CommandMenu.Section title="Suggestions">
            <CommandMenu.Item>
              PhpStorm
              <CommandMenu.Description>Application</CommandMenu.Description>
            </CommandMenu.Item>
            <CommandMenu.Item>
              WebStorm
              <CommandMenu.Description>Application</CommandMenu.Description>
            </CommandMenu.Item>
            <CommandMenu.Item isDisabled>
              Warp
              <CommandMenu.Description>Need to enable</CommandMenu.Description>
            </CommandMenu.Item>
            <CommandMenu.Item isDisabled>
              Sublime Text
              <CommandMenu.Description>Need to enable</CommandMenu.Description>
            </CommandMenu.Item>
            <CommandMenu.Item>
              VS Code
              <CommandMenu.Description>Application</CommandMenu.Description>
            </CommandMenu.Item>
            <CommandMenu.Item isDisabled>
              Atom
              <CommandMenu.Description>Killed</CommandMenu.Description>
            </CommandMenu.Item>
          </CommandMenu.Section>
        </CommandMenu.List>
      </CommandMenu>
    </>
  )
}
