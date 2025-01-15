"use client"

import { IconSearch, IconX } from "justd-icons"
import {
  SearchField as SearchFieldPrimitive,
  type SearchFieldProps as SearchFieldPrimitiveProps,
  type ValidationResult,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Button } from "./button"
import { Description, FieldError, FieldGroup, Input, Label } from "./field"
import { Loader } from "./loader"
import { composeTailwindRenderProps } from "./primitive"

const searchFieldStyles = tv({
  slots: {
    base: "group flex min-w-10 flex-col gap-y-1.5",
    searchIcon:
      "ml-2.5 size-4 shrink-0 text-muted-fg group-data-disabled:text-muted-fg forced-colors:text-[ButtonText] forced-colors:group-data-disabled:text-[GrayText]",
    clearButton: [
      "mr-1 size-8 text-muted-fg data-hovered:bg-transparent data-pressed:bg-transparent data-hovered:text-fg data-pressed:text-fg group-data-empty:invisible",
    ],
    input: "[&::-webkit-search-cancel-button]:hidden",
  },
})

const { base, searchIcon, clearButton, input } = searchFieldStyles()

interface SearchFieldProps extends SearchFieldPrimitiveProps {
  label?: string
  placeholder?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  isPending?: boolean
}

const SearchField = ({
  className,
  placeholder,
  label,
  description,
  errorMessage,
  isPending,
  ...props
}: SearchFieldProps) => {
  return (
    <SearchFieldPrimitive
      aria-label={placeholder ?? props["aria-label"] ?? "Search..."}
      {...props}
      className={composeTailwindRenderProps(className, base())}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup>
        <IconSearch aria-hidden className={searchIcon()} />
        <Input placeholder={placeholder ?? "Search..."} className={input()} />
        {isPending ? (
          <Loader variant="spin" />
        ) : (
          <Button size="square-petite" appearance="plain" className={clearButton()}>
            <IconX aria-hidden />
          </Button>
        )}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </SearchFieldPrimitive>
  )
}

export type { SearchFieldProps }
export { SearchField }
