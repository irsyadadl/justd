"use client"

import { useState } from "react"

import { Description, FileTrigger } from "ui"

export default function FileTriggerDemo() {
  const [file, setFile] = useState<string[] | null>(null)
  return (
    <>
      <FileTrigger
        isDisabled
        onSelect={(e) => {
          const files = Array.from(e ?? [])
          const filenames = files.map((file) => file.name)
          setFile(filenames)
        }}
      />
      {file && <Description>{file}</Description>}
    </>
  )
}
