"use client"

import { Keyboard as KeyboardPrimitive } from "react-aria-components"
import { tv } from "tailwind-variants"

const keyboardStyles = tv({
  slots: {
    base: "-mr-1 ml-auto hidden items-center lg:inline-flex",
    kbd: [
      "text-center font-sans text-current/70 capitalize group-data-focused:text-fg forced-colors:group-data-focused:text-[HighlightText]",
      "inline-grid min-h-5 min-w-[2ch] place-content-center rounded font-sans text-[.75rem] uppercase group-data-hovered:text-fg group-data-disabled:opacity-50 group-data-focused:opacity-90",
    ],
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
