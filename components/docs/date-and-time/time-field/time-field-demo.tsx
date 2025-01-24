"use client"

import { Time } from "@internationalized/date"
import { TimeField } from "ui"

export default function TimeFieldDemo() {
  return <TimeField defaultValue={new Time()} label="Event time" />
}
