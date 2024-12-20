"use client"

import { ContextMenu } from "ui"

export default function ContextMenuSeparatorDemo() {
  return (
    <ContextMenu>
      <ContextMenu.Trigger className="grid place-content-center h-28 rounded-lg border-2 border-dashed sm:min-w-60">
        Right click me
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>Go to Definition</ContextMenu.Item>
        <ContextMenu.Item>Go to Type Definition</ContextMenu.Item>
        <ContextMenu.Item>Go to Source Definition</ContextMenu.Item>
        <ContextMenu.Item>Go to Implementations</ContextMenu.Item>
        <ContextMenu.Item>
          Go to References
          <ContextMenu.Keyboard keys={["⌘F12"]} />
        </ContextMenu.Item>
        <ContextMenu.Item>
          Peek
          <ContextMenu.Keyboard keys={["⇧F12"]} />
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>
          Find All References
          <ContextMenu.Keyboard keys={["⌘⇧F"]} />
        </ContextMenu.Item>
        <ContextMenu.Item>
          Find All Implementations
          <ContextMenu.Keyboard keys={["⌘⇧I"]} />
        </ContextMenu.Item>
        <ContextMenu.Item>Show Call Hierarchy</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Rename Symbol</ContextMenu.Item>
        <ContextMenu.Item>Change All Occurrences</ContextMenu.Item>
        <ContextMenu.Item>Format Document</ContextMenu.Item>
        <ContextMenu.Item>
          Refactor...
          <ContextMenu.Keyboard keys={["⌘⇧R"]} />
        </ContextMenu.Item>
        <ContextMenu.Item>Source Action...</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>
          Cut
          <ContextMenu.Keyboard keys={["⌘X"]} />
        </ContextMenu.Item>
        <ContextMenu.Item>
          Сору
          <ContextMenu.Keyboard keys={["⌘C"]} />
        </ContextMenu.Item>
        <ContextMenu.Item>
          Paste
          <ContextMenu.Keyboard keys={["⌘P"]} />
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  )
}
