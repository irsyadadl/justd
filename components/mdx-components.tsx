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
            className="text-blue-600 dark:text-blue-400 not-prose xd2432 outline-hidden data-hovered:underline data-focus-visible:ring-1"
            target="_blank"
            {...props}
          >
            {(props.children as string) ?? "Preview"}
            <IconArrowUpRight className="inline ml-1 size-3.5" />
          </Link>
        ),
        How: DocHow,
        a: (props: React.ComponentProps<"a">) => (
          <a
            {...props}
            className="text-blue-600 dark:text-blue-400 focus-visible:ring-1 not-prose xd2432 outline-hidden data-hovered:underline"
          />
        ),
        SourceCode: SourceCode,
        figure: (props: React.ComponentProps<"figure">) => (
          <figure
            className="*:[pre]:inset-ring-1 *:[pre]:inset-ring-zinc-800 *:[pre]:max-h-96 *:[pre]:rounded-lg *:[pre]:bg-shiki-bg *:[pre]:p-4"
            {...props}
          />
        ),
      }}
    />
  )
}
