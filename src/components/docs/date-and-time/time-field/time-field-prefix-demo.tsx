"use client"

import { Time } from "@internationalized/date"
import { TimeField } from "ui"

export default function TimeFieldPrefixDemo() {
  return <TimeField prefix="UTC" defaultValue={new Time()} label="Event time" />
}
