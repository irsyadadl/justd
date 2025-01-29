"use client"

import { useState } from "react"

import type { Placement } from "@react-types/overlays"
import type { Selection } from "react-aria-components"
import { Button, Menu } from "ui"

export const placements = [
  "bottom",
  "bottom left",
  "bottom right",
  "bottom start",
  "bottom end",
  "top",
  "top left",
  "top right",
  "top start",
  "top end",
  "left",
  "left top",
  "left bottom",
  "start",
  "start top",
  "start bottom",
  "right",
  "right top",
  "right bottom",
  "end",
  "end top",
  "end bottom",
].map((item, i) => ({ id: i, name: item }))

export default function SingleMenuDemo() {
  const [selected, setSelected] = useState<Selection>(new Set(["bottom"]))
  return (
    <Menu>
      <Button appearance="outline">Placement</Button>
      <Menu.Content
        placement={Array.from(selected)[0] as Placement}
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        items={placements}
        className="max-h-72 min-w-52"
      >
        {(item) => (
          <Menu.Item id={item.name}>
            <Menu.Label>{item.name}</Menu.Label>
          </Menu.Item>
        )}
      </Menu.Content>
    </Menu>
  )
}
