"use client"

import React from "react"

import { cn } from "@/utils/classes"
import { IconChevronLgDown, IconX } from "justd-icons"
import type {
  ComboBoxProps as ComboboxPrimitiveProps,
  InputProps,
  ListBoxProps,
  ValidationResult,
} from "react-aria-components"
import {
  Button as ButtonPrimitive,
  ComboBoxContext,
  ComboBoxStateContext,
  ComboBox as ComboboxPrimitive,
  useSlottedContext,
} from "react-aria-components"
import { tv } from "tailwind-variants"
import { Button } from "./button"
import { DropdownItem, DropdownLabel, DropdownSection } from "./dropdown"
import { Description, FieldError, FieldGroup, Input, Label } from "./field"
import { ListBox } from "./list-box"
import { PopoverContent, type PopoverContentProps } from "./popover"
import { composeTailwindRenderProps } from "./primitive"

const comboboxStyles = tv({
  slots: {
    base: "group flex w-full flex-col gap-y-1.5",
    chevronButton:
      "h-7 w-8 rounded outline-offset-0 active:bg-transparent data-hovered:bg-transparent data-pressed:bg-transparent **:data-[slot=icon]:data-pressed:text-fg **:data-[slot=icon]:text-muted-fg **:data-[slot=icon]:hover:text-fg",
    chevronIcon: "size-4 shrink-0 transition duration-200 group-open:rotate-180 group-open:text-fg",
    clearButton:
      "absolute inset-y-0 right-0 flex items-center pr-2 text-muted-fg data-hovered:text-fg data-focused:outline-hidden",
  },
})

const { base, chevronButton, chevronIcon, clearButton } = comboboxStyles()

interface ComboBoxProps<T extends object> extends Omit<ComboboxPrimitiveProps<T>, "children"> {
  label?: string
  placeholder?: string
  description?: string | null
  errorMessage?: string | ((validation: ValidationResult) => string)
  children: React.ReactNode
}

const ComboBox = <T extends object>({
  label,
  description,
  errorMessage,
  children,
  className,
  ...props
}: ComboBoxProps<T>) => {
  return (
    <ComboboxPrimitive {...props} className={composeTailwindRenderProps(className, base())}>
      {label && <Label>{label}</Label>}
      {children}
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </ComboboxPrimitive>
  )
}

interface ComboBoxListProps<T extends object>
  extends ListBoxProps<T>,
    Pick<PopoverContentProps, "placement"> {
  popoverClassName?: PopoverContentProps["className"]
}

const ComboBoxList = <T extends object>({
  children,
  items,
  className,
  popoverClassName,
  ...props
}: ComboBoxListProps<T>) => {
  return (
    <PopoverContent
      showArrow={false}
      respectScreen={false}
      isNonModal
      className={cn("sm:min-w-(--trigger-width)", popoverClassName)}
      placement={props.placement}
    >
      <ListBox className={cn("border-0", className)} items={items} {...props}>
        {children}
      </ListBox>
    </PopoverContent>
  )
}

const ComboBoxInput = (props: InputProps) => {
  const context = useSlottedContext(ComboBoxContext)!
  return (
    <FieldGroup className="relative pl-0">
      <Input {...props} placeholder={props?.placeholder} />
      <Button size="square-petite" appearance="plain" className={chevronButton()}>
        {!context?.inputValue && <IconChevronLgDown className={chevronIcon()} />}
      </Button>
      {context?.inputValue && <ComboBoxClearButton />}
    </FieldGroup>
  )
}

const ComboBoxClearButton = () => {
  const state = React.use(ComboBoxStateContext)

  return (
    <ButtonPrimitive
      className={clearButton()}
      slot={null}
      aria-label="Clear"
      onPress={() => {
        state?.setSelectedKey(null)
        state?.open()
      }}
    >
      <IconX className="size-4 animate-in" />
    </ButtonPrimitive>
  )
}

const ComboBoxOption = DropdownItem
const ComboBoxLabel = DropdownLabel
const ComboBoxSection = DropdownSection

ComboBox.Input = ComboBoxInput
ComboBox.List = ComboBoxList
ComboBox.Option = ComboBoxOption
ComboBox.Label = ComboBoxLabel
ComboBox.Section = ComboBoxSection

export type { ComboBoxProps, ComboBoxListProps }
export { ComboBox }
