"use client"

import { Switch as SwitchPrimitive, type SwitchProps as SwitchPrimitiveProps, } from "react-aria-components"

import { composeTailwindRenderProps } from "./primitive"

interface SwitchProps extends SwitchPrimitiveProps {
  ref?: React.RefObject<HTMLLabelElement>
}
const Switch = ({ children, className, ref, ...props }: SwitchProps) => {
  return (
    <SwitchPrimitive
      ref={ref}
      {...props}
      className={composeTailwindRenderProps(
        className,
        "group inline-flex touch-none items-center sm:text-sm",
      )}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {(values) => (
        <>
          <span className="mr-2 h-5 w-8 cursor-pointer rounded-full border-2 border-transparent bg-(--switch) transition duration-200 [--switch:color-mix(in_oklab,var(--color-muted)_90%,black_10%)] group-data-disabled:cursor-default group-data-selected:bg-primary group-data-disabled:opacity-50 group-data-focused:ring-4 group-data-focused:ring-primary/20 group-data-invalid:ring-danger/20 dark:[--switch:color-mix(in_oklab,var(--color-muted)_85%,white_15%)]">
            <span className="block size-4 origin-right rounded-full bg-primary-fg shadow-sm transition-all duration-200 group-data-selected:group-data-[pressed]:ml-2 group-data-selected:ml-3 group-data-pressed:w-5 forced-colors:data-disabled:outline-[GrayText]" />
          </span>
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </SwitchPrimitive>
  )
}

export type { SwitchProps }
export { Switch }
