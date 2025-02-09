"use client"

import { createContext, useContext } from "react"

import type { GroupProps, SeparatorProps, ToolbarProps } from "react-aria-components"
import { composeRenderProps, Group, Toolbar as ToolbarPrimitive } from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn } from "@/utils/classes"
import { composeTailwindRenderProps } from "./primitive"
import { Separator } from "./separator"
import { Toggle, type ToggleProps } from "./toggle"

const ToolbarContext = createContext<{ orientation?: ToolbarProps["orientation"] }>({
  orientation: "horizontal",
})

const toolbarStyles = tv({
  base: "group flex gap-2",
  variants: {
    orientation: {
      horizontal:
        "flex-row [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      vertical: "flex-col items-start",
    },
  },
})

const Toolbar = ({ orientation = "horizontal", className, ...props }: ToolbarProps) => {
  return (
    <ToolbarContext.Provider value={{ orientation }}>
      <ToolbarPrimitive
        orientation={orientation}
        {...props}
        className={composeRenderProps(className, (className, renderProps) =>
          toolbarStyles({ ...renderProps, className }),
        )}
      />
    </ToolbarContext.Provider>
  )
}

const ToolbarGroupContext = createContext<{ isDisabled?: boolean }>({})

type ToolbarGroupProps = GroupProps
const ToolbarGroup = ({ isDisabled, className, ...props }: ToolbarGroupProps) => {
  return (
    <ToolbarGroupContext.Provider value={{ isDisabled }}>
      <Group
        className={composeTailwindRenderProps(
          className,
          "flex gap-2 group-data-[orientation=vertical]:flex-col group-data-[orientation=vertical]:items-start",
        )}
        {...props}
      >
        {props.children}
      </Group>
    </ToolbarGroupContext.Provider>
  )
}

type ToggleItemProps = ToggleProps
const ToolbarItem = ({ isDisabled, ref, ...props }: ToggleItemProps) => {
  const context = useContext(ToolbarGroupContext)
  const effectiveIsDisabled = isDisabled || context.isDisabled

  return <Toggle ref={ref} isDisabled={effectiveIsDisabled} {...props} />
}
type ToolbarSeparatorProps = SeparatorProps
const ToolbarSeparator = ({ className, ...props }: ToolbarSeparatorProps) => {
  const { orientation } = useContext(ToolbarContext)
  const effectiveOrientation = orientation === "vertical" ? "horizontal" : "vertical"
  return (
    <Separator
      orientation={effectiveOrientation}
      className={cn(effectiveOrientation === "vertical" ? "mx-1.5" : "my-1.5 w-9", className)}
      {...props}
    />
  )
}

Toolbar.Group = ToolbarGroup
Toolbar.Separator = ToolbarSeparator
Toolbar.Item = ToolbarItem

export type { ToolbarGroupProps, ToolbarProps, ToggleItemProps, ToolbarSeparatorProps }
export { Toolbar }
