"use client"

import { createContext, forwardRef, use } from "react"

import { Loader } from "@/components/ui/loader"
import { Command } from "cmdk"
import { IconSearch, IconX } from "justd-icons"
import type { ModalOverlayProps, SeparatorProps, TextProps } from "react-aria-components"
import { Button, Dialog, Modal, ModalOverlay, Text } from "react-aria-components"
import { twJoin } from "tailwind-merge"
import { tv } from "tailwind-variants"

import { useMediaQuery } from "@/utils/use-media-query"
import type { KeyboardProps } from "./keyboard"
import { Keyboard } from "./keyboard"
import { Separator } from "./separator"

const commandStyles = tv({
  slots: {
    command: [
      "flex h-svh w-full flex-col overflow-hidden rounded-md sm:h-full",
      "[&_[cmdk-group-heading]]:-mb-1.5 [&_[cmdk-group-heading]]:ml-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-fg [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_[data-slot=icon]]:size-5 [&_[cmdk-input]]:h-12",
      "[&_[cmdk-item]]:py-2.5 [&_[cmdk-item]]:pr-4 [&_[cmdk-item]]:pl-2.5",
    ],
    list: "max-h-[calc(100vh-35%)] overflow-y-auto overflow-x-hidden pb-16 md:max-h-[456px] lg:pb-0 [&:not(:has(.xda32kfseccmd))]:p-2 [&:not(:has(.xda32kfseccmd))_.s3xsprt]:my-2",
    input: [
      "flex w-full rounded-md bg-transparent text-base placeholder:text-muted-fg forced-colors:focus:outline-0",
      "focus:outline-hidden",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    section: [
      "xda32kfseccmd overflow-hidden px-2 py-2 text-fg",
      "[&_[cmdk-group-heading]]:ml-[1px] [&_[cmdk-group-heading]]:select-none [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[0.8rem] [&_[cmdk-group-heading]]:text-muted-fg",
    ],
    modal: [
      "fixed top-auto bottom-0 left-[50%] z-50 grid h-[calc(100vh-35%)] w-full max-w-full translate-x-[-50%] gap-4 overflow-hidden rounded-t-2xl bg-overlay text-overlay-fg shadow-lg ring-1 ring-fg/10 sm:top-[6rem] sm:bottom-auto sm:h-auto sm:w-full sm:max-w-2xl sm:rounded-xl dark:ring-border forced-colors:border",
      "data-entering:fade-in-0 data-entering:slide-in-from-bottom sm:data-entering:slide-in-from-bottom-0 sm:data-entering:zoom-in-95 data-entering:animate-in data-entering:duration-300 sm:data-entering:duration-300",
      "data-exiting:fade-out sm:data-exiting:zoom-out-95 data-exiting:slide-out-to-bottom-56 sm:data-exiting:slide-out-to-bottom-0 data-exiting:animate-out data-exiting:duration-200",
    ],
    closeButton: [
      "absolute top-1.5 right-3 rounded-full border border-transparent px-2.5 py-2.5 text-xs transition-opacity data-disabled:pointer-events-none data-[state=open]:bg-secondary data-[state=open]:text-muted-fg data-focused:outline-hidden **:data-[slot=icon]:data-pressed:text-fg lg:top-3.5 lg:border-border lg:bg-secondary/50 lg:py-0.5 lg:data-focused:ring-ring lg:focus:border-fg/70 lg:focus:ring-2 [&>span>[data-slot=icon]]:text-muted-fg",
      "focus:outline-hidden lg:data-focused:border-primary/70 lg:data-focused:bg-primary/10 lg:data-focused:ring-2 lg:data-focused:ring-ring/20",
      "disabled:pointer-events-none",
    ],
    empty: "x3tmpy py-6 text-center text-muted-fg text-sm",
    kbdKeyboard: "hidden group-data-[selected=true]:text-current/90 lg:block",
    description: "ml-auto hidden text-sm sm:inline",
    item: [
      "group relative flex cursor-default select-none items-center rounded-lg py-2 text-fg text-sm outline-hidden forced-colors:outline-0",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-fg forced-colors:text-[WindowText] forced-colors:data-[selected=true]:bg-[Highlight] forced-colors:data-[selected=true]:text-[ActiveCaption] [&[data-selected=true]_[data-slot=icon]]:text-accent-fg",
      "focus-visible:bg-accent focus-visible:text-accent-fg [&:focus-visible_[data-slot=icon]]:text-accent-fg",
      "data-[danger=true]:data-[selected=true]:bg-danger data-[danger=true]:data-[selected=true]:text-danger-fg data-[danger=true]:text-danger",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      "**:data-[slot=icon]:mr-2 **:data-[slot=icon]:size-4.5 **:data-[slot=icon]:shrink-0 **:data-[slot=icon]:text-muted-fg",
      "**:data-[slot=avatar]:**:mr-2 **:data-[slot=avatar]:mr-2 **:data-[slot=avatar]:**:size-4.5 **:data-[slot=avatar]:size-4.5 **:data-[slot=avatar]:**:shrink-0 **:data-[slot=avatar]:shrink-0",
      "forced-colors:**:data-[slot=icon]:text-[CanvasText] forced-colors:group-data-[focus]:**:data-[slot=icon]:text-[Canvas] ",
    ],
  },

  variants: {
    isDanger: {
      true: "text-danger data-[selected=true]:bg-danger data-[selected=true]:text-danger-fg [&[data-selected=true]_[data-slot=icon]]:text-danger-fg",
    },
  },
})

const { command, empty, section, list, item, closeButton, modal, input, kbdKeyboard, description } =
  commandStyles()

interface CommandMenuContextProps {
  hideSearchIndicator?: boolean
  hideCloseButton?: boolean
  messageOnEmpty?: boolean | string
  isBlurred?: boolean
}

const CommandMenuContext = createContext<CommandMenuContextProps>({})

interface CommandMenuRootProps {
  CommandMenuEmpty?: typeof CommandMenuEmpty
  CommandMenuInput?: typeof CommandMenuInput
  CommandMenuItem?: typeof CommandMenuItem
  CommandMenuKeyboard?: typeof CommandMenuKeyboard
  CommandMenuList?: typeof CommandMenuList
  CommandMenuSection?: typeof CommandMenuSection
  CommandMenuSeparator?: typeof CommandMenuSeparator
  CommandMenuDescription?: typeof CommandMenuDescription
  CommandMenuLoading?: typeof CommandMenuLoading
}

const modalOverlay = tv({
  base: [
    "fixed inset-0 z-50 max-h-(--visual-viewport-height) bg-dark/15 dark:bg-dark/40",
    "data-entering:fade-in data-exiting:fade-out data-entering:animate-in data-exiting:animate-in",
  ],
  variants: {
    isBlurred: {
      true: "backdrop-blur",
      false: "bg-dark/15 dark:bg-dark/40",
    },
  },
})

interface CommandMenuProps
  extends ModalOverlayProps,
    CommandMenuRootProps,
    CommandMenuContextProps {
  children: React.ReactNode
  value?: string
  messageOnEmpty?: boolean | string
  onValueChange?: (value: string) => void
  classNames?: {
    overlay?: string
    content?: string
  }
}

const CommandMenu = ({
  classNames,
  hideSearchIndicator = false,
  hideCloseButton = false,
  messageOnEmpty,
  value,
  onValueChange,
  children,
  isBlurred = false,
  ...props
}: CommandMenuProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <CommandMenuContext.Provider value={{ hideSearchIndicator, hideCloseButton, messageOnEmpty }}>
      <ModalOverlay
        isDismissable
        className={modalOverlay({
          isBlurred,
          className: classNames?.overlay,
        })}
        {...props}
      >
        <Modal className={modal({ className: classNames?.content })}>
          <Dialog className="outline-hidden" aria-label="Command Palette">
            <>
              <Command
                value={value}
                shouldFilter={false}
                onValueChange={onValueChange}
                className={command()}
              >
                {children}
              </Command>
              {!hideCloseButton && (
                <Button autoFocus={!isDesktop} slot="close" className={closeButton()}>
                  <span className="hidden lg:block">Esc</span>
                  <span className="-mr-2 block lg:hidden">
                    <IconX />
                    <span className="sr-only">Close command palette</span>
                  </span>
                </Button>
              )}
            </>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </CommandMenuContext.Provider>
  )
}

interface CommandMenuInputProps extends React.ComponentPropsWithoutRef<typeof Command.Input> {
  isPending?: boolean
}

const CommandMenuInput = forwardRef<
  React.ComponentRef<typeof Command.Input>,
  CommandMenuInputProps
>(({ className, isPending, ...props }, ref) => {
  const { hideSearchIndicator } = use(CommandMenuContext)
  return (
    <div className="flex items-center border-b px-3">
      {!hideSearchIndicator &&
        (isPending ? (
          <Command.Loading className="mr-2 opacity-50 data-[slot=icon]:size-5 data-[slot=icon]:shrink-0">
            <Loader variant="spin" />
          </Command.Loading>
        ) : (
          <IconSearch className="mr-2 size-5 shrink-0 opacity-50" />
        ))}

      <Command.Input
        autoFocus
        ref={ref}
        className={input({ className: hideSearchIndicator ? "pl-1" : className })}
        {...props}
      />
    </div>
  )
})

CommandMenuInput.displayName = Command.Input.displayName

type CommandMenuListProps = React.ComponentProps<typeof Command.List>

const CommandMenuList = ({ className, ...props }: CommandMenuListProps) => {
  const { messageOnEmpty } = use(CommandMenuContext)
  return (
    <Command.List className={list({ className })} {...props}>
      {messageOnEmpty !== false && (
        <CommandMenuEmpty>
          {typeof messageOnEmpty === "string" ? messageOnEmpty : "No results found."}
        </CommandMenuEmpty>
      )}
      {props.children}
    </Command.List>
  )
}

type CommandMenuEmptyProps = React.ComponentProps<typeof Command.Empty>

const CommandMenuEmpty = ({ className, ...props }: CommandMenuEmptyProps) => {
  return <Command.Empty className={empty({ className })} {...props} />
}

const CommandMenuLoading = (props: React.ComponentProps<typeof Command.Loading>) => {
  return <Command.Loading {...props} />
}

interface CommandSectionProps extends React.ComponentProps<typeof Command.Group> {
  separator?: boolean
}

const CommandMenuSection = ({ className, separator, ...props }: CommandSectionProps) => {
  return (
    <>
      <Command.Group className={section({ className })} {...props}>
        {props.children}
        {separator && <CommandMenuSeparator className="mt-2" />}
      </Command.Group>
    </>
  )
}

const CommandMenuSeparator = ({ className, ...props }: SeparatorProps) => {
  return (
    <div className="-mx-4 s3xsprt">
      <Separator className={className} {...props} orientation="horizontal" />
    </div>
  )
}

interface CommandItemProps extends React.ComponentProps<typeof Command.Item> {
  isDanger?: boolean
}

const CommandMenuItem = ({ isDanger, className, ...props }: CommandItemProps) => {
  return (
    <Command.Item
      data-danger={isDanger ? "true" : undefined}
      className={item({ isDanger, className })}
      {...props}
    />
  )
}

interface CommandMenuDescriptionProps extends TextProps {
  intent?: "danger" | "warning" | "primary" | "secondary" | "success"
}

const CommandMenuDescription = ({ intent, className, ...props }: CommandMenuDescriptionProps) => {
  return (
    <Text
      {...props}
      slot="description"
      className={description({
        className: twJoin(
          intent === "danger"
            ? "text-danger/90 group-data-[selected=true]:text-accent-fg/70"
            : intent === "warning"
              ? "text-warning/90 group-data-[selected=true]:text-accent-fg/70"
              : intent === "success"
                ? "text-success/90 group-data-[selected=true]:text-accent-fg/70"
                : intent === "primary"
                  ? "text-accent/90 group-data-[selected=true]:text-white/70"
                  : "text-muted-fg group-data-[selected=true]:text-accent-fg/70",
          className,
        ),
      })}
    />
  )
}

const CommandMenuKeyboard = (props: KeyboardProps) => (
  <Keyboard classNames={{ kbd: kbdKeyboard(), base: "-mr-2.5" }} {...props} />
)

CommandMenu.Empty = CommandMenuEmpty
CommandMenu.Input = CommandMenuInput
CommandMenu.Item = CommandMenuItem
CommandMenu.Keyboard = CommandMenuKeyboard
CommandMenu.List = CommandMenuList
CommandMenu.Section = CommandMenuSection
CommandMenu.Separator = CommandMenuSeparator
CommandMenu.Description = CommandMenuDescription
CommandMenu.Loading = CommandMenuLoading

export type { CommandMenuProps, CommandItemProps, CommandSectionProps, CommandMenuDescriptionProps }
export { CommandMenu }
