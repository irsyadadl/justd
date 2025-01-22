"use client"

import {
  IconChevronLgLeft,
  IconChevronLgRight,
  IconChevronWalkLeft,
  IconChevronWalkRight,
  IconDotsHorizontal,
} from "justd-icons"
import type { ListBoxItemProps, ListBoxProps, ListBoxSectionProps } from "react-aria-components"
import {
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Separator,
  composeRenderProps,
} from "react-aria-components"

import { cn } from "@/utils/classes"
import { tv } from "tailwind-variants"
import { buttonStyles } from "./button"

const paginationStyles = tv({
  slots: {
    pagination: "mx-auto flex w-full justify-center gap-[5px]",
    section: "flex h-9 gap-[5px]",
    list: "flex flex-row items-center gap-[5px]",
    itemButton:
      "cursor-pointer font-normal text-fg data-focus-visible:border-primary data-focus-visible:bg-primary/10 data-focus-visible:ring-4 data-focus-visible:ring-primary/20",
    itemLabel: "grid h-9 place-content-center px-3.5 tabular-nums",
    itemSeparator: "grid h-9 place-content-center",
    itemEllipsis:
      "flex size-9 items-center justify-center rounded-lg border border-transparent data-focus-visible:border-primary data-focus-visible:bg-primary/10 data-focused:outline-hidden data-focus-visible:ring-4 data-focus-visible:ring-primary/20",
    itemEllipsisIcon: "flex size-9 items-center justify-center",
    defaultItem:
      "cursor-pointer font-normal tabular-nums disabled:cursor-default disabled:opacity-100 data-focus-visible:border-primary data-focus-visible:bg-primary/10 data-focus-visible:ring-4 data-focus-visible:ring-primary/20",
    itemSeparatorLine: "h-5 w-[1.5px] shrink-0 rotate-[14deg] bg-secondary-fg/40",
  },
})

const {
  pagination,
  section,
  list,
  itemButton,
  itemLabel,
  itemSeparator,
  itemEllipsis,
  itemEllipsisIcon,
  defaultItem,
  itemSeparatorLine,
} = paginationStyles()

type PagginationProps = React.ComponentProps<"nav">
const Pagination = ({ className, ref, ...props }: PagginationProps) => (
  <nav aria-label="pagination" ref={ref} className={pagination({ className })} {...props} />
)

interface PaginationSectionProps<T> extends ListBoxSectionProps<T> {
  ref?: React.RefObject<HTMLElement>
}
const PaginationSection = <T extends object>({
  className,
  ref,
  ...props
}: PaginationSectionProps<T>) => (
  <ListBoxSection ref={ref} {...props} className={section({ className })} />
)

interface PaginationListProps<T> extends ListBoxProps<T> {
  ref?: React.RefObject<HTMLDivElement>
}
const List = <T extends object>({ className, ref, ...props }: PaginationListProps<T>) => {
  return (
    <ListBox
      ref={ref}
      orientation="horizontal"
      aria-label={props["aria-label"] || "Pagination"}
      layout="grid"
      className={composeRenderProps(className, (className) => list({ className }))}
      {...props}
    />
  )
}

const renderListItem = (
  props: ListBoxItemProps & {
    textValue?: string
    "aria-current"?: string | undefined
    isDisabled?: boolean
    className?: string
  },
  children: React.ReactNode,
) => <ListBoxItem {...props}>{children}</ListBoxItem>

interface PaginationItemProps extends ListBoxItemProps {
  children?: React.ReactNode
  className?: string
  intent?: "primary" | "secondary"
  size?: "medium" | "large" | "square-petite" | "extra-small" | "small"
  shape?: "square" | "circle"
  appearance?: "solid" | "outline" | "plain"
  isCurrent?: boolean
  segment?: "label" | "separator" | "ellipsis" | "default" | "last" | "first" | "previous" | "next"
}

const Item = ({
  segment = "default",
  size = "small",
  appearance = "outline",
  intent,
  className,
  isCurrent,
  children,
  ...props
}: PaginationItemProps) => {
  const textValue =
    typeof children === "string"
      ? children
      : typeof children === "number"
        ? children.toString()
        : undefined

  const renderPaginationIndicator = (indicator: React.ReactNode) =>
    renderListItem(
      {
        textValue: segment,
        "aria-current": isCurrent ? "page" : undefined,
        isDisabled: isCurrent,
        className: cn(
          buttonStyles({
            appearance: "outline",
            size: "small",
            className: itemButton(),
          }),
          className,
        ),
        ...props,
      },
      indicator,
    )

  switch (segment) {
    case "label":
      return renderListItem(
        {
          textValue: textValue,
          className: itemLabel({ className }),
          ...props,
        },
        children,
      )
    case "separator":
      return renderListItem(
        {
          textValue: "Separator",
          className: itemSeparator({ className }),
          ...props,
        },
        <Separator orientation="vertical" className={itemSeparatorLine()} />,
      )
    case "ellipsis":
      return renderListItem(
        {
          textValue: "More pages",
          className: itemEllipsis({ className }),
          ...props,
        },
        <span aria-hidden className={itemEllipsisIcon({ className })}>
          <IconDotsHorizontal />
        </span>,
      )
    case "previous":
      return renderPaginationIndicator(<IconChevronLgLeft />)
    case "next":
      return renderPaginationIndicator(<IconChevronLgRight />)
    case "first":
      return renderPaginationIndicator(<IconChevronWalkLeft />)
    case "last":
      return renderPaginationIndicator(<IconChevronWalkRight />)
    default:
      return renderListItem(
        {
          textValue: textValue,
          "aria-current": isCurrent ? "page" : undefined,
          isDisabled: isCurrent,
          className: cn(
            buttonStyles({
              intent: isCurrent ? "primary" : intent,
              appearance: isCurrent ? "solid" : appearance,
              size,
              className: defaultItem({ className }),
            }),
            className,
          ),
          ...props,
        },
        children,
      )
  }
}

Pagination.Item = Item
Pagination.List = List
Pagination.Section = PaginationSection

export type { PagginationProps, PaginationListProps, PaginationSectionProps, PaginationItemProps }
export { Pagination }
