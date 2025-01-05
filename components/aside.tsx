"use client"

import React from "react"
import type { PageTree } from "fumadocs-core/server"
// import sidebar from "@/resources/lib/sidebar.json"
import { Link } from "next-view-transitions"
import type { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { Badge, Heading, Separator } from "ui"
import { source } from "@/utils/source";

export interface SidebarItem {
  title: string
  slug?: string
  status?: string
  children?: SidebarItem[]
}

export function Aside() {
    const pageTree = source.pageTree
  return (
    <div className="flex flex-col gap-y-6 px-4">
        {pageTree.children.map((item, index) => {
            return <SidebarComposed key={index} node={item} />
        })}
    </div>
  )
}

interface AsideLinkProps extends LinkProps {
  isActive?: boolean
  children: React.ReactNode
}

function AsideLink({ href, ...props }: AsideLinkProps) {
  const path = usePathname()
  const isActive = path === href
  const ref = React.useRef<HTMLAnchorElement | null>(null)

  React.useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [isActive])
  return (
    <Link
      {...props}
      href={href}
      ref={ref}
      className={twMerge(
        "-ml-3 mb-0.5 flex items-center justify-between rounded-lg px-3 py-1.5 text-base text-muted-fg sm:text-sm",
        "data-focused:outline-hidden",
        "hover:bg-muted hover:text-secondary-fg",
        isActive && [
          "font-medium",
          "bg-blue-100 text-blue-600 hover:bg-blue-100 hover:text-blue-600",
          "dark:bg-blue-400/10 dark:text-blue-400 dark:hover:bg-blue-400/10 dark:hover:text-blue-400",
        ],
      )}
    />
  )
}

const SidebarComposed = ({
                             node,
                         }: {
    node: PageTree.Node
}) => {
    if (node.type === "folder") {
        return (
            <div>
                <Heading
                    className="mb-2 flex items-center gap-x-2 font-medium text-base sm:text-sm"
                    level={3}
                >
                    {node.name}
                </Heading>
                {node.children.map((child, index) => (
                    <SidebarComposed key={index} node={child} />
                ))}
            </div>
        )
    }

    if (node.type === "separator") {
        return <Separator />
    }

    if (node.type === "page") {
        return (
            <AsideLink href={node.url}>
                {node.icon}
                {node.name}
            </AsideLink>
        )
    }
}
