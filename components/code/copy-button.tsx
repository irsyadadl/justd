import React, { useEffect, useState } from "react"

import { copyToClipboard } from "@/resources/lib/copy"
import { cn } from "@/utils/classes"
import { Button } from "react-aria-components"
import { composeTailwindRenderProps } from "ui"

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  isCopied?: boolean
  setIsCopied?: (isCopied: boolean) => void
  alwaysVisible?: boolean
  text?: string
}

export function CopyButton({
  text,
  alwaysVisible = false,
  isCopied: isCopiedProp,
  setIsCopied: setIsCopiedProp,
  className,
  ...props
}: CopyButtonProps) {
  const [isCopiedState, setIsCopiedState] = useState(false)

  const isControlled = isCopiedProp !== undefined
  const isCopied = isControlled ? isCopiedProp : isCopiedState
  const setIsCopied = isControlled
    ? setIsCopiedProp || (() => {}) // Provide a no-op function as fallback
    : setIsCopiedState

  React.useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [isCopied, setIsCopied])

  const onPressHandler = () => {
    if (text) {
      copyToClipboard(text)
      setIsCopied(true)
    }
  }

  return (
    <Button
      aria-label="Copy to clipboard"
      onPress={props.onPress || onPressHandler}
      className={composeTailwindRenderProps(
        className,
        cn(
          "ml-auto grid size-8 place-content-center text-muted-fg outline-hidden data-hovered:text-fg group-data-hovered:opacity-100",
          !alwaysVisible ? "opacity-0" : "opacity-100",
          isCopied && "opacity-100",
        ),
      )}
      {...props}
    >
      {isCopied ? <ClipboardCheck /> : <Clipboard />}
    </Button>
  )
}

function Clipboard() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="currentColor"
      className="size-3.5"
      viewBox="0 0 16 16"
    >
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
    </svg>
  )
}

function ClipboardCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="currentColor"
      className="size-3.5"
      viewBox="0 0 16 16"
    >
      <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708" />
    </svg>
  )
}

function ClipboardIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        strokeWidth="0"
        d="M5.5 13.5v-5a2 2 0 0 1 2-2l.447-.894A2 2 0 0 1 9.737 4.5h.527a2 2 0 0 1 1.789 1.106l.447.894a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2Z"
      />
      <path
        fill="none"
        strokeLinejoin="round"
        d="M12.5 6.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2m5 0-.447-.894a2 2 0 0 0-1.79-1.106h-.527a2 2 0 0 0-1.789 1.106L7.5 6.5m5 0-1 1h-3l-1-1"
      />
    </svg>
  )
}

export function CopyMotionButton({ className, text }: { className?: string; text: string }) {
  const [copyCount, setCopyCount] = useState(0)
  const copied = copyCount > 0

  useEffect(() => {
    if (copyCount > 0) {
      const timeout = setTimeout(() => setCopyCount(0), 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [copyCount])

  return (
    <button
      type="button"
      className={cn(
        "group/button -top-0.5 absolute right-0 overflow-hidden rounded-sm py-1 pr-2.5 pl-1.5 font-medium text-[0.70rem]/[1.20rem] opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100 group-data-hovered/tabs:opacity-100",
        copied
          ? "bg-blue-400/10 ring-1 ring-blue-400/20 ring-inset"
          : "bg-secondary/80 text-secondary-fg ring-1 ring-fg/10 ring-inset",
        className,
      )}
      onClick={() => {
        window.navigator.clipboard.writeText(text).then(() => {
          setCopyCount((count) => count + 1)
        })
      }}
    >
      <span
        aria-hidden={copied}
        className={cn(
          "pointer-events-none flex items-center gap-0.5 text-zinc-500 transition duration-300 dark:text-zinc-400",
          copied && "-translate-y-1.5 opacity-0",
        )}
      >
        <ClipboardIcon className="size-5 fill-zinc-600/20 stroke-zinc-600 transition-colors group-hover/button:stroke-zinc-500 dark:fill-zinc-500/20 dark:stroke-zinc-500 dark:group-hover/button:stroke-zinc-400" />
        Copy
      </span>
      <span
        aria-hidden={!copied}
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center text-blue-400 transition duration-300",
          !copied && "translate-y-1.5 opacity-0",
        )}
      >
        Copied!
      </span>
    </button>
  )
}
