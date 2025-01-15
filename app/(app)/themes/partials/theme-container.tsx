"use client"

import { Suspense, useState } from "react"

import { Blocks } from "@/app/(app)/themes/partials/blocks"
import { GeneratedTheme } from "@/app/(app)/themes/partials/generated-theme"
import { ThemeCustomizer } from "@/app/(app)/themes/partials/theme-customizer"
import { CodeHighlighter } from "@/components/code/code-highlighter"
import {
  IconBrandCss,
  IconChevronLgDown,
  IconDuplicate,
  IconLayoutColumnRightsideFill,
} from "justd-icons"
import { toast } from "sonner"
import { Button, Container, Heading, Menu, Sheet } from "ui"

import { generateTheme } from "./themes"

export function ThemeContainer() {
  const [selectedColors, setSelectedColors] = useState({
    primary: "blue",
    gray: "zinc",
    accent: "blue",
    radius: "0.5rem",
  })

  const copy = () => {
    navigator.clipboard.writeText(generateTheme(selectedColors))
    toast("Copied to clipboard.")
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <div className="py-4 sm:py-16">
      <Container>
        <div className="flex flex-col divide-y rounded-lg border lg:flex-row lg:divide-x lg:divide-y-0">
          <div className="w-full p-4 lg:w-1/2 lg:p-6">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-6">
              <div>
                <Heading level={2} className="sm:text-lg">
                  Theme Customizer
                </Heading>
                <p className="text-muted-fg text-sm">
                  Customize your theme by selecting colors from the color picker or by entering a
                  hex code.
                </p>
              </div>
            </div>
            <div>
              <ThemeCustomizer {...{ selectedColors, setSelectedColors }} />
              <div className="mt-3 flex justify-end">
                <Button className="flex w-full lg:hidden" onPress={handleOpen}>
                  <IconBrandCss />
                  Get Theme
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full px-4 pt-2 pb-4 lg:w-2/3 lg:p-6">
            <div className="mb-4 flex justify-between lg:mb-6">
              <div>
                <Heading level={2} className="sm:text-lg">
                  Generated Theme
                </Heading>
                <p className="text-muted-fg text-sm">
                  The generated colors are based on the selected gray color.
                </p>
              </div>
              <Menu>
                <Button className="hidden lg:flex">
                  Get Theme...
                  <IconChevronLgDown />
                </Button>
                <Menu.Content placement="bottom right" className="sm:min-w-(--trigger-width)">
                  <Menu.Item onAction={copy}>
                    <IconDuplicate />
                    Copy
                  </Menu.Item>
                  <Menu.Item onAction={handleOpen}>
                    <IconLayoutColumnRightsideFill />
                    Show theme
                  </Menu.Item>
                </Menu.Content>
              </Menu>
            </div>

            <GeneratedTheme />
          </div>
        </div>

        <Blocks />
        <Suspense fallback={<div>Loading...</div>}>
          <style>{generateTheme(selectedColors)}</style>
        </Suspense>
      </Container>

      <Sheet.Content
        onOpenChange={setOpen}
        isOpen={open}
        classNames={{ content: "bg-[#0e0e10] sm:max-w-md" }}
        side="right"
      >
        <Sheet.Header
          className="border-zinc-800 text-white *:text-white"
          title="Theme"
          description="Copy the theme below and paste it into your CSS file."
        />
        <Sheet.Body className="border-zinc-800 border-y pb-4">
          <CodeHighlighter
            plain
            max96={false}
            className="pt-4"
            code={generateTheme(selectedColors)}
          />
        </Sheet.Body>
        <Sheet.Footer className="gap-x-1">
          <Sheet.Close
            onPress={handleClose}
            className="hidden border-zinc-800 text-white data-hovered:border-zinc-700 data-pressed:border-zinc-700 data-hovered:bg-zinc-900 data-pressed:bg-zinc-800 sm:flex"
          >
            Close
          </Sheet.Close>
          <Button
            onPress={() => {
              copy()
              handleClose()
            }}
          >
            <IconDuplicate />
            Copy
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </div>
  )
}
