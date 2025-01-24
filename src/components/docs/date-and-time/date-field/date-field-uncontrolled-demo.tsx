"use client"

import { getLocalTimeZone, parseDate, today } from "@internationalized/date"
import { DateField } from "ui"

export default function DateFieldUncontrolledDemo() {
  const now = today(getLocalTimeZone())
  return <DateField defaultValue={parseDate(now.toString())} label="Event date" />
}
