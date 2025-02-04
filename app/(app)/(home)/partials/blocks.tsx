"use client"

import { Buttons } from "@/components/blocks/buttons"
import { CheckRadioBlock } from "@/components/blocks/check-radio-block"
import { LoginForm } from "@/components/blocks/login-form"
import { Menus } from "@/components/blocks/menus"
import { ModalOverlays, PopoverOverlays } from "@/components/blocks/overlays"
import { ToolbarBlock } from "@/components/blocks/toolbar-block"
import ColorPickerCombinationDemo from "@/components/docs/colors/color-picker/color-picker-combination-demo"
import SwitchDemo from "@/components/docs/controls/switch/switch-demo"
import RangeCalendarControlledDemo from "@/components/docs/date-and-time/calendar/range-calendar-controlled-demo"
import TagFieldDemo from "@/components/docs/forms/tag-field/tag-field-demo"
import ComboBoxAvatarDemo from "@/components/docs/pickers/combo-box/combo-box-avatar-demo"
import MultipleSelectDemo from "@/components/docs/pickers/multiple-select/multiple-select-demo"
import { IconArrowRight, IconPackage } from "justd-icons"
import { Container, DatePicker, DateRangePicker, Grid, Heading, Link, Note, buttonStyles } from "ui"
import { Wrapper } from "./resources"

export function Blocks() {
  return (
    <Container>
      <section
        id="blocks"
        className="**:data-[slot=wrapper-card]:grid **:data-[slot=wrapper-card]:place-content-center sm:mb-12"
      >
        <div className="mb-4 flex items-center justify-between">
          <Heading level={2} className="sm:text-3xl">
            Some Components
          </Heading>
          <Link
            href="/docs/2.x/components/buttons/button"
            className={buttonStyles({ size: "small", appearance: "outline" })}
          >
            Show More <IconArrowRight />
          </Link>
        </div>
        <div className="space-y-1">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            <Wrapper>
              <TagFieldDemo />
            </Wrapper>
            <Wrapper>
              <ComboBoxAvatarDemo />
            </Wrapper>
            <Wrapper>
              <MultipleSelectDemo />
            </Wrapper>
            <LoginForm />
            <CheckRadioBlock />
            <Wrapper>
              <RangeCalendarControlledDemo />
            </Wrapper>
          </div>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
            <Grid.Item className="flex flex-col gap-y-1 lg:gap-y-1">
              <ToolbarBlock />

              <Wrapper>
                <ColorPickerCombinationDemo />
              </Wrapper>
              <Buttons />
              <Menus />
            </Grid.Item>

            <Grid.Item>
              <div className="grid grid-cols-1 gap-1">
                <Wrapper className="grid gap-6 lg:px-8 lg:py-9">
                  <DateRangePicker className="w-full" label="Reservations date" />
                  <DatePicker className="w-full" label="Event date" />
                </Wrapper>
                <Wrapper className="p-4 py-2 sm:p-4 lg:p-5">
                  <div className="space-y-2">
                    <Note intent="danger">
                      Complete your profile to get personalized recommendations.
                    </Note>
                    <Note intent="warning">
                      Heads up! We'll be doing system maintenance this Sunday at 2 AM.
                    </Note>
                  </div>
                </Wrapper>
              </div>
            </Grid.Item>

            <Grid.Item className="grid grid-cols-1 gap-1">
              <PopoverOverlays />
              <Wrapper>
                <SwitchDemo />
              </Wrapper>
              <ModalOverlays />
            </Grid.Item>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <Link className={buttonStyles()} href="/components">
            <IconPackage /> Show More
          </Link>
        </div>
      </section>
    </Container>
  )
}
