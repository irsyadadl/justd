"use client"

import * as React from "react"

import { useSlotId } from "@react-aria/utils"
import type {
  LabelProps,
  SliderOutputProps,
  SliderProps as SliderPrimitiveProps,
  SliderThumbProps,
  SliderTrackProps,
  TextProps
} from "react-aria-components"
import {
  composeRenderProps,
  Slider as SliderPrimitive,
  SliderOutput,
  SliderStateContext,
  SliderThumb,
  SliderTrack,
  TextContext
} from "react-aria-components"
import { tv, type VariantProps } from "tailwind-variants"

import { Description, Label } from "./field"

const sliderStyles = tv({
  slots: {
    root: "flex disabled:opacity-50 flex-col gap-2 orientation-horizontal:w-full orientation-vertical:h-56 orientation-vertical:items-center",
    track: [
      "relative group/track rounded-full bg-zinc-200 dark:bg-zinc-800 cursor-pointer disabled:cursor-default disabled:bg-bg-disabled",
      "grow orientation-vertical:flex-1 orientation-vertical:w-1.5 orientation-horizontal:w-full orientation-horizontal:h-1.5"
    ],
    filler: [
      "rounded-full bg-primary group-disabled/track:bg-bg-disabled",
      "pointer-events-none absolute group-orientation-horizontal/top-0 group-orientation-vertical/track:w-full group-orientation-vertical/track:bottom-0 group-orientation-horizontal/track:h-full"
    ],
    thumb: [
      "outline-none dragging:cursor-grabbing focus:ring-4 border border-zinc-200 focus:ring-primary/20 focus:border-primary focus:outline-none forced-colors:outline-[Highlight]",
      "rounded-full bg-white transition-[width,height]",
      "absolute left-[50%] top-[50%] block !-translate-x-1/2 !-translate-y-1/2",
      "disabled:bg-bg-disabled disabled:border disabled:border-bg",
      "orientation-vertical:w-2 orientation-horizontal:h-2",
      "size-[1.15rem] dragging:size-[1.30rem] dragging:border-primary"
    ],
    valueLabel: "text-muted-fg tabular-nums text-sm"
  }
})

const { track, filler, thumb, root, valueLabel } = sliderStyles()

type SliderRootProps = SliderPrimitiveProps

const Root = (props: SliderPrimitiveProps) => {
  const descriptionId = useSlotId()
  return (
    <TextContext.Provider value={{ slots: { description: { id: descriptionId } } }}>
      <SliderPrimitive
        data-slot="root"
        aria-describedby={descriptionId}
        {...props}
        className={composeRenderProps(props.className, (className) => root({ className }))}
      />
    </TextContext.Provider>
  )
}

interface SliderProps extends SliderRootProps, VariantProps<typeof sliderStyles> {
  label?: LabelProps["children"]
  description?: TextProps["children"]
  showValue?: boolean | ((value: number[]) => string)
}

const Slider = ({ label, description, showValue = true, ...props }: SliderProps) => (
  <Root {...props}>
    <div className="flex items-center justify-between gap-2">
      {label && <Label>{label}</Label>}
      {(showValue || typeof showValue === "function") && (
        <Output>
          {({ state }) => (typeof showValue === "function" ? showValue(state.values) : undefined)}
        </Output>
      )}
    </div>
    <Controls />
    {description && <Description>{description}</Description>}
  </Root>
)

const Controls = (props: SliderTrackProps) => {
  const state = React.useContext(SliderStateContext)
  return (
    <Track {...props}>
      <Filler />
      {state?.values.map((_, i) => <Thumb key={i} index={i} />)}
    </Track>
  )
}

const Track = (props: SliderTrackProps) => {
  return (
    <SliderTrack
      {...props}
      className={composeRenderProps(props.className, (className) => track({ className }))}
    />
  )
}

const Filler = (props: React.HTMLAttributes<HTMLDivElement>) => {
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

  return <div {...props} style={getStyle()} className={filler({ className: props.className })} />
}

const Thumb = ({ className, ...props }: SliderThumbProps) => {
  return (
    <SliderThumb
      {...props}
      className={composeRenderProps(className, (className) => thumb({ className }))}
    />
  )
}

const Output = ({ className, ...props }: SliderOutputProps) => {
  return (
    <SliderOutput
      {...props}
      className={composeRenderProps(className, (className) => valueLabel({ className }))}
    >
      {composeRenderProps(
        props.children,
        (children, { state }) =>
          children ?? state.values.map((_, i) => state.getThumbValueLabel(i)).join(" - ")
      )}
    </SliderOutput>
  )
}

Slider.Controls = Controls
Slider.Filler = Filler
Slider.Root = Root
Slider.Thumb = Thumb
Slider.Track = Track
Slider.Output = Output
export { Slider }
