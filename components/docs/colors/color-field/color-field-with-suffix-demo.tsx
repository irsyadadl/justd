"use client"

import { IconColors } from "justd-icons"
import { ColorField } from "ui"

export default function ColorFieldWithSuffixDemo() {
  return <ColorField label="Color" suffix={<IconColors />} placeholder="#FAFAFA" />
}
