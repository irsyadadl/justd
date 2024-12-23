"use client"

import React, { useState } from "react"

import generated from "@/__registry__/generated"
import { CodeHighlighter } from "@/components/code/code-highlighter"
import { CopyMotionButton } from "@/components/code/copy-button"
import { createFetchRegistryFile } from "@/resources/lib/fetch-registry"
import { IconBrandReactjs } from "justd-icons"

type RegistryItem = {
  component: React.LazyExoticComponent<any>
  files: string[]
  [key: string]: any
}

const registry = generated as Record<string, RegistryItem>

type SourceCodeProps = {
  toShow: string
  message?: string
  title?: string
  ext?: string
}

const fetchRegistryFile = createFetchRegistryFile("/registry/ui")

export const SourceCode = ({ toShow, ...props }: SourceCodeProps) => {
  const [rawSourceCode, setRawSourceCode] = useState<string | null>(null)

  /*
   * Prepend the `ui/` prefix to the provided `toShow` prop
   * to construct the registry key dynamically.
   */
  const registryKey = `ui/${toShow}`

  /*
   * Retrieve the component from the registry using the dynamic key.
   * This ensures that the correct component is loaded via React.lazy.
   */
  const Component = registry[registryKey]?.component
  const processedSourceCode = React.useMemo(() => {
    if (!rawSourceCode) return null

    return rawSourceCode
  }, [rawSourceCode])

  React.useEffect(() => {
    fetchRegistryFile(toShow).then(setRawSourceCode)
  }, [toShow])

  if (!Component) {
    /*
     * Display a fallback message if the component is not found in the registry.
     */
    return <p>Component "{toShow}" not found in the registry.</p>
  }

  if (processedSourceCode) {
    return (
      <section {...props} className="relative my-6 group not-prose">
        <p className="mb-4 -mt-2">
          {props.message
            ? props.message
            : "And next, you can copy the code below and paste it into your component folder."}
        </p>
        {props.title && <figcaption data-rehype-pretty-code-title="">{props.title}</figcaption>}
        <div className="flex justify-between items-center mb-1">
          <div className="flex gap-x-2 items-center font-mono tracking-tight text-[13px]">
            <IconBrandReactjs className="text-cyan-600 dark:text-cyan-500 size-4" /> {toShow}.tsx
          </div>
          <CopyMotionButton
            className="absolute right-2 top-20 rounded-sm group-hover:opacity-100"
            text={processedSourceCode}
          />
        </div>
        <div className="overflow-hidden rounded-lg border border-shiki-border bg-shiki-bg">
          <CodeHighlighter
            className="**:[pre]:p-4"
            removeLastLine
            plain
            code={processedSourceCode}
            lang={props.ext}
          />
        </div>
      </section>
    )
  }
}
