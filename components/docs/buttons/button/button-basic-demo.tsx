"use client"

import { Button } from "ui"

export default function ButtonBasicDemo() {
  return <Button onPress={() => alert("Pressed")}>Label</Button>
}
