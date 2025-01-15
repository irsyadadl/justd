"use client"

import React, { useState } from "react"

import generated from "@/__registry__/generated"
import { CodeHighlighter } from "@/components/code/code-highlighter"
import { CopyButton } from "@/components/code/copy-button"
import { copyToClipboard } from "@/resources/lib/copy"
import type { RegistryItem } from "@/resources/types"
import { cn } from "@/utils/classes"
import {
  IconBrackets2,
  IconBrandCss,
  IconBrandReactjs,
  IconBrandTypescript,
  IconFile,
} from "justd-icons"
import { Tab } from "react-aria-components"
import { Tabs } from "ui"

interface Props {
  source: Record<string, string>
}

const registry = generated as Record<string, RegistryItem>

export function EditorText({ source }: Props) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const [rawSourceCode, setRawSourceCode] = useState<Record<string, string | null>>({})

  const handleCopy = (key: string, value: string | null) => {
    if (value) {
      copyToClipboard(value)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000) // Reset after 2 seconds
    }
  }

  React.useEffect(() => {
    const fetchRegistryData = async () => {
      const fetchedSourceCode: Record<string, string | null> = {}
      await Promise.all(
        Object.entries(source)
          .filter(([key]) => key !== "preview")

          .map(async ([key, path]) => {
            const registryKey = `${path}`
            const registryItem = registry[registryKey]

            if (registryItem) {
              try {
                const response = await fetch(`/registry/${registryKey}.json`)
                if (response.ok) {
                  const registryEntry = await response.json()
                  fetchedSourceCode[key] =
                    registryEntry.files?.[0]?.content || "No content available"
                } else {
                  console.error(`Failed to fetch source code for ${path}:`, response.status)
                  fetchedSourceCode[key] = "Error loading source code."
                }
              } catch (error) {
                console.error(`Error fetching source code for ${path}:`, error)
                fetchedSourceCode[key] = "Error loading source code."
              }
            } else {
              console.error(`Registry item for ${registryKey} not found.`)
              fetchedSourceCode[key] = "Registry item not found."
            }
          }),
      )
      setRawSourceCode(fetchedSourceCode)
    }

    fetchRegistryData()
  }, [source])

  return (
    <>
      {rawSourceCode && Object.keys(rawSourceCode).length > 0 ? (
        <Tabs className="relative gap-0">
          <div className="flex items-center justify-between overflow-hidden rounded-t-lg border-zinc-700 border-x border-y bg-[#0e0e10] dark:border-zinc-800">
            <Tabs.List className="gap-0 border-0">
              {Object.keys(rawSourceCode).map((key) => (
                <Tab
                  className={(values) =>
                    cn(
                      "flex cursor-pointer items-center gap-x-1.5 whitespace-nowrap px-3 py-2.5 font-mono text-xs text-zinc-400 tracking-tight",
                      "**:data-[slot=icon]:-ml-0.5 border-transparent border-x first:border-l-0 **:data-[slot=icon]:size-4 **:data-[slot=icon]:shrink-0",
                      values.isHovered && "bg-zinc-800 text-zinc-50 dark:bg-zinc-800/50",
                      values.isSelected &&
                        "border-zinc-700 bg-zinc-800 text-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50",
                      values.isFocused &&
                        "bg-zinc-800 text-zinc-50 outline-hidden dark:bg-zinc-800/50",
                      values.isFocusVisible && "bg-zinc-800 text-zinc-50 dark:bg-zinc-800/50",
                    )
                  }
                  key={key}
                  id={key}
                >
                  {key.includes("css") ? (
                    <IconBrandCss className="text-blue-500" />
                  ) : key.includes(".tsx") ? (
                    <IconBrandReactjs className="text-cyan-500" />
                  ) : key.includes(".ts") ? (
                    <IconBrandTypescript className="text-sky-500" />
                  ) : key.includes(".json") ? (
                    <IconBrackets2 className="text-purple-400" />
                  ) : (
                    <IconFile />
                  )}
                  <span>{key}</span>
                </Tab>
              ))}
            </Tabs.List>
            {/*<Tooltip>*/}
            {/*  <Tooltip.Trigger className="hidden gap-x-2 items-center pr-3 sm:flex">*/}
            {/*    <div className="bg-green-500 rounded-full size-3" />*/}
            {/*    <div className="bg-yellow-500 rounded-full size-3" />*/}
            {/*    <div className="bg-red-500 rounded-full size-3" />*/}
            {/*  </Tooltip.Trigger>*/}
            {/*  <Tooltip.Content className="max-w-[16rem]" placement="bottom right">*/}
            {/*    Nothing to worry about, this is a documentation file. You can safely ignore it.*/}
            {/*  </Tooltip.Content>*/}
            {/*</Tooltip>*/}
          </div>
          {Object.entries(rawSourceCode).map(([key, value]) => (
            <Tabs.Panel
              key={key}
              id={key}
              className="overflow-hidden rounded-b-lg border-zinc-700 border-x border-b bg-shiki-bg dark:border-zinc-800"
            >
              <CopyButton
                className="absolute top-0.5 right-1"
                alwaysVisible
                isCopied={copiedStates[key] || false}
                onPress={() => handleCopy(key, value)}
              />
              <CodeHighlighter
                plain
                removeLastLine
                className="overflow-auto p-4"
                code={value || "No source code available"}
              />
            </Tabs.Panel>
          ))}
        </Tabs>
      ) : (
        <div className="p-4 text-center">Loading source code...</div>
      )}
    </>
  )
}
