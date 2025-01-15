"use client"

import { Drawer, buttonStyles } from "ui"

export default function DrawerWithoutNotchDemo() {
  return (
    <Drawer withNotch={false}>
      <Drawer.Trigger className={buttonStyles({ shape: "circle", appearance: "outline" })}>
        Open Drawer
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>The Beatles</Drawer.Title>
          <Drawer.Description>
            The Beatles were an English rock band formed in Liverpool in 1960, comprising John
            Lennon, Paul McCartney, George Harrison and Ringo Starr.
          </Drawer.Description>
        </Drawer.Header>
        <Drawer.Footer>
          <Drawer.Close shape="circle">Close</Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  )
}
