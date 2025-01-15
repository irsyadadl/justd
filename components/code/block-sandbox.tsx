"use client"

import { cache, memo, useCallback, useEffect, useState } from "react"

import generated from "@/__registry__/generated"
import { BrandIcon } from "@/components/brand-icon"
import { CodeHighlighter } from "@/components/code/code-highlighter"
import { CopyButton } from "@/components/code/copy-button"
import { IconDeviceDesktop, IconDeviceIpad, IconDevicePhone } from "@/components/icon-device"
import quotes from "@/resources/json/quotes.json"
import type { RegistryItem } from "@/resources/types"
import { cn } from "@/utils/classes"
import {
  IconCube,
  IconFolderFill,
  IconFolderOpenFill,
  IconFullscreen,
  IconLayoutAlignLeft,
  IconLayoutAlignTop,
  IconX,
} from "justd-icons"
import type { Key } from "react-aria-components"
import { Tab, TabList, ToggleButton } from "react-aria-components"
import {
  Button,
  Link,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarDisclosure,
  SidebarDisclosureGroup,
  SidebarDisclosurePanel,
  SidebarDisclosureTrigger,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarLabel,
  SidebarNav,
  SidebarProvider,
  Tabs,
  ToggleGroup,
  buttonStyles,
} from "ui"

const registry = generated as Record<string, RegistryItem>
interface FolderStructure {
  [key: string]: string | FolderStructure
}

type Props = {
  title: string
  defaultSelected: string
  preview: string
  fullscreen?: string
  expandKeys: string[]
  initialRegistry: string
  folders: FolderStructure
  isIframe?: boolean
}

function Component({ folders, fullscreen, isIframe = false, title, ...props }: Props) {
  const [device, setDevice] = useState(new Set<Key>(["desktop"]))

  const [selectedKey, setSelectedKey] = useState(props.defaultSelected)
  const [code, setCode] = useState("")
  const [registryKey, setRegistryKey] = useState(props.initialRegistry)
  const ComponentRegistry = registry[props.preview]?.component as React.ComponentType

  useEffect(() => {
    if (!registryKey) return
    fetchCode(registryKey).then((fetchedCode) => {
      const updatedCode = fetchedCode
        .replace(
          /import\s+AppSidebarNav\s+from\s+["']..\/app-sidebar-nav["']/g,
          'import AppSidebarNav from "@/components/app-sidebar-nav"',
        )
        .replace(
          /import\s+AppSidebar\s+from\s+["'](\.\/|\.\.\/)app-sidebar["']/g,
          'import AppSidebar from "@/components/app-sidebar"',
        )
        .replace(
          /import\s+AppNavbar\s+from\s+["'](\.\/|\.\.\/)app-navbar["']/g,
          'import AppNavbar from "@/components/app-navbar"',
        )
        .replace(
          /import\s+AppSidebar\s+from\s+["']\.\/app-sidebar["']/g,
          'import AppSidebar from "@/components/app-sidebar"',
        )
      setCode(updatedCode)
    })
  }, [registryKey])

  const renderTree = useCallback(
    (tree: FolderStructure, nestedLevel = 1) =>
      Object.entries(tree).map(([key, value]) => {
        const isString = typeof value === "string"
        return isString ? (
          <SidebarItem
            key={key}
            className="pl-[calc(var(--nested-level)*16px)]"
            style={{ "--nested-level": nestedLevel } as React.CSSProperties}
            onPress={() => {
              setRegistryKey(value)
              setSelectedKey(key)
            }}
            isCurrent={key === selectedKey}
          >
            <BrandIcon label={key} />
            <SidebarLabel>{key}</SidebarLabel>
          </SidebarItem>
        ) : (
          <DisclosureGroup
            key={key}
            defaultExpandedKeys={props.expandKeys!}
            id={key}
            element={({ isExpanded }) => (
              <>
                <SidebarDisclosureTrigger
                  className="pl-[calc(var(--nested-level)*16px)]"
                  style={{ "--nested-level": nestedLevel } as React.CSSProperties}
                >
                  {isExpanded ? (
                    <IconFolderOpenFill className="size-4 text-sky-600 dark:text-[#62cfff]" />
                  ) : (
                    <IconFolderFill className="size-4 text-sky-600 dark:text-[#62cfff]" />
                  )}
                  <SidebarLabel>{key}</SidebarLabel>
                </SidebarDisclosureTrigger>
                <SidebarDisclosurePanel>
                  {renderTree(value, nestedLevel + 1)}
                </SidebarDisclosurePanel>
              </>
            )}
          />
        )
      }),
    [props.expandKeys, selectedKey],
  )
  if (!Component && !isIframe) {
    return <p>Component "{props.preview}" not found in the registry.</p>
  }
  return (
    <div className="not-prose relative isolate flex overflow-hidden rounded-xl border">
      <Tabs className="w-full gap-0 p-1">
        <div className="mb-1 flex items-center justify-between overflow-hidden rounded-lg bg-navbar ring-1 ring-fg/10">
          <h2 className="ml-3.5 inline-flex items-center gap-x-1.5 font-medium text-sm **:data-[slot=icon]:text-muted-fg">
            {title.includes("Sidebar") ? (
              <IconLayoutAlignLeft />
            ) : title.includes("Navbar") ? (
              <IconLayoutAlignTop />
            ) : (
              <IconCube />
            )}
            {title}
          </h2>
          <div className="flex items-center rounded-s-lg bg-bg px-2 py-1 shadow-sm ring-1 ring-transparent dark:ring-border">
            <TabList className="flex items-center text-xs">
              <Tab
                className={({ isSelected }) =>
                  cn(
                    "cursor-pointer rounded-sm px-2.5 py-1.5 outline-hidden",
                    isSelected && "bg-primary text-primary-fg",
                  )
                }
                id="preview"
              >
                Preview
              </Tab>
              <Tab
                className={({ isSelected }) =>
                  cn(
                    "cursor-pointer rounded-sm px-2.5 py-1.5 outline-hidden",
                    isSelected && "bg-primary text-primary-fg",
                  )
                }
                id="code"
              >
                Code
              </Tab>
            </TabList>
            <Separator orientation="vertical" className="mx-2 h-6" />
            <ToggleGroup
              className="hidden items-center sm:flex"
              selectedKeys={device}
              onSelectionChange={setDevice}
            >
              <ToggleButton
                aria-label="Switch to phone display"
                className={({ isSelected }) =>
                  cn(
                    "p-1 outline-hidden data-focus-visible:inset-ring-1 data-focus-visible:inset-ring-primary *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0",
                    isSelected ? "text-fg" : "text-muted-fg/70",
                  )
                }
                id="phone"
              >
                <IconDevicePhone />
              </ToggleButton>
              <ToggleButton
                aria-label="Switch to ipad/tablet display"
                className={({ isSelected }) =>
                  cn(
                    "p-1 outline-hidden data-focus-visible:inset-ring-1 data-focus-visible:inset-ring-primary *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0",
                    isSelected ? "text-fg" : "text-muted-fg/70",
                  )
                }
                id="ipad"
              >
                <IconDeviceIpad />
              </ToggleButton>
              <ToggleButton
                aria-label="Switch to desktop / large screen display"
                className={({ isSelected }) =>
                  cn(
                    "p-1 outline-hidden data-focus-visible:inset-ring-1 data-focus-visible:inset-ring-primary *:data-[slot=icon]:size-4 *:data-[slot=icon]:shrink-0",
                    isSelected ? "text-fg" : "text-muted-fg/70",
                  )
                }
                id="desktop"
              >
                <IconDeviceDesktop />
              </ToggleButton>
            </ToggleGroup>
            <Separator orientation="vertical" className="mx-2 hidden h-6 sm:block" />
            {fullscreen && (
              <Link
                href={fullscreen}
                target="_blank"
                className={buttonStyles({ appearance: "plain", size: "square-petite" })}
                aria-label="Open in fullscreen"
              >
                <IconFullscreen />
              </Link>
            )}
          </div>
        </div>
        <Tabs.Panel id="preview">
          <div className="flex items-center justify-center">
            {isIframe ? (
              <iframe
                title="preview"
                src={props.preview}
                className={cn(
                  "min-h-160 w-full overflow-hidden rounded-lg border",
                  [...device].join(", ") === "phone" && "max-w-sm",
                  [...device].join(", ") === "ipad" && "max-w-3xl",
                  [...device].join(", ") === "desktop" && "max-w-none",
                )}
              />
            ) : (
              <div
                className={cn(
                  "min-h-140 w-full overflow-hidden rounded-lg border",
                  [...device].join(", ") === "phone" && "max-w-sm",
                  [...device].join(", ") === "ipad" && "max-w-3xl",
                  [...device].join(", ") === "desktop" && "max-w-none",
                )}
              >
                <ComponentRegistry />
              </div>
            )}
          </div>
        </Tabs.Panel>
        <Tabs.Panel id="code">
          <div className="flex max-h-(--height) min-h-(--height) overflow-hidden rounded-lg border [--height:85vh]">
            <SidebarProvider className="min-h-full">
              <Sidebar intent="fleet" className="h-full" collapsible="none">
                <SidebarHeader className="flex h-12 flex-row items-center justify-between border-b bg-gradient-to-b py-0">
                  <Link
                    className="flex items-center gap-x-2 group-data-[collapsible=dock]:size-10 group-data-[collapsible=dock]:justify-center"
                    href="/docs/2.x/components/layouts/sidebar"
                  >
                    <IconFolderFill className="size-4.5" />
                    <SidebarLabel className="font-medium text-sm">getjustd.com</SidebarLabel>
                  </Link>
                </SidebarHeader>
                <SidebarContent className="pb-10">{renderTree(folders)}</SidebarContent>
              </Sidebar>
              <SidebarInset className="overflow-hidden">
                <SidebarNav className="flex h-12 shrink-0 justify-between bg-sidebar">
                  <div className="flex flex-1 items-center">
                    <BrandIcon label={selectedKey} />
                    <strong className="ml-2 font-medium text-xs">{selectedKey}</strong>
                  </div>
                  <Button
                    onPress={() => {
                      setCode(`/**
* "${randomQuote.quote}"
* - ${randomQuote.name}
*/
                      `)
                    }}
                    className="-mr-2 data-hovered:bg-transparent data-hovered:**:data-[slot=icon]:rotate-90 **:data-[slot=icon]:text-muted-fg **:data-[slot=icon]:duration-200"
                    size="square-petite"
                    appearance="plain"
                  >
                    <IconX />
                  </Button>
                  <CopyButton
                    alwaysVisible
                    className="text-zinc-600 data-hovered:text-zinc-70 dark:text-zinc-400 dark:data-hovered:text-zinc-50"
                    text={code}
                  />
                </SidebarNav>
                <CodeHighlighter
                  max96={false}
                  plain
                  className={"h-full overflow-y-auto bg-shiki-bg px-6 pt-6 pb-32 text-white"}
                  code={code}
                />
              </SidebarInset>
            </SidebarProvider>
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

function DisclosureGroup(props: {
  defaultExpandedKeys: string[]
  id: string
  element: ({ isExpanded }: { isExpanded: any }) => React.ReactNode
}) {
  return (
    <SidebarDisclosureGroup defaultExpandedKeys={props.defaultExpandedKeys}>
      <SidebarDisclosure id={props.id}>{props.element}</SidebarDisclosure>
    </SidebarDisclosureGroup>
  )
}

const fetchCode = cache(async (registryKey: string) => {
  const response = await fetch(`/registry/${registryKey}.json`)
  const registryEntry = await response.json()
  return registryEntry?.files?.[0]?.content || ""
})

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]!

export const BlockSandbox = memo(Component)
