"use client"

import { useState } from "react"

import { IconPlus } from "justd-icons"
import { Button, ProgressCircle } from "ui"

export default function ButtonPendingDemo() {
  const [isLoading, setLoading] = useState(false)

  const handlePress = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4500)
  }
  return (
    <Button onPress={handlePress} isPending={isLoading}>
      {({ isPending }) => (
        <>
          {isPending ? <ProgressCircle isIndeterminate aria-label="Creating..." /> : <IconPlus />}
          {isLoading ? "Creating..." : "Create"}
        </>
      )}
    </Button>
  )
}
