"use client"

import { IconAt, IconBrandTwitter } from "justd-icons"
import { TextField } from "ui"

export default function TextFieldPrefixSuffixDemo() {
  return (
    <div className="flex flex-col gap-4">
      <TextField
        label="Twitter"
        placeholder="irsyadadl"
        prefix={<IconAt />}
        suffix={<IconBrandTwitter />}
      />
      <TextField label="Sites" prefix="https://" suffix=".com" />
    </div>
  )
}
