"use client"

import React from "react"

import { IconChevronLgDown, IconX } from "justd-icons"
import type { InputProps } from "react-aria-components"
import {
  ComboBoxContext,
  ComboBoxStateContext,
  ComboBox as ComboboxPrimitive,
  type ComboBoxProps as ComboboxPrimitiveProps,
  type PopoverProps as PopoverPrimitiveProps,
  type ValidationResult,
  useSlottedContext,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Button, ButtonPrimitive } from "./button"
import { DropdownItem, DropdownSection } from "./dropdown"
import { Description, FieldError, FieldGroup, Input, Label } from "./field"
import { ListBox } from "./list-box"
import { Popover } from "./popover"
import { composeTailwindRenderProps } from "./primitive"

const comboboxStyles = tv({
  slots: {
    base: "group w-full flex flex-col gap-y-1.5",
    chevronButton:
      "h-7 w-8 **:data-[slot=icon]:text-muted-fg **:data-[slot=icon]:hover:text-fg **:data-[slot=icon]:data-pressed:text-fg rounded outline-offset-0 active:bg-transparent data-hovered:bg-transparent data-pressed:bg-transparent",
    chevronIcon: "transition shrink-0 size-4 duration-200 group-open:rotate-180 group-open:text-fg",
    clearButton:
      "data-focused:outline-hidden absolute inset-y-0 right-0 flex items-center pr-2 text-muted-fg data-hovered:text-fg",
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

type ListBoxPickerProps<T extends object> = React.ComponentProps<typeof ListBox<T>>

interface ComboBoxListProps<T extends object>
  extends ListBoxPickerProps<T>,
    Omit<PopoverPrimitiveProps, "children" | "className" | "style"> {}

const ComboBoxList = <T extends object>({ children, items, ...props }: ComboBoxListProps<T>) => {
  return (
    <Popover.Picker trigger="ComboBox" isNonModal placement={props.placement}>
      <ListBox.Picker items={items} {...props}>
        {children}
      </ListBox.Picker>
    </Popover.Picker>
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

ComboBox.Input = ComboBoxInput
ComboBox.List = ComboBoxList
ComboBox.Option = DropdownItem
ComboBox.Section = DropdownSection

export type { ComboBoxProps, ComboBoxListProps }
export { ComboBox }
