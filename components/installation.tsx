"use client"

import React, { useState } from "react"

import { CodeHighlighter } from "@/components/code/code-highlighter"
import { CopyButton } from "@/components/code/copy-button"
import { copyToClipboard } from "@/resources/lib/copy"
import { useOpenPanel } from "@openpanel/nextjs"
import { Group } from "react-aria-components"
import { composeTailwindRenderProps, Link, Menu } from "ui"

const manualText =
  "Sometimes, using the CLI is the way to go, so make sure you install the necessary\n" +
  "          dependencies for the components you want to use."

export interface InstallationProps {
  items: string[]
  command?: string
  className?: string
  options: {
    isInit?: boolean
    isComponent?: boolean
    isManual?: boolean
    isExecutor?: boolean
    noText?: boolean
  }
}

export function Installation({ className, ...props }: InstallationProps) {
  const op = useOpenPanel()
  const {
    options = {
      isExecutor: false,
      isInit: false,
      isComponent: false,
      isManual: false,
      noText: true,
    },
    items,
  } = props
  const [pkgManager, setPkgManager] = useState({
    name: "npm",
    action: "i",
  })
  const [isCopied, setIsCopied] = useState(false)

  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (isCopied) {
      timer = setTimeout(() => setIsCopied(false), 2000)
    }
    return () => clearTimeout(timer)
  }, [isCopied])

  return (
    <div className={className}>
      {options.isComponent && !options.noText && (
        <p>
          If you hit any issues, make sure you check out the installation guide{" "}
          <Link
            className="text-blue-600 dark:text-blue-400 not-prose xd2432 data-hovered:underline"
            intent="primary"
            href="/docs/2.x/getting-started/cli"
            target="_blank"
            rel="noreferrer"
          >
            here
          </Link>{" "}
          for more information.
        </p>
      )}
      {options.isManual && <p>{manualText}</p>}
      <Group
        className={composeTailwindRenderProps(
          className,
          "group relative flex h-12 items-center overflow-hidden rounded-lg border bg-shiki-bg pr-1",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="hidden z-10 md:block ml-[0.395rem] size-6 text-zinc-400"
        >
          <path stroke="currentColor" d="m10 16 4-4-4-4" strokeLinecap="square" strokeWidth="2" />
        </svg>
        <CodeHighlighter
          plain
          className="overflow-x-auto flex-1 px-4 sm:px-1"
          lang="bash"
          code={
            props.command ||
            (options.isInit
              ? "npx justd-cli@latest init"
              : options.isComponent
                ? `npx justd-cli@latest add ${items[0]}`
                : `${pkgManager.name} ${pkgManager.action} ${items.join(" ")}`)
          }
        />
        {props.command ? (
          <CopyButton
            isCopied={isCopied}
            setIsCopied={setIsCopied}
            onPress={() => {
              copyToClipboard(props.command as string).then(() => {
                setIsCopied(true)
                op.track("cli pressed", { copy: props.command })
              })
            }}
          />
        ) : options.isComponent ? (
          <CopyButton
            isCopied={isCopied}
            setIsCopied={setIsCopied}
            onPress={() => {
              copyToClipboard(`npx justd-cli@latest add ${items[0]}`).then(() => {
                setIsCopied(true)
                op.track("cli pressed", { copy: `add ${items.join(" ")}` })
              })
            }}
          />
        ) : options.isInit ? (
          <CopyButton
            isCopied={isCopied}
            setIsCopied={setIsCopied}
            onPress={() => {
              copyToClipboard("npx justd-cli@latest init").then(() => {
                setIsCopied(true)
                op.track("cli pressed", { copy: "init" })
              })
            }}
          />
        ) : (
          <ChoosePkgManager
            {...{
              isExecutor: options.isExecutor,
              isCopied,
              setIsCopied,
              setPkgManager,
              items,
            }}
          />
        )}
      </Group>
    </div>
  )
}

interface PkgManager {
  name: string
  action: string
  executor?: string
}

interface ChoosePkgManagerProps {
  isCopied: boolean
  setIsCopied: (isCopied: boolean) => void
  setPkgManager: (pkgManager: PkgManager) => void
  items: string[]
  isExecutor?: boolean
}

function ChoosePkgManager({
  isExecutor,
  items,
  isCopied,
  setIsCopied,
  setPkgManager,
}: ChoosePkgManagerProps) {
  const op = useOpenPanel()

  function handleAction(tool: string) {
    let selectedPkgManager: PkgManager = {
      name: "",
      executor: "",
      action: "",
    }

    switch (tool) {
      case "npm":
        selectedPkgManager = {
          name: "npm",
          executor: "npx",
          action: "i",
        }
        break
      case "yarn":
        selectedPkgManager = {
          name: "yarn",
          executor: "yarn dlx",
          action: "add",
        }
        break
      case "pnpm":
        selectedPkgManager = {
          name: "pnpm",
          executor: "pnpm dlx",
          action: "add",
        }
        break
      case "bun":
        selectedPkgManager = {
          name: "bun",
          executor: "bunx",
          action: "add",
        }
        break
    }

    setPkgManager(selectedPkgManager)

    const executor = isExecutor ? selectedPkgManager.executor : selectedPkgManager.name
    copyToClipboard(`${executor} ${selectedPkgManager.action} ${items.join(" ")}`).then(() => {
      setIsCopied(true)
      op.track("cli pressed", {
        copy: `${executor} ${selectedPkgManager.action} ${items.join(" ")}`,
      })
    })
  }

  return (
    <Menu>
      <CopyButton isCopied={isCopied} setIsCopied={setIsCopied} />
      <Menu.Content showArrow placement="bottom end">
        {[
          { name: "NPM", vendor: "npm" },
          { name: "Yarn", vendor: "yarn" },
          { name: "Bun", vendor: "bun" },
          { name: "PNPM", vendor: "pnpm" },
        ].map(({ name, vendor }) => (
          <Menu.Item key={name} onAction={() => handleAction(vendor)}>
            {name}
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu>
  )
}
