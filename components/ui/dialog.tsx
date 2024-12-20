"use client"

import { useEffect, useRef } from "react"

import { IconX } from "justd-icons"
import type {
  ButtonProps as ButtonPrimitiveProps,
  DialogProps,
  HeadingProps,
} from "react-aria-components"
import {
  Button as ButtonPrimitive,
  Dialog as DialogPrimitive,
  Heading,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { useMediaQuery } from "@/utils/use-media-query"
import { Button, type ButtonProps } from "./button"

const dialogStyles = tv({
  slots: {
    root: [
      "relative peer group/dialog flex max-h-[inherit] not-has-data-[slot=dialog-body]:**:data-[slot=dialog-header]:pb-0 [&::-webkit-scrollbar]:size-0.5 [scrollbar-width:thin] flex-col overflow-hidden outline-hidden",
    ],
    header: "relative flex flex-col gap-0.5 sm:gap-1 p-4 sm:p-6",
    description: "text-sm text-muted-fg",
    body: [
      "has-[input]:pb-1",
      "flex flex-1 isolate flex-col overflow-auto px-4 sm:px-6",
      "max-h-[calc(var(--visual-viewport-height)-var(--visual-viewport-vertical-padding)-var(--dialog-header-height,0px)-var(--dialog-footer-height,0px))]",
    ],
    footer: "mt-auto flex isolate flex-col-reverse justify-between gap-3 sm:flex-row p-4 sm:p-6",
    closeIndicator:
      "close absolute right-1 top-1 sm:right-2 sm:top-2 data-focused:outline-hidden data-focused:bg-secondary data-hovered:bg-secondary grid place-content-center rounded-xl sm:rounded-md data-focus-visible:ring-1 data-focus-visible:ring-primary size-8 sm:size-7 z-50",
  },
})

const { root, header, description, body, footer, closeIndicator } = dialogStyles()

const Dialog = ({ role, className, ...props }: DialogProps) => {
  return <DialogPrimitive role={role ?? "dialog"} className={root({ className })} {...props} />
}

const Trigger = (props: ButtonPrimitiveProps) => <ButtonPrimitive slot="close" {...props} />

type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
}

const Header = ({ className, ...props }: DialogHeaderProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const header = headerRef.current
    if (!header) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        header.parentElement?.style.setProperty(
          "--dialog-header-height",
          `${entry.target.clientHeight}px`,
        )
      }
    })

    observer.observe(header)
    return () => observer.unobserve(header)
  }, [])

  return (
    <div data-slot="dialog-header" ref={headerRef} className={header({ className })}>
      {props.title && <Title>{props.title}</Title>}
      {props.description && <Description>{props.description}</Description>}
      {!props.title && typeof props.children === "string" ? <Title {...props} /> : props.children}
    </div>
  )
}

const titleStyles = tv({
  base: "flex flex-1 items-center text-fg",
  variants: {
    level: {
      1: "font-semibold text-lg sm:text-xl",
      2: "font-semibold text-lg sm:text-xl",
      3: "font-semibold text-base sm:text-lg",
      4: "font-semibold text-base",
    },
  },
})

interface DialogTitleProps extends Omit<HeadingProps, "level"> {
  level?: 1 | 2 | 3 | 4
  ref?: React.Ref<HTMLHeadingElement>
}
const Title = ({ level = 2, className, ref, ...props }: DialogTitleProps) => (
  <Heading
    slot="title"
    level={level}
    ref={ref}
    className={titleStyles({ level, className })}
    {...props}
  />
)

type DialogDescriptionProps = React.ComponentProps<"div">
const Description = ({ className, ref, ...props }: DialogDescriptionProps) => (
  <div className={description({ className })} ref={ref} {...props} />
)

type DialogBodyProps = React.ComponentProps<"div">
const Body = ({ className, ref, ...props }: DialogBodyProps) => (
  <div data-slot="dialog-body" ref={ref} className={body({ className })} {...props} />
)

type DialogFooterProps = React.ComponentProps<"div">
const Footer = ({ className, ...props }: DialogFooterProps) => {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = footerRef.current

    if (!footer) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        footer.parentElement?.style.setProperty(
          "--dialog-footer-height",
          `${entry.target.clientHeight}px`,
        )
      }
    })

    observer.observe(footer)
    return () => {
      observer.unobserve(footer)
    }
  }, [])
  return (
    <div ref={footerRef} data-slot="dialog-footer" className={footer({ className })} {...props} />
  )
}

const Close = ({ className, appearance = "outline", ref, ...props }: ButtonProps) => {
  return <Button slot="close" className={className} ref={ref} appearance={appearance} {...props} />
}

interface CloseButtonIndicatorProps extends ButtonProps {
  className?: string
  isDismissable?: boolean | undefined
}

const CloseIndicator = ({ className, ...props }: CloseButtonIndicatorProps) => {
  const isMobile = useMediaQuery("(max-width: 600px)")
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isMobile && buttonRef.current) {
      buttonRef.current.focus()
    }
  }, [isMobile])
  return props.isDismissable ? (
    <ButtonPrimitive
      ref={buttonRef}
      {...(isMobile ? { autoFocus: true } : {})}
      aria-label="Close"
      slot="close"
      className={closeIndicator({ className })}
    >
      <IconX className="size-4" />
    </ButtonPrimitive>
  ) : null
}

Dialog.Trigger = Trigger
Dialog.Header = Header
Dialog.Title = Title
Dialog.Description = Description
Dialog.Body = Body
Dialog.Footer = Footer
Dialog.Close = Close
Dialog.CloseIndicator = CloseIndicator

export type {
  DialogHeaderProps,
  DialogTitleProps,
  DialogBodyProps,
  DialogFooterProps,
  DialogDescriptionProps,
  CloseButtonIndicatorProps,
}
export { Dialog }
