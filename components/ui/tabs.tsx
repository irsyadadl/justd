"use client"

import * as React from "react"

import { cn } from "@/utils/classes"
import { LayoutGroup, motion } from "motion/react"
import {
  composeRenderProps,
  Tab as TabPrimitive,
  TabList,
  type TabListProps,
  TabPanel,
  type TabPanelProps,
  type TabProps,
  Tabs as TabsPrimitive,
  type TabsProps
} from "react-aria-components"
import { twJoin } from "tailwind-merge"
import { tv } from "tailwind-variants"

const tabsStyles = tv({
  base: "group flex gap-4 forced-color-adjust-none",
  variants: {
    orientation: {
      horizontal: "flex-col",
      vertical: "w-[800px] flex-row"
    }
  }
})

const Tabs = (props: TabsProps) => {
  return (
    <TabsPrimitive
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabsStyles({
          ...renderProps,
          className
        })
      )}
    />
  )
}

const tabListStyles = tv({
  base: "flex forced-color-adjust-none",
  variants: {
    orientation: {
      horizontal: "flex-row gap-x-5 border-b border-border",
      vertical: "flex-col items-start gap-y-4 border-l"
    }
  }
})

const List = <T extends object>(props: TabListProps<T>) => {
  const id = React.useId()
  return (
    <LayoutGroup id={id}>
      <TabList
        {...props}
        className={composeRenderProps(props.className, (className, renderProps) =>
          tabListStyles({ ...renderProps, className })
        )}
      />
    </LayoutGroup>
  )
}

const tabStyles = tv({
  base: [
    "relative flex whitespace-nowrap cursor-default items-center rounded-full text-sm font-medium outline-none transition hover:text-fg [&>[data-slot=icon]]:size-4 [&>[data-slot=icon]]:mr-2",
    // hor
    "group-orientation-vertical:w-full group-orientation-vertical:py-0 group-orientation-vertical:pl-4 group-orientation-vertical:pr-2",
    // ver
    "group-orientation-horizontal:pb-3"
  ],
  variants: {
    isSelected: {
      false: "text-muted-fg",
      true: "text-fg"
    },
    isFocused: { false: "ring-0", true: "text-fg" },
    isDisabled: {
      true: "text-muted-fg/50"
    }
  }
})

const Tab = ({ children, ...props }: TabProps) => {
  return (
    <TabPrimitive
      {...props}
      className={composeRenderProps(props.className, (_className, renderProps) =>
        tabStyles({
          ...renderProps,
          className: twJoin("href" in props && "cursor-pointer", _className)
        })
      )}
    >
      {({ isSelected }) => (
        <>
          {children as React.ReactNode}
          {isSelected && (
            <motion.span
              className={cn(
                "absolute rounded bg-fg",
                // horizontal
                "group-orientation-horizontal:inset-x-0 group-orientation-horizontal:-bottom-px group-orientation-horizontal:h-0.5 group-orientation-horizontal:w-full",
                // vertical
                "group-orientation-vertical:left-0 group-orientation-vertical:h-[calc(100%-10%)] group-orientation-vertical:w-0.5 group-orientation-vertical:transform"
              )}
              layoutId="current-selected"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          )}
        </>
      )}
    </TabPrimitive>
  )
}

const tabPanelStyles = tv({
  base: "flex-1 text-sm text-fg",
  variants: {
    isFocusVisible: {
      true: "outline-none"
    }
  }
})

const Panel = (props: TabPanelProps) => {
  return (
    <TabPanel
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        tabPanelStyles({ ...renderProps, className })
      )}
    />
  )
}

Tabs.List = List
Tabs.Tab = Tab
Tabs.Panel = Panel

export { Tabs }
