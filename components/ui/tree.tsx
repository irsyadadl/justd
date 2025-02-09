"use client"

import { IconChevronRight } from "justd-icons"
import type { TreeItemProps, TreeProps } from "react-aria-components"
import {
  Button,
  UNSTABLE_TreeItemContent as TreeItemContentPrimitive,
  UNSTABLE_TreeItem as TreeItemPrimitive,
  UNSTABLE_Tree as TreePrimitive,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Checkbox } from "./checkbox"

const treeStyles = tv({
  base: "flex max-h-96 min-w-72 cursor-default flex-col overflow-auto rounded-lg border py-2 outline-hidden forced-color-adjust-none [scrollbar-width:thin] sm:text-sm [&::-webkit-scrollbar]:size-0.5",
  variants: {
    isFocusVisible: {
      true: "outline-2 outline-primary outline-offset-[-1px]",
    },
  },
})

const Tree = <T extends object>({ className, ...props }: TreeProps<T>) => {
  return (
    <TreePrimitive
      className={composeRenderProps(className, (className, renderProps) =>
        treeStyles({
          ...renderProps,
          className,
        }),
      )}
      {...props}
    >
      {props.children}
    </TreePrimitive>
  )
}

const itemStyles = tv({
  base: [
    "p-[0.286rem_0.286rem_0.286rem_0.571rem] pl-[calc((var(--tree-item-level)-1)*20px+0.571rem+var(--padding))] outline-hidden [--padding:20px] [&_[data-expanded]_[slot=chevron]_[data-slot=icon]]:rotate-90",
    "[&_[slot=chevron]]:outline-hidden [&_[slot=chevron]_[data-slot=icon]]:text-muted-fg",
    "data-has-child-rows:[--padding:0px]",
  ],
  variants: {
    isExpanded: {
      true: "[&_[slot=chevron]_[data-slot=icon]]:rotate-90 [&_[slot=chevron]_[data-slot=icon]]:text-fg [&_[slot=chevron]_[data-slot=icon]]:transition [&_[slot=chevron]_[data-slot=icon]]:duration-200",
    },
    isFocusVisible: {
      true: "data-focused:outline-hidden data-focus-visible:ring-1 data-focus-visible:ring-primary [&_[slot=chevron]_[data-slot=icon]]:text-fg",
    },
    isDisabled: {
      true: "opacity-50 forced-colors:text-[GrayText]",
    },
  },
})

const TreeItem = <T extends object>({ className, ...props }: TreeItemProps<T>) => {
  return (
    <TreeItemPrimitive
      className={composeRenderProps(className, (className, renderProps) =>
        itemStyles({
          ...renderProps,
          className,
        }),
      )}
      {...props}
    >
      {props.children}
    </TreeItemPrimitive>
  )
}

const TreeItemContent = (props: React.ComponentProps<typeof TreeItemContentPrimitive>) => {
  return (
    <TreeItemContentPrimitive {...props}>
      <div className="flex items-center">{props.children as React.ReactNode}</div>
    </TreeItemContentPrimitive>
  )
}

const TreeIndicator = () => {
  return (
    <Button className="relative shrink-0" slot="chevron">
      <IconChevronRight className="size-5" />
    </Button>
  )
}

const TreeItemCheckbox = () => {
  return <Checkbox slot="selection" />
}

const TreeItemLabel = (props: React.ComponentProps<"span">) => {
  return <span {...props} />
}

TreeItem.Label = TreeItemLabel
TreeItem.Indicator = TreeIndicator
TreeItem.Checkbox = TreeItemCheckbox
TreeItem.Content = TreeItemContent

export type { TreeProps, TreeItemProps }
export { Tree, TreeItem }
