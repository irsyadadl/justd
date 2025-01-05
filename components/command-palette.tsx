"use client"
import { useEffect, useMemo, useState } from "react"

import Link from "next/link"
import { CommandMenu } from "ui"

import { useMediaQuery } from "@/utils/use-media-query"
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
import { useDocsSearch } from "fumadocs-core/search/client"
import type { PageTree } from "fumadocs-core/server"

export interface OpenCloseProps {
  openCmd: boolean
  setOpen?: (isOpen: boolean) => void
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

  const client = useDocsSearch({
    type: "fetch",
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setOpen?.(false)
    client.setSearch("")
  }, [pathname, setOpen])

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

  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <CommandMenu
      classNames={{
        content:
          "dark:supports-backdrop-filter:backdrop-blur-2xl dark:supports-backdrop-filter:bg-overlay/50",
      }}
      isOpen={openCmd}
      onOpenChange={setOpen}
    >
      <DebouncedCommandInput
        className="lg:text-sm"
        isPending={client.query.isLoading}
        onValueChange={client.setSearch}
        autoFocus={isDesktop}
        placeholder="Eg. Colors, Date, Chart, etc."
      />
      <CommandMenu.List className="scrollbar-hidden">
        {client.search === "" && (
          <>
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
          </>
        )}

        <CommandMenu.Section>
          {Array.isArray(client.query.data) &&
            client.query.data.map((item) => (
              <CommandMenu.Item
                key={item.id}
                value={item.content + item.id}
                onSelect={() => router.push(item.url)}
              >
                {item.type !== "page" ? <div className="ms-4 h-full" /> : null}
                {item.type === "page" && <IconCube />}
                {item.type === "heading" && <IconHashtag />}
                {item.type === "text" && <IconNotepad />}
                <p className="w-0 flex-1 truncate">{item.content}</p>
              </CommandMenu.Item>
            ))}
        </CommandMenu.Section>
      </CommandMenu.List>
    </CommandMenu>
  )
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

const useDebounce = (value: string, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export const DebouncedCommandInput = ({
  value,
  onValueChange,
  className,
  ...props
}: React.ComponentProps<typeof CommandMenu.Input>) => {
  const [localValue, setLocalValue] = useState(value || "")
  const debouncedValue = useDebounce(localValue)

  // Update local value when prop value changes
  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value)
    }
  }, [value])

  useEffect(() => {
    if (onValueChange && debouncedValue !== value) {
      onValueChange(debouncedValue)
    }
  }, [debouncedValue, onValueChange, value])

  return (
    <CommandMenu.Input
      className={className}
      value={localValue}
      onValueChange={setLocalValue}
      {...props}
    />
  )
}
