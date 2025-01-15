import type { Docs } from "@/.velite"
import title from "title"

export function sortDocs(docs: Array<Docs>) {
  return docs.sort((a, b) => a.order - b.order)
}

export function goodTitle(str: string) {
  return title(str.replaceAll("-", " "))
}

export function wait(number: number) {
  return new Promise((resolve) => setTimeout(resolve, number))
}

export function getSiteName(url: string): string {
  return url.replace(/^(https?:\/\/)?(www\.)?/, "").split(".")[0]!
}

export function extractJSX(code: string) {
  // biome-ignore lint/correctness/noEmptyCharacterClassInRegex: <explanation>
  const match = code.match(/return\s*(\([^]*?\)|.*?);?\s*}/)
  if (match?.[1]) {
    const jsx = match[1].replace(/^\(|\)$/g, "").trim()
    const lines = jsx.split("\n")

    if (lines.length === 1) {
      return jsx
    }

    return lines
      .map((line) => {
        // @ts-ignore
        const indent = line.match(/^\s*/)[0]
        return indent.slice(4) + line.trim()
      })
      .join("\n")
      .trim()
  }
  return null
}

export function extractImports(code: string) {
  const importRegex = /^(import\s+(?:\{[^}]*}|[^;]+)\s*from\s*['"][^'"]+['"]\s*;?)$/gm
  const matches = code.match(importRegex)
  return matches ? matches.join("\n") : ""
}
