"use client"

import React, { useEffect, useMemo, useState } from "react"

import { CommandMenu } from "ui"

import Link from "next/link"

import sidebar from "@/resources/lib/sidebar.json"
import type { PageTree } from "fumadocs-core/server"

import { useMediaQuery } from "@/utils/use-media-query"
import { useCommandState } from "cmdk"
import {
  IconBrandJustd,
  IconColorSwatch,
  IconColors,
  IconCube,
  IconHashtag,
  IconHome,
  IconNotepad,
  IconNotes,
  IconWindowVisit,
} from "justd-icons"
import { usePathname, useRouter } from "next/navigation"

import { source } from "@/utils/source"
import { useDebounce } from "use-debounce"

export interface OpenCloseProps {
  openCmd: boolean
  setOpen?: (isOpen: boolean) => void
}

interface SidebarItem {
  title: string
  slug?: string
  status?: string
  children?: SidebarItem[]
  toc?: {
    title: string
    url: string
    depth: number
  }[]
}

export function CommandPalette({ openCmd, setOpen }: OpenCloseProps) {
  const router = useRouter()
  const pathname = usePathname()

  const firstChild = source.pageTree.children[0]
  const pageTree = firstChild?.type === "folder" ? firstChild : source.pageTree

  const nonComponentPages = useMemo(
    () => pageTree.children.filter((item) => item.name !== "Components"),
    [pageTree],
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        // @ts-ignore
        setOpen((open: boolean) => !open)
      }
    }

    document.addEventListener("keydown", down)

    return () => document.removeEventListener("keydown", down)
  }, [pathname, setOpen])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setOpen?.(false)
  }, [pathname, setOpen])

  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebounce(search, 300)

  function searchSidebarV2(items: PageTree.Node[], query: string): PageTree.Node[] {
    return items
  }

  function searchSidebar(items: SidebarItem[], query: string): SidebarItem[] {
    return items
      .map((item) => {
        const matchesTitle =
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.slug?.toLowerCase().includes(query.toLowerCase())

        const filteredChildren = item.children?.length ? searchSidebar(item.children, query) : []

        const filteredToc =
          item.toc
            ?.filter(
              (t, index, self) =>
                t.title.toLowerCase().includes(query.toLowerCase()) &&
                self.findIndex((tt) => tt.title === t.title) === index,
            )
            ?.slice(0, 5) || []

        const hasMatches = matchesTitle || filteredChildren.length > 0 || filteredToc.length > 0

        if (hasMatches) {
          return {
            ...item,
            children: matchesTitle ? item.children : filteredChildren,
            toc: filteredToc,
          }
        }

        return null
      })
      .filter(Boolean) as SidebarItem[]
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const filteredItems = useMemo(() => {
    if (!debouncedSearch) return []

    const sidebarItem = sidebar[3]

    if (!sidebarItem) {
      throw new Error("Sidebar item not found")
    }

    return searchSidebar(sidebarItem.children as any, debouncedSearch)
  }, [debouncedSearch, sidebar])

  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true)
      const timeout = setTimeout(() => setLoading(false), 100)
      return () => clearTimeout(timeout)
    }
    setLoading(false)
  }, [debouncedSearch])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setSearch("")
  }, [pathname])

  return (
    <CommandMenu
      classNames={{
        content:
          "dark:supports-backdrop-filter:backdrop-blur-2xl dark:supports-backdrop-filter:bg-overlay/50",
      }}
      isOpen={openCmd}
      onOpenChange={setOpen}
    >
      <CommandMenu.Input
        className="lg:text-sm"
        isPending={loading}
        value={search}
        onValueChange={setSearch}
        autoFocus={isDesktop}
        placeholder="Eg. Colors, Date, Chart, etc."
      />
      <CommandMenu.List className="scrollbar-hidden">
        <CommandMenu.Section>
          <CommandMenu.Item value="home" asChild>
            <Link href="/">
              <IconHome /> Home
            </Link>
          </CommandMenu.Item>
          <CommandMenu.Item value="documenation" asChild>
            <Link href="/docs/2.x/getting-started/installation">
              <IconNotes /> Docs
            </Link>
          </CommandMenu.Item>
          <CommandMenu.Item value="components" asChild>
            <Link href="/components">
              <IconCube /> Components
            </Link>
          </CommandMenu.Item>
          <CommandMenu.Item value="colors" asChild>
            <Link href="/colors">
              <IconColors /> Colors
            </Link>
          </CommandMenu.Item>
          <CommandMenu.Item value="icons" asChild>
            <Link href="/icons">
              <IconBrandJustd /> Icons
            </Link>
          </CommandMenu.Item>
          <CommandMenu.Item value="themes" asChild>
            <Link href="/themes">
              <IconColorSwatch /> Themes
            </Link>
          </CommandMenu.Item>
          <CommandMenu.Item value="blocks" asChild>
            <Link href="/blocks">
              <IconWindowVisit /> Blocks
            </Link>
          </CommandMenu.Item>
          <CommandMenu.Item value="blog" asChild>
            <Link href="/blog">
              <IconNotepad /> Blog
            </Link>
          </CommandMenu.Item>
        </CommandMenu.Section>
        {nonComponentPages.map((item, index) => (
          <CommandComposed key={index} node={item} />
        ))}
        {debouncedSearch &&
          filteredItems.map((item, i) => (
            <CommandMenu.Section key={`${item.slug}-${i}-${item.title}`} heading={item.title}>
              {item.children?.map((child) => (
                <React.Fragment key={`${item.slug}-${item.title}-${child.slug}-${child.title}`}>
                  <SubItem
                    value={`${item.title} ${child.title} ${item.slug} ${child.slug}`}
                    onSelect={() => router.push(`/${child.slug}`)}
                  >
                    <IconCube />
                    {child.title}
                  </SubItem>
                  {child.toc?.map((tocItem) => (
                    <SubItem
                      key={`toc-${child.slug || child.title}-${tocItem.url}`}
                      value={`toc-${child.title} ${child.slug} ${tocItem.title} ${tocItem.url}`}
                      onSelect={() => router.push(`/${child.slug}${tocItem.url}`)}
                    >
                      <IconHashtag />
                      {tocItem.title}
                      <CommandMenu.Description>{child.title}</CommandMenu.Description>
                    </SubItem>
                  ))}
                </React.Fragment>
              ))}
            </CommandMenu.Section>
          ))}
      </CommandMenu.List>
    </CommandMenu>
  )
}

const SubItem = (props: React.ComponentProps<typeof CommandMenu.Item>) => {
  const search = useCommandState((state) => state.search)
  if (!search) return null
  return <CommandMenu.Item {...props} />
}

const CommandComposed = ({
  node,
}: {
  node: PageTree.Node
}) => {
  const router = useRouter()

  if (node.type === "folder") {
    return (
      <CommandMenu.Section heading={node.name}>
        {node.children.map((child, index) => (
          <CommandComposed key={index} node={child} />
        ))}
      </CommandMenu.Section>
    )
  }

  if (node.type === "separator") {
    return <CommandMenu.Separator />
  }

  if (node.type === "page") {
    return (
      <CommandMenu.Item
        onSelect={() => {
          if (node.external) {
            window.open(node.url, "_blank")
          } else {
            router.push(node.url)
          }
        }}
      >
        {node.icon ? node.icon : <IconNotes />}
        {node.name}
      </CommandMenu.Item>
    )
  }
}
