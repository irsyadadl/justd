"use client"

import React from "react"

import { cn } from "@/utils/classes"
import { parseColor } from "@react-stately/color"
import { ColorSwatch as ColorSwatchPrimitive, type ColorSwatchProps } from "react-aria-components"

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

const hsbToRgb = (h: number, s: number, b: number): { r: number; g: number; b: number } => {
  s /= 100
  b /= 100
  const k = (n: number) => (n + h / 60) % 6
  const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)))
  return {
    r: Math.round(255 * f(5)),
    g: Math.round(255 * f(3)),
    b: Math.round(255 * f(1))
  }
}

const luminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

type HSBColor = {
  hue: number
  saturation: number
  brightness: number
}

const isBrightColor = (color: string | HSBColor): boolean => {
  let r, g, b

  if (typeof color === "string") {
    if (color.startsWith("#")) {
      const rgb = hexToRgb(color)
      if (rgb) {
        r = rgb.r
        g = rgb.g
        b = rgb.b
      } else {
        return false
      }
    } else if (color.startsWith("rgb")) {
      const rgbValues = color.match(/\d+/g)
      if (rgbValues) {
        r = parseInt(rgbValues[0], 10)
        g = parseInt(rgbValues[1], 10)
        b = parseInt(rgbValues[2], 10)
      } else {
        return false
      }
    } else {
      const namedColors: Record<string, string> = {
        white: "#ffffff",
        black: "#000000"
      }
      const hex = namedColors[color.toLowerCase()]
      if (hex) {
        const rgb = hexToRgb(hex)
        if (rgb) {
          r = rgb.r
          g = rgb.g
          b = rgb.b
        } else {
          return false
        }
      } else {
        return false
      }
    }
  } else if (
    typeof color === "object" &&
    "hue" in color &&
    "saturation" in color &&
    "brightness" in color
  ) {
    const rgb = hsbToRgb(color.hue, color.saturation, color.brightness)
    r = rgb.r
    g = rgb.g
    b = rgb.b
  } else {
    return false
  }

  const lum = luminance(r, g, b)
  return lum > 0.75
}

const defaultColor = parseColor("hsl(216, 98%, 52%)")

const ColorSwatch = ({ className, ...props }: ColorSwatchProps) => {
  const color = props.color?.toString() ?? ""
  const needRing = color ? isBrightColor(color) : false
  return (
    <ColorSwatchPrimitive
      data-slot="color-swatch"
      aria-label={props["aria-label"] ?? "Color swatch"}
      className={cn(
        "size-8 cs rounded-md shrink-0",
        needRing && "ring-1 ring-inset ring-fg/10",
        className
      )}
      {...props}
    />
  )
}

export { ColorSwatch, isBrightColor, defaultColor }
