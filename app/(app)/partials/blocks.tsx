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
import { IconCubeFill } from "justd-icons"
import { Container, DatePicker, DateRangePicker, Grid, Heading, Link, Note, buttonStyles } from "ui"
import { Wrapper } from "./resources"

export function Blocks() {
  return (
    <Container>
      <section
        id="blocks"
        className="mb-12 **:data-[slot=wrapper-card]:grid **:data-[slot=wrapper-card]:place-content-center"
      >
        <Heading level={2} className="mb-6">
          Blocks
        </Heading>
        <div className="space-y-2">
          <Grid columns={{ initial: 1, sm: 2, lg: 3 }} gap={2}>
            <Grid.Item>
              <Wrapper>
                <TagFieldDemo />
              </Wrapper>
            </Grid.Item>
            <Grid.Item>
              <Wrapper>
                <ComboBoxAvatarDemo />
              </Wrapper>
            </Grid.Item>
            <Grid.Item>
              <Wrapper>
                <MultipleSelectDemo />
              </Wrapper>
            </Grid.Item>
            <Grid.Item>
              <LoginForm />
            </Grid.Item>
            <Grid.Item>
              <CheckRadioBlock />
            </Grid.Item>
            <Grid.Item>
              <Wrapper>
                <RangeCalendarControlledDemo />
              </Wrapper>
            </Grid.Item>
          </Grid>
          <Grid columns={{ initial: 1, sm: 2, lg: 3 }} gap={2}>
            <Grid.Item className="flex flex-col gap-y-4 lg:gap-y-2">
              <ToolbarBlock />

              <Wrapper>
                <ColorPickerCombinationDemo />
              </Wrapper>
              <Buttons />
              <Menus />
            </Grid.Item>

            <Grid.Item>
              <div className="grid gap-2">
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

            <Grid.Item className="grid gap-2">
              <PopoverOverlays />
              <Wrapper>
                <SwitchDemo />
              </Wrapper>
              <ModalOverlays />
            </Grid.Item>
          </Grid>
        </div>

        <div className="mt-8 flex items-center justify-center lg:justify-end">
          <Link className={buttonStyles()} href="/docs/2.x/components/buttons/button">
            <IconCubeFill /> Show More
          </Link>
        </div>
      </section>
    </Container>
  )
}
