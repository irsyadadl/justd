import type React from "react"

import { GeneratedTheme } from "@/app/(app)/themes/partials/generated-theme"
import { Anatomy } from "@/components/code/anatomy"
import { CodeBlock } from "@/components/code/code-block"
import { CodeSandbox } from "@/components/code/code-sandbox"
import { EditorText } from "@/components/code/editor-text"
import { SourceCode } from "@/components/code/source-code"
import { DocComposed } from "@/components/doc-composed"
import { DocNote } from "@/components/doc-note"
import { Installation } from "@/components/installation"
import { useMDXComponent } from "@/resources/hooks/use-mdx"
import { IconArrowUpRight } from "justd-icons"
import Image from "next/image"
import { Link } from "ui"

import { BlockSandbox } from "@/components/code/block-sandbox"
import { PlainCode, Pre } from "@/components/code/plain-code"
import { DocHow } from "./code/doc-how"

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <Component
      components={{
        GeneratedTheme,
        pre: (props: React.ComponentProps<typeof PlainCode>) => (
          <PlainCode className="not-prose bg-black" {...props}>
            <Pre>{props.children}</Pre>
          </PlainCode>
        ),
        CodeBlock,
        BlockSandbox,
        EditorText: (props: React.ComponentProps<typeof EditorText>) => <EditorText {...props} />,
        CodeSandbox: (props: React.ComponentProps<typeof CodeSandbox>) => (
          <CodeSandbox {...props} />
        ),
        Installation,
        Note: DocNote,
        Anatomy: Anatomy,
        Composed: DocComposed,
        Image,
        NewTab: (props: React.ComponentProps<typeof Link>) => (
          <Link
            className="not-prose xd2432 text-blue-600 outline-hidden data-hovered:underline data-focus-visible:ring-1 dark:text-blue-400"
            target="_blank"
            {...props}
          >
            {(props.children as string) ?? "Preview"}
            <IconArrowUpRight className="ml-1 inline size-3.5" />
          </Link>
        ),
        How: DocHow,
        a: (props: React.ComponentProps<"a">) => (
          <a
            {...props}
            className="not-prose xd2432 text-blue-600 outline-hidden focus-visible:ring-1 data-hovered:underline dark:text-blue-400"
          />
        ),
        SourceCode: SourceCode,
      }}
    />
  )
}
