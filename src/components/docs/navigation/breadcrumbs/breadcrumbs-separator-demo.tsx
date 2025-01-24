"use client"

import { Breadcrumbs } from "ui"

export default function BreadcrumbsSeparatorDemo() {
  return (
    <Breadcrumbs separator="slash">
      <Breadcrumbs.Item separator="slash" href="#">
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Design System</Breadcrumbs.Item>
      <Breadcrumbs.Item>Collections</Breadcrumbs.Item>
    </Breadcrumbs>
  )
}
