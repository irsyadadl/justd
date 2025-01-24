"use client"

import { ColorSlider } from "ui"

export default function ColorSliderWithLabelDemo() {
  return <ColorSlider label="Color Customizer" channel="hue" defaultValue="hsl(0, 100%, 50%)" />
}
