"use client"

import React from "react"

import sidebar from "@/resources/lib/sidebar.json"
import { usePathname } from "next/navigation"
import type { LinkProps } from "react-aria-components"
import { Link } from "react-aria-components"
import { twMerge } from "tailwind-merge"
import { Badge, Heading } from "ui"

export interface SidebarItem {
  title: string
  slug?: string
  status?: string
  children?: SidebarItem[]
}

export function Aside() {
  return (
    <div className="flex flex-col gap-y-6 px-4">
      {sidebar.map((item: SidebarItem) => (
        <div key={item.slug || item.title}>
          {item.children && item.children.length > 0 && item.title !== "Components" && (
            <Heading
              className="flex gap-x-2 items-center mb-2 text-base font-medium sm:text-sm"
              level={3}
            >
              {item.title}
            </Heading>
          )}

          {item.children && item.children.length > 0 && (
            <div>
              {item.children.map((child: SidebarItem) => (
                <div key={child.slug || child.title}>
                  {child.children && child.children.length > 0 ? (
                    <Heading className="mb-2 text-base font-medium sm:text-sm" level={4}>
                      {child.title}
                    </Heading>
                  ) : (
                    <AsideLink href={`/${child.slug}` || "#"}>{child.title}</AsideLink>
                  )}

                  {child.children && child.children.length > 0 && (
                    <div className="mb-6 space-y-2">
                      {child.children.map((subChild: SidebarItem) => (
                        <AsideLink
                          key={subChild.slug || subChild.title}
                          href={`/${subChild.slug}` || "#"}
                        >
                          {subChild.title}

                          {subChild.status && (
                            <Badge
                              className="-mr-1.5"
                              intent={
                                subChild.status === "primitive"
                                  ? "secondary"
                                  : subChild.status === "beta"
                                    ? "warning"
                                    : "info"
                              }
                              shape="square"
                            >
                              {subChild.status}
                            </Badge>
                          )}
                        </AsideLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

interface AsideLinkProps extends LinkProps {
  isActive?: boolean
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
        "focus:outline-none",
        "hover:bg-muted hover:text-secondary-fg",
        isActive && [
          "font-medium",
          "bg-blue-100 text-blue-600 hover:bg-blue-100 hover:text-blue-600",
          "dark:bg-blue-400/10 dark:text-blue-400 dark:hover:bg-blue-400/10 dark:hover:text-blue-400"
        ]
      )}
    />
  )
}
