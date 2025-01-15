"use client"

import { Link, buttonStyles } from "ui"

export default function ButtonLinkDemo() {
  return (
    <Link
      className={buttonStyles({ intent: "primary" })}
      href="/docs/2.x/components/collections/choicebox"
    >
      Choicebox
    </Link>
  )
}
