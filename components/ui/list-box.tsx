"use client"

import { IconCheck, IconHamburger } from "justd-icons"
import type { ListBoxItemProps, ListBoxProps } from "react-aria-components"
import { ListBoxItem, ListBox as ListBoxPrimitive, composeRenderProps } from "react-aria-components"
import { tv } from "tailwind-variants"

import { composeTailwindRenderProps } from "@/components/ui/primitive"
import { cn } from "@/utils/classes"
import { DropdownItemDetails, DropdownSection } from "./dropdown"

const listBoxStyles = tv({
  base: "flex max-h-96 [&::-webkit-scrollbar]:size-0.5 [scrollbar-width:thin] w-full gap-y-1 min-w-56 flex-col overflow-y-auto rounded-xl border p-1 shadow-lg outline-hidden",
})

const ListBox = <T extends object>({ className, ...props }: ListBoxProps<T>) => (
  <ListBoxPrimitive
    {...props}
    className={composeRenderProps(className, (className, renderProps) =>
      listBoxStyles({ ...renderProps, className }),
    )}
  />
)

const listBoxItemStyles = tv({
  base: "lbi cursor-pointer relative rounded-[calc(var(--radius-lg)-1px)] p-2 text-base outline-hidden sm:text-sm",
  variants: {
    isFocusVisible: {
      true: "bg-secondary text-accent-fg text-accent-fg/70",
    },
    isHovered: {
      true: "bg-accent [&:hover_[slot=label]]:text-accent-fg [&:hover_[slot=description]]:text-accent-fg/70 text-accent-fg [&_.text-muted-fg]:text-accent-fg/80",
    },
    isFocused: {
      true: "**:data-[slot=icon]:text-accent-fg **:data-[slot=label]:text-accent-fg [&_.text-muted-fg]:text-accent-fg/80 bg-accent text-accent-fg",
    },
    isSelected: {
      true: "**:data-[slot=icon]:text-accent-fg **:data-[slot=label]:text-accent-fg [&_.text-muted-fg]:text-accent-fg/80 bg-accent text-accent-fg",
    },
    isDragging: { true: "cursor-grabbing bg-secondary text-secondary-fg" },
    isDisabled: {
      true: "opacity-70 cursor-default text-muted-fg",
    },
  },
})

interface ItemProps<T extends object> extends ListBoxItemProps<T> {
  className?: string
}

const Item = <T extends object>({ children, className, ...props }: ItemProps<T>) => {
  const textValue = typeof children === "string" ? children : undefined

  return (
    <ListBoxItem
      textValue={textValue}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        listBoxItemStyles({
          ...renderProps,
          className,
        }),
      )}
    >
      {(values) => (
        <div className="flex gap-2 items-center">
          <>
            {values.allowsDragging && (
              <IconHamburger
                className={cn(
                  "size-4 shrink-0 text-muted-fg transition",
                  values.isFocused && "text-fg",
                  values.isDragging && "text-fg",
                  values.isSelected && "text-accent-fg/70",
                )}
              />
            )}
            <div className="flex flex-col">
              {typeof children === "function" ? children(values) : children}

              {values.isSelected && (
                <span className="absolute right-2 top-3 lg:top-2.5 animate-in">
                  <IconCheck />
                </span>
              )}
            </div>
          </>
        </div>
      )}
    </ListBoxItem>
  )
}

type ListBoxPickerProps<T> = ListBoxProps<T>

const ListBoxPicker = <T extends object>({ className, ...props }: ListBoxPickerProps<T>) => {
  return (
    <ListBoxPrimitive
      className={composeTailwindRenderProps(className, "max-h-72 overflow-auto p-1 outline-hidden")}
      {...props}
    />
  )
}

const Section = ({ className, ...props }: React.ComponentProps<typeof DropdownSection>) => {
  return (
    <DropdownSection className={cn(className, "[&_.lbi:last-child]:-mb-1.5 gap-y-1")} {...props} />
  )
}

ListBox.Section = Section
ListBox.ItemDetails = DropdownItemDetails
ListBox.Item = Item
ListBox.Picker = ListBoxPicker

export type { ListBoxPickerProps }
export { ListBox, listBoxStyles }
