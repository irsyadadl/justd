"use client"

import { CodeHighlighter } from "@/components/code/code-highlighter"
import { CopyButton } from "@/components/code/copy-button"
import { copyToClipboard } from "@/resources/lib/copy"
import { cn } from "@/utils/classes"
import {
  IconBrackets2,
  IconBrandCss,
  IconBrandReactjs,
  IconBrandTypescript,
  IconFile,
} from "justd-icons"
import { useEffect, useState } from "react"
import { Tab } from "react-aria-components"
import { Tabs } from "ui"

interface Props {
  source: Record<string, string>
}

export function CodeBlock({ source }: Props) {
  const [contents, setContents] = useState<Record<string, string>>({})
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const handleCopy = (key: string, value: string | null) => {
    if (value) {
      copyToClipboard(value)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)
    }
  }
  useEffect(() => {
    const fetchContents = async () => {
      const loadedContents: Record<string, string> = {}
      for (const [name, path] of Object.entries(source)) {
        try {
          const response = await fetch(`/stubs/${path}.json`)
          const data = await response.json()
          loadedContents[name] = data.files[0].content
        } catch (error) {
          console.error(`Error fetching ${path}:`, error)
        }
      }
      setContents(loadedContents)
    }

    fetchContents()
  }, [source])

  return (
    <>
      {contents && Object.keys(contents).length > 0 ? (
        <Tabs className="relative gap-0">
          <div className="flex overflow-hidden justify-between items-center rounded-t-lg border-zinc-700 border-x border-y bg-[#0e0e10] dark:border-zinc-800">
            <Tabs.List className="gap-0 border-0">
              {Object.keys(contents).map((key) => (
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
          </div>
          {Object.entries(contents).map(([key, value]) => (
            <Tabs.Panel
              key={key}
              id={key}
              className="overflow-hidden rounded-b-lg border-b border-zinc-700 border-x bg-shiki-bg dark:border-zinc-800"
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
