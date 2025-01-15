"use client"

import React, { useState } from "react"

import { cn } from "@/utils/classes"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

export interface CodeHighlighterProps {
  plain?: boolean
  lang?: string
  code: string
  max96?: boolean
  className?: string
  removeLastLine?: boolean
}

export const CodeHighlighter = ({
  max96 = true,
  removeLastLine = false,
  plain = false,
  lang = "tsx",
  code,
  className,
  ...props
}: CodeHighlighterProps) => {
  const [loading, setLoading] = useState(false)
  const [formattedCode, setFormattedCode] = useState("")
  const [error, setError] = useState("")

  React.useEffect(() => {
    setLoading(true)
    const processCode = async () => {
      try {
        const file = await unified()
          .use(remarkParse)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypePrettyCode, {
            keepBackground: false,
            theme: "vesper",
            defaultLang: {
              block: lang,
              inline: "plaintext",
            },
          })
          .use(rehypeStringify, { allowDangerousHtml: true })
          .process(`\`\`\`${lang}\n${code}\n\`\`\``)
        setFormattedCode(String(file))
      } catch (err) {
        setError("Failed to process code. Please check the configuration.")
        console.error(err)
      }
    }

    processCode().then(() => setLoading(false))
  }, [code, lang])

  if (error) {
    return <p>Error: {error}</p>
  }

  return loading ? (
    <div />
  ) : (
    <div
      {...props}
      className={cn(
        "not-prose overflow-auto font-mono text-sm",
        max96 && "max-h-96",
        !plain && "inset-ring-1 inset-ring-zinc-800 rounded-lg bg-shiki-bg px-4 py-2.5",
        removeLastLine &&
          "**:data-rehype-pretty-code-figure:*:[pre]:*:[code]:*:data-line:last:hidden",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: formattedCode }}
    />
  )
}
