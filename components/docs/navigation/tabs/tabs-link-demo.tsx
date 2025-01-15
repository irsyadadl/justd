"use client"

import { Tabs } from "ui"

const navs = [
  { url: "/", label: "Home" },
  { url: "/themes", label: "Themes" },
  { url: "/colors", label: "Colors" },
  { url: "https://getjustd.com/icons", label: "Icons" },
  { url: "https://irsyad.co/templates", label: "Templates" },
]

export default function TabsLinkDemo() {
  return (
    <Tabs aria-label="Navbar">
      <Tabs.List items={navs}>
        {(item) => (
          <Tabs.Tab id={item.label} href={item.url}>
            {item.label}
          </Tabs.Tab>
        )}
      </Tabs.List>
    </Tabs>
  )
}
