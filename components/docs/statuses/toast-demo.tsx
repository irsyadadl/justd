"use client"

import { toast } from "sonner"
import { Button } from "ui"

export default function ToastDemo() {
  return (
    <Button onPress={() => toast("The registration is successful, click here to continue.")}>
      Show Toast
    </Button>
  )
}
