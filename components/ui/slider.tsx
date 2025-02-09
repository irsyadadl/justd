"use client"

import React, { useState } from "react"

import type { SliderProps as SliderPrimitiveProps, SliderThumbProps } from "react-aria-components"
import {
  composeRenderProps,
  Slider as SliderPrimitive,
  SliderOutput,
  SliderStateContext,
  SliderThumb,
  SliderTrack,
  type SliderTrackProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

import { Description, Label } from "./field"
import { Tooltip } from "./tooltip"

const sliderStyles = tv({
  base: "group relative flex touch-none select-none flex-col",
  variants: {
    orientation: {
      horizontal: "w-full min-w-56 gap-y-2",
      vertical: "h-full min-h-56 w-1.5 items-center gap-y-2",
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
          className="min-w-6 px-1.5 py-1 text-xs"
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
      "group-data-[orientation=horizontal]/top-0 pointer-events-none absolute group-data-[orientation=vertical]/track:bottom-0 group-data-[orientation=horizontal]/track:h-full group-data-[orientation=vertical]/track:w-full",
    ],
    track: [
      "[--slider:color-mix(in_oklab,var(--color-muted)_90%,black_10%)] dark:[--slider:color-mix(in_oklab,var(--color-muted)_90%,white_10%)]",
      "group/track relative cursor-pointer rounded-full bg-(--slider) data-disabled:cursor-default data-disabled:opacity-60",
      "grow group-data-[orientation=horizontal]:h-1.5 group-data-[orientation=horizontal]:w-full group-data-[orientation=vertical]:w-1.5 group-data-[orientation=vertical]:flex-1",
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
    "top-[50%] left-[50%] size-[1.25rem] rounded-full border border-fg/10 bg-white outline-hidden ring-black transition-[width,height]",
  ],
  variants: {
    isFocusVisible: {
      true: "border-primary outline-hidden ring-primary/20",
    },
    isDragging: {
      true: "size-[1.35rem] cursor-grabbing border-primary",
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
