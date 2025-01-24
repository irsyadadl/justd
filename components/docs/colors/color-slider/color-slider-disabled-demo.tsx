"use client"

import { ColorSlider } from "ui"

export default function ColorSliderDisabledDemo() {
  return <ColorSlider isDisabled channel="hue" defaultValue="hsl(0, 100%, 50%)" />
}
