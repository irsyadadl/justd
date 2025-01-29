import { useState } from "react"

import { IconHome } from "justd-icons"
import { CommandMenu } from "ui"

export default function CommandMenuAnatomy() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <CommandMenu isOpen={isOpen} onOpenChange={setIsOpen}>
      <CommandMenu.Search placeholder="Quick search..." />
      <CommandMenu.List>
        <CommandMenu.Section title="Pages">
          <CommandMenu.Item textValue="home" href="#">
            <IconHome /> Home
          </CommandMenu.Item>
        </CommandMenu.Section>
      </CommandMenu.List>
    </CommandMenu>
  )
}
