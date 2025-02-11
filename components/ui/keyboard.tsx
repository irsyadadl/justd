"use client"

import { Keyboard as KeyboardPrimitive } from "react-aria-components"
import { tv } from "tailwind-variants"

const keyboardStyles = tv({
  slots: {
    base: "hidden text-current/70 group-data-focused:text-fg group-data-hovered:text-fg group-data-disabled:opacity-50 group-data-focused:opacity-90 lg:inline-flex forced-colors:group-data-focused:text-[HighlightText]",
    kbd: "inline-grid min-h-5 min-w-[2ch] place-content-center rounded text-center font-sans text-[.75rem] uppercase",
  },
})

const { base, kbd } = keyboardStyles()

interface KeyboardProps extends React.HTMLAttributes<HTMLElement> {
  keys: string | string[]
  classNames?: {
    base?: string
    kbd?: string
  }
}

const Keyboard = ({ keys, classNames, className, ...props }: KeyboardProps) => {
  return (
    <KeyboardPrimitive className={base({ className: classNames?.base ?? className })} {...props}>
      {(Array.isArray(keys) ? keys : keys.split("")).map((char, index) => (
        <kbd
          key={index}
          className={kbd({ className: index > 0 && char.length > 1 ? "pl-1" : classNames?.kbd })}
        >
          {char}
        </kbd>
      ))}
    </KeyboardPrimitive>
  )
}

export type { KeyboardProps }
export { Keyboard }
