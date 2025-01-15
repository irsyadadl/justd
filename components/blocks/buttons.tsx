"use client"

import { Button } from "ui"

import { Wrapper } from "@/app/(app)/partials/resources"

export function Buttons() {
  return (
    <Wrapper>
      <div className="flex gap-4">
        <Button appearance="plain">Label</Button>
        <Button appearance="outline">Label</Button>
        <Button intent="secondary">Label</Button>
      </div>
    </Wrapper>
  )
}
