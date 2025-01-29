"use client"

import type {
  DialogTriggerProps,
  ModalOverlayProps,
  PopoverProps as PopoverPrimitiveProps,
} from "react-aria-components"
import {
  type DialogProps,
  DialogTrigger,
  Modal,
  ModalOverlay,
  OverlayArrow,
  PopoverContext,
  Popover as PopoverPrimitive,
  composeRenderProps,
  useSlottedContext,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { cn } from "@/utils/classes"
import { useMediaQuery } from "@/utils/use-media-query"
import { twMerge } from "tailwind-merge"
import type {
  DialogBodyProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogTitleProps,
} from "./dialog"
import { Dialog } from "./dialog"

type PopoverProps = DialogTriggerProps
const Popover = ({ children, ...props }: PopoverProps) => {
  return <DialogTrigger {...props}>{children}</DialogTrigger>
}

const Title = ({ level = 2, className, ...props }: DialogTitleProps) => (
  <Dialog.Title
    className={twMerge("sm:leading-none", level === 2 && "sm:text-lg", className)}
    {...props}
  />
)

const Header = ({ className, ...props }: DialogHeaderProps) => (
  <Dialog.Header className={twMerge("sm:p-4", className)} {...props} />
)

const Footer = ({ className, ...props }: DialogFooterProps) => (
  <Dialog.Footer className={cn("sm:p-4", className)} {...props} />
)

const Body = ({ className, ref, ...props }: DialogBodyProps) => (
  <Dialog.Body ref={ref} className={cn("sm:px-4 sm:pt-0", className)} {...props} />
)

const content = tv({
  base: [
    "peer/popover-content max-w-xs rounded-xl border bg-overlay bg-clip-padding text-overlay-fg shadow-xs transition-transform [scrollbar-width:thin] sm:max-w-3xl sm:text-sm dark:backdrop-saturate-200 forced-colors:bg-[Canvas] [&::-webkit-scrollbar]:size-0.5",
  ],
  variants: {
    isPicker: {
      true: "max-h-72 min-w-(--trigger-width) overflow-y-auto",
      false: "min-w-80",
    },
    isMenu: {
      true: "p-0",
    },
    isEntering: {
      true: [
        "fade-in animate-in duration-150 ease-out",
        "data-[placement=left]:slide-in-from-right-1 data-[placement=right]:slide-in-from-left-1 data-[placement=top]:slide-in-from-bottom-1 data-[placement=bottom]:slide-in-from-top-1",
      ],
    },
    isExiting: {
      true: [
        "fade-out animate-out duration-100 ease-in",
        "data-[placement=left]:slide-out-to-right-1 data-[placement=right]:slide-out-to-left-1 data-[placement=top]:slide-out-to-bottom-1 data-[placement=bottom]:slide-out-to-top-1",
      ],
    },
  },
})

const drawer = tv({
  base: [
    "fixed top-auto bottom-0 z-50 max-h-full w-full max-w-2xl border border-b-transparent bg-overlay outline-hidden",
  ],
  variants: {
    isMenu: {
      true: "rounded-t-xl p-0 [&_[role=dialog]]:*:not-has-[[data-slot=dialog-body]]:px-1",
      false: "rounded-t-2xl",
    },
    isEntering: {
      true: [
        "[transition:transform_0.5s_cubic-bezier(0.32,_0.72,_0,_1)] [will-change:transform]",
        "fade-in-0 slide-in-from-bottom-56 animate-in duration-200",
        "[transition:translate3d(0,_100%,_0)]",
        "sm:slide-in-from-bottom-auto sm:slide-in-from-top-[20%]",
      ],
    },
    isExiting: {
      true: "slide-out-to-bottom-56 animate-out duration-200 ease-in",
    },
  },
})

interface PopoverContentProps
  extends Omit<React.ComponentProps<typeof Modal>, "children">,
    Omit<PopoverPrimitiveProps, "children" | "className">,
    Omit<ModalOverlayProps, "className"> {
  children: React.ReactNode
  showArrow?: boolean
  style?: React.CSSProperties
  respectScreen?: boolean
  "aria-label"?: DialogProps["aria-label"]
  "aria-labelledby"?: DialogProps["aria-labelledby"]
  className?: string | ((values: { defaultClassName?: string }) => string)
}

const PopoverContent = ({
  respectScreen = true,
  children,
  showArrow = true,
  className,
  ...props
}: PopoverContentProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)")
  const popoverContext = useSlottedContext(PopoverContext)!
  const isMenuTrigger = popoverContext?.trigger === "MenuTrigger"
  const isSubmenuTrigger = popoverContext?.trigger === "SubmenuTrigger"
  const isMenu = isMenuTrigger || isSubmenuTrigger
  const offset = showArrow ? 12 : 8
  const effectiveOffset = isSubmenuTrigger ? offset - 5 : offset
  return isMobile && respectScreen ? (
    <ModalOverlay
      className="fixed top-0 left-0 isolate z-50 h-(--visual-viewport-height) w-full bg-overlay/10 [--visual-viewport-vertical-padding:16px]"
      {...props}
      isDismissable
    >
      <Modal
        className={composeRenderProps(className, (className, renderProps) =>
          drawer({ ...renderProps, isMenu, className }),
        )}
      >
        <Dialog
          role="dialog"
          aria-label={props["aria-label"] || isMenu ? "Menu" : undefined}
          className="outline-hidden"
        >
          {children}
        </Dialog>
      </Modal>
    </ModalOverlay>
  ) : (
    <PopoverPrimitive
      offset={effectiveOffset}
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        content({
          ...renderProps,
          className,
        }),
      )}
    >
      {showArrow && (
        <OverlayArrow className="group">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            className="group-data-[placement=left]:-rotate-90 block fill-overlay stroke-border group-data-[placement=bottom]:rotate-180 group-data-[placement=right]:rotate-90 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]"
          >
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      <Dialog
        role="dialog"
        aria-label={props["aria-label"] || isMenu ? "Menu" : undefined}
        className="outline-hidden"
      >
        {children}
      </Dialog>
    </PopoverPrimitive>
  )
}

const Picker = ({ children, className, ...props }: PopoverContentProps) => {
  return (
    <PopoverPrimitive
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        content({
          ...renderProps,
          isPicker: true,
          className,
        }),
      )}
    >
      {children}
    </PopoverPrimitive>
  )
}

Popover.Primitive = PopoverPrimitive
Popover.Trigger = Dialog.Trigger
Popover.Close = Dialog.Close
Popover.Content = PopoverContent
Popover.Description = Dialog.Description
Popover.Body = Body
Popover.Footer = Footer
Popover.Header = Header
Popover.Picker = Picker
Popover.Title = Title

export type { PopoverProps, PopoverContentProps }
export { Popover }
