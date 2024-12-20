"use client"

import * as React from "react"

import { cn } from "@/utils/classes"
import { composeRenderProps, Group, Toolbar as ToolbarPrimitive } from "react-aria-components"
import type { SeparatorProps, GroupProps, ToolbarProps } from "react-aria-components"
import { tv } from "tailwind-variants"

import { Separator } from "./separator"
import { Toggle } from "./toggle"

const toolbarStyles = tv({
  base: "flex gap-2 group",
  variants: {
    orientation: {
      horizontal:
        "flex-row [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]",
      vertical: "flex-col items-start"
    }
  }
})

const ToolbarSeparator = ({ className, ...props }: SeparatorProps) => {
  const { orientation } = React.useContext(ToolbarContext)
  const effectiveOrientation = orientation === "vertical" ? "horizontal" : "vertical"
  return (
    <Separator
      orientation={effectiveOrientation}
      className={cn(effectiveOrientation === "vertical" ? "mx-1.5" : "my-1.5 w-9", className)}
      {...props}
    />
  )
}

const ToolbarContext = React.createContext<{ orientation?: ToolbarProps["orientation"] }>({
  orientation: "horizontal"
})

const Toolbar = ({ orientation = "horizontal", ...props }: ToolbarProps) => {
  return (
    <ToolbarContext.Provider value={{ orientation }}>
      <ToolbarPrimitive
        orientation={orientation}
        {...props}
        className={composeRenderProps(props.className, (className, renderProps) =>
          toolbarStyles({ ...renderProps, className })
        )}
      />
    </ToolbarContext.Provider>
  )
}

const toolbarGroupStyles = tv({
  base: ["flex gap-2", "group-orientation-vertical:flex-col group-orientation-vertical:items-start"]
})

const ToolbarGroupContext = React.createContext<{ isDisabled?: boolean }>({})

const ToolbarGroup = ({ isDisabled, ...props }: GroupProps) => {
  return (
    <ToolbarGroupContext.Provider value={{ isDisabled }}>
      <Group className={toolbarGroupStyles()} {...props}>
        {props.children}
      </Group>
    </ToolbarGroupContext.Provider>
  )
}

const Item = ({ isDisabled, ...props }: React.ComponentProps<typeof Toggle>) => {
  const context = React.useContext(ToolbarGroupContext)
  const effectiveIsDisabled = isDisabled || context.isDisabled

  return <Toggle isDisabled={effectiveIsDisabled} {...props} />
}

Toolbar.Group = ToolbarGroup
Toolbar.Separator = ToolbarSeparator
Toolbar.Item = Item

export { Toolbar }
