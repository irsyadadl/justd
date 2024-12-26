"use client"

import type { DialogProps, DialogTriggerProps, ModalOverlayProps } from "react-aria-components"
import {
  DialogTrigger,
  ModalOverlay,
  Modal as ModalPrimitive,
  composeRenderProps,
} from "react-aria-components"
import { type VariantProps, tv } from "tailwind-variants"

import { Dialog } from "./dialog"

const overlay = tv({
  base: [
    "fixed top-0 left-0 isolate z-50 h-(--visual-viewport-height) w-full",
    "flex items-end justify-end bg-fg/15 text-center sm:items-center sm:justify-center dark:bg-bg/40",
    "[--visual-viewport-vertical-padding:16px] sm:[--visual-viewport-vertical-padding:32px]",
  ],
  variants: {
    isBlurred: {
      true: "bg-bg supports-backdrop-filter:bg-bg/15 supports-backdrop-filter:backdrop-blur dark:supports-backdrop-filter:bg-bg/40",
    },
    isEntering: {
      true: "fade-in animate-in duration-200 ease-out",
    },
    isExiting: {
      true: "fade-out animate-out duration-150 ease-in",
    },
  },
})
const content = tv({
  base: [
    "max-h-full w-full rounded-t-2xl bg-overlay text-left align-middle text-overlay-fg shadow-lg ring-1 ring-fg/5",
    "overflow-hidden sm:rounded-2xl dark:ring-border",
  ],
  variants: {
    isEntering: {
      true: [
        "fade-in slide-in-from-bottom animate-in duration-200 ease-out",
        "sm:zoom-in-95 sm:slide-in-from-bottom-0",
      ],
    },
    isExiting: {
      true: [
        "slide-out-to-bottom sm:slide-out-to-bottom-0 sm:zoom-out-95 animate-out duration-150 ease-in",
      ],
    },
    size: {
      xs: "sm:max-w-xs",
      sm: "sm:max-w-sm",
      md: "sm:max-w-md",
      lg: "sm:max-w-lg",
      xl: "sm:max-w-xl",
      "2xl": "sm:max-w-2xl",
      "3xl": "sm:max-w-3xl",
      "4xl": "sm:max-w-4xl",
      "5xl": "sm:max-w-5xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
})

const Modal = (props: DialogTriggerProps) => {
  return <DialogTrigger {...props} />
}

interface ModalContentProps
  extends Omit<React.ComponentProps<typeof Modal>, "children">,
    Omit<ModalOverlayProps, "className">,
    VariantProps<typeof content> {
  "aria-label"?: DialogProps["aria-label"]
  "aria-labelledby"?: DialogProps["aria-labelledby"]
  role?: DialogProps["role"]
  closeButton?: boolean
  isBlurred?: boolean
  classNames?: {
    overlay?: ModalOverlayProps["className"]
    content?: ModalOverlayProps["className"]
  }
}

const ModalContent = ({
  classNames,
  isDismissable = true,
  isBlurred = false,
  children,
  size,
  role,
  closeButton = true,
  ...props
}: ModalContentProps) => {
  const _isDismissable = role === "alertdialog" ? false : isDismissable
  return (
    <ModalOverlay
      isDismissable={_isDismissable}
      className={composeRenderProps(classNames?.overlay, (className, renderProps) => {
        return overlay({
          ...renderProps,
          isBlurred,
          className,
        })
      })}
      {...props}
    >
      <ModalPrimitive
        className={composeRenderProps(classNames?.content, (className, renderProps) =>
          content({
            ...renderProps,
            size,
            className,
          }),
        )}
        {...props}
      >
        {(values) => (
          <Dialog role={role}>
            {typeof children === "function" ? children(values) : children}
            {closeButton && <Dialog.CloseIndicator isDismissable={_isDismissable} />}
          </Dialog>
        )}
      </ModalPrimitive>
    </ModalOverlay>
  )
}

Modal.Trigger = Dialog.Trigger
Modal.Header = Dialog.Header
Modal.Title = Dialog.Title
Modal.Description = Dialog.Description
Modal.Footer = Dialog.Footer
Modal.Body = Dialog.Body
Modal.Close = Dialog.Close
Modal.Content = ModalContent

export { Modal }
