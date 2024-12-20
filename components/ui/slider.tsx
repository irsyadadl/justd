"use client"

import React, { useState } from "react"

import type { SliderProps as SliderPrimitiveProps, SliderThumbProps } from "react-aria-components"
import {
  SliderOutput,
  Slider as SliderPrimitive,
  SliderStateContext,
  SliderThumb,
  SliderTrack,
  type SliderTrackProps,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Description, Label } from "./field"
import { Tooltip } from "./tooltip"

const sliderStyles = tv({
  base: "relative group flex flex-col touch-none select-none",
  variants: {
    orientation: {
      horizontal: "w-full min-w-56 gap-y-2",
      vertical: "h-full gap-y-2 w-1.5 min-h-56 items-center",
    },
    isDisabled: {
      true: "data-disabled:opacity-50",
    },
  },
})

interface SliderProps extends SliderPrimitiveProps {
  output?: "inline" | "tooltip" | "none"
  label?: string
  description?: string
  thumbLabels?: string[]
}

const Slider = ({
  output = "inline",
  orientation = "horizontal",
  className,
  ...props
}: SliderProps) => {
  const showTooltip = output === "tooltip"
  const [showTooltipState, setShowTooltipState] = useState(false)

  const onFocusChange = () => {
    if (showTooltip) {
      setShowTooltipState(true)
    }
  }

  const onHoverStart = () => {
    if (showTooltip) {
      setShowTooltipState(true)
    }
  }

  const onFocusEnd = React.useCallback(() => {
    setShowTooltipState(false)
  }, [])

  React.useEffect(() => {
    if (showTooltip) {
      window.addEventListener("pointerup", onFocusEnd)
      return () => {
        window.removeEventListener("pointerup", onFocusEnd)
      }
    }
  }, [showTooltip, onFocusEnd])

  const renderThumb = (value: number) => {
    const thumb = (
      <Thumb
        index={value}
        aria-label={props.thumbLabels?.[value]}
        onFocusChange={onFocusChange}
        onHoverStart={onHoverStart}
      />
    )

    if (!showTooltip) return thumb

    return (
      <Tooltip delay={0} isOpen={showTooltipState} onOpenChange={setShowTooltipState}>
        {thumb}
        <Tooltip.Content
          showArrow={false}
          offset={orientation === "horizontal" ? 8 : -140}
          crossOffset={orientation === "horizontal" ? -85 : 0}
          className="py-1 px-1.5 text-xs min-w-6"
          placement={orientation === "vertical" ? "right" : "top"}
        >
          <SliderOutput />
        </Tooltip.Content>
      </Tooltip>
    )
  }

  return (
    <SliderPrimitive
      orientation={orientation}
      className={composeRenderProps(className, (className, renderProps) =>
        sliderStyles({ ...renderProps, className }),
      )}
      {...props}
    >
      <div className="flex text-fg">
        {props.label && <Label>{props.label}</Label>}
        {output === "inline" && (
          <SliderOutput className="text-muted-fg text-sm tabular-nums data-[orientation=vertical]:mx-auto data-[orientation=horizontal]:ml-auto">
            {({ state }) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")}
          </SliderOutput>
        )}
      </div>
      <Track>
        {({ state }) => (
          <>
            <Filler />
            {state.values.map((_, i) => (
              <React.Fragment key={i}>{renderThumb(i)}</React.Fragment>
            ))}
          </>
        )}
      </Track>
      {props.description && <Description>{props.description}</Description>}
    </SliderPrimitive>
  )
}

const controlsStyles = tv({
  slots: {
    filler: [
      "rounded-full bg-primary group-data-disabled/track:opacity-60",
      "pointer-events-none absolute group-data-[orientation=horizontal]/top-0 group-data-[orientation=vertical]/track:w-full group-data-[orientation=vertical]/track:bottom-0 group-data-[orientation=horizontal]/track:h-full",
    ],
    track: [
      "[--slider:color-mix(in_oklab,var(--color-muted)_90%,black_10%)] dark:[--slider:color-mix(in_oklab,var(--color-muted)_90%,white_10%)]",
      "relative group/track rounded-full bg-(--slider) cursor-pointer data-disabled:cursor-default data-disabled:opacity-60",
      "grow group-data-[orientation=vertical]:flex-1 group-data-[orientation=vertical]:w-1.5 group-data-[orientation=horizontal]:w-full group-data-[orientation=horizontal]:h-1.5",
    ],
  },
})

const { track, filler } = controlsStyles()

const Track = (props: SliderTrackProps) => {
  return (
    <SliderTrack
      {...props}
      className={composeRenderProps(props.className, (className) => track({ className }))}
    />
  )
}

const Filler = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const state = React.useContext(SliderStateContext)
  const { orientation, getThumbPercent, values } = state || {}

  const getStyle = () => {
    const percent0 = getThumbPercent ? getThumbPercent(0) * 100 : 0
    const percent1 = getThumbPercent ? getThumbPercent(1) * 100 : 0

    if (values?.length === 1) {
      return orientation === "horizontal" ? { width: `${percent0}%` } : { height: `${percent0}%` }
    }

    return orientation === "horizontal"
      ? { left: `${percent0}%`, width: `${Math.abs(percent0 - percent1)}%` }
      : { bottom: `${percent0}%`, height: `${Math.abs(percent0 - percent1)}%` }
  }

  return <div {...props} style={getStyle()} className={filler({ className })} />
}

const thumbStyles = tv({
  base: [
    "size-[1.25rem] left-[50%] top-[50%] rounded-full border border-fg/10 bg-white transition-[width,height] outline-hidden ring-black",
  ],
  variants: {
    isFocusVisible: {
      true: "ring-primary/20 border-primary outline-hidden",
    },
    isDragging: {
      true: "cursor-grabbing size-[1.35rem] border-primary",
    },
    isDisabled: {
      true: "opacity-50 forced-colors:border-[GrayText]",
    },
  },
})
const Thumb = ({ className, ...props }: SliderThumbProps) => {
  return (
    <SliderThumb
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        thumbStyles({ ...renderProps, className }),
      )}
    />
  )
}

export type { SliderProps }
export { Slider }
