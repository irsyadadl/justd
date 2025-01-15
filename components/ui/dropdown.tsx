"use client"

import { cn } from "@/utils/classes"
import { IconCheck } from "justd-icons"
import {
  Collection,
  Header,
  ListBoxItem as ListBoxItemPrimitive,
  type ListBoxItemProps,
  ListBoxSection,
  type SectionProps,
  Text,
  type TextProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

const dropdownItemStyles = tv({
  base: [
    "group relative flex cursor-default select-none items-center gap-x-1.5 rounded-[calc(var(--radius-lg)-1px)] px-2.5 py-2 forced-color:text-[Highlight] text-base text-fg outline outline-0 forced-color-adjust-none sm:text-sm forced-colors:text-[LinkText]",
    "has-submenu:data-open:data-danger:bg-danger/20 has-submenu:data-open:data-danger:text-danger",
    "data-has-submenu:data-open:bg-accent data-has-submenu:data-open:text-accent-fg data-has-submenu:data-open:*:data-[slot=icon]:text-accent-fg data-has-submenu:data-open:*:[.text-muted-fg]:text-accent-fg",
    "**:data-[slot=avatar]:-mr-0.5 **:data-[slot=avatar]:*:size-6 **:data-[slot=avatar]:size-6 sm:**:data-[slot=avatar]:*:size-5 sm:**:data-[slot=avatar]:size-5",
    "data-danger:**:data-[slot=icon]:text-danger/70 data-focused:**:data-[slot=icon]:text-accent-fg data-hovered:**:data-[slot=icon]:text-accent-fg **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0 **:data-[slot=icon]:text-muted-fg data-focused:data-danger:**:data-[slot=icon]:text-danger-fg",
    "data-[slot=menu-radio]:*:data-[slot=icon]:size-3",
    "forced-colors:**:data-[slot=icon]:text-[CanvasText] forced-colors:group-data-focused:**:data-[slot=icon]:text-[Canvas] ",
  ],
  variants: {
    isDisabled: {
      true: "text-muted-fg forced-colors:text-[GrayText]",
    },
    isFocused: {
      false: "data-danger:text-danger",
      true: [
        "bg-accent text-accent-fg forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
        "data-danger:bg-danger data-danger:text-danger-fg",
        "data-[slot=description]:text-accent-fg data-[slot=label]:text-accent-fg [&_.text-muted-fg]:text-accent-fg/80",
      ],
    },
  },
})

const dropdownSectionStyles = tv({
  slots: {
    section:
      "first:-mt-[5px] xss3 flex flex-col gap-y-0.5 after:block after:h-[4px] after:content-['']",
    header:
      "-top-[5px] -mb-0.5 -mx-1.5 sticky z-10 min-w-(--trigger-width) truncate border-y bg-muted px-4 py-2 font-medium text-muted-fg text-sm supports-[-moz-appearance:none]:bg-muted [&+*]:mt-1",
  },
})

const { section, header } = dropdownSectionStyles()

interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string
}

const DropdownSection = <T extends object>({ className, ...props }: DropdownSectionProps<T>) => {
  return (
    <ListBoxSection className={section({ className })}>
      {"title" in props && <Header className={header()}>{props.title}</Header>}
      <Collection items={props.items}>{props.children}</Collection>
    </ListBoxSection>
  )
}

type DropdownItemProps = ListBoxItemProps

const DropdownItem = ({ className, ...props }: DropdownItemProps) => {
  const textValue =
    props.textValue || (typeof props.children === "string" ? props.children : undefined)
  return (
    <ListBoxItemPrimitive
      textValue={textValue}
      className={composeRenderProps(className, (className, renderProps) =>
        dropdownItemStyles({ ...renderProps, className }),
      )}
      {...props}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="flex flex-1 items-center gap-2 truncate font-normal group-data-selected:font-medium">
            {children}
          </span>

          {isSelected && (
            <span className="absolute top-3 right-2 lg:top-2.5">
              <IconCheck />
            </span>
          )}
        </>
      ))}
    </ListBoxItemPrimitive>
  )
}

interface DropdownItemDetailProps extends TextProps {
  label?: TextProps["children"]
  description?: TextProps["children"]
  classNames?: {
    label?: TextProps["className"]
    description?: TextProps["className"]
  }
}

const DropdownItemDetails = ({
  label,
  description,
  classNames,
  ...props
}: DropdownItemDetailProps) => {
  const { slot, children, title, ...restProps } = props

  return (
    <div className="flex flex-col gap-y-1" {...restProps}>
      {label && (
        <Text
          slot={slot ?? "label"}
          className={cn("font-medium sm:text-sm", classNames?.label)}
          {...restProps}
        >
          {label}
        </Text>
      )}
      {description && (
        <Text
          slot={slot ?? "description"}
          className={cn("text-muted-fg text-xs", classNames?.description)}
          {...restProps}
        >
          {description}
        </Text>
      )}
      {!title && children}
    </div>
  )
}

// Note: This is not exposed component, but it's used in other components to render dropdowns.
export type { DropdownSectionProps, DropdownItemProps, DropdownItemDetailProps }
export {
  DropdownItem,
  dropdownItemStyles,
  DropdownItemDetails,
  DropdownSection,
  dropdownSectionStyles,
}
