"use client"

import { useState } from "react"
import { Button, CommandMenu } from "ui"

export default function CommandMenuDescriptionDemo() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button appearance="outline" onPress={() => setIsOpen(true)}>
        Open
      </Button>
      <CommandMenu escapeButton={false} isOpen={isOpen} onOpenChange={setIsOpen}>
        <CommandMenu.Search
          className="*:data-[slot=command-menu-search-icon]:hidden"
          placeholder="Search for apps and commands..."
        />
        <CommandMenu.List>
          <CommandMenu.Section className="mt-2" title="Suggestions">
            <CommandMenu.Item>
              PhpStorm
              <CommandMenu.Description>Application</CommandMenu.Description>
            </CommandMenu.Item>
            <CommandMenu.Item>
              WebStorm
              <CommandMenu.Description>Application</CommandMenu.Description>
            </CommandMenu.Item>
            <CommandMenu.Item>
              Warp
              <CommandMenu.Description>Application</CommandMenu.Description>
            </CommandMenu.Item>
          </CommandMenu.Section>

          <CommandMenu.Section title="Applications">
            <CommandMenu.Item>
              Terminal
              <CommandMenu.Description>Application</CommandMenu.Description>
            </CommandMenu.Item>
            <CommandMenu.Item>
              Docker
              <CommandMenu.Description>Application</CommandMenu.Description>
            </CommandMenu.Item>
          </CommandMenu.Section>

          <CommandMenu.Section title="Commands">
            <CommandMenu.Item>
              Git status
              <CommandMenu.Description>Command</CommandMenu.Description>
            </CommandMenu.Item>
            <CommandMenu.Item>
              Bun add
              <CommandMenu.Description>Command</CommandMenu.Description>
            </CommandMenu.Item>
            <CommandMenu.Item>
              Composer require
              <CommandMenu.Description>Command</CommandMenu.Description>
            </CommandMenu.Item>
          </CommandMenu.Section>

          <CommandMenu.Section title="System Settings">
            <CommandMenu.Item>
              Display Brightness
              <CommandMenu.Description>System Settings</CommandMenu.Description>
            </CommandMenu.Item>
            <CommandMenu.Item>
              Sound Output
              <CommandMenu.Description>System Settings</CommandMenu.Description>
            </CommandMenu.Item>
          </CommandMenu.Section>
        </CommandMenu.List>
      </CommandMenu>
    </>
  )
}
