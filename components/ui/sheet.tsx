"use client"

import * as React from "react"

import type {
  DialogProps,
  DialogTriggerProps,
  ModalOverlayProps as ModalOverlayPrimitiveProps,
  Modal
} from "react-aria-components"
import {
  composeRenderProps,
  DialogTrigger as DialogTriggerPrimitive,
  Modal as ModalPrimitive,
  ModalOverlay
} from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"

import { Dialog } from "./dialog"

const sheetOverlayStyles = tv({
  base: [
    "fixed top-0 left-0 w-full h-[--visual-viewport-height] isolate z-50 flex items-center justify-center p-4"
  ],
  variants: {
    isBlurred: {
      true: "backdrop-blur",
      false: "bg-dark/15 dark:bg-dark/40"
    },
    isEntering: {
      true: "animate-in fade-in duration-200 ease-out"
    },
    isExiting: {
      true: "animate-out fade-out duration-200 ease-in"
    }
  }
})

type Sides = "top" | "bottom" | "left" | "right"
const generateCompoundVariants = (sides: Array<Sides>) => {
  return sides.map((side) => ({
    side,
    isStack: true,
    className:
      side === "top"
        ? "top-2 inset-x-2 rounded-xl ring-1 border-b-0 ring-dark/5 dark:ring-border"
        : side === "bottom"
          ? "bottom-2 inset-x-2 rounded-xl ring-1 border-t-0 ring-dark/5 dark:ring-border"
          : side === "left"
            ? "left-2 inset-y-2 rounded-xl ring-1 border-r-0 ring-dark/5 dark:ring-border"
            : "right-2 inset-y-2 rounded-xl ring-1 border-l-0 ring-dark/5 dark:ring-border"
  }))
}

const sheetContentStyles = tv({
  base: "fixed z-50 grid gap-4 bg-overlay border-dark/5 dark:border-border text-overlay-fg shadow-lg transition ease-in-out",
  variants: {
    isEntering: {
      true: "duration-300 animate-in "
    },
    isExiting: {
      true: "duration-200 animate-out"
    },
    side: {
      top: "inset-x-0 top-0 rounded-b-2xl border-b entering:slide-in-from-top exiting:slide-out-to-top",
      bottom:
        "inset-x-0 bottom-0 rounded-t-2xl border-t entering:slide-in-from-bottom exiting:slide-out-to-bottom",
      left: "inset-y-0 left-0 h-auto w-[19rem] sm:w-3/4 overflow-y-auto border-r entering:slide-in-from-left exiting:slide-out-to-left sm:max-w-xs",
      right:
        "inset-y-0 right-0 h-auto w-[19rem] sm:w-3/4 overflow-y-auto border-l entering:slide-in-from-right exiting:slide-out-to-right sm:max-w-xs"
    },
    isStack: {
      true: "",
      false: ""
    }
  },
  compoundVariants: generateCompoundVariants(["top", "bottom", "left", "right"])
})

const Sheet = ({ children, ...props }: DialogTriggerProps) => {
  return <DialogTriggerPrimitive {...props}>{children}</DialogTriggerPrimitive>
}

interface SheetContentProps
  extends Omit<React.ComponentProps<typeof Modal>, "children" | "className">,
    Omit<ModalOverlayPrimitiveProps, "className">,
    VariantProps<typeof sheetOverlayStyles> {
  "aria-label"?: DialogProps["aria-label"]
  "aria-labelledby"?: DialogProps["aria-labelledby"]
  role?: DialogProps["role"]
  closeButton?: boolean
  isBlurred?: boolean
  isStack?: boolean
  side?: Sides
  classNames?: {
    overlay?: ModalOverlayPrimitiveProps["className"]
    content?: ModalOverlayPrimitiveProps["className"]
  }
}

const SheetContent = ({
  classNames,
  isBlurred = false,
  isDismissable = true,
  side = "right",
  role = "dialog",
  closeButton = true,
  isStack = true,
  ...props
}: SheetContentProps) => {
  const _isDismissable = role === "alertdialog" ? false : isDismissable
  return (
    <ModalOverlay
      isDismissable={_isDismissable}
      className={composeRenderProps(classNames?.overlay, (className, renderProps) => {
        return sheetOverlayStyles({
          ...renderProps,
          isBlurred,
          className
        })
      })}
      {...props}
    >
      <ModalPrimitive
        className={composeRenderProps(classNames?.content, (className, renderProps) =>
          sheetContentStyles({
            ...renderProps,
            side,
            isStack,
            className
          })
        )}
        {...props}
      >
        <Dialog role={role} aria-label={props["aria-label"] ?? undefined} className="h-full">
          {(values) => (
            <>
              {props.children as React.ReactNode}
              {closeButton && (
                <Dialog.CloseIndicator
                  className="top-2.5 right-2.5"
                  close={values.close}
                  isDismissable={_isDismissable}
                />
              )}
            </>
          )}
        </Dialog>
      </ModalPrimitive>
    </ModalOverlay>
  )
}

Sheet.Trigger = Dialog.Trigger
Sheet.Footer = Dialog.Footer
Sheet.Content = SheetContent
Sheet.Header = Dialog.Header
Sheet.Title = Dialog.Title
Sheet.Description = Dialog.Description
Sheet.Body = Dialog.Body
Sheet.Close = Dialog.Close

export { Sheet }
