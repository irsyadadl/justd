"use client"

import { Link, buttonStyles } from "ui"

export default function LinkButtonDemo() {
  return (
    <div className="flex gap-2">
      <Link className={buttonStyles()} href="#use-as-button">
        Link
      </Link>
      <Link className={buttonStyles({ appearance: "outline" })} href="#use-as-button">
        Link
      </Link>
      <Link
        className={buttonStyles({ appearance: "plain", shape: "circle" })}
        href="#use-as-button"
      >
        Link
      </Link>
    </div>
  )
}
