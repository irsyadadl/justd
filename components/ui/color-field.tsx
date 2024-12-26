"use client"

import type {
  ColorFieldProps as ColorFieldPrimitiveProps,
  ValidationResult,
} from "react-aria-components"
import { ColorField as ColorFieldPrimitive } from "react-aria-components"

import { ColorPicker } from "./color-picker"
import { ColorSwatch } from "./color-swatch"
import { Description, FieldError, FieldGroup, Input, Label } from "./field"
import { composeTailwindRenderProps } from "./primitive"

interface ColorFieldProps extends ColorFieldPrimitiveProps {
  label?: string
  description?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  placeholder?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  isLoading?: boolean
  enableColorPicker?: boolean
}

const ColorField = ({
  label,
  description,
  errorMessage,
  placeholder,
  prefix,
  suffix,
  isLoading,
  enableColorPicker = true,
  className,
  ...props
}: ColorFieldProps) => {
  const value = props.value ?? props.defaultValue
  return (
    <ColorFieldPrimitive
      {...props}
      aria-label={props["aria-label"] ?? "Color field"}
      className={composeTailwindRenderProps(
        className,
        "**:data-[slot=color-swatch]:-ml-0.5 group flex w-full flex-col gap-y-1",
      )}
    >
      {label && <Label>{label}</Label>}
      <FieldGroup data-loading={isLoading ? "true" : undefined}>
        {prefix ? (
          <span data-slot="prefix" className="atrs">
            {prefix}
          </span>
        ) : null}
        <div className="flex w-full items-center">
          {value && (
            <span className="ml-2">
              {enableColorPicker ? (
                <ColorPicker onChange={props.onChange} defaultValue={value} />
              ) : (
                <ColorSwatch className="size-6" color={value.toString("hex")} />
              )}
            </span>
          )}

          <Input placeholder={placeholder} />
        </div>
        {suffix ? (
          <span data-slot="suffix" className="atrs ml-auto">
            {suffix}
          </span>
        ) : null}
      </FieldGroup>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </ColorFieldPrimitive>
  )
}

export type { ColorFieldProps }
export { ColorField }
