"use client"

import { useEffect, useMemo, useState } from "react"
import { CommandMenu } from "ui"

import { useMediaQuery } from "@/utils/use-media-query"
import { IconColors, IconColorSwatch, IconCube, IconHashtag, IconHome, IconNotes, } from "justd-icons"
import { usePathname, useRouter } from "next/navigation"

import { source } from "@/utils/source"
import { useDocsSearch } from "fumadocs-core/search/client"
import type { PageTree } from "fumadocs-core/server"
import { useDebouncedCallback } from "use-debounce"

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

  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [value, setValue] = useState(client.search || "")

  const debouncedSetSearch = useDebouncedCallback((newValue: string) => {
    const normalizedValue = newValue
      .toLowerCase()
      .replace(
        /(date|color|bar|text|time|group|tag|field|list|area|chart|file|range)([a-z]+)/g,
        "$1 $2",
      )

      .replaceAll("-", " ")
    client.setSearch(normalizedValue)
  }, 300)

  const onValueChange = (newValue: string) => {
    setValue(newValue)
    debouncedSetSearch(newValue)
  }

  useEffect(() => {
    setValue(client.search || "")
  }, [client.search])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (setOpen) {
      setOpen(false)
    }
  }, [pathname])
  return (
    <CommandMenu
      shortcut="k"
      classNames={{
        content: "dark:bg-bg/70 dark:backdrop-blur-xl",
      }}
      isOpen={openCmd}
      onOpenChange={setOpen}
      inputValue={value}
      onInputChange={onValueChange}
      isPending={client.query.isLoading}
    >
      <CommandMenu.Search autoFocus={isDesktop} placeholder="Eg. Colors, Date, Chart, etc." />
      <CommandMenu.List className="scrollbar-hidden">
        {client.search === "" && (
          <>
            <CommandMenu.Section>
              <CommandMenu.Item textValue="home" href="/">
                <IconHome /> <CommandMenu.Label>Home</CommandMenu.Label>
              </CommandMenu.Item>
              <CommandMenu.Item textValue="docs" href="/docs/2.x/getting-started/installation">
                <IconNotes /> <CommandMenu.Label>Docs</CommandMenu.Label>
              </CommandMenu.Item>
              <CommandMenu.Item textValue="components" href="/components">
                <IconCube /> <CommandMenu.Label>Components</CommandMenu.Label>
              </CommandMenu.Item>
              <CommandMenu.Item textValue="colors" href="/colors">
                <IconColors /> <CommandMenu.Label>Colors</CommandMenu.Label>
              </CommandMenu.Item>

              <CommandMenu.Item textValue="themes" href="/themes">
                <IconColorSwatch /> <CommandMenu.Label>Themes</CommandMenu.Label>
              </CommandMenu.Item>
              <CommandMenu.Item textValue="icons" href="/icons">
                <CommandMenu.Label>Icons</CommandMenu.Label>
              </CommandMenu.Item>
              <CommandMenu.Item textValue="blocks" href="/blocks">
                <CommandMenu.Label>Blocks</CommandMenu.Label>
              </CommandMenu.Item>
              <CommandMenu.Item textValue="blog" href="/blog">
                <CommandMenu.Label>Blog</CommandMenu.Label>
              </CommandMenu.Item>
            </CommandMenu.Section>

            {nonComponentPages.map((item, index) => (
              <CommandComposed key={index} node={item} />
            ))}
          </>
        )}

        <CommandMenu.Section>
          {Array.isArray(client.query.data) &&
            client.query.data.map((item) => {
              if (item.type === "text") {
                return
              }

              return (
                <CommandMenu.Item
                  key={item.id}
                  textValue={item.content + item.id}
                  onAction={() => router.push(item.url)}
                >
                  {/*{item.type !== "page" ? <div className="ms-4 h-full" /> : null}*/}
                  {item.type === "page" && <IconCube />}
                  {item.type === "heading" && <IconHashtag />}
                  <CommandMenu.Label className="truncate">{item.content}</CommandMenu.Label>
                </CommandMenu.Item>
              )
            })}
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
      <CommandMenu.Section title={node.name as string}>
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
        textValue={node.name as string}
        onAction={() => {
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
