"use client"

import { Time } from "@internationalized/date"
import { IconClock } from "justd-icons"
import { TimeField } from "ui"

export default function TimeFieldSuffixDemo() {
  return <TimeField suffix={<IconClock />} defaultValue={new Time()} label="Event time" />
}
