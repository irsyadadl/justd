"use client"

import { Link, buttonStyles } from "ui"

export default function LinkButtonDemo() {
  return (
    <div className="flex gap-2">
      <Link className={(renderProps) => buttonStyles({ ...renderProps })} href="#use-as-button">
        Link
      </Link>
      <Link
        className={(renderProps) => buttonStyles({ ...renderProps, appearance: "outline" })}
        href="#use-as-button"
      >
        Link
      </Link>
      <Link
        className={(renderProps) =>
          buttonStyles({ ...renderProps, appearance: "plain", shape: "circle" })
        }
        href="#use-as-button"
      >
        Link
      </Link>
    </div>
  )
}
