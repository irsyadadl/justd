"use client"

import { IconColors } from "justd-icons"
import { ColorField } from "ui"

export default function ColorFieldWithPrefixDemo() {
  return <ColorField label="Color" prefix={<IconColors />} placeholder="#FAFAFA" />
}
