"use client"

import { composeTailwindRenderProps } from "@/components/ui/primitive"
import { parseColor } from "@react-stately/color"
import type { ColorSwatchProps } from "react-aria-components"
import { ColorSwatch as ColorSwatchPrimitive } from "react-aria-components"
import { twMerge } from "tailwind-merge"

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const normalizeHex = hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_m, r, g, b) => r + r + g + g + b + b,
  )

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizeHex)
  return result
    ? {
        r: Number.parseInt(result[1]!, 16),
        g: Number.parseInt(result[2]!, 16),
        b: Number.parseInt(result[3]!, 16),
      }
    : null
}

const hsbToRgb = (h: number, s: number, b: number): { r: number; g: number; b: number } => {
  const saturation = s / 100
  const brightness = b / 100
  const k = (n: number) => (n + h / 60) % 6
  const f = (n: number) => brightness * (1 - saturation * Math.max(0, Math.min(k(n), 4 - k(n), 1)))
  return {
    r: Math.round(255 * f(5)),
    g: Math.round(255 * f(3)),
    b: Math.round(255 * f(1)),
  }
}

const luminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map((v) => {
    const normalized = v / 255
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
  })
  return a[0]! * 0.2126 + a[1]! * 0.7152 + a[2]! * 0.0722
}

type HSBColor = {
  hue: number
  saturation: number
  brightness: number
}

const isBrightColor = (color: string | HSBColor): boolean => {
  let r: number
  let g: number
  let b: number

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
        r = Number.parseInt(rgbValues[0]!, 10)
        g = Number.parseInt(rgbValues[1]!, 10)
        b = Number.parseInt(rgbValues[2]!, 10)
      } else {
        return false
      }
    } else {
      const namedColors: Record<string, string> = {
        white: "#ffffff",
        black: "#000000",
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
      className={composeTailwindRenderProps(
        className,
        twMerge("size-8 shrink-0 rounded-md", needRing && "inset-ring-1 inset-ring-fg/10"),
      )}
      {...props}
    />
  )
}

export { ColorSwatch, isBrightColor, defaultColor }
