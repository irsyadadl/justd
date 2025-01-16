"use client"

import { useState } from "react"

import { IconCreditCard, IconCube, IconGear, IconHome2, IconNotes, IconShield } from "justd-icons"
import { CommandMenu } from "ui"

export default function CommandMenuTriggerByKeyboardDemo() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      ⌘ /
      <CommandMenu shortcut="/" isOpen={isOpen} onOpenChange={setIsOpen}>
        <CommandMenu.Search placeholder="Quick search..." />
        <CommandMenu.List>
          <CommandMenu.Section className="mt-2" title="Pages">
            <CommandMenu.Item href="#">
              <IconHome2 /> Home
            </CommandMenu.Item>
            <CommandMenu.Item href="#">
              <IconNotes /> Docs
              <CommandMenu.Keyboard keys="⌘k" />
            </CommandMenu.Item>
            <CommandMenu.Item href="#">
              <IconCube /> Components
            </CommandMenu.Item>
          </CommandMenu.Section>
          <CommandMenu.Section title="Dashboard">
            <CommandMenu.Item href="#">
              <IconCreditCard /> Billing
            </CommandMenu.Item>
            <CommandMenu.Item href="#">
              <IconGear /> Settings
              <CommandMenu.Keyboard keys="⌘s" />
            </CommandMenu.Item>
            <CommandMenu.Item href="#">
              <IconShield /> Security
            </CommandMenu.Item>
          </CommandMenu.Section>
        </CommandMenu.List>
      </CommandMenu>
    </>
  )
}
