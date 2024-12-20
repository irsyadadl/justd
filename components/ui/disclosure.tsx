"use client"

import { composeTailwindRenderProps } from "@/components/ui/primitive"
import { IconChevronLeft } from "justd-icons"
import type {
  DisclosureGroupProps as AccordionProps,
  ButtonProps,
  DisclosureProps as CollapsibleProps,
  DisclosurePanelProps as DisclosurePanelPrimitiveProps,
} from "react-aria-components"
import {
  DisclosureGroup as Accordion,
  Button,
  Disclosure as Collapsible,
  DisclosurePanel as CollapsiblePanel,
  Heading,
  composeRenderProps,
} from "react-aria-components"
import { tv } from "tailwind-variants"

interface DisclosureGroupProps extends AccordionProps {
  ref?: React.RefObject<HTMLDivElement>
}
const DisclosureGroup = ({ children, ref, className, ...props }: DisclosureGroupProps) => {
  return (
    <Accordion
      ref={ref}
      data-slot="disclosure-group"
      {...props}
      className={composeTailwindRenderProps(
        className,
        "data-disabled:cursor-not-allowed data-disabled:opacity-75 cursor-pointer peer",
      )}
    >
      {(values) => (
        <div data-slot="disclosure-content">
          {typeof children === "function" ? children(values) : children}
        </div>
      )}
    </Accordion>
  )
}

const disclosure = tv({
  base: ["peer border-b border-border min-w-60 w-full group/disclosure"],
  variants: {
    isDisabled: {
      true: "cursor-not-allowed opacity-70",
    },
  },
})

interface DisclosureProps extends CollapsibleProps {
  ref?: React.Ref<HTMLDivElement>
}
const Disclosure = ({ className, ref, ...props }: DisclosureProps) => {
  return (
    <Collapsible
      ref={ref}
      data-slot="disclosure"
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        disclosure({ ...renderProps, className }),
      )}
    >
      {props.children}
    </Collapsible>
  )
}

const disclosureTrigger = tv({
  base: [
    "flex items-center gap-x-2 group/trigger [&[aria-expanded=true]_[data-slot=chevron]]:-rotate-90 **:data-[slot=chevron]:size-5 **:data-[slot=chevron]:size-5 **:data-[slot=icon]:shrink-0 sm:text-sm **:data-[slot=icon]:-mx-0.5 **:data-[slot=icon]:text-muted-fg justify-between py-3 **:[span]:*:data-[slot=icon]:mr-1 **:[span]:flex **:[span]:items-center **:[span]:gap-x-1 w-full text-left font-medium",
  ],
  variants: {
    isFocused: {
      true: "outline-hidden text-fg",
    },
    isOpen: {
      true: "text-fg",
    },
    isDisabled: {
      true: "opacity-50 cursor-default",
    },
  },
})

interface DisclosureTriggerProps extends ButtonProps {
  ref?: React.Ref<HTMLButtonElement>
}
const DisclosureTrigger = ({ className, ref, ...props }: DisclosureTriggerProps) => {
  return (
    <Heading>
      <Button
        ref={ref}
        slot="trigger"
        className={composeRenderProps(className, (className, renderProps) =>
          disclosureTrigger({
            ...renderProps,
            className,
          }),
        )}
        {...props}
      >
        {(values) => (
          <>
            {typeof props.children === "function" ? props.children(values) : props.children}
            <IconChevronLeft
              data-slot="chevron"
              className="ml-auto transition duration-300 internal-chevron size-4 shrink-0"
            />
          </>
        )}
      </Button>
    </Heading>
  )
}

interface DisclosurePanelProps extends DisclosurePanelPrimitiveProps {
  ref?: React.Ref<HTMLDivElement>
}
const DisclosurePanel = ({ className, ref, ...props }: DisclosurePanelProps) => {
  return (
    <CollapsiblePanel
      ref={ref}
      data-slot="disclosure-panel"
      className={composeTailwindRenderProps(
        className,
        "overflow-hidden text-muted-fg text-sm transition-all has-data-[slot=disclosure-group]:**:[button]:px-4 **:data-[slot=disclosure-group]:border-t **:data-[slot=disclosure-group]:**:[.internal-chevron]:hidden",
      )}
      {...props}
    >
      <div
        data-slot="disclosure-panel-content"
        className="pt-0 not-has-data-[slot=disclosure-group]:group-data-expanded/disclosure:pb-3 [&:has([data-slot=disclosure-group])_&]:px-11"
      >
        {props.children}
      </div>
    </CollapsiblePanel>
  )
}

export type { DisclosureGroupProps, DisclosureProps, DisclosurePanelProps, DisclosureTriggerProps }
export { DisclosureGroup, Disclosure, DisclosurePanel, DisclosureTrigger }
