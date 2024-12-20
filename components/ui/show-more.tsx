"use client"

import { Text, ToggleButton, composeRenderProps } from "react-aria-components"
import { tv } from "tailwind-variants"

import { buttonStyles } from "./button"

const showMoreStyles = tv({
  base: "text-sm leading-6 after:border-muted before:border-muted",
  variants: {
    orientation: {
      vertical: "mx-1 h-auto self-stretch",
      horizontal: "my-0.5 h-px w-full self-stretch",
    },
  },
  compoundVariants: [
    {
      orientation: "vertical",
      className:
        "mx-2 flex flex-col items-center before:border-l before:flex-1 before:mb-2 after:border-r after:flex-1 after:mt-2",
    },
    {
      orientation: "horizontal",
      className:
        "self-stretch my-2 flex items-center before:border-t before:flex-1 before:mr-2 after:border-t after:flex-1 after:ml-2",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
  },
})

interface ShowMoreProps extends React.ComponentProps<typeof ToggleButton> {
  className?: string
  orientation?: "horizontal" | "vertical"
  as?: "text" | "button"
  text?: string
}

const ShowMore = ({
  as = "button",
  orientation = "horizontal",
  className,
  ...props
}: ShowMoreProps) => {
  return (
    <div className={showMoreStyles({ orientation, className })}>
      {as === "button" ? (
        <ToggleButton
          {...props}
          className={buttonStyles({ shape: "circle", appearance: "outline", size: "small" })}
        >
          {composeRenderProps(props.children, (children) => (
            <>{children}</>
          ))}
        </ToggleButton>
      ) : (
        <Text slot="description">{props.text}</Text>
      )}
    </div>
  )
}

export type { ShowMoreProps }
export { ShowMore }
