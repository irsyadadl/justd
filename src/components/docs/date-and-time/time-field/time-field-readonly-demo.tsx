"use client"

import { Time } from "@internationalized/date"
import { TimeField } from "ui"

export default function TimeFieldReadonlyDemo() {
  return <TimeField isReadOnly defaultValue={new Time()} label="Event time" />
}
