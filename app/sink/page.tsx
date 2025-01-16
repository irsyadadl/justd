"use client"
import CommandMenuBlurDemo from "@/components/docs/controls/command-menu/command-menu-blur-demo"
import CommandMenuDescriptionDemo from "@/components/docs/controls/command-menu/command-menu-description-demo"
import CommandMenuSeparatorDemo from "@/components/docs/controls/command-menu/command-menu-separator-demo"
import CommandMenuTriggerByKeyboardDemo from "@/components/docs/controls/command-menu/command-menu-trigger-by-keyboard-demo"

export default function Page() {
  return (
    <div className="flex max-w-2xl gap-10 p-32">
      <CommandMenuSeparatorDemo />
      <CommandMenuTriggerByKeyboardDemo />
      <CommandMenuDescriptionDemo />
      <CommandMenuBlurDemo />
    </div>
  )
}
