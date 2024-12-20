"use client"

import { IconChevronLgRight } from "justd-icons"
import type { BreadcrumbProps, BreadcrumbsProps } from "react-aria-components"
import {
  Breadcrumb,
  Breadcrumbs as BreadcrumbsPrimitive,
  type LinkProps,
} from "react-aria-components"

import { cn } from "@/utils/classes"
import { Link } from "./link"
import { composeTailwindRenderProps } from "./primitive"

const Breadcrumbs = <T extends object>({ className, ...props }: BreadcrumbsProps<T>) => {
  return <BreadcrumbsPrimitive {...props} className={cn("flex items-center gap-2", className)} />
}

interface BreadcrumbsItemProps extends BreadcrumbProps {
  href?: string
  separator?: "slash" | "chevron" | boolean
}

const BreadcrumbsItem = ({
  href,
  separator = true,
  className,
  ...props
}: BreadcrumbsItemProps & Partial<Omit<LinkProps, "className">>) => {
  const separatorValue = separator === true ? "chevron" : separator

  return (
    <Breadcrumb
      {...props}
      className={composeTailwindRenderProps(className, "flex items-center gap-2 text-sm")}
    >
      {({ isCurrent }) => (
        <>
          {<Link href={href} {...props} />}
          {!isCurrent && separator !== false && <Separator separator={separatorValue} />}
        </>
      )}
    </Breadcrumb>
  )
}

const Separator = ({
  separator = "chevron",
}: { separator?: BreadcrumbsItemProps["separator"] }) => {
  return (
    <span className="*:shrink-0 *:text-muted-fg *:data-[slot=icon]:size-3.5">
      {separator === "chevron" && <IconChevronLgRight />}
      {separator === "slash" && <span className="text-muted-fg">/</span>}
    </span>
  )
}

Breadcrumbs.Item = BreadcrumbsItem

export type { BreadcrumbsProps, BreadcrumbsItemProps }
export { Breadcrumbs }
