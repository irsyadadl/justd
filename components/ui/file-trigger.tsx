"use client"

import { IconCamera, IconFolder, IconPaperclip45 } from "justd-icons"
import {
  FileTrigger as FileTriggerPrimitive,
  type FileTriggerProps as FileTriggerPrimitiveProps,
} from "react-aria-components"

import { Button } from "./button"

interface FileTriggerProps extends FileTriggerPrimitiveProps {
  withIcon?: boolean
  isDisabled?: boolean
  intent?: "primary" | "secondary" | "danger" | "warning"
  size?: "medium" | "large" | "square-petite" | "extra-small" | "small"
  shape?: "square" | "circle"
  appearance?: "solid" | "outline" | "plain"
  ref?: React.RefObject<HTMLInputElement>
}

const FileTrigger = ({
  intent = "primary",
  appearance = "outline",
  size = "medium",
  shape = "square",
  withIcon = true,
  ref,
  ...props
}: FileTriggerProps) => {
  return (
    <FileTriggerPrimitive ref={ref} {...props}>
      <Button
        isDisabled={props.isDisabled}
        intent={intent}
        size={size}
        shape={shape}
        appearance={appearance}
      >
        {withIcon &&
          (props.defaultCamera ? (
            <IconCamera />
          ) : props.acceptDirectory ? (
            <IconFolder />
          ) : (
            <IconPaperclip45 />
          ))}
        {props.children ? (
          props.children
        ) : (
          <>
            {props.allowsMultiple
              ? "Browse a files"
              : props.acceptDirectory
                ? "Browse"
                : "Browse a file"}
            ...
          </>
        )}
      </Button>
    </FileTriggerPrimitive>
  )
}

export type { FileTriggerProps }
export { FileTrigger }
